from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)
CORS(app)  # Permite que o React (porta diferente) acesse este servidor

# --- CONFIGURAÇÕES DO EMAIL ---
# PREENCHA AQUI COM SUA SENHA DE APLICATIVO (NÃO USE A SENHA DO LOGIN NORMAL)
# Para Outlook/Hotmail, você geralmente precisa gerar uma senha de app se tiver 2FA.
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "aicodersa@gmail.com"
EMAIL_PASSWORD = "uola adcg bkiu ibkl" 

def load_template(nome, email, assunto, mensagem):
    # Caminho absoluto para o diretório deste script
    base_dir = os.path.dirname(os.path.abspath(__file__))
    template_path = os.path.join(base_dir, 'templates', 'email_template.html')
    
    # Carrega o HTML e substitui os placeholders
    with open(template_path, 'r', encoding='utf-8') as file:
        template = file.read()
    
    return template.format(
        nome=nome,
        email=email,
        assunto=assunto,
        mensagem=mensagem
    )

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    
    nome = data.get('nome')
    email_cliente = data.get('email')
    assunto = data.get('assunto')
    mensagem_texto = data.get('mensagem')

    try:
        # Configurar mensagem
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = "Codersa.ai@outlook.com" # Envia para o seu email principal
        msg['Subject'] = f"Novo Contato: {assunto}"

        # Corpo do email (HTML)
        html_content = load_template(nome, email_cliente, assunto, mensagem_texto)
        msg.attach(MIMEText(html_content, 'html'))

        # Conexão com Servidor SMTP
        # Tenta conectar de forma segura (STARTTLS)
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.ehlo() # Identifica-se para o servidor
        server.starttls() # Inicia criptografia
        server.ehlo() # Re-identifica como criptografado
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()

        return jsonify({"success": True, "message": "Email enviado com sucesso!"}), 200

    except Exception as e:
        print(f"Erro ao enviar email: {e}")
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)