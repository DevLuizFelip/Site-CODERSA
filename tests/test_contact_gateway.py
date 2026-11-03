"""Exercise the real nginx policy across two local app instances, with fake mail.

CONTACT_NGINX_BIN must point to a separately installed nginx executable.
All processes/listeners are loopback-only and owned/closed by this test.
"""
import collections
import http.client
import importlib.util
import json
import os
from pathlib import Path
import secrets
import socket
import subprocess
import tempfile
import threading
import time
import unittest
from unittest.mock import MagicMock, patch
from werkzeug.serving import make_server, WSGIRequestHandler

ROOT = Path(__file__).resolve().parents[1]


class QuietHandler(WSGIRequestHandler):
    def log(self, *args, **kwargs):
        pass


def free_port():
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


class GatewayTests(unittest.TestCase):
    @unittest.skipUnless(os.environ.get("CONTACT_NGINX_BIN"), "Set CONTACT_NGINX_BIN to run real gateway integration")
    def test_shared_limit_origin_bypass_and_recovery(self):
        binary = str(Path(os.environ["CONTACT_NGINX_BIN"]).resolve())
        secret = secrets.token_urlsafe(32)
        servers, threads, instances = [], [], []
        sent = collections.Counter()
        with tempfile.TemporaryDirectory(prefix="codersa-contact-") as folder, patch.dict(os.environ, {"MAILERSEND_API_KEY": ""}):
            directory = Path(folder)
            (directory / "logs").mkdir()
            (directory / "temp").mkdir()
            process = None
            try:
                for number in range(2):
                    spec = importlib.util.spec_from_file_location(f"backend.gateway_fixture_{number}", ROOT / "backend/app.py")
                    module = importlib.util.module_from_spec(spec)
                    spec.loader.exec_module(module)
                    module.app.config["CONTACT_GATEWAY_SECRET"] = secret
                    module.MAILERSEND_API_KEY = "fixture"
                    module.MAILERSEND_FROM_EMAIL = "sender@example.com"
                    module.DESTINATION_EMAIL = "sink@example.com"
                    module.ms = MagicMock()
                    def send(_payload, instance=number):
                        sent[instance] += 1
                        return None
                    module.ms.emails.send.side_effect = send
                    server = make_server("127.0.0.1", 0, module.app, request_handler=QuietHandler)
                    servers.append(server)
                    thread = threading.Thread(target=server.serve_forever, daemon=True)
                    threads.append(thread)
                    thread.start()
                    instances.append(server.server_port)
                port = free_port()
                template = (ROOT / "docs/phase-2/contact-gateway.conf.template").read_text(encoding="utf-8")
                values = {
                    "CONTACT_BACKEND_1": f"127.0.0.1:{instances[0]}", "CONTACT_BACKEND_2": f"127.0.0.1:{instances[1]}",
                    "CONTACT_GATEWAY_PORT": str(port), "CONTACT_PUBLIC_PATH": "/send-email",
                    "CONTACT_GATEWAY_SECRET": secret, "CONTACT_ORIGIN_HOST": "127.0.0.1", "CONTACT_UPSTREAM_SCHEME": "http",
                    "CONTACT_CA_BUNDLE": str(ROOT / ".venv/Lib/site-packages/certifi/cacert.pem").replace("\\", "/"),
                }
                # Local HTTP fixtures need no CA. Keep TLS verification on in the production template.
                import certifi
                values["CONTACT_CA_BUNDLE"] = certifi.where().replace("\\", "/")
                for key, value in values.items():
                    template = template.replace("${" + key + "}", value)
                config = directory / "nginx.conf"
                config.write_text(template, encoding="utf-8")
                prefix = str(directory).replace("\\", "/") + "/"
                args = [binary, "-p", prefix, "-c", str(config).replace("\\", "/")]
                validation = subprocess.run(args + ["-t"], capture_output=True, text=True)
                self.assertEqual(validation.returncode, 0, validation.stderr.replace(secret, "<redacted>"))
                process = subprocess.Popen(args + ["-g", "daemon off;"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                for _ in range(100):
                    try:
                        with socket.create_connection(("127.0.0.1", port), timeout=0.1):
                            break
                    except OSError:
                        time.sleep(0.05)
                def post(target, headers=None):
                    connection = http.client.HTTPConnection("127.0.0.1", target, timeout=3)
                    payload = json.dumps({"nome": "Pessoa Teste", "email": "test@example.com", "assunto": "Teste local", "mensagem": "Mensagem sintética."})
                    connection.request("POST", "/send-email", body=payload, headers={"Content-Type": "application/json", "Origin": "https://www.codersa.com.br", **(headers or {})})
                    response = connection.getresponse()
                    result = (response.status, dict(response.getheaders()), response.read())
                    connection.close()
                    return result
                self.assertEqual([post(target)[0] for target in instances], [403, 403])
                accepted = [post(port)[0] for _ in range(5)]
                self.assertEqual(accepted, [200] * 5)
                self.assertEqual(sum(sent.values()), 5)
                self.assertEqual(set(sent), {0, 1})
                for _ in range(3):
                    limited = post(port, {"X-Forwarded-For": "203.0.113.99", "X-Contact-Gateway": "spoof"})
                    self.assertEqual(limited[0], 429)
                    self.assertEqual(limited[1]["Access-Control-Allow-Origin"], "https://www.codersa.com.br")
                    self.assertEqual(json.loads(limited[2])["success"], False)
                self.assertEqual(sum(sent.values()), 5)
                # 5/minute leaky bucket frees one position after about 12 seconds.
                time.sleep(13)
                self.assertEqual(post(port)[0], 200)
                self.assertEqual(sum(sent.values()), 6)
                report = {"passed": True, "instances": 2, "accepted_initial": 5, "limited": 3, "origin_direct": [403,403], "recovered_after_seconds": 13, "provider": "fake; no real mail", "nginx": subprocess.check_output([binary, "-v"], stderr=subprocess.STDOUT, text=True).strip()}
                destination = ROOT / "docs/phase-2/reports/gateway.json"
                destination.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
            finally:
                if process is not None:
                    subprocess.run(args + ["-s", "quit"], capture_output=True)
                    try:
                        process.wait(timeout=5)
                    except subprocess.TimeoutExpired:
                        process.terminate()
                for server in servers:
                    server.shutdown()
                    server.server_close()
                for thread in threads:
                    thread.join(timeout=2)


if __name__ == "__main__":
    unittest.main()
