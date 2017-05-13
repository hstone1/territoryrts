import Map from './map';
import Socket from './socket';
import Hud from './hud';
import Constants from './constants';
import Building from './building';

export default class Game {
    constructor() {
        this.socket = new Socket();
        this.app = new PIXI.Application(Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);
        document.body.appendChild(this.app.view);

        this._setupBackground();

        this.map = new Map();
        this.app.stage.addChild(this.map.container);
        this.map.container.scale.x = this.map.container.scale.y = 10;
        this.app.stage.interactive = true;

        this.addListeners();
        this.addEventListeners();

        this.hud = new Hud(180);
        this.app.stage.addChild(this.hud.container);
    }

    _setupBackground() {
        const backgroundLayer = new PIXI.Container();
        this.app.stage.addChild(backgroundLayer);

        const bgGraphics = new PIXI.Graphics();
        backgroundLayer.addChild(bgGraphics);
        bgGraphics.beginFill(0xFF5533);

        bgGraphics.beginFill(0x338888);
        bgGraphics.moveTo(0, 0);
        bgGraphics.lineTo(0, Constants.CANVAS_HEIGHT);
        bgGraphics.lineTo(Constants.CANVAS_WIDTH, Constants.CANVAS_HEIGHT);
        bgGraphics.lineTo(Constants.CANVAS_WIDTH, 0);
        bgGraphics.lineTo(0, 0);
        bgGraphics.endFill();
    }

    addListeners() {
        let isDragging = false;
        let prev = [];

        const $canvas = $('canvas');
        $canvas.mousedown((e) => {
            isDragging = true;
            prev = [e.screenX, e.screenY];
        });

        // PANNING
        $canvas.mousemove((e) => {
            if (isDragging) {
                let dx = (e.screenX - prev[0]);
                let dy = (e.screenY - prev[1]);

                this.map.container.x += dx;
                this.map.container.y += dy;

                prev = [e.screenX, e.screenY];
            }
        });

        $('html').mouseup(() => {
            isDragging = false;
        });

        // ZOOMING
        $canvas[0].addEventListener('mousewheel', event => {
            event.preventDefault();
            this.map.container.scale.x *= event.deltaY > 0 ? 1.05 : 0.95;
            this.map.container.scale.y = this.map.container.scale.x;
            return false;
        }, false);

        this.app.stage.on('pointerdown', (event) => {
            const pos = event.data.getLocalPosition(this.map.container);

            if (this.map.canPlaceBuilding(new Building(Math.floor(pos.x), Math.floor(pos.y), 16, 16, "a"))) {
                console.log("Can place building");
                this.socket.send('placebuilding', JSON.stringify({
                    x: Math.floor(pos.x),
                    y: Math.floor(pos.y)
                }));
            } else {
                console.log("Can't place building");
            }
        });
    }

    addEventListeners() {
        const buildingListener = this.socket.listener.addListener('buildings', (message) => {
            console.log("Building update no listener");
        });

        buildingListener.addListener('full', (obj) => {
            obj.forEach(b => {
                this.map.addBuilding(b.x, b.y, b.width, b.height, "sample id");
            });
        });

        buildingListener.addListener('add', (obj) => {
            this.map.addBuilding(obj.x, obj.y, obj.width, obj.height, obj.id);
        });

        const characterListener = this.socket.listener.addListener('characters', (message) => {
            console.log("Character update no listener");
        });

        characterListener.addListener('full', (obj) => {
            obj.forEach(c => {
                this.map.addCharacter(c.x, c.y, c.id);
            });
        });
    }
};
