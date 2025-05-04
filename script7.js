// Filename: ai-level-ui.js

document.addEventListener("DOMContentLoaded", () => {
  applySavedAILevel();
});

function applySavedAILevel() {
  const savedLevel = localStorage.getItem('selectedGameLevel');
  if (savedLevel) updateAIEmoji(savedLevel);
}

function setAILevel(emoji, level) {
  localStorage.setItem('selectedGameLevel', level);
  updateAIEmoji(level);
  document.querySelector('.ai-options').classList.add('hidden');
  console.log("AI Level set to:", level);
}

function updateAIEmoji(level) {
  let emojiPrimary = '🤖', emojiBackup = '💻';
  if (level === 'Medium') {
    emojiPrimary = '🔰'; emojiBackup = '💡';
  } else if (level === 'Hard') {
    emojiPrimary = '⚙️'; emojiBackup = '⛭';
  } else if (level === 'God') {
    emojiPrimary = '👽'; emojiBackup = '★';
  }

  const aiEmoji = document.querySelector('.ai-emoji');
  if (aiEmoji) {
    aiEmoji.querySelector('.emoji.primary').textContent = emojiPrimary;
    aiEmoji.querySelector('.emoji.backup').textContent = emojiBackup;
    aiEmoji.querySelector('.emoji-name').textContent = level;
  }
}