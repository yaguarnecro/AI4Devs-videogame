const { Bodies } = Matter;

export class Worm {
    constructor(x, y, color) {
        this.width = 30;
        this.height = 30;
        this.color = color;
        this.health = 100;

        this.body = Bodies.rectangle(x, y, this.width, this.height, {
            friction: 0.5,
            restitution: 0.3
        });
    }

    render(ctx) {
        const pos = this.body.position;
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(this.body.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}