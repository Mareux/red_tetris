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

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst tetris = __webpack_require__(/*! ./tetris */ \"./tetris.js\");\n\nconst server = __webpack_require__(/*! http */ \"http\").createServer();\nconst io = __webpack_require__(/*! socket.io */ \"socket.io\")(server);\n\nexports.interval = 150;\n\nio.on('connection', (client) => {\n    console.log(\"\\nConnection happened.\");\n    client.on('Hash', function (string) {\n        tetris.joinTetris(client, string, client.id);\n    });\n    client.on('ArrowUp', (usernameAndRoom) => {\n        tetris.rotateCurrentTetromino(usernameAndRoom);\n    });\n    client.on('ArrowDown', () => {\n        exports.interval = 50;\n    });\n    client.on('ArrowDownUnpressed', () => {\n        exports.interval = 300;\n    });\n    client.on('ArrowLeft', (usernameAndRoom) => {\n        tetris.moveLeft(usernameAndRoom);\n    });\n    client.on('ArrowRight', (usernameAndRoom) => {\n        tetris.moveRight(usernameAndRoom);\n    })\n});\n\nexports.emit = (event, args, socketID) => {\n    io.to(`${socketID}`).emit(event, args);\n};\n\nconst on = (event, callback, emit) => {\n\n};\n\nconst port = 8000;\nserver.listen(port);\nconsole.log('listening on port ', port);\n\n\n//# sourceURL=webpack:///./server.js?");

/***/ }),

/***/ "./tetris.js":
/*!*******************!*\
  !*** ./tetris.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const server = __webpack_require__(/*! ./server */ \"./server.js\");\nconst rotations = __webpack_require__(/*! ./tetrominos */ \"./tetrominos.js\");\n\nlet default_color = 'gray';\nlet disabledColor = 'pink';\n\nlet color = default_color;\n\nlet yellow = 'yellow';\nlet blue = 'blue';\nlet purple = 'purple';\n\nfunction createPlayfield() {\n    let line = [color, color, color, color, color, color, color, color, color, color];\n    let playfield = [[...line],\n        [...line],\n        [...line],\n        [...line],\n        [...line],\n        [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line],\n        [...line], [...line], [...line], [...line], [...line], [...line]];\n    return playfield;\n}\n\nfunction emitEvents(thisPlayer) {\n    server.emit('playfield', thisPlayer.playfield, thisPlayer.socketID);\n    server.emit('nextTetromino', thisPlayer.nextTetromino, thisPlayer.socketID);\n}\n\nclass Player {\n    constructor() {\n        this.session = false;\n        this.playfield = createPlayfield();\n        this.name = \"\";\n        this.currentTetromino = false\n        this.nextTetromino = false;\n        this.nextTetrominoIndex = 0;\n        this.socketID = false;\n        this.play = () => {\n            if (this.currentTetromino) {\n                        eraseCurrentTetromino(this.playfield, this.currentTetromino);\n                        this.currentTetromino.position[1] += 1;\n                        if (collisionDetected(this.playfield, this.currentTetromino)) {\n                            this.currentTetromino.position[1] -= 1;\n                            drawCurrentTetromino(this.playfield, this.currentTetromino);\n                            let clearedLines = removeFilledLines(this.playfield, this.currentTetromino);\n                            for (let i = 0; i < clearedLines; i++) {\n                                this.session.disableLines(this);\n                            }\n                            this.newTetromino();\n                        } else\n                            drawCurrentTetromino(this.playfield, this.currentTetromino);\n                    }\n           server.emit('playfield', this.playfield, this.socketID);\n        };\n        this.newTetromino = function() {\n            this.currentTetromino = this.nextTetromino;\n            this.nextTetrominoIndex++;\n            if (!this.session.tetrominos[this.nextTetrominoIndex])\n                this.session.newTetromino();\n            this.nextTetromino = JSON.parse(JSON.stringify(this.session.tetrominos[this.nextTetrominoIndex]));\n        }\n        this.moveLeft = function() {\n            eraseCurrentTetromino(this.playfield, this.currentTetromino);\n            this.currentTetromino.position[0] -= 1;\n            if (collisionDetected(this.playfield, this.currentTetromino))\n                this.currentTetromino.position[0] += 1;\n            drawCurrentTetromino(this.playfield, this.currentTetromino);\n            emitEvents(this);\n        };\n        this.moveRight = function() {\n            eraseCurrentTetromino(this.playfield, this.currentTetromino);\n            this.currentTetromino.position[0] += 1;\n            if (collisionDetected(this.playfield, this.currentTetromino))\n                this.currentTetromino.position[0] -= 1;\n            drawCurrentTetromino(this.playfield, this.currentTetromino);\n            emitEvents(this);\n        };\n        this.cancelRotation = function () {\n            if (this.currentTetromino.name === \"Line\")\n                this.unrotate(rotations.Line);\n            else if (this.currentTetromino.name === \"T\")\n                this.unrotate(rotations.T);\n            else if (this.currentTetromino.name === \"L\")\n                this.unrotate(rotations.L);\n            else if (this.currentTetromino.name === \"ReverseL\")\n                this.unrotate(rotations.ReverseL);\n            else if (this.currentTetromino.name === \"S\")\n                this.unrotate(rotations.S);\n            else if (this.currentTetromino.name === \"Z\")\n                this.unrotate(rotations.Z);\n            emitEvents(this);\n        };\n        this.unrotate = function(arr) {\n            if (this.currentTetromino.rotation < 1) {\n                this.currentTetromino.shape = arr[3];\n                this.currentTetromino.rotation = 3;\n            } else {\n                this.currentTetromino.rotation -= 1;\n                this.currentTetromino.shape = arr[this.currentTetromino.rotation];\n            }\n        }\n        this.tryTetrominoPosition = function(position) {\n            let tmp = [...(this.currentTetromino.position)];\n\n            this.currentTetromino.position[0] = position[0];\n            this.currentTetromino.position[1] = position[1];\n            if (collisionDetected(this.playfield, this.currentTetromino)) {\n                this.currentTetromino.position[0] = tmp[0];\n                this.currentTetromino.position[1] = tmp[1];\n                return false;\n            }\n            return true;\n        }\n        this.wallKick = function() {\n            if (this.tryTetrominoPosition([this.currentTetromino.position[0] - 1, this.currentTetromino.position[1]])) {\n                return ;\n            }\n            if (this.tryTetrominoPosition([this.currentTetromino.position[0] + 1, this.currentTetromino.position[1]])) {\n                return ;\n            }\n            if (this.tryTetrominoPosition([this.currentTetromino.position[0], this.currentTetromino.position[1] - 1])) {\n                return ;\n            }\n            if (this.tryTetrominoPosition([this.currentTetromino.position[0], this.currentTetromino.position[1] + 1])) {\n                return ;\n            }\n            if (this.tryTetrominoPosition([this.currentTetromino.position[0] - 2, this.currentTetromino.position[1]])) {\n                return ;\n            }\n            if (this.tryTetrominoPosition([this.currentTetromino.position[0] + 2, this.currentTetromino.position[1]])) {\n                return ;\n            }\n            if (this.tryTetrominoPosition([this.currentTetromino.position[0], this.currentTetromino.position[1] - 2])) {\n                return ;\n            }\n            if (this.tryTetrominoPosition([this.currentTetromino.position[0], this.currentTetromino.position[1] + 2])) {\n                return ;\n            }\n            this.cancelRotation();\n        }\n        this.rotate = function(arr) {\n            eraseCurrentTetromino(this.playfield, this.currentTetromino);\n            if (this.currentTetromino.rotation > 2) {\n                this.currentTetromino.shape = arr[0];\n                this.currentTetromino.rotation = 0;\n            } else {\n                this.currentTetromino.rotation += 1;\n                this.currentTetromino.shape = arr[this.currentTetromino.rotation];\n            }\n            if (collisionDetected(this.playfield, this.currentTetromino))\n                this.wallKick();\n            drawCurrentTetromino(this.playfield, this.currentTetromino);\n        }\n        this.rotateCurrentTetromino = function() {\n            if (this.currentTetromino.name === \"Line\")\n                this.rotate(rotations.Line);\n            else if (this.currentTetromino.name === \"T\")\n                this.rotate(rotations.T);\n            else if (this.currentTetromino.name === \"L\")\n                this.rotate(rotations.L);\n            else if (this.currentTetromino.name === \"ReverseL\")\n                this.rotate(rotations.ReverseL);\n            else if (this.currentTetromino.name === \"S\")\n                this.rotate(rotations.S);\n            else if (this.currentTetromino.name === \"Z\")\n                this.rotate(rotations.Z);\n            emitEvents(this);\n        }\n        this.disableLine = function() {\n            for (let row = 0; row < this.playfield.length - 1; row++) {\n                for (let column = 0; column < 10; column++) {\n                    this.playfield[row][column] = this.playfield[row + 1][column];\n                }\n            }\n            for (let column = 0; column < 10; column++) {\n                this.playfield[this.playfield.length - 1][column] = disabledColor;\n            }\n        }\n    }\n}\n\nclass GameSession {\n    constructor() {\n        this.room = \"\";\n        this.host = \"\";\n        this.players = Array();\n        this.tetrominos = Array(nextTetromino(), nextTetromino());\n        this.newTetromino = function () {\n            this.tetrominos.push(nextTetromino());\n        }\n        this.disableLines = function(user) {\n            this.players.forEach(function(element) {\n              if (element !== user) {\n                  element.disableLine();\n              }\n            });\n            }\n        }\n    }\n\nlet sessions = Array();\n\nfunction findGameSession(room) {\n    return sessions.find((element) => {\n        if (element.room === room)\n            return element;\n    });\n}\n\nfunction findUserInSession(room, username) {\n    let session = findGameSession(room);\n    let result = false;\n    if (!session)\n        return ;\n    session.players.map(function (user) {\n        if (user.name === username) {\n            result = user;\n        }\n    });\n    return (result);\n}\n\nfunction createPlayer(session, name, socketID) {\n    let player = new Player();\n    player.session = session;\n    player.name = name;\n    player.socketID = socketID;\n    session.players.push(player);\n    player.currentTetromino = JSON.parse(JSON.stringify(session.tetrominos[0]));\n    player.nextTetromino = JSON.parse(JSON.stringify(session.tetrominos[1]));\n    return player;\n}\n\nfunction createGameSession(room, host, socketID) {\n    let session = new GameSession();\n    session.room = room;\n    session.host = host;\n\n    createPlayer(session, host, socketID);\n    sessions.push(session);\n}\n\nfunction joinGameSession(room, user, socketID) {\n    let session = findGameSession(room);\n    let player = createPlayer(session, user, socketID);\n    return (player);\n}\n\n\nclass pieceSquare {\n    constructor(name, shape, color, position) {\n        this.name = \"Square\";\n        this.shape =\n            [[1, 1, 0, 0],\n                [1, 1, 0, 0],\n                [0, 0, 0, 0],\n                [0, 0, 0, 0]];\n        this.color = yellow;\n        this.position = [0, -1];\n    }\n}\n\nclass pieceLine {\n    constructor(name, shape, color, position, rotation) {\n        this.name = \"Line\";\n        this.shape = rotations.Line[0];\n        this.color = 'cyan';\n        this.position = [0, -1];\n        this.rotation = 0;\n    }\n}\n\nclass pieceT {\n    constructor(name, shape, color, position, rotation) {\n        this.name = \"T\";\n        this.shape = rotations.T[0];\n        this.color = purple;\n        this.position = [0, -1];\n        this.rotation = 0;\n    }\n}\n\nclass pieceL {\n    constructor(name, shape, color, position, rotation) {\n        this.name = \"L\";\n        this.shape = rotations.L[0];\n        this.color = 'orange';\n        this.position = [0, -1];\n        this.rotation = 0;\n    }\n}\n\nclass pieceReverseL {\n    constructor(name, shape, color, position, rotation) {\n        this.name = \"ReverseL\";\n        this.shape = rotations.ReverseL[0];\n        this.color = 'blue';\n        this.position = [0, -1];\n        this.rotation = 0;\n    }\n}\n\nclass pieceS {\n    constructor(name, shape, color, position, rotation) {\n        this.name = \"S\";\n        this.shape = rotations.S[0];\n        this.color = 'green';\n        this.position = [0, -1];\n        this.rotation = 0;\n    }\n}\n\nclass pieceZ {\n    constructor(name, shape, color, position, rotation) {\n        this.name = \"Z\";\n        this.shape = rotations.Z[0];\n        this.color = 'red';\n        this.position = [0, -1];\n        this.rotation = 0;\n    }\n}\n\n\nexports.moveLeft = function(usernameAndRoom) {\n    let player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);\n    player.moveLeft();\n};\n\nexports.moveRight = function(usernameAndRoom) {\n    let player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);\n    player.moveRight();\n};\n\nexports.rotateCurrentTetromino = function(usernameAndRoom) {\n    let player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);\n    player.rotateCurrentTetromino();\n}\n\n\nfunction eraseCurrentTetromino(playfield, currentTetromino) {\n    let row = 0;\n    while (row < 4) {\n        let column = 0;\n        while (column < 4) {\n            if (playfield[currentTetromino.position[1] + row]) {\n                if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] && currentTetromino.shape[row][column]) {\n                    playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] = default_color;\n                }\n            }\n            column += 1;\n        }\n        row += 1;\n    }\n}\n\nfunction drawCurrentTetromino(playfield, currentTetromino) {\n    let row = 0;\n    while (row < 4) {\n        let column = 0;\n        while (column < 4) {\n            if (playfield[currentTetromino.position[1] + row]) {\n                if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] && currentTetromino.shape[row][column]) {\n                    playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] = currentTetromino.color;\n                }\n            }\n            column += 1;\n        }\n        row += 1;\n    }\n}\n\nfunction collisionDetected(playfield, currentTetromino) {\n    let row = 0;\n    while (row < 4) {\n        let column = 0;\n        while (column < 4) {\n            if (currentTetromino.shape[row][column]) {\n                if (playfield.length - 1 < currentTetromino.position[1] + row || playfield[0].length - 1 < currentTetromino.position[0] + column)\n                    return (true);\n                if (currentTetromino.position[0] + column < 0)\n                    return (true);\n                if (playfield[currentTetromino.position[1] + row]) {\n                    if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column]) {\n                        if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] !== default_color)\n                            return (true);\n                    }\n                }\n            }\n            column += 1;\n        }\n        row += 1;\n    }\n    return false;\n}\n\nfunction lineIsFilled(arr, len) {\n    let i = 0;\n\n    while (i < len) {\n        if (arr[i] === default_color || arr[i] === disabledColor)\n            return false;\n        i += 1;\n    }\n    return true;\n}\n\nfunction clearLine(arr, len) {\n    let i = 0;\n\n    while (i < len) {\n        arr[i] = default_color;\n        i += 1;\n    }\n}\n\nfunction collapseLines(i, playfield) {\n    for (row = i; row > 0; row--) {\n        for (column = 0; column < 10; column++) {\n            playfield[row][column] = playfield[row - 1][column];\n        }\n    }\n}\n\nfunction removeFilledLines(playfield, currentTetromino) {\n    let i = currentTetromino.position[1];\n    let limit = i + 4;\n    let clearedLines = 0;\n\n    while (i < limit) {\n        if (playfield[i]) {\n            if (lineIsFilled(playfield[i], 10)) {\n                clearLine(playfield[i], 10);\n                collapseLines(i, playfield);\n                clearedLines++;\n            }\n        }\n        i += 1;\n    }\n    return (clearedLines);\n}\n\nlet tetrominos = [pieceLine, pieceL, pieceReverseL, pieceSquare, pieceS, pieceZ, pieceT];\n\nfunction nextTetromino() {\n    let index = Math.floor(Math.random() * tetrominos.length);\n\n    return new tetrominos[index];\n}\n\nfunction joinTetris(client, hash, socketID) {\n    let split = hash.split('[');\n    let room, username, user;\n    room = split[0].slice(1);\n    if (split[1]) {\n        username = split[1].slice(0, split[1].length - 1);\n    }\n    console.log(\"joinTetris() called\");\n    console.log(\"User \\\"\" + username + \"\\\" tried to connect to room: \\\"\" + room + \"\\\"\");\n    let session = findGameSession(room);\n    if (!session) {\n        console.log(\"Session not found, attempting to create a new session\");\n        createGameSession(room, username, socketID);\n        session = findGameSession(room);\n        if (!session) {\n            console.log(\"Failed to create a session.\");\n        }\n        else {\n            console.log(\"Session \\\"\" + room + \"\\\" successfully created with \\\"\" + session.host + \"\\\" as host.\");\n        }\n        user = session.players[0];\n    }\n    else {\n        console.log(\"Session found, attempting to join.\");\n        user = findUserInSession(room, username);\n        if (!user) {\n            console.log(\"User \\\"\" + username + \"\\\" not found in session, adding...\");\n            user = joinGameSession(room, username, socketID);\n        }\n        else {\n            console.log(\"User \\\"\" + username + \"\\\" is already in session.\");\n        }\n    }\n    setInterval(()=> {user.play()}, server.interval);\n}\n\nexports.joinTetris = joinTetris;\n\n\n//# sourceURL=webpack:///./tetris.js?");

/***/ }),

/***/ "./tetrominos.js":
/*!***********************!*\
  !*** ./tetrominos.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nexports.Line = [\n    [\n        [0, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 1, 0, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [1, 1, 1, 1],\n        [0, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 1, 0],\n        [0, 0, 1, 0],\n        [0, 0, 1, 0],\n        [0, 0, 1, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [0, 0, 0, 0],\n        [1, 1, 1, 1],\n        [0, 0, 0, 0]\n    ]];\n\nexports.T = [\n    [\n        [0, 1, 0, 0],\n        [1, 1, 1, 0],\n        [0, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 0, 0],\n        [0, 1, 1, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [1, 1, 1, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 0, 0],\n        [1, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ]];\n\nexports.L = [\n    [\n        [0, 0, 1, 0],\n        [1, 1, 1, 0],\n        [0, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 1, 1, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [1, 1, 1, 0],\n        [1, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [1, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ]];\n\nexports.ReverseL = [\n    [\n        [1, 0, 0, 0],\n        [1, 1, 1, 0],\n        [0, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 1, 0],\n        [0, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [1, 1, 1, 0],\n        [0, 0, 1, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 0, 0],\n        [0, 1, 0, 0],\n        [1, 1, 0, 0],\n        [0, 0, 0, 0]\n    ]];\n\nexports.S = [\n    [\n        [0, 1, 1, 0],\n        [1, 1, 0, 0],\n        [0, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 0, 0],\n        [0, 1, 1, 0],\n        [0, 0, 1, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [0, 1, 1, 0],\n        [1, 1, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [1, 0, 0, 0],\n        [1, 1, 0, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ]];\n\nexports.Z = [\n    [\n        [1, 1, 0, 0],\n        [0, 1, 1, 0],\n        [0, 0, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 1, 0],\n        [0, 1, 1, 0],\n        [0, 1, 0, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 0, 0, 0],\n        [1, 1, 0, 0],\n        [0, 1, 1, 0],\n        [0, 0, 0, 0]\n    ],\n    [\n        [0, 1, 0, 0],\n        [1, 1, 0, 0],\n        [1, 0, 0, 0],\n        [0, 0, 0, 0]\n    ]];\n\n//# sourceURL=webpack:///./tetrominos.js?");

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