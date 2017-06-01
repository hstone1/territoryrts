import Entity from './entity';
import Tile from './tile';
import Button from './button';

export default class Building extends Entity {
    constructor(xCoord, yCoord, width, height, id, map) {
        super(id);

        this.type = "building";
        this._selected = false;


        this.map = map;
        this.container = new PIXI.Container();
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.width = width;
        this.height = height;

        this.graphics = this._createGraphics(0xFF5533);
        this.container.addChild(this.graphics);

        this.container.x = xCoord;
        this.container.y = yCoord;

        this.container.interactive = true;
        this.container.on('pointerdown', (event) => {
            event.stopPropagation();
            this.map.buildingClicked(this);
        });
    }

    get buttons() {
        return [
            new Button("Button", () => {
                console.log(this);
            })
        ];
    }

    get selected() {
        return this._selected;
    }

    set selected(selected) {
        this._selected = selected;
        if (this._selected) {
            this._changeColor(0x55FF33);
        } else {
            this._changeColor(0xFF5533)
        }
    }

    _changeColor(color) {
        this.container.removeChild(this.graphics);
        this.graphics = this._createGraphics(color);
        this.container.addChild(this.graphics);
    }

    _createGraphics(color) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color);
        graphics.moveTo(0, 0);
        graphics.lineTo(this.width, 0);
        graphics.lineTo(this.width, this.height);
        graphics.lineTo(0, this.height);
        graphics.lineTo(0, 0);
        graphics.endFill();

        return graphics;
    }

    // Generate list of all tiles for overlap checking.
    tiles() {
        const tiles = [];
        for (let x = this.xCoord; x < this.xCoord + this.width; x++) {
            for (let y = this.yCoord; y < this.yCoord + this.height; y++) {
                tiles.push(new Tile(x, y));
            }
        }
        return tiles;
    }
};
