import { Map } from './Map.js';

class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('terrain', 'assets/maps/worms_mapa_2.png');
        // this.load.image('water', 'assets/images/water.png'); // Asegúrate de tener esta imagen
    }

    create() {
        // El mundo físico será más alto que el canvas visible
        this.matter.world.setBounds(0, 0, 1080, 800);
        
        // Añadir el fondo (puedes reemplazar esto con tu propio fondo)
        this.add.rectangle(0, 0, 1080, 600, 0x87CEEB).setOrigin(0, 0);
        
        this.map = new Map(this, 'terrain', 1080, 600);
        
        // Añadir agua en la parte inferior
        this.add.tileSprite(540, 590, 1080, 20, 'water');
    }

    update() {
        // Lógica de actualización del juego
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 600,
    parent: 'game-container',
    scene: Game,
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 1 },
            debug: true
        }
    }
};

new Phaser.Game(config);