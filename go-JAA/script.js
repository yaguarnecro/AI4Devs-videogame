let boardSize = 9; // Tamaño inicial del tablero
const boardElement = document.getElementById("board");
let board = [];
let currentPlayer = "black";
let playerColor = "black";
let aiColor = "white";
let gameStarted = false;
let moveHistory = [];
let level = 1;

document.getElementById("startButton").addEventListener("click", startGame);
document
  .getElementById("configButton")
  .addEventListener("click", configureGame);
document.getElementById("passButton").addEventListener("click", passTurn);
document.getElementById("endButton").addEventListener("click", endGame);
document.getElementById("rulesButton").addEventListener("click", showRules);
document
  .getElementById("closeRulesButton")
  .addEventListener("click", closeRules);

function startGame() {
  resetBoard();
  renderBoard();
  gameStarted = true;
  document.getElementById("passButton").disabled = false;
  document.getElementById("endButton").disabled = false;
  document.getElementById("startButton").disabled = true;
  document.getElementById("configButton").disabled = true;
  document.getElementById("score").textContent = "";
  document.getElementById("level").textContent = `Nivel: ${level}`;
}

function configureGame() {
  const newSize = prompt(
    "Ingrese el tamaño del tablero (entre 5 y 19):",
    boardSize
  );
  if (newSize >= 5 && newSize <= 19) {
    boardSize = parseInt(newSize);
    startGame();
  } else {
    alert("Tamaño no válido. Intente nuevamente.");
  }
}

function resetBoard() {
  board = Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(null));
  moveHistory = [];
  currentPlayer = playerColor; // El jugador comienza primero
}

function renderBoard() {
  boardElement.innerHTML = "";
  boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 40px)`;
  boardElement.style.gridTemplateRows = `repeat(${boardSize}, 40px)`;

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.x = x;
      cell.dataset.y = y;

      if (board[y][x]) {
        const stone = document.createElement("div");
        stone.className = `stone ${board[y][x].color}`;
        cell.appendChild(stone);

        if (board[y][x].captured) {
          const capturedMark = document.createElement("div");
          capturedMark.className = "captured";
          capturedMark.textContent = "X";
          cell.appendChild(capturedMark);
          markDeadStone(x, y);
        }
      }

      cell.addEventListener("click", onCellClick);
      boardElement.appendChild(cell);
    }
  }
}

function onCellClick(event) {
  if (!gameStarted) return;

  const x = parseInt(event.target.dataset.x);
  const y = parseInt(event.target.dataset.y);

  if (!(y || x)) return;

  if (!board[y][x] && currentPlayer === playerColor) {
    if (isLegalMove(x, y, playerColor)) {
      makeMove(x, y, playerColor);
      currentPlayer = aiColor;
      setTimeout(aiMove, 500);
    }
  }
}

function isLegalMove(x, y, color) {
  // Asegurarse de que la celda esté vacía
  const tempBoard = copyBoard(board);
  if (tempBoard[y][x]) return false;

  // Coloca temporalmente la piedra en el tablero
  tempBoard[y][x] = { color: color };

  if (!hasLiberties(x, y, tempBoard, color) && !willCapture(x, y, color)) {
    return false; // Suicidio
  }

  if (isKo(x, y, color)) {
    return false; // Regla de Ko
  }

  return true;
}

function hasLiberties(x, y, tempBoard, color) {
  const visited = new Set();

  function explore(cx, cy) {
    const key = `${cx},${cy}`;
    if (visited.has(key)) return false;
    visited.add(key);

    // Si hay una celda vacía adyacente, la piedra tiene libertades
    if (tempBoard[cy] && tempBoard[cy][cx] === null) {
      return true;
    }
    // Si hay una piedra del mismo color adyacente, seguir explorando
    else if (tempBoard[cy] && tempBoard[cy][cx]?.color === color) {
      return (
        explore(cx + 1, cy) ||
        explore(cx - 1, cy) ||
        explore(cx, cy + 1) ||
        explore(cx, cy - 1)
      );
    }
    return false;
  }

  return explore(x, y);
}

function isKo(x, y, color) {
  const tempBoard = copyBoard(board);
  tempBoard[y][x] = { color: color };
  const tempBoardStr = JSON.stringify(tempBoard);

  if (
    moveHistory.length > 0 &&
    moveHistory[moveHistory.length - 1].boardStr === tempBoardStr
  ) {
    return true;
  }
  return false;
}

function willCapture(x, y, color) {
  const opponentColor = color === "black" ? "white" : "black";
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  return directions.some(([dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    if (board[ny] && board[ny][nx] === opponentColor) {
      const tempBoard = copyBoard(board);
      tempBoard[y][x] = color;
      return !hasLiberties(nx, ny, tempBoard, opponentColor);
    }
    return false;
  });
}

function makeMove(x, y, color) {
  board[y][x] = { color: color };
  const opponentColor = color === "black" ? "white" : "black";
  const captured = captureGroups(x, y, opponentColor);
  if (captured > 0) {
    console.log(captured);
  }
  moveHistory.push({ x, y, color, boardStr: JSON.stringify(board) });
  renderBoard();
}

function captureGroups(x, y, color) {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let capturedStones = 0;

  directions.forEach(([dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    if (board[ny] && board[ny][nx]?.color === color && !board[ny][nx]?.captured) {
      if (!hasLiberties(nx, ny, board, color)) {
        capturedStones += removeGroup(nx, ny, color);
      }
    }
  });

  return capturedStones;
}

function removeGroup(x, y, color) {
  const visited = new Set();
  let captured = 0;

  function explore(cx, cy) {
    const key = `${cx},${cy}`;
    if (visited.has(key)) return;
    visited.add(key);

    if (board[cy] && board[cy][cx]?.color === color && !board[cy][cx]?.captured) {
      board[cy][cx].captured = true;
      captured++;
      explore(cx + 1, cy);
      explore(cx - 1, cy);
      explore(cx, cy + 1);
      explore(cx, cy - 1);
    }
  }

  explore(x, y);
  return captured;
}

function passTurn() {
  currentPlayer = currentPlayer === "black" ? "white" : "black";

  if (moveHistory.length > 1) {
    const lastMove = moveHistory[moveHistory.length - 1];
    const secondLastMove = moveHistory[moveHistory.length - 2];
    if (
      lastMove.color !== currentPlayer &&
      secondLastMove.color !== currentPlayer
    ) {
      endGame();
    }
  }

  if (currentPlayer === aiColor) {
    setTimeout(aiMove, 500);
  }
}

function aiMove() {
  const emptyCells = [];
  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      if (!board[y][x] && isLegalMove(x, y, aiColor)) {
        emptyCells.push({ x, y });
      }
    }
  }

  if (emptyCells.length > 0) {
    let move;
    if (level === 1) {
      move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    } else {
      move = findBestMove(emptyCells);
    }
    makeMove(move.x, move.y, aiColor);
    currentPlayer = playerColor;
    renderBoard();
  }
}

function findBestMove(moves) {
  let bestMove = moves[0];
  let maxCaptures = -1;

  moves.forEach((move) => {
    const tempBoard = copyBoard(board);
    tempBoard[move.y][move.x] = { color: aiColor };
    const captures = captureGroups(move.x, move.y, playerColor).length;
    if (captures > maxCaptures) {
      maxCaptures = captures;
      bestMove = move;
    }
  });

  return bestMove;
}

function endGame() {
  gameStarted = false;
  document.getElementById("passButton").disabled = true;
  document.getElementById("endButton").disabled = true;
  document.getElementById("startButton").disabled = false;
  document.getElementById("configButton").disabled = false;

  const score = calculateScore();
  document.getElementById(
    "score"
  ).textContent = `Puntuación - Negro: ${score.black}, Blanco: ${score.white}. ${score.winner} gana!`;

  // Si el jugador gana, subir de nivel
  if (score.winner === "Negro") {
    if (level < 10) {
      level++;
    }
  } else if (score.winner === "Blanco") {
    if (level > 1) {
      level--;
    }
  }
}

function calculateScore() {
  let blackScore = 0;
  let whiteScore = 0;

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      if (board[y][x]?.color === "black" && !board[y][x]?.captured) {
        blackScore++;
      } else if (board[y][x]?.color === "white" && !board[y][x]?.captured) {
        whiteScore++;
      } else if (board[y][x] === null) {
        const territoryOwner = determineTerritory(x, y);
        if (territoryOwner === "black") blackScore++;
        if (territoryOwner === "white") whiteScore++;
      }
    }
  }

  const winner = blackScore > whiteScore ? "Negro" : "Blanco";
  return { black: blackScore, white: whiteScore, winner };
}

function determineTerritory(x, y) {
  const visited = new Set();
  let isBlackTerritory = true;
  let isWhiteTerritory = true;

  function explore(cx, cy) {
    const key = `${cx},${cy}`;
    if (visited.has(key)) return;
    visited.add(key);

    if (board[cy] && board[cy][cx] === null) {
      explore(cx + 1, cy);
      explore(cx - 1, cy);
      explore(cx, cy + 1);
      explore(cx, cy - 1);
    } else if (board[cy] && board[cy][cx]?.color === "black" && !board[y][x]?.captured) {
      isWhiteTerritory = false;
    } else if (board[cy] && board[cy][cx]?.color === "white" && !board[y][x]?.captured) {
      isBlackTerritory = false;
    } else if (board[cy] && board[cy][cx]?.color === "white" && board[y][x]?.captured) {
      isBlackTerritory = true;
    } else if (board[cy] && board[cy][cx]?.color === "black" && board[y][x]?.captured) {
      isWhiteTerritory = true;      
    }
  }

  explore(x, y);
  if (isBlackTerritory) return "black";
  if (isWhiteTerritory) return "white";
  return null;
}

function copyBoard(board) {
  return board.map((row) => row.map((cell) => (cell ? { ...cell } : null)));
}

function showRules() {
  document.getElementById("rulesPopup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closeRules() {
  document.getElementById("rulesPopup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function markDeadStone(x, y) {
  const stone = document.querySelector(`.stone[data-x="${x}"][data-y="${y}"]`);
  if (stone) {
    stone.classList.add("dead");
  }
}
