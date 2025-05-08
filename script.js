const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== '' || !gameActive) {
        // Add shake animation for invalid moves
        cell.classList.add('shake');
        setTimeout(() => cell.classList.remove('shake'), 500);
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    
    if (checkWin()) {
        gameActive = false;
        highlightWinningCombination();
        status.textContent = `Player ${currentPlayer} wins!`;
        status.style.color = '#4CAF50';
        status.style.fontWeight = 'bold';
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        status.textContent = "Game ended in a draw!";
        status.style.color = '#666';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function highlightWinningCombination() {
    const winningCombination = winningCombinations.find(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });

    if (winningCombination) {
        winningCombination.forEach(index => {
            cells[index].classList.add('winning');
        });
    }
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    status.style.color = '#666';
    status.style.fontWeight = 'normal';
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning');
    });

    // Add a subtle animation to the game board
    gameBoard.style.animation = 'none';
    gameBoard.offsetHeight; // Trigger reflow
    gameBoard.style.animation = 'fadeIn 0.5s ease-in';
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame); 