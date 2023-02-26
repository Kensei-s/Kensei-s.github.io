// Tic Tac Toe game logic
let currentPlayer = "X";
let gameStatus = "Game On";
let moves = 0;

const cells = document.querySelectorAll("td");

function handleCellClick(event) {
    const clickedCell = event.target;
    if (clickedCell.textContent !== "" || gameStatus !== "Game On") {
        return;
    }
    clickedCell.textContent = currentPlayer;
    moves++;
    checkGameStatus();
    togglePlayer();
}

function checkGameStatus() {
    const winnerCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winnerCombinations.length; i++) {
        const [a, b, c] = winnerCombinations[i];
        if (cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer) {
            // gameStatus = `${currentPlayer} Wins!`;
            alert(`${currentPlayer} gagne !`);
            recordWinner(currentPlayer);
            return;
        }
    }

    if (moves === 9) {
        // gameStatus = "Tie Game!";
        alert("Égalité !");

        recordWinner("");
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function resetGame() {
    currentPlayer = "X";
    alert("C'est reparti !");
    moves = 0;
    cells.forEach(cell => cell.textContent = "");
}

// Function to record the last five winners
const lastFiveWinners = [];
function recordWinner(player) {
    if (player !== "") {
        lastFiveWinners.unshift(player);
    }
    if (lastFiveWinners.length > 5) {
        lastFiveWinners.pop();
    }
    updateLastFiveWinners();
}

// Function to update the list of last five winners
function updateLastFiveWinners() {
    const list = document.getElementById("last-five-winners");
    list.innerHTML = "";
    lastFiveWinners.forEach(winner => {
        const item = document.createElement("li");
        item.textContent = winner;
        list.appendChild(item);
    });
}

// Add click event listener to each cell
cells.forEach(cell => cell.addEventListener("click", handleCellClick));

// Add click event listener to the reset button
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetGame);
