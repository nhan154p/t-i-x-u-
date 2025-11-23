class AchievementSystem {
    constructor() {
        this.achievements = {
            // Beginner
            'first_game': { 
                name: 'Khởi đầu', 
                desc: 'Chơi ván đầu tiên', 
                icon: '🎮', 
                reward: { coin: 1000 },
                unlocked: false
            },
            'first_win': { 
                name: 'Ước mơ đầu tiên', 
                desc: 'Thắng ván đầu tiên', 
                icon: '✨', 
                reward: { coin: 5000 },
                unlocked: false
            },
            'lucky_10': { 
                name: 'May mắn', 
                desc: 'Thắng 10 ván', 
                icon: '🍀', 
                reward: { gold: 100000 },
                unlocked: false
            },

            // Intermediate
            'win_streak_5': { 
                name: 'Chuỗi vàng', 
                desc: 'Thắng 5 ván liên tiếp', 
                icon: '🔥', 
                reward: { gold: 500000, diamond: 5 },
                unlocked: false
            },
            'big_bet': { 
                name: 'Người dám chơi', 
                desc: 'Cược 1M Vàng trong 1 ván', 
                icon: '💰', 
                reward: { diamond: 10 },
                unlocked: false
            },
            'collector': { 
                name: 'Nhà sưu tập', 
                desc: 'Kích hoạt 10 giftcode', 
                icon: '🎁', 
                reward: { gold: 250000 },
                unlocked: false
            },

            // Advanced
            'win_1m': { 
                name: 'Triệu phú', 
                desc: 'Kiếm tổng 1M Vàng', 
                icon: '👑', 
                reward: { diamond: 25 },
                unlocked: false
            },
            'master_bettor': { 
                name: 'Thầy cuốc', 
                desc: 'Thắng 100 ván', 
                icon: '🥇', 
                reward: { gold: 2000000, diamond: 50 },
                unlocked: false
            },
            'legend': { 
                name: 'Huyền thoại', 
                desc: 'Thắng 20 ván liên tiếp', 
                icon: '⚡', 
                reward: { gold: 5000000, diamond: 100 },
                unlocked: false
            },

            // Special
            'golden_hour': { 
                name: 'Giờ vàng', 
                desc: 'Thắng trong giờ vàng (20h-22h)', 
                icon: '🌟', 
                reward: { gold: 150000 },
                unlocked: false
            },
            'weekend_warrior': { 
                name: 'Chiến binh cuối tuần', 
                desc: 'Thắng 30 ván vào cuối tuần', 
                icon: '⭐', 
                reward: { diamond: 15 },
                unlocked: false
            }
        };

        this.unlockedCount = 0;
        this.loadAchievements();
    }

    loadAchievements() {
        const saved = localStorage.getItem('achievements');
        if (saved) {
            const data = JSON.parse(saved);
            Object.keys(data).forEach(key => {
                if (this.achievements[key]) {
                    this.achievements[key].unlocked = data[key].unlocked;
                    this.achievements[key].unlockedTime = data[key].unlockedTime;
                }
            });
        }
        this.unlockedCount = Object.values(this.achievements).filter(a => a.unlocked).length;
    }

    saveAchievements() {
        const data = {};
        Object.keys(this.achievements).forEach(key => {
            data[key] = {
                unlocked: this.achievements[key].unlocked,
                unlockedTime: this.achievements[key].unlockedTime
            };
        });
        localStorage.setItem('achievements', JSON.stringify(data));
    }

    checkAchievements() {
        const stats = gameLogic.getStatistics();
        const unlockedNew = [];

        // First game
        if (stats.total === 1 && !this.achievements.first_game.unlocked) {
            this.unlock('first_game');
            unlockedNew.push('first_game');
        }

        // First win
        if (stats.wins === 1 && !this.achievements.first_win.unlocked) {
            this.unlock('first_win');
            unlockedNew.push('first_win');
        }

        // Lucky 10
        if (stats.wins >= 10 && !this.achievements.lucky_10.unlocked) {
            this.unlock('lucky_10');
            unlockedNew.push('lucky_10');
        }

        // Win streak 5
        if (stats.consecutiveWins >= 5 && !this.achievements.win_streak_5.unlocked) {
            this.unlock('win_streak_5');
            unlockedNew.push('win_streak_5');
        }

        // Big bet
        if (walletSystem.currentBet >= 1000000 && !this.achievements.big_bet.unlocked) {
            this.unlock('big_bet');
            unlockedNew.push('big_bet');
        }

        // Master bettor
        if (stats.wins >= 100 && !this.achievements.master_bettor.unlocked) {
            this.unlock('master_bettor');
            unlockedNew.push('master_bettor');
        }

        // Legend
        if (stats.consecutiveWins >= 20 && !this.achievements.legend.unlocked) {
            this.unlock('legend');
            unlockedNew.push('legend');
        }

        return unlockedNew;
    }

    unlock(achievementId) {
        if (this.achievements[achievementId] && !this.achievements[achievementId].unlocked) {
            this.achievements[achievementId].unlocked = true;
            this.achievements[achievementId].unlockedTime = new Date().toISOString();
            this.unlockedCount++;

            // Apply reward
            const achievement = this.achievements[achievementId];
            if (achievement.reward.gold) {
                walletSystem.addReward(achievement.reward.gold, 'gold');
            }
            if (achievement.reward.diamond) {
                walletSystem.addReward(achievement.reward.diamond, 'diamond');
            }
            if (achievement.reward.coin) {
                walletSystem.addReward(achievement.reward.coin, 'coin');
            }

            this.saveAchievements();
            this.showUnlockNotification(achievement);
        }
    }

    showUnlockNotification(achievement) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ffd700, #ffed4e);
            color: #000;
            padding: 30px 50px;
            border-radius: 12px;
            font-size: 24px;
            font-weight: bold;
            z-index: 2000;
            animation: slideDown 0.5s ease-out;
            box-shadow: 0 0 40px rgba(255, 215, 0, 0.8);
        `;
        
        notification.innerHTML = `
            <div>${achievement.icon} ${achievement.name}</div>
            <div style="font-size: 14px; margin-top: 10px;">${achievement.desc}</div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideUp 0.5s ease-in';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    getAchievements() {
        return this.achievements;
    }

    getProgress() {
        return {
            unlocked: this.unlockedCount,
            total: Object.keys(this.achievements).length,
            percentage: Math.round((this.unlockedCount / Object.keys(this.achievements).length) * 100)
        };
    }
}

// Khởi tạo hệ thống thành tích
const achievementSystem = new AchievementSystem();
