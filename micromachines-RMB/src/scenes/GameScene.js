class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene', physics: { default: 'matter', matter: { debug: false, gravity: { y: 0 } } } });
    }

    preload() {
        // Definir los coches disponibles
        this.cars = [
            {sprite:'yellow.png', color: 0xffd900},
            {sprite:'red.png', color: 0xff0000},
            {sprite:'blue.png', color: 0x0000ff},
            {sprite:'green.png', color: 0x00ff00},
            {sprite:'orange.png', color: 0xffa500},
            {sprite:'grey.png', color: 0x808080},
            {sprite:'pink.png', color: 0xffc0cb},
            {sprite:'purple.png', color: 0x800080},
            {sprite:'turquoise.png', color: 0x40e0d0},
            {sprite:'black.png', color: 0x000000},
        ];        
        this.currentCar = Math.floor(Math.random() * this.cars.length);
        
        // Cargar el sprite del coche
        this.load.image('car', 'assets/cars/' + this.cars[this.currentCar].sprite);
        // Cargar el sprite del circuito (esto es un ejemplo, deberías cargar tu circuito real)
        this.load.image('track', 'assets/tracks/track1.jpg');
        // Cargar la imagen de máscara
        this.load.image('mask', 'assets/tracks/track1_mask.jpg');
        // Cargar la imagen del minimapa
        this.load.image('minimap', 'assets/tracks/track1_minimap.png');
        // Cargar las imágenes de los botones
        this.load.image('buttonUp', 'assets/buttons/up.png');
        this.load.image('buttonDown', 'assets/buttons/down.png');
        this.load.image('buttonLeft', 'assets/buttons/left.png');
        this.load.image('buttonRight', 'assets/buttons/right.png');
    }

    create() {
        // Establecer el color de fondo de la escena
        this.cameras.main.setBackgroundColor('#a1b03b');

        // Configuración inicial
        this.laps = 3; // Número de vueltas configurado para el circuito
        this.currentLap = 0;
        this.startTime = 0;
        this.lapTimes = [];
        this.bestLapTimes = JSON.parse(localStorage.getItem('bestLapTimes')) || [];
        this.bestRaceTimes = JSON.parse(localStorage.getItem('bestRaceTimes')) || [];

        // Crear el circuito
        this.track = this.add.image(0, 0, 'track').setOrigin(0, 0);

        // Crear el coche
        this.car = this.matter.add.sprite(400, 250, 'car'); // Posición inicial ajustada
        this.car.setDisplaySize(50, 50);
        this.car.setFrictionAir(0.05);
        this.car.setFixedRotation();

        // Ajustar el área de colisión del coche
        const collisionShape = this.matter.bodies.rectangle(0, 0, 50, 25);
        this.car.setExistingBody(collisionShape);
        this.car.setPosition(430, 250);

        // Configurar las teclas de control
        this.cursors = this.input.keyboard.createCursorKeys();

        // Instrucciones
        this.instruccionesText = this.add.text(this.cameras.main.width / 2 - 100, this.cameras.main.height / 2 - 200, 'Juega con ◄ ► ▲ ▼', {
            fontSize: '30px',
            fill: '#000'
        }).setOrigin(0.5);
        
        // Configurar la cuenta atrás
        this.countdownText = this.add.text(this.cameras.main.width / 2 -100 , this.cameras.main.height / 2 - 0, '5', {
            fontSize: '64px',
            fill: '#000'
        }).setOrigin(0.5);
        this.time.delayedCall(1000, this.updateCountdown, [4], this);

        // Configurar el mini-mapa
        this.miniMap = this.add.image(10, 10, 'minimap').setOrigin(0, 0).setDisplaySize(200, 200);
        this.miniMap.setScrollFactor(0);
        this.miniMapGraphics = this.add.graphics();
        this.miniMapGraphics.lineStyle(2, 0xffffff, 1);
        this.miniMapGraphics.strokeRect(10, 10, 200, 200);
        this.miniMapGraphics.setScrollFactor(0); // Asegurar que los gráficos del minimapa no se desplacen con la cámara        

        // Configurar la meta y el checkpoint
        this.finishLine = new Phaser.Geom.Rectangle(460, 223, 1, 100); // Definir la línea de meta
        this.checkpointLine = new Phaser.Geom.Rectangle(700, 1106, 1, 100); // Definir la línea de meta        

        // Dibujar la línea de meta (checkpoint no se dibuja)
        this.finishLineGraphics = this.add.graphics();
        this.finishLineGraphics.lineStyle(3, 0xffffff, 2);
        this.finishLineGraphics.strokeRect(this.finishLine.x, this.finishLine.y, 3, this.finishLine.height);

        // Añadir texto para mostrar la información del coche
        if (this.sys.game.config.physics.matter.debug) {
            this.carInfoText = this.add.text(this.cameras.main.width - 10, 10, '', {
                fontSize: '16px',
                fill: '#fff'
            }).setOrigin(1, 0);
            this.carInfoText.setScrollFactor(0);
        }

        // Hacer que la cámara siga al coche
        this.cameras.main.startFollow(this.car);

        // Crear los bordes del circuito a partir de la imagen de máscara
        this.createTrackBoundsFromMask();

        // Crear fondo oscuro para el texto de tiempos
        this.lapTimesBackground = this.add.graphics();
        this.lapTimesBackground.fillStyle(0x000000, 0.5);
        this.lapTimesBackground.fillRect(this.cameras.main.width - 260, 10, 250, 100);
        this.lapTimesBackground.setScrollFactor(0);

        // Añadir texto para mostrar los tiempos de las vueltas
        this.lapTimesText = this.add.text(this.cameras.main.width - 250, 20, '', {
            fontSize: '16px',
            fill: '#fff'
        }).setOrigin(0, 0);
        this.lapTimesText.setScrollFactor(0);

        // Crear botones táctiles
        if (this.sys.game.device.input.touch) {
            this.createTouchControls();
        }
    }

    createTouchControls() {
        // Crear botones táctiles
        const buttonSize = 64;
        const buttonSpacing = 20;
        const screenWidth = this.cameras.main.width;
        const screenHeight = this.cameras.main.height;

        // Botón de girar izquierda
        const buttonLeft = this.add.image(buttonSpacing + 60, screenHeight - buttonSize - buttonSpacing, 'buttonLeft')
            .setInteractive()
            .setScrollFactor(0)
            .setDisplaySize(buttonSize, buttonSize);

        // Botón de girar izquierda (segundo)
        const buttonRight = this.add.image(buttonSpacing + buttonSize + buttonSpacing + 60, screenHeight - buttonSize - buttonSpacing, 'buttonRight')
            .setInteractive()
            .setScrollFactor(0)
            .setDisplaySize(buttonSize, buttonSize);

        // Botón de acelerar
        const buttonUp = this.add.image(screenWidth - buttonSize - buttonSpacing, screenHeight - buttonSize * 2 - buttonSpacing * 2, 'buttonUp')
            .setInteractive()
            .setScrollFactor(0)
            .setDisplaySize(buttonSize, buttonSize);

        // Botón de frenar
        const buttonDown = this.add.image(screenWidth - buttonSize - buttonSpacing, screenHeight - buttonSize - buttonSpacing, 'buttonDown')
            .setInteractive()
            .setScrollFactor(0)
            .setDisplaySize(buttonSize, buttonSize);

        // Configurar eventos de los botones
        buttonUp.on('pointerdown', () => this.cursors.up.isDown = true);
        buttonUp.on('pointerup', () => this.cursors.up.isDown = false);

        buttonDown.on('pointerdown', () => this.cursors.down.isDown = true);
        buttonDown.on('pointerup', () => this.cursors.down.isDown = false);

        buttonLeft.on('pointerdown', () => this.cursors.left.isDown = true);
        buttonLeft.on('pointerup', () => this.cursors.left.isDown = false);

        buttonRight.on('pointerdown', () => this.cursors.right.isDown = true);
        buttonRight.on('pointerup', () => this.cursors.right.isDown = false);
    }

    createTrackBoundsFromMask() {
        // Crear un bitmap data a partir de la imagen de máscara
        const mask = this.textures.get('mask').getSourceImage();
        
        let maskCanvas = this.textures.get('maskCanvas');
        if (!maskCanvas || maskCanvas.key=='__MISSING') {
            maskCanvas = this.textures.createCanvas('maskCanvas', mask.width, mask.height);
        }
        maskCanvas.draw(0, 0, mask);

        // Obtener los datos de píxeles de la imagen de máscara
        const maskData = maskCanvas.getContext().getImageData(0, 0, mask.width, mask.height).data;

        // Crear bordes invisibles alrededor de las áreas negras de la imagen de máscara
        const rects = [];

        for (let y = 0; y < mask.height; y++) {
            for (let x = 0; x < mask.width; x++) {
                const index = (y * mask.width + x) * 4;
                const alpha = maskData[index]; // Obtener el valor alfa del píxel

                if (alpha !== 255) { // Si el píxel es negro (área de colisión)
                    let width = 1;
                    let height = 1;

                    // Expandir el rectángulo horizontalmente
                    while (x + width < mask.width && maskData[((y * mask.width) + (x + width)) * 4] !== 255) {
                        width++;
                    }

                    // Expandir el rectángulo verticalmente
                    let expand = true;
                    while (expand && y + height < mask.height) {
                        for (let i = 0; i < width; i++) {
                            if (maskData[(((y + height) * mask.width) + (x + i)) * 4] != 0) {
                                expand = false;
                                break;
                            }
                        }
                        if (expand) {
                            height++;
                        }
                    }

                    // Marcar los píxeles como procesados
                    for (let i = 0; i < height; i++) {
                        for (let j = 0; j < width; j++) {
                            maskData[(((y + i) * mask.width) + (x + j)) * 4] = 255;
                        }
                    }

                    rects.push({ x, y, width, height });
                }
            }
        }

        // Crear los rectángulos en Matter.js
        rects.forEach(rect => {
            this.matter.add.rectangle(rect.x + rect.width / 2, rect.y + rect.height / 2, rect.width, rect.height, { isStatic: true });
        });

        // Añadir colisiones entre el coche y los bordes
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach(pair => {
                if (pair.bodyA === this.car.body || pair.bodyB === this.car.body) {
                    this.handleCollision();
                }
            });
        });
    }

    handleCollision() {
        // Rebotar el coche al colisionar con los bordes
        const velocity = this.car.body.velocity;
        this.car.setVelocity(-velocity.x/2, -velocity.y/2);
    }

    updateCountdown(seconds) {
        if (seconds > 0) {
            this.countdownText.setText(seconds);
            this.time.delayedCall(1000, this.updateCountdown, [seconds - 1], this);
        } else {
            this.countdownText.setText('¡GO!');
            this.time.delayedCall(1000, () => {
                this.countdownText.setVisible(false);
                this.instruccionesText.setVisible(false);
                this.startRace();
            }, [], this);
        }
    }

    startRace() {
        this.raceFinished = false; // M
        this.startTime = this.time.now;
        this.car.setStatic(false); // Permitir que el coche se mueva
        this.car.setVelocity(0, 0);
        this.car.setAngularVelocity(0);
    }

    update(time, delta) {
        if (this.startTime > 0) {
            // Actualizar la posición del coche y el circuito
            this.updateCarControls();
            this.updateMiniMap();

            // Verificar si el coche ha cruzado el checkpoint
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.car.getBounds(), this.checkpointLine)) {
                this.hasCrossedCheckpoint = true;
            }            
            
            // Verificar si el coche ha cruzado la meta
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.car.getBounds(), this.finishLine)) {
                if (!this.hasCrossedFinishLine && this.hasCrossedCheckpoint) {
                    this.handleLapCompletion();
                    this.hasCrossedFinishLine = true;
                }
            } else {
                this.hasCrossedFinishLine = false;
            }

            // Actualizar el tiempo de la vuelta actual y anteriores
            const currentTime = this.time.now - this.startTime;
            let lapTimesText = '';
            this.lapTimes.forEach((time, index) => {
                lapTimesText += `Vuelta ${index + 1}: ${(time/1000).toFixed(2)}s\n`;
            });
            if (!this.raceFinished) {
                lapTimesText += `Vuelta Actual: ${(currentTime/1000).toFixed(2)}s\n`;
            }
            this.lapTimesText.setText(lapTimesText);
        }

        // Actualizar la información del coche
        this.updateCarInfo();
    }

    updateCarControls() {
        // Controlar el coche con el teclado
        const maxSpeed = 0.002;
        const maxReverseSpeed = -0.001;
        const turnSpeed = 0.1;
        const deceleration = 0.91; // Factor de desaceleración

        if (this.cursors.up.isDown) {
            const force = new Phaser.Math.Vector2();
            force.setToPolar(this.car.rotation, maxSpeed);
            this.car.applyForce(force);
            this.isAccelerating = true;
        } else if (this.cursors.down.isDown) {
            const force = new Phaser.Math.Vector2();
            force.setToPolar(this.car.rotation, maxReverseSpeed);
            this.car.applyForce(force);
            this.isAccelerating = true;
        } else if (this.isAccelerating) {
            // Aplicar desaceleración gradual
            const velocity = this.car.body.velocity;
            this.car.setVelocity(velocity.x * deceleration, velocity.y * deceleration);

            // Detener la desaceleración cuando la velocidad es muy baja
            if (Phaser.Math.Distance.Between(0, 0, velocity.x, velocity.y) < 0.001) {
                this.car.setVelocity(0, 0);
                this.isAccelerating = false;
            }
        }

        if (this.cursors.left.isDown) {
            this.car.setAngularVelocity(-turnSpeed);
        } else if (this.cursors.right.isDown) {
            this.car.setAngularVelocity(turnSpeed);
        } else {
            this.car.setAngularVelocity(0);
        }
    }

    updateCarInfo() {
        if (this.sys.game.config.physics.matter.debug) {
            const angle = Phaser.Math.RadToDeg(this.car.rotation).toFixed(2);
            const rotation = this.car.rotation.toFixed(2);
            const velocity = this.car.body.velocity;
            const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y).toFixed(2);
            const posX = this.car.x.toFixed(2);
            const posY = this.car.y.toFixed(2);

            this.carInfoText.setText(`Ángulo: ${angle}°\nRotación: ${rotation} rad\nVelocidad: ${velocity}\nSpeed: ${speed}\nPosición X: ${posX}\nPosición Y: ${posY}`);
        }
    }

    updateMiniMap() {
        // Actualizar la posición del coche en el mini-mapa
        this.miniMapGraphics.clear();
        this.miniMapGraphics.lineStyle(2, 0xffffff, 1);
        this.miniMapGraphics.strokeRect(10, 10, 200, 200);
        this.miniMapGraphics.fillStyle(this.cars[this.currentCar].color, 1);
        this.miniMapGraphics.fillRect(10 + (this.car.x / this.track.width) * 200, 10 + (this.car.y / this.track.height) * 200, 3, 3); // Punto más grande
    }

    handleLapCompletion() {
        this.hasCrossedCheckpoint = false;
        const lapTime = this.time.now - this.startTime;
        this.lapTimes.push(lapTime);
        this.currentLap++;

        if (this.currentLap < this.laps) {
            this.startTime = this.time.now;
        } else {
            this.endRace();
        }
    }

    endRace() {
        this.car.setStatic(true);
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, '¡Carrera Terminada!', {
            fontSize: '64px',
            fill: '#fff'
        }).setOrigin(0.5);
        this.raceFinished = true; // Marcar la carrera como terminada


        this.time.delayedCall(1000, () => {
            this.showRaceResults();
        }, [], this);
    }

    showRaceResults() {
        // Crear fondo oscuro para los resultados
        const resultsBackground = this.add.graphics();
        resultsBackground.fillStyle(0x000000, 0.6);
        resultsBackground.fillRect(this.cameras.main.width / 2 - 150, 50, 300, 300);
        resultsBackground.setScrollFactor(0);

        let totalTime = 0;
        this.lapTimes.forEach((time, index) => {
            totalTime += time;
            this.add.text(this.cameras.main.width / 2 - 120, 30 + index * 30, `Vuelta ${index + 1}: ${(time/1000).toFixed(2)}s`, {
                fontSize: '24px',
                fill: '#fff'
            }).setOrigin(0.5);
        });

        this.add.text(this.cameras.main.width / 2 - 120, 50 + this.lapTimes.length * 30, `Total: ${(totalTime/1000).toFixed(2)}s`, {
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.updateRecords(totalTime);

        this.input.keyboard.on('keydown', () => this.scene.start('RecordsScene'));
        this.input.on('pointerdown', () => this.scene.start('RecordsScene'));
    }

    updateRecords(totalTime) {
        // Actualizar los records si es necesario
        const trackId = 0; // Nombre del circuito actual
        const bestLapTimes = this.bestLapTimes[trackId] || [];
        const bestRaceTimes = this.bestRaceTimes[trackId] || [];

        this.lapTimes.forEach(time => {
            if (bestLapTimes.length < 10 || time < Math.max(...bestLapTimes)) {
                bestLapTimes.push(time);
                bestLapTimes.sort((a, b) => a - b);
                if (bestLapTimes.length > 10) bestLapTimes.pop();
            }
        });

        if (bestRaceTimes.length < 10 || totalTime < Math.max(...bestRaceTimes)) {
            bestRaceTimes.push(totalTime);
            bestRaceTimes.sort((a, b) => a - b);
            if (bestRaceTimes.length > 10) bestRaceTimes.pop();
        }

        this.bestLapTimes[trackId] = bestLapTimes;
        this.bestRaceTimes[trackId] = bestRaceTimes;

        localStorage.setItem('bestLapTimes', JSON.stringify(this.bestLapTimes));
        localStorage.setItem('bestRaceTimes', JSON.stringify(this.bestRaceTimes));
    }
}

export default GameScene;