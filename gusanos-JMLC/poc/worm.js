class Worm {
    constructor(map, ctx) {
        this.map = map;
        this.ctx = ctx;
        this.width = 10;
        this.height = 10;
        this.color = 'red';
        this.placeRandomly();
    }

    placeRandomly() {
        const x = Math.floor(Math.random() * (this.map.canvas.width - this.width));
        const y = this.map.findSurfaceY(x, this);
        this.x = x;
        this.y = Math.min(y - this.height, this.map.canvas.height - this.height);
        console.log(`Worm placed at (${this.x}, ${this.y})`);
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        console.log(`Drawing worm at (${this.x}, ${this.y})`);
    }
}
