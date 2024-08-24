class NameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NameScene' });
    }

    create() {
        // Obtener el nombre del jugador desde localStorage o usar "Player 1" por defecto
        const playerName = localStorage.getItem('playerName') || 'Player 1';

        // Crear un contenedor DOM para el campo de texto
        const input = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2).createFromHTML(`
            <input type="text" id="nameInput" value="${playerName}" style="font-size: 32px; text-align: center; width: 300px;">
        `);

        // Crear un botón para confirmar el nombre
        const button = this.add.dom(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100).createFromHTML(`
            <button style="font-size: 32px;">Confirmar</button>
        `);

        // Al hacer clic en el botón, guardar el nombre y pasar a la siguiente escena
        button.addListener('click').on('click', () => {
            const name = document.getElementById('nameInput').value;
            localStorage.setItem('playerName', name);
            this.scene.start('ModeScene');
        });
    }
}

export default NameScene;