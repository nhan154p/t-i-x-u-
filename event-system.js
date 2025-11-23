class EventSystem {
    constructor() {
        this.events = {
            golden_hour: {
                name: 'Giờ vàng',
                active: false,
                startHour: 20,
                endHour: 22,
                bonus: 0.2, // +20%
                icon: '🌟'
            },
            weekend_boost: {
                name: 'Tăng cường cuối tuần',
                active: false,
                days: [5, 6], // Fri, Sat
                bonus: 0.15, // +15%
                icon: '📈'
            },
            monthly_jackpot: {
                name: 'Jackpot hàng tháng',
                active: false,
                day: 1,
                bonus: 0.5,
                icon: '💎'
            },
            seasonal_event: {
                name: 'Sự kiện theo mùa',
                active: false,
                bonus: 0.25,
                icon: '🎉'
            }
        };

        this.activeEvents = [];
        this.checkEvents();
        setInterval(() => this.checkEvents(), 60000); // Check mỗi phút
    }

    checkEvents() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay();
        const date = now.getDate();

        this.activeEvents = [];

        // Golden Hour (20h-22h)
        if (hour >= this.events.golden_hour.startHour && 
            hour < this.events.golden_hour.endHour) {
            this.events.golden_hour.active = true;
            this.activeEvents.push(this.events.golden_hour);
        } else {
            this.events.golden_hour.active = false;
        }

        // Weekend Boost
        if (this.events.weekend_boost.days.includes(day)) {
            this.events.weekend_boost.active = true;
            this.activeEvents.push(this.events.weekend_boost);
        } else {
            this.events.weekend_boost.active = false;
        }

        // Monthly Jackpot (1st of month)
        if (date === this.events.monthly_jackpot.day) {
            this.events.monthly_jackpot.active = true;
            this.activeEvents.push(this.events.monthly_jackpot);
        } else {
            this.events.monthly_jackpot.active = false;
        }

        // Seasonal (TET, NOEL, etc)
        if (this.isSeasonalEvent()) {
            this.events.seasonal_event.active = true;
            this.activeEvents.push(this.events.seasonal_event);
        } else {
            this.events.seasonal_event.active = false;
        }

        return this.activeEvents;
    }

    isSeasonalEvent() {
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();

        // TET (Jan 1), NOEL (Dec 25), etc
        if ((month === 1 && day === 1) || 
            (month === 12 && day === 25) ||
            (month === 2 && day === 14)) { // Valentine
            return true;
        }
        return false;
    }

    getTotalBonus() {
        return this.activeEvents.reduce((sum, event) => sum + event.bonus, 0);
    }

    applyEventBonus(baseAmount) {
        const bonus = this.getTotalBonus();
        return Math.floor(baseAmount * (1 + bonus));
    }

    getActiveEventsList() {
        return this.activeEvents.map(event => ({
            name: event.name,
            icon: event.icon,
            bonus: `+${Math.round(event.bonus * 100)}%`
        }));
    }

    scheduleSpecialPromotion() {
        // Tự động kích hoạt promotion vào thời gian cụ thể
        const now = new Date();
        
        // Check if it's a special promotion time
        const hour = now.getHours();
        const minute = now.getMinutes();

        if (hour === 20 && minute === 0) {
            return {
                type: 'golden_hour_alert',
                message: '🌟 Giờ vàng bắt đầu! Thắng x2 tất cả phần thưởng!',
                duration: 120 // 2 hours
            };
        }

        if (hour === 12 && minute === 0) {
            return {
                type: 'lunch_bonus',
                message: '🍽️ Thưởng giờ trưa: Nhận 50K Vàng miễn phí!',
                reward: { gold: 50000 }
            };
        }

        return null;
    }

    getEventSchedule() {
        return {
            golden_hour: 'Mỗi ngày 20:00 - 22:00 (+20% thắng)',
            weekend_boost: 'Thứ 6 - Thứ 7 (+15% thắng)',
            lunch_bonus: 'Hàng ngày 12:00 - 13:00 (Thưởng 50K)',
            monthly_jackpot: 'Ngày 1 hàng tháng (Jackpot x2)',
            seasonal: 'TET, NOEL, Valentine (Thưởng đặc biệt)'
        };
    }
}

// Khởi tạo hệ thống sự kiện
const eventSystem = new EventSystem();
