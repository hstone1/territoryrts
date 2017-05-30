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
        if (this.selected) {
            this.selected.setSelected(false);
        }
        this.selected = character;
        this.selected.setSelected(true);
        console.log(this.selected);
    }
}
