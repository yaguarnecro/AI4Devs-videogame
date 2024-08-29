import { WATER_HEIGHT } from '../utils/Constants.js';

export class Map {
    constructor(scene, terrainKey, sceneWidth, sceneHeight) {
        this.scene = scene;
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;
        this.terrainKey = terrainKey;

        this.createPhysicalWorld();
        this.createBackground();
        this.createTerrain();
        this.createWater();
        this.createCeiling();
    }

    createPhysicalWorld() {
        this.scene.matter.world.setBounds(0, 0, this.sceneWidth, this.sceneHeight + 200);
    }

    createBackground() {
        this.scene.add.rectangle(0, 0, this.sceneWidth, this.sceneHeight, 0x87CEEB).setOrigin(0, 0);
    }

    createTerrain() {
        const widthCenter = this.sceneWidth / 2;
        const heightCenter = this.sceneHeight / 2;
        this.terrain = this.scene.add.image(widthCenter, heightCenter, this.terrainKey);
        
        // Crear una máscara de colisión basada en los píxeles no transparentes
        const maskGraphics = this.scene.make.graphics({ x: 0, y: 0, add: false });
        this.terrain.mask = new Phaser.Display.Masks.BitmapMask(this.scene, maskGraphics);

        // Dibujar la máscara basada en los píxeles no transparentes
        maskGraphics.fillStyle(0xffffff);
        maskGraphics.beginPath();

        const texture = this.terrain.texture;
        const frame = texture.get(this.terrainKey);
        
        if (frame) {
            const { width, height } = frame;
            const canvasTexture = this.scene.textures.createCanvas(this.terrainKey + '_canvas', width, height);
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
        this.terrainOffsetY = this.sceneHeight - WATER_HEIGHT - this.terrain.height;
        this.terrain.setY(this.terrainOffsetY + this.terrain.height / 2);
        const terrainBody = this.scene.matter.add.image(widthCenter, this.terrainOffsetY + this.terrain.height / 2, this.terrainKey, null, { 
            isStatic: true,
            label: 'terrain'
        });
    }

    createWater() {
        const waterPosition = this.sceneHeight - WATER_HEIGHT / 2;
        this.scene.add.rectangle(this.sceneWidth / 2, waterPosition, this.sceneWidth, WATER_HEIGHT, 0x0000ff, 0.5);
        const waterBody = this.scene.matter.add.rectangle(this.sceneWidth / 2, waterPosition, this.sceneWidth, WATER_HEIGHT, { 
            isStatic: true,
            isSensor: true,
            label: 'water'
        });
    }

    createCeiling() {
        this.scene.matter.add.rectangle(this.sceneWidth / 2, -10, this.sceneWidth, 20, { isStatic: true, label: 'ceiling' });
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