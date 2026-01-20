from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import time
import random
import os

app = FastAPI()

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatContext(BaseModel):
    page: Optional[str] = None
    referrer: Optional[str] = None
    timestamp: Optional[str] = None

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: List[Message] = []
    context: Optional[ChatContext] = None

@app.post("/api/assistente")
async def chat_endpoint(request: ChatRequest):
    time.sleep(1.0) # Simula delay natural
    
    user_msg = request.message.lower()
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

    return {
        "response": response_text,
        "actions": actions
    }

# Serve arquivos estáticos (CSS, JS, Imagens)
app.mount("/css", StaticFiles(directory="css"), name="css")
app.mount("/js", StaticFiles(directory="js"), name="js")
app.mount("/assets", StaticFiles(directory="assets"), name="assets")

# Rota raiz serve o index.html
@app.get("/")
async def read_index():
    return FileResponse('index.html')

if __name__ == "__main__":
    import uvicorn
    print("Servidor rodando em http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
