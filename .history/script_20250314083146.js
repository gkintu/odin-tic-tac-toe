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
        console.log("Game Started!");
        displayBoard();
        console.log(`It's ${players[currentPlayerIndex].name}'s turn`);
    };

    const displayBoard = () => {
        const board = Gameboard.getBoard();
        console.log(`
 ${board[0] || " "} | ${board[1] || " "} | ${board[2] || " "}
---+---+---
 ${board[3] || " "} | ${board[4] || " "} | ${board[5] || " "}
---+---+---
 ${board[6] || " "} | ${board[7] || " "} | ${board[8] || " "}
    `);
    };

     // Check for a win
  const checkWin = () => {
    const board = Gameboard.getBoard();
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
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
    return Gameboard.getBoard().every(cell => cell !== "");
  };

  // Handle a player's turn
  const playTurn = (index) => {
    if (!gameActive) {
      console.log("Game over! Please restart.");
      return;
    }

    if (!Gameboard.setMark(index, players[currentPlayerIndex].mark)) {
      console.log("Invalid move. Try another cell.");
      return;
    }

    displayBoard();

    if (checkWin()) {
      console.log(`${players[currentPlayerIndex].name} wins!`);
      gameActive = false;
      return;
    } else if (checkTie()) {
      console.log("It's a tie!");
      gameActive = false;
      return;
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    console.log(`It's ${players[currentPlayerIndex].name}'s turn`);
  };

  return { init, playTurn };
})();

