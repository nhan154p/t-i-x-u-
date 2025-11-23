class WalletSystem {
    constructor() {
        this.currencies = {
            gold: 1000000,
            diamond: 50
        };
        this.currentBet = 0;
        this.transactionHistory = [];
        this.loadFromStorage();
    }

    loadFromStorage() {
        const saved = localStorage.getItem('wallet_data');
        if (saved) {
            const data = JSON.parse(saved);
            this.currencies = data.currencies || this.currencies;
        }
    }

    saveToStorage() {
        localStorage.setItem('wallet_data', JSON.stringify({
            currencies: this.currencies
        }));
    }

    placeBet(amount) {
        if (amount <= 0 || this.currencies.gold < amount) {
            return false;
        }
        this.currencies.gold -= amount;
        this.currentBet = amount;
        this.saveToStorage();
        return true;
    }

    winBet(multiplier = 2) {
        const winAmount = this.currentBet * multiplier;
        this.currencies.gold += winAmount;
        this.currentBet = 0;
        this.saveToStorage();
        return winAmount;
    }

    loseBet() {
        this.currentBet = 0;
        this.saveToStorage();
    }

    addReward(amount, currency = 'gold') {
        if (this.currencies[currency] !== undefined) {
            this.currencies[currency] += amount;
            this.saveToStorage();
        }
    }

    updateUI() {
        document.getElementById('balance-gold').textContent = this.formatNumber(this.currencies.gold);
        document.getElementById('balance-diamond').textContent = this.currencies.diamond;
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    getStats() {
        return {
            gold: this.formatNumber(this.currencies.gold),
            diamond: this.currencies.diamond,
            totalGames: gameLogic.gameHistory.length
        };
    }
}

const walletSystem = new WalletSystem();
