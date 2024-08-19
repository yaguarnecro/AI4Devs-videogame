import { WATER_HEIGHT } from '../utils/Constants.js';

export class Map {
    constructor(scene, terrainKey, sceneWidth, sceneHeight) {
        const widthCenter = sceneWidth/2;
        const heightCenter = sceneHeight/2;
        this.scene = scene;
        this.terrain = scene.add.image(widthCenter, heightCenter, terrainKey);
        
        // Crear una máscara de colisión basada en los píxeles no transparentes
        const maskGraphics = scene.make.graphics({ x: 0, y: 0, add: false });
        this.terrain.mask = new Phaser.Display.Masks.BitmapMask(scene, maskGraphics);

        // Dibujar la máscara basada en los píxeles no transparentes
        maskGraphics.fillStyle(0xffffff);
        maskGraphics.beginPath();

        const texture = this.terrain.texture;
        const frame = texture.get(terrainKey);
        
        if (frame) {
            const { width, height } = frame;
            const canvasTexture = scene.textures.createCanvas(terrainKey + '_canvas', width, height);
            const pixelData = canvasTexture.getPixels(0, 0, width, height);

            if (pixelData) {
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        const alpha = pixelData[(y * width + x) * 4 + 3];
                        if (alpha > 0) {
                            maskGraphics.fillRect(x, y, 1, 1);
                        }
                    }
                }
            }
        }

        maskGraphics.fillPath();

        // Calcular la posición del terreno
        this.terrainOffsetY = sceneHeight - WATER_HEIGHT - this.terrain.height;
        this.terrain.setY(this.terrainOffsetY + this.terrain.height / 2);
        const terrainBody = scene.matter.add.image(widthCenter, this.terrainOffsetY + this.terrain.height / 2, terrainKey, null, { 
            isStatic: true,
            label: 'terrain'
        });

        // Añadir un rectángulo invisible para el agua en la parte inferior
        const waterPosition = sceneHeight - WATER_HEIGHT/2;
        const waterBody = scene.matter.add.rectangle(widthCenter, waterPosition, sceneWidth, WATER_HEIGHT, { 
            isStatic: true,
            isSensor: true,
            label: 'water'
        });
    }

    isTerrainAt(x, y) {
        // Ajustar la coordenada y para tener en cuenta el offset
        const adjustedY = y - this.terrainOffsetY;
        
        // Asegurarse de que x y adjustedY estén dentro de los límites del terreno
        if (x < 0 || x >= this.terrain.width || adjustedY < 0 || adjustedY >= this.terrain.height) {
            return false;
        }
    
        // Obtener los datos de píxeles en las coordenadas dadas
        const pixelData = this.scene.textures.getPixel(x, adjustedY, 'terrain');
    
        // Si pixelData es null, significa que el píxel está fuera de la textura o es transparente
        if (!pixelData) {
            return false;
        }
    
        // Comprobar si el píxel no es completamente transparente
        return pixelData.alpha > 0;
    }

    // Método para obtener la posición Y de la superficie en una coordenada X dada
    findSurfaceY(x) {
        for (let y = 0; y < this.scene.sys.game.config.height; y++) {
            if (this.isTerrainAt(x, y)) {
                return y - 1; // Devolver el píxel justo encima del terreno
            }
        }
        return this.scene.sys.game.config.height - WATER_HEIGHT - 1; // Si no se encuentra terreno, devolver justo encima del agua
    }
}