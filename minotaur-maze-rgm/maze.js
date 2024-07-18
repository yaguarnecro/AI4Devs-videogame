const canvas = document.getElementById('maze-canvas');
const ctx = canvas.getContext('2d');
const cellSize = 20;
const rows = Math.floor(canvas.height / cellSize);
const cols = Math.floor(canvas.width / cellSize);
const player = { x: 0, y: 0 };
const minotaur = { x: cols - 2, y: rows - 1 }; // Place minotaur in a valid position
const exit = { x: cols - 1, y: rows - 1 };
let maze = generateMaze(cols, rows);
let gameOver = false;

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

    // Ensure the exit and minotaur positions are not walls
    maze[rows - 1][cols - 1] = 0; // Exit
    maze[rows - 1][cols - 2] = 0; // Ensure path to exit
    maze[rows - 2][cols - 1] = 0; // Ensure path to exit

    // Ensure right and bottom borders are not completely walled off
    for (let y = 0; y < rows; y++) {
        if (maze[y][cols - 2] === 0) {
            maze[y][cols - 1] = 0;
        }
    }
    for (let x = 0; x < cols; x++) {
        if (maze[rows - 2][x] === 0) {
            maze[rows - 1][x] = 0;
        }
    }

    console.log(maze);
    return maze;
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
    } else {
        // Change direction randomly if it hits a wall
        const directions = [
            [0, -1], [1, 0], [0, 1], [-1, 0]
        ].sort(() => Math.random() - 0.5);
        for (const [dx, dy] of directions) {
            const nx = minotaur.x + dx, ny = minotaur.y + dy;
            if (nx >= 0 && ny >= 0 && nx < cols && ny < rows && maze[ny][nx] === 0) {
                minotaurDirection = [dx, dy];
                minotaur.x = nx;
                minotaur.y = ny;
                break;
            }
        }
    }

    if (minotaur.x === player.x && minotaur.y === player.y) {
        alert('You lose!');
        gameOver = true;
    }
}

setInterval(() => {
    if (!gameOver) {
        moveMinotaur();
        drawMaze();
    }
}, 500); // Move minotaur every 500ms

drawMaze();