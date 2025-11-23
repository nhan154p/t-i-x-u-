class VIPSystem {
    constructor() {
        this.userLevel = 1;
        this.userVIP = 0;
        this.experience = 0;
        this.levelRequirements = {
            1: 0,
            2: 100000,
            3: 500000,
            4: 1000000,
            5: 2000000,
            50: 100000000
        };

        this.vipTiers = {
            0: {
                name: 'Thường',
                dailyLimit: 10000000,
                weeklyRebate: 0.05,
                icon: '⭐'
            },
            1: {
                name: 'VIP 1',
                dailyLimit: 50000000,
                weeklyRebate: 0.08,
                exclusiveTheme: 'gold',
                icon: '✨'
            },
            2: {
                name: 'VIP 2',
                dailyLimit: 100000000,
                weeklyRebate: 0.1,
                exclusiveTheme: 'diamond',
                monthlyBonus: 5000000,
                icon: '💎'
            },
            3: {
                name: 'VIP 3',
                dailyLimit: 500000000,
                weeklyRebate: 0.15,
                monthlyBonus: 20000000,
                exclusiveEvents: true,
                dedicatedSupport: true,
                icon: '👑'
            }
        };

        this.loadVIPData();
    }

    loadVIPData() {
        const saved = localStorage.getItem('vip_data');
        if (saved) {
            const data = JSON.parse(saved);
            this.userLevel = data.level || 1;
            this.userVIP = data.vip || 0;
            this.experience = data.exp || 0;
        }
    }

    saveVIPData() {
        localStorage.setItem('vip_data', JSON.stringify({
            level: this.userLevel,
            vip: this.userVIP,
            exp: this.experience
        }));
    }

    addExperience(amount) {
        this.experience += amount;

        // Check level up
        const nextLevel = this.userLevel + 1;
        if (this.levelRequirements[nextLevel] && 
            this.experience >= this.levelRequirements[nextLevel]) {
            this.levelUp();
        }

        this.saveVIPData();
    }

    levelUp() {
        this.userLevel++;
        
        const levelUpReward = {
            gold: this.userLevel * 50000,
            coin: this.userLevel * 10000
        };

        walletSystem.addReward(levelUpReward.gold, 'gold');
        walletSystem.addReward(levelUpReward.coin, 'coin');

        this.showLevelUpNotification();
    }

    upgradeVIP(tier) {
        if (tier < 0 || tier > 3) return false;

        const cost = {
            1: 10, // 10 Kim Cương
            2: 50,
            3: 100
        };

        if (tier > 0 && walletSystem.currencies.diamond < cost[tier]) {
            alert('Kim Cương không đủ để nâng VIP');
            return false;
        }

        if (tier > 0) {
            walletSystem.updateBalance('diamond', -cost[tier]);
        }

        this.userVIP = tier;
        this.saveVIPData();
        return true;
    }

    getDailyBetLimit() {
        return this.vipTiers[this.userVIP].dailyLimit;
    }

    getWeeklyRebateRate() {
        return this.vipTiers[this.userVIP].weeklyRebate;
    }

    getMonthlyBonus() {
        const tier = this.vipTiers[this.userVIP];
        return tier.monthlyBonus || 0;
    }

    hasExclusiveEvents() {
        return this.userVIP === 3;
    }

    hasDedicatedSupport() {
        return this.userVIP === 3;
    }

    getVIPBenefits() {
        const tier = this.vipTiers[this.userVIP];
        return {
            name: tier.name,
            icon: tier.icon,
            dailyLimit: this.getDailyBetLimit(),
            weeklyRebate: `${this.getWeeklyRebateRate() * 100}%`,
            monthlyBonus: this.getMonthlyBonus(),
            exclusiveTheme: tier.exclusiveTheme,
            exclusiveEvents: tier.exclusiveEvents,
            dedicatedSupport: tier.dedicatedSupport
        };
    }

    showLevelUpNotification() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #00d4ff, #00f5ff);
            color: #000;
            padding: 20px 30px;
            border-radius: 8px;
            font-weight: bold;
            z-index: 2000;
            animation: slideInRight 0.5s ease-out;
            box-shadow: 0 0 30px rgba(0, 212, 255, 0.6);
        `;

        notification.innerHTML = `
            <div>📈 Level Up! ${this.userLevel}</div>
            <div style="font-size: 12px;">+${this.userLevel * 50000} Vàng</div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Khởi tạo VIP system
const vipSystem = new VIPSystem();
