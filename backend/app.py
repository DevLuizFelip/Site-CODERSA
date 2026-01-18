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

# Configurações via Resend (Variáveis de Ambiente)
RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
RESEND_FROM = os.environ.get("RESEND_FROM", "Codersa <onboarding@resend.dev>")
DESTINATION_EMAIL = os.environ.get("DESTINATION_EMAIL", "Codersa.ai@outlook.com")
RESEND_API_URL = os.environ.get("RESEND_API_URL", "https://api.resend.com/emails")

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
    if not RESEND_API_KEY:
        return jsonify({"success": False, "message": "RESEND_API_KEY não configurada."}), 500

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
            "from": RESEND_FROM,
            "to": [DESTINATION_EMAIL],
            "subject": f"Novo Contato: {assunto}",
            "html": html_content,
            "reply_to": email_cliente,
        }

        session = requests.Session()
        retries = Retry(total=2, backoff_factor=0.5, status_forcelist=[429, 500, 502, 503, 504])
        session.mount("https://", HTTPAdapter(max_retries=retries))

        response = session.post(
            RESEND_API_URL,
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
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
            print(f"Resend erro {response.status_code}: {error_payload}")
            return jsonify({"success": False, "message": error_payload}), 500

        return jsonify({"success": True, "message": "Email enviado com sucesso!"}), 200

    except Exception as e:
        print(f"Erro ao enviar email: {e}")
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)