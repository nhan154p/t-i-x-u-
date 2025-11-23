class ShareSystem {
    constructor() {
        this.serverUrl = window.location.origin;
        this.onlinePlayers = [];
        this.setupEventListeners();
        this.getServerInfo();
    }

    setupEventListeners() {
        const btnShare = document.getElementById('btn-share');
        const btnCopy = document.getElementById('btn-copy-link');
        const btnZalo = document.getElementById('btn-share-zalo');
        const btnFb = document.getElementById('btn-share-fb');
        const btnEmail = document.getElementById('btn-share-email');
        const modalClose = document.querySelector('#modal-share .modal-close');

        if (btnShare) {
            btnShare.addEventListener('click', () => this.showShareModal());
        }

        if (btnCopy) {
            btnCopy.addEventListener('click', () => this.copyLink());
        }

        if (btnZalo) {
            btnZalo.addEventListener('click', () => this.shareZalo());
        }

        if (btnFb) {
            btnFb.addEventListener('click', () => this.shareFacebook());
        }

        if (btnEmail) {
            btnEmail.addEventListener('click', () => this.shareEmail());
        }

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                document.getElementById('modal-share').classList.remove('active');
            });
        }
    }

    getServerInfo() {
        const linkInput = document.getElementById('share-link');
        if (linkInput) {
            linkInput.value = this.serverUrl;
        }
    }

    showShareModal() {
        document.getElementById('modal-share').classList.add('active');
        this.updateOnlineCount();
    }

    copyLink() {
        const link = document.getElementById('share-link');
        link.select();
        document.execCommand('copy');
        
        const btn = document.getElementById('btn-copy-link');
        const oldText = btn.textContent;
        btn.textContent = '✅ Đã copy';
        
        setTimeout(() => {
            btn.textContent = oldText;
        }, 2000);
    }

    shareZalo() {
        const text = `Chơi Tài Xỉu Live cùng tôi! 🎲\n${this.serverUrl}`;
        // Zalo doesn't have direct share API, copy to clipboard
        this.copyToClipboard(text);
        alert('✅ Sao chép thành công!\nMở Zalo và dán lại');
    }

    shareFacebook() {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.serverUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    }

    shareEmail() {
        const subject = 'Chơi Tài Xỉu Live cùng tôi';
        const body = `Tham gia chơi Tài Xỉu Live: ${this.serverUrl}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    updateOnlineCount() {
        const countEl = document.getElementById('online-count');
        if (countEl) {
            const count = liveSystem?.onlineCount || 1;
            countEl.textContent = `👥 ${count} người đang chơi`;
        }
    }

    getShareUrl() {
        return this.serverUrl;
    }

    getFullLink() {
        return `${this.serverUrl}?room=${this.generateRoomId()}`;
    }

    generateRoomId() {
        return 'room_' + Math.random().toString(36).substr(2, 9);
    }
}

const shareSystem = new ShareSystem();
