import { MAX_WORMS_PER_TEAM } from '../utils/Constants.js';

export default class Team {
    constructor(color, name) {
        this.color = color;
        this.name = name;
        this.worms = [];
        this.activeWormIndex = 0;
    }

    addWorm(worm) {
        if (this.worms.length < MAX_WORMS_PER_TEAM) {
            this.worms.push(worm);
        } else {
            console.warn(`Cannot add more worms to team ${this.name}. Maximum limit reached.`);
        }
    }

    getActiveWorm() {
        return this.worms[this.activeWormIndex];
    }

    nextWorm() {
        this.activeWormIndex = (this.activeWormIndex + 1) % this.worms.length;
    }

    isDefeated() {
        return this.worms.every(worm => worm.health <= 0);
    }

    getTotalHealth() {
        return this.worms.reduce((total, worm) => total + worm.health, 0);
    }

    reset() {
        this.worms = [];
        this.activeWormIndex = 0;
    }
}
