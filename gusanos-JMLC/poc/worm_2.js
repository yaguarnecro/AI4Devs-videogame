class Worm {
    constructor(map) {
        this.map = map;
        this.width = 20;
        this.height = 20;
        this.color = 'pink';
        this.placeRandomly();
    }

    placeRandomly() {
        const x = Math.floor(Math.random() * (this.map.canvas.width - this.width));
        const y = this.map.findSurfaceY(x);
        this.x = x;
        this.y = y - this.height;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
