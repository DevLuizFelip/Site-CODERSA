"""Local tests only: providers are replaced; no email or remote data access."""
import importlib
import os
import unittest
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

with patch.dict(os.environ, {"MAILERSEND_API_KEY": "", "EMAIL_PASSWORD": "", "CONTACT_GATEWAY_SECRET": ""}):
    render = importlib.import_module("backend.app")
    vercel = importlib.import_module("api.index")

VALID = {"nome": "Pessoa Teste", "email": "test@example.com", "assunto": "CODERSA Blueprint — Teste", "mensagem": "Serviço: CODERSA Blueprint\nDescrição: teste local."}
HEADERS = {"X-Contact-Gateway": "fixture-only-secret"}


class ContactTests(unittest.TestCase):
    def setUp(self):
        self.patches = []
        for module in (render, vercel):
            module.app.config.update(TESTING=True, CONTACT_GATEWAY_SECRET="fixture-only-secret")
        for module, fields in [(render, {"MAILERSEND_API_KEY": "fixture", "MAILERSEND_FROM_EMAIL": "sender@example.com", "DESTINATION_EMAIL": "sink@example.com"}), (vercel, {"EMAIL_ADDRESS": "sender@example.com", "EMAIL_PASSWORD": "fixture", "DESTINATION_EMAIL": "sink@example.com"})]:
            for key, value in fields.items():
                self.patches.append(patch.object(module, key, value))
        self.mail = MagicMock()
        self.mail.emails.send.return_value = SimpleNamespace(message_id="fixture-message")
        self.smtp = MagicMock()
        self.smtp.return_value.__enter__.return_value = self.smtp
        self.patches += [patch.object(render, "ms", self.mail), patch.object(vercel.smtplib, "SMTP", self.smtp)]
        for item in self.patches:
            item.start()
            self.addCleanup(item.stop)

    def post(self, module, path, data=VALID, headers=HEADERS):
        return module.app.test_client().post(path, json=data, headers=headers)

    def test_positive_confirmation_and_legacy_contract(self):
        for module, path in [(render, "/send-email"), (vercel, "/api/send-email")]:
            with self.subTest(path=path):
                response = self.post(module, path)
                self.assertEqual(response.status_code, 200)
                self.assertIs(response.json["success"], True)
        self.mail.emails.send.assert_called_once()
        self.smtp.send_message.assert_called_once()
        message = self.smtp.send_message.call_args.args[0]
        self.assertEqual(message["To"], "sink@example.com")
        self.assertEqual(message["Reply-To"], VALID["email"])

    def test_invalid_inputs_never_invoke_providers(self):
        invalid = [None, [], {}, {**VALID, "website": "spam"}, {**VALID, "email": "invalid"}]
        for field, limit in {"nome": 180, "email": 254, "assunto": 180, "mensagem": 6000}.items():
            invalid += [{**VALID, field: value} for value in ([], 1, None, " ", "x" * (limit + 1))]
        for field in ("nome", "email", "assunto"):
            invalid += [{**VALID, field: "injected\r\nBcc: victim@example.com"}, {**VALID, field: "bad\0value"}]
        for module, path in [(render, "/send-email"), (vercel, "/api/send-email")]:
            for data in invalid:
                with self.subTest(path=path, data_type=type(data).__name__):
                    self.assertEqual(self.post(module, path, data).status_code, 400)
            client = module.app.test_client()
            self.assertEqual(client.post(path, data="{bad", content_type="application/json", headers=HEADERS).status_code, 400)
            self.assertEqual(client.post(path, data="x" * 40001, content_type="application/json", headers=HEADERS).status_code, 413)
        self.mail.emails.send.assert_not_called()
        self.smtp.assert_not_called()

    def test_origin_is_closed_without_gateway_and_without_configuration(self):
        for module, path in [(render, "/send-email"), (vercel, "/api/send-email")]:
            for headers in ({}, {"X-Contact-Gateway": "wrong"}):
                self.assertEqual(self.post(module, path, headers=headers).status_code, 403)
            with patch.dict(module.app.config, {"CONTACT_GATEWAY_SECRET": ""}):
                self.assertEqual(self.post(module, path).status_code, 503)
        self.mail.emails.send.assert_not_called()
        self.smtp.assert_not_called()

    def test_html_is_text_in_both_templates(self):
        for module in (render, vercel):
            html = module.load_template('<img src=x onerror="alert(1)">', "test@example.com", "A & B", "<script>private</script>")
            self.assertNotIn("<img src=x", html)
            self.assertNotIn("<script>private", html)
            self.assertIn("&lt;script&gt;private&lt;/script&gt;", html)
            self.assertIn("A &amp; B", html)

    def test_provider_failures_do_not_expose_exception_or_pii(self):
        self.mail.emails.send.side_effect = RuntimeError("credential-test private@example.com")
        self.smtp.send_message.side_effect = RuntimeError("credential-test private@example.com")
        for module, path in [(render, "/send-email"), (vercel, "/api/send-email")]:
            with self.assertLogs(module.app.logger, level="WARNING") as logs:
                response = self.post(module, path)
            self.assertEqual(response.status_code, 502)
            self.assertIs(response.json["success"], False)
            self.assertNotIn("credential-test", response.get_data(as_text=True))
            self.assertNotIn("private@example.com", " ".join(logs.output))

    def test_recipient_must_be_explicit(self):
        for module, path in [(render, "/send-email"), (vercel, "/api/send-email")]:
            with patch.object(module, "DESTINATION_EMAIL", None):
                self.assertEqual(self.post(module, path).status_code, 503)
        self.mail.emails.send.assert_not_called()
        self.smtp.assert_not_called()

    def test_cors_allows_production_but_not_arbitrary_origins(self):
        for module, path in [(render, "/send-email"), (vercel, "/api/send-email")]:
            for origin, allowed in [("https://www.codersa.com.br", True), ("https://attacker.example", False)]:
                response = module.app.test_client().options(path, headers={"Origin": origin, "Access-Control-Request-Method": "POST"})
                self.assertEqual(response.headers.get("Access-Control-Allow-Origin") == origin, allowed)


if __name__ == "__main__":
    unittest.main()
