class AudioManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterVolume = 0.7;
        this.sfxVolume = 0.8;
        this.musicVolume = 0.5;
    }

    playSound(type) {
        const volume = this.masterVolume * this.sfxVolume;
        
        switch(type) {
            case 'roll_dice':
                this.playDiceRoll(volume);
                break;
            case 'win_tai':
                this.playWinEffect('fire', volume);
                break;
            case 'win_xiu':
                this.playWinEffect('ice', volume);
                break;
            case 'win_baa':
                this.playWinEffect('rainbow', volume);
                break;
            case 'lose':
                this.playLoseEffect(volume);
                break;
            case 'click':
                this.playClick(volume);
                break;
        }
    }

    playDiceRoll(volume) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1);
        
        osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 1);
        
        osc.start();
        osc.stop(this.audioContext.currentTime + 1);
    }

    playWinEffect(type, volume) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        gain.gain.setValueAtTime(volume, this.audioContext.currentTime);
        
        if (type === 'fire') {
            // Rising pitch for TAI
            osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.1, this.audioContext.currentTime + 0.5);
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.5);
        } else if (type === 'ice') {
            // Falling pitch for XIU
            osc.frequency.setValueAtTime(600, this.audioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.1, this.audioContext.currentTime + 0.5);
            osc.start();
            osc.stop(this.audioContext.currentTime + 0.5);
        }
    }

    playLoseEffect(volume) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        gain.gain.setValueAtTime(volume * 0.5, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        osc.frequency.setValueAtTime(300, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.3);
        
        osc.start();
        osc.stop(this.audioContext.currentTime + 0.3);
    }

    playClick(volume) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        
        gain.gain.setValueAtTime(volume * 0.3, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        osc.frequency.setValueAtTime(1000, this.audioContext.currentTime);
        
        osc.start();
        osc.stop(this.audioContext.currentTime + 0.1);
    }

    setVolume(type, value) {
        switch(type) {
            case 'master':
                this.masterVolume = Math.max(0, Math.min(1, value));
                break;
            case 'sfx':
                this.sfxVolume = Math.max(0, Math.min(1, value));
                break;
            case 'music':
                this.musicVolume = Math.max(0, Math.min(1, value));
                break;
        }
    }
}

// Khởi tạo quản lý âm thanh toàn cục
const audioManager = new AudioManager();
