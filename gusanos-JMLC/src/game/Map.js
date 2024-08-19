export class Map {
    constructor(scene, terrainKey, sceneWidth, sceneHeight) {
        const widthCenter = sceneWidth/2;
        const heightCenter = sceneHeight/2;
        const waterHeight = 20;
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

        // Crear un cuerpo estático para el terreno
        const terrainPosition = sceneHeight - waterHeight - (sceneHeight - this.terrain.height - waterHeight/2);
        const terrainBody = scene.matter.add.image(widthCenter, (terrainPosition), terrainKey, null, { 
            isStatic: true,
            label: 'terrain'
        });

        // Añadir un rectángulo invisible para el agua en la parte inferior
        const waterPosition = sceneHeight - waterHeight/2;
        const waterBody = scene.matter.add.rectangle(widthCenter, waterPosition, sceneWidth, waterHeight, { 
            isStatic: true,
            isSensor: true,
            label: 'water'
        });
    }
}