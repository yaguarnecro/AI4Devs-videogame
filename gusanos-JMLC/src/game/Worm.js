import { WORM_WIDTH, WORM_HEIGHT, WATER_HEIGHT, WORM_SPEED, WORM_JUMP_FORCE } from '../utils/Constants.js';

export default class Worm {
    constructor(wormName, scene, team) {
        this.name = wormName;
        this.scene = scene;
        this.team = team;
        this.width = WORM_WIDTH;
        this.height = WORM_HEIGHT;
        this.health = 100;
        this.position = this.getRandomValidPosition();
        
        // Reemplazar this.graphics con un sprite
        this.spriteWalking = this.scene.add.sprite(this.position.x, this.position.y, 'sprites_worm_walking', 0);
        this.spriteWalking.setOrigin(0, 0);
        this.spriteWalking.setDisplaySize(WORM_WIDTH, WORM_HEIGHT);

        this.render();
        this.isJumping = false;
        this.velocityY = 0;
        // Dirección actual (1 para derecha, -1 para izquierda)
        this.direction = 1;
    }

    getRandomValidPosition() {
        let x, y;
        do {
            x = Math.random() * (this.scene.sys.game.config.width - this.width);
            y = this.scene.map.findSurfaceY(x);
        } while (y >= this.scene.sys.game.config.height - WATER_HEIGHT - this.height);

        return { x, y: y - this.height };
    }

    checkCollision(x, y) {
        const map = this.scene.map;
        return map.isTerrainAt(x, y + this.height);
    }

    isInWater(y) {
        return y + this.height > this.scene.sys.game.config.height - WATER_HEIGHT;
    }

    moveLeft() {
        const newX = this.position.x - WORM_SPEED;
        const newY = this.scene.map.findSurfaceY(newX) - this.height;
        if (!this.checkCollision(newX, newY)) {
            this.position.x = newX;
            this.position.y = newY;
            this.direction = -1;
            // this.spriteWalking.setFlipX(true);
            // if (!this.spriteWalking.anims.isPlaying) {
            //     this.spriteWalking.play('worm_walk');
            // }
        }
    }

    moveRight() {
        const newX = this.position.x + WORM_SPEED;
        const newY = this.scene.map.findSurfaceY(newX) - this.height;
        if (!this.checkCollision(newX, newY)) {
            this.position.x = newX;
            this.position.y = newY;
            this.direction = 1;
            // this.spriteWalking.setFlipX(false);
            // if (!this.spriteWalking.anims.isPlaying) {
            //     this.spriteWalking.play('worm_walk');
            // }
        }
    }

    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.velocityY = -WORM_JUMP_FORCE;
            // this.spriteWalking.play('worm_jump');
        }
    }

    applyGravity() {
        if (this.isJumping) {
            this.velocityY += 1; // Gravity effect
            this.position.y += this.velocityY;

            if (this.checkCollision(this.position.x, this.position.y)) {
                this.isJumping = false;
                this.velocityY = 0;
                this.position.y = this.scene.map.findSurfaceY(this.position.x) - this.height;
            }

            if (this.isInWater(this.position.y)) {
                this.health = 0; // Worm dies in water
            }
        }
    }

    render() {
        this.spriteWalking.setPosition(this.position.x, this.position.y);
    }

    update() {
        this.applyGravity();
        // Si no está moviéndose ni saltando, detener la animación
        // if (!this.isJumping && this.spriteWalking.anims.currentAnim && this.spriteWalking.anims.currentAnim.key === 'worm_walk') {
            // this.spriteWalking.stop();
        // }
        this.render();
    }
}