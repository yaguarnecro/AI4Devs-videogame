class RecordsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RecordsScene' });
    }

    create() {
        // Mostrar los records almacenados en localStorage
        const records = JSON.parse(localStorage.getItem('records')) || {};

        let y = 100;
        for (const track in records) {
            this.add.text(50, y, `Circuito: ${track}`, { fontSize: '24px', fill: '#fff' });
            y += 30;
            this.add.text(50, y, `Mejores vueltas: ${records[track].bestLaps.join(', ')}`, { fontSize: '20px', fill: '#fff' });
            y += 30;
            this.add.text(50, y, `Mejores carreras: ${records[track].bestRaces.join(', ')}`, { fontSize: '20px', fill: '#fff' });
            y += 50;
        }

        // Botón para volver a la selección de modo
        const backButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 50, 'Volver', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        backButton.on('pointerdown', () => this.scene.start('ModeScene'));
    }
}

export default RecordsScene;
