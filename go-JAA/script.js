let boardSize = 9; // Tamaño inicial del tablero
const boardElement = document.getElementById("board");
let board = [];
let currentPlayer = "black";
let playerColor = "black";
let aiColor = "white";
let gameStarted = false;
let moveHistory = [];
let level = 1;

document
  .getElementById("startButton")
  .addEventListener("click", startGame);
document
  .getElementById("configButton")
  .addEventListener("click", configureGame);
document.getElementById("passButton").addEventListener("click", passTurn);
document.getElementById("endButton").addEventListener("click", endGame);
document
  .getElementById("rulesButton")
  .addEventListener("click", showRules);
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
  if (board[y][x]) return false;

  // Coloca temporalmente la piedra en el tablero
  board[y][x] = { color: color };

  // Verifica si la piedra tiene libertades
  const liberties = hasLiberties(x, y, color);

  // Revierte el movimiento si no es legal
  board[y][x] = null;

  // Devuelve verdadero si tiene libertades, captura un grupo enemigo, y no viola la regla del ko
  return liberties || (willCapture(x, y, color) && !isKo(x, y, color));
}

function hasLiberties(x, y, color) {
  const visited = new Set();

  function explore(cx, cy) {
    const key = `${cx},${cy}`;
    if (visited.has(key)) return false;
    visited.add(key);

    // Si hay una celda vacía adyacente, la piedra tiene libertades
    if (board[cy] && board[cy][cx] === null) {
      return true;
    }
    // Si hay una piedra del mismo color adyacente, seguir explorando
    else if (board[cy] && board[cy][cx]?.color === color) {
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
  return captureGroups(x, y, opponentColor).length > 0;
}

function makeMove(x, y, color) {
  board[y][x] = { color: color };
  const opponentColor = color === "black" ? "white" : "black";
  const captured = captureGroups(x, y, opponentColor);
  if (captured.length > 0) {
    captured.forEach(([cx, cy]) => {
      board[cy][cx].captured = true;
    });
  }
  moveHistory.push({ x, y, color, boardStr: JSON.stringify(board) });
  renderBoard();
}

function captureGroups(x, y, color) {
  const captured = [];
  const visited = new Set();

  function explore(cx, cy) {
    const key = `${cx},${cy}`;
    if (visited.has(key)) return;
    visited.add(key);

    if (board[cy][cx] && board[cy][cx].color === color) {
      if (!hasLiberties(cx, cy, board, color)) {
        captured.push([cx, cy]);
        explore(cx + 1, cy);
        explore(cx - 1, cy);
        explore(cx, cy + 1);
        explore(cx, cy - 1);
      }
    }
  }

  explore(x, y);

  if (captured.length > 0) {
    captured.forEach(([cx, cy]) => {
      board[cy][cx].captured = true;
    });
  }

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
      if (board[y][x]?.color === "black") {
        blackScore++;
      } else if (board[y][x]?.color === "white") {
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
    } else if (board[cy] && board[cy][cx]?.color === "black") {
      isWhiteTerritory = false;
    } else if (board[cy] && board[cy][cx]?.color === "white") {
      isBlackTerritory = false;
    }
  }

  explore(x, y);
  if (isBlackTerritory) return "black";
  if (isWhiteTerritory) return "white";
  return null;
}

function copyBoard(board) {
  return board.map((row) =>
    row.map((cell) => (cell ? { ...cell } : null))
  );
}

function showRules() {
  document.getElementById("rulesPopup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closeRules() {
  document.getElementById("rulesPopup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}