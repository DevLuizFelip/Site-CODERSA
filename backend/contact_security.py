"""Shared contact contract for Render and the optional Vercel endpoint."""
import hmac
import os
import re
from flask import jsonify, request
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

LIMITS = {"nome": 180, "email": 254, "assunto": 180, "mensagem": 6000}
PUBLIC_ERROR = "Não foi possível confirmar o envio. Tente novamente ou use os canais diretos."


def configure_contact(app):
    app.config["MAX_CONTENT_LENGTH"] = 40000
    app.config["CONTACT_GATEWAY_SECRET"] = os.environ.get("CONTACT_GATEWAY_SECRET", "")
    origins = [origin.strip() for origin in os.environ.get(
        "CONTACT_ALLOWED_ORIGINS", "https://www.codersa.com.br,https://codersa.com.br"
    ).split(",") if origin.strip() and origin.strip() != "*"]
    CORS(app, origins=origins, methods=["POST", "OPTIONS", "GET"], allow_headers=["Content-Type"])

    @app.errorhandler(HTTPException)
    def safe_http_error(error):
        return jsonify(success=False, message=PUBLIC_ERROR), error.code


def read_contact(app):
    """Fail closed on direct-origin access; gateway owns the shared rate policy."""
    secret = app.config.get("CONTACT_GATEWAY_SECRET", "")
    if not secret:
        return None, (jsonify(success=False, message=PUBLIC_ERROR), 503)
    supplied = request.headers.get("X-Contact-Gateway", "")
    if not hmac.compare_digest(supplied.encode(), secret.encode()):
        return None, (jsonify(success=False, message=PUBLIC_ERROR), 403)
    data = request.get_json(silent=True)
    if not isinstance(data, dict) or set(data) != set(LIMITS):
        return None, (jsonify(success=False, message="Verifique os campos informados."), 400)
    clean = {}
    for field, limit in LIMITS.items():
        value = data[field]
        if not isinstance(value, str) or not value.strip() or len(value) > limit:
            return None, (jsonify(success=False, message="Verifique os campos informados."), 400)
        if any(ord(char) < 32 and (field != "mensagem" or char not in "\r\n\t") for char in value):
            return None, (jsonify(success=False, message="Verifique os campos informados."), 400)
        clean[field] = value.strip()
    if not re.fullmatch(r"[^\s@<>\"]+@[^\s@<>\"]+\.[^\s@<>\"]+", clean["email"]):
        return None, (jsonify(success=False, message="Informe um e-mail válido."), 400)
    return clean, None
