from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

app = Flask(__name__)
# CORS explícito para o domínio de produção + localhost
CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "https://www.codersa.com.br",
                "https://codersa.com.br",
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175",
            ],
            "methods": ["POST", "OPTIONS"],
            "allow_headers": ["Content-Type"],
        }
    },
)

# Configurações via MailerSend (Variáveis de Ambiente)
MAILERSEND_API_KEY = os.environ.get("MAILERSEND_API_KEY")
MAILERSEND_FROM_EMAIL = os.environ.get("MAILERSEND_FROM_EMAIL")
MAILERSEND_FROM_NAME = os.environ.get("MAILERSEND_FROM_NAME", "Codersa")
DESTINATION_EMAIL = os.environ.get("DESTINATION_EMAIL", "luicostasantana@outlook.com")
MAILERSEND_API_URL = os.environ.get("MAILERSEND_API_URL", "https://api.mailersend.com/v1/email")

def load_template(nome, email, assunto, mensagem):
    # Caminho absoluto para evitar erros de arquivo não encontrado
    base_dir = os.path.dirname(os.path.abspath(__file__))
    template_path = os.path.join(base_dir, 'templates', 'email_template.html')
    
    with open(template_path, 'r', encoding='utf-8') as file:
        template = file.read()
    
    # Usando .format() com segurança (o template HTML deve ter chaves duplicadas para CSS)
    return template.format(
        nome=nome,
        email=email,
        assunto=assunto,
        mensagem=mensagem
    )

@app.route('/send-email', methods=['POST'])
def send_email():
    if not MAILERSEND_API_KEY or not MAILERSEND_FROM_EMAIL:
        return jsonify({"success": False, "message": "MAILERSEND_API_KEY/MAILERSEND_FROM_EMAIL não configuradas."}), 500

    data = request.json
    nome = data.get('nome')
    email_cliente = data.get('email')
    assunto = data.get('assunto')
    mensagem_texto = data.get('mensagem')
    if not nome or not email_cliente or not assunto or not mensagem_texto:
        return jsonify({"success": False, "message": "Campos obrigatórios ausentes."}), 400

    try:
        html_content = load_template(nome, email_cliente, assunto, mensagem_texto)
        payload = {
            "from": {
                "email": MAILERSEND_FROM_EMAIL,
                "name": MAILERSEND_FROM_NAME,
            },
            "to": [{"email": DESTINATION_EMAIL, "name": "Codersa"}],
            "subject": f"Novo Contato: {assunto}",
            "html": html_content,
            "reply_to": {"email": email_cliente},
        }

        session = requests.Session()
        retries = Retry(total=2, backoff_factor=0.5, status_forcelist=[429, 500, 502, 503, 504])
        session.mount("https://", HTTPAdapter(max_retries=retries))

        response = session.post(
            MAILERSEND_API_URL,
            headers={
                "Authorization": f"Bearer {MAILERSEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json=payload,
            timeout=(5, 40),
        )

        if response.status_code >= 400:
            # Log detalhado para diagnóstico no Render
            try:
                error_payload = response.json()
            except Exception:
                error_payload = {"raw": response.text}
            print(f"MailerSend erro {response.status_code}: {error_payload}")
            return jsonify({"success": False, "message": error_payload}), 500

        return jsonify({"success": True, "message": "Email enviado com sucesso!"}), 200

    except Exception as e:
        print(f"Erro ao enviar email: {e}")
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)