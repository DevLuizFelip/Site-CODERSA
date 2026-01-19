from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from mailersend import MailerSendClient, EmailBuilder

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

ms = MailerSendClient(MAILERSEND_API_KEY) if MAILERSEND_API_KEY else None

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
    if ms is None:
        return jsonify({"success": False, "message": "MailerSendClient não inicializado."}), 500

    data = request.json
    nome = data.get('nome')
    email_cliente = data.get('email')
    assunto = data.get('assunto')
    mensagem_texto = data.get('mensagem')
    if not nome or not email_cliente or not assunto or not mensagem_texto:
        return jsonify({"success": False, "message": "Campos obrigatórios ausentes."}), 400

    try:
        html_content = load_template(nome, email_cliente, assunto, mensagem_texto)

        email = (EmailBuilder()
                 .from_email(MAILERSEND_FROM_EMAIL, MAILERSEND_FROM_NAME)
                 .to_many([{"email": DESTINATION_EMAIL, "name": "Codersa"}])
                 .subject(f"Novo Contato: {assunto}")
                 .html(html_content)
                 .reply_to(email_cliente)
                 .build())

        response = ms.emails.send(email)

        return jsonify({"success": True, "message": "Email enviado com sucesso!", "id": getattr(response, "message_id", None)}), 200

    except Exception as e:
        print(f"Erro ao enviar email (MailerSend SDK): {e}")
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"status": "ok"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)