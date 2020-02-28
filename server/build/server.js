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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var autoBind = __webpack_require__(/*! auto-bind */ "auto-bind");

var Player =
/*#__PURE__*/
function () {
  function Player() {
    _classCallCheck(this, Player);

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

  _createClass(Player, [{
    key: "play",
    value: function play() {
      if (this.currentTetromino) {
        this.currentTetromino.eraseTetromino(this.playfield.playfield);
        this.currentTetromino.position[1] += 1;

        if (this.playfield.collisionDetected(this.currentTetromino)) {
          this.currentTetromino.position[1] -= 1;
          this.currentTetromino.drawTetromino(this.playfield.playfield);

          if (this.currentTetromino.position[1] < 0) {
            this.gameOver = true;
            Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])('gameOver', 'GAME_FINISHED', this.socketID);
            return;
          }

          var clearedLines = this.playfield.clearFilledLines(this.currentTetromino);

          for (var i = 0; i < clearedLines; i++) {
            this.session.disableLines(this);
          }

          this.increaseScore(clearedLines);
          this.newTetromino();
          Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitPlayfield"])(this);
        } else this.currentTetromino.drawTetromino(this.playfield.playfield);
      }

      Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitTetromino"])(this);
      setTimeout(this.play, this.interval);
    }
  }, {
    key: "increaseScore",
    value: function increaseScore(clearedLines) {
      this.totalClearedLines += clearedLines;
      this.score += clearedLines * (10 + (clearedLines - 1));
      Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])('score', this.score, this.socketID);
      Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])('clearedLines', this.totalClearedLines, this.socketID);
    }
  }, {
    key: "newTetromino",
    value: function newTetromino() {
      this.currentTetromino = this.nextTetromino;
      this.nextTetrominoIndex++;
      if (!this.session.tetrominos[this.nextTetrominoIndex]) this.session.newTetromino();
      this.nextTetromino = Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["copyTetromino"])(this.session.tetrominos[this.nextTetrominoIndex]);
      Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])('nextTetromino', this.nextTetromino, this.socketID);
    }
  }, {
    key: "rotate",
    value: function rotate() {
      if (this.gameOver) return;
      this.currentTetromino.rotate(this.playfield);
      Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitTetromino"])(this);
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      if (this.gameOver) return;
      this.currentTetromino.moveLeft(this.playfield);
      Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitTetromino"])(this);
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      if (this.gameOver) return;
      this.currentTetromino.moveRight(this.playfield);
      Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitTetromino"])(this);
    }
  }, {
    key: "disableLine",
    value: function disableLine() {
      this.currentTetromino.eraseTetromino(this.playfield.playfield);

      for (var row = 0; row < this.playfield.playfield.length - 1; row++) {
        for (var column = 0; column < 10; column++) {
          this.playfield.playfield[row][column] = this.playfield.playfield[row + 1][column];
        }
      }

      for (var _column = 0; _column < 10; _column++) {
        this.playfield.playfield[this.playfield.playfield.length - 1][_column] = _tetris__WEBPACK_IMPORTED_MODULE_1__["disabledColor"];
      }

      this.currentTetromino.position[1] -= 1;
      this.currentTetromino.drawTetromino(this.playfield.playfield);
      Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["emitPlayfield"])(this);
    }
  }]);

  return Player;
}();



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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Playfield =
/*#__PURE__*/
function () {
  function Playfield(playfield) {
    _classCallCheck(this, Playfield);

    auto_bind__WEBPACK_IMPORTED_MODULE_0___default()(this);
    this.playfield = playfield;
  }

  _createClass(Playfield, [{
    key: "collisionDetected",
    value: function collisionDetected(currentTetromino) {
      var row = 0;

      while (row < 4) {
        var column = 0;

        while (column < 4) {
          if (currentTetromino.shape[row][column]) {
            if (this.playfield.length - 1 < currentTetromino.position[1] + row || this.playfield[0].length - 1 < currentTetromino.position[0] + column) return true;
            if (currentTetromino.position[0] + column < 0) return true;

            if (this.playfield[currentTetromino.position[1] + row]) {
              if (this.playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column]) {
                if (this.playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] !== _tetris__WEBPACK_IMPORTED_MODULE_1__["defaultColor"]) return true;
              }
            }
          }

          column += 1;
        }

        row += 1;
      }

      return false;
    }
  }, {
    key: "lineIsFilled",
    value: function lineIsFilled(line) {
      return !line.some(function (cell) {
        return cell === _tetris__WEBPACK_IMPORTED_MODULE_1__["defaultColor"] || cell === _tetris__WEBPACK_IMPORTED_MODULE_1__["disabledColor"];
      });
    }
  }, {
    key: "clearLine",
    value: function clearLine(line) {
      for (var i = 0; i < line.length; i++) {
        line[i] = _tetris__WEBPACK_IMPORTED_MODULE_1__["defaultColor"];
      }
    }
  }, {
    key: "collapseLines",
    value: function collapseLines(i) {
      for (var row = i; row > 0; row--) {
        for (var column = 0; column < 10; column++) {
          this.playfield[row][column] = this.playfield[row - 1][column];
        }
      }
    }
  }, {
    key: "clearFilledLines",
    value: function clearFilledLines(currentTetromino) {
      var currentLineIndex = currentTetromino.position[1];
      var lastClearableLineIndex = currentLineIndex + 4;
      var clearedLines = 0;

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

      return clearedLines;
    }
  }]);

  return Playfield;
}();



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


var express = __webpack_require__(/*! express */ "express");

var app = express();

var server = __webpack_require__(/*! http */ "http").Server(app);

var io = __webpack_require__(/*! socket.io */ "socket.io")(server);

var path = __webpack_require__(/*! path */ "path");

var port = 8080;
app.use(express["static"](path.join(__dirname, '../../client/build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});
server.listen(port);
var interval = 300;
io.on('connection', function (client) {
  console.log("\nConnection happened.");
  client.on('Hash', function (string) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["joinTetris"])(string, client.id);
  });
  client.on('ArrowUp', function (usernameAndRoom) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["rotateCurrentTetromino"])(usernameAndRoom);
  });
  client.on('ArrowDown', function (usernameAndRoom) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["setGameInterval"])(usernameAndRoom, 50);
  });
  client.on('ArrowDownUnpressed', function (usernameAndRoom) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["setGameInterval"])(usernameAndRoom, 300);
  });
  client.on('ArrowLeft', function (usernameAndRoom) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["moveLeft"])(usernameAndRoom);
  });
  client.on('ArrowRight', function (usernameAndRoom) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["moveRight"])(usernameAndRoom);
  });
});
var emit = function emit(event, args, socketID) {
  io.to("".concat(socketID)).emit(event, args);
};

var on = function on(event, callback, emit) {};

/***/ }),

/***/ "./tetris.js":
/*!*******************!*\
  !*** ./tetris.js ***!
  \*******************/
/*! exports provided: defaultColor, disabledColor, createPlayfield, emitEvents, emitPlayfield, emitTetromino, copyTetromino, setGameInterval, moveLeft, moveRight, rotateCurrentTetromino, parseUsername, joinTetris */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseUsername", function() { return parseUsername; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "joinTetris", function() { return joinTetris; });
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server */ "./server.js");
/* harmony import */ var _tetromino__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tetromino */ "./tetromino.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./player.js");
/* harmony import */ var _tetrominos__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tetrominos */ "./tetrominos.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }






var autoBind = __webpack_require__(/*! auto-bind */ "auto-bind");

var defaultColor = 'gray';
var disabledColor = 'pink';
function createPlayfield() {
  return _toConsumableArray(new Array(20)).map(function () {
    return _toConsumableArray(new Array(10)).map(function () {
      return defaultColor;
    });
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

function emitSession(thisPlayer) {}

function initialPackage(thisPlayer) {
  emitPlayfield(thisPlayer);
  emitTetromino(thisPlayer);
}

var GameSession =
/*#__PURE__*/
function () {
  function GameSession() {
    _classCallCheck(this, GameSession);

    autoBind(this);
    this.room = "";
    this.host = "";
    this.gameState = "STARTING_SCREEN";
    this.players = Array();
    this.tetrominos = Array(createTetromino(), createTetromino());
  }

  _createClass(GameSession, [{
    key: "newTetromino",
    value: function newTetromino() {
      this.tetrominos.push(createTetromino());
    }
  }, {
    key: "disableLines",
    value: function disableLines(user) {
      this.players.forEach(function (element) {
        if (element !== user) {
          element.disableLine();
        }
      });
    }
  }]);

  return GameSession;
}();

var tetrominos = [new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Line"][0], 'cyan', [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Line"]), new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["L"][0], 'orange', [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["L"]), new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["ReverseL"][0], "blue", [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["ReverseL"]), new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Square"][0], 'yellow', [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Square"]), new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["S"][0], 'green', [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["S"]), new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Z"][0], 'red', [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Z"]), new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["T"][0], 'purple', [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["T"])];

function createTetromino() {
  var index = Math.floor(Math.random() * tetrominos.length);
  return tetrominos[index];
}

var sessions = Array();

function findGameSession(room) {
  return sessions.find(function (element) {
    return element.room === room;
  });
}

function findUserInSession(room, username) {
  var session = findGameSession(room);
  if (!session) return;
  return session.players.find(function (user) {
    return user.name === username;
  });
}

var copyTetromino = function copyTetromino(tetromino) {
  return new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](tetromino.shape, tetromino.color, [0, -1], tetromino.rotationArray);
};

function createPlayer(session, name, socketID) {
  var player = new _player__WEBPACK_IMPORTED_MODULE_2__["default"]();
  player.session = session;
  player.name = name;
  player.socketID = socketID;
  session.players.push(player);
  player.currentTetromino = copyTetromino(session.tetrominos[0]);
  player.nextTetromino = copyTetromino(session.tetrominos[1]);
  return player;
}

function createGameSession(room, host) {
  var session = new GameSession();
  session.room = room;
  session.host = host;
  sessions.push(session);
  return session;
}

function setGameInterval(usernameAndRoom, gameInterval) {
  var player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
  player.interval = gameInterval;
}
function moveLeft(usernameAndRoom) {
  var player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
  player.moveLeft();
}
function moveRight(usernameAndRoom) {
  var player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
  player.moveRight();
}
function rotateCurrentTetromino(usernameAndRoom) {
  var player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
  player.rotate();
}

function getUser(room, username, socketID) {
  var session = findGameSession(room) || createGameSession(room, username, socketID);
  var user = findUserInSession(room, username);

  if (!user) {
    console.log("User \"".concat(username, "\" not found in session, adding..."));
    return createPlayer(session, username, socketID);
  } else {
    console.log("User \"".concat(username, "\" is already in session."));
    user.socketID = socketID;
    initialPackage(user);
  }
}

function parseUsername(split) {
  return split[1] ? split[1].slice(0, split[1].length - 1) : undefined;
}
function joinTetris(hash, socketID) {
  var split = hash.split('[');
  var room = split[0].slice(1);
  console.log(split);
  var username = parseUsername(split);
  console.log(username);
  console.log("joinTetris() called");
  console.log("User \"".concat(username, "\" tried to connect to room: \"").concat(room, "\""));
  var user = getUser(room, username, socketID);
  setTimeout(function () {
    if (user) user.play();
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
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var autoBind = __webpack_require__(/*! auto-bind */ "auto-bind");

var Tetromino =
/*#__PURE__*/
function () {
  function Tetromino(shape, color, position, rotationArray) {
    _classCallCheck(this, Tetromino);

    autoBind(this);
    this.shape = shape;
    this.color = color;
    this.position = [3, -4];
    this.rotationArray = rotationArray;
  }

  _createClass(Tetromino, [{
    key: "drawTetromino",
    value: function drawTetromino(playfield) {
      var row = 0;

      while (row < 4) {
        var column = 0;

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
  }, {
    key: "eraseTetromino",
    value: function eraseTetromino(playfield) {
      var row = 0;

      while (row < 4) {
        var column = 0;

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
  }, {
    key: "moveLeft",
    value: function moveLeft(playfield) {
      this.eraseTetromino(playfield.playfield, this);
      this.position[0] -= 1;
      if (playfield.collisionDetected(this)) this.position[0] += 1;
      this.drawTetromino(playfield.playfield, this);
    }
  }, {
    key: "moveRight",
    value: function moveRight(playfield) {
      this.eraseTetromino(playfield.playfield, this);
      this.position[0] += 1;
      if (playfield.collisionDetected(this)) this.position[0] -= 1;
      this.drawTetromino(playfield.playfield, this);
    }
  }, {
    key: "rotate",
    value: function rotate(playfield) {
      this.eraseTetromino(playfield.playfield, this);

      if (this.rotationArray.indexOf(this.shape) === this.rotationArray.length - 1) {
        this.shape = this.rotationArray[0];
      } else {
        this.shape = this.rotationArray[this.rotationArray.indexOf(this.shape) + 1];
      }

      if (playfield.collisionDetected(this)) this._wallKick(playfield);
      this.drawTetromino(playfield.playfield);
    }
  }, {
    key: "_wallKick",
    value: function _wallKick(playfield) {
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
  }, {
    key: "_unrotate",
    value: function _unrotate() {
      if (this.rotationArray.indexOf(this.shape) < 1) {
        this.shape = this.rotationArray[this.rotationArray.length - 1];
      } else {
        this.shape = this.rotationArray[this.rotationArray.indexOf(this.shape) - 1];
      }
    }
  }, {
    key: "_tryTetrominoPosition",
    value: function _tryTetrominoPosition(position, playfield) {
      var tmp = _toConsumableArray(this.position);

      this.position[0] = position[0];
      this.position[1] = position[1];

      if (playfield.collisionDetected(this)) {
        this.position[0] = tmp[0];
        this.position[1] = tmp[1];
        return false;
      }

      return true;
    }
  }]);

  return Tetromino;
}();



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
var Square = [[[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]];
var Line = [[[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]]];
var T = [[[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];
var L = [[[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0]], [[1, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];
var ReverseL = [[[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]]];
var S = [[[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]], [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];
var Z = [[[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]]];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGxheWVyLmpzIiwid2VicGFjazovLy8uL3BsYXlmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGV0cmlzLmpzIiwid2VicGFjazovLy8uL3RldHJvbWluby5qcyIsIndlYnBhY2s6Ly8vLi90ZXRyb21pbm9zLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF1dG8tYmluZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIl0sIm5hbWVzIjpbImF1dG9CaW5kIiwicmVxdWlyZSIsIlBsYXllciIsInNlc3Npb24iLCJwbGF5ZmllbGQiLCJQbGF5ZmllbGQiLCJjcmVhdGVQbGF5ZmllbGQiLCJuYW1lIiwiY3VycmVudFRldHJvbWlubyIsIm5leHRUZXRyb21pbm8iLCJuZXh0VGV0cm9taW5vSW5kZXgiLCJzb2NrZXRJRCIsInRldHJvbWlub3MiLCJpbnRlcnZhbCIsImdhbWVPdmVyIiwic2NvcmUiLCJ0b3RhbENsZWFyZWRMaW5lcyIsImVyYXNlVGV0cm9taW5vIiwicG9zaXRpb24iLCJjb2xsaXNpb25EZXRlY3RlZCIsImRyYXdUZXRyb21pbm8iLCJlbWl0IiwiY2xlYXJlZExpbmVzIiwiY2xlYXJGaWxsZWRMaW5lcyIsImkiLCJkaXNhYmxlTGluZXMiLCJpbmNyZWFzZVNjb3JlIiwibmV3VGV0cm9taW5vIiwiZW1pdFBsYXlmaWVsZCIsImVtaXRUZXRyb21pbm8iLCJzZXRUaW1lb3V0IiwicGxheSIsImNvcHlUZXRyb21pbm8iLCJyb3RhdGUiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsInJvdyIsImxlbmd0aCIsImNvbHVtbiIsImRpc2FibGVkQ29sb3IiLCJzaGFwZSIsImRlZmF1bHRDb2xvciIsImxpbmUiLCJzb21lIiwiY2VsbCIsImN1cnJlbnRMaW5lSW5kZXgiLCJsYXN0Q2xlYXJhYmxlTGluZUluZGV4IiwibGluZUlzRmlsbGVkIiwiY2xlYXJMaW5lIiwiY29sbGFwc2VMaW5lcyIsImV4cHJlc3MiLCJhcHAiLCJzZXJ2ZXIiLCJTZXJ2ZXIiLCJpbyIsInBhdGgiLCJwb3J0IiwidXNlIiwiam9pbiIsIl9fZGlybmFtZSIsImdldCIsInJlcSIsInJlcyIsInNlbmRGaWxlIiwibGlzdGVuIiwib24iLCJjbGllbnQiLCJjb25zb2xlIiwibG9nIiwic3RyaW5nIiwiam9pblRldHJpcyIsImlkIiwidXNlcm5hbWVBbmRSb29tIiwicm90YXRlQ3VycmVudFRldHJvbWlubyIsInNldEdhbWVJbnRlcnZhbCIsImV2ZW50IiwiYXJncyIsInRvIiwiY2FsbGJhY2siLCJBcnJheSIsIm1hcCIsImVtaXRFdmVudHMiLCJ0aGlzUGxheWVyIiwiZW1pdFNlc3Npb24iLCJpbml0aWFsUGFja2FnZSIsIkdhbWVTZXNzaW9uIiwicm9vbSIsImhvc3QiLCJnYW1lU3RhdGUiLCJwbGF5ZXJzIiwiY3JlYXRlVGV0cm9taW5vIiwicHVzaCIsInVzZXIiLCJmb3JFYWNoIiwiZWxlbWVudCIsImRpc2FibGVMaW5lIiwiVGV0cm9taW5vIiwiTGluZSIsIkwiLCJSZXZlcnNlTCIsIlNxdWFyZSIsIlMiLCJaIiwiVCIsImluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwic2Vzc2lvbnMiLCJmaW5kR2FtZVNlc3Npb24iLCJmaW5kIiwiZmluZFVzZXJJblNlc3Npb24iLCJ1c2VybmFtZSIsInRldHJvbWlubyIsImNvbG9yIiwicm90YXRpb25BcnJheSIsImNyZWF0ZVBsYXllciIsInBsYXllciIsImNyZWF0ZUdhbWVTZXNzaW9uIiwiZ2FtZUludGVydmFsIiwiZ2V0VXNlciIsInBhcnNlVXNlcm5hbWUiLCJzcGxpdCIsInNsaWNlIiwidW5kZWZpbmVkIiwiaGFzaCIsImluZGV4T2YiLCJfd2FsbEtpY2siLCJfdHJ5VGV0cm9taW5vUG9zaXRpb24iLCJfdW5yb3RhdGUiLCJ0bXAiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBTUEsUUFBUSxHQUFHQyxtQkFBTyxDQUFDLDRCQUFELENBQXhCOztJQUVxQkMsTTs7O0FBQ2pCLG9CQUFjO0FBQUE7O0FBQ1ZGLFlBQVEsQ0FBQyxJQUFELENBQVI7QUFDQSxTQUFLRyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsSUFBSUMsa0RBQUosQ0FBY0MsK0RBQWUsRUFBN0IsQ0FBakI7QUFDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLElBQXhCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixJQUFyQjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCLENBQTFCO0FBQ0EsU0FB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LENBUGEsRUFhYixDQUNJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQURKLEVBRUksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBRkosRUFHSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FISixFQUlJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUpKLENBYmEsRUFtQmIsQ0FDSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FESixFQUVJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUZKLEVBR0ksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBSEosRUFJSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FKSixDQW5CYSxDQUFWLEM7Ozs7Ozs7Ozs7O0FDM0lQLHNDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHNDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NlcnZlci5qc1wiKTtcbiIsImltcG9ydCB7ZW1pdH0gZnJvbSBcIi4vc2VydmVyXCI7XG5pbXBvcnQge2NvcHlUZXRyb21pbm8sIGNyZWF0ZVBsYXlmaWVsZCwgZGlzYWJsZWRDb2xvciwgZW1pdFBsYXlmaWVsZCwgZW1pdFRldHJvbWlub30gZnJvbSBcIi4vdGV0cmlzXCI7XG5pbXBvcnQgUGxheWZpZWxkIGZyb20gXCIuL3BsYXlmaWVsZFwiO1xuY29uc3QgYXV0b0JpbmQgPSByZXF1aXJlKCdhdXRvLWJpbmQnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IG51bGw7XG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gbmV3IFBsYXlmaWVsZChjcmVhdGVQbGF5ZmllbGQoKSk7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWlubyA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlubyA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlub0luZGV4ID0gMDtcbiAgICAgICAgdGhpcy5zb2NrZXRJRCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRldHJvbWlub3MgPSBudWxsO1xuICAgICAgICB0aGlzLmludGVydmFsID0gMzAwO1xuICAgICAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLnRvdGFsQ2xlYXJlZExpbmVzID0gMDtcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VGV0cm9taW5vKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArPSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMuY3VycmVudFRldHJvbWlubykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gLT0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBlbWl0KCdnYW1lT3ZlcicsICdHQU1FX0ZJTklTSEVEJywgdGhpcy5zb2NrZXRJRCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBjbGVhcmVkTGluZXMgPSB0aGlzLnBsYXlmaWVsZC5jbGVhckZpbGxlZExpbmVzKHRoaXMuY3VycmVudFRldHJvbWlubyk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGVhcmVkTGluZXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlc3Npb24uZGlzYWJsZUxpbmVzKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmluY3JlYXNlU2NvcmUoY2xlYXJlZExpbmVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1RldHJvbWlubygpO1xuICAgICAgICAgICAgICAgIGVtaXRQbGF5ZmllbGQodGhpcyk7XG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5wbGF5LCB0aGlzLmludGVydmFsKTtcbiAgICB9XG5cbiAgICBpbmNyZWFzZVNjb3JlKGNsZWFyZWRMaW5lcykge1xuICAgICAgICB0aGlzLnRvdGFsQ2xlYXJlZExpbmVzICs9IGNsZWFyZWRMaW5lcztcbiAgICAgICAgdGhpcy5zY29yZSArPSBjbGVhcmVkTGluZXMgKiAoMTAgKyAoY2xlYXJlZExpbmVzIC0gMSkpO1xuICAgICAgICBlbWl0KCdzY29yZScsIHRoaXMuc2NvcmUsIHRoaXMuc29ja2V0SUQpO1xuICAgICAgICBlbWl0KCdjbGVhcmVkTGluZXMnLCB0aGlzLnRvdGFsQ2xlYXJlZExpbmVzLCB0aGlzLnNvY2tldElEKTtcbiAgICB9XG5cbiAgICBuZXdUZXRyb21pbm8oKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWlubyA9IHRoaXMubmV4dFRldHJvbWlubztcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vSW5kZXgrKztcbiAgICAgICAgaWYgKCF0aGlzLnNlc3Npb24udGV0cm9taW5vc1t0aGlzLm5leHRUZXRyb21pbm9JbmRleF0pXG4gICAgICAgICAgICB0aGlzLnNlc3Npb24ubmV3VGV0cm9taW5vKCk7XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlubyA9IGNvcHlUZXRyb21pbm8odGhpcy5zZXNzaW9uLnRldHJvbWlub3NbdGhpcy5uZXh0VGV0cm9taW5vSW5kZXhdKTtcbiAgICAgICAgZW1pdCgnbmV4dFRldHJvbWlubycsIHRoaXMubmV4dFRldHJvbWlubywgdGhpcy5zb2NrZXRJRCk7XG4gICAgfVxuXG4gICAgcm90YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lT3ZlcilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLnJvdGF0ZSh0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgfVxuXG4gICAgbW92ZUxlZnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVPdmVyKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ubW92ZUxlZnQodGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgIH07XG5cbiAgICBtb3ZlUmlnaHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVPdmVyKVxuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLm1vdmVSaWdodCh0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgfTtcblxuICAgIGRpc2FibGVMaW5lKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5wbGF5ZmllbGQucGxheWZpZWxkLmxlbmd0aCAtIDE7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGRbcm93XVtjb2x1bW5dID0gdGhpcy5wbGF5ZmllbGQucGxheWZpZWxkW3JvdyArIDFdW2NvbHVtbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQucGxheWZpZWxkW3RoaXMucGxheWZpZWxkLnBsYXlmaWVsZC5sZW5ndGggLSAxXVtjb2x1bW5dID0gZGlzYWJsZWRDb2xvcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gLT0gMTtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdFBsYXlmaWVsZCh0aGlzKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgYXV0b0JpbmQgZnJvbSBcImF1dG8tYmluZFwiO1xuaW1wb3J0IHtkZWZhdWx0Q29sb3IsIGRpc2FibGVkQ29sb3J9IGZyb20gXCIuL3RldHJpc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZmllbGQge1xuICAgIGNvbnN0cnVjdG9yKHBsYXlmaWVsZCkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wbGF5ZmllbGQgPSBwbGF5ZmllbGQ7XG4gICAgfVxuXG4gICAgY29sbGlzaW9uRGV0ZWN0ZWQoY3VycmVudFRldHJvbWlubykge1xuICAgICAgICBsZXQgcm93ID0gMDtcbiAgICAgICAgd2hpbGUgKHJvdyA8IDQpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA8IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRldHJvbWluby5zaGFwZVtyb3ddW2NvbHVtbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkLmxlbmd0aCAtIDEgPCBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93IHx8IHRoaXMucGxheWZpZWxkWzBdLmxlbmd0aCAtIDEgPCBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uIDwgMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGRbY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XVtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XVtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uXSAhPT0gZGVmYXVsdENvbG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdyArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsaW5lSXNGaWxsZWQobGluZSkge1xuICAgICAgICByZXR1cm4gIWxpbmUuc29tZShjZWxsID0+IGNlbGwgPT09IGRlZmF1bHRDb2xvciB8fCBjZWxsID09PSBkaXNhYmxlZENvbG9yKTtcbiAgICB9XG5cbiAgICBjbGVhckxpbmUobGluZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpbmVbaV0gPSBkZWZhdWx0Q29sb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2xsYXBzZUxpbmVzKGkpIHtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gaTsgcm93ID4gMDsgcm93LS0pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkW3Jvd11bY29sdW1uXSA9IHRoaXMucGxheWZpZWxkW3JvdyAtIDFdW2NvbHVtbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckZpbGxlZExpbmVzKGN1cnJlbnRUZXRyb21pbm8pIHtcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lSW5kZXggPSBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdO1xuICAgICAgICBjb25zdCBsYXN0Q2xlYXJhYmxlTGluZUluZGV4ID0gY3VycmVudExpbmVJbmRleCArIDQ7XG4gICAgICAgIGxldCBjbGVhcmVkTGluZXMgPSAwO1xuXG4gICAgICAgIHdoaWxlIChjdXJyZW50TGluZUluZGV4IDwgbGFzdENsZWFyYWJsZUxpbmVJbmRleCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkW2N1cnJlbnRMaW5lSW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGluZUlzRmlsbGVkKHRoaXMucGxheWZpZWxkW2N1cnJlbnRMaW5lSW5kZXhdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyTGluZSh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VMaW5lcyhjdXJyZW50TGluZUluZGV4LCB0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyZWRMaW5lcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRMaW5lSW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGNsZWFyZWRMaW5lcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtqb2luVGV0cmlzLCBtb3ZlTGVmdCwgbW92ZVJpZ2h0LCByb3RhdGVDdXJyZW50VGV0cm9taW5vLCBzZXRHYW1lSW50ZXJ2YWx9IGZyb20gXCIuL3RldHJpc1wiO1xuXG5jb25zdCBleHByZXNzID0gcmVxdWlyZSgnZXhwcmVzcycpO1xuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3Qgc2VydmVyID0gcmVxdWlyZSgnaHR0cCcpLlNlcnZlcihhcHApO1xuY29uc3QgaW8gPSByZXF1aXJlKCdzb2NrZXQuaW8nKShzZXJ2ZXIpO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5jb25zdCBwb3J0ID0gODA4MDtcblxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vLi4vY2xpZW50L2J1aWxkJykpKTtcbmFwcC5nZXQoJy8nLCBmdW5jdGlvbihyZXEsIHJlcykge1xuICAgIHJlcy5zZW5kRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vLi4vY2xpZW50L2J1aWxkJywgJ2luZGV4Lmh0bWwnKSk7XG59KTtcblxuc2VydmVyLmxpc3Rlbihwb3J0KTtcblxuZXhwb3J0IGxldCBpbnRlcnZhbCA9IDMwMDtcblxuaW8ub24oJ2Nvbm5lY3Rpb24nLCAoY2xpZW50KSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJcXG5Db25uZWN0aW9uIGhhcHBlbmVkLlwiKTtcbiAgICBjbGllbnQub24oJ0hhc2gnLCBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIGpvaW5UZXRyaXMoc3RyaW5nLCBjbGllbnQuaWQpO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbignQXJyb3dVcCcsICh1c2VybmFtZUFuZFJvb20pID0+IHtcbiAgICAgICAgcm90YXRlQ3VycmVudFRldHJvbWlubyh1c2VybmFtZUFuZFJvb20pO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbignQXJyb3dEb3duJywgKHVzZXJuYW1lQW5kUm9vbSkgPT4ge1xuICAgICAgICBzZXRHYW1lSW50ZXJ2YWwodXNlcm5hbWVBbmRSb29tLCA1MCk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKCdBcnJvd0Rvd25VbnByZXNzZWQnLCAodXNlcm5hbWVBbmRSb29tKSA9PiB7XG4gICAgICAgIHNldEdhbWVJbnRlcnZhbCh1c2VybmFtZUFuZFJvb20sIDMwMCk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKCdBcnJvd0xlZnQnLCAodXNlcm5hbWVBbmRSb29tKSA9PiB7XG4gICAgICAgIG1vdmVMZWZ0KHVzZXJuYW1lQW5kUm9vbSk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKCdBcnJvd1JpZ2h0JywgKHVzZXJuYW1lQW5kUm9vbSkgPT4ge1xuICAgICAgICBtb3ZlUmlnaHQodXNlcm5hbWVBbmRSb29tKTtcbiAgICB9KVxufSk7XG5cbmV4cG9ydCBjb25zdCBlbWl0ID0gKGV2ZW50LCBhcmdzLCBzb2NrZXRJRCkgPT4ge1xuICAgIGlvLnRvKGAke3NvY2tldElEfWApLmVtaXQoZXZlbnQsIGFyZ3MpO1xufTtcblxuY29uc3Qgb24gPSAoZXZlbnQsIGNhbGxiYWNrLCBlbWl0KSA9PiB7XG5cbn07XG4iLCJpbXBvcnQge2VtaXQsIGludGVydmFsfSBmcm9tIFwiLi9zZXJ2ZXJcIjtcbmltcG9ydCBUZXRyb21pbm8gZnJvbSBcIi4vdGV0cm9taW5vXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHtMLCBMaW5lLCBSZXZlcnNlTCwgUywgU3F1YXJlLCBULCBafSBmcm9tIFwiLi90ZXRyb21pbm9zXCI7XG5cbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZSgnYXV0by1iaW5kJyk7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q29sb3IgPSAnZ3JheSc7XG5leHBvcnQgY29uc3QgZGlzYWJsZWRDb2xvciA9ICdwaW5rJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXlmaWVsZCgpIHtcbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheSgyMCldLm1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBbLi4ubmV3IEFycmF5KDEwKV0ubWFwKCgpID0+IGRlZmF1bHRDb2xvcik7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0RXZlbnRzKHRoaXNQbGF5ZXIpIHtcbiAgICBlbWl0KCdwbGF5ZmllbGQnLCB0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXNQbGF5ZXIuc29ja2V0SUQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1pdFBsYXlmaWVsZCh0aGlzUGxheWVyKSB7XG4gICAgdGhpc1BsYXllci5jdXJyZW50VGV0cm9taW5vLmVyYXNlVGV0cm9taW5vKHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgZW1pdCgncGxheWZpZWxkJywgdGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzUGxheWVyLnNvY2tldElEKTtcbiAgICB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1pdFRldHJvbWlubyh0aGlzUGxheWVyKSB7XG4gICAgZW1pdCgndGV0cm9taW5vJywgdGhpc1BsYXllci5jdXJyZW50VGV0cm9taW5vLCB0aGlzUGxheWVyLnNvY2tldElEKTtcbn1cblxuZnVuY3Rpb24gZW1pdFNlc3Npb24odGhpc1BsYXllcikge1xuXG59XG5cbmZ1bmN0aW9uIGluaXRpYWxQYWNrYWdlKHRoaXNQbGF5ZXIpIHtcbiAgICBlbWl0UGxheWZpZWxkKHRoaXNQbGF5ZXIpO1xuICAgIGVtaXRUZXRyb21pbm8odGhpc1BsYXllcik7XG59XG5cbmNsYXNzIEdhbWVTZXNzaW9uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucm9vbSA9IFwiXCI7XG4gICAgICAgIHRoaXMuaG9zdCA9IFwiXCI7XG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gXCJTVEFSVElOR19TQ1JFRU5cIjtcbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gQXJyYXkoKTtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zID0gQXJyYXkoY3JlYXRlVGV0cm9taW5vKCksIGNyZWF0ZVRldHJvbWlubygpKTtcbiAgICB9XG5cbiAgICBuZXdUZXRyb21pbm8oKSB7XG4gICAgICAgIHRoaXMudGV0cm9taW5vcy5wdXNoKGNyZWF0ZVRldHJvbWlubygpKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlTGluZXModXNlcikge1xuICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSB1c2VyKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5kaXNhYmxlTGluZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IHRldHJvbWlub3MgPSBbbmV3IFRldHJvbWlubyhMaW5lWzBdLCAnY3lhbicsIFs1LCAtMl0sIExpbmUpLFxuICAgIG5ldyBUZXRyb21pbm8oTFswXSwgJ29yYW5nZScsIFs1LCAtMl0sIEwpLFxuICAgIG5ldyBUZXRyb21pbm8oUmV2ZXJzZUxbMF0sIFwiYmx1ZVwiLCBbNSwgLTJdLCBSZXZlcnNlTCksXG4gICAgbmV3IFRldHJvbWlubyhTcXVhcmVbMF0sICd5ZWxsb3cnLCBbNSwgLTJdLCBTcXVhcmUpLFxuICAgIG5ldyBUZXRyb21pbm8oU1swXSwgJ2dyZWVuJywgWzUsIC0yXSwgUyksXG4gICAgbmV3IFRldHJvbWlubyhaWzBdLCAncmVkJywgWzUsIC0yXSwgWiksXG4gICAgbmV3IFRldHJvbWlubyhUWzBdLCAncHVycGxlJywgWzUsIC0yXSwgVCldO1xuXG5mdW5jdGlvbiBjcmVhdGVUZXRyb21pbm8oKSB7XG4gICAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0ZXRyb21pbm9zLmxlbmd0aCk7XG5cbiAgICByZXR1cm4gdGV0cm9taW5vc1tpbmRleF07XG59XG5cbmNvbnN0IHNlc3Npb25zID0gQXJyYXkoKTtcblxuZnVuY3Rpb24gZmluZEdhbWVTZXNzaW9uKHJvb20pIHtcbiAgICByZXR1cm4gc2Vzc2lvbnMuZmluZChlbGVtZW50ID0+IGVsZW1lbnQucm9vbSA9PT0gcm9vbSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRVc2VySW5TZXNzaW9uKHJvb20sIHVzZXJuYW1lKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGZpbmRHYW1lU2Vzc2lvbihyb29tKTtcbiAgICBpZiAoIXNlc3Npb24pXG4gICAgICAgIHJldHVybjtcblxuICAgIHJldHVybiBzZXNzaW9uLnBsYXllcnMuZmluZCh1c2VyID0+IHVzZXIubmFtZSA9PT0gdXNlcm5hbWUpO1xufVxuXG5leHBvcnQgY29uc3QgY29weVRldHJvbWlubyA9ICh0ZXRyb21pbm8pID0+IHtcbiAgICByZXR1cm4gbmV3IFRldHJvbWlubyh0ZXRyb21pbm8uc2hhcGUsIHRldHJvbWluby5jb2xvciwgWzAsIC0xXSwgdGV0cm9taW5vLnJvdGF0aW9uQXJyYXkpO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyKHNlc3Npb24sIG5hbWUsIHNvY2tldElEKSB7XG4gICAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigpO1xuICAgIHBsYXllci5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICBwbGF5ZXIubmFtZSA9IG5hbWU7XG4gICAgcGxheWVyLnNvY2tldElEID0gc29ja2V0SUQ7XG4gICAgc2Vzc2lvbi5wbGF5ZXJzLnB1c2gocGxheWVyKTtcbiAgICBwbGF5ZXIuY3VycmVudFRldHJvbWlubyA9IGNvcHlUZXRyb21pbm8oc2Vzc2lvbi50ZXRyb21pbm9zWzBdKTtcbiAgICBwbGF5ZXIubmV4dFRldHJvbWlubyA9IGNvcHlUZXRyb21pbm8oc2Vzc2lvbi50ZXRyb21pbm9zWzFdKTtcbiAgICByZXR1cm4gcGxheWVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lU2Vzc2lvbihyb29tLCBob3N0KSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBHYW1lU2Vzc2lvbigpO1xuICAgIHNlc3Npb24ucm9vbSA9IHJvb207XG4gICAgc2Vzc2lvbi5ob3N0ID0gaG9zdDtcblxuICAgIHNlc3Npb25zLnB1c2goc2Vzc2lvbik7XG5cbiAgICByZXR1cm4gc2Vzc2lvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdhbWVJbnRlcnZhbCh1c2VybmFtZUFuZFJvb20sIGdhbWVJbnRlcnZhbCkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIuaW50ZXJ2YWwgPSBnYW1lSW50ZXJ2YWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlTGVmdCh1c2VybmFtZUFuZFJvb20pIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XG4gICAgcGxheWVyLm1vdmVMZWZ0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlUmlnaHQodXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5tb3ZlUmlnaHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZUN1cnJlbnRUZXRyb21pbm8odXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5yb3RhdGUoKTtcbn1cblxuZnVuY3Rpb24gZ2V0VXNlcihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gZmluZEdhbWVTZXNzaW9uKHJvb20pIHx8IGNyZWF0ZUdhbWVTZXNzaW9uKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCk7XG5cbiAgICBjb25zdCB1c2VyID0gZmluZFVzZXJJblNlc3Npb24ocm9vbSwgdXNlcm5hbWUpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiBub3QgZm91bmQgaW4gc2Vzc2lvbiwgYWRkaW5nLi4uYCk7XG4gICAgICAgIHJldHVybiBjcmVhdGVQbGF5ZXIoc2Vzc2lvbiwgdXNlcm5hbWUsIHNvY2tldElEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNlciBcIiR7dXNlcm5hbWV9XCIgaXMgYWxyZWFkeSBpbiBzZXNzaW9uLmApO1xuICAgICAgICB1c2VyLnNvY2tldElEID0gc29ja2V0SUQ7XG4gICAgICAgIGluaXRpYWxQYWNrYWdlKHVzZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVXNlcm5hbWUoc3BsaXQpIHtcbiAgICByZXR1cm4gc3BsaXRbMV1cbiAgICAgICAgPyBzcGxpdFsxXS5zbGljZSgwLCBzcGxpdFsxXS5sZW5ndGggLSAxKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGpvaW5UZXRyaXMoaGFzaCwgc29ja2V0SUQpIHtcbiAgICBjb25zdCBzcGxpdCA9IGhhc2guc3BsaXQoJ1snKTtcbiAgICBjb25zdCByb29tID0gc3BsaXRbMF0uc2xpY2UoMSk7XG4gICAgY29uc29sZS5sb2coc3BsaXQpO1xuICAgIGNvbnN0IHVzZXJuYW1lID0gcGFyc2VVc2VybmFtZShzcGxpdCk7XG4gICAgY29uc29sZS5sb2codXNlcm5hbWUpO1xuXG4gICAgY29uc29sZS5sb2coXCJqb2luVGV0cmlzKCkgY2FsbGVkXCIpO1xuICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiB0cmllZCB0byBjb25uZWN0IHRvIHJvb206IFwiJHtyb29tfVwiYCk7XG5cbiAgICBjb25zdCB1c2VyID0gZ2V0VXNlcihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodXNlcilcbiAgICAgICAgICAgIHVzZXIucGxheSgpXG4gICAgfSwgaW50ZXJ2YWwpO1xufVxuIiwiXG5jb25zdCBhdXRvQmluZCA9IHJlcXVpcmUoJ2F1dG8tYmluZCcpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXRyb21pbm8ge1xuICAgIGNvbnN0cnVjdG9yKHNoYXBlLCBjb2xvciwgcG9zaXRpb24sIHJvdGF0aW9uQXJyYXkpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gWzMsIC00XTtcbiAgICAgICAgdGhpcy5yb3RhdGlvbkFycmF5ID0gcm90YXRpb25BcnJheTtcbiAgICB9XG5cbiAgICBkcmF3VGV0cm9taW5vKHBsYXlmaWVsZCkge1xuICAgICAgICBsZXQgcm93ID0gMDtcbiAgICAgICAgd2hpbGUgKHJvdyA8IDQpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA8IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bdGhpcy5wb3NpdGlvblswXSArIGNvbHVtbl0gJiYgdGhpcy5zaGFwZVtyb3ddW2NvbHVtbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVt0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZCkge1xuICAgICAgICBsZXQgcm93ID0gMDtcbiAgICAgICAgd2hpbGUgKHJvdyA8IDQpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA8IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bdGhpcy5wb3NpdGlvblswXSArIGNvbHVtbl0gJiYgdGhpcy5zaGFwZVtyb3ddW2NvbHVtbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVt0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXSA9ICdncmF5JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdyArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUxlZnQocGxheWZpZWxkKSB7XG4gICAgICAgIHRoaXMuZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMF0gLT0gMTtcbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSlcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gKz0gMTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgIH07XG5cbiAgICBtb3ZlUmlnaHQocGxheWZpZWxkKSB7XG4gICAgICAgIHRoaXMuZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMF0gKz0gMTtcbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSlcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gLT0gMTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgIH07XG5cbiAgICByb3RhdGUocGxheWZpZWxkKSB7XG4gICAgICAgIHRoaXMuZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSA9PT0gdGhpcy5yb3RhdGlvbkFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5W3RoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSlcbiAgICAgICAgICAgIHRoaXMuX3dhbGxLaWNrKHBsYXlmaWVsZCk7XG4gICAgICAgIHRoaXMuZHJhd1RldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICB9XG5cbiAgICBfd2FsbEtpY2socGxheWZpZWxkKSB7XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSAtIDEsIHRoaXMucG9zaXRpb25bMV1dLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdICsgMSwgdGhpcy5wb3NpdGlvblsxXV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gLSAxXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSArIDFdLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdIC0gMiwgdGhpcy5wb3NpdGlvblsxXV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0gKyAyLCB0aGlzLnBvc2l0aW9uWzFdXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSAtIDJdLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdICsgMl0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91bnJvdGF0ZSgpO1xuICAgIH1cblxuICAgIF91bnJvdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVt0aGlzLnJvdGF0aW9uQXJyYXkubGVuZ3RoIC0gMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5W3RoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpIC0gMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdHJ5VGV0cm9taW5vUG9zaXRpb24ocG9zaXRpb24sIHBsYXlmaWVsZCkge1xuICAgICAgICBjb25zdCB0bXAgPSBbLi4udGhpcy5wb3NpdGlvbl07XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSA9IHBvc2l0aW9uWzBdO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdID0gcG9zaXRpb25bMV07XG4gICAgICAgIGlmIChwbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcykpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gPSB0bXBbMF07XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzFdID0gdG1wWzFdO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxufVxuIiwiXG5leHBvcnQgY29uc3QgU3F1YXJlID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBMaW5lID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDFdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAxXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBUID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBMID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBSZXZlcnNlTCA9IFtcbiAgICBbXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuXG5leHBvcnQgY29uc3QgUyA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuXG5leHBvcnQgY29uc3QgWiA9IFtcbiAgICBbXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXV0by1iaW5kXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTsiXSwic291cmNlUm9vdCI6IiJ9