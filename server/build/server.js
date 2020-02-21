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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./player.js":
/*!*******************!*\
  !*** ./player.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server */ "./server.js");
/* harmony import */ var _tetris__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tetris */ "./tetris.js");
/* harmony import */ var _playfield__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playfield */ "./playfield.js");



const autoBind = __webpack_require__(/*! auto-bind */ "auto-bind");

class Player {
    constructor() {
        autoBind(this);
        this.session = null;
        this.playfield = new _playfield__WEBPACK_IMPORTED_MODULE_2__["default"](Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["createPlayfield"])());
        this.name = "";
        this.currentTetromino = null;
        this.nextTetromino = null;
        this.nextTetrominoIndex = 0;
        this.socketID = false;
        this.tetrominos = null;
    }

    play() {
        if (this.currentTetromino) {
            this.currentTetromino.eraseTetromino(this.playfield.playfield);
            this.currentTetromino.position[1] += 1;
            if (this.playfield.collisionDetected(this.currentTetromino)) {
                this.currentTetromino.position[1] -= 1;
                this.currentTetromino.drawTetromino(this.playfield.playfield);
                let clearedLines = this.playfield.clearFilledLines(this.currentTetromino);
                for (let i = 0; i < clearedLines; i++) {
                    this.session.disableLines(this);
                }
                this.newTetromino();
                Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitPlayfield"])(this);
            } else
                this.currentTetromino.drawTetromino(this.playfield.playfield);
        }
        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitTetromino"])(this);
    }

    newTetromino() {
        this.currentTetromino = this.nextTetromino;
        this.nextTetrominoIndex++;
        if (!this.session.tetrominos[this.nextTetrominoIndex])
            this.session.newTetromino();
        this.nextTetromino = Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["copyTetromino"])(this.session.tetrominos[this.nextTetrominoIndex]);
        Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])('nextTetromino', this.nextTetromino, this.socketID);
    }

    rotate() {
        this.currentTetromino.rotate(this.playfield);
        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitTetromino"])(this);
    }

    moveLeft() {
        this.currentTetromino.moveLeft(this.playfield);
        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitTetromino"])(this);
    };

    moveRight() {
        this.currentTetromino.moveRight(this.playfield);
        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitTetromino"])(this);
    };

    disableLine() {
        for (let row = 0; row < this.playfield.length - 1; row++) {
            for (let column = 0; column < 10; column++) {
                this.playfield[row][column] = this.playfield[row + 1][column];
            }
        }
        for (let column = 0; column < 10; column++) {
            this.playfield[this.playfield.length - 1][column] = 'gray';
        }
    }
}


/***/ }),

/***/ "./playfield.js":
/*!**********************!*\
  !*** ./playfield.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Playfield; });
/* harmony import */ var auto_bind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! auto-bind */ "auto-bind");
/* harmony import */ var auto_bind__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(auto_bind__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tetris__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tetris */ "./tetris.js");



class Playfield {
    constructor(playfield) {
        auto_bind__WEBPACK_IMPORTED_MODULE_0___default()(this);
        this.playfield = playfield;
    }

    collisionDetected(currentTetromino) {
        let row = 0;
        while (row < 4) {
            let column = 0;
            while (column < 4) {
                if (currentTetromino.shape[row][column]) {
                    if (this.playfield.length - 1 < currentTetromino.position[1] + row || this.playfield[0].length - 1 < currentTetromino.position[0] + column)
                        return true;
                    if (currentTetromino.position[0] + column < 0)
                        return true;
                    if (this.playfield[currentTetromino.position[1] + row]) {
                        if (this.playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column]) {
                            if (this.playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] !== _tetris__WEBPACK_IMPORTED_MODULE_1__["defaultColor"])
                                return true;
                        }
                    }
                }
                column += 1;
            }
            row += 1;
        }
        return false;
    }

    lineIsFilled(line) {
        return !line.some(cell => cell === _tetris__WEBPACK_IMPORTED_MODULE_1__["defaultColor"] || cell === _tetris__WEBPACK_IMPORTED_MODULE_1__["disabledColor"]);
    }

    clearLine(line) {
        for (let i = 0; i < line.length; i++) {
            line[i] = _tetris__WEBPACK_IMPORTED_MODULE_1__["defaultColor"];
        }
    }

    collapseLines(i) {
        for (let row = i; row > 0; row--) {
            for (let column = 0; column < 10; column++) {
                this.playfield[row][column] = this.playfield[row - 1][column];
            }
        }
    }

    clearFilledLines(currentTetromino) {
        let currentLineIndex = currentTetromino.position[1];
        const lastClearableLineIndex = currentLineIndex + 4;
        let clearedLines = 0;

        while (currentLineIndex < lastClearableLineIndex) {
            if (this.playfield[currentLineIndex]) {
                if (this.lineIsFilled(this.playfield[currentLineIndex])) {
                    this.clearLine(this.playfield[currentLineIndex]);
                    this.collapseLines(currentLineIndex, this.playfield);
                    clearedLines++;
                }
            }
            currentLineIndex += 1;
        }
        return (clearedLines);
    }
}


/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! exports provided: interval, emit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return interval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emit", function() { return emit; });
/* harmony import */ var _tetris__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tetris */ "./tetris.js");


const http = __webpack_require__(/*! http */ "http");
const Server = __webpack_require__(/*! socket.io */ "socket.io");
const io = new Server(http,{
    path:"../client/build",
    serveClient: true
});

let interval = 150;

io.on('connection', (client) => {
    console.log("\nConnection happened.");
    client.on('Hash', function (string) {
        Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["joinTetris"])(string, client.id);
    });
    client.on('ArrowUp', (usernameAndRoom) => {
        Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["rotateCurrentTetromino"])(usernameAndRoom);
    });
    client.on('ArrowDown', () => {
        interval = 50;
    });
    client.on('ArrowDownUnpressed', () => {
        interval = 300;
    });
    client.on('ArrowLeft', (usernameAndRoom) => {
        Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["moveLeft"])(usernameAndRoom);
    });
    client.on('ArrowRight', (usernameAndRoom) => {
        Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["moveRight"])(usernameAndRoom);
    })
});

const emit = (event, args, socketID) => {
    io.to(`${socketID}`).emit(event, args);
};

const on = (event, callback, emit) => {

};

const port = 8000;
io.listen(port);
console.log('listening on port ', port);


/***/ }),

/***/ "./tetris.js":
/*!*******************!*\
  !*** ./tetris.js ***!
  \*******************/
/*! exports provided: defaultColor, disabledColor, createPlayfield, emitEvents, emitPlayfield, emitTetromino, copyTetromino, moveLeft, moveRight, rotateCurrentTetromino, joinTetris */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultColor", function() { return defaultColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disabledColor", function() { return disabledColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPlayfield", function() { return createPlayfield; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emitEvents", function() { return emitEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emitPlayfield", function() { return emitPlayfield; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emitTetromino", function() { return emitTetromino; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyTetromino", function() { return copyTetromino; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveLeft", function() { return moveLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveRight", function() { return moveRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateCurrentTetromino", function() { return rotateCurrentTetromino; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "joinTetris", function() { return joinTetris; });
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server */ "./server.js");
/* harmony import */ var _tetromino__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tetromino */ "./tetromino.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./player.js");
/* harmony import */ var _tetrominos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tetrominos */ "./tetrominos.js");





const autoBind = __webpack_require__(/*! auto-bind */ "auto-bind");

const defaultColor = 'gray';
const disabledColor = 'pink';

function createPlayfield() {
    return [...new Array(20)].map(() => {
        return [...new Array(10)].map(() => defaultColor);
    });
}

function emitEvents(thisPlayer) {
    Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])('playfield', thisPlayer.playfield.playfield, thisPlayer.socketID);
}

function emitPlayfield(thisPlayer) {
    thisPlayer.currentTetromino.eraseTetromino(thisPlayer.playfield.playfield);
    Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])('playfield', thisPlayer.playfield.playfield, thisPlayer.socketID);
    thisPlayer.currentTetromino.drawTetromino(thisPlayer.playfield.playfield);
}

function emitTetromino(thisPlayer) {
    Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])('tetromino', thisPlayer.currentTetromino, thisPlayer.socketID);
}

class GameSession {
    constructor() {
        autoBind(this);
        this.room = "";
        this.host = "";
        this.players = Array();
        this.tetrominos = Array(createTetromino(), createTetromino());
    }

    newTetromino() {
        this.tetrominos.push(createTetromino());
    }

    disableLines(user) {
        this.players.forEach(element => {
            if (element !== user) {
                element.disableLine();
            }
        });
    }
}

const tetrominos = [new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Line"][0], 'cyan', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Line"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["L"][0], 'orange', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["L"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["ReverseL"][0], "blue", [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["ReverseL"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Square"][0], 'yellow', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Square"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["S"][0], 'green', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["S"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Z"][0], 'red', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Z"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["T"][0], 'purple', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["T"])];

function createTetromino() {
    const index = Math.floor(Math.random() * tetrominos.length);

    return tetrominos[index];
}

const sessions = Array();

function findGameSession(room) {
    return sessions.find(element => element.room === room);
}

function findUserInSession(room, username) {
    const session = findGameSession(room);
    if (!session)
        return;

    return session.players.find(user => user.name === username);
}

const copyTetromino = (tetromino) => {
    return new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](tetromino.shape, tetromino.color, [0, -1], tetromino.rotationArray);
};

function createPlayer(session, name, socketID) {
    const player = new _player__WEBPACK_IMPORTED_MODULE_2__["default"]();
    player.session = session;
    player.name = name;
    player.socketID = socketID;
    session.players.push(player);
    player.currentTetromino = copyTetromino(session.tetrominos[0]);
    player.nextTetromino = copyTetromino(session.tetrominos[1]);
    return player;
}

function createGameSession(room, host) {
    const session = new GameSession();
    session.room = room;
    session.host = host;

    sessions.push(session);

    return session;
}
function moveLeft(usernameAndRoom) {
    const player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
    player.moveLeft();
}

function moveRight(usernameAndRoom) {
    const player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
    player.moveRight();
}

function rotateCurrentTetromino(usernameAndRoom) {
    const player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
    player.rotate();
}

function getUser(room, username, socketID) {
    const session = findGameSession(room) || createGameSession(room, username, socketID);

    const user = findUserInSession(room, username);

    if (!user) {
        console.log(`User "${username}" not found in session, adding...`);
        return createPlayer(session, username, socketID);
    } else {
        console.log(`User "${username}" is already in session.`);
        user.socketID = socketID;
        emitPlayfield(user);
    }
}

function parseUsername(split) {
    return split[1]
        ? split[1].slice(0, split[1].length - 1)
        : undefined;
}

function joinTetris(hash, socketID) {
    const split = hash.split('[');
    const room = split[0].slice(1);
    const username = parseUsername(split);

    console.log("joinTetris() called");
    console.log(`User "${username}" tried to connect to room: "${room}"`);

    const user = getUser(room, username, socketID);
    setInterval(() => {
        if (user)
            user.play()
    }, _server__WEBPACK_IMPORTED_MODULE_0__["interval"]);

}


/***/ }),

/***/ "./tetromino.js":
/*!**********************!*\
  !*** ./tetromino.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tetromino; });

const autoBind = __webpack_require__(/*! auto-bind */ "auto-bind");

class Tetromino {
    constructor(shape, color, position, rotationArray) {
        autoBind(this);
        this.shape = shape;
        this.color = color;
        this.position = position;
        this.rotationArray = rotationArray;
    }

    drawTetromino(playfield) {
        let row = 0;
        while (row < 4) {
            let column = 0;
            while (column < 4) {
                if (playfield[this.position[1] + row]) {
                    if (playfield[this.position[1] + row][this.position[0] + column] && this.shape[row][column]) {
                        playfield[this.position[1] + row][this.position[0] + column] = this.color;
                    }
                }
                column += 1;
            }
            row += 1;
        }
    }

    eraseTetromino(playfield) {
        let row = 0;
        while (row < 4) {
            let column = 0;
            while (column < 4) {
                if (playfield[this.position[1] + row]) {
                    if (playfield[this.position[1] + row][this.position[0] + column] && this.shape[row][column]) {
                        playfield[this.position[1] + row][this.position[0] + column] = 'gray';
                    }
                }
                column += 1;
            }
            row += 1;
        }
    }

    moveLeft(playfield) {
        this.eraseTetromino(playfield.playfield, this);
        this.position[0] -= 1;
        if (playfield.collisionDetected(this))
            this.position[0] += 1;
        this.drawTetromino(playfield.playfield, this);
    };

    moveRight(playfield) {
        this.eraseTetromino(playfield.playfield, this);
        this.position[0] += 1;
        if (playfield.collisionDetected(this))
            this.position[0] -= 1;
        this.drawTetromino(playfield.playfield, this);
    };

    rotate(playfield) {
        this.eraseTetromino(playfield.playfield, this);
        if (this.rotationArray.indexOf(this.shape) === this.rotationArray.length - 1) {
            this.shape = this.rotationArray[0];
        } else {
            this.shape = this.rotationArray[this.rotationArray.indexOf(this.shape) + 1];
        }
        if (playfield.collisionDetected(this))
            this._wallKick(playfield);
        this.drawTetromino(playfield.playfield);
    }

    _wallKick(playfield) {
        if (this._tryTetrominoPosition([this.position[0] - 1, this.position[1]], playfield)) {
            return;
        }
        if (this._tryTetrominoPosition([this.position[0] + 1, this.position[1]], playfield)) {
            return;
        }
        if (this._tryTetrominoPosition([this.position[0], this.position[1] - 1], playfield)) {
            return;
        }
        if (this._tryTetrominoPosition([this.position[0], this.position[1] + 1], playfield)) {
            return;
        }
        if (this._tryTetrominoPosition([this.position[0] - 2, this.position[1]], playfield)) {
            return;
        }
        if (this._tryTetrominoPosition([this.position[0] + 2, this.position[1]], playfield)) {
            return;
        }
        if (this._tryTetrominoPosition([this.position[0], this.position[1] - 2], playfield)) {
            return;
        }
        if (this._tryTetrominoPosition([this.position[0], this.position[1] + 2], playfield)) {
            return;
        }
        this._unrotate();
    }

    _unrotate() {
        if (this.rotationArray.indexOf(this.shape) < 1) {
            this.shape = this.rotationArray[this.rotationArray.length - 1];
        } else {
            this.shape = this.rotationArray[this.rotationArray.indexOf(this.shape) - 1];
        }
    }

    _tryTetrominoPosition(position, playfield) {
        const tmp = [...this.position];

        this.position[0] = position[0];
        this.position[1] = position[1];
        if (playfield.collisionDetected(this)) {
            this.position[0] = tmp[0];
            this.position[1] = tmp[1];
            return false;
        }
        return true;
    }

}


/***/ }),

/***/ "./tetrominos.js":
/*!***********************!*\
  !*** ./tetrominos.js ***!
  \***********************/
/*! exports provided: Square, Line, T, L, ReverseL, S, Z */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Square", function() { return Square; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return Line; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "T", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return L; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReverseL", function() { return ReverseL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "S", function() { return S; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return Z; });

const Square = [
    [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]];

const Line = [
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
    ]];

const T = [
    [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
    ]];

const L = [
    [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
    ]];

const ReverseL = [
    [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]
    ]];

const S = [
    [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
    ]];

const Z = [
    [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0]
    ]];


/***/ }),

/***/ "auto-bind":
/*!****************************!*\
  !*** external "auto-bind" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("auto-bind");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGxheWVyLmpzIiwid2VicGFjazovLy8uL3BsYXlmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGV0cmlzLmpzIiwid2VicGFjazovLy8uL3RldHJvbWluby5qcyIsIndlYnBhY2s6Ly8vLi90ZXRyb21pbm9zLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF1dG8tYmluZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb2NrZXQuaW9cIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEI7QUFDd0Q7QUFDbEQ7QUFDcEMsaUJBQWlCLG1CQUFPLENBQUMs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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25LQSxzQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zZXJ2ZXIuanNcIik7XG4iLCJpbXBvcnQge2VtaXR9IGZyb20gXCIuL3NlcnZlclwiO1xuaW1wb3J0IHtjb3B5VGV0cm9taW5vLCBjcmVhdGVQbGF5ZmllbGQsIGVtaXRQbGF5ZmllbGQsIGVtaXRUZXRyb21pbm99IGZyb20gXCIuL3RldHJpc1wiO1xuaW1wb3J0IFBsYXlmaWVsZCBmcm9tIFwiLi9wbGF5ZmllbGRcIjtcbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZSgnYXV0by1iaW5kJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNlc3Npb24gPSBudWxsO1xuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IG5ldyBQbGF5ZmllbGQoY3JlYXRlUGxheWZpZWxkKCkpO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8gPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm8gPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm9JbmRleCA9IDA7XG4gICAgICAgIHRoaXMuc29ja2V0SUQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zID0gbnVsbDtcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VGV0cm9taW5vKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArPSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMuY3VycmVudFRldHJvbWlubykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gLT0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICAgICAgICAgIGxldCBjbGVhcmVkTGluZXMgPSB0aGlzLnBsYXlmaWVsZC5jbGVhckZpbGxlZExpbmVzKHRoaXMuY3VycmVudFRldHJvbWlubyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGVhcmVkTGluZXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlc3Npb24uZGlzYWJsZUxpbmVzKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5ld1RldHJvbWlubygpO1xuICAgICAgICAgICAgICAgIGVtaXRQbGF5ZmllbGQodGhpcyk7XG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgfVxuXG4gICAgbmV3VGV0cm9taW5vKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8gPSB0aGlzLm5leHRUZXRyb21pbm87XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlub0luZGV4Kys7XG4gICAgICAgIGlmICghdGhpcy5zZXNzaW9uLnRldHJvbWlub3NbdGhpcy5uZXh0VGV0cm9taW5vSW5kZXhdKVxuICAgICAgICAgICAgdGhpcy5zZXNzaW9uLm5ld1RldHJvbWlubygpO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm8gPSBjb3B5VGV0cm9taW5vKHRoaXMuc2Vzc2lvbi50ZXRyb21pbm9zW3RoaXMubmV4dFRldHJvbWlub0luZGV4XSk7XG4gICAgICAgIGVtaXQoJ25leHRUZXRyb21pbm8nLCB0aGlzLm5leHRUZXRyb21pbm8sIHRoaXMuc29ja2V0SUQpO1xuICAgIH1cblxuICAgIHJvdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLnJvdGF0ZSh0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgfVxuXG4gICAgbW92ZUxlZnQoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5tb3ZlTGVmdCh0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgfTtcblxuICAgIG1vdmVSaWdodCgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLm1vdmVSaWdodCh0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgfTtcblxuICAgIGRpc2FibGVMaW5lKCkge1xuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLnBsYXlmaWVsZC5sZW5ndGggLSAxOyByb3crKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGRbcm93XVtjb2x1bW5dID0gdGhpcy5wbGF5ZmllbGRbcm93ICsgMV1bY29sdW1uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgIHRoaXMucGxheWZpZWxkW3RoaXMucGxheWZpZWxkLmxlbmd0aCAtIDFdW2NvbHVtbl0gPSAnZ3JheSc7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgYXV0b0JpbmQgZnJvbSBcImF1dG8tYmluZFwiO1xuaW1wb3J0IHtkZWZhdWx0Q29sb3IsIGRpc2FibGVkQ29sb3J9IGZyb20gXCIuL3RldHJpc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZmllbGQge1xuICAgIGNvbnN0cnVjdG9yKHBsYXlmaWVsZCkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wbGF5ZmllbGQgPSBwbGF5ZmllbGQ7XG4gICAgfVxuXG4gICAgY29sbGlzaW9uRGV0ZWN0ZWQoY3VycmVudFRldHJvbWlubykge1xuICAgICAgICBsZXQgcm93ID0gMDtcbiAgICAgICAgd2hpbGUgKHJvdyA8IDQpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA8IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRldHJvbWluby5zaGFwZVtyb3ddW2NvbHVtbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkLmxlbmd0aCAtIDEgPCBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93IHx8IHRoaXMucGxheWZpZWxkWzBdLmxlbmd0aCAtIDEgPCBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uIDwgMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGRbY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XVtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XVtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uXSAhPT0gZGVmYXVsdENvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdyArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsaW5lSXNGaWxsZWQobGluZSkge1xuICAgICAgICByZXR1cm4gIWxpbmUuc29tZShjZWxsID0+IGNlbGwgPT09IGRlZmF1bHRDb2xvciB8fCBjZWxsID09PSBkaXNhYmxlZENvbG9yKTtcbiAgICB9XG5cbiAgICBjbGVhckxpbmUobGluZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpbmVbaV0gPSBkZWZhdWx0Q29sb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2xsYXBzZUxpbmVzKGkpIHtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gaTsgcm93ID4gMDsgcm93LS0pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkW3Jvd11bY29sdW1uXSA9IHRoaXMucGxheWZpZWxkW3JvdyAtIDFdW2NvbHVtbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckZpbGxlZExpbmVzKGN1cnJlbnRUZXRyb21pbm8pIHtcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lSW5kZXggPSBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdO1xuICAgICAgICBjb25zdCBsYXN0Q2xlYXJhYmxlTGluZUluZGV4ID0gY3VycmVudExpbmVJbmRleCArIDQ7XG4gICAgICAgIGxldCBjbGVhcmVkTGluZXMgPSAwO1xuXG4gICAgICAgIHdoaWxlIChjdXJyZW50TGluZUluZGV4IDwgbGFzdENsZWFyYWJsZUxpbmVJbmRleCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkW2N1cnJlbnRMaW5lSW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGluZUlzRmlsbGVkKHRoaXMucGxheWZpZWxkW2N1cnJlbnRMaW5lSW5kZXhdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyTGluZSh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VMaW5lcyhjdXJyZW50TGluZUluZGV4LCB0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyZWRMaW5lcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRMaW5lSW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGNsZWFyZWRMaW5lcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtqb2luVGV0cmlzLCBtb3ZlTGVmdCwgbW92ZVJpZ2h0LCByb3RhdGVDdXJyZW50VGV0cm9taW5vfSBmcm9tIFwiLi90ZXRyaXNcIjtcblxuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IFNlcnZlciA9IHJlcXVpcmUoJ3NvY2tldC5pbycpO1xuY29uc3QgaW8gPSBuZXcgU2VydmVyKGh0dHAse1xuICAgIHBhdGg6XCIuLi9jbGllbnQvYnVpbGRcIixcbiAgICBzZXJ2ZUNsaWVudDogdHJ1ZVxufSk7XG5cbmV4cG9ydCBsZXQgaW50ZXJ2YWwgPSAxNTA7XG5cbmlvLm9uKCdjb25uZWN0aW9uJywgKGNsaWVudCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiXFxuQ29ubmVjdGlvbiBoYXBwZW5lZC5cIik7XG4gICAgY2xpZW50Lm9uKCdIYXNoJywgZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICBqb2luVGV0cmlzKHN0cmluZywgY2xpZW50LmlkKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oJ0Fycm93VXAnLCAodXNlcm5hbWVBbmRSb29tKSA9PiB7XG4gICAgICAgIHJvdGF0ZUN1cnJlbnRUZXRyb21pbm8odXNlcm5hbWVBbmRSb29tKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oJ0Fycm93RG93bicsICgpID0+IHtcbiAgICAgICAgaW50ZXJ2YWwgPSA1MDtcbiAgICB9KTtcbiAgICBjbGllbnQub24oJ0Fycm93RG93blVucHJlc3NlZCcsICgpID0+IHtcbiAgICAgICAgaW50ZXJ2YWwgPSAzMDA7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKCdBcnJvd0xlZnQnLCAodXNlcm5hbWVBbmRSb29tKSA9PiB7XG4gICAgICAgIG1vdmVMZWZ0KHVzZXJuYW1lQW5kUm9vbSk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKCdBcnJvd1JpZ2h0JywgKHVzZXJuYW1lQW5kUm9vbSkgPT4ge1xuICAgICAgICBtb3ZlUmlnaHQodXNlcm5hbWVBbmRSb29tKTtcbiAgICB9KVxufSk7XG5cbmV4cG9ydCBjb25zdCBlbWl0ID0gKGV2ZW50LCBhcmdzLCBzb2NrZXRJRCkgPT4ge1xuICAgIGlvLnRvKGAke3NvY2tldElEfWApLmVtaXQoZXZlbnQsIGFyZ3MpO1xufTtcblxuY29uc3Qgb24gPSAoZXZlbnQsIGNhbGxiYWNrLCBlbWl0KSA9PiB7XG5cbn07XG5cbmNvbnN0IHBvcnQgPSA4MDAwO1xuaW8ubGlzdGVuKHBvcnQpO1xuY29uc29sZS5sb2coJ2xpc3RlbmluZyBvbiBwb3J0ICcsIHBvcnQpO1xuIiwiaW1wb3J0IHtlbWl0LCBpbnRlcnZhbH0gZnJvbSBcIi4vc2VydmVyXCI7XG5pbXBvcnQgVGV0cm9taW5vIGZyb20gXCIuL3RldHJvbWlub1wiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7TCwgTGluZSwgUmV2ZXJzZUwsIFMsIFNxdWFyZSwgVCwgWn0gZnJvbSBcIi4vdGV0cm9taW5vc1wiO1xuXG5jb25zdCBhdXRvQmluZCA9IHJlcXVpcmUoJ2F1dG8tYmluZCcpO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdENvbG9yID0gJ2dyYXknO1xuZXhwb3J0IGNvbnN0IGRpc2FibGVkQ29sb3IgPSAncGluayc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZmllbGQoKSB7XG4gICAgcmV0dXJuIFsuLi5uZXcgQXJyYXkoMjApXS5tYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gWy4uLm5ldyBBcnJheSgxMCldLm1hcCgoKSA9PiBkZWZhdWx0Q29sb3IpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEV2ZW50cyh0aGlzUGxheWVyKSB7XG4gICAgZW1pdCgncGxheWZpZWxkJywgdGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzUGxheWVyLnNvY2tldElEKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRQbGF5ZmllbGQodGhpc1BsYXllcikge1xuICAgIHRoaXNQbGF5ZXIuY3VycmVudFRldHJvbWluby5lcmFzZVRldHJvbWlubyh0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgIGVtaXQoJ3BsYXlmaWVsZCcsIHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpc1BsYXllci5zb2NrZXRJRCk7XG4gICAgdGhpc1BsYXllci5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRUZXRyb21pbm8odGhpc1BsYXllcikge1xuICAgIGVtaXQoJ3RldHJvbWlubycsIHRoaXNQbGF5ZXIuY3VycmVudFRldHJvbWlubywgdGhpc1BsYXllci5zb2NrZXRJRCk7XG59XG5cbmNsYXNzIEdhbWVTZXNzaW9uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucm9vbSA9IFwiXCI7XG4gICAgICAgIHRoaXMuaG9zdCA9IFwiXCI7XG4gICAgICAgIHRoaXMucGxheWVycyA9IEFycmF5KCk7XG4gICAgICAgIHRoaXMudGV0cm9taW5vcyA9IEFycmF5KGNyZWF0ZVRldHJvbWlubygpLCBjcmVhdGVUZXRyb21pbm8oKSk7XG4gICAgfVxuXG4gICAgbmV3VGV0cm9taW5vKCkge1xuICAgICAgICB0aGlzLnRldHJvbWlub3MucHVzaChjcmVhdGVUZXRyb21pbm8oKSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZUxpbmVzKHVzZXIpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdXNlcikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzYWJsZUxpbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jb25zdCB0ZXRyb21pbm9zID0gW25ldyBUZXRyb21pbm8oTGluZVswXSwgJ2N5YW4nLCBbMCwgLTFdLCBMaW5lKSxcbiAgICBuZXcgVGV0cm9taW5vKExbMF0sICdvcmFuZ2UnLCBbMCwgLTFdLCBMKSxcbiAgICBuZXcgVGV0cm9taW5vKFJldmVyc2VMWzBdLCBcImJsdWVcIiwgWzAsIC0xXSwgUmV2ZXJzZUwpLFxuICAgIG5ldyBUZXRyb21pbm8oU3F1YXJlWzBdLCAneWVsbG93JywgWzAsIC0xXSwgU3F1YXJlKSxcbiAgICBuZXcgVGV0cm9taW5vKFNbMF0sICdncmVlbicsIFswLCAtMV0sIFMpLFxuICAgIG5ldyBUZXRyb21pbm8oWlswXSwgJ3JlZCcsIFswLCAtMV0sIFopLFxuICAgIG5ldyBUZXRyb21pbm8oVFswXSwgJ3B1cnBsZScsIFswLCAtMV0sIFQpXTtcblxuZnVuY3Rpb24gY3JlYXRlVGV0cm9taW5vKCkge1xuICAgIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGV0cm9taW5vcy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHRldHJvbWlub3NbaW5kZXhdO1xufVxuXG5jb25zdCBzZXNzaW9ucyA9IEFycmF5KCk7XG5cbmZ1bmN0aW9uIGZpbmRHYW1lU2Vzc2lvbihyb29tKSB7XG4gICAgcmV0dXJuIHNlc3Npb25zLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50LnJvb20gPT09IHJvb20pO1xufVxuXG5mdW5jdGlvbiBmaW5kVXNlckluU2Vzc2lvbihyb29tLCB1c2VybmFtZSkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBmaW5kR2FtZVNlc3Npb24ocm9vbSk7XG4gICAgaWYgKCFzZXNzaW9uKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gc2Vzc2lvbi5wbGF5ZXJzLmZpbmQodXNlciA9PiB1c2VyLm5hbWUgPT09IHVzZXJuYW1lKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvcHlUZXRyb21pbm8gPSAodGV0cm9taW5vKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBUZXRyb21pbm8odGV0cm9taW5vLnNoYXBlLCB0ZXRyb21pbm8uY29sb3IsIFswLCAtMV0sIHRldHJvbWluby5yb3RhdGlvbkFycmF5KTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllcihzZXNzaW9uLCBuYW1lLCBzb2NrZXRJRCkge1xuICAgIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcbiAgICBwbGF5ZXIuc2Vzc2lvbiA9IHNlc3Npb247XG4gICAgcGxheWVyLm5hbWUgPSBuYW1lO1xuICAgIHBsYXllci5zb2NrZXRJRCA9IHNvY2tldElEO1xuICAgIHNlc3Npb24ucGxheWVycy5wdXNoKHBsYXllcik7XG4gICAgcGxheWVyLmN1cnJlbnRUZXRyb21pbm8gPSBjb3B5VGV0cm9taW5vKHNlc3Npb24udGV0cm9taW5vc1swXSk7XG4gICAgcGxheWVyLm5leHRUZXRyb21pbm8gPSBjb3B5VGV0cm9taW5vKHNlc3Npb24udGV0cm9taW5vc1sxXSk7XG4gICAgcmV0dXJuIHBsYXllcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlR2FtZVNlc3Npb24ocm9vbSwgaG9zdCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBuZXcgR2FtZVNlc3Npb24oKTtcbiAgICBzZXNzaW9uLnJvb20gPSByb29tO1xuICAgIHNlc3Npb24uaG9zdCA9IGhvc3Q7XG5cbiAgICBzZXNzaW9ucy5wdXNoKHNlc3Npb24pO1xuXG4gICAgcmV0dXJuIHNlc3Npb247XG59XG5leHBvcnQgZnVuY3Rpb24gbW92ZUxlZnQodXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5tb3ZlTGVmdCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZVJpZ2h0KHVzZXJuYW1lQW5kUm9vbSkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIubW92ZVJpZ2h0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVDdXJyZW50VGV0cm9taW5vKHVzZXJuYW1lQW5kUm9vbSkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIucm90YXRlKCk7XG59XG5cbmZ1bmN0aW9uIGdldFVzZXIocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGZpbmRHYW1lU2Vzc2lvbihyb29tKSB8fCBjcmVhdGVHYW1lU2Vzc2lvbihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpO1xuXG4gICAgY29uc3QgdXNlciA9IGZpbmRVc2VySW5TZXNzaW9uKHJvb20sIHVzZXJuYW1lKTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNlciBcIiR7dXNlcm5hbWV9XCIgbm90IGZvdW5kIGluIHNlc3Npb24sIGFkZGluZy4uLmApO1xuICAgICAgICByZXR1cm4gY3JlYXRlUGxheWVyKHNlc3Npb24sIHVzZXJuYW1lLCBzb2NrZXRJRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYFVzZXIgXCIke3VzZXJuYW1lfVwiIGlzIGFscmVhZHkgaW4gc2Vzc2lvbi5gKTtcbiAgICAgICAgdXNlci5zb2NrZXRJRCA9IHNvY2tldElEO1xuICAgICAgICBlbWl0UGxheWZpZWxkKHVzZXIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VVc2VybmFtZShzcGxpdCkge1xuICAgIHJldHVybiBzcGxpdFsxXVxuICAgICAgICA/IHNwbGl0WzFdLnNsaWNlKDAsIHNwbGl0WzFdLmxlbmd0aCAtIDEpXG4gICAgICAgIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gam9pblRldHJpcyhoYXNoLCBzb2NrZXRJRCkge1xuICAgIGNvbnN0IHNwbGl0ID0gaGFzaC5zcGxpdCgnWycpO1xuICAgIGNvbnN0IHJvb20gPSBzcGxpdFswXS5zbGljZSgxKTtcbiAgICBjb25zdCB1c2VybmFtZSA9IHBhcnNlVXNlcm5hbWUoc3BsaXQpO1xuXG4gICAgY29uc29sZS5sb2coXCJqb2luVGV0cmlzKCkgY2FsbGVkXCIpO1xuICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiB0cmllZCB0byBjb25uZWN0IHRvIHJvb206IFwiJHtyb29tfVwiYCk7XG5cbiAgICBjb25zdCB1c2VyID0gZ2V0VXNlcihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpO1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHVzZXIpXG4gICAgICAgICAgICB1c2VyLnBsYXkoKVxuICAgIH0sIGludGVydmFsKTtcblxufVxuIiwiXG5jb25zdCBhdXRvQmluZCA9IHJlcXVpcmUoJ2F1dG8tYmluZCcpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXRyb21pbm8ge1xuICAgIGNvbnN0cnVjdG9yKHNoYXBlLCBjb2xvciwgcG9zaXRpb24sIHJvdGF0aW9uQXJyYXkpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIHRoaXMucm90YXRpb25BcnJheSA9IHJvdGF0aW9uQXJyYXk7XG4gICAgfVxuXG4gICAgZHJhd1RldHJvbWlubyhwbGF5ZmllbGQpIHtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChjb2x1bW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW3RoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5dICYmIHRoaXMuc2hhcGVbcm93XVtjb2x1bW5dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bdGhpcy5wb3NpdGlvblswXSArIGNvbHVtbl0gPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbHVtbiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlcmFzZVRldHJvbWlubyhwbGF5ZmllbGQpIHtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChjb2x1bW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW3RoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5dICYmIHRoaXMuc2hhcGVbcm93XVtjb2x1bW5dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bdGhpcy5wb3NpdGlvblswXSArIGNvbHVtbl0gPSAnZ3JheSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVMZWZ0KHBsYXlmaWVsZCkge1xuICAgICAgICB0aGlzLmVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzBdIC09IDE7XG4gICAgICAgIGlmIChwbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcykpXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdICs9IDE7XG4gICAgICAgIHRoaXMuZHJhd1RldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICB9O1xuXG4gICAgbW92ZVJpZ2h0KHBsYXlmaWVsZCkge1xuICAgICAgICB0aGlzLmVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzBdICs9IDE7XG4gICAgICAgIGlmIChwbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcykpXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdIC09IDE7XG4gICAgICAgIHRoaXMuZHJhd1RldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICB9O1xuXG4gICAgcm90YXRlKHBsYXlmaWVsZCkge1xuICAgICAgICB0aGlzLmVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgPT09IHRoaXMucm90YXRpb25BcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5WzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVt0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSArIDFdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcykpXG4gICAgICAgICAgICB0aGlzLl93YWxsS2ljayhwbGF5ZmllbGQpO1xuICAgICAgICB0aGlzLmRyYXdUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgfVxuXG4gICAgX3dhbGxLaWNrKHBsYXlmaWVsZCkge1xuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0gLSAxLCB0aGlzLnBvc2l0aW9uWzFdXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSArIDEsIHRoaXMucG9zaXRpb25bMV1dLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdIC0gMV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gKyAxXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSAtIDIsIHRoaXMucG9zaXRpb25bMV1dLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdICsgMiwgdGhpcy5wb3NpdGlvblsxXV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gLSAyXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSArIDJdLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdW5yb3RhdGUoKTtcbiAgICB9XG5cbiAgICBfdW5yb3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbdGhpcy5yb3RhdGlvbkFycmF5Lmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVt0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSAtIDFdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3RyeVRldHJvbWlub1Bvc2l0aW9uKHBvc2l0aW9uLCBwbGF5ZmllbGQpIHtcbiAgICAgICAgY29uc3QgdG1wID0gWy4uLnRoaXMucG9zaXRpb25dO1xuXG4gICAgICAgIHRoaXMucG9zaXRpb25bMF0gPSBwb3NpdGlvblswXTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblsxXSA9IHBvc2l0aW9uWzFdO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdID0gdG1wWzBdO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblsxXSA9IHRtcFsxXTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn1cbiIsIlxuZXhwb3J0IGNvbnN0IFNxdWFyZSA9IFtcbiAgICBbXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuXG5leHBvcnQgY29uc3QgTGluZSA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAxXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuXG5leHBvcnQgY29uc3QgVCA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuXG5leHBvcnQgY29uc3QgTCA9IFtcbiAgICBbXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuXG5leHBvcnQgY29uc3QgUmV2ZXJzZUwgPSBbXG4gICAgW1xuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IFMgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IFogPSBbXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF1dG8tYmluZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTsiXSwic291cmNlUm9vdCI6IiJ9