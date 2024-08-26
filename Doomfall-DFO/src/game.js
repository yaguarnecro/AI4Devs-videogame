class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 1280;
        this.canvas.height = 960;
        this.lastFrameTime = 0;
        this.isPaused = false;
        this.isCompleted = false;
        this.score = 0;
        this.lives = 3; // Vidas iniciales del jugador
        this.enemies = [];
        this.enemySpawnTime = 0;

        // Cargar imágenes
        this.playerImage = new Image();
        this.playerImage.src = 'assets/images/player.png';

        this.backgroundImage = new Image();
        this.backgroundImage.src = 'assets/images/background.png';

        this.textureImage = new Image();
        this.textureImage.src = 'assets/images/texture.png'; // Textura para los obstáculos

        // Cargar sonidos
        this.shotSound = new Audio('assets/sounds/shot.wav');
        this.explosionSound = new Audio('assets/sounds/explosion.wav');
        this.gruntSound = new Audio('assets/sounds/quejido.wav'); // Sonido de quejido al ser alcanzado

        // Inicializar jugador
        this.player = {
            x: this.canvas.width / 2 - 60, // Ajustar la posición inicial para el nuevo tamaño
            y: this.canvas.height / 2 - 60, 
            width: 90, // El doble de su tamaño original
            height: 90, // El doble de su tamaño original
            speed: 200,
            dx: 0,
            dy: 0
        };
        

        // Inicializar primer enemigo
        this.addEnemy();

        // Inicializar balas
        this.bullets = [];

        // Generar obstáculos aleatorios
        this.obstacles = this.generateObstacles();

        this.initControls();
    }

    addEnemy() {
        const enemyImages = [
            'assets/images/enemy01.png',
            'assets/images/enemy02.png',
            'assets/images/enemy03.png',
            'assets/images/enemy04.png',
            'assets/images/enemy05.png',
            'assets/images/enemy06.png'
        ];
        
        const randomIndex = Math.floor(Math.random() * enemyImages.length);
        const randomEnemyImage = new Image();
        randomEnemyImage.src = enemyImages[randomIndex];
        
        const enemyShotImage = new Image();
        enemyShotImage.src = enemyImages[randomIndex].replace('.png', '-shot.png');

        const enemy = {
            x: Math.floor(Math.random() * (this.canvas.width - 150)), // Ajustar la posición inicial para el nuevo tamaño
            y: Math.floor(Math.random() * (this.canvas.height - 150)),
            width: 150, // 50% más grande que el jugador
            height: 150, // 50% más grande que el jugador
            baseSpeed: 50,
            speed: 50,
            speedIncrement: 20,
            lastSpeedIncrease: 0,
            isHit: false,
            hitTime: 0,
            hitCount: 0,
            maxHits: 5,
            image: randomEnemyImage,
            shotImage: enemyShotImage,
            isVisible: true
        };

        this.enemies.push(enemy);
    }

    generateObstacles() {
        const obstacles = [];
        const numObstacles = Math.floor(Math.random() * 3) + 3; // Entre 3 y 5 obstáculos
    
        for (let i = 0; i < numObstacles; i++) {
            const width = Math.floor(Math.random() * 100) + 50; // Ancho entre 50 y 150
            const height = Math.floor(Math.random() * 100) + 50; // Alto entre 50 y 150
            let x, y;
            let overlapping;
    
            do {
                overlapping = false;
                x = Math.floor(Math.random() * (this.canvas.width - width));
                y = Math.floor(Math.random() * (this.canvas.height - height));
    
                // Verificar que el obstáculo no se superponga con la zona del puntaje y las vidas
                if (x > this.canvas.width - 250 && y < 100) {
                    overlapping = true;
                }
    
                // Verificar si el nuevo obstáculo se superpone con otros existentes
                for (let obstacle of obstacles) {
                    if (
                        x < obstacle.x + obstacle.width &&
                        x + width > obstacle.x &&
                        y < obstacle.y + obstacle.height &&
                        y + height > obstacle.y
                    ) {
                        overlapping = true;
                        break;
                    }
                }
            } while (overlapping);
    
            obstacles.push({ x, y, width, height });
        }
    
        return obstacles;
    }
    

    start() {
        this.loop();
    }

    initControls() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.keyUp(e));
        document.addEventListener('click', (e) => this.shot(e.clientX, e.clientY));
    }

    handleKeyDown(e) {
        if (this.isPaused) {
            if (e.key !== ' ') {
                this.isPaused = false;
            }
            return;
        }

        switch(e.key) {
            case 'ArrowUp':
            case 'w':
                this.player.dy = -this.player.speed;
                break;
            case 'ArrowDown':
            case 's':
                this.player.dy = this.player.speed;
                break;
            case 'ArrowLeft':
            case 'a':
                this.player.dx = -this.player.speed;
                break;
            case 'ArrowRight':
            case 'd':
                this.player.dx = this.player.speed;
                break;
            case ' ':
                e.preventDefault(); // Evitar comportamiento por defecto
                this.togglePause();
                break;
        }
    }

    togglePause() {
        this.isPaused = !this.isPaused;
    }
    

    keyUp(e) {
        if (this.isPaused) return;

        switch(e.key) {
            case 'ArrowUp':
            case 'w':
            case 'ArrowDown':
            case 's':
                this.player.dy = 0;
                break;
            case 'ArrowLeft':
            case 'a':
            case 'ArrowRight':
            case 'd':
                this.player.dx = 0;
                break;
        }
    }

    shot(targetX, targetY) {
        if (this.isPaused) return;
    
        // Reproducir sonido de disparo al 5% del volumen
        this.shotSound.volume = 0.05;
        this.shotSound.play();
    
        // Calcular dirección de la bala
        const dx = targetX - (this.player.x + this.player.width / 2);
        const dy = targetY - (this.player.y + this.player.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
    
        const bullet = {
            x: this.player.x + this.player.width / 2,
            y: this.player.y + this.player.height / 2,
            speed: 400,
            dx: dx / distance, // Normalizar la dirección
            dy: dy / distance, // Normalizar la dirección
            width: 5,
            height: 5
        };
        this.bullets.push(bullet);
    }
    
    update(delta, timestamp) {
        if (this.isPaused) return;
    
        // Incrementar el número de enemigos cada minuto
        if (timestamp - this.enemySpawnTime > 60000 && this.enemies.length < 6) {
            this.addEnemy();
            this.enemySpawnTime = timestamp;
        }
    
        // Mover al jugador
        this.player.x += this.player.dx * (delta / 1000);
        this.player.y += this.player.dy * (delta / 1000);
    
        // Mantener al jugador dentro del canvas
        if (this.player.x < 0) this.player.x = 0;
        if (this.player.y < 0) this.player.y = 0;
        if (this.player.x + this.player.width > this.canvas.width) this.player.x = this.canvas.width - this.player.width;
        if (this.player.y + this.player.height > this.canvas.height) this.player.y = this.canvas.height - this.player.height;
    
        // Comprobar colisiones con obstáculos
        for (let obstacle of this.obstacles) {
            if (this.isColliding(this.player, obstacle)) {
                this.resolveCollision(this.player, obstacle);
            }
        }
    
        // Mover balas
        this.bullets.forEach((bullet, index) => {
            bullet.x += bullet.dx * bullet.speed * (delta / 1000);
            bullet.y += bullet.dy * bullet.speed * (delta / 1000);
    
            // Eliminar balas fuera de la pantalla o si colisionan con un obstáculo
            if (
                bullet.x < 0 || bullet.x > this.canvas.width ||
                bullet.y < 0 || bullet.y > this.canvas.height ||
                this.obstacles.some(obstacle => this.isColliding(bullet, obstacle))
            ) {
                this.bullets.splice(index, 1);
            }
        });
    
        // Actualizar cada enemigo
        this.enemies.forEach((enemy, enemyIndex) => {
            if (enemy.isHit) {
                // Si el enemigo ha sido impactado, detenerlo por 3 segundos
                if (timestamp - enemy.hitTime > 3000) {
                    enemy.isHit = false;
                    enemy.speed = enemy.baseSpeed; // Restaurar la velocidad del enemigo
                    enemy.image.src = enemy.image.src.replace('-shot', '.png'); // Restaurar la imagen del enemigo
                }
            } else {
                // Lógica de movimiento del enemigo
                if (enemy.x < this.player.x) {
                    enemy.x += enemy.speed * (delta / 1000);
                } else if (enemy.x > this.player.x) {
                    enemy.x -= enemy.speed * (delta / 1000);
                }
    
                if (enemy.y < this.player.y) {
                    enemy.y += enemy.speed * (delta / 1000);
                } else if (enemy.y > this.player.y) {
                    enemy.y -= enemy.speed * (delta / 1000);
                }
    
                // Evitar que el enemigo atraviese obstáculos
                this.obstacles.forEach(obstacle => {
                    if (this.isColliding(enemy, obstacle)) {
                        this.resolveCollision(enemy, obstacle);
                    }
                });
    
                // Comprobar colisión con el jugador y pasar el enemigo a handlePlayerHit
                if (this.isColliding(this.player, enemy)) {
                    this.handlePlayerHit(enemy);
                }
    
                // Incrementar la velocidad del enemigo cada 10 segundos
                if (timestamp - enemy.lastSpeedIncrease > 10000) {
                    enemy.speed += enemy.speedIncrement;
                    enemy.lastSpeedIncrease = timestamp;
                }
            }
    
            // Detectar colisiones de balas con el enemigo
            this.bullets.forEach((bullet, bulletIndex) => {
                if (this.isColliding(bullet, enemy) && !enemy.isHit) {
                    this.bullets.splice(bulletIndex, 1);
                    this.enemyHit(enemy, timestamp);
                }
            });
        });
    }
       
    handlePlayerHit(enemy) {
        this.gruntSound.play(); // Reproducir sonido de quejido
    
        if (this.lives > 0) {
            this.lives -= 1; // Reducir las vidas correctamente
    
            // Reposicionar al jugador en una zona alejada del enemigo que lo alcanzó
            let newX, newY;
            let isColliding;
    
            do {
                newX = Math.random() * (this.canvas.width - this.player.width);
                newY = Math.random() * (this.canvas.height - this.player.height);
    
                // Verificar que el jugador no colisione con ningún obstáculo
                isColliding = this.obstacles.some(obstacle => 
                    this.isColliding({ x: newX, y: newY, width: this.player.width, height: this.player.height }, obstacle)
                );
    
            } while (
                Math.abs(newX - enemy.x) < 200 && Math.abs(newY - enemy.y) < 200 || // Evitar que el nuevo lugar esté cerca del enemigo
                isColliding || // Evitar colisiones con obstáculos
                newX < 0 || newY < 0 || // Asegurarse de que esté dentro del área de juego
                newX + this.player.width > this.canvas.width || 
                newY + this.player.height > this.canvas.height
            );
    
            this.player.x = newX;
            this.player.y = newY;
        }
    
        if (this.lives === 0) {
            // Terminar el juego si las vidas llegan a 0
            this.endGame();
        }
    }
    


    updateLivesDisplay() {
        // Esta función puede ser útil si deseas hacer algo específico cuando se actualizan las vidas
        // Actualmente, el número de vidas se actualizará automáticamente en la pantalla durante el renderizado
    }

    endGame() {
        this.isPaused = true;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.ctx.fillStyle = 'white';
        this.ctx.font = '50px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Juego Terminado. CTRL+F5 para Reiniciar', this.canvas.width / 2, this.canvas.height / 2);
    }
    
    removeEnemy(enemy) {
        let blinkCount = 0;
        const blinkInterval = setInterval(() => {
            enemy.isVisible = !enemy.isVisible; // Alternar visibilidad
            blinkCount++;
    
            if (blinkCount > 5) { // Parpadea 3 veces
                clearInterval(blinkInterval);
                this.enemies = this.enemies.filter(e => e !== enemy);
    
                // Si no hay más enemigos en el juego, agregar un nuevo enemigo
                if (this.enemies.length === 0) {
                    this.addEnemy();
                }
            }
        }, 200); // Intervalo de parpadeo de 200 ms
    }
    
    enemyHit(enemy, timestamp) {
        // Reproducir sonido de impacto al 30% del volumen
        this.explosionSound.volume = 0.3;
        this.explosionSound.play();
    
        // Cambiar imagen del enemigo a su versión impactada
        enemy.image.src = enemy.shotImage.src;
    
        // Detener al enemigo por 3 segundos
        enemy.isHit = true;
        enemy.hitTime = timestamp;
        enemy.speed = 0;
    
        // Incrementar el contador de impactos
        enemy.hitCount += 1;
    
        // Si ha recibido 5 impactos, eliminar al enemigo
        if (enemy.hitCount >= 5) {
            this.removeEnemy(enemy);
    
            // Incrementar el puntaje
            this.score += 1;
    
            // Verificar si el jugador ha derrotado a 5 enemigos
            if (this.score >= 5) {
                this.isCompleted = true;
                this.isPaused = true;
            } else {
                // Si no quedan más enemigos en el juego, agregar uno nuevo
                if (this.enemies.length === 0) {
                    this.addEnemy();
                }
            }
        } else {
            // Restablecer la imagen original después de 3 segundos
            setTimeout(() => {
                enemy.image.src = enemy.shotImage.src.replace('-shot', '');
                enemy.speed = enemy.baseSpeed;
                enemy.isHit = false;
            }, 3000);
        }
    }
    
    
    completeMission() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.ctx.fillStyle = 'white';
        this.ctx.font = '50px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('MISION COMPLETADA', this.canvas.width / 2, this.canvas.height / 2);
    }
    
     

    isColliding(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }

    resolveCollision(entity, obstacle) {
        // Resolver la colisión empujando a la entidad hacia afuera del obstáculo
        if (entity.dx > 0) {  // Moverse a la derecha
            entity.x = obstacle.x - entity.width;
        } else if (entity.dx < 0) {  // Moverse a la izquierda
            entity.x = obstacle.x + obstacle.width;
        }
        if (entity.dy > 0) {  // Moverse hacia abajo
            entity.y = obstacle.y - entity.height;
        } else if (entity.dy < 0) {  // Moverse hacia arriba
            entity.y = obstacle.y + obstacle.height;
        }
    }

    render() {
        // Dibujar fondo
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);

        // Dibujar los obstáculos con textura
        for (let obstacle of this.obstacles) {
            const pattern = this.ctx.createPattern(this.textureImage, 'repeat');
            this.ctx.fillStyle = pattern;
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }

        // Dibujar al jugador
        this.ctx.drawImage(this.playerImage, this.player.x, this.player.y, this.player.width, this.player.height);

        // Dibujar a los enemigos
        this.enemies.forEach(enemy => {
            if (enemy.isVisible && enemy.image.complete && enemy.image.naturalWidth !== 0) {
                this.ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
            }
        });

        // Dibujar balas
        this.ctx.fillStyle = 'yellow';
        this.bullets.forEach(bullet => {
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });

        // Mostrar puntaje y vidas en la parte superior derecha
        this.ctx.fillStyle = 'white';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Puntaje: ${this.score}  Vidas: ${this.lives}`, this.canvas.width - 250, 30);

        // Mostrar mensaje de juego terminado

        if (this.isPaused && this.lives <= 0) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.fillStyle = 'white';
            this.ctx.font = '60px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Juego Terminado. CTRL+F5 para Reiniciar', this.canvas.width / 2, this.canvas.height / 2);
        } 
        if (this.isPaused && this.isCompleted) {
            this.completeMission();
        }

    }

    loop(timestamp = 0) {
        const delta = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        this.update(delta, timestamp);
        this.render();

        requestAnimationFrame(this.loop.bind(this));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new Game(canvas);
    game.start();
});
