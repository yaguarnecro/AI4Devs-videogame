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
        this.ctx.drawImage(this.mapImage, 0, 0);
        this.mapData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    isTerrainAt(x, y) {
        if (!this.isReady) return false;
        const index = (y * this.canvas.width + x) * 4;
        return this.mapData.data[index + 3] !== 0; // Check if pixel is not transparent
    }

    findSurfaceY(x) {
        if (!this.isReady) return this.canvas.height - 1;
        for (let y = 0; y < this.canvas.height; y++) {
            if (this.isTerrainAt(x, y)) {
                return y - 1; // Return the pixel just above the terrain
            }
        }
        return this.canvas.height - 1; // If no terrain found, return bottom of canvas
    }
}
