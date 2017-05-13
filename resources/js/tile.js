class Tile {
    constructor(xCoord, yCoord) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;

        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFF5533);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(0, 1);
        this.graphics.lineTo(1, 1);
        this.graphics.lineTo(1, 0);
        this.graphics.lineTo(0, 0);
        this.graphics.endFill();

        this.container = new PIXI.Container();
        this.container.xCoord = xCoord;
        this.container.yCoord = yCoord;
        this.container.addChild(this.graphics);
    }

    toString() {
        return this.xCoord + "," + this.yCoord;
    }

    equals(other) {
        return this.xCoord === other.xCoord && this.yCoord === other.yCoord;
    }
}