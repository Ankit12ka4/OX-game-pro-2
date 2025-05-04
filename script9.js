// Filename: merged-ox-game.js

let board = [];
let currentPlayer = 'X';
let gameOver = false;
let boardSize = parseInt(localStorage.getItem('selectedBoardSize')) || 3;
let humanScore = 0;
let aiScore = 0;

// Utility Functions
function getAvailableMoves(b) {
  return b.map((cell, i) => cell === '' ? i : null).filter(i => i !== null);
}

function cloneBoard(b) {
  return [...b];
}

function hideAllButtons() {
  document.querySelector(".btn-draw")?.style.setProperty("display", "none");
  document.querySelector(".btn-win")?.style.setProperty("display", "none");
  document.querySelector(".btn-lose")?.style.setProperty("display", "none");
  document.querySelector(".btn-play")?.style.setProperty("display", "none");
  document.querySelector(".btn-try")?.style.setProperty("display", "none");
}

function updateScore(winner) {
  if (winner === 'human') humanScore++;
  else if (winner === 'ai') aiScore++;
  document.querySelector('.human-score').textContent = humanScore;
  document.querySelector('.ai-score').textContent = aiScore;
}

// Emoji Selectors
function toggleAIOptions() {
  document.querySelector('.ai-options').classList.toggle('hidden');
  document.querySelector('.human-options').classList.add('hidden');
}

function toggleHumanOptions() {
  document.querySelector('.human-options').classList.toggle('hidden');
  document.querySelector('.ai-options').classList.add('hidden');
}

function setAILevel(emoji, level) {
  document.querySelector('.ai-emoji').innerHTML =
    `<span class="emoji primary">${emoji}</span><span class="emoji backup"></span><span class="emoji-name">AI</span>`;
  document.querySelector('.ai-options').classList.add('hidden');
  console.log("AI level set to:", level);
}

function setHumanEmoji(emoji) {
  document.querySelector('.human-emoji').innerHTML =
    `<span class="emoji primary">${emoji}</span><span class="emoji backup"></span><span class="emoji-name">Human</span>`;
  document.querySelector('.human-options').classList.add('hidden');
}

// Game Setup
function resetGameBoardOnly() {
  board = Array(boardSize * boardSize).fill('');
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = '';
    cell.classList.remove("winning-cell");
  });
  gameOver = false;
  currentPlayer = 'X';
  document.querySelector(".turn-indicator").textContent = "Your Turn";
  document.querySelector(".game-result").textContent = '';
  hideAllButtons();
}

function createBoard(size) {
  const boardContainer = document.querySelector(".game-board");
  boardContainer.innerHTML = "";
  boardContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  boardContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => {
      if (!gameOver && currentPlayer === 'X') makeMove(i);
    });
    boardContainer.appendChild(cell);
  }

  board = Array(size * size).fill('');
  gameOver = false;
  currentPlayer = 'X';
  document.querySelector(".turn-indicator").textContent = "Your Turn";
}

// Win / Draw Check
function highlightWinningLine(indices) {
  indices.forEach(i => {
    document.querySelector(`.cell[data-index='${i}']`)?.classList.add("winning-cell");
  });
}

function checkWinner(b) {
  const lines = [];
  for (let r = 0; r < boardSize; r++) {
    lines.push([...Array(boardSize).keys()].map(i => r * boardSize + i));
  }
  for (let c = 0; c < boardSize; c++) {
    lines.push([...Array(boardSize).keys()].map(i => i * boardSize + c));
  }
  lines.push([...Array(boardSize).keys()].map(i => i * boardSize + i));
  lines.push([...Array(boardSize).keys()].map(i => i * boardSize + (boardSize - 1 - i)));

  for (let line of lines) {
    const symbols = line.map(i => b[i]);
    if (symbols.every(sym => sym && sym === symbols[0])) {
      return { winner: symbols[0], line };
    }
  }
  return null;
}

function handleWin(winner, line) {
  hideAllButtons();
  highlightWinningLine(line);

  const resultText = winner === 'X' ? 'You Win!' : 'AI Wins!';
  document.querySelector(".turn-indicator").textContent = resultText;
  document.querySelector(".game-result").textContent = resultText;

  if (winner === 'X') {
    updateScore('human');
    document.querySelector(".btn-play").style.display = "inline-block";
  } else {
    updateScore('ai');
    document.querySelector(".btn-try").style.display = "inline-block";
  }

  gameOver = true;
}

function handleDraw() {
  hideAllButtons();
  document.querySelector(".turn-indicator").textContent = "Draw!";
  document.querySelector(".game-result").textContent = "Draw!";
  document.querySelector(".btn-try")?.style.setProperty("display", "inline-block");
  gameOver = true;
}

// Game Play
function makeMove(index) {
  if (gameOver || board[index] !== '') return;
  board[index] = currentPlayer;
  document.querySelector(`.cell[data-index='${index}']`).textContent = currentPlayer;

  const result = checkWinner(board);
  if (result) return handleWin(result.winner, result.line);
  if (!board.includes('')) return handleDraw();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (currentPlayer === 'O') {
    document.querySelector(".turn-indicator").textContent = "AI is thinking...";
    setTimeout(aiMove, 400);
  } else {
    document.querySelector(".turn-indicator").textContent = "Your Turn";
  }
}

// AI Logic
function aiMove() {
  const level = localStorage.getItem('selectedGameLevel') || 'Easy';
  const move = getAIMove(level);
  makeMove(move);
}

function getAIMove(level) {
  const available = getAvailableMoves(board);

  if (level === 'Easy') return randomMove(available);
  if (level === 'Medium') {
    if (Math.random() < 0.4) return randomMove(available);
    return getBlockingMove() ?? randomMove(available);
  }
  if (level === 'Hard') {
    if (Math.random() < 0.10) return randomMove(available);
    return minimaxMove(board, 'O').index;
  }
  if (level === 'God') {
    if (Math.random() < 0.03) return randomMove(available);
    return minimaxMove(board, 'O').index;
  }

  return available[0];
}

function randomMove(avail) {
  return avail[Math.floor(Math.random() * avail.length)];
}

function getBlockingMove() {
  for (let i of getAvailableMoves(board)) {
    const temp = cloneBoard(board);
    temp[i] = 'X';
    if (checkWinner(temp)?.winner === 'X') return i;
  }
  return null;
}

function minimaxMove(newBoard, player) {
  const availSpots = getAvailableMoves(newBoard);
  const result = checkWinner(newBoard);
  if (result) {
    if (result.winner === 'X') return { score: -10 };
    if (result.winner === 'O') return { score: 10 };
  }
  if (availSpots.length === 0) return { score: 0 };

  const moves = availSpots.map(i => {
    const move = { index: i };
    newBoard[i] = player;
    move.score = minimaxMove(newBoard, player === 'O' ? 'X' : 'O').score;
    newBoard[i] = '';
    return move;
  });

  return player === 'O'
    ? moves.reduce((best, m) => (m.score > best.score ? m : best), { score: -Infinity })
    : moves.reduce((best, m) => (m.score < best.score ? m : best), { score: Infinity });
}

// DOM Load
document.addEventListener("DOMContentLoaded", () => {
  boardSize = parseInt(localStorage.getItem('selectedBoardSize')) || 3;
  createBoard(boardSize);
  hideAllButtons();

  document.querySelector(".btn-play").addEventListener("click", resetGameBoardOnly);
  document.querySelector(".btn-try").addEventListener("click", resetGameBoardOnly);
});

// Emoji Fallback
window.onload = function () {
  document.querySelectorAll('.emoji.primary').forEach(function (primaryEmoji) {
    const backupEmoji = primaryEmoji.nextElementSibling;
    if (primaryEmoji.offsetWidth === 0 || primaryEmoji.offsetHeight === 0) {
      backupEmoji.style.display = 'inline';
      primaryEmoji.style.display = 'none';
    }
  });
};