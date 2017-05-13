class Map {

    constructor() {
        this.container = new PIXI.Container();
        this.buildings = {};

        // Map from tile coordinates to building on the tile.
        this._usedTiles = {};

        let tile = new Tile(0, 0);
        let tile2 = new Tile(1, 1);
        this.container.addChild(tile.container);
        this.container.addChild(tile2.container);
    }

    addBuilding(xCoord, yCoord, width, height, id) {
        const building = new Building(xCoord, yCoord, width, height, id);

        this.buildings[id] = building;
        this.container.addChild(building.container);

        building.tiles().forEach(tile => {
            this._usedTiles[tile.toString()] = building.id;
        });
    }

    canPlaceBuilding(building) {
        let canPlace = true;
        building.tiles().forEach(tile => {
            if (this._usedTiles[tile.toString()]) {
                canPlace = false;
            }
        });

        return canPlace;
    }
}