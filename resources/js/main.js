const CANVAS_HEIGHT = document.documentElement.clientHeight;
const CANVAS_WIDTH = document.documentElement.clientWidth;

// const renderer = PIXI.autoDetectRenderer(CANVAS_WIDTH, CANVAS_HEIGHT);
const app = new PIXI.Application(CANVAS_WIDTH, CANVAS_HEIGHT);
document.body.appendChild(app.view);

const map = new Map();
app.stage.scale.x = app.stage.scale.y = 10;


app.stage.interactive = true;
const backgroundLayer = new PIXI.Container(-1, true);

const bgGraphics = new PIXI.Graphics();
backgroundLayer.addChild(bgGraphics);
app.stage.addChild(backgroundLayer);
bgGraphics.beginFill(0xFF5533);

bgGraphics.beginFill(0x338888);
bgGraphics.moveTo(0, 0);
bgGraphics.lineTo(0, 100);
bgGraphics.lineTo(100, 100);
bgGraphics.lineTo(100, 0);
bgGraphics.lineTo(0, 0);
bgGraphics.endFill();

app.stage.addChild(map.container);
app.stage.on('pointerdown', (event) => {
    const pos = event.data.getLocalPosition(app.stage);
    socket.send('placebuilding', JSON.stringify({
        x: Math.floor(pos.x),
        y: Math.floor(pos.y)
    }));
});

// Dragging logic
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

        app.stage.x += dx;
        app.stage.y += dy;

        prev = [e.screenX, e.screenY];
    }
});

$('html').mouseup(() => {
    isDragging = false;
});

$canvas[0].addEventListener('mousewheel', function(event){
    event.preventDefault();

    if (event.deltaY > 0) {
        app.stage.scale.x *= 1.05;
        app.stage.scale.y *= 1.05;
    } else if (event.deltaY < 0) {
        app.stage.scale.x *= 0.95;
        app.stage.scale.y *= 0.95;
    }
    return false;
}, false);


const socket = new Socket();
const buildingListener = socket.listener.addListener('buildings', (message) => {
    console.log("Building update no listener");
});

buildingListener.addListener('full', (obj) => {
    obj.forEach(b => {
        map.addBuilding(b.x, b.y, b.width, b.height);
    });
});
