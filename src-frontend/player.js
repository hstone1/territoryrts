export default class Player {
    constructor() {
        this.units = {};
        this.buildings = {};
        this.selected = null;
    }

    buildingClicked(building) {
        this.selected = building;
        console.log(this.selected);
    }

    characterClicked(character) {
        this.selected = character;
        console.log(this.selected);
    }
}
