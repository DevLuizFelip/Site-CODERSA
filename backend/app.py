from flask import Flask, request, jsonify
from html import escape
try:
    from .contact_security import configure_contact, read_contact, PUBLIC_ERROR
except ImportError:
    from contact_security import configure_contact, read_contact, PUBLIC_ERROR
import os
import time
import random
from mailersend import MailerSendClient, EmailBuilder

app = Flask(__name__)
configure_contact(app)

# Configurações via MailerSend (Variáveis de Ambiente)
MAILERSEND_API_KEY = os.environ.get("MAILERSEND_API_KEY")
MAILERSEND_FROM_EMAIL = os.environ.get("MAILERSEND_FROM_EMAIL")
MAILERSEND_FROM_NAME = os.environ.get("MAILERSEND_FROM_NAME", "Codersa")
DESTINATION_EMAIL = os.environ.get("DESTINATION_EMAIL")

ms = MailerSendClient(MAILERSEND_API_KEY) if MAILERSEND_API_KEY else None

def load_template(nome, email, assunto, mensagem):
    # Caminho absoluto para evitar erros de arquivo não encontrado
    base_dir = os.path.dirname(os.path.abspath(__file__))
    template_path = os.path.join(base_dir, 'templates', 'email_template.html')
    
    with open(template_path, 'r', encoding='utf-8') as file:
        template = file.read()
    
    # Usando .format() com segurança (o template HTML deve ter chaves duplicadas para CSS)
    return template.format(
        nome=escape(nome, quote=True),
        email=escape(email, quote=True),
        assunto=escape(assunto, quote=True),
        mensagem=escape(mensagem, quote=True)
    )

@app.route('/send-email', methods=['POST'])
def send_email():
    data, failure = read_contact(app)
    if failure is not None:
        return failure
    if not MAILERSEND_API_KEY or not MAILERSEND_FROM_EMAIL or not DESTINATION_EMAIL or ms is None:
        return jsonify(success=False, message=PUBLIC_ERROR), 503
    nome, email_cliente, assunto, mensagem_texto = (data[key] for key in ("nome", "email", "assunto", "mensagem"))

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

    except Exception:
        app.logger.warning("contact_delivery_failed")
        return jsonify(success=False, message=PUBLIC_ERROR), 502

@app.route('/api/assistente', methods=['POST'])
def assistant_endpoint():
    # Simula delay natural
    time.sleep(1.0)
    
    data = request.json
    user_msg = data.get('message', '').lower()
    
    response_text = ""
    actions = []

    if "preço" in user_msg or "custo" in user_msg or "plano" in user_msg:
        response_text = "Nossos projetos são personalizados! O investimento depende da complexidade. Começamos com um diagnóstico gratuito."
        actions = [
            {"label": "Ver Serviços", "type": "navigate", "value": "/servicos"},
            {"label": "Agendar Diagnóstico", "type": "link", "value": "https://cal.com/codersa/23min"}
        ]
    
    elif "whatsapp" in user_msg:
        response_text = "Somos especialistas em automação de WhatsApp com API oficial ou n8n/Evolution API. Bots que atendem 24/7."
        actions = [
            {"label": "Ver Cases", "type": "navigate", "value": "/portfolio"},
            {"label": "Chamar no Whats", "type": "link", "value": "https://wa.me/5511936193760"}
        ]

    elif "ia" in user_msg or "inteligência" in user_msg:
        response_text = "Usamos GPT-4, Claude e Llama integrados aos seus processos para automatizar suporte e vendas."
        actions = [{"label": "Saber mais", "type": "navigate", "value": "/sobre"}]

    elif "contato" in user_msg or "falar" in user_msg:
        response_text = "Pode nos chamar pelo formulário, email ou WhatsApp. O que prefere?"
        actions = [
            {"label": "Formulário", "type": "navigate", "value": "/contato"},
            {"label": "WhatsApp", "type": "link", "value": "https://wa.me/5511936193760"}
        ]
        
    elif "agendar" in user_msg or "reunião" in user_msg:
        response_text = "Claro! Vamos agendar uma conversa rápida de 23min para entender seu negócio."
        actions = [{"label": "Agendar Agora", "type": "link", "value": "https://cal.com/codersa/23min"}]

    else:
        greetings = [
            "Posso explicar como a Codersa automatiza sua empresa com IA. Quer ver exemplos?",
            "Isso é algo que resolvemos com n8n e IA. Gostaria de saber como funciona?",
            "A Codersa é focada em eficiência operacional. Tem alguma dúvida específica?"
        ]
        response_text = random.choice(greetings)
        actions = [
            {"label": "Ver Serviços", "type": "navigate", "value": "/servicos"},
            {"label": "Falar com Humano", "type": "link", "value": "https://wa.me/5511936193760"}
        ]

    return jsonify({
        "response": response_text,
        "actions": actions
    })

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({"status": "ok"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
