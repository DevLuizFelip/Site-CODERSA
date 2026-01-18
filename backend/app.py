from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)
# CORS explícito para o domínio de produção + localhost
CORS(app, resources={r"/send-email": {"origins": [
    "https://www.codersa.com.br",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
]}})

# Configurações via Variáveis de Ambiente (Segurança)
SMTP_SERVER = "smtp.gmail.com"
# Gmail: 465 (SSL) costuma ser mais estável em produção
SMTP_PORT = 465
EMAIL_ADDRESS = os.environ.get("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD")
DESTINATION_EMAIL = os.environ.get("DESTINATION_EMAIL", "Codersa.ai@outlook.com")

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
    if not EMAIL_ADDRESS or not EMAIL_PASSWORD:
        return jsonify({"success": False, "message": "Configuração de servidor incompleta."}), 500

    data = request.json
    nome = data.get('nome')
    email_cliente = data.get('email')
    assunto = data.get('assunto')
    mensagem_texto = data.get('mensagem')

    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = DESTINATION_EMAIL
        msg['Subject'] = f"Novo Contato: {assunto}"

        html_content = load_template(nome, email_cliente, assunto, mensagem_texto)
        msg.attach(MIMEText(html_content, 'html'))

        # Conexão com timeout para evitar worker travar
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, timeout=20) as server:
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)

        return jsonify({"success": True, "message": "Email enviado com sucesso!"}), 200

    except Exception as e:
        print(f"Erro ao enviar email: {e}")
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)