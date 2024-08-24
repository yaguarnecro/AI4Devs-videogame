class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Cargar la imagen de portada
        this.load.image('portada', '/assets/images/portada.webp');
    }

    create() {
        // Mostrar la imagen de portada centrada
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'portada').setOrigin(0.5);

        // Mostrar el nombre del juego
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 200, 'mAIcromachines', {
            fontSize: '64px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Pasar a la siguiente escena al tocar cualquier tecla o la pantalla
        // this.input.keyboard.on('keydown', () => this.scene.start('NameScene'));
        // this.input.on('pointerdown', () => this.scene.start('NameScene'));
        this.input.keyboard.on('keydown', () => this.scene.start('GameScene'));
        this.input.on('pointerdown', () => this.scene.start('GameScene'));
    }
}

export default BootScene;