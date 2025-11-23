class Dashboard {
    constructor() {
        this.isOpen = false;
        this.createDashboardUI();
        this.setupEventListeners();
    }

    createDashboardUI() {
        const dashboard = document.createElement('div');
        dashboard.id = 'dashboard-panel';
        dashboard.className = 'dashboard-panel';
        dashboard.innerHTML = `
            <div class="dashboard-header">
                <h2>📊 Bảng điều khiển</h2>
                <button class="dashboard-close">✕</button>
            </div>

            <div class="dashboard-tabs">
                <button class="tab-btn active" data-tab="overview">Tổng quan</button>
                <button class="tab-btn" data-tab="statistics">Thống kê</button>
                <button class="tab-btn" data-tab="achievements">Thành tích</button>
                <button class="tab-btn" data-tab="vip">VIP</button>
                <button class="tab-btn" data-tab="events">Sự kiện</button>
            </div>

            <!-- Tab: Overview -->
            <div class="tab-content active" data-tab="overview">
                <div class="dashboard-section">
                    <h3>💰 Tài chính</h3>
                    <div class="stat-row">
                        <span>Vàng:</span>
                        <span id="dash-gold">0</span>
                    </div>
                    <div class="stat-row">
                        <span>Kim Cương:</span>
                        <span id="dash-diamond">0</span>
                    </div>
                    <div class="stat-row">
                        <span>Xu:</span>
                        <span id="dash-coin">0</span>
                    </div>
                </div>

                <div class="dashboard-section">
                    <h3>🎮 Phiên chơi hiện tại</h3>
                    <div class="stat-row">
                        <span>Chuỗi thắng:</span>
                        <span id="dash-wins">0</span>
                    </div>
                    <div class="stat-row">
                        <span>Chuỗi thua:</span>
                        <span id="dash-losses">0</span>
                    </div>
                    <div class="stat-row">
                        <span>Giờ vàng:</span>
                        <span id="dash-golden">❌</span>
                    </div>
                </div>

                <div class="dashboard-section">
                    <h3>🌟 Sự kiện hoạt động</h3>
                    <div id="active-events"></div>
                </div>
            </div>

            <!-- Tab: Statistics -->
            <div class="tab-content" data-tab="statistics">
                <div class="dashboard-section">
                    <h3>📈 Thống kê chơi</h3>
                    <div class="stat-row">
                        <span>Tổng ván:</span>
                        <span id="stat-total">0</span>
                    </div>
                    <div class="stat-row">
                        <span>Thắng:</span>
                        <span id="stat-wins">0</span>
                    </div>
                    <div class="stat-row">
                        <span>Thua:</span>
                        <span id="stat-losses">0</span>
                    </div>
                    <div class="stat-row">
                        <span>Tỷ lệ thắng:</span>
                        <span id="stat-rate">0%</span>
                    </div>
                    <div class="stat-row">
                        <span>Tổng cược:</span>
                        <span id="stat-bet">0</span>
                    </div>
                </div>

                <div class="dashboard-section">
                    <h3>💸 Tiền tệ</h3>
                    <div class="stat-row">
                        <span>Hoàn tiền tuần:</span>
                        <span id="stat-rebate">0</span>
                    </div>
                    <div class="stat-row">
                        <span>Bảo hiểm thua:</span>
                        <span id="stat-insurance">0</span>
                    </div>
                </div>
            </div>

            <!-- Tab: Achievements -->
            <div class="tab-content" data-tab="achievements">
                <div class="dashboard-section">
                    <h3>🏆 Tiến độ thành tích</h3>
                    <div class="progress-bar">
                        <div id="achievement-progress" class="progress-fill"></div>
                    </div>
                    <div class="stat-row">
                        <span>Đã mở khóa:</span>
                        <span id="achievement-count">0/30</span>
                    </div>
                </div>
                <div class="dashboard-section">
                    <h3>🎖️ Thành tích gần đây</h3>
                    <div id="recent-achievements"></div>
                </div>
            </div>

            <!-- Tab: VIP -->
            <div class="tab-content" data-tab="vip">
                <div class="dashboard-section">
                    <h3>⭐ Thông tin VIP</h3>
                    <div class="stat-row">
                        <span>Cấp độ:</span>
                        <span id="vip-level">1</span>
                    </div>
                    <div class="stat-row">
                        <span>VIP Tier:</span>
                        <span id="vip-tier">Thường</span>
                    </div>
                    <div class="stat-row">
                        <span>Kinh nghiệm:</span>
                        <span id="vip-exp">0</span>
                    </div>
                </div>

                <div class="dashboard-section">
                    <h3>👑 Quyền lợi VIP</h3>
                    <div id="vip-benefits"></div>
                </div>

                <div class="dashboard-section">
                    <h3>🆙 Nâng cấp VIP</h3>
                    <div id="vip-upgrade-options"></div>
                </div>
            </div>

            <!-- Tab: Events -->
            <div class="tab-content" data-tab="events">
                <div class="dashboard-section">
                    <h3>🎉 Lịch sự kiện</h3>
                    <div id="event-schedule"></div>
                </div>
                <div class="dashboard-section">
                    <h3>📅 Nhiệm vụ</h3>
                    <div id="quests-list"></div>
                </div>
            </div>
        `;

        document.body.appendChild(dashboard);
    }

    setupEventListeners() {
        // Close button
        document.querySelector('.dashboard-close').addEventListener('click', () => {
            this.close();
        });

        // Tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Menu button in HUD
        document.querySelector('.btn-menu').addEventListener('click', () => {
            this.toggle();
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        document.getElementById('dashboard-panel').classList.add('active');
        this.isOpen = true;
        this.updateDashboard();
    }

    close() {
        document.getElementById('dashboard-panel').classList.remove('active');
        this.isOpen = false;
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        event.target.classList.add('active');
        this.updateTabContent(tabName);
    }

    updateDashboard() {
        this.updateOverviewTab();
        this.updateStatisticsTab();
        this.updateAchievementsTab();
        this.updateVIPTab();
        this.updateEventsTab();
    }

    updateTabContent(tabName) {
        switch(tabName) {
            case 'overview':
                this.updateOverviewTab();
                break;
            case 'statistics':
                this.updateStatisticsTab();
                break;
            case 'achievements':
                this.updateAchievementsTab();
                break;
            case 'vip':
                this.updateVIPTab();
                break;
            case 'events':
                this.updateEventsTab();
                break;
        }
    }

    updateOverviewTab() {
        document.getElementById('dash-gold').textContent = walletSystem.formatNumber(walletSystem.currencies.gold);
        document.getElementById('dash-diamond').textContent = walletSystem.currencies.diamond;
        document.getElementById('dash-coin').textContent = walletSystem.formatNumber(walletSystem.currencies.coin);

        const stats = gameLogic.getStatistics();
        document.getElementById('dash-wins').textContent = stats.consecutiveWins;
        document.getElementById('dash-losses').textContent = stats.consecutiveLosses;

        const isGoldenHour = eventSystem.events.golden_hour.active;
        document.getElementById('dash-golden').textContent = isGoldenHour ? '✅ Hoạt động' : '❌';

        const eventsHtml = eventSystem.getActiveEventsList()
            .map(e => `<div class="event-badge">${e.icon} ${e.name} ${e.bonus}</div>`)
            .join('');
        document.getElementById('active-events').innerHTML = eventsHtml || '<span>Không có sự kiện nào</span>';
    }

    updateStatisticsTab() {
        const stats = gameLogic.getStatistics();
        document.getElementById('stat-total').textContent = stats.total;
        document.getElementById('stat-wins').textContent = stats.wins;
        document.getElementById('stat-losses').textContent = stats.losses;
        document.getElementById('stat-rate').textContent = stats.winRate;
        document.getElementById('stat-bet').textContent = walletSystem.formatNumber(stats.totalBet);

        const rebate = walletSystem.getWeeklyRebate();
        const insurance = walletSystem.getLossInsurance();
        document.getElementById('stat-rebate').textContent = walletSystem.formatNumber(rebate);
        document.getElementById('stat-insurance').textContent = walletSystem.formatNumber(insurance);
    }

    updateAchievementsTab() {
        const progress = achievementSystem.getProgress();
        const progressPercent = progress.percentage;
        document.getElementById('achievement-progress').style.width = progressPercent + '%';
        document.getElementById('achievement-count').textContent = `${progress.unlocked}/${progress.total}`;

        const achievements = achievementSystem.getAchievements();
        const recent = Object.entries(achievements)
            .filter(([_, a]) => a.unlocked)
            .slice(-5)
            .reverse();

        const html = recent
            .map(([id, ach]) => `<div class="achievement-item">${ach.icon} ${ach.name}</div>`)
            .join('');
        document.getElementById('recent-achievements').innerHTML = html || '<span>Chưa có thành tích nào</span>';
    }

    updateVIPTab() {
        const vipBenefits = vipSystem.getVIPBenefits();
        document.getElementById('vip-level').textContent = vipSystem.userLevel;
        document.getElementById('vip-tier').textContent = vipBenefits.name + ' ' + vipBenefits.icon;
        document.getElementById('vip-exp').textContent = walletSystem.formatNumber(vipSystem.experience);

        const benefitsHtml = `
            <div class="benefit-row">💰 Giới hạn cược: ${walletSystem.formatNumber(vipBenefits.dailyLimit)}</div>
            <div class="benefit-row">📊 Hoàn tiền: ${vipBenefits.weeklyRebate}</div>
            <div class="benefit-row">🎁 Thưởng hàng tháng: ${walletSystem.formatNumber(vipBenefits.monthlyBonus)}</div>
            ${vipBenefits.exclusiveTheme ? '<div class="benefit-row">🎨 Theme độc quyền</div>' : ''}
            ${vipBenefits.exclusiveEvents ? '<div class="benefit-row">🎉 Sự kiện độc quyền</div>' : ''}
            ${vipBenefits.dedicatedSupport ? '<div class="benefit-row">📞 Hỗ trợ ưu tiên</div>' : ''}
        `;
        document.getElementById('vip-benefits').innerHTML = benefitsHtml;

        const upgradeHtml = `
            <button class="upgrade-btn" onclick="vipSystem.upgradeVIP(1)">VIP 1 (10 Kim Cương)</button>
            <button class="upgrade-btn" onclick="vipSystem.upgradeVIP(2)">VIP 2 (50 Kim Cương)</button>
            <button class="upgrade-btn" onclick="vipSystem.upgradeVIP(3)">VIP 3 (100 Kim Cương)</button>
        `;
        document.getElementById('vip-upgrade-options').innerHTML = upgradeHtml;
    }

    updateEventsTab() {
        const schedule = eventSystem.getEventSchedule();
        const scheduleHtml = Object.entries(schedule)
            .map(([key, desc]) => `<div class="event-schedule">${desc}</div>`)
            .join('');
        document.getElementById('event-schedule').innerHTML = scheduleHtml;

        const quests = miniGameSystem.getActiveQuests();
        const questsHtml = [
            ...quests.daily.map(q => `<div class="quest-item">📋 ${q.name} (${q.progress}/${q.target})</div>`),
            ...quests.weekly.map(q => `<div class="quest-item">📅 ${q.name} (${q.progress}/${q.target})</div>`)
        ].join('');
        document.getElementById('quests-list').innerHTML = questsHtml;
    }
}

// Khởi tạo dashboard
const dashboard = new Dashboard();
