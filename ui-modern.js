class ModernUI {
    constructor() {
        this.setupEventListeners();
        this.updateDisplay();
    }

    setupEventListeners() {
        // Quick bet buttons
        document.querySelectorAll('.quick-bet').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const amount = parseInt(e.target.dataset.amount);
                this.selectBetAmount(amount);
            });
        });

        // Bet options (TAI/XIU/BAA)
        document.querySelectorAll('.bet-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const betType = e.target.closest('.bet-option').dataset.bet;
                this.placeBet(betType);
            });
        });

        // Buttons
        document.getElementById('btn-charge')?.addEventListener('click', () => {
            document.getElementById('modal-recharge').classList.add('active');
        });

        document.getElementById('btn-info')?.addEventListener('click', () => {
            this.showStats();
        });

        document.getElementById('btn-withdraw')?.addEventListener('click', () => {
            this.showNotification('Tính năng sẽ cập nhật', 'info');
        });

        document.getElementById('btn-all-in')?.addEventListener('click', () => {
            this.selectBetAmount(walletSystem.currencies.gold);
        });

        // Recharge amounts
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const amount = parseInt(e.target.dataset.amount);
                this.processRecharge(amount);
            });
        });

        // Modal close
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('active');
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        });

        // Chat
        document.getElementById('btn-send-chat')?.addEventListener('click', () => {
            chatSystem.sendMessage();
        });

        document.getElementById('chat-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') chatSystem.sendMessage();
        });
    }

    selectBetAmount(amount) {
        document.getElementById('custom-bet-amount').value = amount;
        audioManager.playSound('click');
    }

    placeBet(betType) {
        const amount = parseInt(document.getElementById('custom-bet-amount').value);

        if (!amount || amount <= 0) {
            this.showNotification('Chọn số tiền cược', 'error');
            return;
        }

        if (amount > walletSystem.currencies.gold) {
            this.showNotification('Vàng không đủ', 'error');
            return;
        }

        if (!walletSystem.placeBet(amount)) return;

        this.addTicket(betType, amount);
        liveSystem.startRound();
        audioManager.playSound('roll_dice');

        setTimeout(() => {
            const result = gameLogic.playGame(amount, betType);
            this.processBetResult(betType, amount, result);
            this.updateDisplay();
        }, 2000);
    }

    addTicket(betType, amount) {
        const container = document.getElementById('tickets-list');
        const ticketEl = document.createElement('div');
        ticketEl.className = 'ticket';
        ticketEl.id = 'ticket-' + Date.now();
        ticketEl.innerHTML = `
            <div class="ticket-header">
                <span class="ticket-bet">${betType}</span>
                <span class="ticket-amount">${walletSystem.formatNumber(amount)}</span>
            </div>
            <span class="ticket-status pending">Chờ...</span>
        `;
        container.insertBefore(ticketEl, container.firstChild);
    }

    processBetResult(betType, amount, result) {
        if (result.won) {
            this.showNotification(`✅ Thắng ${walletSystem.formatNumber(result.result.payout * amount)}!`, 'success');
        } else {
            this.showNotification('❌ Thua rồi', 'error');
        }
    }

    processRecharge(amount) {
        walletSystem.addReward(amount, 'gold');
        this.updateDisplay();
        this.showNotification(`Nạp +${walletSystem.formatNumber(amount)}`, 'success');
        document.getElementById('modal-recharge').classList.remove('active');
    }

    showStats() {
        const stats = gameLogic.getStats();
        const walletStats = walletSystem.getStats();
        const container = document.getElementById('stats-content');
        
        container.innerHTML = `
            <div class="stats-grid">
                <div class="stat-box">
                    <p class="stat-label">Vàng</p>
                    <p class="stat-value">${walletStats.gold}</p>
                </div>
                <div class="stat-box">
                    <p class="stat-label">Kim Cương</p>
                    <p class="stat-value">${walletStats.diamond}</p>
                </div>
                <div class="stat-box">
                    <p class="stat-label">Tổng ván</p>
                    <p class="stat-value">${stats.total}</p>
                </div>
                <div class="stat-box">
                    <p class="stat-label">Thắng/Thua</p>
                    <p class="stat-value">${stats.wins}/${stats.losses}</p>
                </div>
                <div class="stat-box">
                    <p class="stat-label">Tỷ lệ</p>
                    <p class="stat-value">${stats.winRate}%</p>
                </div>
                <div class="stat-box">
                    <p class="stat-label">Chuỗi</p>
                    <p class="stat-value">${gameLogic.consecutiveWins}</p>
                </div>
            </div>
        `;
        
        document.getElementById('modal-info').classList.add('active');
    }

    showNotification(message, type = 'info') {
        const notif = document.createElement('div');
        notif.className = 'notification ' + type;
        notif.textContent = message;
        notif.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            font-weight: bold;
            z-index: 2000;
            animation: slideInRight 0.3s ease;
        `;
        document.body.appendChild(notif);

        setTimeout(() => {
            notif.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }

    updateDisplay() {
        walletSystem.updateUI();
        this.updateHistory();
    }

    updateHistory() {
        const container = document.getElementById('history-tiles');
        if (!container) return;

        const history = gameLogic.gameHistory.slice(-10).reverse();
        container.innerHTML = history.map(game => {
            const type = game.result.result.type.toLowerCase();
            return `<div class="history-tile ${type}">${game.result.sum}</div>`;
        }).join('');
    }
}

const modernUI = new ModernUI();
