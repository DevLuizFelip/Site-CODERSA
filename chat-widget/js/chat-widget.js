class ChatWidget {
    constructor() {
        this.config = {
            apiEndpoint: '/api/assistente', // Ajuste conforme seu backend
            storageKey: 'codersa_chat_history',
            initialMessage: 'Olá! Sou o Cody AI, seu assistente virtual. Como posso ajudar com automação de WhatsApp ou IA? 😊'
        };

        this.initElements();
        this.initState();
        this.initEventListeners();
        
        // Verifica se é a primeira vez ou recupera histórico
        if (this.messagesHistory.length === 0) {
            this.addBotMessage(this.config.initialMessage, false);
        } else {
            this.renderHistory();
        }
    }

    initElements() {
        this.widgetContainer = document.getElementById('chat-widget');
        this.toggleBtn = document.getElementById('chat-toggle');
        this.panel = document.getElementById('chat-panel');
        this.closeBtn = document.getElementById('chat-close');
        this.sendBtn = document.getElementById('chat-send');
        this.input = document.getElementById('chat-input');
        this.messagesContainer = document.getElementById('chat-messages');
    }

    initState() {
        this.isOpen = false;
        this.messagesHistory = JSON.parse(localStorage.getItem(this.config.storageKey) || '[]');
    }

    initEventListeners() {
        this.toggleBtn.addEventListener('click', () => this.togglePanel());
        this.closeBtn.addEventListener('click', () => this.closePanel());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Delegação de eventos para botões de ação dinâmicos
        this.messagesContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('action-btn')) {
                const action = e.target.dataset.action;
                const value = e.target.dataset.value;
                this.handleAction(action, value);
            }
        });
    }

    togglePanel() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.panel.classList.remove('hidden');
            // Pequeno delay para permitir a transição CSS
            setTimeout(() => {
                this.panel.classList.add('visible');
                this.input.focus();
                this.scrollToBottom();
            }, 10);
        } else {
            this.closePanel();
        }
    }

    closePanel() {
        this.isOpen = false;
        this.panel.classList.remove('visible');
        setTimeout(() => {
            this.panel.classList.add('hidden');
        }, 400); // Tempo da transição CSS
    }

    async sendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        // UI Update
        this.addUserMessage(text);
        this.input.value = '';
        this.input.focus();

        // Salva estado
        this.saveMessage('user', text);

        // API Call
        this.addTypingIndicator();

        try {
            const context = {
                page: window.location.pathname,
                referrer: document.referrer,
                timestamp: new Date().toISOString()
            };

            const response = await fetch(this.config.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: text, 
                    history: this.messagesHistory.slice(-10), // Envia apenas ultimas 10 mensagens
                    context: context
                })
            });

            if (!response.ok) throw new Error('Network error');

            const data = await response.json();
            this.removeTypingIndicator();
            
            // Processa resposta (pode ser texto simples ou objeto com ações)
            const responseText = data.response || data.message || "Não entendi, pode repetir?";
            const actions = data.actions || []; // Array de { label: "Ver planos", action: "link", value: "/precos" }

            this.addBotMessage(responseText, true, actions);
            this.saveMessage('assistant', responseText);

        } catch (error) {
            console.error('Chat Error:', error);
            this.removeTypingIndicator();
            this.addBotMessage('Desculpe, estou com dificuldade de conexão. Pode tentar novamente ou nos chamar no WhatsApp? 📱');
        }
    }

    addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'message user';
        div.innerHTML = `<div class="message-bubble">${this.formatText(text)}</div>`;
        this.messagesContainer.appendChild(div);
        this.scrollToBottom();
    }

    addBotMessage(text, save = true, actions = []) {
        const div = document.createElement('div');
        div.className = 'message bot';
        
        let actionsHtml = '';
        if (actions && actions.length > 0) {
            actionsHtml = `<div class="chat-actions">
                ${actions.map(act => `<button class="action-btn" data-action="${act.type}" data-value="${act.value}">${act.label}</button>`).join('')}
            </div>`;
        }

        div.innerHTML = `
            <div class="message-bubble">
                ${this.formatText(text)}
                ${actionsHtml}
            </div>
        `;
        this.messagesContainer.appendChild(div);
        this.scrollToBottom();
    }

    addTypingIndicator() {
        this.typingNode = document.createElement('div');
        this.typingNode.className = 'message bot typing';
        this.typingNode.innerHTML = `
            <div class="message-bubble typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        this.messagesContainer.appendChild(this.typingNode);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        if (this.typingNode) {
            this.typingNode.remove();
            this.typingNode = null;
        }
    }

    saveMessage(role, content) {
        this.messagesHistory.push({ role, content, timestamp: new Date().toISOString() });
        localStorage.setItem(this.config.storageKey, JSON.stringify(this.messagesHistory));
    }

    renderHistory() {
        this.messagesContainer.innerHTML = '';
        this.messagesHistory.forEach(msg => {
            if (msg.role === 'user') {
                this.addUserMessage(msg.content);
            } else {
                this.addBotMessage(msg.content, false);
            }
        });
    }

    formatText(text) {
        // Simples conversor de quebras de linha e links básicos
        return text
            .replace(/\n/g, '<br>')
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color:var(--chat-primary)">$1</a>');
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    handleAction(type, value) {
        if (type === 'link') {
            window.open(value, '_blank');
        } else if (type === 'message') {
            this.input.value = value;
            this.sendMessage();
        } else if (type === 'navigate') {
            window.location.href = value;
        }
    }
}

// Inicializa
document.addEventListener('DOMContentLoaded', () => {
    window.codersaChat = new ChatWidget();
});
