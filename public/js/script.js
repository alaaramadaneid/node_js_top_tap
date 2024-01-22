let timer;
let level = 1;
let score = 0;
let round;
let PlayerName;
let block = document.querySelector('.block');
let board = document.querySelector('#boardGame');
let nbBlock = 16;
let sqrt = 100 / Math.sqrt(nbBlock);
let rand;
let startButton;
let restartButton;
let victoryElement = document.getElementById("afficheVictoire");
let interval = 1000;

document.querySelector('#startGame').addEventListener('click', startGame);
document.querySelector('#restartGame').addEventListener('click', restartGame);
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

    // Vérifiez si le score est un multiple de 25 pour augmenter le niveau
    if (score % 25 === 0) {
        increaseLevel();
    }
});

function startGame() {
    PlayerName = document.querySelector('#playerNameInput').value;
    document.querySelector('#playerNameDisplay').innerHTML = `Joueur : ${PlayerName}`;


    document.querySelector('#startGame').classList.add('none');
    document.querySelector('#restartGame').classList.remove('none');
    rand = randomCase();

    function displayCharacter() {
        let block = document.querySelector(`[data-id='${rand}']`);
        block.classList.add('character');
        setTimeout(characterRandomMove, 2000);
    }

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
    document.querySelector('#niveau').innerHTML = `Niveau : ${level}`;
}

function randomCase() {
    return Math.floor(Math.random(1) * nbBlock) + 1;
}

function clickTaupe() {
    let oldBlock = document.querySelector(`[data-id='${rand}']`);
    oldBlock.classList.remove('character');

    rand = randomCase();
    console.log(rand);

    let newBlock = document.querySelector(`[data-id='${rand}']`);
    newBlock.classList.add('character');
}

function characterRandomMove() {
    let oldBlock = document.querySelector(`[data-id='${rand}']`);
    oldBlock.classList.remove('character');

    rand = randomCase();

    let newBlock = document.querySelector(`[data-id='${rand}']`);
    newBlock.classList.add('character');

    setTimeout(characterRandomMove, 4000);
}

function restartGame() {
    document.querySelector('#startGame').classList.remove('none');
    document.querySelector('#restartGame').classList.add('none');
    document.querySelector('#score').innerHTML = '0';
    document.querySelector('#niveau').innerHTML = 'Niveau : 1';


    document.querySelectorAll('.block').forEach((block) => {
        block.remove();
    });

    startGame();
}
