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
    }

    isTerrainAt(x, y) {
        if (!this.isReady) return false;
        const pixel = this.ctx.getImageData(x, y, 1, 1).data;
        return pixel[3] > 0; // Check if pixel has any opacity
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

    // Debug function to visualize the surface detection
    debugDrawSurface() {
        this.ctx.strokeStyle = 'red';
        this.ctx.beginPath();
        for (let x = 0; x < this.canvas.width; x += 5) {
            let y = this.findSurfaceY(x);
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y + 5);
        }
        this.ctx.stroke();
    }
}
