import Button from './button';

export default class Hud {
    constructor(height) {
        this.container = new PIXI.Container();
        this.container.x = 0;
        this.container.y = 0;
        this.height = height;

        // this._setupBackground();
        this._setupButtons();
    }

    // _setupBackground() {
    //     const background = new PIXI.Graphics();
    //     this.container.addChild(background);
    //
    //     let y = CANVAS_HEIGHT - this.height;
    //     background.beginFill(0x333333);
    //     background.moveTo(0, y);
    //     background.lineTo(CANVAS_WIDTH, y);
    //     background.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
    //     background.lineTo(0, CANVAS_HEIGHT);
    //     background.lineTo(0, y);
    //     background.endFill();
    // }

    _setupButtons() {
        let buttons = [
            new Button("Button 1", (event) => {
                console.log("hello");
            }),
            new Button("Build", (event) => {
                console.log("build!");
            })
        ];

        const $buttons = $('.buttons');

        buttons.forEach(button => {
            console.log(button);
            let $button = $('<div class="button">' + button.title + '</div>');
            $button.click(button.callback);
            $buttons.append($button);
        });
    }
}

