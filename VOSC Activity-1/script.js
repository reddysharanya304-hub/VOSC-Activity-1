
// Select HTML elements
const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");
const resultText = document.getElementById("result");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

const playerXCard = document.getElementById("playerX");
const playerOCard = document.getElementById("playerO");

const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");

// Game Variables
let currentPlayer = "X";

let gameBoard = ["", "", "", "", "", "", "", "", ""];

let gameActive = true;

let scores = {
    X: 0,
    O: 0
};

// All possible winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell clicks
cells.forEach((cell) => {

    cell.addEventListener("click", () => {

        const index = Number(cell.dataset.index);

        // Prevent invalid moves
        if (!gameActive || gameBoard[index] !== "") {
            return;
        }

        // Store the player's move
        gameBoard[index] = currentPlayer;

        // Display X or O
        cell.textContent = currentPlayer;

        cell.classList.add(currentPlayer.toLowerCase());

        cell.disabled = true;

        // Check if someone has won
        if (checkWinner()) {

            gameActive = false;

            scores[currentPlayer]++;

            updateScore();

            statusText.textContent = "Game Over!";

            resultText.textContent =
                "🎉 Player " + currentPlayer + " Wins!";

            return;
        }

        // Check if the game is a draw
        if (gameBoard.every((cell) => cell !== "")) {

            gameActive = false;

            statusText.textContent = "Game Over!";

            resultText.textContent = "🤝 It's a Draw!";

            return;
        }

        // Switch the current player
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        updateTurn();
    });

});

// Check winning combinations
function checkWinner() {

    return winningCombinations.some((combination) => {

        const [a, b, c] = combination;

        return (
            gameBoard[a] !== "" &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[b] === gameBoard[c]
        );

    });

}

// Update the turn display
function updateTurn() {

    statusText.textContent =
        "Player " + currentPlayer + "'s turn";

    playerXCard.classList.toggle(
        "active",
        currentPlayer === "X"
    );

    playerOCard.classList.toggle(
        "active",
        currentPlayer === "O"
    );

}

// Update scoreboard
function updateScore() {

    scoreX.textContent = scores.X;

    scoreO.textContent = scores.O;

}

// Restart the current game
function restartGame() {

    gameBoard = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameActive = true;

    cells.forEach((cell) => {

        cell.textContent = "";

        cell.disabled = false;

        cell.classList.remove("x", "o");

    });

    resultText.textContent = "";

    updateTurn();

}

// Reset scores and start a new game
function resetScores() {

    scores.X = 0;

    scores.O = 0;

    updateScore();

    restartGame();

}

// Button event listeners
restartBtn.addEventListener("click", restartGame);

resetBtn.addEventListener("click", resetScores);

// Start the game
updateTurn();
updateScore();