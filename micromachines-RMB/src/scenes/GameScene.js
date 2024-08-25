class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene', physics: { default: 'matter', matter: { debug: true, gravity: { y: 0 } } } });
    }

    preload() {
        // Cargar el sprite del coche
        this.load.image('car', 'assets/cars/yellow.png');
        // Cargar el sprite del circuito (esto es un ejemplo, deberías cargar tu circuito real)
        this.load.image('track', 'assets/tracks/track1.jpg');
        // Cargar la imagen de máscara
        this.load.image('mask', 'assets/tracks/track1_mask.jpg');
        // Cargar la imagen del minimapa
        this.load.image('minimap', 'assets/tracks/track1_minimap.png');
    }

    create() {
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
        this.car.setPosition(400, 250);

        // Configurar las teclas de control
        this.cursors = this.input.keyboard.createCursorKeys();

        // Configurar controles táctiles
        this.input.on('pointerdown', this.handlePointerDown, this);
        this.input.on('pointerup', this.handlePointerUp, this);

        // Configurar la cuenta atrás
        this.countdownText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, '5', {
            fontSize: '64px',
            fill: '#fff'
        }).setOrigin(0.5);
        this.time.delayedCall(100, this.updateCountdown, [4], this);

        // Configurar el mini-mapa
        this.miniMap = this.add.image(10, 10, 'minimap').setOrigin(0, 0).setDisplaySize(200, 200);
        this.miniMapGraphics = this.add.graphics();
        this.miniMapGraphics.lineStyle(2, 0xffffff, 1);
        this.miniMapGraphics.strokeRect(10, 10, 200, 200);

        // Configurar la meta
        this.finishLine = new Phaser.Geom.Rectangle(460, 223, 1, 100); // Definir la línea de meta

        // Dibujar la línea de meta
        this.finishLineGraphics = this.add.graphics();
        this.finishLineGraphics.lineStyle(3, 0xffffff, 2);
        this.finishLineGraphics.strokeRect(this.finishLine.x, this.finishLine.y, 3, this.finishLine.height);

        // Añadir texto para mostrar la información del coche
        this.carInfoText = this.add.text(this.cameras.main.width - 10, 10, '', {
            fontSize: '16px',
            fill: '#fff'
        }).setOrigin(1, 0);

        // Crear los bordes del circuito a partir de la imagen de máscara
        this.createTrackBoundsFromMask();
    }

    createTrackBoundsFromMask() {
        // Crear un bitmap data a partir de la imagen de máscara
        const mask = this.textures.get('mask').getSourceImage();
        const maskCanvas = this.textures.createCanvas('maskCanvas', mask.width, mask.height);
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
            this.time.delayedCall(100, this.updateCountdown, [seconds - 1], this);
        } else {
            this.countdownText.setText('¡GO!');
            this.time.delayedCall(100, () => {
                this.countdownText.setVisible(false);
                this.startRace();
            }, [], this);
        }
    }

    startRace() {
        this.startTime = this.time.now;
        this.car.setStatic(false); // Permitir que el coche se mueva
        this.car.setVelocity(0, 0);
        this.car.setAngularVelocity(0);
    }

    handlePointerDown(pointer) {
        // Manejar controles táctiles
        if (pointer.x < this.cameras.main.width / 2) {
            this.car.setAngularVelocity(-0.1);
        } else {
            this.car.setAngularVelocity(0.1);
        }
    }

    handlePointerUp(pointer) {
        // Detener el giro del coche
        this.car.setAngularVelocity(0);
    }

    update(time, delta) {
        if (this.startTime > 0) {
            // Actualizar la posición del coche y el circuito
            this.updateCarControls();
            this.updateMiniMap();

            // Verificar si el coche ha cruzado la meta
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.car.getBounds(), this.finishLine)) {
                if (!this.hasCrossedFinishLine) {
                    this.handleLapCompletion();
                    this.hasCrossedFinishLine = true;
                }
            } else {
                this.hasCrossedFinishLine = false;
            }
        }

        // Actualizar la información del coche
        this.updateCarInfo();
    }

    updateCarControls() {
        // Controlar el coche con el teclado
        const maxSpeed = 0.001;
        const maxReverseSpeed = -0.0005;
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
        const angle = Phaser.Math.RadToDeg(this.car.rotation).toFixed(2);
        const rotation = this.car.rotation.toFixed(2);
        const velocity = this.car.body.velocity;
        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y).toFixed(2);
        const posX = this.car.x.toFixed(2);
        const posY = this.car.y.toFixed(2);

        this.carInfoText.setText(`Ángulo: ${angle}°\nRotación: ${rotation} rad\nVelocidad: ${velocity}\nSpeed: ${speed}\nPosición X: ${posX}\nPosición Y: ${posY}`);
    }

    updateMiniMap() {
        // Actualizar la posición del coche en el mini-mapa
        this.miniMapGraphics.clear();
        this.miniMapGraphics.lineStyle(2, 0xffffff, 1);
        this.miniMapGraphics.strokeRect(10, 10, 200, 200);
        this.miniMapGraphics.fillStyle(0xff0000, 1);
        this.miniMapGraphics.fillRect(10 + (this.car.x / this.track.width) * 200, 10 + (this.car.y / this.track.height) * 200, 3, 3); // Punto más grande
    }

    handleLapCompletion() {
        const lapTime = this.time.now - this.startTime;
        this.lapTimes.push(lapTime);
        this.currentLap++;

        if (this.currentLap < this.laps) {
            this.startTime = this.time.now;
            this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, `Vuelta ${this.currentLap + 1}`, {
                fontSize: '32px',
                fill: '#fff'
            }).setOrigin(0.5).setDepth(1).setScrollFactor(0).setAlpha(0.8);
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

        this.time.delayedCall(3000, () => {
            this.showRaceResults();
        }, [], this);
    }

    showRaceResults() {
        let totalTime = 0;
        this.lapTimes.forEach((time, index) => {
            totalTime += time;
            this.add.text(this.cameras.main.width / 2, 100 + index * 30, `Vuelta ${index + 1}: ${time.toFixed(2)}s`, {
                fontSize: '24px',
                fill: '#fff'
            }).setOrigin(0.5);
        });

        this.add.text(this.cameras.main.width / 2, 100 + this.lapTimes.length * 30, `Tiempo Total: ${totalTime.toFixed(2)}s`, {
            fontSize: '24px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.updateRecords(totalTime);

        this.input.keyboard.on('keydown', () => this.scene.start('TrackSelectionScene'));
        this.input.on('pointerdown', () => this.scene.start('TrackSelectionScene'));
    }

    updateRecords(totalTime) {
        // Actualizar los records si es necesario
        const trackName = 'track'; // Nombre del circuito actual
        const bestLapTimes = this.bestLapTimes[trackName] || [];
        const bestRaceTimes = this.bestRaceTimes[trackName] || [];

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

        this.bestLapTimes[trackName] = bestLapTimes;
        this.bestRaceTimes[trackName] = bestRaceTimes;

        localStorage.setItem('bestLapTimes', JSON.stringify(this.bestLapTimes));
        localStorage.setItem('bestRaceTimes', JSON.stringify(this.bestRaceTimes));
    }
}

export default GameScene;