class Map {
    constructor(canvas, mapSrc) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mapImage = new Image();
        this.mapImage.src = mapSrc;
        this.isReady = false;
        this.mapImage.onload = () => {
            this.initMap();
            this.isReady = true;
        };
    }

    initMap() {
        this.canvas.width = this.mapImage.width;
        this.canvas.height = this.mapImage.height;
        this.drawMap();
    }

    drawMap() {
        this.ctx.drawImage(this.mapImage, 0, 0);
        console.log(`Map dimensions: ${this.canvas.width}x${this.canvas.height}`);
    }

    isTerrainAt(x, y) {
        if (!this.isReady) return false;
        const pixel = this.ctx.getImageData(x, y, 1, 1).data;
        return pixel[3] > 0; // Check if pixel has any opacity
    }

    findSurfaceY(x, worm) {
        if (!this.isReady) return this.canvas.height - 1;
	console.log(`Finding surface at x=${x}`);
        for (let y = 0; y < this.canvas.height; y++) {
            if (this.isTerrainAt(x, y)) {
                return y - 1; // Return the pixel just above the terrain
            }
        }
        console.log(`No surface found for x=${x}, returning bottom of canvas`);
        return this.canvas.height - 1; // If no terrain found, return bottom of canvas
    }

}
