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
socket.addListener('buildings', (message) => {
    alert(message);
});



