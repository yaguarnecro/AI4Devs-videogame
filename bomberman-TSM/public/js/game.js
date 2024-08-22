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
let bombs;
let canPlaceBomb = true;
let bombKey;

function preload() {
    this.load.image("tiles", "assets/tiles/snes_stage_1.png");
    this.load.tilemapCSV('map', 'assets/tilemaps/bomberman_map.csv');
    this.load.spritesheet('player', 'assets/sprites/snes_white.png', { frameWidth: 17, frameHeight: 26 });
    this.load.spritesheet('bomb', 'assets/sprites/snes_bombs_black.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('fire', 'assets/sprites/snes_flames_red.png', { frameWidth: 16, frameHeight: 16 });
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

    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, groundLayer);
    bombKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.anims.create({
        key: 'bomb',
        frames: this.anims.generateFrameNumbers('bomb', { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create({
        key: 'fire',
        frames: this.anims.generateFrameNumbers('fire', { start: 0, end: 3 }),
        frameRate: 12,
        repeat: 1
    });

    this.fires = this.physics.add.group();
    this.physics.add.collider(this.fires, groundLayer);
    this.physics.add.overlap(player, this.fires, playerHit, null, this);
    this.fires.setDepth(2); // Asegurarse de que todos los fuegos estén por encima de otros elementos
}

function update() {
    const speed = 80;

    // Manejo del movimiento del jugador
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-speed);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(speed);
        player.anims.play('right', true);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-speed);
        player.anims.play('up', true);
    } else if (cursors.down.isDown) {
        player.setVelocityY(speed);
        player.anims.play('down', true);
    }

    if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
        player.anims.stop();
    }

    // Manejo de la colocación de bombas
    if (Phaser.Input.Keyboard.JustDown(bombKey) && canPlaceBomb) {
        placeBomb();
    }
}

function placeBomb() {
    const bombX = Math.floor(player.x / 16) * 16 + 8;
    const bombY = Math.floor(player.y / 16) * 16 + 8;
    const bomb = bombs.create(bombX, bombY, 'bomb');
    bomb.anims.play('bomb');
    bomb.body.immovable = true;

    canPlaceBomb = false;

    setTimeout(() => {
        bomb.destroy();
        createExplosion(bombX, bombY);
    }, 3000);

    setTimeout(() => {
        canPlaceBomb = true;
    }, 3500);
}

function createExplosion(x, y) {
    const directions = [
        { x: 0, y: 0 },   // Centro
        { x: -16, y: 0 }, // Izquierda
        { x: 16, y: 0 },  // Derecha
        { x: 0, y: -16 }, // Arriba
        { x: 0, y: 16 }   // Abajo
    ];

    directions.forEach(dir => {
        const fire = game.scene.scenes[0].fires.create(x + dir.x, y + dir.y, 'fire');
        fire.setDepth(2);
        fire.anims.play('fire', true);
        fire.on('animationcomplete', () => {
            fire.destroy();
        });
        console.log('Fuego creado en:', x + dir.x, y + dir.y);
    });
}

function playerHit(player, fire) {
    console.log('¡El jugador ha sido golpeado!');
    // Aquí puedes añadir la lógica para cuando el jugador es golpeado por el fuego
}