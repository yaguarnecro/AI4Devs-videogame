import { Worm } from './Worm.js';

const { Engine, Render, Runner, World, Bodies } = Matter;

export class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.engine = Engine.create();
        this.world = this.engine.world;
        this.render = null;
        this.runner = null;
        this.worm = null;

        this.loadMap();
    }

    loadMap() {
        this.mapImage = new Image();
        this.mapImage.src = 'assets/maps/worms_mapa_2.png';
        this.mapImage.onload = () => {
            this.initializeGame();
        };
    }

    initializeGame() {
        this.setupCanvas();
        this.setupRender();
        this.setupRunner();
        this.createGround();
        this.createWorm();
        this.startGame();
    }

    setupCanvas() {
        this.canvas.width = this.mapImage.width;
        this.canvas.height = this.mapImage.height;
    }

    setupRender() {
        this.render = Render.create({
            canvas: this.canvas,
            engine: this.engine,
            options: {
                width: this.canvas.width,
                height: this.canvas.height,
                wireframes: false,
                background: 'transparent'
            }
        });
    }

    setupRunner() {
        this.runner = Runner.create();
    }

    createGround() {
        const ground = Bodies.rectangle(
            this.canvas.width / 2,
            this.canvas.height - 10,
            this.canvas.width,
            20,
            { isStatic: true }
        );
        World.add(this.world, ground);
    }

    createWorm() {
        const position = this.findValidPosition();
        this.worm = new Worm(position.x, position.y, 'red');
        World.add(this.world, this.worm.body);
    }

    findValidPosition() {
        // Implementación simple: posición aleatoria en la mitad superior del canvas
        const x = Math.random() * this.canvas.width;
        const y = Math.random() * (this.canvas.height / 2);
        return { x, y };
    }

    startGame() {
        Render.run(this.render);
        Runner.run(this.runner, this.engine);
        this.gameLoop();
    }

    gameLoop() {
        this.update();
        this.renderGame();
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        Engine.update(this.engine, 1000 / 60);
    }

    renderGame() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(this.mapImage, 0, 0);
        
        // Render the worm
        this.worm.render(ctx);
    }
}

// Initialize the game when the window loads
window.onload = () => {
    new Game();
};