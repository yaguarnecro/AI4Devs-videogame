document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 50; // Restar la altura de la barra de estado

    const mapImage = new Image();
    mapImage.src = 'assets/maps/worms_mapa_2.png';
    mapImage.onload = () => {
        ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
    };
});
