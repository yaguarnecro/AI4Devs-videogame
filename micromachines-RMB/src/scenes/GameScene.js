class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene', physics: { default: 'matter', matter: { debug: true, gravity: { y: 0 } } } });
    }

    preload() {
        // Cargar el sprite del coche
        this.load.image('car', 'assets/cars/yellow.png');
        // Cargar el sprite del circuito (esto es un ejemplo, deberías cargar tu circuito real)
        this.load.image('track', 'assets/tracks/track1.jpg');
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
        this.car = this.matter.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'car');
        this.car.setDisplaySize(50, 50);
        this.car.setFrictionAir(0.05);
        this.car.setFixedRotation();
        this.car.angle = 0; // Girar solo la imagen del coche 90 grados a la derecha
        this.car.setTexture('car');
        //this.car.setAngle(90); // Girar el sprite 90 grados a la derecha

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
        this.miniMap = this.add.graphics();
        this.miniMap.lineStyle(2, 0xffffff, 1);
        this.miniMap.strokeRect(10, 10, 200, 200);

        // Configurar la meta
        this.finishLine = new Phaser.Geom.Rectangle(400, 300, 50, 10); // Ejemplo de posición de la meta

        // Añadir texto para mostrar la información del coche
        this.carInfoText = this.add.text(this.cameras.main.width - 10, 10, '', {
            fontSize: '16px',
            fill: '#fff'
        }).setOrigin(1, 0);

        // Crear los bordes del circuito
        this.createTrackBounds();
    }

    createTrackBounds() {
        // Crear bordes invisibles alrededor del circuito
        const bounds = [
            this.matter.add.rectangle(400, 0, 800, 50, { isStatic: true }), // Borde superior
            this.matter.add.rectangle(400, 600, 800, 50, { isStatic: true }), // Borde inferior
            this.matter.add.rectangle(0, 300, 50, 600, { isStatic: true }), // Borde izquierdo
            this.matter.add.rectangle(800, 300, 50, 600, { isStatic: true }), // Borde derecho
            this.matter.add.rectangle(400, 300, 50, 600, { isStatic: true }) // Borde derecho
        ];

        // Añadir colisiones entre el coche y los bordes
        this.matter.world.on('collisionstart', (event) => {
            console.log(event.pairs);
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
        this.car.setVelocity(-velocity.x, -velocity.y);
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
            if (Phaser.Geom.Rectangle.ContainsPoint(this.finishLine, this.car.getCenter())) {
                //this.handleLapCompletion();
            }
        }

        // Actualizar la información del coche
        this.updateCarInfo();
    }

    updateCarControls() {
        // Controlar el coche con el teclado
        const maxSpeed = 0.008;
        const maxReverseSpeed = -0.006;
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
        this.miniMap.clear();
        this.miniMap.lineStyle(2, 0xffffff, 1);
        this.miniMap.strokeRect(10, 10, 200, 200);
        this.miniMap.fillStyle(0xff0000, 1);
        this.miniMap.fillRect(10 + (this.car.x / this.track.width) * 200, 10 + (this.car.y / this.track.height) * 200, 5, 5);
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