import { WORM_WIDTH, WORM_HEIGHT, WATER_HEIGHT, WORM_SPEED, WORM_JUMP_FORCE, ANGLE_CHANGE_RATE } from '../utils/Constants.js';
import Weapon from './Weapon.js';

export default class Worm {
    constructor(wormName, scene, team) {
        this.name = wormName;
        this.scene = scene;
        this.team = team;
        this.width = WORM_WIDTH;
        this.height = WORM_HEIGHT;
        this.health = 100; // Vida inicial del gusano
        this.position = this.getRandomValidPosition();
        this.isActive = false;
        this.isJumping = false;
        this.isSinking = false;
        this.velocityY = 0;
        // Dirección actual (1 para derecha, -1 para izquierda)
        this.direction = 1;
        this.graveSprite = null;
        
        this.spriteWalking = this.scene.add.sprite(this.position.x, this.position.y, 'sprites_worm_walking', 0);
        this.spriteWalking.setOrigin(0.5, 1);
        this.spriteWalking.setDisplaySize(WORM_WIDTH, WORM_HEIGHT);

        // Añadir el texto del nombre
        this.nameText = this.scene.add.text(this.position.x, this.position.y - 20, this.name, {
            fontSize: '16px',
            fill: this.team.color,
            stroke: this.team.color,
            strokeThickness: 1
        });
        this.nameText.setOrigin(0.5, 1);
        // Añadir el texto de la vida
        this.healthText = this.scene.add.text(this.position.x, this.position.y - 40, `${this.health}`, {
            fontSize: '16px',
            fill: this.team.color,
            stroke: this.team.color,
            strokeThickness: 1
        });
        this.healthText.setOrigin(0.5, 1);

        this.updateHealthDisplay();

        this.render();

        this.createDashedLineTexture();
        this.weapon = new Weapon(scene, this);
        this.weapon.hidePointer();
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
        return y + this.height >= this.scene.sys.game.config.height - WATER_HEIGHT - 1;
    }

    moveLeft() {
        const newX = this.position.x - WORM_SPEED;
        const newY = this.scene.map.findSurfaceY(newX) - this.height;
        if (!this.checkCollision(newX, newY)) {
            this.position.x = newX;
            this.position.y = newY;
            this.direction = -1;
            this.spriteWalking.setFlipX(false);
            if (!this.spriteWalking.anims.isPlaying) {
                this.spriteWalking.play('worm_walk');
            }
            if (this.isInWater(this.position.y)) {
                this.startSinking();
            }
        }
    }

    moveRight() {
        const newX = this.position.x + WORM_SPEED;
        const newY = this.scene.map.findSurfaceY(newX) - this.height;
        if (!this.checkCollision(newX, newY)) {
            this.position.x = newX;
            this.position.y = newY;
            this.direction = 1;
            this.spriteWalking.setFlipX(true);
            if (!this.spriteWalking.anims.isPlaying) {
                this.spriteWalking.play('worm_walk');
            }
            if (this.isInWater(this.position.y)) {
                this.startSinking();
            }
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
        if (this.isSinking) {
            this.position.y += 1;

            const waterBottom = this.scene.sys.game.config.height;
            if (this.position.y >= waterBottom) {
                this.position.y = waterBottom;
                this.die();
            }
        } else if (this.isJumping) {
            this.velocityY += 1; // Gravity effect
            this.position.y += this.velocityY;

            if (this.checkCollision(this.position.x, this.position.y)) {
                this.isJumping = false;
                this.velocityY = 0;
                this.position.y = this.scene.map.findSurfaceY(this.position.x) - this.height;
            }

            if (this.isInWater(this.position.y)) {
                this.die();
            }
        }
    }

    render() {
        this.spriteWalking.setPosition(this.position.x + this.width / 2, this.position.y + this.height);
        this.nameText.setPosition(this.position.x + this.width / 2, this.position.y - 5);
        this.healthText.setPosition(this.position.x + this.width / 2, this.position.y - 25);
    }

    update(cursors, enterKey) {
        if (!this.isActive) return;

        if (!this.isSinking) {
            if (cursors.left.isDown) {
                this.moveLeft();
            } else if (cursors.right.isDown) {
                this.moveRight();
            } else {
                this.spriteWalking.stop();
                this.spriteWalking.setFrame(0);
            }

            if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
                this.jump();
            }

            this.weapon.update(cursors, enterKey);
        }
        this.applyGravity();

        this.render();
    }

    startSinking() {
        if (!this.isSinking) {
            this.isSinking = true;
            this.weapon.hidePointer();
            this.spriteWalking.stop();
            this.spriteWalking.setFrame(0);
            this.spriteWalking.setTint(0x0000FF); // Tinte azul para indicar que está en el agua
        }
    }

    activate() {
        this.isActive = true;
        this.weapon.showPointer();
    }

    deactivate() {
        this.isActive = false;
        this.weapon.hidePointer();
    }

    takeDamage(damage) {
        this.health = Math.max(0, this.health - damage);
        if (this.health === 0) {
            this.die();
        }
        else {
            this.updateHealthDisplay();
        }
    }

    die() {
        this.health = 0;

        console.log(`El gusano ${this.name} ha sido eliminado`);
        this.nameText.destroy();
        this.healthText.destroy();
        this.spriteWalking.destroy();
        this.weapon.destroy();
        
        this.graveSprite = this.scene.add.sprite(this.position.x + this.width / 2, this.position.y, this.team.graveType);
        this.graveSprite.setOrigin(0.5, 1);
        this.graveSprite.setDisplaySize(WORM_WIDTH, WORM_HEIGHT);

        this.scene.events.emit('wormDied', this);
    }

    updateHealthDisplay() {
        this.healthText.setText(`${this.health}`);
        if (this.health > 70) {
            this.healthText.setColor('#00ff00');
        } else if (this.health > 30) {
            this.healthText.setColor('#ffff00');
        } else {
            this.healthText.setColor('#ff0000');
        }
    }

    createDashedLineTexture() {
        const graphicsGen = this.scene.make.graphics({ x: 0, y: 0, add: false });
        graphicsGen.lineStyle(1, 0xff0000, 1);
        graphicsGen.lineBetween(0, 0, 8, 0);
        graphicsGen.lineBetween(12, 0, 20, 0);
        graphicsGen.generateTexture('dashed_line', 20, 1);
        graphicsGen.destroy();
    }
}