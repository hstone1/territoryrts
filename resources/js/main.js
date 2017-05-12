const CANVAS_HEIGHT = document.documentElement.clientHeight;
const CANVAS_WIDTH = document.documentElement.clientWidth;

// const renderer = PIXI.autoDetectRenderer(CANVAS_WIDTH, CANVAS_HEIGHT);
const app = new PIXI.Application(CANVAS_WIDTH, CANVAS_HEIGHT);
document.body.appendChild(app.view);

const entity = new Entity();
app.stage.addChild(entity.container);
