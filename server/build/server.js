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
        this.interval = 300;
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
        setTimeout(this.play, this.interval);
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

let interval = 300;

io.on('connection', (client) => {
    console.log("\nConnection happened.");
    client.on('Hash', function (string) {
        Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["joinTetris"])(string, client.id);
    });
    client.on('ArrowUp', (usernameAndRoom) => {
        Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["rotateCurrentTetromino"])(usernameAndRoom);
    });
    client.on('ArrowDown', (usernameAndRoom) => {
        Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["setGameInterval"])(usernameAndRoom, 50);
    });
    client.on('ArrowDownUnpressed', (usernameAndRoom) => {
        Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["setGameInterval"])(usernameAndRoom, 300);
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
/*! exports provided: defaultColor, disabledColor, createPlayfield, emitEvents, emitPlayfield, emitTetromino, copyTetromino, setGameInterval, moveLeft, moveRight, rotateCurrentTetromino, joinTetris */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGameInterval", function() { return setGameInterval; });
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

function setGameInterval(usernameAndRoom, gameInterval) {
    const player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
    player.interval = gameInterval;
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
    setTimeout(() => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGxheWVyLmpzIiwid2VicGFjazovLy8uL3BsYXlmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGV0cmlzLmpzIiwid2VicGFjazovLy8uL3RldHJvbWluby5qcyIsIndlYnBhY2s6Ly8vLi90ZXRyb21pbm9zLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF1dG8tYmluZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb2NrZXQuaW9cIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEI7QUFDd0Q7QUFDbEQ7QUFDcEMsaUJBQWlCLG1CQUFPLENBQUMs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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25LQSxzQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zZXJ2ZXIuanNcIik7XG4iLCJpbXBvcnQge2VtaXR9IGZyb20gXCIuL3NlcnZlclwiO1xyXG5pbXBvcnQge2NvcHlUZXRyb21pbm8sIGNyZWF0ZVBsYXlmaWVsZCwgZW1pdFBsYXlmaWVsZCwgZW1pdFRldHJvbWlub30gZnJvbSBcIi4vdGV0cmlzXCI7XHJcbmltcG9ydCBQbGF5ZmllbGQgZnJvbSBcIi4vcGxheWZpZWxkXCI7XHJcbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZSgnYXV0by1iaW5kJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zZXNzaW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IG5ldyBQbGF5ZmllbGQoY3JlYXRlUGxheWZpZWxkKCkpO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlub0luZGV4ID0gMDtcclxuICAgICAgICB0aGlzLnNvY2tldElEID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zID0gbnVsbDtcclxuICAgICAgICB0aGlzLmludGVydmFsID0gMzAwO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRldHJvbWlubykge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICs9IDE7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzLmN1cnJlbnRUZXRyb21pbm8pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gLT0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5kcmF3VGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2xlYXJlZExpbmVzID0gdGhpcy5wbGF5ZmllbGQuY2xlYXJGaWxsZWRMaW5lcyh0aGlzLmN1cnJlbnRUZXRyb21pbm8pO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGVhcmVkTGluZXM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5kaXNhYmxlTGluZXModGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1RldHJvbWlubygpO1xyXG4gICAgICAgICAgICAgICAgZW1pdFBsYXlmaWVsZCh0aGlzKTtcclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xyXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5wbGF5LCB0aGlzLmludGVydmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdUZXRyb21pbm8oKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vID0gdGhpcy5uZXh0VGV0cm9taW5vO1xyXG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlub0luZGV4Kys7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlc3Npb24udGV0cm9taW5vc1t0aGlzLm5leHRUZXRyb21pbm9JbmRleF0pXHJcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5uZXdUZXRyb21pbm8oKTtcclxuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm8gPSBjb3B5VGV0cm9taW5vKHRoaXMuc2Vzc2lvbi50ZXRyb21pbm9zW3RoaXMubmV4dFRldHJvbWlub0luZGV4XSk7XHJcbiAgICAgICAgZW1pdCgnbmV4dFRldHJvbWlubycsIHRoaXMubmV4dFRldHJvbWlubywgdGhpcy5zb2NrZXRJRCk7XHJcbiAgICB9XHJcblxyXG4gICAgcm90YXRlKCkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5yb3RhdGUodGhpcy5wbGF5ZmllbGQpO1xyXG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUxlZnQoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLm1vdmVMZWZ0KHRoaXMucGxheWZpZWxkKTtcclxuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBtb3ZlUmlnaHQoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLm1vdmVSaWdodCh0aGlzLnBsYXlmaWVsZCk7XHJcbiAgICAgICAgZW1pdFRldHJvbWlubyh0aGlzKTtcclxuICAgIH07XHJcblxyXG4gICAgZGlzYWJsZUxpbmUoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5wbGF5ZmllbGQubGVuZ3RoIC0gMTsgcm93KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFtyb3ddW2NvbHVtbl0gPSB0aGlzLnBsYXlmaWVsZFtyb3cgKyAxXVtjb2x1bW5dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFt0aGlzLnBsYXlmaWVsZC5sZW5ndGggLSAxXVtjb2x1bW5dID0gJ2dyYXknO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgYXV0b0JpbmQgZnJvbSBcImF1dG8tYmluZFwiO1xyXG5pbXBvcnQge2RlZmF1bHRDb2xvciwgZGlzYWJsZWRDb2xvcn0gZnJvbSBcIi4vdGV0cmlzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZmllbGQge1xyXG4gICAgY29uc3RydWN0b3IocGxheWZpZWxkKSB7XHJcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZmllbGQgPSBwbGF5ZmllbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29sbGlzaW9uRGV0ZWN0ZWQoY3VycmVudFRldHJvbWlubykge1xyXG4gICAgICAgIGxldCByb3cgPSAwO1xyXG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXRyb21pbm8uc2hhcGVbcm93XVtjb2x1bW5dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkLmxlbmd0aCAtIDEgPCBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93IHx8IHRoaXMucGxheWZpZWxkWzBdLmxlbmd0aCAtIDEgPCBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbiA8IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGRbY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvd11bY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XVtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uXSAhPT0gZGVmYXVsdENvbG9yKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm93ICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBsaW5lSXNGaWxsZWQobGluZSkge1xyXG4gICAgICAgIHJldHVybiAhbGluZS5zb21lKGNlbGwgPT4gY2VsbCA9PT0gZGVmYXVsdENvbG9yIHx8IGNlbGwgPT09IGRpc2FibGVkQ29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyTGluZShsaW5lKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpbmVbaV0gPSBkZWZhdWx0Q29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbGxhcHNlTGluZXMoaSkge1xyXG4gICAgICAgIGZvciAobGV0IHJvdyA9IGk7IHJvdyA+IDA7IHJvdy0tKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGRbcm93XVtjb2x1bW5dID0gdGhpcy5wbGF5ZmllbGRbcm93IC0gMV1bY29sdW1uXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGVhckZpbGxlZExpbmVzKGN1cnJlbnRUZXRyb21pbm8pIHtcclxuICAgICAgICBsZXQgY3VycmVudExpbmVJbmRleCA9IGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV07XHJcbiAgICAgICAgY29uc3QgbGFzdENsZWFyYWJsZUxpbmVJbmRleCA9IGN1cnJlbnRMaW5lSW5kZXggKyA0O1xyXG4gICAgICAgIGxldCBjbGVhcmVkTGluZXMgPSAwO1xyXG5cclxuICAgICAgICB3aGlsZSAoY3VycmVudExpbmVJbmRleCA8IGxhc3RDbGVhcmFibGVMaW5lSW5kZXgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkW2N1cnJlbnRMaW5lSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5saW5lSXNGaWxsZWQodGhpcy5wbGF5ZmllbGRbY3VycmVudExpbmVJbmRleF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckxpbmUodGhpcy5wbGF5ZmllbGRbY3VycmVudExpbmVJbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VMaW5lcyhjdXJyZW50TGluZUluZGV4LCB0aGlzLnBsYXlmaWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJlZExpbmVzKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudExpbmVJbmRleCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKGNsZWFyZWRMaW5lcyk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtqb2luVGV0cmlzLCBtb3ZlTGVmdCwgbW92ZVJpZ2h0LCByb3RhdGVDdXJyZW50VGV0cm9taW5vLCBzZXRHYW1lSW50ZXJ2YWx9IGZyb20gXCIuL3RldHJpc1wiO1xyXG5cclxuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcclxuY29uc3QgU2VydmVyID0gcmVxdWlyZSgnc29ja2V0LmlvJyk7XHJcbmNvbnN0IGlvID0gbmV3IFNlcnZlcihodHRwLHtcclxuICAgIHBhdGg6XCIuLi9jbGllbnQvYnVpbGRcIixcclxuICAgIHNlcnZlQ2xpZW50OiB0cnVlXHJcbn0pO1xyXG5cclxuZXhwb3J0IGxldCBpbnRlcnZhbCA9IDMwMDtcclxuXHJcbmlvLm9uKCdjb25uZWN0aW9uJywgKGNsaWVudCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJcXG5Db25uZWN0aW9uIGhhcHBlbmVkLlwiKTtcclxuICAgIGNsaWVudC5vbignSGFzaCcsIGZ1bmN0aW9uIChzdHJpbmcpIHtcclxuICAgICAgICBqb2luVGV0cmlzKHN0cmluZywgY2xpZW50LmlkKTtcclxuICAgIH0pO1xyXG4gICAgY2xpZW50Lm9uKCdBcnJvd1VwJywgKHVzZXJuYW1lQW5kUm9vbSkgPT4ge1xyXG4gICAgICAgIHJvdGF0ZUN1cnJlbnRUZXRyb21pbm8odXNlcm5hbWVBbmRSb29tKTtcclxuICAgIH0pO1xyXG4gICAgY2xpZW50Lm9uKCdBcnJvd0Rvd24nLCAodXNlcm5hbWVBbmRSb29tKSA9PiB7XHJcbiAgICAgICAgc2V0R2FtZUludGVydmFsKHVzZXJuYW1lQW5kUm9vbSwgNTApO1xyXG4gICAgfSk7XHJcbiAgICBjbGllbnQub24oJ0Fycm93RG93blVucHJlc3NlZCcsICh1c2VybmFtZUFuZFJvb20pID0+IHtcclxuICAgICAgICBzZXRHYW1lSW50ZXJ2YWwodXNlcm5hbWVBbmRSb29tLCAzMDApO1xyXG4gICAgfSk7XHJcbiAgICBjbGllbnQub24oJ0Fycm93TGVmdCcsICh1c2VybmFtZUFuZFJvb20pID0+IHtcclxuICAgICAgICBtb3ZlTGVmdCh1c2VybmFtZUFuZFJvb20pO1xyXG4gICAgfSk7XHJcbiAgICBjbGllbnQub24oJ0Fycm93UmlnaHQnLCAodXNlcm5hbWVBbmRSb29tKSA9PiB7XHJcbiAgICAgICAgbW92ZVJpZ2h0KHVzZXJuYW1lQW5kUm9vbSk7XHJcbiAgICB9KVxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBlbWl0ID0gKGV2ZW50LCBhcmdzLCBzb2NrZXRJRCkgPT4ge1xyXG4gICAgaW8udG8oYCR7c29ja2V0SUR9YCkuZW1pdChldmVudCwgYXJncyk7XHJcbn07XHJcblxyXG5jb25zdCBvbiA9IChldmVudCwgY2FsbGJhY2ssIGVtaXQpID0+IHtcclxuXHJcbn07XHJcblxyXG5jb25zdCBwb3J0ID0gODAwMDtcclxuaW8ubGlzdGVuKHBvcnQpO1xyXG5jb25zb2xlLmxvZygnbGlzdGVuaW5nIG9uIHBvcnQgJywgcG9ydCk7XHJcbiIsImltcG9ydCB7ZW1pdCwgaW50ZXJ2YWx9IGZyb20gXCIuL3NlcnZlclwiO1xyXG5pbXBvcnQgVGV0cm9taW5vIGZyb20gXCIuL3RldHJvbWlub1wiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xyXG5pbXBvcnQge0wsIExpbmUsIFJldmVyc2VMLCBTLCBTcXVhcmUsIFQsIFp9IGZyb20gXCIuL3RldHJvbWlub3NcIjtcclxuXHJcbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZSgnYXV0by1iaW5kJyk7XHJcblxyXG5leHBvcnQgY29uc3QgZGVmYXVsdENvbG9yID0gJ2dyYXknO1xyXG5leHBvcnQgY29uc3QgZGlzYWJsZWRDb2xvciA9ICdwaW5rJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZmllbGQoKSB7XHJcbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheSgyMCldLm1hcCgoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFsuLi5uZXcgQXJyYXkoMTApXS5tYXAoKCkgPT4gZGVmYXVsdENvbG9yKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW1pdEV2ZW50cyh0aGlzUGxheWVyKSB7XHJcbiAgICBlbWl0KCdwbGF5ZmllbGQnLCB0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXNQbGF5ZXIuc29ja2V0SUQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW1pdFBsYXlmaWVsZCh0aGlzUGxheWVyKSB7XHJcbiAgICB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkKTtcclxuICAgIGVtaXQoJ3BsYXlmaWVsZCcsIHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpc1BsYXllci5zb2NrZXRJRCk7XHJcbiAgICB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW1pdFRldHJvbWlubyh0aGlzUGxheWVyKSB7XHJcbiAgICBlbWl0KCd0ZXRyb21pbm8nLCB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8sIHRoaXNQbGF5ZXIuc29ja2V0SUQpO1xyXG59XHJcblxyXG5jbGFzcyBHYW1lU2Vzc2lvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBhdXRvQmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnJvb20gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuaG9zdCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gQXJyYXkoKTtcclxuICAgICAgICB0aGlzLnRldHJvbWlub3MgPSBBcnJheShjcmVhdGVUZXRyb21pbm8oKSwgY3JlYXRlVGV0cm9taW5vKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1RldHJvbWlubygpIHtcclxuICAgICAgICB0aGlzLnRldHJvbWlub3MucHVzaChjcmVhdGVUZXRyb21pbm8oKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzYWJsZUxpbmVzKHVzZXIpIHtcclxuICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzYWJsZUxpbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCB0ZXRyb21pbm9zID0gW25ldyBUZXRyb21pbm8oTGluZVswXSwgJ2N5YW4nLCBbMCwgLTFdLCBMaW5lKSxcclxuICAgIG5ldyBUZXRyb21pbm8oTFswXSwgJ29yYW5nZScsIFswLCAtMV0sIEwpLFxyXG4gICAgbmV3IFRldHJvbWlubyhSZXZlcnNlTFswXSwgXCJibHVlXCIsIFswLCAtMV0sIFJldmVyc2VMKSxcclxuICAgIG5ldyBUZXRyb21pbm8oU3F1YXJlWzBdLCAneWVsbG93JywgWzAsIC0xXSwgU3F1YXJlKSxcclxuICAgIG5ldyBUZXRyb21pbm8oU1swXSwgJ2dyZWVuJywgWzAsIC0xXSwgUyksXHJcbiAgICBuZXcgVGV0cm9taW5vKFpbMF0sICdyZWQnLCBbMCwgLTFdLCBaKSxcclxuICAgIG5ldyBUZXRyb21pbm8oVFswXSwgJ3B1cnBsZScsIFswLCAtMV0sIFQpXTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRldHJvbWlubygpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGV0cm9taW5vcy5sZW5ndGgpO1xyXG5cclxuICAgIHJldHVybiB0ZXRyb21pbm9zW2luZGV4XTtcclxufVxyXG5cclxuY29uc3Qgc2Vzc2lvbnMgPSBBcnJheSgpO1xyXG5cclxuZnVuY3Rpb24gZmluZEdhbWVTZXNzaW9uKHJvb20pIHtcclxuICAgIHJldHVybiBzZXNzaW9ucy5maW5kKGVsZW1lbnQgPT4gZWxlbWVudC5yb29tID09PSByb29tKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZFVzZXJJblNlc3Npb24ocm9vbSwgdXNlcm5hbWUpIHtcclxuICAgIGNvbnN0IHNlc3Npb24gPSBmaW5kR2FtZVNlc3Npb24ocm9vbSk7XHJcbiAgICBpZiAoIXNlc3Npb24pXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgIHJldHVybiBzZXNzaW9uLnBsYXllcnMuZmluZCh1c2VyID0+IHVzZXIubmFtZSA9PT0gdXNlcm5hbWUpO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29weVRldHJvbWlubyA9ICh0ZXRyb21pbm8pID0+IHtcclxuICAgIHJldHVybiBuZXcgVGV0cm9taW5vKHRldHJvbWluby5zaGFwZSwgdGV0cm9taW5vLmNvbG9yLCBbMCwgLTFdLCB0ZXRyb21pbm8ucm90YXRpb25BcnJheSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXIoc2Vzc2lvbiwgbmFtZSwgc29ja2V0SUQpIHtcclxuICAgIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuICAgIHBsYXllci5zZXNzaW9uID0gc2Vzc2lvbjtcclxuICAgIHBsYXllci5uYW1lID0gbmFtZTtcclxuICAgIHBsYXllci5zb2NrZXRJRCA9IHNvY2tldElEO1xyXG4gICAgc2Vzc2lvbi5wbGF5ZXJzLnB1c2gocGxheWVyKTtcclxuICAgIHBsYXllci5jdXJyZW50VGV0cm9taW5vID0gY29weVRldHJvbWlubyhzZXNzaW9uLnRldHJvbWlub3NbMF0pO1xyXG4gICAgcGxheWVyLm5leHRUZXRyb21pbm8gPSBjb3B5VGV0cm9taW5vKHNlc3Npb24udGV0cm9taW5vc1sxXSk7XHJcbiAgICByZXR1cm4gcGxheWVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVHYW1lU2Vzc2lvbihyb29tLCBob3N0KSB7XHJcbiAgICBjb25zdCBzZXNzaW9uID0gbmV3IEdhbWVTZXNzaW9uKCk7XHJcbiAgICBzZXNzaW9uLnJvb20gPSByb29tO1xyXG4gICAgc2Vzc2lvbi5ob3N0ID0gaG9zdDtcclxuXHJcbiAgICBzZXNzaW9ucy5wdXNoKHNlc3Npb24pO1xyXG5cclxuICAgIHJldHVybiBzZXNzaW9uO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0R2FtZUludGVydmFsKHVzZXJuYW1lQW5kUm9vbSwgZ2FtZUludGVydmFsKSB7XHJcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XHJcbiAgICBwbGF5ZXIuaW50ZXJ2YWwgPSBnYW1lSW50ZXJ2YWw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb3ZlTGVmdCh1c2VybmFtZUFuZFJvb20pIHtcclxuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcclxuICAgIHBsYXllci5tb3ZlTGVmdCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbW92ZVJpZ2h0KHVzZXJuYW1lQW5kUm9vbSkge1xyXG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xyXG4gICAgcGxheWVyLm1vdmVSaWdodCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlQ3VycmVudFRldHJvbWlubyh1c2VybmFtZUFuZFJvb20pIHtcclxuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcclxuICAgIHBsYXllci5yb3RhdGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VXNlcihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpIHtcclxuICAgIGNvbnN0IHNlc3Npb24gPSBmaW5kR2FtZVNlc3Npb24ocm9vbSkgfHwgY3JlYXRlR2FtZVNlc3Npb24ocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKTtcclxuXHJcbiAgICBjb25zdCB1c2VyID0gZmluZFVzZXJJblNlc3Npb24ocm9vbSwgdXNlcm5hbWUpO1xyXG5cclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiBub3QgZm91bmQgaW4gc2Vzc2lvbiwgYWRkaW5nLi4uYCk7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBsYXllcihzZXNzaW9uLCB1c2VybmFtZSwgc29ja2V0SUQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgVXNlciBcIiR7dXNlcm5hbWV9XCIgaXMgYWxyZWFkeSBpbiBzZXNzaW9uLmApO1xyXG4gICAgICAgIHVzZXIuc29ja2V0SUQgPSBzb2NrZXRJRDtcclxuICAgICAgICBlbWl0UGxheWZpZWxkKHVzZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZVVzZXJuYW1lKHNwbGl0KSB7XHJcbiAgICByZXR1cm4gc3BsaXRbMV1cclxuICAgICAgICA/IHNwbGl0WzFdLnNsaWNlKDAsIHNwbGl0WzFdLmxlbmd0aCAtIDEpXHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqb2luVGV0cmlzKGhhc2gsIHNvY2tldElEKSB7XHJcbiAgICBjb25zdCBzcGxpdCA9IGhhc2guc3BsaXQoJ1snKTtcclxuICAgIGNvbnN0IHJvb20gPSBzcGxpdFswXS5zbGljZSgxKTtcclxuICAgIGNvbnN0IHVzZXJuYW1lID0gcGFyc2VVc2VybmFtZShzcGxpdCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJqb2luVGV0cmlzKCkgY2FsbGVkXCIpO1xyXG4gICAgY29uc29sZS5sb2coYFVzZXIgXCIke3VzZXJuYW1lfVwiIHRyaWVkIHRvIGNvbm5lY3QgdG8gcm9vbTogXCIke3Jvb219XCJgKTtcclxuXHJcbiAgICBjb25zdCB1c2VyID0gZ2V0VXNlcihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKHVzZXIpXHJcbiAgICAgICAgICAgIHVzZXIucGxheSgpXHJcbiAgICB9LCBpbnRlcnZhbCk7XHJcbn1cclxuIiwiXHJcbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZSgnYXV0by1iaW5kJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXRyb21pbm8ge1xyXG4gICAgY29uc3RydWN0b3Ioc2hhcGUsIGNvbG9yLCBwb3NpdGlvbiwgcm90YXRpb25BcnJheSkge1xyXG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcclxuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMucm90YXRpb25BcnJheSA9IHJvdGF0aW9uQXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1RldHJvbWlubyhwbGF5ZmllbGQpIHtcclxuICAgICAgICBsZXQgcm93ID0gMDtcclxuICAgICAgICB3aGlsZSAocm93IDwgNCkge1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA8IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd10pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW3RoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5dICYmIHRoaXMuc2hhcGVbcm93XVtjb2x1bW5dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVt0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXSA9IHRoaXMuY29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm93ICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZCkge1xyXG4gICAgICAgIGxldCByb3cgPSAwO1xyXG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bdGhpcy5wb3NpdGlvblswXSArIGNvbHVtbl0gJiYgdGhpcy5zaGFwZVtyb3ddW2NvbHVtbl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW3RoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5dID0gJ2dyYXknO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbHVtbiArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJvdyArPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlTGVmdChwbGF5ZmllbGQpIHtcclxuICAgICAgICB0aGlzLmVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb25bMF0gLT0gMTtcclxuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKVxyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdICs9IDE7XHJcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBtb3ZlUmlnaHQocGxheWZpZWxkKSB7XHJcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uWzBdICs9IDE7XHJcbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSAtPSAxO1xyXG4gICAgICAgIHRoaXMuZHJhd1RldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcclxuICAgIH07XHJcblxyXG4gICAgcm90YXRlKHBsYXlmaWVsZCkge1xyXG4gICAgICAgIHRoaXMuZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpID09PSB0aGlzLnJvdGF0aW9uQXJyYXkubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5WzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbdGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgKyAxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSlcclxuICAgICAgICAgICAgdGhpcy5fd2FsbEtpY2socGxheWZpZWxkKTtcclxuICAgICAgICB0aGlzLmRyYXdUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgX3dhbGxLaWNrKHBsYXlmaWVsZCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSAtIDEsIHRoaXMucG9zaXRpb25bMV1dLCBwbGF5ZmllbGQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdICsgMSwgdGhpcy5wb3NpdGlvblsxXV0sIHBsYXlmaWVsZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gLSAxXSwgcGxheWZpZWxkKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSArIDFdLCBwbGF5ZmllbGQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdIC0gMiwgdGhpcy5wb3NpdGlvblsxXV0sIHBsYXlmaWVsZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0gKyAyLCB0aGlzLnBvc2l0aW9uWzFdXSwgcGxheWZpZWxkKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSAtIDJdLCBwbGF5ZmllbGQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdICsgMl0sIHBsYXlmaWVsZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl91bnJvdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIF91bnJvdGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgPCAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbdGhpcy5yb3RhdGlvbkFycmF5Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbdGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgLSAxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgX3RyeVRldHJvbWlub1Bvc2l0aW9uKHBvc2l0aW9uLCBwbGF5ZmllbGQpIHtcclxuICAgICAgICBjb25zdCB0bXAgPSBbLi4udGhpcy5wb3NpdGlvbl07XHJcblxyXG4gICAgICAgIHRoaXMucG9zaXRpb25bMF0gPSBwb3NpdGlvblswXTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdID0gcG9zaXRpb25bMV07XHJcbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdID0gdG1wWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzFdID0gdG1wWzFdO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJcclxuZXhwb3J0IGNvbnN0IFNxdWFyZSA9IFtcclxuICAgIFtcclxuICAgICAgICBbMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgIF1dO1xyXG5cclxuZXhwb3J0IGNvbnN0IExpbmUgPSBbXHJcbiAgICBbXHJcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgICBbMCwgMSwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDEsIDAsIDBdXHJcbiAgICBdLFxyXG4gICAgW1xyXG4gICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICBbMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgXSxcclxuICAgIFtcclxuICAgICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxyXG4gICAgICAgIFswLCAwLCAxLCAwXSxcclxuICAgICAgICBbMCwgMCwgMSwgMF1cclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICBbMSwgMSwgMSwgMV0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICBdXTtcclxuXHJcbmV4cG9ydCBjb25zdCBUID0gW1xyXG4gICAgW1xyXG4gICAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgICBbMSwgMSwgMSwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgXSxcclxuICAgIFtcclxuICAgICAgICBbMCwgMSwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxyXG4gICAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcclxuICAgICAgICBbMCwgMSwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICBdLFxyXG4gICAgW1xyXG4gICAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgICBbMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgXV07XHJcblxyXG5leHBvcnQgY29uc3QgTCA9IFtcclxuICAgIFtcclxuICAgICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgICBbMCwgMSwgMSwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICBdLFxyXG4gICAgW1xyXG4gICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICBbMSwgMSwgMSwgMF0sXHJcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgXSxcclxuICAgIFtcclxuICAgICAgICBbMSwgMSwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgIF1dO1xyXG5cclxuZXhwb3J0IGNvbnN0IFJldmVyc2VMID0gW1xyXG4gICAgW1xyXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcclxuICAgICAgICBbMSwgMSwgMSwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgXSxcclxuICAgIFtcclxuICAgICAgICBbMCwgMSwgMSwgMF0sXHJcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxyXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcclxuICAgICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICBdLFxyXG4gICAgW1xyXG4gICAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgICBbMCwgMSwgMCwgMF0sXHJcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgXV07XHJcblxyXG5leHBvcnQgY29uc3QgUyA9IFtcclxuICAgIFtcclxuICAgICAgICBbMCwgMSwgMSwgMF0sXHJcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAxLCAxLCAwXSxcclxuICAgICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICBdLFxyXG4gICAgW1xyXG4gICAgICAgIFswLCAwLCAwLCAwXSxcclxuICAgICAgICBbMCwgMSwgMSwgMF0sXHJcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgXSxcclxuICAgIFtcclxuICAgICAgICBbMSwgMCwgMCwgMF0sXHJcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgIF1dO1xyXG5cclxuZXhwb3J0IGNvbnN0IFogPSBbXHJcbiAgICBbXHJcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAxLCAxLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICBdLFxyXG4gICAgW1xyXG4gICAgICAgIFswLCAwLCAxLCAwXSxcclxuICAgICAgICBbMCwgMSwgMSwgMF0sXHJcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAwLCAwLCAwXVxyXG4gICAgXSxcclxuICAgIFtcclxuICAgICAgICBbMCwgMCwgMCwgMF0sXHJcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxyXG4gICAgICAgIFswLCAxLCAxLCAwXSxcclxuICAgICAgICBbMCwgMCwgMCwgMF1cclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxyXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcclxuICAgICAgICBbMSwgMCwgMCwgMF0sXHJcbiAgICAgICAgWzAsIDAsIDAsIDBdXHJcbiAgICBdXTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXV0by1iaW5kXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=