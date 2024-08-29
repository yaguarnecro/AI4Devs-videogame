class Worm {
    constructor(map) {
        this.map = map;
        this.width = 100;
        this.height = 100;
        this.color = 'red';
        this.placeRandomly();
    }

    placeRandomly() {
        const x = Math.floor(Math.random() * (this.map.canvas.width - this.width));
        const y = this.map.findSurfaceY(x);
        this.x = x;
        this.y = y - this.height;
        console.log(`Worm placed at (${this.x}, ${this.y})`); // Add this for debugging
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
