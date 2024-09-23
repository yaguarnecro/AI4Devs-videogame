// Clase para la escena principal
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    create() {
        // Añadir fondo
        this.add.image(400, 300, 'background');

        // Crear la mascota
        this.pet = new Pet(this, 400, 300, 'pet');

        // Crear la interfaz de usuario
        this.ui = new UI(this);
    }

    update() {
        // Actualizar la mascota y la interfaz de usuario
        this.pet.update();
        this.ui.update();
    }
}