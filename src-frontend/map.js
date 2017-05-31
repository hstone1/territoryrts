import Building from './building';
import Character from './character';

export default class Map {
    constructor(player, game) {
        this.container = new PIXI.Container();
        this.buildings = {};
        this.characters = {};
        this.game = game;

        // Map from tile coordinates to building on the tile.
        this._usedTiles = {};
        this.player = player;
        this.selected = null;
    }

    buildingClicked(building) {
        console.log("Building clicked");
        this.selected = building;
    }

    characterClicked(character) {
        console.log("Character clicked");
        if (this.selected) {
            this.selected.setSelected(false);
        }
        this.selected = character;
        this.selected.setSelected(true);
    }

    stageClicked(x, y) {
        console.log("Stage clicekd");
        this.game.socket.send('movecharacter', JSON.stringify({
            'x': Math.floor(x),
            'y': Math.floor(y),
            'id': this.selected.id
        }));
    }

    addBuilding(xCoord, yCoord, width, height, id) {
        const building = new Building(xCoord, yCoord, width, height, id, this);

        this.buildings[id] = building;
        this.container.addChild(building.container);

        building.tiles().forEach(tile => {
            this._usedTiles[tile.toString()] = building.id;
        });
    }

    addCharacter(xCoord, yCoord, id) {
        const character = new Character(xCoord, yCoord, id, this);

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

    moveCharacter(id, x, y) {
        const character = this.characters[id];
        character.container.x = x;
        character.container.y = y;
    }
}




