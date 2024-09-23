// Clase para la mascota
class Pet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);

        // Inicializar estadísticas de la mascota
        this.hunger = 100;
        this.happiness = 100;
        this.energy = 100;

        // Temporizador para disminuir estadísticas
        this.timer = scene.time.addEvent({
            delay: 1000,
            callback: this.decreaseStats,
            callbackScope: this,
            loop: true
        });
    }

    decreaseStats() {
        // Disminuir estadísticas con el tiempo
        this.hunger -= 1;
        this.happiness -= 1;
        this.energy -= 1;
    }

    update() {
        // Actualizar lógica de la mascota
        if (this.hunger <= 0 || this.happiness <= 0 || this.energy <= 0) {
            this.setTint(0xff0000); // Cambiar color si alguna estadística es 0
        }
    }
}