import Entity from './entity';
import Button from './button';

export default class Character extends Entity {
    constructor(xCoord, yCoord, id, map) {
        super(id);

        this.type = "character";
        this.map = map;
        this._selected = false;

        this.container = new PIXI.Container();
        this.xCoord = xCoord;
        this.yCoord = yCoord;

        this.graphics = this._createGraphicsWithColor(0xFF5533)

        this.container.addChild(this.graphics);
        this.container.x = xCoord;
        this.container.y = yCoord;

        this.container.interactive = true;
        this.container.on('pointerdown', (event) => {
            event.stopPropagation();
            this.map.characterClicked(this);
        });

        this.buttons = [
            new Button("Character Action", () => {
                console.log(this);
            })
        ]
    }

    get selected() {
        return this._selected;
    }

    set selected(selected) {
        this._selected = selected;

        if (this._selected) {
            this._changeColorOfGraphic(0x55FF33);
        } else {
            this._changeColorOfGraphic(0xFF5533);
        }
    }

    _changeColorOfGraphic(color) {
        this.container.removeChild(this.graphics);
        this.graphics = this._createGraphicsWithColor(color);
        this.container.addChild(this.graphics);
    }

    _createGraphicsWithColor(color) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color);
        graphics.drawCircle(0, 0, 10);
        graphics.endFill();
        return graphics;
    }
};
