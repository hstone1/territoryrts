class Tile {
    constructor(c, y) {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFF5533);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(0, 100);
        this.graphics.lineTo(100, 100);
        this.graphics.lineTo(100, 0);
        this.graphics.lineTo(0, 0);
        this.graphics.endFill();

        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        this.container.addChild(this.graphics);
    }
}