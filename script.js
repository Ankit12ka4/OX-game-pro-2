document.addEventListener("DOMContentLoaded", function () {
  // Redirect function
  const redirectPage = (targetPage) => {
    window.location.href = targetPage;
  };

  // Board Size Buttons — selected class allowed
  const boardButtons = document.querySelectorAll('.board-size');
  boardButtons.forEach(button => {
    button.addEventListener("click", function () {
      const boardSize = button.textContent.trim();
      localStorage.setItem("boardSize", boardSize);

      // Selected class only here
      boardButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
    });
  });

  // Game Mode Buttons — no selected class
  document.querySelectorAll(".play1, .play2, .play3").forEach(button => {
    button.addEventListener("click", function () {
      const gameMode = button.textContent.trim();
      localStorage.setItem("gameMode", gameMode);

      if (gameMode === "👤 VS 🤖" || gameMode === "👤 VS 👤") {
        redirectPage("game.html");
      } else if (gameMode === "Online Play") {
        redirectPage("online.html");
      }
    });
  });

  // Difficulty Buttons — no selected class
  document.querySelectorAll(".play1, .play2, .play3, .play4").forEach(button => {
    button.addEventListener("click", function () {
      const levelText = button.textContent.trim().toLowerCase();
      let levelValue = "";

      if (levelText.includes("easy")) levelValue = "easy";
      else if (levelText.includes("medium")) levelValue = "medium";
      else if (levelText.includes("hard")) levelValue = "hard";
      else if (levelText.includes("god")) levelValue = "God";

      if (levelValue) localStorage.setItem("level", levelValue);
    });
  });

  // Load saved selection only for board size buttons
  const savedBoard = localStorage.getItem("selectedBoardSize");
  if (savedBoard) {
    const selectedBtn = Array.from(boardButtons).find(btn => btn.textContent.trim() === savedBoard);
    if (selectedBtn) selectedBtn.classList.add("selected");
  }
});