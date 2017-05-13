class Character extends Entity {
    constructor(xCoord, yCoord, id) {
        super(id);
        this.container = new PIXI.Container();
        this.xCoord = xCoord;
        this.yCoord = yCoord;

        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFF5533);
        this.graphics.drawCircle(0, 0, 10);
        this.graphics.endFill();

        this.container.addChild(this.graphics);
        this.container.x = xCoord;
        this.container.y = yCoord;
    }
}