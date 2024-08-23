const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game objects
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    dx: 5,
    dy: 5
};

const paddleHeight = 100;
const paddleWidth = 10;
const paddleSpeed = 5;

const leftPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2, lives: 10, dy: 0 };
const rightPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, lives: 10, dy: 0 };

let gameOver = false;

// Key states
const keys = { w: false, s: false, ArrowUp: false, ArrowDown: false };

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (gameOver && e.key === 'r') {
        resetGame();
        return;
    }
    if (e.key in keys) {
        keys[e.key] = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key in keys) {
        keys[e.key] = false;
    }
});

function updatePaddles() {
    // Left paddle
    if (keys.w) leftPaddle.dy = -paddleSpeed;
    else if (keys.s) leftPaddle.dy = paddleSpeed;
    else leftPaddle.dy = 0;

    // Right paddle
    if (keys.ArrowUp) rightPaddle.dy = -paddleSpeed;
    else if (keys.ArrowDown) rightPaddle.dy = paddleSpeed;
    else rightPaddle.dy = 0;

    // Update paddle positions
    leftPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddle.y + leftPaddle.dy));
    rightPaddle.y = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddle.y + rightPaddle.dy));
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0ff';
    ctx.fill();
    ctx.closePath();
}

function drawPaddles() {
    ctx.fillStyle = '#0ff';
    ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
    ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);
}

function drawLives() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#0ff';
    ctx.fillText(`Lives: ${leftPaddle.lives}`, 10, 30);
    ctx.fillText(`Lives: ${rightPaddle.lives}`, canvas.width - 100, 30);
}

function update() {
    if (gameOver) {
        drawGameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePaddles();
    drawBall();
    drawPaddles();
    drawLives();

    // Ball movement and collisions
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }

    if (checkPaddleCollision(leftPaddle) || checkPaddleCollision(rightPaddle)) {
        ball.dx = -ball.dx;
        increaseBallSpeed();
    }

    // Check if ball goes out of bounds
    if (ball.x < 0) {
        leftPaddle.lives--;
        if (leftPaddle.lives === 0) gameOver = true;
        resetBall();
    } else if (ball.x > canvas.width) {
        rightPaddle.lives--;
        if (rightPaddle.lives === 0) gameOver = true;
        resetBall();
    }

    requestAnimationFrame(update);
}

function checkPaddleCollision(paddle) {
    return (
        ball.x - ball.radius < paddle.x + paddleWidth &&
        ball.x + ball.radius > paddle.x &&
        ball.y > paddle.y &&
        ball.y < paddle.y + paddleHeight
    );
}

function increaseBallSpeed() {
    ball.speed *= 1.05;
    ball.dx = Math.sign(ball.dx) * ball.speed;
    ball.dy = Math.sign(ball.dy) * ball.speed;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 5;
    ball.dx = Math.random() > 0.5 ? ball.speed : -ball.speed;
    ball.dy = Math.random() > 0.5 ? ball.speed : -ball.speed;
}

function drawGameOver() {
    ctx.font = '40px Arial';
    ctx.fillStyle = '#0ff';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);
    
    const winner = leftPaddle.lives === 0 ? 'Right' : 'Left';
    ctx.fillText(`${winner} player wins!`, canvas.width / 2, canvas.height / 2 + 20);
    
    ctx.font = '20px Arial';
    ctx.fillText('Press "R" to restart', canvas.width / 2, canvas.height / 2 + 60);
}

function resetGame() {
    leftPaddle.lives = 10;
    rightPaddle.lives = 10;
    leftPaddle.y = canvas.height / 2 - paddleHeight / 2;
    rightPaddle.y = canvas.height / 2 - paddleHeight / 2;
    resetBall();
    gameOver = false;
    update();
}

update();