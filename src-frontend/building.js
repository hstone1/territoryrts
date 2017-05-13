import Entity from './entity';
import Tile from './tile';

export default class Building extends Entity {
    constructor(xCoord, yCoord, width, height, id) {
        super(id);
        this.container = new PIXI.Container();
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.width = width;
        this.height = height;

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
