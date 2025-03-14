const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setMark = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }

    return false;
  };

  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, setMark, reset };
})();

const DisplayController = (() => {
  const startScreen = document.getElementById("start-screen");
  const gameScreen = document.getElementById("game-screen");
  const statusMessage = document.getElementById("status-message");
  const cells = document.querySelectorAll(".cell");
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const player1Input = document.getElementById("player1");
  const player2Input = document.getElementById("player2");

  const init = () => {
    startButton.addEventListener("click", handleStartGame);
    restartButton.addEventListener("click", handleRestartGame);
    cells.forEach((cell) => {
      cell.addEventListener("click", handleCellClick);
    });
  };

  const handleStartGame = () => {
    const player1Name = player1Input.value.trim() || "Player 1";
    const player2Name = player2Input.value.trim() || "Player 2";
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    GameController.init(player1Name, player2Name);
  };

  const handleRestartGame = () => {
    GameController.init(
      player1Input.value.trim() || "Player 1",
      player2Input.value.trim() || "Player 2"
    );
  };

  const handleCellClick = (e) => {
    const index = e.target.dataset.index;
    GameController.playTurn(parseInt(index));
  };

  const updateBoard = () => {
    const board = Gameboard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
      cell.className = "cell";
      if (board[index] === "X") {
        cell.classList.add("x");
      } else if (board[index] === "O") {
        cell.classList.add("o");
      }
    });
  };

  const setMessage = (message) => {
    statusMessage.textContent = message;
  };

  return { init, updateBoard, setMessage };
})();

//Player factory function to create player objects
const Player = (name, mark) => {
  return { name, mark };
};

const GameController = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameActive = true;

  const init = (player1Name, player2Name) => {
    players = [Player(player1Name, "X"), Player(player2Name, "O")];
    currentPlayerIndex = 0;
    gameActive = true;
    Gameboard.reset();
    DisplayController.updateBoard();
    DisplayController.setMessage(
      `${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].mark})`
    );
  };

  // Check for a win
  const checkWin = () => {
    const board = Gameboard.getBoard();
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  // Check for a tie
  const checkTie = () => {
    return Gameboard.getBoard().every((cell) => cell !== "");
  };

  // Handle a player's turn
  const playTurn = (index) => {
    if (!gameActive) return;
    if (!Gameboard.setMark(index, players[currentPlayerIndex].mark)) return;

    DisplayController.updateBoard();

    if (checkWin()) {
      DisplayController.setMessage(`${players[currentPlayerIndex].name} wins!`);
      gameActive = false;
      return;
    } else if (checkTie()) {
      DisplayController.setMessage("It's a tie!");
      gameActive = false;
      return;
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    DisplayController.setMessage(
      `${players[currentPlayerIndex].name}'s turn (${players[currentPlayerIndex].mark})`
    );
  };

  return { init, playTurn };
})();

document.addEventListener("DOMContentLoaded", () => {
  DisplayController.init();
});
