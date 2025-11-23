class LiveSystem {
    constructor() {
        this.roundNumber = 1;
        this.roundTimer = 30;
        this.isRunning = false;
        this.onlineCount = 1234;
    }

    startRound() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.roundTimer = 30;

        this.timerInterval = setInterval(() => {
            this.roundTimer--;
            this.updateTimerDisplay();

            if (this.roundTimer <= 0) {
                this.endRound();
            }
        }, 1000);
    }

    endRound() {
        clearInterval(this.timerInterval);
        this.isRunning = false;

        setTimeout(() => {
            this.roundNumber++;
            this.roundTimer = 30;
            this.updateRoundDisplay();
            this.updateTimerDisplay();
        }, 3000);
    }

    updateTimerDisplay() {
        const el = document.getElementById('game-timer');
        if (el) el.textContent = this.roundTimer;
    }

    updateRoundDisplay() {
        const el = document.getElementById('current-round');
        if (el) el.textContent = String(this.roundNumber).padStart(3, '0');
    }

    updateOnlineCount() {
        const el = document.getElementById('player-count');
        if (el) {
            if (this.onlineCount >= 1000) {
                el.textContent = (this.onlineCount / 1000).toFixed(1) + 'K';
            } else {
                el.textContent = this.onlineCount.toString();
            }
        }
    }

    addPlayer() {
        this.onlineCount++;
        this.updateOnlineCount();
    }

    removePlayer() {
        this.onlineCount = Math.max(100, this.onlineCount - 1);
        this.updateOnlineCount();
    }
}

const liveSystem = new LiveSystem();
