class ChatSystem {
    constructor() {
        this.messages = [];
        this.maxMessages = 50;
        this.playerName = 'Guest Player';
        this.setupEventListeners();
        this.addSystemMessage('Chào mừng bạn đến với TÀI XỈU LIVE!');
        this.simulateChat();
    }

    setupEventListeners() {
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('btn-send-chat');

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();

        if (!message) return;

        this.addMessage(this.playerName, message, 'player');
        input.value = '';
    }

    addMessage(username, text, type = 'user') {
        this.messages.push({
            username,
            text,
            type,
            timestamp: new Date()
        });

        if (this.messages.length > this.maxMessages) {
            this.messages.shift();
        }

        this.renderMessages();
    }

    addSystemMessage(text) {
        this.addMessage('System', text, 'system');
    }

    renderMessages() {
        const chatContainer = document.getElementById('chat-messages');
        if (!chatContainer) return;

        chatContainer.innerHTML = this.messages.map(msg => {
            if (msg.type === 'system') {
                return `
                    <div class="chat-message system">
                        <strong>${msg.text}</strong>
                    </div>
                `;
            } else {
                return `
                    <div class="chat-message">
                        <span class="chat-user">${msg.username}:</span>
                        <span>${msg.text}</span>
                    </div>
                `;
            }
        }).join('');

        // Auto scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    simulateChat() {
        const botMessages = [
            'Thắng rồi! 🎉',
            'Thua mà! 😢',
            'Đó là cơ hội đấy',
            'Hay quá!',
            'ALL IN!!!',
            'May mắn đấy',
            'Tiếp theo chắc chắn thắng',
            'Chơi đẹp lắm',
            'Kiếm bao nhiêu rồi?',
            'Vui lắm game này'
        ];

        const botNames = ['Player_' + Math.floor(Math.random() * 10000), 'Lucky_' + Math.floor(Math.random() * 1000), 'Master_' + Math.floor(Math.random() * 1000)];

        setInterval(() => {
            if (Math.random() < 0.3) {
                const botName = botNames[Math.floor(Math.random() * botNames.length)];
                const msg = botMessages[Math.floor(Math.random() * botMessages.length)];
                this.addMessage(botName, msg, 'user');
            }
        }, 5000);
    }

    setPlayerName(name) {
        this.playerName = name;
    }
}

const chatSystem = new ChatSystem();
