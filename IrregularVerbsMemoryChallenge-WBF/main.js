let flippedCards = [];
let matchedTriplets = 0;
let timerStarted = false;
let timer;
const timeLeft = 60; // Ajusta según sea necesario
let totalTriplets = 3; // Ajusta según sea necesario

const verbs = [
    ['be', 'was/were', 'been'],
    ['beat', 'beat', 'beaten'],
    ['become', 'became', 'become'],
    ['begin', 'began', 'begun'],
    ['bite', 'bit', 'bitten'],
    ['blow', 'blew', 'blown'],
    ['break', 'broke', 'broken'],
    ['bring', 'brought', 'brought'],
    ['build', 'built', 'built'],
    ['buy', 'bought', 'bought'],
    ['catch', 'caught', 'caught'],
    ['choose', 'chose', 'chosen'],
    ['come', 'came', 'come'],
    ['cost', 'cost', 'cost'],
    ['cut', 'cut', 'cut'],
    ['do', 'did', 'done'],
    ['draw', 'drew', 'drawn'],
    ['drink', 'drank', 'drunk'],
    ['drive', 'drove', 'driven'],
    ['eat', 'ate', 'eaten'],
    ['fall', 'fell', 'fallen'],
    ['feel', 'felt', 'felt'],
    ['fight', 'fought', 'fought'],
    ['find', 'found', 'found'],
    ['fly', 'flew', 'flown'],
    ['forget', 'forgot', 'forgotten'],
    ['get', 'got', 'got'],
    ['give', 'gave', 'given'],
    ['go', 'went', 'gone'],
    ['grow', 'grew', 'grown'],
    ['hang', 'hung', 'hung'],
    ['have', 'had', 'had'],
    ['hear', 'heard', 'heard'],
    ['hide', 'hid', 'hidden'],
    ['hit', 'hit', 'hit'],
    ['hold', 'held', 'held'],
    ['hurt', 'hurt', 'hurt'],
    ['keep', 'kept', 'kept'],
    ['know', 'knew', 'known'],
    ['leave', 'left', 'left'],
    ['lend', 'lent', 'lent'],
    ['let', 'let', 'let'],
    ['lie', 'lay', 'lain'],
    ['light', 'lit', 'lit'],
    ['lose', 'lost', 'lost'],
    ['make', 'made', 'made'],
    ['mean', 'meant', 'meant'],
    ['meet', 'met', 'met'],
    ['pay', 'paid', 'paid'],
    ['put', 'put', 'put'],
    ['read', 'read', 'read'],
    ['ride', 'rode', 'ridden'],
    ['ring', 'rang', 'rung'],
    ['rise', 'rose', 'risen'],
    ['run', 'ran', 'run'],
    ['say', 'said', 'said'],
    ['see', 'saw', 'seen'],
    ['sell', 'sold', 'sold'],
    ['send', 'sent', 'sent'],
    ['shine', 'shone', 'shone'],
    ['shoot', 'shot', 'shot'],
    ['show', 'showed', 'shown'],
    ['shut', 'shut', 'shut'],
    ['sing', 'sang', 'sung'],
    ['sit', 'sat', 'sat'],
    ['sleep', 'slept', 'slept'],
    ['speak', 'spoke', 'spoken'],
    ['spend', 'spent', 'spent'],
    ['stand', 'stood', 'stood'],
    ['steal', 'stole', 'stolen'],
    ['swim', 'swam', 'swum'],
    ['take', 'took', 'taken'],
    ['teach', 'taught', 'taught'],
    ['tear', 'tore', 'torn'],
    ['tell', 'told', 'told'],
    ['think', 'thought', 'thought'],
    ['throw', 'threw', 'thrown'],
    ['understand', 'understood', 'understood'],
    ['wake', 'woke', 'woken'],
    ['wear', 'wore', 'worn'],
    ['win', 'won', 'won'],
    ['write', 'wrote', 'written']
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

    // Seleccionar aleatoriamente los tríos de verbos
    const selectedVerbs = [];
    while (selectedVerbs.length < totalTriplets) {
        const randomIndex = Math.floor(Math.random() * verbs.length);
        const selectedVerb = verbs[randomIndex];
        if (!selectedVerbs.includes(selectedVerb)) {
            selectedVerbs.push(selectedVerb);
        }
    }

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