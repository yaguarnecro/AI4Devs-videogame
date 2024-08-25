class RecordsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RecordsScene' });
    }

    create() {
        // Mostrar los records almacenados en localStorage
        const bestLapTimes = JSON.parse(localStorage.getItem('bestLapTimes')) || [];
        const bestRaceTimes = JSON.parse(localStorage.getItem('bestRaceTimes')) || [];

        let y = 100;
        for (let i = 0; i < bestLapTimes.length; i++) {
            // this.add.text(50, y, `Circuito: ${i}`, { fontSize: '24px', fill: '#fff' });
            // y += 30;
            this.add.text(50, y, `Top 10 vueltas: ${bestLapTimes[i].map(time => (time / 1000).toFixed(2) + 's').join(', ')}`, { fontSize: '18px', fill: '#fff' });
            y += 30;
            this.add.text(50, y, `Top 10 carreras: ${bestRaceTimes[i].map(time => (time / 1000).toFixed(2) + 's').join(', ')}`, { fontSize: '18px', fill: '#fff' });
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
