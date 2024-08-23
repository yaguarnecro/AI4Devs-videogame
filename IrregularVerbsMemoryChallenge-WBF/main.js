let flippedCards = [];
let matchedTriplets = 0;
let timerStarted = false;
let timer;
const timeLeft = 60; // Ajusta según sea necesario
let totalTriplets = 3; // Ajusta según sea necesario

const verbs = [
    ['go', 'went', 'gone'],
    ['see', 'saw', 'seen'],
    ['take', 'took', 'taken'],
    ['eat', 'ate', 'eaten'],
    ['come', 'came', 'come'],
    ['run', 'ran', 'run'],
    ['write', 'wrote', 'written'],
    ['speak', 'spoke', 'spoken'],
    ['read', 'read', 'read']
];

function createCard(content) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.content = content; // Guardar el contenido en un atributo de datos

    const cardFront = document.createElement('div');
    cardFront.className = 'card-back'; // Este es el lado frontal con la imagen
    cardFront.innerText = ''; // Inicialmente vacío

    const cardBack = document.createElement('div');
    cardBack.className = 'card-content'; // Este es el lado trasero con el texto
    cardBack.innerText = content; // Mostrar el contenido al hacer clic

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (!timerStarted) {
        timerStarted = true;
        timer = setInterval(countdown, 1000);
    }

    if (flippedCards.length < 3 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 3) {
            checkForMatch();
        }
    }
}

function countdown() {
    let timerElement = document.getElementById('timer');
    let time = parseInt(timerElement.textContent);
    if (time > 0) {
        timerElement.textContent = time - 1;
    } else {
        clearInterval(timer);
        document.getElementById('loseMessage').style.display = 'block';
    }
}

function resetGame() {
    flippedCards = [];
    matchedTriplets = 0;
    clearInterval(timer);
    timerStarted = false;
    document.getElementById('timer').textContent = timeLeft;
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped');
        card.querySelector('.card-content').innerText = card.dataset.content; // Mostrar el texto
        card.querySelector('.card-back').style.backgroundImage = 'url("card.png")'; // Restaurar la imagen de fondo
        card.addEventListener('click', flipCard);
    });
    document.getElementById('winMessage').style.display = 'none';
    document.getElementById('loseMessage').style.display = 'none';
    renderCards();
}

function checkForMatch() {
    const [card1, card2, card3] = flippedCards;
    const verb1 = card1.dataset.content;
    const verb2 = card2.dataset.content;
    const verb3 = card3.dataset.content;

    if (isMatch(verb1, verb2, verb3)) {
        matchedTriplets++;
        flippedCards.forEach(card => {
            card.removeEventListener('click', flipCard); // Deshabilitar clic en cartas ya emparejadas
        });
        flippedCards = [];
        if (matchedTriplets === totalTriplets) {
            clearInterval(timer);
            document.getElementById('winMessage').style.display = 'block';
        }
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.querySelector('.card-content').innerText = card.dataset.content; // Mostrar el texto
                card.querySelector('.card-back').style.backgroundImage = 'url("card.png")'; // Restaurar la imagen de fondo
            });
            flippedCards = [];
        }, 1000);
    }
}

function isMatch(verb1, verb2, verb3) {
    return verbs.some(triplet => triplet.includes(verb1) && triplet.includes(verb2) && triplet.includes(verb3));
}

function renderCards() {
    const cardGrid = document.getElementById('card-grid');
    cardGrid.innerHTML = ''; // Limpiar el contenido anterior
    const selectedVerbs = verbs.slice(0, totalTriplets);
    const contents = selectedVerbs.flat(); // Aplanar el array de verbos seleccionados
    contents.sort(() => Math.random() - 0.5); // Mezclar las cartas
    contents.forEach(content => {
        const card = createCard(content);
        cardGrid.appendChild(card);
    });
}

function setDifficulty(level) {
    switch(level) {
        case 'easy':
            totalTriplets = 3;
            break;
        case 'medium':
            totalTriplets = 6;
            break;
        case 'hard':
            totalTriplets = 9;
            break;
    }
    resetGame();
    renderCards(); // Asegurarse de renderizar las cartas después de cambiar la dificultad
}

document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    document.getElementById('restart-button').addEventListener('click', resetGame);
    document.getElementById('easy-button').addEventListener('click', () => setDifficulty('easy'));
    document.getElementById('medium-button').addEventListener('click', () => setDifficulty('medium'));
    document.getElementById('hard-button').addEventListener('click', () => setDifficulty('hard'));
});

document.querySelectorAll('#difficulty-buttons button').forEach(button => {
  button.addEventListener('click', function() {
    document.querySelectorAll('#difficulty-buttons button').forEach(btn => btn.classList.remove('selected'));
    this.classList.add('selected');
  });
});