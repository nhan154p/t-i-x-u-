class UIController {
    constructor() {
        this.setupEventListeners();
        this.renderFavorites();
        walletSystem.updateUI();
    }

    setupEventListeners() {
        // Bet buttons
        document.querySelectorAll('.bet-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const amount = parseInt(e.target.dataset.amount);
                this.setBet(amount);
                audioManager.playSound('click');
            });
        });

        // Custom bet
        document.getElementById('custom-bet').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const amount = parseInt(e.target.value);
                if (amount > 0) {
                    this.setBet(amount);
                }
            }
        });

        // Add to favorites
        document.querySelector('.btn-add-favorite').addEventListener('click', () => {
            const amount = parseInt(document.getElementById('custom-bet').value);
            if (amount > 0) {
                walletSystem.addFavoriteBet(amount);
                this.renderFavorites();
                audioManager.playSound('click');
            }
        });

        // Roll button
        document.getElementById('btn-roll').addEventListener('click', () => {
            this.playGame();
        });

        // History button
        document.getElementById('btn-history').addEventListener('click', () => {
            this.showHistory();
        });

        // Giftcode button
        document.getElementById('btn-giftcode').addEventListener('click', () => {
            this.showGiftcodeModal();
        });

        // Recharge button
        document.getElementById('btn-recharge').addEventListener('click', () => {
            this.showRechargeModal();
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('active');
            });
        });

        // Giftcode redeem
        document.getElementById('btn-redeem').addEventListener('click', () => {
            this.redeemGiftcode();
        });

        // Close modal on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });
    }

    setBet(amount) {
        if (amount > walletSystem.currencies.gold) {
            alert('Số dư không đủ!');
            return;
        }

        walletSystem.currentBet = amount;
        document.getElementById('custom-bet').value = amount;
        
        // Update active state
        document.querySelectorAll('.bet-btn').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.amount) === amount);
        });
    }

    renderFavorites() {
        const container = document.getElementById('favorites-container');
        container.innerHTML = '';

        walletSystem.favorites.forEach(amount => {
            const badge = document.createElement('div');
            badge.className = 'favorite-badge';
            badge.textContent = this.formatNumber(amount);
            badge.addEventListener('click', () => {
                this.setBet(amount);
                audioManager.playSound('click');
            });
            container.appendChild(badge);
        });
    }

    formatNumber(num) {
        return walletSystem.formatNumber(num);
    }

    playGame() {
        if (walletSystem.currentBet <= 0) {
            alert('Vui lòng chọn số tiền cược');
            return;
        }

        const btn = document.getElementById('btn-roll');
        btn.disabled = true;

        // Play dice animation
        gameEngine.rollDices();
        audioManager.playSound('roll_dice');

        setTimeout(() => {
            const gameResult = gameLogic.playGame(walletSystem.currentBet);
            
            if (gameResult) {
                this.displayResult(gameResult);
                
                if (gameResult.won) {
                    audioManager.playSound(`win_${gameResult.result.type.toLowerCase()}`);
                } else {
                    audioManager.playSound('lose');
                }
            }

            btn.disabled = false;
            walletSystem.updateUI();
        }, 2000);
    }

    displayResult(gameResult) {
        const resultDisplay = document.getElementById('result-display');
        const resultText = document.getElementById('result-text');
        const resultMultiplier = document.getElementById('result-multiplier');

        resultText.textContent = `${gameResult.dice1} + ${gameResult.dice2} + ${gameResult.dice3} = ${gameResult.sum}`;
        resultMultiplier.textContent = gameResult.won ? 
            `✅ ${gameResult.result.name} - Thắng x${gameResult.result.payout}` :
            '❌ Thua';

        resultDisplay.style.animation = 'none';
        setTimeout(() => {
            resultDisplay.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    }

    showHistory() {
        const modal = document.getElementById('modal-history');
        const historyList = document.getElementById('history-list');
        const games = gameLogic.getGameHistory(20);

        historyList.innerHTML = '';
        games.forEach(game => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div><strong>${game.result.dice1 + game.result.dice2 + game.result.dice3}</strong> - 
                    ${game.result.result.name}</div>
                <div>${game.won ? '✅ Thắng' : '❌ Thua'} | Cược: ${this.formatNumber(game.bet)}</div>
                <div style="font-size: 12px; opacity: 0.7;">${new Date(game.timestamp).toLocaleTimeString('vi-VN')}</div>
            `;
            historyList.appendChild(item);
        });

        const stats = gameLogic.getStatistics();
        const statsDiv = document.createElement('div');
        statsDiv.style.cssText = 'padding: 10px; background: rgba(255, 215, 0, 0.1); border-radius: 4px; margin-top: 10px;';
        statsDiv.innerHTML = `
            <strong>Thống kê:</strong><br>
            Tổng ván: ${stats.total} | Thắng: ${stats.wins} | Thua: ${stats.losses}<br>
            Tỷ lệ: ${stats.winRate} | Tổng cược: ${this.formatNumber(stats.totalBet)}
        `;
        historyList.appendChild(statsDiv);

        modal.classList.add('active');
    }

    showGiftcodeModal() {
        document.getElementById('modal-giftcode').classList.add('active');
        document.getElementById('giftcode-input').value = '';
        document.getElementById('giftcode-message').textContent = '';
    }

    redeemGiftcode() {
        const code = document.getElementById('giftcode-input').value;
        const messageEl = document.getElementById('giftcode-message');

        if (!code.trim()) {
            messageEl.textContent = '❌ Vui lòng nhập mã quà tặng';
            return;
        }

        const result = giftcodeSystem.redeem(code, walletSystem);
        messageEl.textContent = result.message;
        messageEl.style.color = result.success ? '#00ff00' : '#ff6b6b';

        if (result.success) {
            document.getElementById('giftcode-input').value = '';
            walletSystem.updateUI();
            setTimeout(() => {
                document.getElementById('modal-giftcode').classList.remove('active');
            }, 1500);
        }
    }

    showRechargeModal() {
        alert('Tính năng nạp tiền sẽ được cập nhật sớm!');
    }
}

// Khởi tạo UI controller
const uiController = new UIController();
