# 🤖 Widget Cody AI

Este é um widget de chat flutuante, responsivo e moderno, projetado para integração no site da Codersa. Ele inclui uma interface de chat completa com animações, histórico persistente e suporte a ações ricas.

## 🚀 Teste Rápido (Demo)

Para ver o widget funcionando agora mesmo:

1. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
2. Inicie o servidor de teste:
   ```bash
   python server.py
   ```
3. Acesse **http://localhost:8000** no seu navegador.

## 📂 Estrutura do Projeto

```
chat-widget/
├── css/
│   └── chat-widget.css       # Estilos (animações, responsividade)
├── js/
│   └── chat-widget.js        # Lógica (API, localStorage, ações)
├── assets/
│   └── avatar-codersa.png    # Avatar do bot
├── index.html                # Página de demonstração
├── server.py                 # Backend Mock (FastAPI)
└── requirements.txt          # Dependências Python
```

## 🛠 Integração no Site Real

### 1. Upload dos Arquivos
Suba as pastas `css`, `js` e `assets` para a raiz ou pasta pública do seu servidor.

### 2. Adicione o HTML
Copie e cole este código no `<body>` de todas as páginas:

```html
<!-- CSS -->
<link rel="stylesheet" href="/css/chat-widget.css">

<!-- Widget HTML -->
<div id="chat-widget">
    <div id="chat-panel" class="chat-panel hidden">
        <div class="chat-header">
            <div class="chat-avatar-header gradient-avatar"></div>
            <div class="chat-header-info">
                <h3>Cody AI</h3>
                <p>Online agora</p>
            </div>
            <button id="chat-close">&times;</button>
        </div>
        <div id="chat-messages" class="chat-messages"></div>
        <div class="chat-input-container">
            <input type="text" id="chat-input" placeholder="Digite sua dúvida...">
            <button id="chat-send">➤</button>
        </div>
    </div>
    <button id="chat-toggle" class="chat-button">
    </button>
</div>

<!-- JS -->
<script src="/js/chat-widget.js"></script>
```

### 3. Configuração
No arquivo `js/chat-widget.js`, atualize a URL da API para o seu backend de produção:

```javascript
this.config = {
    apiEndpoint: 'https://seu-backend.com/api/assistente', // <-- Atualize aqui
    // ...
};
```

## ✨ Funcionalidades Incluídas

- **Persistência**: O histórico do chat é salvo no navegador do usuário.
- **Ações Inteligentes**: O bot pode enviar botões ("Ver Planos", "Agendar") que navegam no site ou abrem links.
- **Typing Indicator**: Animação de "digitando..." para feedback natural.
- **Mobile First**: Design totalmente adaptado para celulares.
