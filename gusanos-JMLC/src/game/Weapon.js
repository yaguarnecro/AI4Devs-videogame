import { POINTER_DISTANCE, ANGLE_CHANGE_RATE } from '../utils/Constants.js';

export default class Weapon {
    constructor(scene, worm) {
        this.scene = scene;
        this.worm = worm;
        this.pointer = null;
        this.pointerDistance = POINTER_DISTANCE;
        this.angle = 0;
        this.minAngle = -90;
        this.maxAngle = 90;
        this.isFiring = false;
        this.bulletSpeed = 10;
        this.damage = 40;
        this.createPointer();
    }

    createPointer() {
        this.pointer = this.scene.add.circle(0, 0, 5, 0xff0000);
        this.updatePointerPosition();
    }

    updatePointerPosition() {
        const radians = Phaser.Math.DegToRad(this.angle);
        const direction = this.worm.direction;
        
        const x = this.worm.position.x + (this.worm.width / 2) + (Math.cos(radians) * this.pointerDistance * direction);
        const y = this.worm.position.y + (this.worm.height / 2) - Math.sin(radians) * this.pointerDistance;

        this.pointer.setPosition(x, y);
    }

    increaseAngle() {
        this.angle = Math.min(this.angle + ANGLE_CHANGE_RATE, this.maxAngle);
        this.updatePointerPosition();
    }

    decreaseAngle() {
        this.angle = Math.max(this.angle - ANGLE_CHANGE_RATE, this.minAngle);
        this.updatePointerPosition();
    }

    fire() {
        if (!this.isFiring) {
            this.isFiring = true;
            console.log("BOOM");
            this.calculateTrajectory();
            this.scene.events.emit('weaponFired');
            this.isFiring = false;
        }
    }

    calculateTrajectory() {
        const startX = this.worm.position.x + (this.worm.width / 2);
        const startY = this.worm.position.y + (this.worm.height / 2);
        const radians = Phaser.Math.DegToRad(this.angle);
        const direction = this.worm.direction;

        let currentX = startX;
        let currentY = startY;
        const stepX = Math.cos(radians) * this.bulletSpeed * direction;
        const stepY = -Math.sin(radians) * this.bulletSpeed;

        while (this.isInsideWorld(currentX, currentY)) {
            if (this.checkCollisionWithTerrain(currentX, currentY)) {
                console.log(`Impacto en el terreno en (${currentX}, ${currentY})`);
                return;
            }

            const hitWorm = this.checkCollisionWithWorms(currentX, currentY);
            if (hitWorm) {
                console.log(`Impacto en el gusano ${hitWorm.name} en (${currentX}, ${currentY})`);
                this.damageWorm(hitWorm);
                return;
            }

            currentX += stepX;
            currentY += stepY;
        }

        console.log(`El disparo salió del mundo en (${currentX}, ${currentY})`);
    }

    damageWorm(worm) {
        worm.takeDamage(this.damage);
        console.log(`El gusano ${worm.name} ha recibido ${this.damage} de daño. Vida restante: ${worm.health}`);
    }

    isInsideWorld(x, y) {
        return x >= 0 && x < this.scene.sys.game.config.width &&
               y >= 0 && y < this.scene.sys.game.config.height;
    }

    checkCollisionWithTerrain(x, y) {
        return this.scene.map.isTerrainAt(x, y);
    }

    checkCollisionWithWorms(x, y) {
        for (const worm of this.scene.worms) {
            if (worm !== this.worm && // No colisionar con el gusano que dispara
                x >= worm.position.x && x <= worm.position.x + worm.width &&
                y >= worm.position.y && y <= worm.position.y + worm.height) {
                return worm;
            }
        }
        return null;
    }

    showPointer() {
        this.pointer.setVisible(true);
    }

    hidePointer() {
        this.pointer.setVisible(false);
    }

    update(cursors, enterKey) {
        if (cursors.up.isDown) {
            this.increaseAngle();
        } else if (cursors.down.isDown) {
            this.decreaseAngle();
        }

        if (Phaser.Input.Keyboard.JustDown(enterKey)) {
            this.fire();
        }

        this.updatePointerPosition();
    }
}