document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('new-game').addEventListener('click', () => {
        console.log('Nueva partida');
    });

    document.getElementById('help').addEventListener('click', () => {
        alert('Instrucciones básicas del juego');
    });

    document.getElementById('exit').addEventListener('click', () => {
        window.close();
    });
});
