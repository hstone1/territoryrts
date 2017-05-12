class Tile {
    constructor(x, y) {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFF5533);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(0, 1);
        this.graphics.lineTo(1, 1);
        this.graphics.lineTo(1, 0);
        this.graphics.lineTo(0, 0);
        this.graphics.endFill();

        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        this.container.addChild(this.graphics);
    }
}