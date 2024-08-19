import { Game } from './game/Game.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    canvas.width = 800;
    canvas.height = 600;

    const game = new Game(canvas);
});