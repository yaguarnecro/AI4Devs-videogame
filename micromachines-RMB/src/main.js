import BootScene from './scenes/BootScene.js';
import NameScene from './scenes/NameScene.js';
import ModeScene from './scenes/ModeScene.js';
import RecordsScene from './scenes/RecordsScene.js';
import TrackSelectionScene from './scenes/TrackSelectionScene.js';
import GameScene from './scenes/GameScene.js';

const config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 800,
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            debug: false
        },
        gravity: { y: 0 } // Desactivar la gravedad
    },
    dom: {
        createContainer: true
    },
    scene: [BootScene, NameScene, ModeScene, RecordsScene, TrackSelectionScene, GameScene]
};

const game = new Phaser.Game(config);