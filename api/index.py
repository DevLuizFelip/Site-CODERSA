from flask import Flask, request, jsonify
from html import escape
from backend.contact_security import configure_contact, read_contact, PUBLIC_ERROR
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)
configure_contact(app)

# Configurações (use Variáveis de Ambiente; não commitar credenciais)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = os.environ.get("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD")
DESTINATION_EMAIL = os.environ.get("DESTINATION_EMAIL")

def load_template(nome, email, assunto, mensagem):
    nome, email, assunto, mensagem = (escape(value, quote=True) for value in (nome, email, assunto, mensagem))
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; color: #1a1a1a; }}
            .container {{ max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; }}
            .header {{ text-align: center; padding-bottom: 40px; border-bottom: 1px solid #f0f0f0; }}
            .logo {{ font-family: 'Times New Roman', serif; font-size: 24px; font-weight: bold; color: #000; text-decoration: none; }}
            .content {{ padding: 40px 0; text-align: center; }}
            .headline {{ font-family: 'Times New Roman', serif; font-size: 36px; line-height: 1.2; margin-bottom: 20px; color: #000; }}
            .subtext {{ font-size: 16px; line-height: 1.6; color: #666; margin-bottom: 40px; }}
            .data-box {{ background-color: #fcfcfc; border: 1px solid #f0f0f0; text-align: left; padding: 30px; margin-bottom: 30px; }}
            .data-row {{ margin-bottom: 15px; }}
            .label {{ text-transform: uppercase; font-size: 10px; letter-spacing: 2px; color: #999; font-weight: bold; display: block; margin-bottom: 5px; }}
            .value {{ font-size: 16px; color: #000; }}
            .button {{ display: inline-block; background-color: #000; color: #fff; padding: 15px 40px; text-decoration: none; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; font-weight: bold; }}
            .footer {{ background-color: #f9f9f9; padding: 40px; text-align: center; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 2px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Codersa</div>
            </div>
            <div class="content">
                <h1 class="headline">Novo Lead<br>Capturado.</h1>
                <p class="subtext">
                    Um visitante preencheu o formulário de contato no site.
                    <br>Abaixo estão os detalhes da solicitação.
                </p>

                <div class="data-box">
                    <div class="data-row">
                        <span class="label">Nome Completo</span>
                        <div class="value">{nome}</div>
                    </div>
                    <div class="data-row">
                        <span class="label">E-mail Corporativo</span>
                        <div class="value">{email}</div>
                    </div>
                    <div class="data-row">
                        <span class="label">Assunto</span>
                        <div class="value">{assunto}</div>
                    </div>
                    <div class="data-row">
                        <span class="label">Mensagem</span>
                        <div class="value" style="white-space: pre-wrap;">{mensagem}</div>
                    </div>
                </div>

                <a href="mailto:{email}" class="button">Responder Agora</a>
            </div>
        </div>
        <div class="footer">
            © 2026 Codersa.<br>
            São Paulo • Remote First
        </div>
    </body>
    </html>
    """

@app.route('/api/send-email', methods=['POST'])
def send_email():
    data, failure = read_contact(app)
    if failure is not None:
        return failure
    if not EMAIL_ADDRESS or not EMAIL_PASSWORD or not DESTINATION_EMAIL:
        return jsonify(success=False, message=PUBLIC_ERROR), 503
    nome, email_cliente, assunto, mensagem_texto = (data[key] for key in ("nome", "email", "assunto", "mensagem"))

    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = DESTINATION_EMAIL
        msg['Subject'] = f"Novo Contato: {assunto}"
        msg['Reply-To'] = email_cliente

        html_content = load_template(nome, email_cliente, assunto, mensagem_texto)
        msg.attach(MIMEText(html_content, 'html'))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=10) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)

        return jsonify({"success": True, "message": "Email enviado com sucesso!"}), 200

    except Exception:
        app.logger.warning("contact_delivery_failed")
        return jsonify(success=False, message=PUBLIC_ERROR), 502

# Vercel serverless function entrypoint
if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5000)