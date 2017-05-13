class Game {
    constructor() {
        const CANVAS_HEIGHT = document.documentElement.clientHeight;
        const CANVAS_WIDTH = document.documentElement.clientWidth;

        this.socket = new Socket();

        this.app = new PIXI.Application(CANVAS_WIDTH, CANVAS_HEIGHT);
        document.body.appendChild(this.app.view);

        this.app.stage.scale.x = this.app.stage.scale.y = 10;
        this.app.stage.interactive = true;

        this._setupBackground();

        this.map = new Map();
        this.app.stage.addChild(this.map.container);


        this.app.stage.on('pointerdown', (event) => {
            const pos = event.data.getLocalPosition(this.app.stage);

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

        this.addListeners();
        this.addEventListeners();
    }

    _setupBackground() {
        const backgroundLayer = new PIXI.Container(-1, true);
        this.app.stage.addChild(backgroundLayer);

        const bgGraphics = new PIXI.Graphics();
        backgroundLayer.addChild(bgGraphics);
        bgGraphics.beginFill(0xFF5533);

        bgGraphics.beginFill(0x338888);
        bgGraphics.moveTo(0, 0);
        bgGraphics.lineTo(0, 100);
        bgGraphics.lineTo(100, 100);
        bgGraphics.lineTo(100, 0);
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

        $canvas.mousemove((e) => {
            if (isDragging) {
                let dx = (e.screenX - prev[0]);
                let dy = (e.screenY - prev[1]);

                this.app.stage.x += dx;
                this.app.stage.y += dy;

                prev = [e.screenX, e.screenY];
            }
        });

        $('html').mouseup(() => {
            isDragging = false;
        });

        $canvas[0].addEventListener('mousewheel', event => {
            event.preventDefault();

            if (event.deltaY > 0) {
                this.app.stage.scale.x *= 1.05;
                this.app.stage.scale.y *= 1.05;
            } else if (event.deltaY < 0) {
                this.app.stage.scale.x *= 0.95;
                this.app.stage.scale.y *= 0.95;
            }
            return false;
        }, false);
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
    }
}