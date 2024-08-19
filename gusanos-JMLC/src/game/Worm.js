const { Bodies } = Matter;

export class Worm {
    constructor(x, y, color) {
        this.width = 30;
        this.height = 30;
        this.color = color;
        this.health = 100;
        this.body = Bodies.rectangle(x, y, this.width, this.height, {
            inertia: Infinity,
            friction: 0.5,
            frictionAir: 0.05,
        });
    }

    render(ctx) {
        const pos = this.body.position;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(pos.x - this.width / 2, pos.y - this.height / 2, this.width, this.height);
        ctx.fill();
    }
}