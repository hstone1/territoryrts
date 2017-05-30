import Building from './building';
import Character from './character';

export default class Map {
    constructor() {
        this.container = new PIXI.Container();
        this.buildings = {};
        this.characters = {};

        // Map from tile coordinates to building on the tile.
        this._usedTiles = {};
    }

    addBuilding(xCoord, yCoord, width, height, id) {
        const building = new Building(xCoord, yCoord, width, height, id);

        this.buildings[id] = building;
        this.container.addChild(building.container);

        building.tiles().forEach(tile => {
            this._usedTiles[tile.toString()] = building.id;
        });
    }

    addCharacter(xCoord, yCoord, id) {
        const character = new Character(xCoord, yCoord, id);

        this.characters[id] = character;
        this.container.addChild(character.container);
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
