import { POINTER_DISTANCE, ANGLE_CHANGE_RATE } from '../utils/Constants.js';

export default class Weapon {
    constructor(scene, worm) {
        this.scene = scene;
        this.worm = worm;
        this.pointer = null;
        this.pointerDistance = POINTER_DISTANCE;
        this.aimLine = null;
        this.angle = 0;
        this.minAngle = -90;
        this.maxAngle = 90;
        this.isFiring = false;
        this.bulletSpeed = 10;
        this.damage = 40;
        this.createPointer();
    }

    createPointer() {
        this.pointer = this.scene.add.image(0, 0, 'target');
        this.pointer.setOrigin(0.5);
        this.aimLine = this.scene.add.image(0, 0, 'dashed_line');
        this.aimLine.setOrigin(0, 0.5);
        this.aimLine.setVisible(false);
        this.updatePointerPosition();
    }

    updatePointerPosition() {
        const radians = Phaser.Math.DegToRad(this.angle);
        const direction = this.worm.direction;
        
        const startX = this.worm.position.x + (this.worm.width / 2);
        const startY = this.worm.position.y + (this.worm.height / 2);
        const endX = startX + (Math.cos(radians) * this.pointerDistance * direction);
        const endY = startY - Math.sin(radians) * this.pointerDistance;

        this.pointer.setPosition(endX, endY);

        // Actualizar la línea de apuntado
        const distance = Phaser.Math.Distance.Between(startX, startY, endX, endY);
        const angle = Phaser.Math.Angle.Between(startX, startY, endX, endY);

        this.aimLine.setPosition(startX, startY);
        this.aimLine.setDisplaySize(distance, 1);
        this.aimLine.setRotation(angle);
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
                hitWorm.takeDamage(this.damage);
                return;
            }

            currentX += stepX;
            currentY += stepY;
        }

        console.log(`El disparo salió del mundo en (${currentX}, ${currentY})`);
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
        this.aimLine.setVisible(true);
    }

    hidePointer() {
        this.pointer.setVisible(false);
        this.aimLine.setVisible(false);
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

    destroy() {
        if (this.pointer) {
            this.pointer.destroy();
        }
        if (this.aimLine) {
            this.aimLine.destroy();
        }
    }
}