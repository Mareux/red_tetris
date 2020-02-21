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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGxheWVyLmpzIiwid2VicGFjazovLy8uL3BsYXlmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGV0cmlzLmpzIiwid2VicGFjazovLy8uL3RldHJvbWluby5qcyIsIndlYnBhY2s6Ly8vLi90ZXRyb21pbm9zLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF1dG8tYmluZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb2NrZXQuaW9cIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBOEI7QUFDd0Q7QUFDbEQ7QUFDcEMsaUJBQWlCLG1CQUFPLENBQUMs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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEhPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuS0Esc0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsc0MiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2VydmVyLmpzXCIpO1xuIiwiaW1wb3J0IHtlbWl0fSBmcm9tIFwiLi9zZXJ2ZXJcIjtcbmltcG9ydCB7Y29weVRldHJvbWlubywgY3JlYXRlUGxheWZpZWxkLCBlbWl0UGxheWZpZWxkLCBlbWl0VGV0cm9taW5vfSBmcm9tIFwiLi90ZXRyaXNcIjtcbmltcG9ydCBQbGF5ZmllbGQgZnJvbSBcIi4vcGxheWZpZWxkXCI7XG5jb25zdCBhdXRvQmluZCA9IHJlcXVpcmUoJ2F1dG8tYmluZCcpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5wbGF5ZmllbGQgPSBuZXcgUGxheWZpZWxkKGNyZWF0ZVBsYXlmaWVsZCgpKTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJcIjtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnNvY2tldElEID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGV0cm9taW5vcyA9IG51bGw7XG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRldHJvbWlubykge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmVyYXNlVGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKz0gMTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzLmN1cnJlbnRUZXRyb21pbm8pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdIC09IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgICAgICAgICBsZXQgY2xlYXJlZExpbmVzID0gdGhpcy5wbGF5ZmllbGQuY2xlYXJGaWxsZWRMaW5lcyh0aGlzLmN1cnJlbnRUZXRyb21pbm8pO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xlYXJlZExpbmVzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uLmRpc2FibGVMaW5lcyh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdUZXRyb21pbm8oKTtcbiAgICAgICAgICAgICAgICBlbWl0UGxheWZpZWxkKHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgIH1cblxuICAgIG5ld1RldHJvbWlubygpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vID0gdGhpcy5uZXh0VGV0cm9taW5vO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm9JbmRleCsrO1xuICAgICAgICBpZiAoIXRoaXMuc2Vzc2lvbi50ZXRyb21pbm9zW3RoaXMubmV4dFRldHJvbWlub0luZGV4XSlcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5uZXdUZXRyb21pbm8oKTtcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vID0gY29weVRldHJvbWlubyh0aGlzLnNlc3Npb24udGV0cm9taW5vc1t0aGlzLm5leHRUZXRyb21pbm9JbmRleF0pO1xuICAgICAgICBlbWl0KCduZXh0VGV0cm9taW5vJywgdGhpcy5uZXh0VGV0cm9taW5vLCB0aGlzLnNvY2tldElEKTtcbiAgICB9XG5cbiAgICByb3RhdGUoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5yb3RhdGUodGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgIH1cblxuICAgIG1vdmVMZWZ0KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ubW92ZUxlZnQodGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgIH07XG5cbiAgICBtb3ZlUmlnaHQoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5tb3ZlUmlnaHQodGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgIH07XG5cbiAgICBkaXNhYmxlTGluZSgpIHtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5wbGF5ZmllbGQubGVuZ3RoIC0gMTsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkW3Jvd11bY29sdW1uXSA9IHRoaXMucGxheWZpZWxkW3JvdyArIDFdW2NvbHVtbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFt0aGlzLnBsYXlmaWVsZC5sZW5ndGggLSAxXVtjb2x1bW5dID0gJ2dyYXknO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IGF1dG9CaW5kIGZyb20gXCJhdXRvLWJpbmRcIjtcbmltcG9ydCB7ZGVmYXVsdENvbG9yLCBkaXNhYmxlZENvbG9yfSBmcm9tIFwiLi90ZXRyaXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWZpZWxkIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZmllbGQpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gcGxheWZpZWxkO1xuICAgIH1cblxuICAgIGNvbGxpc2lvbkRldGVjdGVkKGN1cnJlbnRUZXRyb21pbm8pIHtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChjb2x1bW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXRyb21pbm8uc2hhcGVbcm93XVtjb2x1bW5dKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZC5sZW5ndGggLSAxIDwgY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvdyB8fCB0aGlzLnBsYXlmaWVsZFswXS5sZW5ndGggLSAxIDwgY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbiA8IDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGRbY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvd11bY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGRbY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvd11bY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbl0gIT09IGRlZmF1bHRDb2xvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGluZUlzRmlsbGVkKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuICFsaW5lLnNvbWUoY2VsbCA9PiBjZWxsID09PSBkZWZhdWx0Q29sb3IgfHwgY2VsbCA9PT0gZGlzYWJsZWRDb2xvcik7XG4gICAgfVxuXG4gICAgY2xlYXJMaW5lKGxpbmUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaW5lW2ldID0gZGVmYXVsdENvbG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29sbGFwc2VMaW5lcyhpKSB7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IGk7IHJvdyA+IDA7IHJvdy0tKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFtyb3ddW2NvbHVtbl0gPSB0aGlzLnBsYXlmaWVsZFtyb3cgLSAxXVtjb2x1bW5dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJGaWxsZWRMaW5lcyhjdXJyZW50VGV0cm9taW5vKSB7XG4gICAgICAgIGxldCBjdXJyZW50TGluZUluZGV4ID0gY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXTtcbiAgICAgICAgY29uc3QgbGFzdENsZWFyYWJsZUxpbmVJbmRleCA9IGN1cnJlbnRMaW5lSW5kZXggKyA0O1xuICAgICAgICBsZXQgY2xlYXJlZExpbmVzID0gMDtcblxuICAgICAgICB3aGlsZSAoY3VycmVudExpbmVJbmRleCA8IGxhc3RDbGVhcmFibGVMaW5lSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpbmVJc0ZpbGxlZCh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckxpbmUodGhpcy5wbGF5ZmllbGRbY3VycmVudExpbmVJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlTGluZXMoY3VycmVudExpbmVJbmRleCwgdGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhcmVkTGluZXMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50TGluZUluZGV4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChjbGVhcmVkTGluZXMpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7am9pblRldHJpcywgbW92ZUxlZnQsIG1vdmVSaWdodCwgcm90YXRlQ3VycmVudFRldHJvbWlub30gZnJvbSBcIi4vdGV0cmlzXCI7XG5cbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG5jb25zdCBTZXJ2ZXIgPSByZXF1aXJlKCdzb2NrZXQuaW8nKTtcbmNvbnN0IGlvID0gbmV3IFNlcnZlcihodHRwLHtcbiAgICBwYXRoOlwiLi4vY2xpZW50L2J1aWxkXCIsXG4gICAgc2VydmVDbGllbnQ6IHRydWVcbn0pO1xuXG5leHBvcnQgbGV0IGludGVydmFsID0gMTUwO1xuXG5pby5vbignY29ubmVjdGlvbicsIChjbGllbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIlxcbkNvbm5lY3Rpb24gaGFwcGVuZWQuXCIpO1xuICAgIGNsaWVudC5vbignSGFzaCcsIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgam9pblRldHJpcyhzdHJpbmcsIGNsaWVudC5pZCk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKCdBcnJvd1VwJywgKHVzZXJuYW1lQW5kUm9vbSkgPT4ge1xuICAgICAgICByb3RhdGVDdXJyZW50VGV0cm9taW5vKHVzZXJuYW1lQW5kUm9vbSk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKCdBcnJvd0Rvd24nLCAoKSA9PiB7XG4gICAgICAgIGludGVydmFsID0gNTA7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKCdBcnJvd0Rvd25VbnByZXNzZWQnLCAoKSA9PiB7XG4gICAgICAgIGludGVydmFsID0gMzAwO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbignQXJyb3dMZWZ0JywgKHVzZXJuYW1lQW5kUm9vbSkgPT4ge1xuICAgICAgICBtb3ZlTGVmdCh1c2VybmFtZUFuZFJvb20pO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbignQXJyb3dSaWdodCcsICh1c2VybmFtZUFuZFJvb20pID0+IHtcbiAgICAgICAgbW92ZVJpZ2h0KHVzZXJuYW1lQW5kUm9vbSk7XG4gICAgfSlcbn0pO1xuXG5leHBvcnQgY29uc3QgZW1pdCA9IChldmVudCwgYXJncywgc29ja2V0SUQpID0+IHtcbiAgICBpby50byhgJHtzb2NrZXRJRH1gKS5lbWl0KGV2ZW50LCBhcmdzKTtcbn07XG5cbmNvbnN0IG9uID0gKGV2ZW50LCBjYWxsYmFjaywgZW1pdCkgPT4ge1xuXG59O1xuXG5jb25zdCBwb3J0ID0gODAwMDtcbmlvLmxpc3Rlbihwb3J0KTtcbmNvbnNvbGUubG9nKCdsaXN0ZW5pbmcgb24gcG9ydCAnLCBwb3J0KTtcbiIsImltcG9ydCB7ZW1pdCwgaW50ZXJ2YWx9IGZyb20gXCIuL3NlcnZlclwiO1xuaW1wb3J0IFRldHJvbWlubyBmcm9tIFwiLi90ZXRyb21pbm9cIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQge0wsIExpbmUsIFJldmVyc2VMLCBTLCBTcXVhcmUsIFQsIFp9IGZyb20gXCIuL3RldHJvbWlub3NcIjtcblxuY29uc3QgYXV0b0JpbmQgPSByZXF1aXJlKCdhdXRvLWJpbmQnKTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb2xvciA9ICdncmF5JztcbmV4cG9ydCBjb25zdCBkaXNhYmxlZENvbG9yID0gJ3BpbmsnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWZpZWxkKCkge1xuICAgIHJldHVybiBbLi4ubmV3IEFycmF5KDIwKV0ubWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIFsuLi5uZXcgQXJyYXkoMTApXS5tYXAoKCkgPT4gZGVmYXVsdENvbG9yKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRFdmVudHModGhpc1BsYXllcikge1xuICAgIGVtaXQoJ3BsYXlmaWVsZCcsIHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpc1BsYXllci5zb2NrZXRJRCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0UGxheWZpZWxkKHRoaXNQbGF5ZXIpIHtcbiAgICB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICBlbWl0KCdwbGF5ZmllbGQnLCB0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXNQbGF5ZXIuc29ja2V0SUQpO1xuICAgIHRoaXNQbGF5ZXIuY3VycmVudFRldHJvbWluby5kcmF3VGV0cm9taW5vKHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0VGV0cm9taW5vKHRoaXNQbGF5ZXIpIHtcbiAgICBlbWl0KCd0ZXRyb21pbm8nLCB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8sIHRoaXNQbGF5ZXIuc29ja2V0SUQpO1xufVxuXG5jbGFzcyBHYW1lU2Vzc2lvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJvb20gPSBcIlwiO1xuICAgICAgICB0aGlzLmhvc3QgPSBcIlwiO1xuICAgICAgICB0aGlzLnBsYXllcnMgPSBBcnJheSgpO1xuICAgICAgICB0aGlzLnRldHJvbWlub3MgPSBBcnJheShjcmVhdGVUZXRyb21pbm8oKSwgY3JlYXRlVGV0cm9taW5vKCkpO1xuICAgIH1cblxuICAgIG5ld1RldHJvbWlubygpIHtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zLnB1c2goY3JlYXRlVGV0cm9taW5vKCkpO1xuICAgIH1cblxuICAgIGRpc2FibGVMaW5lcyh1c2VyKSB7XG4gICAgICAgIHRoaXMucGxheWVycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IHVzZXIpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmRpc2FibGVMaW5lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY29uc3QgdGV0cm9taW5vcyA9IFtuZXcgVGV0cm9taW5vKExpbmVbMF0sICdjeWFuJywgWzAsIC0xXSwgTGluZSksXG4gICAgbmV3IFRldHJvbWlubyhMWzBdLCAnb3JhbmdlJywgWzAsIC0xXSwgTCksXG4gICAgbmV3IFRldHJvbWlubyhSZXZlcnNlTFswXSwgXCJibHVlXCIsIFswLCAtMV0sIFJldmVyc2VMKSxcbiAgICBuZXcgVGV0cm9taW5vKFNxdWFyZVswXSwgJ3llbGxvdycsIFswLCAtMV0sIFNxdWFyZSksXG4gICAgbmV3IFRldHJvbWlubyhTWzBdLCAnZ3JlZW4nLCBbMCwgLTFdLCBTKSxcbiAgICBuZXcgVGV0cm9taW5vKFpbMF0sICdyZWQnLCBbMCwgLTFdLCBaKSxcbiAgICBuZXcgVGV0cm9taW5vKFRbMF0sICdwdXJwbGUnLCBbMCwgLTFdLCBUKV07XG5cbmZ1bmN0aW9uIGNyZWF0ZVRldHJvbWlubygpIHtcbiAgICBjb25zdCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRldHJvbWlub3MubGVuZ3RoKTtcblxuICAgIHJldHVybiB0ZXRyb21pbm9zW2luZGV4XTtcbn1cblxuY29uc3Qgc2Vzc2lvbnMgPSBBcnJheSgpO1xuXG5mdW5jdGlvbiBmaW5kR2FtZVNlc3Npb24ocm9vbSkge1xuICAgIHJldHVybiBzZXNzaW9ucy5maW5kKGVsZW1lbnQgPT4gZWxlbWVudC5yb29tID09PSByb29tKTtcbn1cblxuZnVuY3Rpb24gZmluZFVzZXJJblNlc3Npb24ocm9vbSwgdXNlcm5hbWUpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gZmluZEdhbWVTZXNzaW9uKHJvb20pO1xuICAgIGlmICghc2Vzc2lvbilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIHNlc3Npb24ucGxheWVycy5maW5kKHVzZXIgPT4gdXNlci5uYW1lID09PSB1c2VybmFtZSk7XG59XG5cbmV4cG9ydCBjb25zdCBjb3B5VGV0cm9taW5vID0gKHRldHJvbWlubykgPT4ge1xuICAgIHJldHVybiBuZXcgVGV0cm9taW5vKHRldHJvbWluby5zaGFwZSwgdGV0cm9taW5vLmNvbG9yLCBbMCwgLTFdLCB0ZXRyb21pbm8ucm90YXRpb25BcnJheSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXIoc2Vzc2lvbiwgbmFtZSwgc29ja2V0SUQpIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gICAgcGxheWVyLnNlc3Npb24gPSBzZXNzaW9uO1xuICAgIHBsYXllci5uYW1lID0gbmFtZTtcbiAgICBwbGF5ZXIuc29ja2V0SUQgPSBzb2NrZXRJRDtcbiAgICBzZXNzaW9uLnBsYXllcnMucHVzaChwbGF5ZXIpO1xuICAgIHBsYXllci5jdXJyZW50VGV0cm9taW5vID0gY29weVRldHJvbWlubyhzZXNzaW9uLnRldHJvbWlub3NbMF0pO1xuICAgIHBsYXllci5uZXh0VGV0cm9taW5vID0gY29weVRldHJvbWlubyhzZXNzaW9uLnRldHJvbWlub3NbMV0pO1xuICAgIHJldHVybiBwbGF5ZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdhbWVTZXNzaW9uKHJvb20sIGhvc3QsIHNvY2tldElEKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBHYW1lU2Vzc2lvbigpO1xuICAgIHNlc3Npb24ucm9vbSA9IHJvb207XG4gICAgc2Vzc2lvbi5ob3N0ID0gaG9zdDtcblxuICAgIGNyZWF0ZVBsYXllcihzZXNzaW9uLCBob3N0LCBzb2NrZXRJRCk7XG4gICAgc2Vzc2lvbnMucHVzaChzZXNzaW9uKTtcblxuICAgIHJldHVybiBzZXNzaW9uO1xufVxuXG5mdW5jdGlvbiBqb2luR2FtZVNlc3Npb24ocm9vbSwgdXNlciwgc29ja2V0SUQpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gZmluZEdhbWVTZXNzaW9uKHJvb20pO1xuICAgIHJldHVybiBjcmVhdGVQbGF5ZXIoc2Vzc2lvbiwgdXNlciwgc29ja2V0SUQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZUxlZnQodXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5tb3ZlTGVmdCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZVJpZ2h0KHVzZXJuYW1lQW5kUm9vbSkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIubW92ZVJpZ2h0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVDdXJyZW50VGV0cm9taW5vKHVzZXJuYW1lQW5kUm9vbSkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIucm90YXRlKCk7XG59XG5cblxuXG5mdW5jdGlvbiBjcmVhdGVTZXNzaW9uV2l0aFVzZXIocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKSB7XG4gICAgY29uc29sZS5sb2coXCJTZXNzaW9uIG5vdCBmb3VuZCwgYXR0ZW1wdGluZyB0byBjcmVhdGUgYSBuZXcgc2Vzc2lvblwiKTtcbiAgICBjb25zdCBuZXdTZXNzaW9uID0gY3JlYXRlR2FtZVNlc3Npb24ocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKTtcbiAgICBpZiAoIW5ld1Nlc3Npb24pIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJGYWlsZWQgdG8gY3JlYXRlIGEgc2Vzc2lvbi5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYFNlc3Npb24gXCIke3Jvb219XCIgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQgd2l0aCBcIiR7bmV3U2Vzc2lvbi5ob3N0fVwiIGFzIGhvc3QuYCk7XG4gICAgfVxuICAgIHJldHVybiBuZXdTZXNzaW9uLnBsYXllcnNbMF07XG59XG5cbmZ1bmN0aW9uIGdldFVzZXIocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKSB7XG4gICAgaWYgKCFmaW5kR2FtZVNlc3Npb24ocm9vbSkpXG4gICAgICAgIHJldHVybiBjcmVhdGVTZXNzaW9uV2l0aFVzZXIocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKTtcblxuICAgIGNvbnNvbGUubG9nKFwiU2Vzc2lvbiBmb3VuZCwgYXR0ZW1wdGluZyB0byBqb2luLlwiKTtcbiAgICBjb25zdCB1c2VyID0gZmluZFVzZXJJblNlc3Npb24ocm9vbSwgdXNlcm5hbWUpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiBub3QgZm91bmQgaW4gc2Vzc2lvbiwgYWRkaW5nLi4uYCk7XG4gICAgICAgIHJldHVybiBqb2luR2FtZVNlc3Npb24ocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNlciBcIiR7dXNlcm5hbWV9XCIgaXMgYWxyZWFkeSBpbiBzZXNzaW9uLmApO1xuICAgIH1cblxuICAgIHJldHVybiB1c2VyO1xufVxuXG5mdW5jdGlvbiBwYXJzZVVzZXJuYW1lKHNwbGl0KSB7XG4gICAgcmV0dXJuIHNwbGl0WzFdXG4gICAgICAgID8gc3BsaXRbMV0uc2xpY2UoMCwgc3BsaXRbMV0ubGVuZ3RoIC0gMSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqb2luVGV0cmlzKGhhc2gsIHNvY2tldElEKSB7XG4gICAgY29uc3Qgc3BsaXQgPSBoYXNoLnNwbGl0KCdbJyk7XG4gICAgY29uc3Qgcm9vbSA9IHNwbGl0WzBdLnNsaWNlKDEpO1xuICAgIGNvbnN0IHVzZXJuYW1lID0gcGFyc2VVc2VybmFtZShzcGxpdCk7XG5cbiAgICBjb25zb2xlLmxvZyhcImpvaW5UZXRyaXMoKSBjYWxsZWRcIik7XG4gICAgY29uc29sZS5sb2coYFVzZXIgXCIke3VzZXJuYW1lfVwiIHRyaWVkIHRvIGNvbm5lY3QgdG8gcm9vbTogXCIke3Jvb219XCJgKTtcblxuICAgIGNvbnN0IHVzZXIgPSBnZXRVc2VyKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCk7XG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICB1c2VyLnBsYXkoKVxuICAgIH0sIGludGVydmFsKTtcbn1cbiIsIlxuY29uc3QgYXV0b0JpbmQgPSByZXF1aXJlKCdhdXRvLWJpbmQnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV0cm9taW5vIHtcbiAgICBjb25zdHJ1Y3RvcihzaGFwZSwgY29sb3IsIHBvc2l0aW9uLCByb3RhdGlvbkFycmF5KSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNoYXBlID0gc2hhcGU7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLnJvdGF0aW9uQXJyYXkgPSByb3RhdGlvbkFycmF5O1xuICAgIH1cblxuICAgIGRyYXdUZXRyb21pbm8ocGxheWZpZWxkKSB7XG4gICAgICAgIGxldCByb3cgPSAwO1xuICAgICAgICB3aGlsZSAocm93IDwgNCkge1xuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVt0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXSAmJiB0aGlzLnNoYXBlW3Jvd11bY29sdW1uXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW3RoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5dID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdyArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkKSB7XG4gICAgICAgIGxldCByb3cgPSAwO1xuICAgICAgICB3aGlsZSAocm93IDwgNCkge1xuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVt0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXSAmJiB0aGlzLnNoYXBlW3Jvd11bY29sdW1uXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW3RoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5dID0gJ2dyYXknO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbHVtbiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlTGVmdChwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSAtPSAxO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSArPSAxO1xuICAgICAgICB0aGlzLmRyYXdUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgfTtcblxuICAgIG1vdmVSaWdodChwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSArPSAxO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSAtPSAxO1xuICAgICAgICB0aGlzLmRyYXdUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgfTtcblxuICAgIHJvdGF0ZShwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpID09PSB0aGlzLnJvdGF0aW9uQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbdGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgKyAxXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKVxuICAgICAgICAgICAgdGhpcy5fd2FsbEtpY2socGxheWZpZWxkKTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgIH1cblxuICAgIF93YWxsS2ljayhwbGF5ZmllbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdIC0gMSwgdGhpcy5wb3NpdGlvblsxXV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0gKyAxLCB0aGlzLnBvc2l0aW9uWzFdXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSAtIDFdLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdICsgMV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0gLSAyLCB0aGlzLnBvc2l0aW9uWzFdXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSArIDIsIHRoaXMucG9zaXRpb25bMV1dLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdIC0gMl0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gKyAyXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Vucm90YXRlKCk7XG4gICAgfVxuXG4gICAgX3Vucm90YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5W3RoaXMucm90YXRpb25BcnJheS5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbdGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgLSAxXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90cnlUZXRyb21pbm9Qb3NpdGlvbihwb3NpdGlvbiwgcGxheWZpZWxkKSB7XG4gICAgICAgIGNvbnN0IHRtcCA9IFsuLi50aGlzLnBvc2l0aW9uXTtcblxuICAgICAgICB0aGlzLnBvc2l0aW9uWzBdID0gcG9zaXRpb25bMF07XG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gPSBwb3NpdGlvblsxXTtcbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSA9IHRtcFswXTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMV0gPSB0bXBbMV07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59XG4iLCJcbmV4cG9ydCBjb25zdCBTcXVhcmUgPSBbXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IExpbmUgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDFdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IFQgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IEwgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IFJldmVyc2VMID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBTID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBaID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhdXRvLWJpbmRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==