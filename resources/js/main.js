const CANVAS_HEIGHT = document.documentElement.clientHeight;
const CANVAS_WIDTH = document.documentElement.clientWidth;

// const renderer = PIXI.autoDetectRenderer(CANVAS_WIDTH, CANVAS_HEIGHT);
const app = new PIXI.Application(CANVAS_WIDTH, CANVAS_HEIGHT);
document.body.appendChild(app.view);

const map = new Map();
app.stage.addChild(map.container);


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





