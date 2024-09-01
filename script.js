// JavaScript for Handling Game and Welcome Screen

const startButton = document.getElementById('start-button');
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game');
const messageDiv = document.getElementById('message');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
const board = ['', '', '', '', '', '', '', '', ''];

// Event listener for the start button
startButton.addEventListener('click', () => {
    welcomeScreen.style.opacity = '0'; // Fade out welcome screen
    setTimeout(() => {
        welcomeScreen.style.display = 'none'; // Hide welcome screen after fade-out
        gameScreen.style.display = 'flex'; // Show game screen
        setTimeout(() => {
            gameScreen.style.opacity = '1'; // Fade in game screen
        }, 100); // Small delay for smoother transition
    }, 500); // Duration matches CSS animation time for a smooth transition
});

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '') return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    checkWinner();
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let winner = null;
    
    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
        }
    });

    if (winner) {
        showMessage(`Congratulations! Player ${winner} wins the match!`);
        resetGame();
    } else if (!board.includes('')) {
        showMessage("It's a draw!");
        resetGame();
    }
}

function showMessage(message) {
    messageDiv.textContent = message; // Set the message text
    messageDiv.style.opacity = '1'; // Show the message with fade-in
    setTimeout(() => {
        messageDiv.style.opacity = '0'; // Hide message after 3 seconds
    }, 3000);
}

function resetGame() {
    setTimeout(() => {
        board.fill('');
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        messageDiv.textContent = ''; // Clear any message
    }, 3000); // Reset the game after the message disappears
}
