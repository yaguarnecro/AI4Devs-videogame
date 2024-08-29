let flippedCards = [];
let matchedTriplets = 0;
let timerStarted = false;
let timer;
const timeLeft = 60; // Ajusta según sea necesario
let totalTriplets = 3; // Ajusta según sea necesario

const verbs = [
    ['be', 'was/were', 'been', 'fa-user'],
    ['beat', 'beat', 'beaten', 'fa-drum'],
    ['become', 'became', 'become', 'fa-magic'],
    ['begin', 'began', 'begun', 'fa-play'],
    ['bite', 'bit', 'bitten', 'fa-tooth'],
    ['blow', 'blew', 'blown', 'fa-wind'],
    ['break', 'broke', 'broken', 'fa-hammer'],
    ['bring', 'brought', 'brought', 'fa-gift'],
    ['build', 'built', 'built', 'fa-building'],
    ['buy', 'bought', 'bought', 'fa-shopping-cart'],
    ['catch', 'caught', 'caught', 'fa-hand-holding'],
    ['choose', 'chose', 'chosen', 'fa-check'],
    ['come', 'came', 'come', 'fa-arrow-right'],
    ['cost', 'cost', 'cost', 'fa-dollar-sign'],
    ['cut', 'cut', 'cut', 'fa-cut'],
    ['do', 'did', 'done', 'fa-check-circle'],
    ['draw', 'drew', 'drawn', 'fa-pencil-alt'],
    ['drink', 'drank', 'drunk', 'fa-glass-martini'],
    ['drive', 'drove', 'driven', 'fa-car'],
    ['eat', 'ate', 'eaten', 'fa-utensils'],
    ['fall', 'fell', 'fallen', 'fa-fall'],
    ['feel', 'felt', 'felt', 'fa-heart'],
    ['fight', 'fought', 'fought', 'fa-fist-raised'],
    ['find', 'found', 'found', 'fa-search'],
    ['fly', 'flew', 'flown', 'fa-plane'],
    ['forget', 'forgot', 'forgotten', 'fa-brain'],
    ['forgive', 'forgave', 'forgiven', 'fa-handshake'],
    ['freeze', 'froze', 'frozen', 'fa-snowflake'],
    ['get', 'got', 'gotten', 'fa-gift'],
    ['give', 'gave', 'given', 'fa-hand-holding-heart'],
    ['go', 'went', 'gone', 'fa-walking'],
    ['grow', 'grew', 'grown', 'fa-seedling'],
    ['have', 'had', 'had', 'fa-hand-holding'],
    ['hear', 'heard', 'heard', 'fa-ear'],
    ['hide', 'hid', 'hidden', 'fa-eye-slash'],
    ['hit', 'hit', 'hit', 'fa-hand-rock'],
    ['hold', 'held', 'held', 'fa-hand-holding'],
    ['hurt', 'hurt', 'hurt', 'fa-band-aid'],
    ['keep', 'kept', 'kept', 'fa-lock'],
    ['know', 'knew', 'known', 'fa-brain'],
    ['leave', 'left', 'left', 'fa-sign-out-alt'],
    ['lend', 'lent', 'lent', 'fa-hand-holding-usd'],
    ['let', 'let', 'let', 'fa-door-open'],
    ['lose', 'lost', 'lost', 'fa-times-circle'],
    ['make', 'made', 'made', 'fa-hammer'],
    ['mean', 'meant', 'meant', 'fa-comment-dots'],
    ['meet', 'met', 'met', 'fa-handshake'],
    ['pay', 'paid', 'paid', 'fa-money-bill-wave'],
    ['put', 'put', 'put', 'fa-arrow-down'],
    ['read', 'read', 'read', 'fa-book'],
    ['ride', 'rode', 'ridden', 'fa-bicycle'],
    ['ring', 'rang', 'rung', 'fa-bell'],
    ['run', 'ran', 'run', 'fa-running'],
    ['say', 'said', 'said', 'fa-comment'],
    ['see', 'saw', 'seen', 'fa-eye'],
    ['sell', 'sold', 'sold', 'fa-dollar-sign'],
    ['send', 'sent', 'sent', 'fa-paper-plane'],
    ['show', 'showed', 'shown', 'fa-tv'],
    ['shut', 'shut', 'shut', 'fa-door-closed'],
    ['sing', 'sang', 'sung', 'fa-microphone'],
    ['sit', 'sat', 'sat', 'fa-chair'],
    ['sleep', 'slept', 'slept', 'fa-bed'],
    ['speak', 'spoke', 'spoken', 'fa-comment-alt'],
    ['spend', 'spent', 'spent', 'fa-wallet'],
    ['stand', 'stood', 'stood', 'fa-male'],
    ['steal', 'stole', 'stolen', 'fa-mask'],
    ['swim', 'swam', 'swum', 'fa-swimmer'],
    ['take', 'took', 'taken', 'fa-hand-paper'],
    ['teach', 'taught', 'taught', 'fa-chalkboard-teacher'],
    ['tell', 'told', 'told', 'fa-comment-dots'],
    ['think', 'thought', 'thought', 'fa-brain'],
    ['throw', 'threw', 'thrown', 'fa-baseball-ball'],
    ['understand', 'understood', 'understood', 'fa-brain'],
    ['wake', 'woke', 'woken', 'fa-sun'],
    ['wear', 'wore', 'worn', 'fa-tshirt'],
    ['win', 'won', 'won', 'fa-trophy'],
    ['write', 'wrote', 'written', 'fa-pen'],
];

function createCard(content, icon) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.content = content; // Guardar el contenido en un atributo de datos
    card.dataset.icon = icon; // Guardar el icono en un atributo de datos

    const cardFront = document.createElement('div');
    cardFront.className = 'card-back'; // Este es el lado frontal con la imagen
    cardFront.innerText = ''; // Inicialmente vacío

    const cardBack = document.createElement('div');
    cardBack.className = 'card-content'; // Este es el lado trasero con el texto
    cardBack.innerHTML = `<i class="fas ${icon}"></i><br>${content}`; // Mostrar el icono y el contenido en líneas separadas

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
        card.querySelector('.card-content').innerHTML = `<i class="fas ${card.dataset.icon}"></i><br>${card.dataset.content}`; // Restaurar el icono y el texto
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
                card.querySelector('.card-content').innerHTML = `<i class="fas ${card.dataset.icon}"></i><br>${card.dataset.content}`; // Restaurar el icono y el texto
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

    const contents = selectedVerbs.flatMap(verb => [
        { content: verb[0], icon: verb[3] },
        { content: verb[1], icon: verb[3] },
        { content: verb[2], icon: verb[3] }
    ]);

    contents.sort(() => Math.random() - 0.5); // Mezclar las cartas
    contents.forEach(({ content, icon }) => {
        const card = createCard(content, icon);
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
        case 'professional':
            totalTriplets = 12; // Usar 12 tripletas
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
    document.getElementById('professional-button').addEventListener('click', () => setDifficulty('professional'));
});

document.querySelectorAll('#difficulty-buttons button').forEach(button => {
  button.addEventListener('click', function() {
    document.querySelectorAll('#difficulty-buttons button').forEach(btn => btn.classList.remove('selected'));
    this.classList.add('selected');
  });
});