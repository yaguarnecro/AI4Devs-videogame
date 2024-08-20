document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('new-game').addEventListener('click', () => {
        window.location.href = 'game.html';
    });

    document.getElementById('help').addEventListener('click', () => {
        alert('Instrucciones básicas del juego:\n'
            + '  - Usa las teclas de dirección IZQUIERDA y DERECHA para mover el gusano\n'
            + '  - Usa las teclas de dirección ARRIBA y DEBAJO para mover la mirilla y apuntar\n'
            + '  - Usa la tecla ESPACIO para saltar\n'
            + '  - Usa la tecla ENTER para disparar\n'
            + '  - Usa la tecla TAB para cambiar de gusano\n'
            + '  - Usa la tecla ESC para pasar turno\n'
        );
    });
});