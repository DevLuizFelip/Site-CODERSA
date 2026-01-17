from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

app = Flask(__name__)
CORS(app)

# Configurações (Em produção, idealmente usam Variáveis de Ambiente)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = os.environ.get("EMAIL_ADDRESS", "aicodersa@gmail.com")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD", "uola adcg bkiu ibkl")

def load_template(nome, email, assunto, mensagem):
    # Caminho ajustado para Vercel (arquivo deve estar junto na pasta api ou configurado corretamente)
    # Na Vercel, o sistema de arquivos é diferente. Vamos simplificar colocando o HTML direto aqui 
    # ou lendo de forma robusta. Para serverless simples, string multiline é mais seguro.
    
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
    data = request.json
    
    nome = data.get('nome')
    email_cliente = data.get('email')
    assunto = data.get('assunto')
    mensagem_texto = data.get('mensagem')

    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = "Codersa.ai@outlook.com"
        msg['Subject'] = f"Novo Contato: {assunto}"

        html_content = load_template(nome, email_cliente, assunto, mensagem_texto)
        msg.attach(MIMEText(html_content, 'html'))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()

        return jsonify({"success": True, "message": "Email enviado com sucesso!"}), 200

    except Exception as e:
        print(f"Erro ao enviar email: {e}")
        return jsonify({"success": False, "message": str(e)}), 500

# Vercel serverless function entrypoint
if __name__ == '__main__':
    app.run(debug=True)