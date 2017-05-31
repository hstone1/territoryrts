import Entity from './entity';

export default class Character extends Entity {
    constructor(xCoord, yCoord, id, map) {
        super(id);
        this.map = map;
        this._selected = false;

        this.container = new PIXI.Container();
        this.xCoord = xCoord;
        this.yCoord = yCoord;

        this.graphics = this.createGraphicsWithColor(0xFF5533)

        this.container.addChild(this.graphics);
        this.container.x = xCoord;
        this.container.y = yCoord;

        this.container.interactive = true;
        this.container.on('pointerdown', (event) => {
            event.stopPropagation();
            this.map.characterClicked(this);
        });
    }

    getSelected() {
        return this._selected;
    }

    setSelected(selected) {
        this._selected = selected;

        if (this._selected) {
            this.container.removeChild(this.graphics);
            this.graphics = this.createGraphicsWithColor(0x55FF33);
            this.container.addChild(this.graphics);
        } else {
            this.container.removeChild(this.graphics);
            this.graphics = this.createGraphicsWithColor(0xFF5533);
            this.container.addChild(this.graphics);
        }
    }

    createGraphicsWithColor(color) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color);
        graphics.drawCircle(0, 0, 10);
        graphics.endFill();
        return graphics;
    }


};
