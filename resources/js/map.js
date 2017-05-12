class Map {

    constructor() {
        this.container = new PIXI.Container();

        let tile = new Tile(0, 0);
        let tile2 = new Tile(100, 100);
        this.container.addChild(tile.container);
        this.container.addChild(tile2.container);
    }
}