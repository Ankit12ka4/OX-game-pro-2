// Handle selection and save to local storage
function handleSelection(buttons, storageKey, applyClass = true) {
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (applyClass) {
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
      }
      localStorage.setItem(storageKey, button.textContent.trim());
    });
  });
}

// Load saved selection only for buttons where class is needed
function loadSavedSelection(buttons, storageKey) {
  const savedValue = localStorage.getItem(storageKey);
  if (savedValue) {
    const selectedButton = Array.from(buttons).find(btn => btn.textContent.trim() === savedValue);
    if (selectedButton) {
      selectedButton.classList.add('selected');
    }
  }
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Board Size Buttons - UI पर selected class दिखेगी
  const boardButtons = document.querySelectorAll('.board-size');
  handleSelection(boardButtons, 'selectedBoardSize', true);
  loadSavedSelection(boardButtons, 'selectedBoardSize');

  // Game Level Buttons - सिर्फ value सेव होगी, class नहीं लगेगी
  const levelButtons = document.querySelectorAll('.level1, .level2, .level3, .level4');
  handleSelection(levelButtons, 'selectedGameLevel', false);
  // कोई class apply नहीं करनी, इसलिए loadSavedSelection call नहीं कर रहे

  // Game Mode Buttons - सिर्फ value सेव होगी
  const modeButtons = document.querySelectorAll('.mode-btn');
  handleSelection(modeButtons, 'selectedGameMode', false);
  // यहाँ भी UI class नहीं लग रही
});