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
        this.gameOver = false;
        this.score = 0;
        this.totalClearedLines = 0;
    }

    play() {
        if (this.currentTetromino) {
            this.currentTetromino.eraseTetromino(this.playfield.playfield);
            this.currentTetromino.position[1] += 1;
            if (this.playfield.collisionDetected(this.currentTetromino)) {
                this.currentTetromino.position[1] -= 1;
                this.currentTetromino.drawTetromino(this.playfield.playfield);
                if (this.currentTetromino.position[1] < 0) {
                    this.gameOver = true;
                    Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])('gameOver', 'GAME_FINISHED', this.socketID);
                    return ;
                }
                let clearedLines = this.playfield.clearFilledLines(this.currentTetromino);
                for (let i = 0; i < clearedLines; i++) {
                    this.session.disableLines(this);
                }
                this.increaseScore(clearedLines);
                this.newTetromino();
                Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitPlayfield"])(this);
            } else
                this.currentTetromino.drawTetromino(this.playfield.playfield);
        }
        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitTetromino"])(this);
        setTimeout(this.play, this.interval);
    }

    increaseScore(clearedLines) {
        this.totalClearedLines += clearedLines;
        this.score += clearedLines * (10 + (clearedLines - 1));
        Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])('score', this.score, this.socketID);
        Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])('clearedLines', this.totalClearedLines, this.socketID);
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
        if (this.gameOver)
            return;
        this.currentTetromino.rotate(this.playfield);
        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitTetromino"])(this);
    }

    moveLeft() {
        if (this.gameOver)
            return;
        this.currentTetromino.moveLeft(this.playfield);
        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitTetromino"])(this);
    };

    moveRight() {
        if (this.gameOver)
            return ;
        this.currentTetromino.moveRight(this.playfield);
        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitTetromino"])(this);
    };

    disableLine() {
        this.currentTetromino.eraseTetromino(this.playfield.playfield);
        for (let row = 0; row < this.playfield.playfield.length - 1; row++) {
            for (let column = 0; column < 10; column++) {
                this.playfield.playfield[row][column] = this.playfield.playfield[row + 1][column];
            }
        }
        for (let column = 0; column < 10; column++) {
             this.playfield.playfield[this.playfield.playfield.length - 1][column] = _tetris__WEBPACK_IMPORTED_MODULE_1__["disabledColor"];
        }
        this.currentTetromino.position[1] -= 1;
        this.currentTetromino.drawTetromino(this.playfield.playfield);
        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitPlayfield"])(this);
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


const express = __webpack_require__(/*! express */ "express");
const app = express();
const server = __webpack_require__(/*! http */ "http").Server(app);
const io = __webpack_require__(/*! socket.io */ "socket.io")(server);

const path = __webpack_require__(/*! path */ "path");

const port = 8080;

app.use(express.static(path.join(__dirname, '../../client/build')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

server.listen(port);


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

const tetrominos = [new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Line"][0], 'cyan', [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Line"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["L"][0], 'orange', [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["L"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["ReverseL"][0], "blue", [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["ReverseL"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Square"][0], 'yellow', [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Square"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["S"][0], 'green', [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["S"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Z"][0], 'red', [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Z"]),
    new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["T"][0], 'purple', [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["T"])];

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
        this.position = [3, -4];
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

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGxheWVyLmpzIiwid2VicGFjazovLy8uL3BsYXlmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGV0cmlzLmpzIiwid2VicGFjazovLy8uL3RldHJvbWluby5qcyIsIndlYnBhY2s6Ly8vLi90ZXRyb21pbm9zLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF1dG8tYmluZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNs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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25LQSxzQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zZXJ2ZXIuanNcIik7XG4iLCJpbXBvcnQge2VtaXR9IGZyb20gXCIuL3NlcnZlclwiO1xuaW1wb3J0IHtjb3B5VGV0cm9taW5vLCBjcmVhdGVQbGF5ZmllbGQsIGRpc2FibGVkQ29sb3IsIGVtaXRQbGF5ZmllbGQsIGVtaXRUZXRyb21pbm99IGZyb20gXCIuL3RldHJpc1wiO1xuaW1wb3J0IFBsYXlmaWVsZCBmcm9tIFwiLi9wbGF5ZmllbGRcIjtcbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZSgnYXV0by1iaW5kJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNlc3Npb24gPSBudWxsO1xuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IG5ldyBQbGF5ZmllbGQoY3JlYXRlUGxheWZpZWxkKCkpO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8gPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm8gPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm9JbmRleCA9IDA7XG4gICAgICAgIHRoaXMuc29ja2V0SUQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDMwMDtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy50b3RhbENsZWFyZWRMaW5lcyA9IDA7XG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRldHJvbWlubykge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmVyYXNlVGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKz0gMTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzLmN1cnJlbnRUZXRyb21pbm8pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdIC09IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZW1pdCgnZ2FtZU92ZXInLCAnR0FNRV9GSU5JU0hFRCcsIHRoaXMuc29ja2V0SUQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgY2xlYXJlZExpbmVzID0gdGhpcy5wbGF5ZmllbGQuY2xlYXJGaWxsZWRMaW5lcyh0aGlzLmN1cnJlbnRUZXRyb21pbm8pO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xlYXJlZExpbmVzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uLmRpc2FibGVMaW5lcyh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNyZWFzZVNjb3JlKGNsZWFyZWRMaW5lcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdUZXRyb21pbm8oKTtcbiAgICAgICAgICAgICAgICBlbWl0UGxheWZpZWxkKHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMucGxheSwgdGhpcy5pbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgaW5jcmVhc2VTY29yZShjbGVhcmVkTGluZXMpIHtcbiAgICAgICAgdGhpcy50b3RhbENsZWFyZWRMaW5lcyArPSBjbGVhcmVkTGluZXM7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gY2xlYXJlZExpbmVzICogKDEwICsgKGNsZWFyZWRMaW5lcyAtIDEpKTtcbiAgICAgICAgZW1pdCgnc2NvcmUnLCB0aGlzLnNjb3JlLCB0aGlzLnNvY2tldElEKTtcbiAgICAgICAgZW1pdCgnY2xlYXJlZExpbmVzJywgdGhpcy50b3RhbENsZWFyZWRMaW5lcywgdGhpcy5zb2NrZXRJRCk7XG4gICAgfVxuXG4gICAgbmV3VGV0cm9taW5vKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8gPSB0aGlzLm5leHRUZXRyb21pbm87XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlub0luZGV4Kys7XG4gICAgICAgIGlmICghdGhpcy5zZXNzaW9uLnRldHJvbWlub3NbdGhpcy5uZXh0VGV0cm9taW5vSW5kZXhdKVxuICAgICAgICAgICAgdGhpcy5zZXNzaW9uLm5ld1RldHJvbWlubygpO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm8gPSBjb3B5VGV0cm9taW5vKHRoaXMuc2Vzc2lvbi50ZXRyb21pbm9zW3RoaXMubmV4dFRldHJvbWlub0luZGV4XSk7XG4gICAgICAgIGVtaXQoJ25leHRUZXRyb21pbm8nLCB0aGlzLm5leHRUZXRyb21pbm8sIHRoaXMuc29ja2V0SUQpO1xuICAgIH1cblxuICAgIHJvdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU92ZXIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5yb3RhdGUodGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgIH1cblxuICAgIG1vdmVMZWZ0KCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lT3ZlcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLm1vdmVMZWZ0KHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdFRldHJvbWlubyh0aGlzKTtcbiAgICB9O1xuXG4gICAgbW92ZVJpZ2h0KCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lT3ZlcilcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5tb3ZlUmlnaHQodGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgIH07XG5cbiAgICBkaXNhYmxlTGluZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmVyYXNlVGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZC5sZW5ndGggLSAxOyByb3crKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQucGxheWZpZWxkW3Jvd11bY29sdW1uXSA9IHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZFtyb3cgKyAxXVtjb2x1bW5dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZFt0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQubGVuZ3RoIC0gMV1bY29sdW1uXSA9IGRpc2FibGVkQ29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdIC09IDE7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5kcmF3VGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgICAgIGVtaXRQbGF5ZmllbGQodGhpcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IGF1dG9CaW5kIGZyb20gXCJhdXRvLWJpbmRcIjtcbmltcG9ydCB7ZGVmYXVsdENvbG9yLCBkaXNhYmxlZENvbG9yfSBmcm9tIFwiLi90ZXRyaXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWZpZWxkIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZmllbGQpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gcGxheWZpZWxkO1xuICAgIH1cblxuICAgIGNvbGxpc2lvbkRldGVjdGVkKGN1cnJlbnRUZXRyb21pbm8pIHtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChjb2x1bW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXRyb21pbm8uc2hhcGVbcm93XVtjb2x1bW5dKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZC5sZW5ndGggLSAxIDwgY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvdyB8fCB0aGlzLnBsYXlmaWVsZFswXS5sZW5ndGggLSAxIDwgY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbiA8IDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGRbY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvd11bY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGRbY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvd11bY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbl0gIT09IGRlZmF1bHRDb2xvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGluZUlzRmlsbGVkKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuICFsaW5lLnNvbWUoY2VsbCA9PiBjZWxsID09PSBkZWZhdWx0Q29sb3IgfHwgY2VsbCA9PT0gZGlzYWJsZWRDb2xvcik7XG4gICAgfVxuXG4gICAgY2xlYXJMaW5lKGxpbmUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaW5lW2ldID0gZGVmYXVsdENvbG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29sbGFwc2VMaW5lcyhpKSB7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IGk7IHJvdyA+IDA7IHJvdy0tKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFtyb3ddW2NvbHVtbl0gPSB0aGlzLnBsYXlmaWVsZFtyb3cgLSAxXVtjb2x1bW5dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJGaWxsZWRMaW5lcyhjdXJyZW50VGV0cm9taW5vKSB7XG4gICAgICAgIGxldCBjdXJyZW50TGluZUluZGV4ID0gY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXTtcbiAgICAgICAgY29uc3QgbGFzdENsZWFyYWJsZUxpbmVJbmRleCA9IGN1cnJlbnRMaW5lSW5kZXggKyA0O1xuICAgICAgICBsZXQgY2xlYXJlZExpbmVzID0gMDtcblxuICAgICAgICB3aGlsZSAoY3VycmVudExpbmVJbmRleCA8IGxhc3RDbGVhcmFibGVMaW5lSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpbmVJc0ZpbGxlZCh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckxpbmUodGhpcy5wbGF5ZmllbGRbY3VycmVudExpbmVJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlTGluZXMoY3VycmVudExpbmVJbmRleCwgdGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhcmVkTGluZXMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50TGluZUluZGV4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChjbGVhcmVkTGluZXMpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7am9pblRldHJpcywgbW92ZUxlZnQsIG1vdmVSaWdodCwgcm90YXRlQ3VycmVudFRldHJvbWlubywgc2V0R2FtZUludGVydmFsfSBmcm9tIFwiLi90ZXRyaXNcIjtcblxuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHNlcnZlciA9IHJlcXVpcmUoJ2h0dHAnKS5TZXJ2ZXIoYXBwKTtcbmNvbnN0IGlvID0gcmVxdWlyZSgnc29ja2V0LmlvJykoc2VydmVyKTtcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuY29uc3QgcG9ydCA9IDgwODA7XG5cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uL2NsaWVudC9idWlsZCcpKSk7XG5hcHAuZ2V0KCcvJywgZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uL2NsaWVudC9idWlsZCcsICdpbmRleC5odG1sJykpO1xufSk7XG5cbnNlcnZlci5saXN0ZW4ocG9ydCk7XG5cblxuZXhwb3J0IGxldCBpbnRlcnZhbCA9IDMwMDtcblxuaW8ub24oJ2Nvbm5lY3Rpb24nLCAoY2xpZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJcXG5Db25uZWN0aW9uIGhhcHBlbmVkLlwiKTtcbiAgICBjbGllbnQub24oJ0hhc2gnLCBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIGpvaW5UZXRyaXMoc3RyaW5nLCBjbGllbnQuaWQpO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbignQXJyb3dVcCcsICh1c2VybmFtZUFuZFJvb20pID0+IHtcbiAgICAgICAgcm90YXRlQ3VycmVudFRldHJvbWlubyh1c2VybmFtZUFuZFJvb20pO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbignQXJyb3dEb3duJywgKHVzZXJuYW1lQW5kUm9vbSkgPT4ge1xuICAgICAgICBzZXRHYW1lSW50ZXJ2YWwodXNlcm5hbWVBbmRSb29tLCA1MCk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKCdBcnJvd0Rvd25VbnByZXNzZWQnLCAodXNlcm5hbWVBbmRSb29tKSA9PiB7XG4gICAgICAgIHNldEdhbWVJbnRlcnZhbCh1c2VybmFtZUFuZFJvb20sIDMwMCk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKCdBcnJvd0xlZnQnLCAodXNlcm5hbWVBbmRSb29tKSA9PiB7XG4gICAgICAgIG1vdmVMZWZ0KHVzZXJuYW1lQW5kUm9vbSk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKCdBcnJvd1JpZ2h0JywgKHVzZXJuYW1lQW5kUm9vbSkgPT4ge1xuICAgICAgICBtb3ZlUmlnaHQodXNlcm5hbWVBbmRSb29tKTtcbiAgICB9KVxufSk7XG5cbmV4cG9ydCBjb25zdCBlbWl0ID0gKGV2ZW50LCBhcmdzLCBzb2NrZXRJRCkgPT4ge1xuICAgIGlvLnRvKGAke3NvY2tldElEfWApLmVtaXQoZXZlbnQsIGFyZ3MpO1xufTtcblxuY29uc3Qgb24gPSAoZXZlbnQsIGNhbGxiYWNrLCBlbWl0KSA9PiB7XG5cbn07XG4iLCJpbXBvcnQge2VtaXQsIGludGVydmFsfSBmcm9tIFwiLi9zZXJ2ZXJcIjtcbmltcG9ydCBUZXRyb21pbm8gZnJvbSBcIi4vdGV0cm9taW5vXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHtMLCBMaW5lLCBSZXZlcnNlTCwgUywgU3F1YXJlLCBULCBafSBmcm9tIFwiLi90ZXRyb21pbm9zXCI7XG5cbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZSgnYXV0by1iaW5kJyk7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q29sb3IgPSAnZ3JheSc7XG5leHBvcnQgY29uc3QgZGlzYWJsZWRDb2xvciA9ICdwaW5rJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXlmaWVsZCgpIHtcbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheSgyMCldLm1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBbLi4ubmV3IEFycmF5KDEwKV0ubWFwKCgpID0+IGRlZmF1bHRDb2xvcik7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0RXZlbnRzKHRoaXNQbGF5ZXIpIHtcbiAgICBlbWl0KCdwbGF5ZmllbGQnLCB0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXNQbGF5ZXIuc29ja2V0SUQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1pdFBsYXlmaWVsZCh0aGlzUGxheWVyKSB7XG4gICAgdGhpc1BsYXllci5jdXJyZW50VGV0cm9taW5vLmVyYXNlVGV0cm9taW5vKHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgZW1pdCgncGxheWZpZWxkJywgdGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzUGxheWVyLnNvY2tldElEKTtcbiAgICB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1pdFRldHJvbWlubyh0aGlzUGxheWVyKSB7XG4gICAgZW1pdCgndGV0cm9taW5vJywgdGhpc1BsYXllci5jdXJyZW50VGV0cm9taW5vLCB0aGlzUGxheWVyLnNvY2tldElEKTtcbn1cblxuY2xhc3MgR2FtZVNlc3Npb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yb29tID0gXCJcIjtcbiAgICAgICAgdGhpcy5ob3N0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gQXJyYXkoKTtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zID0gQXJyYXkoY3JlYXRlVGV0cm9taW5vKCksIGNyZWF0ZVRldHJvbWlubygpKTtcbiAgICB9XG5cbiAgICBuZXdUZXRyb21pbm8oKSB7XG4gICAgICAgIHRoaXMudGV0cm9taW5vcy5wdXNoKGNyZWF0ZVRldHJvbWlubygpKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlTGluZXModXNlcikge1xuICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSB1c2VyKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5kaXNhYmxlTGluZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IHRldHJvbWlub3MgPSBbbmV3IFRldHJvbWlubyhMaW5lWzBdLCAnY3lhbicsIFs1LCAtMl0sIExpbmUpLFxuICAgIG5ldyBUZXRyb21pbm8oTFswXSwgJ29yYW5nZScsIFs1LCAtMl0sIEwpLFxuICAgIG5ldyBUZXRyb21pbm8oUmV2ZXJzZUxbMF0sIFwiYmx1ZVwiLCBbNSwgLTJdLCBSZXZlcnNlTCksXG4gICAgbmV3IFRldHJvbWlubyhTcXVhcmVbMF0sICd5ZWxsb3cnLCBbNSwgLTJdLCBTcXVhcmUpLFxuICAgIG5ldyBUZXRyb21pbm8oU1swXSwgJ2dyZWVuJywgWzUsIC0yXSwgUyksXG4gICAgbmV3IFRldHJvbWlubyhaWzBdLCAncmVkJywgWzUsIC0yXSwgWiksXG4gICAgbmV3IFRldHJvbWlubyhUWzBdLCAncHVycGxlJywgWzUsIC0yXSwgVCldO1xuXG5mdW5jdGlvbiBjcmVhdGVUZXRyb21pbm8oKSB7XG4gICAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0ZXRyb21pbm9zLmxlbmd0aCk7XG5cbiAgICByZXR1cm4gdGV0cm9taW5vc1tpbmRleF07XG59XG5cbmNvbnN0IHNlc3Npb25zID0gQXJyYXkoKTtcblxuZnVuY3Rpb24gZmluZEdhbWVTZXNzaW9uKHJvb20pIHtcbiAgICByZXR1cm4gc2Vzc2lvbnMuZmluZChlbGVtZW50ID0+IGVsZW1lbnQucm9vbSA9PT0gcm9vbSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRVc2VySW5TZXNzaW9uKHJvb20sIHVzZXJuYW1lKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGZpbmRHYW1lU2Vzc2lvbihyb29tKTtcbiAgICBpZiAoIXNlc3Npb24pXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBzZXNzaW9uLnBsYXllcnMuZmluZCh1c2VyID0+IHVzZXIubmFtZSA9PT0gdXNlcm5hbWUpO1xufVxuXG5leHBvcnQgY29uc3QgY29weVRldHJvbWlubyA9ICh0ZXRyb21pbm8pID0+IHtcbiAgICByZXR1cm4gbmV3IFRldHJvbWlubyh0ZXRyb21pbm8uc2hhcGUsIHRldHJvbWluby5jb2xvciwgWzAsIC0xXSwgdGV0cm9taW5vLnJvdGF0aW9uQXJyYXkpO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyKHNlc3Npb24sIG5hbWUsIHNvY2tldElEKSB7XG4gICAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigpO1xuICAgIHBsYXllci5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICBwbGF5ZXIubmFtZSA9IG5hbWU7XG4gICAgcGxheWVyLnNvY2tldElEID0gc29ja2V0SUQ7XG4gICAgc2Vzc2lvbi5wbGF5ZXJzLnB1c2gocGxheWVyKTtcbiAgICBwbGF5ZXIuY3VycmVudFRldHJvbWlubyA9IGNvcHlUZXRyb21pbm8oc2Vzc2lvbi50ZXRyb21pbm9zWzBdKTtcbiAgICBwbGF5ZXIubmV4dFRldHJvbWlubyA9IGNvcHlUZXRyb21pbm8oc2Vzc2lvbi50ZXRyb21pbm9zWzFdKTtcbiAgICByZXR1cm4gcGxheWVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lU2Vzc2lvbihyb29tLCBob3N0KSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBHYW1lU2Vzc2lvbigpO1xuICAgIHNlc3Npb24ucm9vbSA9IHJvb207XG4gICAgc2Vzc2lvbi5ob3N0ID0gaG9zdDtcblxuICAgIHNlc3Npb25zLnB1c2goc2Vzc2lvbik7XG5cbiAgICByZXR1cm4gc2Vzc2lvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdhbWVJbnRlcnZhbCh1c2VybmFtZUFuZFJvb20sIGdhbWVJbnRlcnZhbCkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIuaW50ZXJ2YWwgPSBnYW1lSW50ZXJ2YWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlTGVmdCh1c2VybmFtZUFuZFJvb20pIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XG4gICAgcGxheWVyLm1vdmVMZWZ0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlUmlnaHQodXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5tb3ZlUmlnaHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZUN1cnJlbnRUZXRyb21pbm8odXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5yb3RhdGUoKTtcbn1cblxuZnVuY3Rpb24gZ2V0VXNlcihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gZmluZEdhbWVTZXNzaW9uKHJvb20pIHx8IGNyZWF0ZUdhbWVTZXNzaW9uKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCk7XG5cbiAgICBjb25zdCB1c2VyID0gZmluZFVzZXJJblNlc3Npb24ocm9vbSwgdXNlcm5hbWUpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiBub3QgZm91bmQgaW4gc2Vzc2lvbiwgYWRkaW5nLi4uYCk7XG4gICAgICAgIHJldHVybiBjcmVhdGVQbGF5ZXIoc2Vzc2lvbiwgdXNlcm5hbWUsIHNvY2tldElEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNlciBcIiR7dXNlcm5hbWV9XCIgaXMgYWxyZWFkeSBpbiBzZXNzaW9uLmApO1xuICAgICAgICB1c2VyLnNvY2tldElEID0gc29ja2V0SUQ7XG4gICAgICAgIGVtaXRQbGF5ZmllbGQodXNlcik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVVzZXJuYW1lKHNwbGl0KSB7XG4gICAgcmV0dXJuIHNwbGl0WzFdXG4gICAgICAgID8gc3BsaXRbMV0uc2xpY2UoMCwgc3BsaXRbMV0ubGVuZ3RoIC0gMSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqb2luVGV0cmlzKGhhc2gsIHNvY2tldElEKSB7XG4gICAgY29uc3Qgc3BsaXQgPSBoYXNoLnNwbGl0KCdbJyk7XG4gICAgY29uc3Qgcm9vbSA9IHNwbGl0WzBdLnNsaWNlKDEpO1xuICAgIGNvbnN0IHVzZXJuYW1lID0gcGFyc2VVc2VybmFtZShzcGxpdCk7XG5cbiAgICBjb25zb2xlLmxvZyhcImpvaW5UZXRyaXMoKSBjYWxsZWRcIik7XG4gICAgY29uc29sZS5sb2coYFVzZXIgXCIke3VzZXJuYW1lfVwiIHRyaWVkIHRvIGNvbm5lY3QgdG8gcm9vbTogXCIke3Jvb219XCJgKTtcblxuICAgIGNvbnN0IHVzZXIgPSBnZXRVc2VyKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICh1c2VyKVxuICAgICAgICAgICAgdXNlci5wbGF5KClcbiAgICB9LCBpbnRlcnZhbCk7XG59XG4iLCJcbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZSgnYXV0by1iaW5kJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRldHJvbWlubyB7XG4gICAgY29uc3RydWN0b3Ioc2hhcGUsIGNvbG9yLCBwb3NpdGlvbiwgcm90YXRpb25BcnJheSkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBbMywgLTRdO1xuICAgICAgICB0aGlzLnJvdGF0aW9uQXJyYXkgPSByb3RhdGlvbkFycmF5O1xuICAgIH1cblxuICAgIGRyYXdUZXRyb21pbm8ocGxheWZpZWxkKSB7XG4gICAgICAgIGxldCByb3cgPSAwO1xuICAgICAgICB3aGlsZSAocm93IDwgNCkge1xuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVt0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXSAmJiB0aGlzLnNoYXBlW3Jvd11bY29sdW1uXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW3RoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5dID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdyArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkKSB7XG4gICAgICAgIGxldCByb3cgPSAwO1xuICAgICAgICB3aGlsZSAocm93IDwgNCkge1xuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVt0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXSAmJiB0aGlzLnNoYXBlW3Jvd11bY29sdW1uXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW3RoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5dID0gJ2dyYXknO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbHVtbiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlTGVmdChwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSAtPSAxO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSArPSAxO1xuICAgICAgICB0aGlzLmRyYXdUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgfTtcblxuICAgIG1vdmVSaWdodChwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSArPSAxO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKVxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSAtPSAxO1xuICAgICAgICB0aGlzLmRyYXdUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgfTtcblxuICAgIHJvdGF0ZShwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpID09PSB0aGlzLnJvdGF0aW9uQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbdGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgKyAxXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKVxuICAgICAgICAgICAgdGhpcy5fd2FsbEtpY2socGxheWZpZWxkKTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgIH1cblxuICAgIF93YWxsS2ljayhwbGF5ZmllbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdIC0gMSwgdGhpcy5wb3NpdGlvblsxXV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0gKyAxLCB0aGlzLnBvc2l0aW9uWzFdXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSAtIDFdLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdICsgMV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0gLSAyLCB0aGlzLnBvc2l0aW9uWzFdXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSArIDIsIHRoaXMucG9zaXRpb25bMV1dLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdIC0gMl0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gKyAyXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Vucm90YXRlKCk7XG4gICAgfVxuXG4gICAgX3Vucm90YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5W3RoaXMucm90YXRpb25BcnJheS5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbdGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgLSAxXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90cnlUZXRyb21pbm9Qb3NpdGlvbihwb3NpdGlvbiwgcGxheWZpZWxkKSB7XG4gICAgICAgIGNvbnN0IHRtcCA9IFsuLi50aGlzLnBvc2l0aW9uXTtcblxuICAgICAgICB0aGlzLnBvc2l0aW9uWzBdID0gcG9zaXRpb25bMF07XG4gICAgICAgIHRoaXMucG9zaXRpb25bMV0gPSBwb3NpdGlvblsxXTtcbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSkge1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSA9IHRtcFswXTtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMV0gPSB0bXBbMV07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG59XG4iLCJcbmV4cG9ydCBjb25zdCBTcXVhcmUgPSBbXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IExpbmUgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDFdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IFQgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IEwgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXTtcblxuZXhwb3J0IGNvbnN0IFJldmVyc2VMID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBTID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBaID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhdXRvLWJpbmRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=