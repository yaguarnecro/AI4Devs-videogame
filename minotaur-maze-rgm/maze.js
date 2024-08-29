
const canvas = document.getElementById('maze-canvas');
const ctx = canvas.getContext('2d');
let cellSize = 20;
let rows, cols;
const player = { x: 0, y: 0 };
let exit;
let maze;
let minotaurs = [];
let gameOver = false;
let minotaurSpeed = 500; // Initial speed in milliseconds
let speedIncreaseCount = 0; // Number of speed increases
let minotaurInterval;
let speedIncreaseInterval;
let minotaurSpawnInterval;

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('instructions-button').addEventListener('click', () => {
    window.location.href = 'instructions.html';
});

document.getElementById('language-select').addEventListener('change', (event) => {
    const language = event.target.value;
    if (language === 'es') {
        translateToSpanish();
    } else {
        translateToEnglish();
    }
});

function translateToSpanish() {
    document.getElementById('instructions-button').textContent = 'Instrucciones';
    document.getElementById('start-button').textContent = 'INICIAR';
    document.querySelector('label[for="cols"]').textContent = 'Columnas:';
    document.querySelector('label[for="rows"]').textContent = 'Filas:';
    document.querySelector('label[for="minotaurs"]').textContent = 'Número de Minotauros:';
    document.querySelector('label[for="spawn-interval"]').textContent = 'Intervalo de Aparición (segundos):';
    document.querySelector('#config-screen h1').textContent = 'Configuración del Laberinto de Minotauros';
}

function translateToEnglish() {
    document.getElementById('instructions-button').textContent = 'Instructions';
    document.getElementById('start-button').textContent = 'START';
    document.querySelector('label[for="cols"]').textContent = 'Columns:';
    document.querySelector('label[for="rows"]').textContent = 'Rows:';
    document.querySelector('label[for="minotaurs"]').textContent = 'Number of Minotaurs:';
    document.querySelector('label[for="spawn-interval"]').textContent = 'Spawn Interval (seconds):';
    document.querySelector('#config-screen h1').textContent = 'Minotaur Maze Configuration';
}

function startGame() {
    // Request fullscreen mode
    const gameContainer = document.getElementById('game-container');
    if (gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen();
    } else if (gameContainer.mozRequestFullScreen) { // Firefox
        gameContainer.mozRequestFullScreen();
    } else if (gameContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
        gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) { // IE/Edge
        gameContainer.msRequestFullscreen();
    } else if (gameContainer.webkitEnterFullscreen) { // iOS Safari
        gameContainer.webkitEnterFullscreen();
    }

    // Add fullscreen class to game container and mobile controls
    gameContainer.classList.add('fullscreen');
    const mobileControls = document.getElementById('mobile-controls');
    mobileControls.classList.add('fullscreen');

    // Show mobile controls
    mobileControls.style.display = 'flex';

    // Reset player position
    player.x = 0;
    player.y = 0;

    // Get configuration values and ensure they're odd numbers
    cols = parseInt(document.getElementById('cols').value);
    rows = parseInt(document.getElementById('rows').value);
    cols = cols % 2 === 0 ? cols + 1 : cols;
    rows = rows % 2 === 0 ? rows + 1 : rows;
    const numMinotaurs = parseInt(document.getElementById('minotaurs').value);
    const spawnInterval = parseInt(document.getElementById('spawn-interval').value) * 1000;

    // Adjust canvas size based on the window size
    adjustCanvasSize();

    // Initialize game elements
    exit = { x: cols - 1, y: rows - 1 };
    maze = generateMaze(cols, rows);
    minotaurs = [createMinotaur()];
    gameOver = false; // Reset gameOver flag
    minotaurSpeed = 500;
    speedIncreaseCount = 0;

    // Hide config screen and show game screen
    document.getElementById('config-screen').style.display = 'none';
    canvas.style.display = 'block';
    checkOrientation();

    // Add event listener for player movement
    document.addEventListener('keydown', movePlayer);

    // Add event listeners for mobile controls
    let intervalId;
    const startMovement = (direction) => {
        movePlayer({ key: direction });
        intervalId = setInterval(() => movePlayer({ key: direction }), 100);
    };

    const stopMovement = () => {
        clearInterval(intervalId);
    };

    document.getElementById('up-button').addEventListener('mousedown', (e) => {
        e.preventDefault();
        startMovement('ArrowUp');
    });
    document.getElementById('up-button').addEventListener('mouseup', stopMovement);
    document.getElementById('up-button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        startMovement('ArrowUp');
    });
    document.getElementById('up-button').addEventListener('touchend', stopMovement);

    document.getElementById('down-button').addEventListener('mousedown', (e) => {
        e.preventDefault();
        startMovement('ArrowDown');
    });
    document.getElementById('down-button').addEventListener('mouseup', stopMovement);
    document.getElementById('down-button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        startMovement('ArrowDown');
    });
    document.getElementById('down-button').addEventListener('touchend', stopMovement);

    document.getElementById('left-button').addEventListener('mousedown', (e) => {
        e.preventDefault();
        startMovement('ArrowLeft');
    });
    document.getElementById('left-button').addEventListener('mouseup', stopMovement);
    document.getElementById('left-button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        startMovement('ArrowLeft');
    });
    document.getElementById('left-button').addEventListener('touchend', stopMovement);

    document.getElementById('right-button').addEventListener('mousedown', (e) => {
        e.preventDefault();
        startMovement('ArrowRight');
    });
    document.getElementById('right-button').addEventListener('mouseup', stopMovement);
    document.getElementById('right-button').addEventListener('touchstart', (e) => {
        e.preventDefault();
        startMovement('ArrowRight');
    });
    document.getElementById('right-button').addEventListener('touchend', stopMovement);

    // Start game intervals
    minotaurInterval = setInterval(() => {
        if (!gameOver) {
            minotaurs.forEach(moveMinotaur);
            drawMaze();
        }
    }, minotaurSpeed);

    speedIncreaseInterval = setInterval(() => {
        increaseMinotaurSpeed();
        if (speedIncreaseCount >= 4) {
            clearInterval(speedIncreaseInterval);
        }
    }, 30000); // 30 seconds

    minotaurSpawnInterval = setInterval(() => {
        if (!gameOver && minotaurs.length < numMinotaurs) {
            minotaurs.push(createMinotaur());
        }
        if (minotaurs.length >= numMinotaurs) {
            clearInterval(minotaurSpawnInterval);
        }
    }, spawnInterval);

    drawMaze();

    // Add event listener for fullscreen change
    document.addEventListener('fullscreenchange', handleFullscreenChange);
}

function handleFullscreenChange() {
    if (!document.fullscreenElement) {
        window.location.reload();
    }
}

function adjustCanvasSize() {
    const maxWidth = window.innerWidth * 0.8;
    const maxHeight = window.innerHeight * 0.8;
    const cellWidth = Math.floor(maxWidth / cols);
    const cellHeight = Math.floor(maxHeight / rows);
    cellSize = Math.min(cellWidth, cellHeight);

    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;
}

window.addEventListener('resize', () => {
    if (canvas.style.display === 'block') {
        adjustCanvasSize();
        drawMaze();
        checkOrientation();
    }
});

function generateMaze(cols, rows) {
    // Initialize maze with walls
    let maze = Array.from({ length: rows }, () => Array(cols).fill(1));
    // Carve out a maze using recursive backtracking
    function carve(x, y) {
        const directions = [
            [0, -1], [1, 0], [0, 1], [-1, 0]
        ].sort(() => Math.random() - 0.5);
        maze[y][x] = 0;
        for (const [dx, dy] of directions) {
            const nx = x + dx * 2, ny = y + dy * 2;
            if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && maze[ny][nx] === 1) {
                maze[y + dy][x + dx] = 0;
                carve(nx, ny);
            }
        }
    }
    carve(0, 0);

    console.log(maze);
    return maze;
}

function findRandomMiddlePathPosition(maze) {
    const middleRow = Math.floor(rows / 2);
    const middleCol = Math.floor(cols / 2);
    const regionSize = Math.floor(Math.min(rows, cols) / 2); // Define the region size as half of the smaller dimension

    const startRow = Math.max(0, middleRow - Math.floor(regionSize / 2));
    const endRow = Math.min(rows - 1, middleRow + Math.floor(regionSize / 2));
    const startCol = Math.max(0, middleCol - Math.floor(regionSize / 2));
    const endCol = Math.min(cols - 1, middleCol + Math.floor(regionSize / 2));

    const pathPositions = [];

    for (let y = startRow; y <= endRow; y++) {
        for (let x = startCol; x <= endCol; x++) {
            if (maze[y][x] === 0) {
                pathPositions.push({ x, y });
            }
        }
    }

    // Randomly select a path position from the list
    return pathPositions[Math.floor(Math.random() * pathPositions.length)];
}

function createMinotaur() {
    let position;
    do {
        position = findRandomMiddlePathPosition(maze);
    } while (Math.abs(position.x - player.x) < 5 && Math.abs(position.y - player.y) < 5);
    return { ...position, direction: [0, -1] }; // Initial direction (up)
}

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = '#fff'; // Change wall color to white
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
    ctx.fillStyle = 'green';
    ctx.fillRect(exit.x * cellSize, exit.y * cellSize, cellSize, cellSize);
    ctx.fillStyle = 'purple';
    ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
    ctx.fillStyle = 'red';
    minotaurs.forEach(minotaur => {
        ctx.fillRect(minotaur.x * cellSize, minotaur.y * cellSize, cellSize, cellSize);
    });
}

function movePlayer(event) {
    if (gameOver) return;
    const { x, y } = player;
    switch (event.key) {
        case 'ArrowUp': if (y > 0 && maze[y - 1][x] === 0) player.y--; break;
        case 'ArrowDown': if (y < rows - 1 && maze[y + 1][x] === 0) player.y++; break;
        case 'ArrowLeft': if (x > 0 && maze[y][x - 1] === 0) player.x--; break;
        case 'ArrowRight': if (x < cols - 1 && maze[y][x + 1] === 0) player.x++; break;
    }
    if (player.x === exit.x && player.y === exit.y) {
        endGame('You win!');
        return;
    }
    // Check for collision with minotaurs after player moves
    for (const minotaur of minotaurs) {
        if (minotaur.x === player.x && minotaur.y === player.y) {
            console.log('Collision detected');
            gameOverAlert();
            return;
        }
    }
    drawMaze();
}

function resetGame() {
    // Reset game state
    gameOver = true;
    clearInterval(minotaurInterval);
    clearInterval(speedIncreaseInterval);
    clearInterval(minotaurSpawnInterval);
    document.removeEventListener('keydown', movePlayer);

    // Reset player position
    player.x = 0;
    player.y = 0;

    // Remove fullscreen class from game container and mobile controls
    const gameContainer = document.getElementById('game-container');
    gameContainer.classList.remove('fullscreen');
    const mobileControls = document.getElementById('mobile-controls');
    mobileControls.classList.remove('fullscreen');
    mobileControls.style.display = 'none'; // Ensure mobile controls are hidden

    // Show config screen and hide game screen
    document.getElementById('config-screen').style.display = 'flex';
    canvas.style.display = 'none';
}

function moveMinotaur(minotaur) {
    const [dx, dy] = minotaur.direction;
    const nx = minotaur.x + dx, ny = minotaur.y + dy;

    if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && maze[ny][nx] === 0) {
        minotaur.x = nx;
        minotaur.y = ny;

        // Check for intersections
        const possibleDirections = [];
        if (ny > 0 && maze[ny - 1][nx] === 0 && dy !== 1) possibleDirections.push([0, -1]); // Up
        if (ny < rows - 1 && maze[ny + 1][nx] === 0 && dy !== -1) possibleDirections.push([0, 1]); // Down
        if (nx > 0 && maze[ny][nx - 1] === 0 && dx !== 1) possibleDirections.push([-1, 0]); // Left
        if (nx < cols - 1 && maze[ny][nx + 1] === 0 && dx !== -1) possibleDirections.push([1, 0]); // Right

        if (possibleDirections.length > 1) {
            // Randomly choose a new direction at intersections
            minotaur.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
        }
    } else {
        // Change direction randomly if it hits a wall, excluding the direction it came from
        const directions = [
            [0, -1], [1, 0], [0, 1], [-1, 0]
        ].filter(([newDx, newDy]) => !(newDx === -dx && newDy === -dy)) // Exclude the opposite direction
        .sort(() => Math.random() - 0.5);

        let moved = false;
        for (const [newDx, newDy] of directions) {
            const nx = minotaur.x + newDx, ny = minotaur.y + newDy;
            if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && maze[ny][nx] === 0) {
                minotaur.direction = [newDx, newDy];
                minotaur.x = nx;
                minotaur.y = ny;
                moved = true;
                break;
            }
        }

        // If no other option is possible, or with a 10% chance, go back to the previous position
        if (!moved || Math.random() < 0.1) {
            const bx = minotaur.x - dx, by = minotaur.y - dy;
            if (bx >= 0 && by >= 0 && bx < cols && by < rows && maze[by][bx] === 0) {
                minotaur.direction = [-dx, -dy];
                minotaur.x = bx;
                minotaur.y = by;
            }
        }
    }

    if (minotaur.x === player.x && minotaur.y === player.y) {
        console.log('Collision detected');
        gameOverAlert();
    }
}

function increaseMinotaurSpeed() {
    if (speedIncreaseCount < 4) {
        minotaurSpeed -= 100; // Decrease interval by 100ms
        speedIncreaseCount++;
        clearInterval(minotaurInterval);
        minotaurInterval = setInterval(() => {
            if (!gameOver) {
                minotaurs.forEach(moveMinotaur);
                drawMaze();
            }
        }, minotaurSpeed);
    }
}

function gameOverAlert() {
    console.log('Game Over Alert triggered');
    endGame('You lose!');
}

function checkOrientation() {
    const mobileControls = document.getElementById('mobile-controls');
    if (window.innerWidth > window.innerHeight) {
        mobileControls.style.display = 'flex';
    } else {
        mobileControls.style.display = 'none';
    }
}

window.addEventListener('resize', checkOrientation);

function endGame(message) {
    document.getElementById('mobile-controls').style.display = 'none';
    gameOver = true; // Ensure gameOver is set to true
    alert(message);

    // Clear all intervals
    clearInterval(minotaurInterval);
    clearInterval(speedIncreaseInterval);
    clearInterval(minotaurSpawnInterval);

    // Remove event listeners
    document.removeEventListener('keydown', movePlayer);
    document.removeEventListener('fullscreenchange', handleFullscreenChange);

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 100);
}

function setDefaultLanguage() {
    const languageSelect = document.getElementById('language-select');
    languageSelect.value = 'es';
    translateToSpanish();
}