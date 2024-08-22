var config = {
    type: Phaser.AUTO,
    width: 240,
    height: 240,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#000000",
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        },
    },
    pixelArt: true
};

const game = new Phaser.Game(config);

let map;
let tileset;
let groundLayer;
let player;
let cursors;

function preload() {
    this.load.image("tiles", "assets/tiles/snes_stage_1.png");
    this.load.tilemapCSV('map', 'assets/tilemaps/bomberman_map.csv');
    this.load.spritesheet('player', 'assets/sprites/snes_white.png', { frameWidth: 17, frameHeight: 26 });
}

function create() {
    // Crear el mapa
    map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });

    // Añadir el tileset
    tileset = map.addTilesetImage('tiles', 'tiles', 16, 16);

    // Crear la capa del suelo y los muros
    groundLayer = map.createLayer(0, tileset, 0, 0);

    // Ajustar la cámara
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setZoom(1);
    this.cameras.main.centerOn(map.widthInPixels / 2, map.heightInPixels / 2);

    // Configurar colisiones
    groundLayer.setCollisionByProperty({ collides: true });

    // Configurar propiedades de colisión para cada tipo de tile
    map.setCollision([1]); // Colisión para muros indestructibles y destructibles

    // Crear el jugador
    player = this.physics.add.sprite(24, 216, 'player'); // Posición inicial en la esquina inferior izquierda
    player.setCollideWorldBounds(true);
    player.body.setSize(14, 14); // Ajustar el tamaño del cuerpo de colisión
    player.body.setOffset(1, 10); // Ajustar el offset del cuerpo de colisión

    // Configurar colisiones entre el jugador y el mapa
    this.physics.add.collider(player, groundLayer);

    // Configurar controles
    cursors = this.input.keyboard.createCursorKeys();

    // Animaciones del jugador
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 9 }),
        frameRate: 10,
        repeat: -1
    });
}

function update() {
    const speed = 80; // Reducir un poco la velocidad para un mejor control

    if (cursors.left.isDown) {
        player.setVelocityX(-speed);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(speed);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-speed);
        player.anims.play('up', true);
    } else if (cursors.down.isDown) {
        player.setVelocityY(speed);
        player.anims.play('down', true);
    } else {
        player.setVelocityY(0);
    }

    if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
        player.anims.stop();
    }
}