let timer;
let level = 1;
let score = 0;
let round;
let PlayerName;
let block = document.querySelector('.block');
let board = document.querySelector('#boardGame');
let nbBlock = 16; // Nombre de blocs dans le jeu
let sqrt = 100 / Math.sqrt(nbBlock);
let rand;
let startButton = document.querySelector('#startGame');
let restartButton = document.querySelector('#restartGame');
let victoryElement = document.getElementById("afficheVictoire");
let interval = 1000;
let timerDisplay = document.getElementById("timer");
let secondsLeft = 30;

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
document.querySelector("#boardGame").addEventListener('click', (el) => {
    el = el.target;

    if (el.classList.contains('character')) {
        score++;
        clickTaupe();
    } else {
        if (score > 0) {
            score--;
        }
    }

    document.querySelector('#score').innerHTML = score;

    if (score % 25 === 0) {
        increaseLevel();
    }
});

function startGame() {
    PlayerName = document.querySelector('#playerNameInput').value;
    document.querySelector('#playerNameDisplay').innerHTML = `Joueur : ${PlayerName}`;

    startButton.classList.add('none');
    restartButton.classList.remove('none');
    rand = randomCase();

    function displayCharacter() {
        let block = document.querySelector(`[data-id='${rand}']`);
        block.classList.add('character');
        setTimeout(characterRandomMove, 2000);
    }

    startTimer();

    victoryElement = false;
    defeat = false;

    for (let i = 1; i <= nbBlock; i++) {
        let element = `<div class="block" data-id="${i}"></div>`;
        board.innerHTML += element;
    }

    document.querySelectorAll('.block').forEach((block) => {
        block.style.width = `${sqrt - 1}%`;
        block.style.height = `${sqrt}%`;
    });
    displayCharacter();
}

function increaseLevel() {
    level++;
    document.querySelector('#niveauLabel').innerHTML = `Niveau : ${level}`;
}

function randomCase() {
    return Math.floor(Math.random(1) * nbBlock) + 1;
}

function clickTaupe() {
    let oldBlock = document.querySelector(`[data-id='${rand}']`);

    oldBlock.classList.remove('character');

    rand = randomCase();

    let newBlock = document.querySelector(`[data-id='${rand}']`);
    newBlock.classList.add('character');
}

function characterRandomMove() {
    let oldBlock = document.querySelector(`[data-id='${rand}']`);

    // Retrait de la classe 'character' pour masquer la taupe
    oldBlock.classList.remove('character');

    rand = randomCase();

    let newBlock = document.querySelector(`[data-id='${rand}']`);
    newBlock.classList.add('character');

    setTimeout(characterRandomMove, 4000);
}

function restartGame() {
    // Arrête le minuteur
    stopTimer();

    startButton.classList.remove('none');
    restartButton.classList.add('none');

    score = 0;
    level = 1;

    document.querySelector('#score').innerHTML = '0';
    document.querySelector('#niveauLabel').innerHTML = 'Niveau : ';
    timerDisplay.innerHTML = '';

    document.querySelectorAll('.block').forEach((block) => {
        block.remove();
    });

    startGame();
}

function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function updateTimer() {
    if (secondsLeft > 0) {
        secondsLeft--;
        timerDisplay.innerHTML = `Temps restant : ${secondsLeft} secondes`;
    } else {
        stopTimer();
        alert('Temps écoulé. Votre score final : ' + score);
        restartGame();
    }
}
