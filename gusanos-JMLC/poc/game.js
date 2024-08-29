class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.map = new Map(this.canvas, 'worms_mapa_2.png');
        this.worm = null;

        this.init();
    }

    init() {
        const checkReady = () => {
            if (this.map.isReady) {
                console.log('Map is ready, initializing game');
                this.map.drawMap();
                this.worm = new Worm(this.map, this.ctx);
                this.draw();
            } else {
                console.log('Map not ready, checking again in 100ms');
                setTimeout(checkReady, 100);
            }
        };

        checkReady();
    }

    draw() {
        console.log('Drawing game frame');
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.drawMap();
        if (this.worm) {
            this.worm.draw();
        }
        requestAnimationFrame(() => this.draw());
    }
}

const game = new Game();
