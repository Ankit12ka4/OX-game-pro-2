document.addEventListener("DOMContentLoaded", function () {
  // Fetch the saved board size from localStorage
  const boardSize = localStorage.getItem("boardSize");

  // Check if a board size is selected
  if (boardSize) {
    // Update the UI to reflect the selected board size (example)
    const boardElement = document.querySelector('.board-size');
    if (boardElement) {
      boardElement.textContent = boardSize;  // Set the selected board size as text
    }

    // Add logic to adjust the board layout based on the board size
    // For example, change grid dimensions, or the number of rows/columns
    adjustBoardLayout(boardSize);  // Call function to adjust layout
  }
});

// Example function to adjust the board layout based on the selected size
function adjustBoardLayout(boardSize) {
  const board = document.querySelector('.game-board');
  
  if (boardSize === 'Small') {
    // Adjust for small size (example: 3x3 grid)
    board.style.gridTemplateColumns = 'repeat(3, 1fr)';
    board.style.gridTemplateRows = 'repeat(3, 1fr)';
  } else if (boardSize === 'Medium') {
    // Adjust for medium size (example: 5x5 grid)
    board.style.gridTemplateColumns = 'repeat(4, 1fr)';
    board.style.gridTemplateRows = 'repeat(4, 1fr)';
  } else if (boardSize === 'Large') {
    // Adjust for large size (example: 7x7 grid)
    board.style.gridTemplateColumns = 'repeat(5, 1fr)';
    board.style.gridTemplateRows = 'repeat(5, 1fr)';
  }
}