class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.map = new Map(this.canvas, 'worms_mapa_1.png');
        this.worm = null;

        this.map.mapImage.onload = () => {
            this.worm = new Worm(this.map);
            this.draw();
        };
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.map.mapImage, 0, 0);
        if (this.worm) {
            this.worm.draw(this.ctx);
        }
    }
}

const game = new Game();
