class ModeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ModeScene' });
    }

    create() {
        // Crear botones para seleccionar el modo de juego
        const singlePlayerButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, 'Modo Individual', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        const multiPlayerButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Modo Multijugador (Deshabilitado)', {
            fontSize: '32px',
            fill: '#888'
        }).setOrigin(0.5);

        const backButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'Volver a Selección de Nombre', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        const recordsButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 200, 'Ver Records', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        // Configurar interactividad de los botones
        singlePlayerButton.on('pointerdown', () => this.scene.start('GameScene'));
        backButton.on('pointerdown', () => this.scene.start('NameScene'));
        recordsButton.on('pointerdown', () => this.scene.start('RecordsScene'));
    }
}

export default ModeScene;
