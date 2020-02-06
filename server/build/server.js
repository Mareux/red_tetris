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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server */ \"./server.js\");\n/* harmony import */ var _tetris__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tetris */ \"./tetris.js\");\n\n\nconst autoBind = __webpack_require__(/*! auto-bind */ \"auto-bind\");\n\nclass Player {\n    constructor() {\n        autoBind(this);\n        this.session = null;\n        this.playfield = Object(_tetris__WEBPACK_IMPORTED_MODULE_1__[\"createPlayfield\"])();\n        this.name = \"\";\n        this.currentTetromino = null;\n        this.nextTetromino = null;\n        this.nextTetrominoIndex = 0;\n        this.socketID = false;\n        this.tetrominos = null;\n    }\n\n    play() {\n        if (this.currentTetromino) {\n            this.currentTetromino.eraseTetromino(this.playfield);\n            this.currentTetromino.position[1] += 1;\n            if (Object(_tetris__WEBPACK_IMPORTED_MODULE_1__[\"collisionDetected\"])(this.playfield, this.currentTetromino)) {\n                this.currentTetromino.position[1] -= 1;\n                this.currentTetromino.drawTetromino(this.playfield);\n                let clearedLines = Object(_tetris__WEBPACK_IMPORTED_MODULE_1__[\"removeFilledLines\"])(this.playfield, this.currentTetromino);\n                for (let i = 0; i < clearedLines; i++) {\n                    this.session.disableLines(this);\n                }\n                this.newTetromino();\n            } else\n                this.currentTetromino.drawTetromino(this.playfield);\n        }\n        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__[\"emitEvents\"])(this);\n    }\n\n    newTetromino() {\n        this.currentTetromino = this.nextTetromino;\n        this.nextTetrominoIndex++;\n        if (!this.session.tetrominos[this.nextTetrominoIndex])\n            this.session.newTetromino();\n        this.nextTetromino = Object(_tetris__WEBPACK_IMPORTED_MODULE_1__[\"copyTetromino\"])(this.session.tetrominos[this.nextTetrominoIndex]);\n        Object(_server__WEBPACK_IMPORTED_MODULE_0__[\"emit\"])('nextTetromino', this.nextTetromino, this.socketID);\n    }\n\n    rotate() {\n        this.currentTetromino.rotate(this.playfield);\n        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__[\"emitEvents\"])(this);\n    }\n\n    moveLeft() {\n        this.currentTetromino.moveLeft(this.playfield);\n        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__[\"emitEvents\"])(this);\n    };\n\n    moveRight() {\n        this.currentTetromino.moveRight(this.playfield);\n        Object(_tetris__WEBPACK_IMPORTED_MODULE_1__[\"emitEvents\"])(this);\n    };\n\n    disableLine() {\n        for (let row = 0; row < this.playfield.length - 1; row++) {\n            for (let column = 0; column < 10; column++) {\n                this.playfield[row][column] = this.playfield[row + 1][column];\n            }\n        }\n        for (let column = 0; column < 10; column++) {\n            this.playfield[this.playfield.length - 1][column] = 'gray';\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./player.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! exports provided: interval, emit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"interval\", function() { return interval; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"emit\", function() { return emit; });\n/* harmony import */ var _tetris__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tetris */ \"./tetris.js\");\n\n\nconst server = __webpack_require__(/*! http */ \"http\").createServer();\nconst io = __webpack_require__(/*! socket.io */ \"socket.io\")(server);\n\nlet interval = 150;\n\nio.on('connection', (client) => {\n    console.log(\"\\nConnection happened.\");\n    client.on('Hash', function (string) {\n        Object(_tetris__WEBPACK_IMPORTED_MODULE_0__[\"joinTetris\"])(string, client.id);\n    });\n    client.on('ArrowUp', (usernameAndRoom) => {\n        Object(_tetris__WEBPACK_IMPORTED_MODULE_0__[\"rotateCurrentTetromino\"])(usernameAndRoom);\n    });\n    client.on('ArrowDown', () => {\n        interval = 50;\n    });\n    client.on('ArrowDownUnpressed', () => {\n        interval = 300;\n    });\n    client.on('ArrowLeft', (usernameAndRoom) => {\n        Object(_tetris__WEBPACK_IMPORTED_MODULE_0__[\"moveLeft\"])(usernameAndRoom);\n    });\n    client.on('ArrowRight', (usernameAndRoom) => {\n        Object(_tetris__WEBPACK_IMPORTED_MODULE_0__[\"moveRight\"])(usernameAndRoom);\n    })\n});\n\nconst emit = (event, args, socketID) => {\n    io.to(`${socketID}`).emit(event, args);\n};\n\nconst on = (event, callback, emit) => {\n\n};\n\nconst port = 8000;\nserver.listen(port);\nconsole.log('listening on port ', port);\n\n\n//# sourceURL=webpack:///./server.js?");

/***/ }),

/***/ "./tetrimino.js":
/*!**********************!*\
  !*** ./tetrimino.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tetromino; });\n/* harmony import */ var _tetris__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tetris */ \"./tetris.js\");\n\n\nconst autoBind = __webpack_require__(/*! auto-bind */ \"auto-bind\");\n\nclass Tetromino {\n    constructor(shape, color, position, rotationArray) {\n        autoBind(this);\n        this.shape = shape;\n        this.color = color;\n        this.position = position;\n        this.rotationArray = rotationArray;\n    }\n\n    drawTetromino(playfield) {\n        let row = 0;\n        while (row < 4) {\n            let column = 0;\n            while (column < 4) {\n                if (playfield[this.position[1] + row]) {\n                    if (playfield[this.position[1] + row][this.position[0] + column] && this.shape[row][column]) {\n                        playfield[this.position[1] + row][this.position[0] + column] = this.color;\n                    }\n                }\n                column += 1;\n            }\n            row += 1;\n        }\n    }\n\n    eraseTetromino(playfield) {\n        let row = 0;\n        while (row < 4) {\n            let column = 0;\n            while (column < 4) {\n                if (playfield[this.position[1] + row]) {\n                    if (playfield[this.position[1] + row][this.position[0] + column] && this.shape[row][column]) {\n                        playfield[this.position[1] + row][this.position[0] + column] = 'gray';\n                    }\n                }\n                column += 1;\n            }\n            row += 1;\n        }\n    }\n\n    moveLeft(playfield) {\n        this.eraseTetromino(playfield, this);\n        this.position[0] -= 1;\n        if (Object(_tetris__WEBPACK_IMPORTED_MODULE_0__[\"collisionDetected\"])(playfield, this))\n            this.position[0] += 1;\n        this.drawTetromino(playfield, this);\n    };\n\n    moveRight(playfield) {\n        this.eraseTetromino(playfield, this);\n        this.position[0] += 1;\n        if (Object(_tetris__WEBPACK_IMPORTED_MODULE_0__[\"collisionDetected\"])(playfield, this))\n            this.position[0] -= 1;\n        this.drawTetromino(playfield, this);\n    };\n\n    rotate(playfield) {\n        this.eraseTetromino(playfield, this);\n        if (this.rotationArray.indexOf(this.shape) === this.rotationArray.length - 1) {\n            this.shape = this.rotationArray[0];\n        } else {\n            this.shape = this.rotationArray[this.rotationArray.indexOf(this.shape) + 1];\n        }\n        if (Object(_tetris__WEBPACK_IMPORTED_MODULE_0__[\"collisionDetected\"])(playfield, this))\n            this._wallKick(playfield);\n        this.drawTetromino(playfield);\n    }\n\n    _wallKick(playfield) {\n        if (this._tryTetrominoPosition([this.position[0] - 1, this.position[1]], playfield)) {\n            return;\n        }\n        if (this._tryTetrominoPosition([this.position[0] + 1, this.position[1]], playfield)) {\n            return;\n        }\n        if (this._tryTetrominoPosition([this.position[0], this.position[1] - 1], playfield)) {\n            return;\n        }\n        if (this._tryTetrominoPosition([this.position[0], this.position[1] + 1], playfield)) {\n            return;\n        }\n        if (this._tryTetrominoPosition([this.position[0] - 2, this.position[1]], playfield)) {\n            return;\n        }\n        if (this._tryTetrominoPosition([this.position[0] + 2, this.position[1]], playfield)) {\n            return;\n        }\n        if (this._tryTetrominoPosition([this.position[0], this.position[1] - 2], playfield)) {\n            return;\n        }\n        if (this._tryTetrominoPosition([this.position[0], this.position[1] + 2], playfield)) {\n            return;\n        }\n        this._unrotate();\n    }\n\n    _unrotate() {\n        if (this.rotationArray.indexOf(this.shape) < 1) {\n            this.shape = this.rotationArray[this.rotationArray.length - 1];\n        } else {\n            this.shape = this.rotationArray[this.rotationArray.indexOf(this.shape) - 1];\n        }\n    }\n\n    _tryTetrominoPosition(position, playfield) {\n        const tmp = [...this.position];\n\n        this.position[0] = position[0];\n        this.position[1] = position[1];\n        if (Object(_tetris__WEBPACK_IMPORTED_MODULE_0__[\"collisionDetected\"])(playfield, this)) {\n            this.position[0] = tmp[0];\n            this.position[1] = tmp[1];\n            return false;\n        }\n        return true;\n    }\n\n}\n\n\n//# sourceURL=webpack:///./tetrimino.js?");

/***/ }),

/***/ "./tetris.js":
/*!*******************!*\
  !*** ./tetris.js ***!
  \*******************/
/*! exports provided: createPlayfield, emitEvents, copyTetromino, moveLeft, moveRight, rotateCurrentTetromino, collisionDetected, removeFilledLines, joinTetris */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createPlayfield\", function() { return createPlayfield; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"emitEvents\", function() { return emitEvents; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"copyTetromino\", function() { return copyTetromino; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveLeft\", function() { return moveLeft; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"moveRight\", function() { return moveRight; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rotateCurrentTetromino\", function() { return rotateCurrentTetromino; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"collisionDetected\", function() { return collisionDetected; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeFilledLines\", function() { return removeFilledLines; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"joinTetris\", function() { return joinTetris; });\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server */ \"./server.js\");\n/* harmony import */ var _tetrimino__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tetrimino */ \"./tetrimino.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ \"./player.js\");\n/* harmony import */ var _tetrominos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tetrominos */ \"./tetrominos.js\");\n\n\n\n\n\nconst autoBind = __webpack_require__(/*! auto-bind */ \"auto-bind\");\n\nconst default_color = 'gray';\nconst disabledColor = 'pink';\n\nconst color = default_color;\n\nfunction createPlayfield() {\n    let line = [color, color, color, color, color, color, color, color, color, color];\n    return [[...line],\n        [...line],\n        [...line],\n        [...line],\n        [...line],\n        [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line],\n        [...line], [...line], [...line], [...line], [...line], [...line]];\n}\n\nfunction emitEvents(thisPlayer) {\n    Object(_server__WEBPACK_IMPORTED_MODULE_0__[\"emit\"])('playfield', thisPlayer.playfield, thisPlayer.socketID);\n}\n\nclass GameSession {\n    constructor() {\n        this.room = \"\";\n        this.host = \"\";\n        this.players = Array();\n        this.tetrominos = Array(nextTetromino(), nextTetromino());\n        this.newTetromino = function () {\n            this.tetrominos.push(nextTetromino());\n        };\n        this.disableLines = function (user) {\n            this.players.forEach(function (element) {\n                if (element !== user) {\n                    element.disableLine();\n                }\n            });\n        }\n    }\n}\n\nlet sessions = Array();\n\nfunction findGameSession(room) {\n    return sessions.find(element => element.room === room);\n}\n\nfunction findUserInSession(room, username) {\n    let session = findGameSession(room);\n    if (!session)\n        return;\n\n    return session.players.find(user => user.name === username);\n}\n\nconst copyTetromino = (tetromino) => {\n  return new _tetrimino__WEBPACK_IMPORTED_MODULE_1__[\"default\"](tetromino.shape, tetromino.color, [0, -1], tetromino.rotationArray);\n};\n\nfunction createPlayer(session, name, socketID) {\n    let player = new _player__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    player.session = session;\n    player.name = name;\n    player.socketID = socketID;\n    session.players.push(player);\n    player.currentTetromino = copyTetromino(session.tetrominos[0]);\n    player.nextTetromino = copyTetromino(session.tetrominos[1]);\n    return player;\n}\n\nfunction createGameSession(room, host, socketID) {\n    let session = new GameSession();\n    session.room = room;\n    session.host = host;\n\n    createPlayer(session, host, socketID);\n    sessions.push(session);\n}\n\nfunction joinGameSession(room, user, socketID) {\n    let session = findGameSession(room);\n    let player = createPlayer(session, user, socketID);\n    return (player);\n}\n\nfunction moveLeft(usernameAndRoom) {\n    let player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);\n    player.moveLeft();\n}\n\nfunction moveRight(usernameAndRoom) {\n    let player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);\n    player.moveRight();\n}\n\nfunction rotateCurrentTetromino(usernameAndRoom) {\n    let player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);\n    player.rotate();\n}\n\nfunction collisionDetected(playfield, currentTetromino) {\n    let row = 0;\n    while (row < 4) {\n        let column = 0;\n        while (column < 4) {\n            if (currentTetromino.shape[row][column]) {\n                if (playfield.length - 1 < currentTetromino.position[1] + row || playfield[0].length - 1 < currentTetromino.position[0] + column)\n                    return true;\n                if (currentTetromino.position[0] + column < 0)\n                    return true;\n                if (playfield[currentTetromino.position[1] + row]) {\n                    if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column]) {\n                        if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] !== default_color)\n                            return true;\n                    }\n                }\n            }\n            column += 1;\n        }\n        row += 1;\n    }\n    return false;\n}\n\nfunction lineIsFilled(arr, len) {\n    let i = 0;\n\n    while (i < len) {\n        if (arr[i] === default_color || arr[i] === disabledColor)\n            return false;\n        i += 1;\n    }\n    return true;\n}\n\nfunction clearLine(arr, len) {\n    let i = 0;\n\n    while (i < len) {\n        arr[i] = default_color;\n        i += 1;\n    }\n}\n\nfunction collapseLines(i, playfield) {\n    for (let row = i; row > 0; row--) {\n        for (let column = 0; column < 10; column++) {\n            playfield[row][column] = playfield[row - 1][column];\n        }\n    }\n}\n\nfunction removeFilledLines(playfield, currentTetromino) {\n    let i = currentTetromino.position[1];\n    let limit = i + 4;\n    let clearedLines = 0;\n\n    while (i < limit) {\n        if (playfield[i]) {\n            if (lineIsFilled(playfield[i], 10)) {\n                clearLine(playfield[i], 10);\n                collapseLines(i, playfield);\n                clearedLines++;\n            }\n        }\n        i += 1;\n    }\n    return (clearedLines);\n}\n\nlet tetrominos = [new _tetrimino__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"Line\"][0], 'cyan', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"Line\"]),\n    new _tetrimino__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"L\"][0], 'orange', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"L\"]),\n    new _tetrimino__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"ReverseL\"][0], \"blue\", [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"ReverseL\"]),\n    new _tetrimino__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"Square\"][0], 'yellow', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"Square\"]),\n    new _tetrimino__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"S\"][0], 'green', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"S\"]),\n    new _tetrimino__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"Z\"][0], 'red', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"Z\"]),\n    new _tetrimino__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"T\"][0], 'purple', [0, -1], _tetrominos__WEBPACK_IMPORTED_MODULE_3__[\"T\"])];\n\nfunction nextTetromino() {\n    let index = Math.floor(Math.random() * tetrominos.length);\n\n    return tetrominos[index];\n}\n\nfunction joinTetris(hash, socketID) {\n    let split = hash.split('[');\n    let room, username, user;\n    room = split[0].slice(1);\n    if (split[1]) {\n        username = split[1].slice(0, split[1].length - 1);\n    }\n    console.log(\"joinTetris() called\");\n    console.log(\"User \\\"\" + username + \"\\\" tried to connect to room: \\\"\" + room + \"\\\"\");\n    let session = findGameSession(room);\n    if (!session) {\n        console.log(\"Session not found, attempting to create a new session\");\n        createGameSession(room, username, socketID);\n        session = findGameSession(room);\n        if (!session) {\n            console.log(\"Failed to create a session.\");\n        } else {\n            console.log(\"Session \\\"\" + room + \"\\\" successfully created with \\\"\" + session.host + \"\\\" as host.\");\n        }\n        user = session.players[0];\n    } else {\n        console.log(\"Session found, attempting to join.\");\n        user = findUserInSession(room, username);\n        if (!user) {\n            console.log(\"User \\\"\" + username + \"\\\" not found in session, adding...\");\n            user = joinGameSession(room, username, socketID);\n        } else {\n            console.log(\"User \\\"\" + username + \"\\\" is already in session.\");\n        }\n    }\n    setInterval(() => {\n        user.play()\n    }, _server__WEBPACK_IMPORTED_MODULE_0__[\"interval\"]);\n}\n\n\n//# sourceURL=webpack:///./tetris.js?");

/***/ }),

/***/ "./tetrominos.js":
/*!***********************!*\
  !*** ./tetrominos.js ***!
  \***********************/
/*! exports provided: Square, Line, T, L, ReverseL, S, Z */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Square\", function() { return Square; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Line\", function() { return Line; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"T\", function() { return T; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"L\", function() { return L; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ReverseL\", function() { return ReverseL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"S\", function() { return S; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Z\", function() { return Z; });\n\nconst Square = [\n    [\n        [1, 1, 0, 0],\n        [1, 1, 0, 0],\n        [0, 0, 0, 0],\n        [0, 0, 0, 0]\n    ]];\n\nconst Line = [\n    [\n        [0, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 1, 0, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [1, 1, 1, 1],\n        [0, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 1, 0],\n        [0, 0, 1, 0],\n        [0, 0, 1, 0],\n        [0, 0, 1, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [0, 0, 0, 0],\n        [1, 1, 1, 1],\n        [0, 0, 0, 0]\n    ]];\n\nconst T = [\n    [\n        [0, 1, 0, 0],\n        [1, 1, 1, 0],\n        [0, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 0, 0],\n        [0, 1, 1, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [1, 1, 1, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 0, 0],\n        [1, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ]];\n\nconst L = [\n    [\n        [0, 0, 1, 0],\n        [1, 1, 1, 0],\n        [0, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 1, 1, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [1, 1, 1, 0],\n        [1, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [1, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ]];\n\nconst ReverseL = [\n    [\n        [1, 0, 0, 0],\n        [1, 1, 1, 0],\n        [0, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 1, 0],\n        [0, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [1, 1, 1, 0],\n        [0, 0, 1, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 0, 0],\n        [0, 1, 0, 0],\n        [1, 1, 0, 0],\n        [0, 0, 0, 0]\n    ]];\n\nconst S = [\n    [\n        [0, 1, 1, 0],\n        [1, 1, 0, 0],\n        [0, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 0, 0],\n        [0, 1, 1, 0],\n        [0, 0, 1, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [0, 1, 1, 0],\n        [1, 1, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [1, 0, 0, 0],\n        [1, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ]];\n\nconst Z = [\n    [\n        [1, 1, 0, 0],\n        [0, 1, 1, 0],\n        [0, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 1, 0],\n        [0, 1, 1, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [1, 1, 0, 0],\n        [0, 1, 1, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 0, 0],\n        [1, 1, 0, 0],\n        [1, 0, 0, 0],\n        [0, 0, 0, 0]\n    ]];\n\n\n//# sourceURL=webpack:///./tetrominos.js?");

/***/ }),

/***/ "auto-bind":
/*!****************************!*\
  !*** external "auto-bind" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"auto-bind\");\n\n//# sourceURL=webpack:///external_%22auto-bind%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"socket.io\");\n\n//# sourceURL=webpack:///external_%22socket.io%22?");

/***/ })

/******/ });