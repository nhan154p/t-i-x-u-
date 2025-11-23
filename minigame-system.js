class MiniGameSystem {
    constructor() {
        this.spinCounter = 0;
        this.wheelActive = false;
        this.luckySpin = this.generateLuckySpin();
    }

    generateLuckySpin() {
        // Vòng quay may mắn xuất hiện sau 10 ván
        return Math.floor(Math.random() * 10) + 1;
    }

    onGamePlayed() {
        this.spinCounter++;
        
        // Kích hoạt vòng quay may mắn
        if (this.spinCounter % 10 === 0) {
            return this.activateWheelSpin();
        }

        // Check lucky streak
        const stats = gameLogic.getStatistics();
        if (stats.consecutiveWins >= 5) {
            return this.activateLuckyStreak(stats.consecutiveWins);
        }

        return null;
    }

    activateWheelSpin() {
        const prizes = [
            { label: '50K Vàng', reward: { gold: 50000 }, chance: 0.2 },
            { label: '100K Vàng', reward: { gold: 100000 }, chance: 0.15 },
            { label: '5 Kim Cương', reward: { diamond: 5 }, chance: 0.1 },
            { label: '10 Kim Cương', reward: { diamond: 10 }, chance: 0.05 },
            { label: '2x cược tiếp theo', reward: { multiplier: 2 }, chance: 0.25 },
            { label: 'Thử lại', reward: { retry: true }, chance: 0.25 }
        ];

        const wheel = {
            type: 'wheel',
            prizes,
            spinning: true,
            result: null
        };

        // Simulate spin
        setTimeout(() => {
            const random = Math.random();
            let accumulated = 0;
            
            for (let prize of prizes) {
                accumulated += prize.chance;
                if (random <= accumulated) {
                    wheel.result = prize;
                    wheel.spinning = false;
                    this.applyPrize(prize);
                    break;
                }
            }
        }, 3000);

        return wheel;
    }

    activateLuckyStreak(winCount) {
        const multiplier = 1 + (winCount - 5) * 0.2; // 1.2x, 1.4x, 1.6x...
        
        return {
            type: 'lucky_streak',
            multiplier,
            message: `🔥 Lucky Streak x${multiplier.toFixed(1)}!`,
            winCount
        };
    }

    activateJackpot() {
        const baseJackpot = 1000000; // 1M Vàng base
        const timeBonus = Math.floor(Date.now() / 3600000) % 24; // Tăng theo giờ
        const totalJackpot = baseJackpot + (timeBonus * 50000);

        return {
            type: 'jackpot',
            amount: totalJackpot,
            message: `💎 JACKPOT! ${walletSystem.formatNumber(totalJackpot)} Vàng!`,
            probability: 0.001 // 0.1%
        };
    }

    completeDailyQuest(questId) {
        const quests = {
            'daily_plays': { plays: 10, reward: { gold: 50000, coin: 5000 } },
            'daily_wins': { wins: 5, reward: { gold: 100000, diamond: 2 } },
            'daily_bet': { betAmount: 1000000, reward: { gold: 200000, coin: 10000 } }
        };

        const quest = quests[questId];
        if (quest) {
            this.applyPrize(quest.reward);
            return quest;
        }
        return null;
    }

    completeWeeklyQuest(questId) {
        const quests = {
            'weekly_plays': { plays: 100, reward: { gold: 500000, diamond: 10 } },
            'weekly_wins': { wins: 50, reward: { gold: 1000000, diamond: 25 } },
            'weekly_streak': { streak: 20, reward: { diamond: 50, theme: 'golden' } }
        };

        const quest = quests[questId];
        if (quest) {
            this.applyPrize(quest.reward);
            return quest;
        }
        return null;
    }

    applyPrize(prize) {
        if (prize.reward) {
            if (prize.reward.gold) {
                walletSystem.addReward(prize.reward.gold, 'gold');
            }
            if (prize.reward.diamond) {
                walletSystem.addReward(prize.reward.diamond, 'diamond');
            }
            if (prize.reward.coin) {
                walletSystem.addReward(prize.reward.coin, 'coin');
            }
        }
        return true;
    }

    getActiveQuests() {
        return {
            daily: [
                { id: 'daily_plays', name: 'Chơi 10 ván', progress: gameLogic.gameHistory.length % 10, target: 10 },
                { id: 'daily_wins', name: 'Thắng 5 ván', progress: gameLogic.consecutiveWins, target: 5 },
                { id: 'daily_bet', name: 'Cược 1M Vàng', progress: 0, target: 1000000 }
            ],
            weekly: [
                { id: 'weekly_plays', name: 'Chơi 100 ván', progress: gameLogic.gameHistory.length % 100, target: 100 },
                { id: 'weekly_wins', name: 'Thắng 50 ván', progress: gameLogic.consecutiveWins, target: 50 },
                { id: 'weekly_streak', name: 'Chuỗi thắng 20', progress: gameLogic.consecutiveWins, target: 20 }
            ]
        };
    }
}

// Khởi tạo mini-game system
const miniGameSystem = new MiniGameSystem();
