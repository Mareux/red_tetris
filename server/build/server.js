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
            } else
                this.currentTetromino.drawTetromino(this.playfield.playfield);
        }
        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitEvents"])(this);
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
        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitEvents"])(this);
    }

    moveLeft() {
        this.currentTetromino.moveLeft(this.playfield);
        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitEvents"])(this);
    };

    moveRight() {
        this.currentTetromino.moveRight(this.playfield);
        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitEvents"])(this);
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


const server = __webpack_require__(/*! http */ "http").createServer();
const io = __webpack_require__(/*! socket.io */ "socket.io")(server);

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
server.listen(port);
console.log('listening on port ', port);


/***/ }),

/***/ "./tetris.js":
/*!*******************!*\
  !*** ./tetris.js ***!
  \*******************/
/*! exports provided: defaultColor, disabledColor, createPlayfield, emitEvents, copyTetromino, moveLeft, moveRight, rotateCurrentTetromino, joinTetris */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultColor", function() { return defaultColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disabledColor", function() { return disabledColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPlayfield", function() { return createPlayfield; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emitEvents", function() { return emitEvents; });
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

class GameSession {
    constructor() {
        autoBind(this);
        this.room = "";
        this.host = "";
        this.players = Array();
        this.tetrominos = Array(nextTetromino(), nextTetromino());
    }

    newTetromino() {
        this.tetrominos.push(nextTetromino());
    }

    disableLines(user) {
        this.players.forEach(element => {
            if (element !== user) {
                element.disableLine();
            }
        });
    }
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

function createGameSession(room, host, socketID) {
    const session = new GameSession();
    session.room = room;
    session.host = host;

    createPlayer(session, host, socketID);
    sessions.push(session);

    return session;
}

function joinGameSession(room, user, socketID) {
    const session = findGameSession(room);
    return createPlayer(session, user, socketID);
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

const tetrominos = [new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Line"][0], 'cyan', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Line"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["L"][0], 'orange', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["L"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["ReverseL"][0], "blue", [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["ReverseL"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Square"][0], 'yellow', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Square"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["S"][0], 'green', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["S"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Z"][0], 'red', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Z"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["T"][0], 'purple', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["T"])];

function nextTetromino() {
    const index = Math.floor(Math.random() * tetrominos.length);

    return tetrominos[index];
}

function createSessionWithUser(room, username, socketID) {
    console.log("Session not found, attempting to create a new session");
    const newSession = createGameSession(room, username, socketID);
    if (!newSession) {
        console.log("Failed to create a session.");
    } else {
        console.log(`Session "${room}" successfully created with "${newSession.host}" as host.`);
    }
    return newSession.players[0];
}

function getUser(room, username, socketID) {
    if (!findGameSession(room))
        return createSessionWithUser(room, username, socketID);

    console.log("Session found, attempting to join.");
    const user = findUserInSession(room, username);

    if (!user) {
        console.log(`User "${username}" not found in session, adding...`);
        return joinGameSession(room, username, socketID);
    } else {
        console.log(`User "${username}" is already in session.`);
    }

    return user;
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
/* harmony import */ var _tetris__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tetris */ "./tetris.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGxheWVyLmpzIiwid2VicGFjazovLy8uL3BsYXlmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGV0cmlzLmpzIiwid2VicGFjazovLy8uL3RldHJvbWluby5qcyIsIndlYnBhY2s6Ly8vLi90ZXRyb21pbm9zLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF1dG8tYmluZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb2NrZXQuaW9cIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEI7QUFDc0M7QUFDaEM7QUFDcEMsaUJBQWlCLG1CQUFPLENBQUMs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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6SE87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25LQSxzQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zZXJ2ZXIuanNcIik7XG4iLCJpbXBvcnQge2VtaXR9IGZyb20gXCIuL3NlcnZlclwiO1xuaW1wb3J0IHtjb3B5VGV0cm9taW5vLCBjcmVhdGVQbGF5ZmllbGQsIGVtaXRFdmVudHN9IGZyb20gXCIuL3RldHJpc1wiO1xuaW1wb3J0IFBsYXlmaWVsZCBmcm9tIFwiLi9wbGF5ZmllbGRcIjtcbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZSgnYXV0by1iaW5kJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNlc3Npb24gPSBudWxsO1xuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IG5ldyBQbGF5ZmllbGQoY3JlYXRlUGxheWZpZWxkKCkpO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8gPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm8gPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm9JbmRleCA9IDA7XG4gICAgICAgIHRoaXMuc29ja2V0SUQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zID0gbnVsbDtcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VGV0cm9taW5vKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArPSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMuY3VycmVudFRldHJvbWlubykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gLT0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICAgICAgICAgIGxldCBjbGVhcmVkTGluZXMgPSB0aGlzLnBsYXlmaWVsZC5jbGVhckZpbGxlZExpbmVzKHRoaXMuY3VycmVudFRldHJvbWlubyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGVhcmVkTGluZXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlc3Npb24uZGlzYWJsZUxpbmVzKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5ld1RldHJvbWlubygpO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbWl0RXZlbnRzKHRoaXMpO1xuICAgIH1cblxuICAgIG5ld1RldHJvbWlubygpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vID0gdGhpcy5uZXh0VGV0cm9taW5vO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm9JbmRleCsrO1xuICAgICAgICBpZiAoIXRoaXMuc2Vzc2lvbi50ZXRyb21pbm9zW3RoaXMubmV4dFRldHJvbWlub0luZGV4XSlcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5uZXdUZXRyb21pbm8oKTtcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vID0gY29weVRldHJvbWlubyh0aGlzLnNlc3Npb24udGV0cm9taW5vc1t0aGlzLm5leHRUZXRyb21pbm9JbmRleF0pO1xuICAgICAgICBlbWl0KCduZXh0VGV0cm9taW5vJywgdGhpcy5uZXh0VGV0cm9taW5vLCB0aGlzLnNvY2tldElEKTtcbiAgICB9XG5cbiAgICByb3RhdGUoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5yb3RhdGUodGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0RXZlbnRzKHRoaXMpO1xuICAgIH1cblxuICAgIG1vdmVMZWZ0KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ubW92ZUxlZnQodGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0RXZlbnRzKHRoaXMpO1xuICAgIH07XG5cbiAgICBtb3ZlUmlnaHQoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5tb3ZlUmlnaHQodGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0RXZlbnRzKHRoaXMpO1xuICAgIH07XG5cbiAgICBkaXNhYmxlTGluZSgpIHtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5wbGF5ZmllbGQubGVuZ3RoIC0gMTsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkW3Jvd11bY29sdW1uXSA9IHRoaXMucGxheWZpZWxkW3JvdyArIDFdW2NvbHVtbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFt0aGlzLnBsYXlmaWVsZC5sZW5ndGggLSAxXVtjb2x1bW5dID0gJ2dyYXknO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IGF1dG9CaW5kIGZyb20gXCJhdXRvLWJpbmRcIjtcbmltcG9ydCB7ZGVmYXVsdENvbG9yLCBkaXNhYmxlZENvbG9yfSBmcm9tIFwiLi90ZXRyaXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWZpZWxkIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZmllbGQpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gcGxheWZpZWxkO1xuICAgIH1cblxuICAgIGNvbGxpc2lvbkRldGVjdGVkKGN1cnJlbnRUZXRyb21pbm8pIHtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChjb2x1bW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXRyb21pbm8uc2hhcGVbcm93XVtjb2x1bW5dKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZC5sZW5ndGggLSAxIDwgY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvdyB8fCB0aGlzLnBsYXlmaWVsZFswXS5sZW5ndGggLSAxIDwgY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbiA8IDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGRbY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvd11bY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGRbY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvd11bY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbl0gIT09IGRlZmF1bHRDb2xvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGluZUlzRmlsbGVkKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuICFsaW5lLnNvbWUoY2VsbCA9PiBjZWxsID09PSBkZWZhdWx0Q29sb3IgfHwgY2VsbCA9PT0gZGlzYWJsZWRDb2xvcik7XG4gICAgfVxuXG4gICAgY2xlYXJMaW5lKGxpbmUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaW5lW2ldID0gZGVmYXVsdENvbG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29sbGFwc2VMaW5lcyhpKSB7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IGk7IHJvdyA+IDA7IHJvdy0tKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFtyb3ddW2NvbHVtbl0gPSB0aGlzLnBsYXlmaWVsZFtyb3cgLSAxXVtjb2x1bW5dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJGaWxsZWRMaW5lcyhjdXJyZW50VGV0cm9taW5vKSB7XG4gICAgICAgIGxldCBjdXJyZW50TGluZUluZGV4ID0gY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXTtcbiAgICAgICAgY29uc3QgbGFzdENsZWFyYWJsZUxpbmVJbmRleCA9IGN1cnJlbnRMaW5lSW5kZXggKyA0O1xuICAgICAgICBsZXQgY2xlYXJlZExpbmVzID0gMDtcblxuICAgICAgICB3aGlsZSAoY3VycmVudExpbmVJbmRleCA8IGxhc3RDbGVhcmFibGVMaW5lSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpbmVJc0ZpbGxlZCh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckxpbmUodGhpcy5wbGF5ZmllbGRbY3VycmVudExpbmVJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlTGluZXMoY3VycmVudExpbmVJbmRleCwgdGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhcmVkTGluZXMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50TGluZUluZGV4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChjbGVhcmVkTGluZXMpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7am9pblRldHJpcywgbW92ZUxlZnQsIG1vdmVSaWdodCwgcm90YXRlQ3VycmVudFRldHJvbWlub30gZnJvbSBcIi4vdGV0cmlzXCI7XG5cbmNvbnN0IHNlcnZlciA9IHJlcXVpcmUoJ2h0dHAnKS5jcmVhdGVTZXJ2ZXIoKTtcbmNvbnN0IGlvID0gcmVxdWlyZSgnc29ja2V0LmlvJykoc2VydmVyKTtcblxuZXhwb3J0IGxldCBpbnRlcnZhbCA9IDE1MDtcblxuaW8ub24oJ2Nvbm5lY3Rpb24nLCAoY2xpZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJcXG5Db25uZWN0aW9uIGhhcHBlbmVkLlwiKTtcbiAgICBjbGllbnQub24oJ0hhc2gnLCBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIGpvaW5UZXRyaXMoc3RyaW5nLCBjbGllbnQuaWQpO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbignQXJyb3dVcCcsICh1c2VybmFtZUFuZFJvb20pID0+IHtcbiAgICAgICAgcm90YXRlQ3VycmVudFRldHJvbWlubyh1c2VybmFtZUFuZFJvb20pO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbignQXJyb3dEb3duJywgKCkgPT4ge1xuICAgICAgICBpbnRlcnZhbCA9IDUwO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbignQXJyb3dEb3duVW5wcmVzc2VkJywgKCkgPT4ge1xuICAgICAgICBpbnRlcnZhbCA9IDMwMDtcbiAgICB9KTtcbiAgICBjbGllbnQub24oJ0Fycm93TGVmdCcsICh1c2VybmFtZUFuZFJvb20pID0+IHtcbiAgICAgICAgbW92ZUxlZnQodXNlcm5hbWVBbmRSb29tKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oJ0Fycm93UmlnaHQnLCAodXNlcm5hbWVBbmRSb29tKSA9PiB7XG4gICAgICAgIG1vdmVSaWdodCh1c2VybmFtZUFuZFJvb20pO1xuICAgIH0pXG59KTtcblxuZXhwb3J0IGNvbnN0IGVtaXQgPSAoZXZlbnQsIGFyZ3MsIHNvY2tldElEKSA9PiB7XG4gICAgaW8udG8oYCR7c29ja2V0SUR9YCkuZW1pdChldmVudCwgYXJncyk7XG59O1xuXG5jb25zdCBvbiA9IChldmVudCwgY2FsbGJhY2ssIGVtaXQpID0+IHtcblxufTtcblxuY29uc3QgcG9ydCA9IDgwMDA7XG5zZXJ2ZXIubGlzdGVuKHBvcnQpO1xuY29uc29sZS5sb2coJ2xpc3RlbmluZyBvbiBwb3J0ICcsIHBvcnQpO1xuIiwiaW1wb3J0IHtlbWl0LCBpbnRlcnZhbH0gZnJvbSBcIi4vc2VydmVyXCI7XG5pbXBvcnQgVGV0cm9taW5vIGZyb20gXCIuL3RldHJvbWlub1wiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7TCwgTGluZSwgUmV2ZXJzZUwsIFMsIFNxdWFyZSwgVCwgWn0gZnJvbSBcIi4vdGV0cm9taW5vc1wiO1xuXG5jb25zdCBhdXRvQmluZCA9IHJlcXVpcmUoJ2F1dG8tYmluZCcpO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdENvbG9yID0gJ2dyYXknO1xuZXhwb3J0IGNvbnN0IGRpc2FibGVkQ29sb3IgPSAncGluayc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZmllbGQoKSB7XG4gICAgcmV0dXJuIFsuLi5uZXcgQXJyYXkoMjApXS5tYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gWy4uLm5ldyBBcnJheSgxMCldLm1hcCgoKSA9PiBkZWZhdWx0Q29sb3IpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEV2ZW50cyh0aGlzUGxheWVyKSB7XG4gICAgZW1pdCgncGxheWZpZWxkJywgdGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzUGxheWVyLnNvY2tldElEKTtcbn1cblxuY2xhc3MgR2FtZVNlc3Npb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yb29tID0gXCJcIjtcbiAgICAgICAgdGhpcy5ob3N0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gQXJyYXkoKTtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zID0gQXJyYXkobmV4dFRldHJvbWlubygpLCBuZXh0VGV0cm9taW5vKCkpO1xuICAgIH1cblxuICAgIG5ld1RldHJvbWlubygpIHtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zLnB1c2gobmV4dFRldHJvbWlubygpKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlTGluZXModXNlcikge1xuICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSB1c2VyKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5kaXNhYmxlTGluZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IHNlc3Npb25zID0gQXJyYXkoKTtcblxuZnVuY3Rpb24gZmluZEdhbWVTZXNzaW9uKHJvb20pIHtcbiAgICByZXR1cm4gc2Vzc2lvbnMuZmluZChlbGVtZW50ID0+IGVsZW1lbnQucm9vbSA9PT0gcm9vbSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRVc2VySW5TZXNzaW9uKHJvb20sIHVzZXJuYW1lKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGZpbmRHYW1lU2Vzc2lvbihyb29tKTtcbiAgICBpZiAoIXNlc3Npb24pXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBzZXNzaW9uLnBsYXllcnMuZmluZCh1c2VyID0+IHVzZXIubmFtZSA9PT0gdXNlcm5hbWUpO1xufVxuXG5leHBvcnQgY29uc3QgY29weVRldHJvbWlubyA9ICh0ZXRyb21pbm8pID0+IHtcbiAgICByZXR1cm4gbmV3IFRldHJvbWlubyh0ZXRyb21pbm8uc2hhcGUsIHRldHJvbWluby5jb2xvciwgWzAsIC0xXSwgdGV0cm9taW5vLnJvdGF0aW9uQXJyYXkpO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyKHNlc3Npb24sIG5hbWUsIHNvY2tldElEKSB7XG4gICAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigpO1xuICAgIHBsYXllci5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICBwbGF5ZXIubmFtZSA9IG5hbWU7XG4gICAgcGxheWVyLnNvY2tldElEID0gc29ja2V0SUQ7XG4gICAgc2Vzc2lvbi5wbGF5ZXJzLnB1c2gocGxheWVyKTtcbiAgICBwbGF5ZXIuY3VycmVudFRldHJvbWlubyA9IGNvcHlUZXRyb21pbm8oc2Vzc2lvbi50ZXRyb21pbm9zWzBdKTtcbiAgICBwbGF5ZXIubmV4dFRldHJvbWlubyA9IGNvcHlUZXRyb21pbm8oc2Vzc2lvbi50ZXRyb21pbm9zWzFdKTtcbiAgICByZXR1cm4gcGxheWVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lU2Vzc2lvbihyb29tLCBob3N0LCBzb2NrZXRJRCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBuZXcgR2FtZVNlc3Npb24oKTtcbiAgICBzZXNzaW9uLnJvb20gPSByb29tO1xuICAgIHNlc3Npb24uaG9zdCA9IGhvc3Q7XG5cbiAgICBjcmVhdGVQbGF5ZXIoc2Vzc2lvbiwgaG9zdCwgc29ja2V0SUQpO1xuICAgIHNlc3Npb25zLnB1c2goc2Vzc2lvbik7XG5cbiAgICByZXR1cm4gc2Vzc2lvbjtcbn1cblxuZnVuY3Rpb24gam9pbkdhbWVTZXNzaW9uKHJvb20sIHVzZXIsIHNvY2tldElEKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGZpbmRHYW1lU2Vzc2lvbihyb29tKTtcbiAgICByZXR1cm4gY3JlYXRlUGxheWVyKHNlc3Npb24sIHVzZXIsIHNvY2tldElEKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVMZWZ0KHVzZXJuYW1lQW5kUm9vbSkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIubW92ZUxlZnQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVSaWdodCh1c2VybmFtZUFuZFJvb20pIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XG4gICAgcGxheWVyLm1vdmVSaWdodCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlQ3VycmVudFRldHJvbWlubyh1c2VybmFtZUFuZFJvb20pIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XG4gICAgcGxheWVyLnJvdGF0ZSgpO1xufVxuXG5jb25zdCB0ZXRyb21pbm9zID0gW25ldyBUZXRyb21pbm8oTGluZVswXSwgJ2N5YW4nLCBbMCwgLTFdLCBMaW5lKSxcbiAgICBuZXcgVGV0cm9taW5vKExbMF0sICdvcmFuZ2UnLCBbMCwgLTFdLCBMKSxcbiAgICBuZXcgVGV0cm9taW5vKFJldmVyc2VMWzBdLCBcImJsdWVcIiwgWzAsIC0xXSwgUmV2ZXJzZUwpLFxuICAgIG5ldyBUZXRyb21pbm8oU3F1YXJlWzBdLCAneWVsbG93JywgWzAsIC0xXSwgU3F1YXJlKSxcbiAgICBuZXcgVGV0cm9taW5vKFNbMF0sICdncmVlbicsIFswLCAtMV0sIFMpLFxuICAgIG5ldyBUZXRyb21pbm8oWlswXSwgJ3JlZCcsIFswLCAtMV0sIFopLFxuICAgIG5ldyBUZXRyb21pbm8oVFswXSwgJ3B1cnBsZScsIFswLCAtMV0sIFQpXTtcblxuZnVuY3Rpb24gbmV4dFRldHJvbWlubygpIHtcbiAgICBjb25zdCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRldHJvbWlub3MubGVuZ3RoKTtcblxuICAgIHJldHVybiB0ZXRyb21pbm9zW2luZGV4XTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2Vzc2lvbldpdGhVc2VyKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2Vzc2lvbiBub3QgZm91bmQsIGF0dGVtcHRpbmcgdG8gY3JlYXRlIGEgbmV3IHNlc3Npb25cIik7XG4gICAgY29uc3QgbmV3U2Vzc2lvbiA9IGNyZWF0ZUdhbWVTZXNzaW9uKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCk7XG4gICAgaWYgKCFuZXdTZXNzaW9uKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIGNyZWF0ZSBhIHNlc3Npb24uXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBTZXNzaW9uIFwiJHtyb29tfVwiIHN1Y2Nlc3NmdWxseSBjcmVhdGVkIHdpdGggXCIke25ld1Nlc3Npb24uaG9zdH1cIiBhcyBob3N0LmApO1xuICAgIH1cbiAgICByZXR1cm4gbmV3U2Vzc2lvbi5wbGF5ZXJzWzBdO1xufVxuXG5mdW5jdGlvbiBnZXRVc2VyKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCkge1xuICAgIGlmICghZmluZEdhbWVTZXNzaW9uKHJvb20pKVxuICAgICAgICByZXR1cm4gY3JlYXRlU2Vzc2lvbldpdGhVc2VyKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCk7XG5cbiAgICBjb25zb2xlLmxvZyhcIlNlc3Npb24gZm91bmQsIGF0dGVtcHRpbmcgdG8gam9pbi5cIik7XG4gICAgY29uc3QgdXNlciA9IGZpbmRVc2VySW5TZXNzaW9uKHJvb20sIHVzZXJuYW1lKTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNlciBcIiR7dXNlcm5hbWV9XCIgbm90IGZvdW5kIGluIHNlc3Npb24sIGFkZGluZy4uLmApO1xuICAgICAgICByZXR1cm4gam9pbkdhbWVTZXNzaW9uKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYFVzZXIgXCIke3VzZXJuYW1lfVwiIGlzIGFscmVhZHkgaW4gc2Vzc2lvbi5gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXNlcjtcbn1cblxuZnVuY3Rpb24gcGFyc2VVc2VybmFtZShzcGxpdCkge1xuICAgIHJldHVybiBzcGxpdFsxXVxuICAgICAgICA/IHNwbGl0WzFdLnNsaWNlKDAsIHNwbGl0WzFdLmxlbmd0aCAtIDEpXG4gICAgICAgIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gam9pblRldHJpcyhoYXNoLCBzb2NrZXRJRCkge1xuICAgIGNvbnN0IHNwbGl0ID0gaGFzaC5zcGxpdCgnWycpO1xuICAgIGNvbnN0IHJvb20gPSBzcGxpdFswXS5zbGljZSgxKTtcbiAgICBjb25zdCB1c2VybmFtZSA9IHBhcnNlVXNlcm5hbWUoc3BsaXQpO1xuXG4gICAgY29uc29sZS5sb2coXCJqb2luVGV0cmlzKCkgY2FsbGVkXCIpO1xuICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiB0cmllZCB0byBjb25uZWN0IHRvIHJvb206IFwiJHtyb29tfVwiYCk7XG5cbiAgICBjb25zdCB1c2VyID0gZ2V0VXNlcihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpO1xuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdXNlci5wbGF5KClcbiAgICB9LCBpbnRlcnZhbCk7XG59XG4iLCJpbXBvcnQge2NvbGxpc2lvbkRldGVjdGVkfSBmcm9tIFwiLi90ZXRyaXNcIjtcblxuY29uc3QgYXV0b0JpbmQgPSByZXF1aXJlKCdhdXRvLWJpbmQnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV0cm9taW5vIHtcbiAgICBjb25zdHJ1Y3RvcihzaGFwZSwgY29sb3IsIHBvc2l0aW9uLCByb3RhdGlvbkFycmF5KSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNoYXBlID0gc2hhcGU7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLnJvdGF0aW9uQXJyYXkgPSByb3RhdGlvbkFycmF5O1xuICAgIH1cblxuICAgIGRyYXdUZXRyb21pbm8ocGxheWZpZWxkKSB7XG4gICAgICAgIGxldCByb3cgPSAwO1xuICAgICAgICB3aGlsZSAocm93IDwgNCkge1xuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVt0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXSAmJiB0aGlzLnNoYXBlW3Jvd11bY29sdW1uXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW3RoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5dID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdyArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkKSB7XG4gICAgICAgIGxldCByb3cgPSAwO1xuICAgICAgICB3aGlsZSAocm93IDwgNCkge1xuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVt0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXSAmJiB0aGlzLnNoYXBlW3Jvd11bY29sdW1uXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW3RoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5dID0gJ2dyYXknO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbHVtbiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlTGVmdChwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSAtPSAxO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSArPSAxO1xuICAgICAgICB0aGlzLmRyYXdUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgfTtcblxuICAgIG1vdmVSaWdodChwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSArPSAxO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSAtPSAxO1xuICAgICAgICB0aGlzLmRyYXdUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgfTtcblxuICAgIHJvdGF0ZShwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpID09PSB0aGlzLnJvdGF0aW9uQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbdGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgKyAxXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKVxuICAgICAgICAgICAgdGhpcy5fd2FsbEtpY2socGxheWZpZWxkKTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgIH1cblxuICAgIF93YWxsS2ljayhwbGF5ZmllbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdIC0gMSwgdGhpcy5wb3NpdGlvblsxXV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0gKyAxLCB0aGlzLnBvc2l0aW9uWzFdXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSAtIDFdLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdICsgMV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0gLSAyLCB0aGlzLnBvc2l0aW9uWzFdXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSArIDIsIHRoaXMucG9zaXRpb25bMV1dLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdIC0gMl0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gKyAyXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Vucm90YXRlKCk7XG4gICAgfVxuXG4gICAgX3Vucm90YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5W3RoaXMucm90YXRpb25BcnJheS5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbdGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgLSAxXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90cnlUZXRyb21pbm9Qb3NpdGlvbihwb3NpdGlvbiwgcGxheWZpZWxkKSB7XG4gICAgICAgIGNvbnN0IHRtcCA9IFsuLi50aGlzLnBvc2l0aW9uXTtcblxuICAgICAgICB0aGlzLnBvc2l0aW9uWzBdID0gcG9zaXRpb25bMF07XG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gPSBwb3NpdGlvblsxXTtcbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSA9IHRtcFswXTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMV0gPSB0bXBbMV07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59XG4iLCJcbmV4cG9ydCBjb25zdCBTcXVhcmUgPSBbXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IExpbmUgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDFdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IFQgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IEwgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IFJldmVyc2VMID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBTID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBaID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhdXRvLWJpbmRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==