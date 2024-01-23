// Déclaration des variables
let timer; // Variable pour stocker le minuteur
let level = 1; // Niveau initial
let score = 0; // Score initial
let round; // Variable pour le tour (non utilisée dans le code actuel)
let PlayerName; // Nom du joueur
let block = document.querySelector('.block'); // Sélection du premier élément avec la classe 'block'
let board = document.querySelector('#boardGame'); // Sélection de l'élément avec l'id 'boardGame'
let nbBlock = 16; // Nombre de blocs dans le jeu
let sqrt = 100 / Math.sqrt(nbBlock); // Racine carrée du nombre de blocs pour le dimensionnement
let rand; // Variable pour stocker un nombre aléatoire
let startButton; // Bouton de démarrage du jeu
let restartButton; // Bouton de redémarrage du jeu
let victoryElement = document.getElementById("afficheVictoire"); // Élément pour afficher la victoire
let interval = 1000; // Intervalle pour certaines opérations (non utilisé dans le code actuel)

// Ajout des écouteurs d'événements pour les boutons
document.querySelector('#startGame').addEventListener('click', startGame);
document.querySelector('#restartGame').addEventListener('click', restartGame);
document.querySelector("#boardGame").addEventListener('click', (el) => {
    el = el.target;

    // Vérification si l'élément cliqué est une taupe
    if (el.classList.contains('character')) {
        score++;
        clickTaupe();
    } else {
        // Si ce n'est pas une taupe et que le score est supérieur à 0, décrémenter le score
        if (score > 0) {
            score--;
        }
    }

    // Mise à jour de l'affichage du score
    document.querySelector('#score').innerHTML = score;

    // Vérification si le score est un multiple de 25 pour augmenter le niveau
    if (score % 25 === 0) {
        increaseLevel();
    }
});

// Fonction pour démarrer le jeu
function startGame() {
    // Récupération du nom du joueur et affichage dans l'interface
    PlayerName = document.querySelector('#playerNameInput').value;
    document.querySelector('#playerNameDisplay').innerHTML = `Joueur : ${PlayerName}`;

    // Masquage du bouton "Start" et affichage du bouton "Restart"
    document.querySelector('#startGame').classList.add('none');
    document.querySelector('#restartGame').classList.remove('none');
    rand = randomCase();

    // Fonction pour afficher une taupe après un délai
    function displayCharacter() {
        let block = document.querySelector(`[data-id='${rand}']`);
        block.classList.add('character');
        setTimeout(characterRandomMove, 2000);
    }

    victoryElement = false;
    defeat = false;

    // Génération des blocs du jeu
    for (let i = 1; i <= nbBlock; i++) {
        let element = `<div class="block" data-id="${i}"></div>`;
        board.innerHTML += element;
    }

    // Ajustement du style des blocs
    document.querySelectorAll('.block').forEach((block) => {
        block.style.width = `${sqrt - 1}%`;
        block.style.height = `${sqrt}%`;
    });
    displayCharacter();
}

// Fonction pour augmenter le niveau
function increaseLevel() {
    level++;
    document.querySelector('#niveau').innerHTML = `Niveau : ${level}`;
}

// Fonction pour générer un nombre aléatoire
function randomCase() {
    return Math.floor(Math.random(1) * nbBlock) + 1;
}

// Fonction appelée lorsqu'une taupe est cliquée
function clickTaupe() {
    // Sélection de l'ancien bloc où se trouvait la taupe
    let oldBlock = document.querySelector(`[data-id='${rand}']`);

    // Retrait de la classe 'character' pour masquer la taupe
    oldBlock.classList.remove('character');

    // Génération d'un nouveau nombre aléatoire pour positionner la taupe ailleurs
    rand = randomCase();

    // Affichage de la nouvelle taupe dans un autre bloc
    let newBlock = document.querySelector(`[data-id='${rand}']`);
    newBlock.classList.add('character');
}

// Fonction pour déplacer aléatoirement la taupe
function characterRandomMove() {
    // Sélection de l'ancien bloc où se trouvait la taupe
    let oldBlock = document.querySelector(`[data-id='${rand}']`);

    // Retrait de la classe 'character' pour masquer la taupe
    oldBlock.classList.remove('character');

    // Génération d'un nouveau nombre aléatoire pour positionner la taupe ailleurs
    rand = randomCase();

    // Affichage de la nouvelle taupe dans un autre bloc
    let newBlock = document.querySelector(`[data-id='${rand}']`);
    newBlock.classList.add('character');

    // Appel récursif pour déplacer la taupe après un délai
    setTimeout(characterRandomMove, 4000);
}

// Fonction pour redémarrer le jeu
function restartGame() {
    // Affichage du bouton "Start" et masquage du bouton "Restart"
    document.querySelector('#startGame').classList.remove('none');
    document.querySelector('#restartGame').classList.add('none');

    // Réinitialisation du score et du niveau à zéro
    score = 0;
    level = 1;

    // Mise à jour de l'affichage du score et du niveau
    document.querySelector('#score').innerHTML = '0';
    document.querySelector('#niveau').innerHTML = 'Niveau : 1';

    // Suppression de tous les blocs du jeu
    document.querySelectorAll('.block').forEach((block) => {
        block.remove();
    });

    // Démarrage d'une nouvelle partie
    startGame();
}
