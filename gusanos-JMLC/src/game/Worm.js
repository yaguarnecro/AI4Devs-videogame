import { WORM_WIDTH, WORM_HEIGHT, WATER_HEIGHT } from '../utils/Constants.js';

export default class Worm {
    constructor(scene, team) {
        this.scene = scene;
        this.team = team;
        this.width = WORM_WIDTH;
        this.height = WORM_HEIGHT;
        this.health = 100;
        this.position = this.getRandomValidPosition();
        this.graphics = this.scene.add.graphics();
        this.render();
    }

    getRandomValidPosition() {
        let x, y;
        do {
            x = Math.random() * (this.scene.sys.game.config.width - this.width);
            y = this.scene.map.findSurfaceY(x);
        } while (y >= this.scene.sys.game.config.height - WATER_HEIGHT - this.height);

        return { x, y: y - this.height };
    }

    checkCollision(x, y) {
        // Implementar la lógica de colisión con el terreno aquí
        // Por ahora, usaremos una implementación simplificada
        const map = this.scene.map;
        return map.isTerrainAt(x, y + this.height);
    }

    isInWater(y) {
        // Implementar la lógica para verificar si el gusano está en el agua
        // Por ahora, asumiremos que el agua está en los últimos 50 píxeles del mapa
        return y + this.height > this.scene.sys.game.config.height - WATER_HEIGHT;
    }

    render() {
        this.graphics.clear();
        this.graphics.fillStyle(this.team.color);
        this.graphics.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        // Actualizar la posición del gusano si es necesario
        this.render();
    }
}
