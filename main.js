// Khởi tạo game khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎲 TÀI XỈU LIVE - Casino Edition');
    console.log('═════════════════════════════════');

    // Initialize game engine
    const gameEngine = new GameEngine('#canvas-container');

    // Initialize all systems
    const systems = [
        walletSystem,
        gameLogic,
        audioManager,
        liveSystem,
        chatSystem,
        leaderboardSystem,
        modernUI,
        shareSystem
    ];

    // Update displays
    walletSystem.updateUI();
    modernUI.updateDisplay();
    leaderboardSystem.renderLeaderboard();
    liveSystem.updateRoundDisplay();
    liveSystem.updateOnlineCount();

    // Log server info
    console.log('✅ Server URL:', shareSystem.getShareUrl());
    console.log('💰 Balance:', walletSystem.formatNumber(walletSystem.currencies.gold));
    console.log('👥 Players:', liveSystem.onlineCount);

    // Simulate online players
    setInterval(() => {
        if (Math.random() < 0.3) liveSystem.addPlayer();
        if (Math.random() < 0.2 && liveSystem.onlineCount > 100) liveSystem.removePlayer();
    }, 30000);

    console.log('✅ Game ready');
});

// CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    .notification.success { background: #00cc44; color: #fff; }
    .notification.error { background: #ff3333; color: #fff; }
    .notification.info { background: #ffd700; color: #000; }
    .stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-top: 16px;
    }
    .stat-box {
        background: rgba(255, 215, 0, 0.1);
        padding: 12px;
        border-radius: 6px;
        text-align: center;
    }
    .stat-label { font-size: 12px; color: #999; margin-bottom: 4px; }
    .stat-value { font-size: 18px; font-weight: bold; color: #ffd700; }
`;
document.head.appendChild(style);
