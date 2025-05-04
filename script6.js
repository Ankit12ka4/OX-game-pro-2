// Filename: base-game.js

let board = [];
let currentPlayer = 'X';
let gameOver = false;
const boardSize = parseInt(localStorage.getItem('selectedBoardSize')) || 3;

// Create the board on load
document.addEventListener("DOMContentLoaded", () => {
  createBoard();
});

// Create the grid dynamically
function createBoard() {
  const boardContainer = document.querySelector(".board");
  boardContainer.innerHTML = '';
  boardContainer.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  board = Array(boardSize * boardSize).fill('');

  for (let i = 0; i < board.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    boardContainer.appendChild(cell);
  }
}