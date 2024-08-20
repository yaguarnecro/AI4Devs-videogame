import { Map } from './Map.js';
import Worm from './Worm.js';
import Team from './Team.js';
import Round from './Round.js';
import { MAX_WORMS_PER_TEAM, TEAMS, TURN_DURATION } from '../utils/Constants.js';

class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.map = null;
        this.worms = [];
        this.teams = [];
        this.cursors = null;
        this.escKey = null;  // Add this line
        this.round = null;
        this.updateTurnUI = this.updateTurnUI.bind(this);
    }

    preload() {
        this.load.image('terrain', 'assets/maps/worms_mapa_2.png');
        // this.load.image('water', 'assets/images/water.png'); // Asegúrate de tener esta imagen
        this.load.spritesheet('sprites_worm_walking', 'assets/images/sprites/worms/wwalk.png', { 
            frameWidth: 60, 
            frameHeight: 60 
        });
    }

    create() {
        // El mundo físico será más alto que el canvas visible
        this.matter.world.setBounds(0, 0, 1080, 800);
        
        // Añadir el fondo (puedes reemplazar esto con tu propio fondo)
        this.add.rectangle(0, 0, 1080, 600, 0x87CEEB).setOrigin(0, 0);
        
        this.map = new Map(this, 'terrain', 1080, 600);
        
        // Añadir agua en la parte inferior
        this.add.tileSprite(540, 590, 1080, 20, 'water');

        // Crear un rectángulo invisible para el "techo" del mundo
        this.matter.add.rectangle(540, -10, 1080, 20, { isStatic: true });

        // Crear animaciones
        this.createAnimations();

        // Crear equipos
        TEAMS.forEach(teamConfig => {
            const team = new Team(teamConfig.name, teamConfig.color);
            this.teams.push(team);
            for (let i = 0; i < MAX_WORMS_PER_TEAM; i++) {
                const worm = new Worm(`${teamConfig.name} ${i + 1}`, this, team);
                team.addWorm(worm);
                this.worms.push(worm);
            }
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); 
        
        this.round = new Round(this, this.teams);
        this.round.start();
    }
    
    createAnimations() {
        // Animación de movimiento
        this.anims.create({
            key: 'worm_walk',
            frames: this.anims.generateFrameNumbers('worm_sprites', { 
                start: 0,
                end: 14 // Ajuste el índice final a 14 si hay 15 frames (0-14)
            }),
            frameRate: 10, // Ajuste la velocidad de la animación
            repeat: -1
        });
    }

    update() {
        const activeWorm = this.round.getActiveWorm();
        
        if (activeWorm) {
            if (this.cursors.left.isDown) {
                activeWorm.moveLeft();
            } else if (this.cursors.right.isDown) {
                activeWorm.moveRight();
            }

            if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
                activeWorm.jump();
            }
        }

        for (const worm of this.worms) {
            worm.update();
        }

        if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            this.round.endTurn();
        }

        for (const team of this.teams) {
            if (team.isDefeated()) {
                console.log(`${team.name} has been defeated!`);
            }
        }
    }

    updateTurnUI(teamName, timeLeft, activeWormName) {
        document.getElementById('current-turn').textContent = `Turno: ${teamName} - Gusano activo: ${activeWormName || 'Ninguno'}`;
        document.getElementById('time-left').textContent = `Tiempo: ${timeLeft}s`;
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