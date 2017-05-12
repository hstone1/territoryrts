class Entity {

    constructor() {
        this.container = new PIXI.Container();

        this.graphics = new PIXI.Graphics();

        // set a fill and line style
        this.graphics.beginFill(0xFF3300);
        this.graphics.lineStyle(4, 0xffd900, 1);

        this.graphics.moveTo(50, 50);
        this.graphics.lineTo(250, 50);
        this.graphics.lineTo(100, 100);
        this.graphics.lineTo(50, 50);
        this.graphics.endFill();

        this.container.addChild(this.graphics);
    }
}