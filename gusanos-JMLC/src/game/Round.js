import { TURN_DURATION } from '../utils/Constants.js';

export default class Round {
    constructor(scene, teams) {
        this.scene = scene;
        this.teams = teams;
        this.currentTeamIndex = 0;
        this.timeLeft = TURN_DURATION;
        this.isActive = false;
        this.timer = null;
        this.activeWorm = null;
    }

    start() {
        this.isActive = true;
        this.nextTurn();
    }

    nextTurn() {
        this.currentTeamIndex = (this.currentTeamIndex + 1) % this.teams.length;
        this.timeLeft = TURN_DURATION;
        this.selectActiveWorm();
        this.startTimer();
        this.updateUI();
    }

    selectActiveWorm() {
        const currentTeam = this.getCurrentTeam();
        this.activeWorm = currentTeam.worms.find(worm => worm.health > 0);
        if (!this.activeWorm) {
            this.nextTurn();
        } else {
            this.activeWorm.activate();
        }
    }

    startTimer() {
        if (this.timer) {
            this.timer.remove();
        }
        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.updateTime,
            callbackScope: this,
            loop: true
        });
    }

    updateTime() {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
            this.endTurn();
        }
        this.updateUI();
    }

    endTurn() {
        if (this.timer) {
            this.timer.remove();
        }
        this.activeWorm.deactivate();
        this.activeWorm = null;
        this.nextTurn();
    }

    updateUI() {
        const currentTeam = this.getCurrentTeam();
        this.scene.updateTurnUI(currentTeam.name, this.timeLeft, this.activeWorm?.name);
    }

    getCurrentTeam() {
        return this.teams[this.currentTeamIndex];
    }

    getActiveWorm() {
        return this.activeWorm;
    }

    switchActiveWorm() {
        this.activeWorm.deactivate();

        const activeTeam = this.teams[this.currentTeamIndex];
        const activeWorms = activeTeam.getAliveWorms();
        
        if (activeWorms.length > 1) {
            const currentIndex = activeWorms.indexOf(this.activeWorm);
            const nextIndex = (currentIndex + 1) % activeWorms.length;
            this.activeWorm = activeWorms[nextIndex];
            this.activeWorm.activate();
            
            this.scene.updateTurnUI(activeTeam.name, this.timeLeft, this.activeWorm.name);
        }
    }
}