const boardEl = document.getElementById("board");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");

const size = 7;       // 7x7
const bombsCount = 16;
let bombs = [];
let revealed = 0;
let gameOver = false;

// genera le bombe (posizioni uniche da 0 a 48)
function generateBombs() {
    bombs = [];
    while (bombs.length < bombsCount) {
        const pos = Math.floor(Math.random() * size * size);
        if (!bombs.includes(pos)) bombs.push(pos);
    }
}

// crea la griglia
function createBoard() {
    boardEl.innerHTML = "";
    revealed = 0;
    scoreEl.textContent = 0;
    messageEl.textContent = "";
    gameOver = false;
    generateBombs();

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", onCellClick);
        boardEl.appendChild(cell);
    }
}

// gestione click
function onCellClick(e) {
    if (gameOver) return;
    const cell = e.target;
    const index = parseInt(cell.dataset.index);

    if (cell.classList.contains("revealed")) return;

    if (bombs.includes(index)) {
        cell.classList.add("bomb");
        cell.textContent = "💣";
        endGame(false);
    } else {
        cell.classList.add("revealed");
        revealed++;
        scoreEl.textContent = revealed;

        // se hai scoperto tutte le celle sicure -> vittoria
        if (revealed === size * size - bombsCount) {
            endGame(true);
        }
    }
}

// fine partita
function endGame(win) {
    gameOver = true;
    messageEl.textContent = win ? "Hai vinto! 🎉" : "Hai perso! 💥";
}

createBoard();