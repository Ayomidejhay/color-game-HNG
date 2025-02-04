const COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB',
    '#E74C3C', '#2ECC71', '#F1C40F', '#1ABC9C'
];

let targetColor = '';
let score = 0;

function generateNewGame() {
    const shuffled = COLORS.sort(() => Math.random() - 0.5);
    targetColor = shuffled[0];
    const options = shuffled.slice(0, 6);
    
    if (!options.includes(targetColor)) {
        options[Math.floor(Math.random() * 6)] = targetColor;
    }

    document.getElementById('colorBox').style.backgroundColor = targetColor;
    document.getElementById('gameStatus').textContent = '';
    renderOptions(options);
}

function renderOptions(options) {
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    options.forEach(color => {
        const button = document.createElement('button');
        button.className = 'option';
        button.style.backgroundColor = color;
        button.onclick = () => handleGuess(color);
        container.appendChild(button);
    });
}

function handleGuess(color) {
    const status = document.getElementById('gameStatus');
    if (color === targetColor) {
        status.textContent = 'Correct! 🎉';
        status.style.color = 'green';
        score++;
        document.getElementById('score').textContent = score;
        setTimeout(generateNewGame, 1500);
    } else {
        status.textContent = 'Wrong! Restarting...';
        status.style.color = 'red';
        setTimeout(() => {
            score = 0;
            document.getElementById('score').textContent = score;
            generateNewGame();
        }, 1500);
    }
}

document.getElementById('newGame').addEventListener('click', () => {
    score = 0;
    document.getElementById('score').textContent = score;
    generateNewGame();
});

generateNewGame();