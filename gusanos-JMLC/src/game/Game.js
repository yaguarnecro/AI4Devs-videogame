import { Worm } from './Worm.js';

const { Engine, Render, Runner, World, Bodies, Composite } = Matter;

export class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.engine = Engine.create();
        this.world = this.engine.world;
        this.worm = null;

        this.loadMap();
    }

    loadMap() {
        this.mapImage = new Image();
        this.mapImage.src = 'assets/maps/worms_mapa_2.png';
        this.mapImage.onload = () => {
            this.canvas.width = this.mapImage.width;
            this.canvas.height = this.mapImage.height;
            this.createTerrainBody();
            this.setupRender();
            this.setupRunner();
            this.initializeGame();
        };
    }

    createTerrainBody() {
        // Create a static body for the terrain based on the map image
        // This is a simplified version; you might want to implement more complex terrain collision
        const ground = Bodies.rectangle(
            this.canvas.width / 2,
            this.canvas.height - 10,
            this.canvas.width,
            20,
            { isStatic: true }
        );
        World.add(this.world, ground);
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
        Render.run(this.render);
    }

    setupRunner() {
        this.runner = Runner.create();
        Runner.run(this.runner, this.engine);
    }

    initializeGame() {
        const position = this.findValidPosition();
        this.worm = new Worm(position.x, position.y, 'red');
        World.add(this.world, this.worm.body);

        this.gameLoop();
    }

    findValidPosition() {
        // This is a simplified version; you should implement more sophisticated logic
        // to find a valid position on the terrain
        const x = Math.random() * (this.canvas.width - 60) + 30;
        const y = Math.random() * (this.canvas.height / 2) + this.canvas.height / 4;
        return { x, y };
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.mapImage, 0, 0);
        
        this.renderWorm();
        
        requestAnimationFrame(() => this.gameLoop());
    }

    renderWorm() {
        if (this.worm) {
            this.worm.render(this.ctx);
        }
    }
}

// Initialize the game when the window loads
window.onload = () => {
    new Game();
};