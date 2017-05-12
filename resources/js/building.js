class Building extends Entity {
    constructor(xCoord, yCoord, width, height, id) {
        super(id);
        this.container = new PIXI.Container();

        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFF5533);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(width, 0);
        this.graphics.lineTo(width, height);
        this.graphics.lineTo(0, height);
        this.graphics.lineTo(0, 0);
        this.graphics.endFill();

        this.container.addChild(this.graphics);
        this.container.x = xCoord;
        this.container.y = yCoord;
    }
}
