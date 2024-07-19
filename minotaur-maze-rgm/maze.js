const canvas = document.getElementById('maze-canvas');
const ctx = canvas.getContext('2d');
const cellSize = 20;
const rows = Math.floor(canvas.height / cellSize);
const cols = Math.floor(canvas.width / cellSize);
const player = { x: 0, y: 0 };
const exit = { x: cols - 1, y: rows - 1 };
let maze = generateMaze(cols, rows);
let minotaur = findRandomMiddlePathPosition(maze);
let gameOver = false;
let minotaurSpeed = 500; // Initial speed in milliseconds
let speedIncreaseCount = 0; // Number of speed increases

document.addEventListener('keydown', movePlayer);

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
    ctx.fillRect(minotaur.x * cellSize, minotaur.y * cellSize, cellSize, cellSize);
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
        alert('You win!');
        gameOver = true;
    }
    drawMaze();
}

let minotaurDirection = [0, -1]; // Initial direction (up)

function moveMinotaur() {
    const [dx, dy] = minotaurDirection;
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
            minotaurDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
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
                minotaurDirection = [newDx, newDy];
                minotaur.x = nx;
                minotaur.y = ny;
                moved = true;
                break;
            }
        }

        // If no other option is possible, go back to the previous position
        if (!moved) {
            minotaurDirection = [-dx, -dy];
            minotaur.x += minotaurDirection[0];
            minotaur.y += minotaurDirection[1];
        }
    }

    if (minotaur.x === player.x && minotaur.y === player.y) {
        alert('You lose!');
        gameOver = true;
    }
}

function increaseMinotaurSpeed() {
    if (speedIncreaseCount < 4) {
        minotaurSpeed -= 120; // Decrease interval by 100ms
        speedIncreaseCount++;
        clearInterval(minotaurInterval);
        minotaurInterval = setInterval(() => {
            if (!gameOver) {
                moveMinotaur();
                drawMaze();
            }
        }, minotaurSpeed);
    }
}

let minotaurInterval = setInterval(() => {
    if (!gameOver) {
        moveMinotaur();
        drawMaze();
    }
}, minotaurSpeed); // Move minotaur at initial speed

// Increase minotaur speed every 30 seconds, up to 4 times
let speedIncreaseInterval = setInterval(() => {
    increaseMinotaurSpeed();
    if (speedIncreaseCount >= 4) {
        clearInterval(speedIncreaseInterval);
    }
}, 30000); // 30 seconds

drawMaze();