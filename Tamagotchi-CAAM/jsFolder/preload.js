// Clase para la escena de precarga
class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Cargar los assets del juego
        this.load.image('pet', 'assets/images/pet.png');
        this.load.image('background', 'assets/images/background.png');
        // ... otros assets
    }

    create() {
        // Iniciar la escena principal
        this.scene.start('MainScene');
    }
}