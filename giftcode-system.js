class GiftcodeSystem {
    constructor() {
        this.codes = {
            // Sự kiện
            'TET2024': { gold: 100000, diamond: 10, coin: 50000, used: false },
            'NOEL2024': { gold: 80000, diamond: 8, coin: 40000, used: false },
            'VALENTINE': { gold: 50000, diamond: 5, coin: 25000, used: false },

            // Giới thiệu
            'REF100K': { gold: 100000, coin: 0, used: false },
            'INVITE50K': { gold: 50000, coin: 0, used: false },

            // Streamer
            'TIKTOK': { gold: 200000, diamond: 20, used: false },
            'YOUTUBE': { gold: 150000, diamond: 15, used: false },
            'FACEBOOK': { gold: 100000, diamond: 10, used: false },

            // Nạp thẻ
            'FIRST100K': { gold: 100000, used: false },
            'WELCOME500K': { gold: 500000, diamond: 25, used: false },

            // Tự động
            'THUA3LIEN': { gold: 20000, trigger: 'loss_streak_3', used: false },
            'CUOITUAN': { gold: 15000, trigger: 'weekend', used: false },
            'NAPLANDAU': { multiplier: 1.5, trigger: 'first_recharge', used: false },
            'HEN10': { gold: 10000, trigger: 'login_time', time: '20:00-22:00' },

            // VIP
            'VIP1': { gold: 100000, diamond: 5, theme: 'vip1', used: false },
            'LEVEL50': { gold: 50000, diamond: 3, theme: 'level50', used: false },
            'STREAMER123': { gold: 500000, diamond: 50, used: false },
            'TOP1': { gold: 1000000, diamond: 100, used: false }
        };
        
        this.usedCodes = [];
        this.loadUsedCodes();
    }

    loadUsedCodes() {
        const saved = localStorage.getItem('used_codes');
        if (saved) {
            this.usedCodes = JSON.parse(saved);
        }
    }

    saveUsedCodes() {
        localStorage.setItem('used_codes', JSON.stringify(this.usedCodes));
    }

    redeem(code, wallet) {
        const upperCode = code.toUpperCase().trim();

        // Check if code exists
        if (!this.codes[upperCode]) {
            return {
                success: false,
                message: '❌ Mã quà tặng không tồn tại'
            };
        }

        // Check if already used
        if (this.usedCodes.includes(upperCode)) {
            return {
                success: false,
                message: '❌ Mã quà tặng đã được sử dụng'
            };
        }

        const reward = this.codes[upperCode];

        // Apply rewards
        if (reward.gold) {
            wallet.addReward(reward.gold, 'gold');
        }
        if (reward.diamond) {
            wallet.addReward(reward.diamond, 'diamond');
        }
        if (reward.coin) {
            wallet.addReward(reward.coin, 'coin');
        }

        // Mark as used
        this.usedCodes.push(upperCode);
        this.saveUsedCodes();

        return {
            success: true,
            message: `✅ Nhận thưởng: ${reward.gold || 0} Vàng, ${reward.diamond || 0} Kim Cương`,
            reward
        };
    }

    checkAutoTriggers(wallet) {
        const currentHour = new Date().getHours();
        
        // Check HEN10 - login between 20:00-22:00
        if (currentHour >= 20 && currentHour < 22 && !this.usedCodes.includes('HEN10')) {
            return this.redeem('HEN10', wallet);
        }

        // Check weekend bonus
        const day = new Date().getDay();
        if ((day === 5 || day === 6) && !this.usedCodes.includes('CUOITUAN')) {
            return this.redeem('CUOITUAN', wallet);
        }

        return null;
    }

    getActivePromotions() {
        return Object.keys(this.codes)
            .filter(code => !this.usedCodes.includes(code))
            .map(code => ({
                code,
                ...this.codes[code]
            }));
    }

    isCodeValid(code) {
        return this.codes[code.toUpperCase()] && 
               !this.usedCodes.includes(code.toUpperCase());
    }
}

// Khởi tạo hệ thống giftcode toàn cục
const giftcodeSystem = new GiftcodeSystem();
