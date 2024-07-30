const cells = document.querySelectorAll(".table__cell");
const restartButton = document.querySelector(".bnt-restart");
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function showMessage(message, duration) {
  const messageElement = document.querySelector(".message");
  messageElement.innerHTML = message;
  messageElement.style.display = "block";
  setTimeout(() => {
    messageElement.style.display = "none";
    messageElement.innerHTML = "";
  }, duration);
}
function checkWin() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].dataset.player === currentPlayer &&
      cells[a].dataset.player === cells[b].dataset.player &&
      cells[a].dataset.player === cells[c].dataset.player
    ) {
      showMessage(`${currentPlayer} WIN!`, 3000);
      gameActive = false;
      return true;
    }
  }
  const allFilled = Array.from(cells).every((cell) => cell.dataset.player);
  if (allFilled) {
    showMessage("DRAW!", 3000);
    gameActive = false;
    return true;
  }
  return false;
}

function resetBoard() {
  // Сброс доски
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundImage = "";
    delete cell.dataset.player;
  });
  currentPlayer = "X";
  gameActive = true;
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!cell.dataset.player && gameActive) {
      cell.dataset.player = currentPlayer;
      cell.style.backgroundImage = `url(img/icons/${
        currentPlayer === "X" ? "icon0.svg" : "icon1.svg"
      })`;
      cell.style.backgroundSize = "contain";
      cell.style.backgroundRepeat = "no-repeat";
      cell.style.backgroundPosition = "center";
      if (!checkWin()) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  });
});

restartButton.addEventListener("click", resetBoard);
