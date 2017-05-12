class Map {

    constructor() {
        this.container = new PIXI.Container();
        this.buildings = [];

        let tile = new Tile(0, 0);
        let tile2 = new Tile(1, 1);
        this.container.addChild(tile.container);
        this.container.addChild(tile2.container);

    }

    addBuilding(xCoord, yCoord, width, height) {
        const building = new Building(xCoord, yCoord, width, height);
        this.buildings.push(building);
        this.container.addChild(building.container);
    }
}