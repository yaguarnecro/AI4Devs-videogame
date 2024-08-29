class TrackSelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TrackSelectionScene' });
    }

    create() {
        // Definir los circuitos disponibles
        const tracks = [
            { name: 'Circuito O', preview: 'previewO', laps: 3, bestLaps: [], bestRaces: [] },
            { name: 'Circuito B', preview: 'previewB', laps: 3, bestLaps: [], bestRaces: [] },
            { name: 'Circuito E', preview: 'previewE', laps: 3, bestLaps: [], bestRaces: [] }
        ];

        let y = 100;
        tracks.forEach(track => {
            this.add.text(50, y, track.name, { fontSize: '24px', fill: '#fff' });
            y += 30;
            this.add.image(50, y, track.preview).setOrigin(0, 0);
            y += 100;
        });

        // Botones para seleccionar el nivel de zoom
        const zoomLevels = ['Completo', 'Pequeño', 'Mediano', 'Grande'];
        let zoomY = this.cameras.main.height - 150;
        zoomLevels.forEach(level => {
            this.add.text(50, zoomY, `Zoom: ${level}`, { fontSize: '24px', fill: '#fff' }).setInteractive();
            zoomY += 30;
        });

        // Botón para iniciar la carrera
        const startButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 50, 'Iniciar Carrera', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5).setInteractive();

        startButton.on('pointerdown', () => this.scene.start('GameScene'));
    }
}

export default TrackSelectionScene;
