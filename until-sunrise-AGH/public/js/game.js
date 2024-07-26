// Configuración del juego
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Variables globales
let player;
let enemies = [];
let gameTime = 0;
let score = 0;
let level = 1;
let gameStarted = false;
let lastTime = 0;
let playerName = '';
let aerialEnemies = [];
let aerialEnemyInterval = 3000;
let lastAerialEnemyTime = 0;

let backgroundStage = 0;
const POINTS_PER_STAGE = 50;
const MAX_SCORE = 250;

let messageQueue = [];
let currentMessage = null;
let messageTimer = 0;
const MESSAGE_DURATION = 3000;

// Clase jugador
class Player {

    constructor(x, y, game) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 5;
        this.jumpForce = 15;
        this.gravity = 0.6;
        this.velocityY = 0;
        this.velocityX = 0;
        this.jumping = false;
        this.attacking = false;

        this.jumpCount = 0;
        this.maxJumps = 2; // Permite hasta dos saltos

        this.facingRight = true;
        this.game = game;

        this.sprites = {
            idle: new Image(),
            run: new Image(),
            jump: new Image(),
            attack: new Image()
        };
        this.currentSprite = 'idle';
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrames = 8;
        this.fps = 15;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.loadSprites();

        this.projectiles = [];
        this.lastShotTime = 0;
        this.shootCooldown = 500;
    }

    loadSprites() {
        for (let key in this.sprites) {
            this.sprites[key].src = `./sprites/${key}.png`;
        }
    }

    draw() {
        ctx.drawImage(
            this.sprites[this.currentSprite],
            this.frameX * this.width,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update(deltaTime) {
        // Movimiento horizontal
        this.x += this.velocityX;

        // Aplicar gravedad
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Limitar al suelo
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
            this.velocityY = 0;
            this.jumpCount = 0;
        }

        // Añadir una velocidad máxima de caída
        this.velocityY = Math.min(this.velocityY, 10);

        // Actualizar animación
        this.frameTimer += deltaTime;
        if (this.frameTimer > this.frameInterval) {
            this.frameX = (this.frameX + 1) % this.maxFrames;
            this.frameTimer = 0;
        }

        // Mantener dentro del canvas
        this.x = Math.max(0, Math.min(this.x, canvas.width - this.width));

        // Actualizar sprite basado en el estado
        if (this.jumpCount > 0) {
            this.currentSprite = 'jump';
        } else if (Math.abs(this.velocityX) > 0) {
            this.currentSprite = 'run';
        } else {
            this.currentSprite = 'idle';
        }
    }

    moveLeft() {
        this.velocityX = -this.speed;
        this.facingRight = true;
        this.direction = -1;
    }

    moveRight() {
        this.velocityX = this.speed;
        this.facingRight = false;
        this.direction = 1;
    }

    stopMoving() {
        this.velocityX = 0;
    }

    jump() {
        if (this.jumpCount < this.maxJumps) {
            this.velocityY = -this.jumpForce;
            this.jumpCount++;
            this.currentSprite = 'jump';
        }
    }

    attack() {
        this.attacking = true;
        setTimeout(() => this.attacking = false, 300);
    }

    shoot() {
        const currentTime = Date.now();
        if (currentTime - this.lastShotTime > this.shootCooldown) {
            const projectileX = this.facingRight ? this.x + this.width : this.x;
            const projectileY = this.y + this.height / 2;
            const projectileSpeed = 15;
            const projectileDirection = this.facingRight ? 1 : -1;
            
            this.projectiles.push(new Projectile(projectileX, projectileY, projectileSpeed, projectileDirection));
            this.lastShotTime = currentTime;

            // Efecto visual simple
            if (this.game && this.game.ctx) { // Asegúrate de que tienes acceso al contexto del canvas
                const ctx = this.game.ctx;
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(projectileX, projectileY, 10, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    updateProjectiles() {
        this.projectiles = this.projectiles.filter(projectile => {
            projectile.update();
            return projectile.x > 0 && projectile.x < canvas.width;
        });
    }

    drawProjectiles(ctx) {
        this.projectiles.forEach(projectile => projectile.draw(ctx));
    }

}

// Clase enemigo
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.speed = 2;
        this.sprite = new Image();
        this.sprite.src = './sprites/enemy.png';
        this.frameX = 0;
        this.maxFrames = 7;
        this.frameTimer = 0;
        this.frameInterval = 100;
    }

    draw() {
        ctx.drawImage(
            this.sprite,
            this.frameX * this.width,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update(deltaTime) {
        this.x -= this.speed;
        if (this.frameTimer > this.frameInterval) {
            this.frameX = (this.frameX + 1) % this.maxFrames;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
}

// Clase para el enemigo aéreo
class AerialEnemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.speed = 3;
        this.sprite = new Image();
        this.sprite.src = './sprites/spirit.png'; // Asegúrate de tener esta imagen
        this.frameX = 0;
        this.maxFrames = 4; // Ajusta esto según tu sprite
        this.frameTimer = 0;
        this.frameInterval = 100;
    }

    draw() {
        ctx.drawImage(
            this.sprite,
            this.frameX * this.width,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update(deltaTime) {
        this.x -= this.speed;

        // Movimiento ondulante
        this.y += Math.sin(this.x * 0.05) * 2;

        if (this.frameTimer > this.frameInterval) {
            this.frameX = (this.frameX + 1) % this.maxFrames;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
}

class Projectile {
    constructor(x, y, speed, direction) {
        this.x = x;
        this.y = y;
        this.width = 15;  // Aumentado el tamaño para mejor visibilidad
        this.height = 5;
        this.speed = speed;
        this.direction = direction;
    }

    update() {
        this.x += this.speed * this.direction;
    }

    draw(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2); // Dibuja un círculo en lugar de un rectángulo
        ctx.fill();
    }
}

// Función para mostrar mensajes temporales
function showMessage(message) {
    messageQueue.push(message);
    if (!currentMessage) {
        displayNextMessage();
    }
}

// Función para mostrar el siguiente mensaje en la cola
function displayNextMessage() {
    if (messageQueue.length > 0) {
        currentMessage = messageQueue.shift();
        messageTimer = MESSAGE_DURATION;
    } else {
        currentMessage = null;
    }
}

// Función para dibujar el mensaje actual
function drawMessage() {
    if (currentMessage) {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, canvas.height / 2 - 40, canvas.width, 80);
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currentMessage, canvas.width / 2, canvas.height / 2);
        ctx.restore();
    }
}

// Función para actualizar el sistema de mensajes
function updateMessages(deltaTime) {
    if (currentMessage) {
        messageTimer -= deltaTime;
        if (messageTimer <= 0) {
            displayNextMessage();
        }
    }
}

// Funciones del juego
function init() {

    player = new Player(48, canvas.height - 100, this);
    enemies = [];

    gameTime = 0;

    score = 0;
    level = 1;

    backgroundStage = 0;

    initStars();
    updateHUD();
}

function startGame() {
    if (!gameStarted) {
        playerName = document.getElementById('player-name').value;
        if (playerName) {
            gameStarted = true;
            document.getElementById('start-screen').style.display = 'none';
            document.getElementById('game-container').style.display = 'block';
            init();
            lastTime = performance.now();
            requestAnimationFrame(gameLoop);
        } else {
            alert('Por favor, ingresa tu nombre.');
        }
    }
}

// Variables globales (añade estas al inicio de tu archivo)
let stars = [];
const NUM_STARS = 100;

// Función para inicializar las estrellas
function initStars() {
    for (let i = 0; i < NUM_STARS; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height - 70),  // No dibujar estrellas en el pasto
            size: Math.random() * 2,
            speed: Math.random() * 0.2  // Velocidad más lenta
        });
    }
}

// Función para dibujar el fondo basado en la etapa actual
function drawBackground() {
    let gradient;
    switch (backgroundStage) {
        case 0: // Medianoche
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#0C1445');
            gradient.addColorStop(0.3, '#1E3163');
            gradient.addColorStop(0.6, '#365486');
            gradient.addColorStop(1, '#7895B2');
            break;
        case 1: // Madrugada
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#1F1E33');
            gradient.addColorStop(0.3, '#4A3F6B');
            gradient.addColorStop(0.6, '#7B6B9E');
            gradient.addColorStop(1, '#A8A0BC');
            break;
        case 2: // Amanecer
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#4A3F6B');
            gradient.addColorStop(0.3, '#9E7B72');
            gradient.addColorStop(0.6, '#E6A47C');
            gradient.addColorStop(1, '#F6D4BA');
            break;
        case 3: // Mañana
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#87CEEB');
            gradient.addColorStop(0.3, '#B5E2FF');
            gradient.addColorStop(0.6, '#FFEED4');
            gradient.addColorStop(1, '#FFF9E8');
            break;
    }

    // Aplicar el gradiente al fondo
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar estrellas (solo para las etapas 0 y 1)
    if (backgroundStage < 2) {
        drawStars();
    }

    // Dibujar sol (solo para las etapas 2 y 3)
    if (backgroundStage >= 2) {
        drawSun();
    }

    // Dibujar pasto
    drawGrass();
}

// Función para dibujar el sol
function drawSun() {
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 40, 0, Math.PI * 2);
    ctx.fill();
}


function drawStars() {
    ctx.fillStyle = 'white';
    stars.forEach(star => {
        ctx.fillRect(star.x, star.y, star.size, star.size);
        // Mover la estrella
        star.x -= star.speed;
        // Si la estrella sale de la pantalla, reiniciarla al otro lado
        if (star.x < 0) {
            star.x = canvas.width;
            star.y = Math.random() * (canvas.height - 70);
        }
    });
}

function drawGrass() {
    const grassHeight = 20;
    const groundHeight = 50;

    // Dibujar suelo base
    ctx.fillStyle = '#1A1A1A';  // Suelo oscuro
    ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

    // Dibujar pasto
    ctx.fillStyle = '#0A4D0A';  // Verde oscuro para el pasto
    for (let x = 0; x < canvas.width; x += 4) {
        const height = grassHeight + Math.random() * 10;
        ctx.beginPath();
        ctx.moveTo(x, canvas.height - groundHeight);
        ctx.lineTo(x + 2, canvas.height - groundHeight - height);
        ctx.lineTo(x + 4, canvas.height - groundHeight);
        ctx.fill();
    }
}

function updateHUD() {
    document.getElementById('time').textContent = `Tiempo: ${Math.floor(gameTime / 1000)}`;
    document.getElementById('score').textContent = `Puntuación: ${score}`;
    document.getElementById('level').textContent = `Nivel: ${level}`;
}

// Modificar la función gameLoop
function gameLoop(timestamp) {

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();

    //
    player.update(deltaTime);
    player.updateProjectiles();
    player.draw(ctx);
    player.drawProjectiles(ctx);

    checkProjectileCollisions();

    // Generar enemigos terrestres
    if (Math.random() < 0.02) {
        enemies.push(new Enemy(canvas.width, canvas.height - 82));
    }

    // Generar enemigos aéreos si el score es mayor a 100
    if (score > 10 && timestamp - lastAerialEnemyTime > aerialEnemyInterval) {
        aerialEnemies.push(new AerialEnemy(canvas.width, Math.random() * (canvas.height / 2)));
        lastAerialEnemyTime = timestamp;
    }

    // Actualizar y dibujar enemigos terrestres
    enemies = enemies.filter(enemy => {
        enemy.update(deltaTime);
        enemy.draw();
        return enemy.x + enemy.width > 0;
    });

    // Actualizar y dibujar enemigos aéreos
    aerialEnemies = aerialEnemies.filter(enemy => {
        enemy.update(deltaTime);
        enemy.draw();
        return enemy.x + enemy.width > 0;
    });

    checkCollisions();

    gameTime += deltaTime;
    updateHUD();
    checkLevel();

    // Actualizar y dibujar mensajes
    updateMessages(deltaTime);
    drawMessage();


    if (gameStarted) {
        requestAnimationFrame(gameLoop);
    }

}

function checkProjectileCollisions() {
    player.projectiles.forEach((projectile, pIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (checkCollision(projectile, enemy)) {
                // Eliminar el proyectil y el enemigo
                player.projectiles.splice(pIndex, 1);
                enemies.splice(eIndex, 1);
                score += 10;
            }
        });

        aerialEnemies.forEach((enemy, eIndex) => {
            if (checkCollision(projectile, enemy)) {
                // Eliminar el proyectil y el enemigo aéreo
                player.projectiles.splice(pIndex, 1);
                aerialEnemies.splice(eIndex, 1);
                score += 15;
            }
        });
    });
}

// Modificar la función checkCollisions
function checkCollisions() {
    // Colisiones con enemigos terrestres
    enemies.forEach((enemy, index) => {
        if (checkCollision(player, enemy)) {
            if (player.attacking || player.y + player.height < enemy.y + enemy.height / 2) {
                enemies.splice(index, 1);
                score += 10;
            } else {
                endGame();
            }
        }
    });

    // Colisiones con enemigos aéreos
    aerialEnemies.forEach((enemy, index) => {
        if (checkCollision(player, enemy)) {
            aerialEnemies.splice(index, 1);
            endGame();
        }
    });
}

// Función auxiliar para verificar colisiones
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y;
}

// Modificar la función checkLevel
function checkLevel() {
    if (score >= level * 100) {
        level++;
        // Aumentar dificultad
        enemies.forEach(enemy => enemy.speed += 0.5);
        aerialEnemies.forEach(enemy => enemy.speed += 0.5);
        showMessage(`¡Has alcanzado el nivel ${level}!`);
        aerialEnemyInterval = Math.max(1000, aerialEnemyInterval - 500);
    }

    // Actualizar el fondo basado en la puntuación
    let newBackgroundStage = Math.min(Math.floor(score / POINTS_PER_STAGE), 3);
    if (newBackgroundStage !== backgroundStage) {
        backgroundStage = newBackgroundStage;
        showMessage(`¡Has alcanzado la etapa ${backgroundStage + 1}!`);
    }

    // Verificar si el jugador ha completado el juego
    if (score >= MAX_SCORE && !gameCompleted) {
        gameCompleted = true;
        showGameCompletionMessage();
    }
}

// Función para mostrar el mensaje de finalización del juego
function showGameCompletionMessage() {
    gameStarted = false;
    Swal.fire({
        title: '¡Felicidades!',
        text: 'Has completado el juego con una puntuación perfecta.',
        icon: 'success',
        confirmButtonText: 'Jugar de nuevo'
    }).then((result) => {
        if (result.isConfirmed) {
            resetGame();
            startGame();
        }
    });
}

// Modificar la función endGame
function endGame() {
    gameStarted = false;

    Swal.fire({
        title: 'Juego terminado',
        text: `Tu puntuación final es: ${score}`,
        icon: 'info',
        confirmButtonText: 'Ver puntuaciones'
    }).then((result) => {
        if (result.isConfirmed) {
            saveScore(playerName, score, new Date().toISOString());
            showResults();
        }
    });
}

function saveScore(name, score, date) {
    fetch('/save-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score, date }),
    })
        .then(response => response.json())
        .then(data => console.log('Score saved:', data))
        .catch(error => console.error('Error:', error));
}

function showResults() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
    fetchResults();
}

function fetchResults() {
    fetch('/get-scores')
        .then(response => response.json())
        .then(data => {
            const scoresBody = document.getElementById('scores-body');
            scoresBody.innerHTML = data.map(score => `
            <tr>
                <td>${score.name}</td>
                <td>${score.score}</td>
                <td>${new Date(score.date).toLocaleString()}</td>
            </tr>
        `).join('');
        })
        .catch(error => console.error('Error:', error));
}

// Event Listeners
document.getElementById('player-form').addEventListener('submit', function (e) {
    e.preventDefault();
    startGame();
});

// eventos para teclado
document.addEventListener('keydown', (e) => {
    if (!gameStarted) return;
    switch (e.key) {
        case 'ArrowLeft':
            player.velocityX = -player.speed;
            player.currentSprite = 'run';
            break;
        case 'ArrowRight':
            player.velocityX = player.speed;
            player.currentSprite = 'run';
            break;
        case 'ArrowUp':
        case ' ': // Permitir saltar con la flecha arriba o la barra espaciadora
            player.jump();
            break;
        case 'z': // Usar 'z' para atacar, por ejemplo
            player.attack();
            break;
        case 'x': // Puedes cambiar 'x' por cualquier otra tecla que prefieras para disparar
            player.shoot();
            break;
    }
});

document.addEventListener('keyup', (e) => {
    if (!gameStarted) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        player.velocityX = 0;
        player.currentSprite = 'idle';
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', fetchResults);