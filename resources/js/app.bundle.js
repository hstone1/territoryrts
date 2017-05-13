/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tile__ = __webpack_require__(2);



class Building extends __WEBPACK_IMPORTED_MODULE_0__entity__["a" /* default */] {
    constructor(xCoord, yCoord, width, height, id) {
        super(id);
        this.container = new PIXI.Container();
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.width = width;
        this.height = height;

        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFF5533);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(width, 0);
        this.graphics.lineTo(width, height);
        this.graphics.lineTo(0, height);
        this.graphics.lineTo(0, 0);
        this.graphics.endFill();

        this.container.addChild(this.graphics);
        this.container.x = xCoord;
        this.container.y = yCoord;

    }

    // Generate list of all tiles for overlap checking.
    tiles() {
        const tiles = [];
        for (let x = this.xCoord; x < this.xCoord + this.width; x++) {
            for (let y = this.yCoord; y < this.yCoord + this.height; y++) {
                tiles.push(new __WEBPACK_IMPORTED_MODULE_1__tile__["a" /* default */](x, y));
            }
        }
        return tiles;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Building;
;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Entity {
    constructor(id) {
        this.id = id;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Entity;
;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tile {
    constructor(xCoord, yCoord) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;

        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFF5533);
        this.graphics.moveTo(0, 0);
        this.graphics.lineTo(0, 1);
        this.graphics.lineTo(1, 1);
        this.graphics.lineTo(1, 0);
        this.graphics.lineTo(0, 0);
        this.graphics.endFill();

        this.container = new PIXI.Container();
        this.container.xCoord = xCoord;
        this.container.yCoord = yCoord;
        this.container.addChild(this.graphics);
    }

    toString() {
        return this.xCoord + "," + this.yCoord;
    }

    equals(other) {
        return this.xCoord === other.xCoord && this.yCoord === other.yCoord;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tile;
;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socket__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hud__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__building__ = __webpack_require__(0);






class Game {
    constructor() {
        this.socket = new __WEBPACK_IMPORTED_MODULE_1__socket__["a" /* default */]();
        this.app = new PIXI.Application(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* default */].CANVAS_WIDTH, __WEBPACK_IMPORTED_MODULE_3__constants__["a" /* default */].CANVAS_HEIGHT);
        document.body.appendChild(this.app.view);

        this._setupBackground();

        this.map = new __WEBPACK_IMPORTED_MODULE_0__map__["a" /* default */]();
        this.app.stage.addChild(this.map.container);
        this.map.container.scale.x = this.map.container.scale.y = 10;
        this.app.stage.interactive = true;

        this.addListeners();
        this.addEventListeners();

        this.hud = new __WEBPACK_IMPORTED_MODULE_2__hud__["a" /* default */](180);
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
        bgGraphics.lineTo(0, __WEBPACK_IMPORTED_MODULE_3__constants__["a" /* default */].CANVAS_HEIGHT);
        bgGraphics.lineTo(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* default */].CANVAS_WIDTH, __WEBPACK_IMPORTED_MODULE_3__constants__["a" /* default */].CANVAS_HEIGHT);
        bgGraphics.lineTo(__WEBPACK_IMPORTED_MODULE_3__constants__["a" /* default */].CANVAS_WIDTH, 0);
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

            if (this.map.canPlaceBuilding(new __WEBPACK_IMPORTED_MODULE_4__building__["a" /* default */](Math.floor(pos.x), Math.floor(pos.y), 16, 16, "a"))) {
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

        const characterListener = this.socket.listener.addListener('buildings', (message) => {
            console.log("Character update no listener");
        });

        characterListener.addListener('full', (obj) => {
            obj.forEach(c => {
                this.map.addCharacter(c.x, c.y, c.id);
            });
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;
;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(3);


const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Button {
    constructor(title, callback) {
        this.title = title;
        this.callback = callback;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Button;
;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity__ = __webpack_require__(1);


class Character extends __WEBPACK_IMPORTED_MODULE_0__entity__["a" /* default */] {
    constructor(xCoord, yCoord, id) {
        super(id);
        this.container = new PIXI.Container();
        this.xCoord = xCoord;
        this.yCoord = yCoord;

        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xFF5533);
        this.graphics.drawCircle(0, 0, 10);
        this.graphics.endFill();

        this.container.addChild(this.graphics);
        this.container.x = xCoord;
        this.container.y = yCoord;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Character;
;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    PIXEL_PER_TILE: 100,
    CANVAS_HEIGHT: document.documentElement.clientHeight,
    CANVAS_WIDTH: document.documentElement.clientWidth
});



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button__ = __webpack_require__(5);


class Hud {
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
            new __WEBPACK_IMPORTED_MODULE_0__button__["a" /* default */]("Button 1", (event) => {
                console.log("hello");
            }),
            new __WEBPACK_IMPORTED_MODULE_0__button__["a" /* default */]("Build", (event) => {
                console.log("build!");
            })
        ];

        const $buttons = $('.buttons');

        buttons.forEach(button => {
            console.log(button);
            $buttons.append('<div class="button">' + button.title + '</div>');
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Hud;




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Listener {
    constructor(fun){
        this.fun = fun;
        this.listeners = {};
    }

    addListener(name, fun){
        this.listeners[name] = new Listener(fun);
        return this.listeners[name];
    }

    doCall(m) {
        if ("type" in m && m.type in this.listeners) {
            this.listeners[m.type].doCall(m.message);
        } else {
            this.fun(m);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Listener;




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__building__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tile__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__character__ = __webpack_require__(6);




class Map {
    constructor() {
        this.container = new PIXI.Container();
        this.buildings = {};
        this.characters = {};

        // Map from tile coordinates to building on the tile.
        this._usedTiles = {};

        let tile = new __WEBPACK_IMPORTED_MODULE_1__tile__["a" /* default */](0, 0);
        let tile2 = new __WEBPACK_IMPORTED_MODULE_1__tile__["a" /* default */](1, 1);
        this.container.addChild(tile.container);
        this.container.addChild(tile2.container);
    }

    addBuilding(xCoord, yCoord, width, height, id) {
        const building = new __WEBPACK_IMPORTED_MODULE_0__building__["a" /* default */](xCoord, yCoord, width, height, id);

        this.buildings[id] = building;
        this.container.addChild(building.container);

        building.tiles().forEach(tile => {
            this._usedTiles[tile.toString()] = building.id;
        });
    }

    addCharacter(xCoord, yCoord, id) {
        const character = new __WEBPACK_IMPORTED_MODULE_2__character__["a" /* default */](xCoord, yCoord, id);

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
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Map;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listener__ = __webpack_require__(9);


class Socket {
    constructor() {
        this.sock = new WebSocket("ws://localhost:4567/socket");
        this.listener = new __WEBPACK_IMPORTED_MODULE_0__listener__["a" /* default */]((obj) => {
            console.log("No listener registered");
            console.log(obj);
        });

        this.sock.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("RECIEVED MESSAGE OF TYPE: " + data.type);
            console.log(data);
            this.listener.doCall(data);
        }
    };

    send(type, message) {
        console.log("\n\n\n\nSENDING " + type + ". Message: " + message
            + ". Endpoint: " + this.endpoint);
        this.sock.send(type + ":" + message);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Socket;
;



/***/ })
/******/ ]);