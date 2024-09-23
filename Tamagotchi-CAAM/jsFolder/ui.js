// Clase para la interfaz de usuario
class UI {
    constructor(scene) {
        this.scene = scene;

        // Crear botones de interacción
        this.feedButton = this.createButton(100, 500, 'Feed', this.feedPet);
        this.playButton = this.createButton(300, 500, 'Play', this.playWithPet);
        this.sleepButton = this.createButton(500, 500, 'Sleep', this.putPetToSleep);

        // Crear indicadores de estadísticas
        this.hungerText = this.createText(50, 50, 'Hunger: 100');
        this.happinessText = this.createText(50, 100, 'Happiness: 100');
        this.energyText = this.createText(50, 150, 'Energy: 100');
    }

    createButton(x, y, label, callback) {
        // Crear un botón interactivo
        let button = this.scene.add.text(x, y, label, { fontSize: '32px', fill: '#fff' })
            .setInteractive()
            .on('pointerdown', callback.bind(this));
        return button;
    }

    createText(x, y, text) {
        // Crear un texto para mostrar estadísticas
        return this.scene.add.text(x, y, text, { fontSize: '24px', fill: '#fff' });
    }

    feedPet() {
        // Alimentar a la mascota
        this.scene.pet.hunger = Math.min(this.scene.pet.hunger + 10, 100);
    }

    playWithPet() {
        // Jugar con la mascota
        this.scene.pet.happiness = Math.min(this.scene.pet.happiness + 10, 100);
    }

    putPetToSleep() {
        // Poner a dormir a la mascota
        this.scene.pet.energy = Math.min(this.scene.pet.energy + 10, 100);
    }

    update() {
        // Actualizar los textos de estadísticas
        this.hungerText.setText('Hunger: ' + this.scene.pet.hunger);
        this.happinessText.setText('Happiness: ' + this.scene.pet.happiness);
        this.energyText.setText('Energy: ' + this.scene.pet.energy);
    }
}