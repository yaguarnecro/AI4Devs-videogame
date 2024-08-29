let game = null;

function startGame() {
    if (game) {
        game.destroy(true);
    }

    const config = {
        type: Phaser.AUTO,
        width: 240,
        height: 240,
        zoom: 3,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: 'game-container',
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        pixelArt: true
    };

    game = new Phaser.Game(config);
}

document.addEventListener('DOMContentLoaded', () => {
    const mainScreen = document.getElementById('main-screen');
    const gameContainer = document.getElementById('game-container');
    const instructionsScreen = document.getElementById('instructions');
    const startButton = document.getElementById('start-button');
    const instructionsButton = document.getElementById('instructions-button');
    const backButton = document.getElementById('back-button');

    startButton.addEventListener('click', () => {
        mainScreen.style.display = 'none';
        gameContainer.style.display = 'block';
        startGame();
    });

    instructionsButton.addEventListener('click', () => {
        mainScreen.style.display = 'none';
        instructionsScreen.style.display = 'block';
    });

    backButton.addEventListener('click', () => {
        instructionsScreen.style.display = 'none';
        mainScreen.style.display = 'flex';
    });
});

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
    this.load.spritesheet('destructibleWall', 'assets/tiles/snes_stage_1.png', { frameWidth: 16, frameHeight: 16 });
    this.load.audio('explosion', 'assets/sounds/explosion.mp3');
    this.load.audio('background', 'assets/sounds/snes_battle_music.mp3');
    this.load.spritesheet('player_red', 'assets/sprites/snes_red.png', { frameWidth: 17, frameHeight: 26 });
    this.load.spritesheet('player_black', 'assets/sprites/snes_black.png', { frameWidth: 17, frameHeight: 26 });
    this.load.spritesheet('player_blue', 'assets/sprites/snes_blue.png', { frameWidth: 17, frameHeight: 26 });
    this.load.spritesheet('items', 'assets/sprites/snes_items.png', { frameWidth: 16, frameHeight: 16 });
}

function create() {
    // Crear el mapa
    map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });

    // Añadir el tileset
    tileset = map.addTilesetImage('tiles', 'tiles', 16, 16);

    // Crear la capa del suelo y los muros
    groundLayer = map.createLayer(0, tileset, 0, 0);

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
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
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

    // Crear grupo para muros destructibles
    this.destructibleWalls = this.physics.add.staticGroup();

    // Añadir muros destructibles
    for (let y = 1; y < 14; y++) {
        for (let x = 1; x < 14; x++) {
            if (x % 2 === 0 && y % 2 === 0) continue; // Saltar las posiciones de los muros fijos
            if ((x < 3 && y < 3) || (x > 11 && y < 3) || (x < 3 && y > 11) || (x > 11 && y > 11)) continue; // Evitar las esquinas
            if (Math.random() < 0.7) { // 70% de probabilidad de colocar un muro destructible
                const wall = this.destructibleWalls.create(x * 16 + 8, y * 16 + 8, 'destructibleWall', 2); // Usamos el frame 2 (tercer frame)
                wall.setOrigin(0.5);
                wall.setDisplaySize(16, 16);
                wall.refreshBody(); // Actualizar el cuerpo físico
                wall.setDepth(0); // Asignar una profundidad menor a los muros destructibles
            }
        }
    }


    // Añadir colisiones con muros destructibles
    this.physics.add.collider(player, this.destructibleWalls);
    this.physics.add.collider(bombs, this.destructibleWalls);

    player.setDepth(1); // Asignar una profundidad mayor al jugador

    this.explosionSound = this.sound.add('explosion');
    this.backgroundMusic = this.sound.add('background', { loop: true });
    if (!this.sound.get('background').isPlaying) {
        this.backgroundMusic.play();
    }

    this.players = [player];

    // Crear bots
    const botSprites = ['player_red', 'player_black', 'player_blue'];

    for (let i = 0; i < 3; i++) {
        let botX, botY;
        if (i === 0) {
            botX = 216; botY = 24; // Esquina superior derecha
        } else if (i === 1) {
            botX = 24; botY = 24; // Esquina superior izquierda
        } else {
            botX = 216; botY = 216; // Esquina inferior derecha
        }

        let bot = this.physics.add.sprite(botX, botY, botSprites[i]);
        bot.setCollideWorldBounds(true);
        bot.body.setSize(14, 14);
        bot.body.setOffset(1, 10);
        this.physics.add.collider(bot, groundLayer);
        this.physics.add.collider(bot, this.destructibleWalls);
        this.physics.add.overlap(bot, this.fires, playerHit, null, this);

        bot.isBot = true;
        bot.direction = 'down';
        bot.moveTimer = 0;
        bot.bombTimer = 0;

        this.players.push(bot);
    }

    // Crear animaciones para los bots
    const botAnimationKeys = ['left', 'right', 'up', 'down'];
    const startFrames = [3, 9, 0, 6];
    const endFrames = [5, 11, 2, 8];

    botSprites.forEach(spriteKey => {
        botAnimationKeys.forEach((key, index) => {
            this.anims.create({
                key: `${spriteKey}_${key}`,
                frames: this.anims.generateFrameNumbers(spriteKey, { start: startFrames[index], end: endFrames[index] }),
                frameRate: 10,
                repeat: -1
            });
        });
    });

    this.items = this.physics.add.group();
    this.physics.add.overlap(this.players, this.items, function (player, item) {
        applyItemEffect(player, item.getData('type'));
        item.destroy(); // Elimina el item del juego
    }, null, this);
}

function update(time, delta) {
    // Si el juego ha terminado, no actualizar nada
    if (this.gameOver) {
        return;
    }

    const speed = 80;

    // Manejo del movimiento del jugador humano
    this.players[0].setVelocity(0);

    if (cursors.left.isDown) {
        this.players[0].setVelocityX(-speed);
        this.players[0].anims.play('left', true);
    } else if (cursors.right.isDown) {
        this.players[0].setVelocityX(speed);
        this.players[0].anims.play('right', true);
    }

    if (cursors.up.isDown) {
        this.players[0].setVelocityY(-speed);
        this.players[0].anims.play('up', true);
    } else if (cursors.down.isDown) {
        this.players[0].setVelocityY(speed);
        this.players[0].anims.play('down', true);
    }

    if (this.players[0].body.velocity.x === 0 && this.players[0].body.velocity.y === 0) {
        this.players[0].anims.stop();
    }

    // Manejo de la colocación de bombas para el jugador humano
    if (Phaser.Input.Keyboard.JustDown(bombKey) && canPlaceBomb) {
        placeBomb(this.players[0]);
    }

    // Actualizar bots
    for (let i = 1; i < this.players.length; i++) {
        updateBot(this.players[i], delta);
    }
}

function updateBot(bot, time) {
    bot.moveTimer += time;
    bot.bombTimer += time;

    if (bot.moveTimer > 1000) { // Cambiar dirección cada segundo
        bot.direction = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
        bot.moveTimer = 0;
    }

    const speed = 80;
    const spriteKey = bot.texture.key;
    switch (bot.direction) {
        case 'left':
            bot.setVelocityX(-speed);
            bot.anims.play(`${spriteKey}_left`, true);
            break;
        case 'right':
            bot.setVelocityX(speed);
            bot.anims.play(`${spriteKey}_right`, true);
            break;
        case 'up':
            bot.setVelocityY(-speed);
            bot.anims.play(`${spriteKey}_up`, true);
            break;
        case 'down':
            bot.setVelocityY(speed);
            bot.anims.play(`${spriteKey}_down`, true);
            break;
    }

    if (bot.bombTimer > 3000 && Math.random() < 0.1) { // 10% de probabilidad de colocar una bomba cada 3 segundos
        placeBomb(bot);
        bot.bombTimer = 0;
    }
}

function placeBomb(player) {
    const bombX = Math.floor(player.x / 16) * 16 + 8;
    const bombY = Math.floor(player.y / 16) * 16 + 8;

    // Verificar si hay un muro destructible en esta posición
    const destructibleWall = game.scene.scenes[0].destructibleWalls.getChildren().find(wall =>
        wall.x === bombX && wall.y === bombY
    );

    if (!destructibleWall && canPlaceBomb) {
        const bomb = bombs.create(bombX, bombY, 'bomb');
        bomb.anims.play('bomb');
        bomb.body.immovable = true;

        canPlaceBomb = false;

        setTimeout(() => {
            bomb.destroy();
            createExplosion(game.scene.scenes[0], bombX, bombY);
        }, 3000);

        setTimeout(() => {
            canPlaceBomb = true;
        }, 3500);
    }
}

function createExplosion(scene, x, y) {
    // Reproducir el sonido
    if (scene.explosionSound) {
        scene.explosionSound.play();
    } else {
        console.error('El sonido de explosión no está disponible');
    }

    const directions = [
        { x: 0, y: 0 },   // Centro
        { x: -16, y: 0 }, // Izquierda
        { x: 16, y: 0 },  // Derecha
        { x: 0, y: -16 }, // Arriba
        { x: 0, y: 16 }   // Abajo
    ];

    directions.forEach(dir => {
        let fireX = x + dir.x;
        let fireY = y + dir.y;

        // Verificar si hay un muro indestructible en esta posición
        const tile = groundLayer.getTileAtWorldXY(fireX, fireY);
        if (tile && tile.index === 1) {
            return; // Si hay un muro indestructible, no crear fuego en esta dirección
        }

        // Verificar si hay un muro destructible en esta posición
        const destructibleWall = scene.destructibleWalls.getChildren().find(wall =>
            wall.x === fireX && wall.y === fireY
        );

        if (destructibleWall) {
            destructibleWall.destroy();
            // Decidir al azar si se crea un item
            if (Math.random() < 0.5) { // 50% de probabilidad de generar un item
                const itemIndex = Math.floor(Math.random() * 12); // Asumiendo que hay 12 items diferentes
                const item = scene.items.create(destructibleWall.x, destructibleWall.y, 'items', itemIndex);
                item.setData('type', itemIndex);
            }
        }

        // Crear fuego
        const fire = scene.fires.create(fireX, fireY, 'fire');
        fire.setDepth(2);
        fire.anims.play('fire', true);
        fire.on('animationcomplete', () => {
            fire.destroy();
        });

        console.log('Fuego creado en:', fireX, fireY);
    });
}

function playerHit(player, fire) {
    if (player === this.players[0]) {  // Si es el jugador humano
        console.log('¡El jugador humano ha sido golpeado!');
        player.setTint(0xff0000);  // Colorear al jugador de rojo
        player.anims.stop();  // Detener la animación del jugador
        this.physics.pause();  // Pausar la física del juego

        // Detener la música de fondo
        stopAndResetMusic(this);

        // Detener todas las animaciones y movimientos de los bots
        for (let i = 1; i < this.players.length; i++) {
            this.players[i].anims.stop();
            this.players[i].setVelocity(0, 0);
        }

        // Detener todas las bombas y explosiones
        if (this.bombs && this.bombs.children && this.bombs.children.entries) {
            this.bombs.children.entries.forEach(bomb => {
                if (bomb.anims) bomb.anims.stop();
            });
        }
        if (this.fires && this.fires.children && this.fires.children.entries) {
            this.fires.children.entries.forEach(fire => {
                if (fire.anims) fire.anims.stop();
            });
        }

        // Mostrar mensaje de "Game Over" y menú de reinicio
        showRestartMenu(this, 'Game Over');

        // Desactivar la entrada del teclado
        this.input.keyboard.enabled = false;

        this.gameOver = true;
    } else {  // Si es un bot
        botHit.call(this, player, fire);
    }
}

function botHit(bot, fire) {
    console.log('¡Un bot ha sido golpeado!');
    bot.destroy();  // Eliminar el bot del juego

    // Eliminar el bot de la lista de jugadores
    const index = this.players.indexOf(bot);
    if (index > -1) {
        this.players.splice(index, 1);
    }

    // Verificar si el jugador humano ha ganado
    if (this.players.length === 1 && this.players[0] === this.players[0]) {
        playerWin.call(this);
    }
}

function playerWin() {
    console.log('¡El jugador humano ha ganado!');
    this.physics.pause();  // Pausar la física del juego

    // Detener la música de fondo
    stopAndResetMusic(this);

    // Mostrar mensaje de "Victoria" y menú de reinicio
    showRestartMenu(this, '¡Victoria!');
}

function stopAndResetMusic(scene) {
    if (scene.backgroundMusic) {
        scene.backgroundMusic.stop();
    }
}

function showRestartMenu(scene, message) {
    let menuGroup = scene.add.group();

    let background = scene.add.rectangle(0, 0, scene.sys.game.config.width, scene.sys.game.config.height, 0x000000, 0.7);
    background.setOrigin(0);
    menuGroup.add(background);

    let messageText = scene.add.text(scene.sys.game.config.width / 2, 60, message, { fontSize: '24px', fill: '#fff' });
    messageText.setOrigin(0.5);
    menuGroup.add(messageText);

    let restartButton = scene.add.text(scene.sys.game.config.width / 2, 110, 'Reiniciar', { fontSize: '18px', fill: '#fff', backgroundColor: '#1a65ac', padding: { left: 10, right: 10, top: 5, bottom: 5 } });
    restartButton.setOrigin(0.5);
    restartButton.setInteractive({ useHandCursor: true });
    restartButton.on('pointerdown', () => {
        menuGroup.destroy();
        restartGame(scene);
    });
    menuGroup.add(restartButton);

    let exitButton = scene.add.text(scene.sys.game.config.width / 2, 150, 'Salir', { fontSize: '18px', fill: '#fff', backgroundColor: '#aa3333', padding: { left: 10, right: 10, top: 5, bottom: 5 } });
    exitButton.setOrigin(0.5);
    exitButton.setInteractive({ useHandCursor: true });
    exitButton.on('pointerdown', () => {
        scene.scene.stop();
        scene.scene.remove();
        if (scene.backgroundMusic) {
            scene.backgroundMusic.stop();
        }
        window.location.href = 'http://localhost:3000';
    });
    menuGroup.add(exitButton);
}

function restartGame(scene) {
    // Detener y reiniciar la música
    if (scene.backgroundMusic) {
        scene.backgroundMusic.stop();
    }

    // Destruir la escena actual
    scene.scene.stop();
    scene.scene.remove();

    // Ocultar el menú de reinicio y la pantalla principal
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    // Reiniciar el juego
    if (game) {
        game.destroy(true);
    }
    startGame();
}

function applyItemEffect(player, itemType) {
    switch (itemType) {
        case 0: // Aumento de velocidad
            player.speed += 20;
            break;
        case 1: // Capacidad extra de bombas
            player.maxBombs += 1;
            break;
        case 2: // Mayor alcance de explosión
            player.bombRange += 1;
            break;
        case 3: // Invulnerabilidad temporal
            player.invulnerable = true;
            setTimeout(() => {
                player.invulnerable = false;
            }, 5000); // 5 segundos de invulnerabilidad
            break;
        case 4: // Empujar bombas
            player.canPushBombs = true;
            break;
        case 5: // Detonador remoto
            player.hasRemoteDetonator = true;
            break;
    }
}