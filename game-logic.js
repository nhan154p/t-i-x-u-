class GameLogic {
    constructor() {
        this.gameHistory = [];
        this.consecutiveWins = 0;
        this.consecutiveLosses = 0;
    }

    rollDices() {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        const dice3 = Math.floor(Math.random() * 6) + 1;
        const sum = dice1 + dice2 + dice3;

        return {
            dice1, dice2, dice3, sum,
            result: this.determineResult(sum, dice1, dice2, dice3)
        };
    }

    determineResult(sum, d1, d2, d3) {
        if (d1 === d2 && d2 === d3) {
            return {
                type: 'BAA',
                name: 'Ba mặt',
                multiplier: 8,
                payout: 8
            };
        }
        return {
            type: sum >= 11 ? 'TAI' : 'XIU',
            name: sum >= 11 ? 'TÀI' : 'XỈU',
            multiplier: 2,
            payout: 2
        };
    }

    playGame(amount, playerBet) {
        const game = this.rollDices();
        const won = game.result.type === playerBet;

        if (won) {
            this.consecutiveWins++;
            this.consecutiveLosses = 0;
            walletSystem.winBet(game.result.payout);
        } else {
            this.consecutiveLosses++;
            this.consecutiveWins = 0;
            walletSystem.loseBet();
        }

        this.gameHistory.push({
            timestamp: new Date(),
            bet: amount,
            result: game,
            won,
            playerBet
        });

        return { ...game, won };
    }

    getStats() {
        const total = this.gameHistory.length;
        const wins = this.gameHistory.filter(g => g.won).length;
        return {
            total,
            wins,
            losses: total - wins,
            winRate: total > 0 ? ((wins / total) * 100).toFixed(1) : 0
        };
    }
}

const gameLogic = new GameLogic();
