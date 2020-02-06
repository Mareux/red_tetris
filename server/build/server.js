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


const autoBind = __webpack_require__(/*! auto-bind */ "auto-bind");

class Player {
    constructor() {
        autoBind(this);
        this.session = null;
        this.playfield = Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["createPlayfield"])();
        this.name = "";
        this.currentTetromino = null;
        this.nextTetromino = null;
        this.nextTetrominoIndex = 0;
        this.socketID = false;
        this.tetrominos = null;
    }

    play() {
        if (this.currentTetromino) {
            this.currentTetromino.eraseTetromino(this.playfield);
            this.currentTetromino.position[1] += 1;
            if (Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["collisionDetected"])(this.playfield, this.currentTetromino)) {
                this.currentTetromino.position[1] -= 1;
                this.currentTetromino.drawTetromino(this.playfield);
                let clearedLines = Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["clearFilledLines"])(this.playfield, this.currentTetromino);
                for (let i = 0; i < clearedLines; i++) {
                    this.session.disableLines(this);
                }
                this.newTetromino();
            } else
                this.currentTetromino.drawTetromino(this.playfield);
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

/***/ "./tetrimino.js":
/*!**********************!*\
  !*** ./tetrimino.js ***!
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
        this.eraseTetromino(playfield, this);
        this.position[0] -= 1;
        if (Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["collisionDetected"])(playfield, this))
            this.position[0] += 1;
        this.drawTetromino(playfield, this);
    };

    moveRight(playfield) {
        this.eraseTetromino(playfield, this);
        this.position[0] += 1;
        if (Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["collisionDetected"])(playfield, this))
            this.position[0] -= 1;
        this.drawTetromino(playfield, this);
    };

    rotate(playfield) {
        this.eraseTetromino(playfield, this);
        if (this.rotationArray.indexOf(this.shape) === this.rotationArray.length - 1) {
            this.shape = this.rotationArray[0];
        } else {
            this.shape = this.rotationArray[this.rotationArray.indexOf(this.shape) + 1];
        }
        if (Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["collisionDetected"])(playfield, this))
            this._wallKick(playfield);
        this.drawTetromino(playfield);
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
        if (Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["collisionDetected"])(playfield, this)) {
            this.position[0] = tmp[0];
            this.position[1] = tmp[1];
            return false;
        }
        return true;
    }

}


/***/ }),

/***/ "./tetris.js":
/*!*******************!*\
  !*** ./tetris.js ***!
  \*******************/
/*! exports provided: createPlayfield, emitEvents, copyTetromino, moveLeft, moveRight, rotateCurrentTetromino, collisionDetected, clearFilledLines, joinTetris */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPlayfield", function() { return createPlayfield; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emitEvents", function() { return emitEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyTetromino", function() { return copyTetromino; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveLeft", function() { return moveLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveRight", function() { return moveRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateCurrentTetromino", function() { return rotateCurrentTetromino; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collisionDetected", function() { return collisionDetected; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearFilledLines", function() { return clearFilledLines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "joinTetris", function() { return joinTetris; });
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server */ "./server.js");
/* harmony import */ var _tetrimino__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tetrimino */ "./tetrimino.js");
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
    Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])('playfield', thisPlayer.playfield, thisPlayer.socketID);
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
    return new _tetrimino__WEBPACK_IMPORTED_MODULE_1__["default"](tetromino.shape, tetromino.color, [0, -1], tetromino.rotationArray);
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

function collisionDetected(playfield, currentTetromino) {
    let row = 0;
    while (row < 4) {
        let column = 0;
        while (column < 4) {
            if (currentTetromino.shape[row][column]) {
                if (playfield.length - 1 < currentTetromino.position[1] + row || playfield[0].length - 1 < currentTetromino.position[0] + column)
                    return true;
                if (currentTetromino.position[0] + column < 0)
                    return true;
                if (playfield[currentTetromino.position[1] + row]) {
                    if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column]) {
                        if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] !== defaultColor)
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

function lineIsFilled(line) {
    return !line.some(cell => cell === defaultColor || cell === disabledColor);
}

function clearLine(line) {
    for (let i = 0; i < line.length; i++) {
        line[i] = defaultColor;
    }
}

function collapseLines(i, playfield) {
    for (let row = i; row > 0; row--) {
        for (let column = 0; column < 10; column++) {
            playfield[row][column] = playfield[row - 1][column];
        }
    }
}

function clearFilledLines(playfield, currentTetromino) {
    let currentLineIndex = currentTetromino.position[1];
    const lastClearableLineIndex = currentLineIndex + 4;
    let clearedLines = 0;

    while (currentLineIndex < lastClearableLineIndex) {
        if (playfield[currentLineIndex]) {
            if (lineIsFilled(playfield[currentLineIndex])) {
                clearLine(playfield[currentLineIndex]);
                collapseLines(currentLineIndex, playfield);
                clearedLines++;
            }
        }
        currentLineIndex += 1;
    }
    return (clearedLines);
}

const tetrominos = [new _tetrimino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Line"][0], 'cyan', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Line"]),
    new _tetrimino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["L"][0], 'orange', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["L"]),
    new _tetrimino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["ReverseL"][0], "blue", [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["ReverseL"]),
    new _tetrimino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Square"][0], 'yellow', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Square"]),
    new _tetrimino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["S"][0], 'green', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["S"]),
    new _tetrimino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Z"][0], 'red', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Z"]),
    new _tetrimino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["T"][0], 'purple', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["T"])];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi90ZXRyaW1pbm8uanMiLCJ3ZWJwYWNrOi8vLy4vdGV0cmlzLmpzIiwid2VicGFjazovLy8uL3RldHJvbWlub3MuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXV0by1iaW5kXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBOEI7QUFDMkU7QUFDekcsaUJBQWlCLG1CQUFPLENBQUMsNEJBQVc7O0FBRXJCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EseUJBQXlC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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbktBLHNDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHNDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NlcnZlci5qc1wiKTtcbiIsImltcG9ydCB7ZW1pdH0gZnJvbSBcIi4vc2VydmVyXCI7XG5pbXBvcnQge2NvbGxpc2lvbkRldGVjdGVkLCBjb3B5VGV0cm9taW5vLCBjcmVhdGVQbGF5ZmllbGQsIGVtaXRFdmVudHMsIGNsZWFyRmlsbGVkTGluZXN9IGZyb20gXCIuL3RldHJpc1wiO1xuY29uc3QgYXV0b0JpbmQgPSByZXF1aXJlKCdhdXRvLWJpbmQnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IG51bGw7XG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gY3JlYXRlUGxheWZpZWxkKCk7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWlubyA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlubyA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlub0luZGV4ID0gMDtcbiAgICAgICAgdGhpcy5zb2NrZXRJRCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRldHJvbWlub3MgPSBudWxsO1xuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUZXRyb21pbm8pIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5lcmFzZVRldHJvbWlubyh0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKz0gMTtcbiAgICAgICAgICAgIGlmIChjb2xsaXNpb25EZXRlY3RlZCh0aGlzLnBsYXlmaWVsZCwgdGhpcy5jdXJyZW50VGV0cm9taW5vKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSAtPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5kcmF3VGV0cm9taW5vKHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgICAgICAgICBsZXQgY2xlYXJlZExpbmVzID0gY2xlYXJGaWxsZWRMaW5lcyh0aGlzLnBsYXlmaWVsZCwgdGhpcy5jdXJyZW50VGV0cm9taW5vKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsZWFyZWRMaW5lczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5kaXNhYmxlTGluZXModGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubmV3VGV0cm9taW5vKCk7XG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgIH1cbiAgICAgICAgZW1pdEV2ZW50cyh0aGlzKTtcbiAgICB9XG5cbiAgICBuZXdUZXRyb21pbm8oKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWlubyA9IHRoaXMubmV4dFRldHJvbWlubztcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vSW5kZXgrKztcbiAgICAgICAgaWYgKCF0aGlzLnNlc3Npb24udGV0cm9taW5vc1t0aGlzLm5leHRUZXRyb21pbm9JbmRleF0pXG4gICAgICAgICAgICB0aGlzLnNlc3Npb24ubmV3VGV0cm9taW5vKCk7XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlubyA9IGNvcHlUZXRyb21pbm8odGhpcy5zZXNzaW9uLnRldHJvbWlub3NbdGhpcy5uZXh0VGV0cm9taW5vSW5kZXhdKTtcbiAgICAgICAgZW1pdCgnbmV4dFRldHJvbWlubycsIHRoaXMubmV4dFRldHJvbWlubywgdGhpcy5zb2NrZXRJRCk7XG4gICAgfVxuXG4gICAgcm90YXRlKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucm90YXRlKHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdEV2ZW50cyh0aGlzKTtcbiAgICB9XG5cbiAgICBtb3ZlTGVmdCgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLm1vdmVMZWZ0KHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdEV2ZW50cyh0aGlzKTtcbiAgICB9O1xuXG4gICAgbW92ZVJpZ2h0KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ubW92ZVJpZ2h0KHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdEV2ZW50cyh0aGlzKTtcbiAgICB9O1xuXG4gICAgZGlzYWJsZUxpbmUoKSB7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMucGxheWZpZWxkLmxlbmd0aCAtIDE7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFtyb3ddW2NvbHVtbl0gPSB0aGlzLnBsYXlmaWVsZFtyb3cgKyAxXVtjb2x1bW5dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGRbdGhpcy5wbGF5ZmllbGQubGVuZ3RoIC0gMV1bY29sdW1uXSA9ICdncmF5JztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7am9pblRldHJpcywgbW92ZUxlZnQsIG1vdmVSaWdodCwgcm90YXRlQ3VycmVudFRldHJvbWlub30gZnJvbSBcIi4vdGV0cmlzXCI7XG5cbmNvbnN0IHNlcnZlciA9IHJlcXVpcmUoJ2h0dHAnKS5jcmVhdGVTZXJ2ZXIoKTtcbmNvbnN0IGlvID0gcmVxdWlyZSgnc29ja2V0LmlvJykoc2VydmVyKTtcblxuZXhwb3J0IGxldCBpbnRlcnZhbCA9IDE1MDtcblxuaW8ub24oJ2Nvbm5lY3Rpb24nLCAoY2xpZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJcXG5Db25uZWN0aW9uIGhhcHBlbmVkLlwiKTtcbiAgICBjbGllbnQub24oJ0hhc2gnLCBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIGpvaW5UZXRyaXMoc3RyaW5nLCBjbGllbnQuaWQpO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbignQXJyb3dVcCcsICh1c2VybmFtZUFuZFJvb20pID0+IHtcbiAgICAgICAgcm90YXRlQ3VycmVudFRldHJvbWlubyh1c2VybmFtZUFuZFJvb20pO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbignQXJyb3dEb3duJywgKCkgPT4ge1xuICAgICAgICBpbnRlcnZhbCA9IDUwO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbignQXJyb3dEb3duVW5wcmVzc2VkJywgKCkgPT4ge1xuICAgICAgICBpbnRlcnZhbCA9IDMwMDtcbiAgICB9KTtcbiAgICBjbGllbnQub24oJ0Fycm93TGVmdCcsICh1c2VybmFtZUFuZFJvb20pID0+IHtcbiAgICAgICAgbW92ZUxlZnQodXNlcm5hbWVBbmRSb29tKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oJ0Fycm93UmlnaHQnLCAodXNlcm5hbWVBbmRSb29tKSA9PiB7XG4gICAgICAgIG1vdmVSaWdodCh1c2VybmFtZUFuZFJvb20pO1xuICAgIH0pXG59KTtcblxuZXhwb3J0IGNvbnN0IGVtaXQgPSAoZXZlbnQsIGFyZ3MsIHNvY2tldElEKSA9PiB7XG4gICAgaW8udG8oYCR7c29ja2V0SUR9YCkuZW1pdChldmVudCwgYXJncyk7XG59O1xuXG5jb25zdCBvbiA9IChldmVudCwgY2FsbGJhY2ssIGVtaXQpID0+IHtcblxufTtcblxuY29uc3QgcG9ydCA9IDgwMDA7XG5zZXJ2ZXIubGlzdGVuKHBvcnQpO1xuY29uc29sZS5sb2coJ2xpc3RlbmluZyBvbiBwb3J0ICcsIHBvcnQpO1xuIiwiaW1wb3J0IHtjb2xsaXNpb25EZXRlY3RlZH0gZnJvbSBcIi4vdGV0cmlzXCI7XG5cbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZSgnYXV0by1iaW5kJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRldHJvbWlubyB7XG4gICAgY29uc3RydWN0b3Ioc2hhcGUsIGNvbG9yLCBwb3NpdGlvbiwgcm90YXRpb25BcnJheSkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgdGhpcy5yb3RhdGlvbkFycmF5ID0gcm90YXRpb25BcnJheTtcbiAgICB9XG5cbiAgICBkcmF3VGV0cm9taW5vKHBsYXlmaWVsZCkge1xuICAgICAgICBsZXQgcm93ID0gMDtcbiAgICAgICAgd2hpbGUgKHJvdyA8IDQpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA8IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bdGhpcy5wb3NpdGlvblswXSArIGNvbHVtbl0gJiYgdGhpcy5zaGFwZVtyb3ddW2NvbHVtbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVt0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZCkge1xuICAgICAgICBsZXQgcm93ID0gMDtcbiAgICAgICAgd2hpbGUgKHJvdyA8IDQpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA8IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bdGhpcy5wb3NpdGlvblswXSArIGNvbHVtbl0gJiYgdGhpcy5zaGFwZVtyb3ddW2NvbHVtbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVt0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXSA9ICdncmF5JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdyArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUxlZnQocGxheWZpZWxkKSB7XG4gICAgICAgIHRoaXMuZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSAtPSAxO1xuICAgICAgICBpZiAoY29sbGlzaW9uRGV0ZWN0ZWQocGxheWZpZWxkLCB0aGlzKSlcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gKz0gMTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZCwgdGhpcyk7XG4gICAgfTtcblxuICAgIG1vdmVSaWdodChwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQsIHRoaXMpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzBdICs9IDE7XG4gICAgICAgIGlmIChjb2xsaXNpb25EZXRlY3RlZChwbGF5ZmllbGQsIHRoaXMpKVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSAtPSAxO1xuICAgICAgICB0aGlzLmRyYXdUZXRyb21pbm8ocGxheWZpZWxkLCB0aGlzKTtcbiAgICB9O1xuXG4gICAgcm90YXRlKHBsYXlmaWVsZCkge1xuICAgICAgICB0aGlzLmVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZCwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSA9PT0gdGhpcy5yb3RhdGlvbkFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5W3RoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbGxpc2lvbkRldGVjdGVkKHBsYXlmaWVsZCwgdGhpcykpXG4gICAgICAgICAgICB0aGlzLl93YWxsS2ljayhwbGF5ZmllbGQpO1xuICAgICAgICB0aGlzLmRyYXdUZXRyb21pbm8ocGxheWZpZWxkKTtcbiAgICB9XG5cbiAgICBfd2FsbEtpY2socGxheWZpZWxkKSB7XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSAtIDEsIHRoaXMucG9zaXRpb25bMV1dLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdICsgMSwgdGhpcy5wb3NpdGlvblsxXV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gLSAxXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSArIDFdLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdIC0gMiwgdGhpcy5wb3NpdGlvblsxXV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0gKyAyLCB0aGlzLnBvc2l0aW9uWzFdXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSAtIDJdLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdICsgMl0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91bnJvdGF0ZSgpO1xuICAgIH1cblxuICAgIF91bnJvdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVt0aGlzLnJvdGF0aW9uQXJyYXkubGVuZ3RoIC0gMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5W3RoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpIC0gMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdHJ5VGV0cm9taW5vUG9zaXRpb24ocG9zaXRpb24sIHBsYXlmaWVsZCkge1xuICAgICAgICBjb25zdCB0bXAgPSBbLi4udGhpcy5wb3NpdGlvbl07XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSA9IHBvc2l0aW9uWzBdO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdID0gcG9zaXRpb25bMV07XG4gICAgICAgIGlmIChjb2xsaXNpb25EZXRlY3RlZChwbGF5ZmllbGQsIHRoaXMpKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdID0gdG1wWzBdO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblsxXSA9IHRtcFsxXTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7ZW1pdCwgaW50ZXJ2YWx9IGZyb20gXCIuL3NlcnZlclwiO1xuaW1wb3J0IFRldHJvbWlubyBmcm9tIFwiLi90ZXRyaW1pbm9cIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQge0wsIExpbmUsIFJldmVyc2VMLCBTLCBTcXVhcmUsIFQsIFp9IGZyb20gXCIuL3RldHJvbWlub3NcIjtcblxuY29uc3QgYXV0b0JpbmQgPSByZXF1aXJlKCdhdXRvLWJpbmQnKTtcblxuY29uc3QgZGVmYXVsdENvbG9yID0gJ2dyYXknO1xuY29uc3QgZGlzYWJsZWRDb2xvciA9ICdwaW5rJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXlmaWVsZCgpIHtcbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheSgyMCldLm1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBbLi4ubmV3IEFycmF5KDEwKV0ubWFwKCgpID0+IGRlZmF1bHRDb2xvcik7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0RXZlbnRzKHRoaXNQbGF5ZXIpIHtcbiAgICBlbWl0KCdwbGF5ZmllbGQnLCB0aGlzUGxheWVyLnBsYXlmaWVsZCwgdGhpc1BsYXllci5zb2NrZXRJRCk7XG59XG5cbmNsYXNzIEdhbWVTZXNzaW9uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucm9vbSA9IFwiXCI7XG4gICAgICAgIHRoaXMuaG9zdCA9IFwiXCI7XG4gICAgICAgIHRoaXMucGxheWVycyA9IEFycmF5KCk7XG4gICAgICAgIHRoaXMudGV0cm9taW5vcyA9IEFycmF5KG5leHRUZXRyb21pbm8oKSwgbmV4dFRldHJvbWlubygpKTtcbiAgICB9XG5cbiAgICBuZXdUZXRyb21pbm8oKSB7XG4gICAgICAgIHRoaXMudGV0cm9taW5vcy5wdXNoKG5leHRUZXRyb21pbm8oKSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZUxpbmVzKHVzZXIpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdXNlcikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzYWJsZUxpbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jb25zdCBzZXNzaW9ucyA9IEFycmF5KCk7XG5cbmZ1bmN0aW9uIGZpbmRHYW1lU2Vzc2lvbihyb29tKSB7XG4gICAgcmV0dXJuIHNlc3Npb25zLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50LnJvb20gPT09IHJvb20pO1xufVxuXG5mdW5jdGlvbiBmaW5kVXNlckluU2Vzc2lvbihyb29tLCB1c2VybmFtZSkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBmaW5kR2FtZVNlc3Npb24ocm9vbSk7XG4gICAgaWYgKCFzZXNzaW9uKVxuICAgICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gc2Vzc2lvbi5wbGF5ZXJzLmZpbmQodXNlciA9PiB1c2VyLm5hbWUgPT09IHVzZXJuYW1lKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvcHlUZXRyb21pbm8gPSAodGV0cm9taW5vKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBUZXRyb21pbm8odGV0cm9taW5vLnNoYXBlLCB0ZXRyb21pbm8uY29sb3IsIFswLCAtMV0sIHRldHJvbWluby5yb3RhdGlvbkFycmF5KTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllcihzZXNzaW9uLCBuYW1lLCBzb2NrZXRJRCkge1xuICAgIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcbiAgICBwbGF5ZXIuc2Vzc2lvbiA9IHNlc3Npb247XG4gICAgcGxheWVyLm5hbWUgPSBuYW1lO1xuICAgIHBsYXllci5zb2NrZXRJRCA9IHNvY2tldElEO1xuICAgIHNlc3Npb24ucGxheWVycy5wdXNoKHBsYXllcik7XG4gICAgcGxheWVyLmN1cnJlbnRUZXRyb21pbm8gPSBjb3B5VGV0cm9taW5vKHNlc3Npb24udGV0cm9taW5vc1swXSk7XG4gICAgcGxheWVyLm5leHRUZXRyb21pbm8gPSBjb3B5VGV0cm9taW5vKHNlc3Npb24udGV0cm9taW5vc1sxXSk7XG4gICAgcmV0dXJuIHBsYXllcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlR2FtZVNlc3Npb24ocm9vbSwgaG9zdCwgc29ja2V0SUQpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gbmV3IEdhbWVTZXNzaW9uKCk7XG4gICAgc2Vzc2lvbi5yb29tID0gcm9vbTtcbiAgICBzZXNzaW9uLmhvc3QgPSBob3N0O1xuXG4gICAgY3JlYXRlUGxheWVyKHNlc3Npb24sIGhvc3QsIHNvY2tldElEKTtcbiAgICBzZXNzaW9ucy5wdXNoKHNlc3Npb24pO1xuXG4gICAgcmV0dXJuIHNlc3Npb247XG59XG5cbmZ1bmN0aW9uIGpvaW5HYW1lU2Vzc2lvbihyb29tLCB1c2VyLCBzb2NrZXRJRCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBmaW5kR2FtZVNlc3Npb24ocm9vbSk7XG4gICAgcmV0dXJuIGNyZWF0ZVBsYXllcihzZXNzaW9uLCB1c2VyLCBzb2NrZXRJRCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlTGVmdCh1c2VybmFtZUFuZFJvb20pIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XG4gICAgcGxheWVyLm1vdmVMZWZ0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlUmlnaHQodXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5tb3ZlUmlnaHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZUN1cnJlbnRUZXRyb21pbm8odXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5yb3RhdGUoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxpc2lvbkRldGVjdGVkKHBsYXlmaWVsZCwgY3VycmVudFRldHJvbWlubykge1xuICAgIGxldCByb3cgPSAwO1xuICAgIHdoaWxlIChyb3cgPCA0KSB7XG4gICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXRyb21pbm8uc2hhcGVbcm93XVtjb2x1bW5dKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZC5sZW5ndGggLSAxIDwgY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvdyB8fCBwbGF5ZmllbGRbMF0ubGVuZ3RoIC0gMSA8IGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMF0gKyBjb2x1bW4pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uIDwgMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3ddW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMF0gKyBjb2x1bW5dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3ddW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMF0gKyBjb2x1bW5dICE9PSBkZWZhdWx0Q29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByb3cgKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBsaW5lSXNGaWxsZWQobGluZSkge1xuICAgIHJldHVybiAhbGluZS5zb21lKGNlbGwgPT4gY2VsbCA9PT0gZGVmYXVsdENvbG9yIHx8IGNlbGwgPT09IGRpc2FibGVkQ29sb3IpO1xufVxuXG5mdW5jdGlvbiBjbGVhckxpbmUobGluZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsaW5lW2ldID0gZGVmYXVsdENvbG9yO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY29sbGFwc2VMaW5lcyhpLCBwbGF5ZmllbGQpIHtcbiAgICBmb3IgKGxldCByb3cgPSBpOyByb3cgPiAwOyByb3ctLSkge1xuICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgIHBsYXlmaWVsZFtyb3ddW2NvbHVtbl0gPSBwbGF5ZmllbGRbcm93IC0gMV1bY29sdW1uXTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyRmlsbGVkTGluZXMocGxheWZpZWxkLCBjdXJyZW50VGV0cm9taW5vKSB7XG4gICAgbGV0IGN1cnJlbnRMaW5lSW5kZXggPSBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdO1xuICAgIGNvbnN0IGxhc3RDbGVhcmFibGVMaW5lSW5kZXggPSBjdXJyZW50TGluZUluZGV4ICsgNDtcbiAgICBsZXQgY2xlYXJlZExpbmVzID0gMDtcblxuICAgIHdoaWxlIChjdXJyZW50TGluZUluZGV4IDwgbGFzdENsZWFyYWJsZUxpbmVJbmRleCkge1xuICAgICAgICBpZiAocGxheWZpZWxkW2N1cnJlbnRMaW5lSW5kZXhdKSB7XG4gICAgICAgICAgICBpZiAobGluZUlzRmlsbGVkKHBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSkpIHtcbiAgICAgICAgICAgICAgICBjbGVhckxpbmUocGxheWZpZWxkW2N1cnJlbnRMaW5lSW5kZXhdKTtcbiAgICAgICAgICAgICAgICBjb2xsYXBzZUxpbmVzKGN1cnJlbnRMaW5lSW5kZXgsIHBsYXlmaWVsZCk7XG4gICAgICAgICAgICAgICAgY2xlYXJlZExpbmVzKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudExpbmVJbmRleCArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gKGNsZWFyZWRMaW5lcyk7XG59XG5cbmNvbnN0IHRldHJvbWlub3MgPSBbbmV3IFRldHJvbWlubyhMaW5lWzBdLCAnY3lhbicsIFswLCAtMV0sIExpbmUpLFxuICAgIG5ldyBUZXRyb21pbm8oTFswXSwgJ29yYW5nZScsIFswLCAtMV0sIEwpLFxuICAgIG5ldyBUZXRyb21pbm8oUmV2ZXJzZUxbMF0sIFwiYmx1ZVwiLCBbMCwgLTFdLCBSZXZlcnNlTCksXG4gICAgbmV3IFRldHJvbWlubyhTcXVhcmVbMF0sICd5ZWxsb3cnLCBbMCwgLTFdLCBTcXVhcmUpLFxuICAgIG5ldyBUZXRyb21pbm8oU1swXSwgJ2dyZWVuJywgWzAsIC0xXSwgUyksXG4gICAgbmV3IFRldHJvbWlubyhaWzBdLCAncmVkJywgWzAsIC0xXSwgWiksXG4gICAgbmV3IFRldHJvbWlubyhUWzBdLCAncHVycGxlJywgWzAsIC0xXSwgVCldO1xuXG5mdW5jdGlvbiBuZXh0VGV0cm9taW5vKCkge1xuICAgIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGV0cm9taW5vcy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHRldHJvbWlub3NbaW5kZXhdO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTZXNzaW9uV2l0aFVzZXIocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKSB7XG4gICAgY29uc29sZS5sb2coXCJTZXNzaW9uIG5vdCBmb3VuZCwgYXR0ZW1wdGluZyB0byBjcmVhdGUgYSBuZXcgc2Vzc2lvblwiKTtcbiAgICBjb25zdCBuZXdTZXNzaW9uID0gY3JlYXRlR2FtZVNlc3Npb24ocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKTtcbiAgICBpZiAoIW5ld1Nlc3Npb24pIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gY3JlYXRlIGEgc2Vzc2lvbi5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYFNlc3Npb24gXCIke3Jvb219XCIgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQgd2l0aCBcIiR7bmV3U2Vzc2lvbi5ob3N0fVwiIGFzIGhvc3QuYCk7XG4gICAgfVxuICAgIHJldHVybiBuZXdTZXNzaW9uLnBsYXllcnNbMF07XG59XG5cbmZ1bmN0aW9uIGdldFVzZXIocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKSB7XG4gICAgaWYgKCFmaW5kR2FtZVNlc3Npb24ocm9vbSkpXG4gICAgICAgIHJldHVybiBjcmVhdGVTZXNzaW9uV2l0aFVzZXIocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKTtcblxuICAgIGNvbnNvbGUubG9nKFwiU2Vzc2lvbiBmb3VuZCwgYXR0ZW1wdGluZyB0byBqb2luLlwiKTtcbiAgICBjb25zdCB1c2VyID0gZmluZFVzZXJJblNlc3Npb24ocm9vbSwgdXNlcm5hbWUpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiBub3QgZm91bmQgaW4gc2Vzc2lvbiwgYWRkaW5nLi4uYCk7XG4gICAgICAgIHJldHVybiBqb2luR2FtZVNlc3Npb24ocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNlciBcIiR7dXNlcm5hbWV9XCIgaXMgYWxyZWFkeSBpbiBzZXNzaW9uLmApO1xuICAgIH1cblxuICAgIHJldHVybiB1c2VyO1xufVxuXG5mdW5jdGlvbiBwYXJzZVVzZXJuYW1lKHNwbGl0KSB7XG4gICAgcmV0dXJuIHNwbGl0WzFdXG4gICAgICAgID8gc3BsaXRbMV0uc2xpY2UoMCwgc3BsaXRbMV0ubGVuZ3RoIC0gMSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqb2luVGV0cmlzKGhhc2gsIHNvY2tldElEKSB7XG4gICAgY29uc3Qgc3BsaXQgPSBoYXNoLnNwbGl0KCdbJyk7XG4gICAgY29uc3Qgcm9vbSA9IHNwbGl0WzBdLnNsaWNlKDEpO1xuICAgIGNvbnN0IHVzZXJuYW1lID0gcGFyc2VVc2VybmFtZShzcGxpdCk7XG5cbiAgICBjb25zb2xlLmxvZyhcImpvaW5UZXRyaXMoKSBjYWxsZWRcIik7XG4gICAgY29uc29sZS5sb2coYFVzZXIgXCIke3VzZXJuYW1lfVwiIHRyaWVkIHRvIGNvbm5lY3QgdG8gcm9vbTogXCIke3Jvb219XCJgKTtcblxuICAgIGNvbnN0IHVzZXIgPSBnZXRVc2VyKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCk7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICB1c2VyLnBsYXkoKVxuICAgIH0sIGludGVydmFsKTtcbn1cbiIsIlxuZXhwb3J0IGNvbnN0IFNxdWFyZSA9IFtcbiAgICBbXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuXG5leHBvcnQgY29uc3QgTGluZSA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAxXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuXG5leHBvcnQgY29uc3QgVCA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuXG5leHBvcnQgY29uc3QgTCA9IFtcbiAgICBbXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuXG5leHBvcnQgY29uc3QgUmV2ZXJzZUwgPSBbXG4gICAgW1xuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IFMgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IFogPSBbXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF1dG8tYmluZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTsiXSwic291cmNlUm9vdCI6IiJ9