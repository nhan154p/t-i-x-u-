class LeaderboardSystem {
    constructor() {
        this.leaderboard = [
            { rank: 1, name: 'KingPlayer', amount: 50000000, avatar: '👑' },
            { rank: 2, name: 'LuckyMaster', amount: 35000000, avatar: '🍀' },
            { rank: 3, name: 'Highroller', amount: 28000000, avatar: '💰' },
            { rank: 4, name: 'ProBetter', amount: 20000000, avatar: '🎯' },
            { rank: 5, name: 'GoldChaser', amount: 15000000, avatar: '⭐' },
            { rank: 6, name: 'BetMaster', amount: 12000000, avatar: '🎲' },
            { rank: 7, name: 'WinnerX', amount: 10000000, avatar: '🏆' },
            { rank: 8, name: 'DiceKing', amount: 8500000, avatar: '🎰' },
            { rank: 9, name: 'LuckyOne', amount: 7200000, avatar: '✨' },
            { rank: 10, name: 'MoneyMake', amount: 6000000, avatar: '💵' }
        ];

        this.filterType = 'today'; // today, week, month, all
        this.renderLeaderboard();
    }

    renderLeaderboard() {
        const container = document.getElementById('leaderboard-list');
        if (!container) return;

        container.innerHTML = this.leaderboard.map(player => `
            <div class="leaderboard-item">
                <div class="rank-badge ${this.getRankClass(player.rank)}">${player.rank}</div>
                <div class="leaderboard-name">${player.avatar} ${player.name}</div>
                <div class="leaderboard-amount">${this.formatNumber(player.amount)}</div>
            </div>
        `).join('');
    }

    getRankClass(rank) {
        if (rank === 1) return 'top1';
        if (rank === 2) return 'top2';
        if (rank === 3) return 'top3';
        return '';
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    addPlayer(name, amount) {
        const player = { rank: this.leaderboard.length + 1, name, amount, avatar: '👤' };
        this.leaderboard.push(player);
        this.sortLeaderboard();
        this.renderLeaderboard();
    }

    sortLeaderboard() {
        this.leaderboard.sort((a, b) => b.amount - a.amount);
        this.leaderboard.forEach((player, index) => {
            player.rank = index + 1;
        });
    }

    updatePlayerAmount(name, newAmount) {
        const player = this.leaderboard.find(p => p.name === name);
        if (player) {
            player.amount = newAmount;
            this.sortLeaderboard();
            this.renderLeaderboard();
        }
    }

    getTopPlayers(limit = 10) {
        return this.leaderboard.slice(0, limit);
    }
}

const leaderboardSystem = new LeaderboardSystem();
