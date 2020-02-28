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
  var username = parseUsername(split);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGxheWVyLmpzIiwid2VicGFjazovLy8uL3BsYXlmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGV0cmlzLmpzIiwid2VicGFjazovLy8uL3RldHJvbWluby5qcyIsIndlYnBhY2s6Ly8vLi90ZXRyb21pbm9zLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF1dG8tYmluZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIl0sIm5hbWVzIjpbImF1dG9CaW5kIiwicmVxdWlyZSIsIlBsYXllciIsInNlc3Npb24iLCJwbGF5ZmllbGQiLCJQbGF5ZmllbGQiLCJjcmVhdGVQbGF5ZmllbGQiLCJuYW1lIiwiY3VycmVudFRldHJvbWlubyIsIm5leHRUZXRyb21pbm8iLCJuZXh0VGV0cm9taW5vSW5kZXgiLCJzb2NrZXRJRCIsInRldHJvbWlub3MiLCJpbnRlcnZhbCIsImdhbWVPdmVyIiwic2NvcmUiLCJ0b3RhbENsZWFyZWRMaW5lcyIsImVyYXNlVGV0cm9taW5vIiwicG9zaXRpb24iLCJjb2xsaXNpb25EZXRlY3RlZCIsImRyYXdUZXRyb21pbm8iLCJlbWl0IiwiY2xlYXJlZExpbmVzIiwiY2xlYXJGaWxsZWRMaW5lcyIsImkiLCJkaXNhYmxlTGluZXMiLCJpbmNyZWFzZVNjb3JlIiwibmV3VGV0cm9taW5vIiwiZW1pdFBsYXlmaWVsZCIsImVtaXRUZXRyb21pbm8iLCJzZXRUaW1lb3V0IiwicGxheSIsImNvcHlUZXRyb21pbm8iLCJyb3RhdGUiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsInJvdyIsImxlbmd0aCIsImNvbHVtbiIsImRpc2FibGVkQ29sb3IiLCJzaGFwZSIsImRlZmF1bHRDb2xvciIsImxpbmUiLCJzb21lIiwiY2VsbCIsImN1cnJlbnRMaW5lSW5kZXgiLCJsYXN0Q2xlYXJhYmxlTGluZUluZGV4IiwibGluZUlzRmlsbGVkIiwiY2xlYXJMaW5lIiwiY29sbGFwc2VMaW5lcyIsImV4cHJlc3MiLCJhcHAiLCJzZXJ2ZXIiLCJTZXJ2ZXIiLCJpbyIsInBhdGgiLCJwb3J0IiwidXNlIiwiam9pbiIsIl9fZGlybmFtZSIsImdldCIsInJlcSIsInJlcyIsInNlbmRGaWxlIiwibGlzdGVuIiwib24iLCJjbGllbnQiLCJjb25zb2xlIiwibG9nIiwic3RyaW5nIiwiam9pblRldHJpcyIsImlkIiwidXNlcm5hbWVBbmRSb29tIiwicm90YXRlQ3VycmVudFRldHJvbWlubyIsInNldEdhbWVJbnRlcnZhbCIsImV2ZW50IiwiYXJncyIsInRvIiwiY2FsbGJhY2siLCJBcnJheSIsIm1hcCIsImVtaXRFdmVudHMiLCJ0aGlzUGxheWVyIiwiZW1pdFNlc3Npb24iLCJpbml0aWFsUGFja2FnZSIsIkdhbWVTZXNzaW9uIiwicm9vbSIsImhvc3QiLCJnYW1lU3RhdGUiLCJwbGF5ZXJzIiwiY3JlYXRlVGV0cm9taW5vIiwicHVzaCIsInVzZXIiLCJmb3JFYWNoIiwiZWxlbWVudCIsImRpc2FibGVMaW5lIiwiVGV0cm9taW5vIiwiTGluZSIsIkwiLCJSZXZlcnNlTCIsIlNxdWFyZSIsIlMiLCJaIiwiVCIsImluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwic2Vzc2lvbnMiLCJmaW5kR2FtZVNlc3Npb24iLCJmaW5kIiwiZmluZFVzZXJJblNlc3Npb24iLCJ1c2VybmFtZSIsInRldHJvbWlubyIsImNvbG9yIiwicm90YXRpb25BcnJheSIsImNyZWF0ZVBsYXllciIsInBsYXllciIsImNyZWF0ZUdhbWVTZXNzaW9uIiwiZ2FtZUludGVydmFsIiwiZ2V0VXNlciIsInBhcnNlVXNlcm5hbWUiLCJzcGxpdCIsInNsaWNlIiwidW5kZWZpbmVkIiwiaGFzaCIsImluZGV4T2YiLCJfd2FsbEtpY2siLCJfdHJ5VGV0cm9taW5vUG9zaXRpb24iLCJfdW5yb3RhdGUiLCJ0bXAiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBTUEsUUFBUSxHQUFHQyxtQkFBTyxDQUFDLDRCQUFELENBQXhCOztJQUVxQkMsTTs7O0FBQ2pCLG9CQUFjO0FBQUE7O0FBQ1ZGLFlBQVEsQ0FBQyxJQUFELENBQVI7QUFDQSxTQUFLRyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsSUFBSUMsa0RBQUosQ0FBY0MsK0RBQWUsRUFBN0IsQ0FBakI7QUFDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLElBQXhCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixJQUFyQjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCLENBQTFCO0FBQ0EsU0FB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LENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FGSixFQUdJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUhKLEVBSUksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBSkosQ0FiYSxFQW1CYixDQUNJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQURKLEVBRUksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBRkosRUFHSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FISixFQUlJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUpKLENBbkJhLENBQVYsQzs7Ozs7Ozs7Ozs7QUMzSVAsc0M7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsc0MiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2VydmVyLmpzXCIpO1xuIiwiaW1wb3J0IHtlbWl0fSBmcm9tIFwiLi9zZXJ2ZXJcIjtcbmltcG9ydCB7Y29weVRldHJvbWlubywgY3JlYXRlUGxheWZpZWxkLCBkaXNhYmxlZENvbG9yLCBlbWl0UGxheWZpZWxkLCBlbWl0VGV0cm9taW5vfSBmcm9tIFwiLi90ZXRyaXNcIjtcbmltcG9ydCBQbGF5ZmllbGQgZnJvbSBcIi4vcGxheWZpZWxkXCI7XG5jb25zdCBhdXRvQmluZCA9IHJlcXVpcmUoJ2F1dG8tYmluZCcpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5wbGF5ZmllbGQgPSBuZXcgUGxheWZpZWxkKGNyZWF0ZVBsYXlmaWVsZCgpKTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJcIjtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnNvY2tldElEID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGV0cm9taW5vcyA9IG51bGw7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSAzMDA7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMudG90YWxDbGVhcmVkTGluZXMgPSAwO1xuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUZXRyb21pbm8pIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5lcmFzZVRldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICs9IDE7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcy5jdXJyZW50VGV0cm9taW5vKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSAtPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5kcmF3VGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGVtaXQoJ2dhbWVPdmVyJywgJ0dBTUVfRklOSVNIRUQnLCB0aGlzLnNvY2tldElEKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGNsZWFyZWRMaW5lcyA9IHRoaXMucGxheWZpZWxkLmNsZWFyRmlsbGVkTGluZXModGhpcy5jdXJyZW50VGV0cm9taW5vKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsZWFyZWRMaW5lczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5kaXNhYmxlTGluZXModGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVhc2VTY29yZShjbGVhcmVkTGluZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3VGV0cm9taW5vKCk7XG4gICAgICAgICAgICAgICAgZW1pdFBsYXlmaWVsZCh0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5kcmF3VGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgICAgIH1cbiAgICAgICAgZW1pdFRldHJvbWlubyh0aGlzKTtcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnBsYXksIHRoaXMuaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGluY3JlYXNlU2NvcmUoY2xlYXJlZExpbmVzKSB7XG4gICAgICAgIHRoaXMudG90YWxDbGVhcmVkTGluZXMgKz0gY2xlYXJlZExpbmVzO1xuICAgICAgICB0aGlzLnNjb3JlICs9IGNsZWFyZWRMaW5lcyAqICgxMCArIChjbGVhcmVkTGluZXMgLSAxKSk7XG4gICAgICAgIGVtaXQoJ3Njb3JlJywgdGhpcy5zY29yZSwgdGhpcy5zb2NrZXRJRCk7XG4gICAgICAgIGVtaXQoJ2NsZWFyZWRMaW5lcycsIHRoaXMudG90YWxDbGVhcmVkTGluZXMsIHRoaXMuc29ja2V0SUQpO1xuICAgIH1cblxuICAgIG5ld1RldHJvbWlubygpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vID0gdGhpcy5uZXh0VGV0cm9taW5vO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm9JbmRleCsrO1xuICAgICAgICBpZiAoIXRoaXMuc2Vzc2lvbi50ZXRyb21pbm9zW3RoaXMubmV4dFRldHJvbWlub0luZGV4XSlcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5uZXdUZXRyb21pbm8oKTtcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vID0gY29weVRldHJvbWlubyh0aGlzLnNlc3Npb24udGV0cm9taW5vc1t0aGlzLm5leHRUZXRyb21pbm9JbmRleF0pO1xuICAgICAgICBlbWl0KCduZXh0VGV0cm9taW5vJywgdGhpcy5uZXh0VGV0cm9taW5vLCB0aGlzLnNvY2tldElEKTtcbiAgICB9XG5cbiAgICByb3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVPdmVyKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucm90YXRlKHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdFRldHJvbWlubyh0aGlzKTtcbiAgICB9XG5cbiAgICBtb3ZlTGVmdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU92ZXIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5tb3ZlTGVmdCh0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgfTtcblxuICAgIG1vdmVSaWdodCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU92ZXIpXG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ubW92ZVJpZ2h0KHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdFRldHJvbWlubyh0aGlzKTtcbiAgICB9O1xuXG4gICAgZGlzYWJsZUxpbmUoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5lcmFzZVRldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQubGVuZ3RoIC0gMTsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZFtyb3ddW2NvbHVtbl0gPSB0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGRbcm93ICsgMV1bY29sdW1uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGRbdGhpcy5wbGF5ZmllbGQucGxheWZpZWxkLmxlbmd0aCAtIDFdW2NvbHVtbl0gPSBkaXNhYmxlZENvbG9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSAtPSAxO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0UGxheWZpZWxkKHRoaXMpO1xuICAgIH1cbn1cbiIsImltcG9ydCBhdXRvQmluZCBmcm9tIFwiYXV0by1iaW5kXCI7XG5pbXBvcnQge2RlZmF1bHRDb2xvciwgZGlzYWJsZWRDb2xvcn0gZnJvbSBcIi4vdGV0cmlzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXlmaWVsZCB7XG4gICAgY29uc3RydWN0b3IocGxheWZpZWxkKSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IHBsYXlmaWVsZDtcbiAgICB9XG5cbiAgICBjb2xsaXNpb25EZXRlY3RlZChjdXJyZW50VGV0cm9taW5vKSB7XG4gICAgICAgIGxldCByb3cgPSAwO1xuICAgICAgICB3aGlsZSAocm93IDwgNCkge1xuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGV0cm9taW5vLnNoYXBlW3Jvd11bY29sdW1uXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGQubGVuZ3RoIC0gMSA8IGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3cgfHwgdGhpcy5wbGF5ZmllbGRbMF0ubGVuZ3RoIC0gMSA8IGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMF0gKyBjb2x1bW4pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMF0gKyBjb2x1bW4gPCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3ddW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMF0gKyBjb2x1bW5dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3ddW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMF0gKyBjb2x1bW5dICE9PSBkZWZhdWx0Q29sb3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbHVtbiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxpbmVJc0ZpbGxlZChsaW5lKSB7XG4gICAgICAgIHJldHVybiAhbGluZS5zb21lKGNlbGwgPT4gY2VsbCA9PT0gZGVmYXVsdENvbG9yIHx8IGNlbGwgPT09IGRpc2FibGVkQ29sb3IpO1xuICAgIH1cblxuICAgIGNsZWFyTGluZShsaW5lKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGluZVtpXSA9IGRlZmF1bHRDb2xvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbGxhcHNlTGluZXMoaSkge1xuICAgICAgICBmb3IgKGxldCByb3cgPSBpOyByb3cgPiAwOyByb3ctLSkge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGRbcm93XVtjb2x1bW5dID0gdGhpcy5wbGF5ZmllbGRbcm93IC0gMV1bY29sdW1uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyRmlsbGVkTGluZXMoY3VycmVudFRldHJvbWlubykge1xuICAgICAgICBsZXQgY3VycmVudExpbmVJbmRleCA9IGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV07XG4gICAgICAgIGNvbnN0IGxhc3RDbGVhcmFibGVMaW5lSW5kZXggPSBjdXJyZW50TGluZUluZGV4ICsgNDtcbiAgICAgICAgbGV0IGNsZWFyZWRMaW5lcyA9IDA7XG5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnRMaW5lSW5kZXggPCBsYXN0Q2xlYXJhYmxlTGluZUluZGV4KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGRbY3VycmVudExpbmVJbmRleF0pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5saW5lSXNGaWxsZWQodGhpcy5wbGF5ZmllbGRbY3VycmVudExpbmVJbmRleF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJMaW5lKHRoaXMucGxheWZpZWxkW2N1cnJlbnRMaW5lSW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUxpbmVzKGN1cnJlbnRMaW5lSW5kZXgsIHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJlZExpbmVzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudExpbmVJbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoY2xlYXJlZExpbmVzKTtcbiAgICB9XG59XG4iLCJpbXBvcnQge2pvaW5UZXRyaXMsIG1vdmVMZWZ0LCBtb3ZlUmlnaHQsIHJvdGF0ZUN1cnJlbnRUZXRyb21pbm8sIHNldEdhbWVJbnRlcnZhbH0gZnJvbSBcIi4vdGV0cmlzXCI7XG5cbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5jb25zdCBzZXJ2ZXIgPSByZXF1aXJlKCdodHRwJykuU2VydmVyKGFwcCk7XG5jb25zdCBpbyA9IHJlcXVpcmUoJ3NvY2tldC5pbycpKHNlcnZlcik7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5cbmNvbnN0IHBvcnQgPSA4MDgwO1xuXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLi9jbGllbnQvYnVpbGQnKSkpO1xuYXBwLmdldCgnLycsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gICAgcmVzLnNlbmRGaWxlKHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLi9jbGllbnQvYnVpbGQnLCAnaW5kZXguaHRtbCcpKTtcbn0pO1xuXG5zZXJ2ZXIubGlzdGVuKHBvcnQpO1xuXG5leHBvcnQgbGV0IGludGVydmFsID0gMzAwO1xuXG5pby5vbignY29ubmVjdGlvbicsIChjbGllbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIlxcbkNvbm5lY3Rpb24gaGFwcGVuZWQuXCIpO1xuICAgIGNsaWVudC5vbignSGFzaCcsIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgam9pblRldHJpcyhzdHJpbmcsIGNsaWVudC5pZCk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKCdBcnJvd1VwJywgKHVzZXJuYW1lQW5kUm9vbSkgPT4ge1xuICAgICAgICByb3RhdGVDdXJyZW50VGV0cm9taW5vKHVzZXJuYW1lQW5kUm9vbSk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKCdBcnJvd0Rvd24nLCAodXNlcm5hbWVBbmRSb29tKSA9PiB7XG4gICAgICAgIHNldEdhbWVJbnRlcnZhbCh1c2VybmFtZUFuZFJvb20sIDUwKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oJ0Fycm93RG93blVucHJlc3NlZCcsICh1c2VybmFtZUFuZFJvb20pID0+IHtcbiAgICAgICAgc2V0R2FtZUludGVydmFsKHVzZXJuYW1lQW5kUm9vbSwgMzAwKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oJ0Fycm93TGVmdCcsICh1c2VybmFtZUFuZFJvb20pID0+IHtcbiAgICAgICAgbW92ZUxlZnQodXNlcm5hbWVBbmRSb29tKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oJ0Fycm93UmlnaHQnLCAodXNlcm5hbWVBbmRSb29tKSA9PiB7XG4gICAgICAgIG1vdmVSaWdodCh1c2VybmFtZUFuZFJvb20pO1xuICAgIH0pXG59KTtcblxuZXhwb3J0IGNvbnN0IGVtaXQgPSAoZXZlbnQsIGFyZ3MsIHNvY2tldElEKSA9PiB7XG4gICAgaW8udG8oYCR7c29ja2V0SUR9YCkuZW1pdChldmVudCwgYXJncyk7XG59O1xuXG5jb25zdCBvbiA9IChldmVudCwgY2FsbGJhY2ssIGVtaXQpID0+IHtcblxufTtcbiIsImltcG9ydCB7ZW1pdCwgaW50ZXJ2YWx9IGZyb20gXCIuL3NlcnZlclwiO1xuaW1wb3J0IFRldHJvbWlubyBmcm9tIFwiLi90ZXRyb21pbm9cIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQge0wsIExpbmUsIFJldmVyc2VMLCBTLCBTcXVhcmUsIFQsIFp9IGZyb20gXCIuL3RldHJvbWlub3NcIjtcblxuY29uc3QgYXV0b0JpbmQgPSByZXF1aXJlKCdhdXRvLWJpbmQnKTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb2xvciA9ICdncmF5JztcbmV4cG9ydCBjb25zdCBkaXNhYmxlZENvbG9yID0gJ3BpbmsnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWZpZWxkKCkge1xuICAgIHJldHVybiBbLi4ubmV3IEFycmF5KDIwKV0ubWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIFsuLi5uZXcgQXJyYXkoMTApXS5tYXAoKCkgPT4gZGVmYXVsdENvbG9yKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRFdmVudHModGhpc1BsYXllcikge1xuICAgIGVtaXQoJ3BsYXlmaWVsZCcsIHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpc1BsYXllci5zb2NrZXRJRCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0UGxheWZpZWxkKHRoaXNQbGF5ZXIpIHtcbiAgICB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICBlbWl0KCdwbGF5ZmllbGQnLCB0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXNQbGF5ZXIuc29ja2V0SUQpO1xuICAgIHRoaXNQbGF5ZXIuY3VycmVudFRldHJvbWluby5kcmF3VGV0cm9taW5vKHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0VGV0cm9taW5vKHRoaXNQbGF5ZXIpIHtcbiAgICBlbWl0KCd0ZXRyb21pbm8nLCB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8sIHRoaXNQbGF5ZXIuc29ja2V0SUQpO1xufVxuXG5mdW5jdGlvbiBlbWl0U2Vzc2lvbih0aGlzUGxheWVyKSB7XG5cbn1cblxuZnVuY3Rpb24gaW5pdGlhbFBhY2thZ2UodGhpc1BsYXllcikge1xuICAgIGVtaXRQbGF5ZmllbGQodGhpc1BsYXllcik7XG4gICAgZW1pdFRldHJvbWlubyh0aGlzUGxheWVyKTtcbn1cblxuY2xhc3MgR2FtZVNlc3Npb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yb29tID0gXCJcIjtcbiAgICAgICAgdGhpcy5ob3N0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBcIlNUQVJUSU5HX1NDUkVFTlwiO1xuICAgICAgICB0aGlzLnBsYXllcnMgPSBBcnJheSgpO1xuICAgICAgICB0aGlzLnRldHJvbWlub3MgPSBBcnJheShjcmVhdGVUZXRyb21pbm8oKSwgY3JlYXRlVGV0cm9taW5vKCkpO1xuICAgIH1cblxuICAgIG5ld1RldHJvbWlubygpIHtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zLnB1c2goY3JlYXRlVGV0cm9taW5vKCkpO1xuICAgIH1cblxuICAgIGRpc2FibGVMaW5lcyh1c2VyKSB7XG4gICAgICAgIHRoaXMucGxheWVycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IHVzZXIpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmRpc2FibGVMaW5lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY29uc3QgdGV0cm9taW5vcyA9IFtuZXcgVGV0cm9taW5vKExpbmVbMF0sICdjeWFuJywgWzUsIC0yXSwgTGluZSksXG4gICAgbmV3IFRldHJvbWlubyhMWzBdLCAnb3JhbmdlJywgWzUsIC0yXSwgTCksXG4gICAgbmV3IFRldHJvbWlubyhSZXZlcnNlTFswXSwgXCJibHVlXCIsIFs1LCAtMl0sIFJldmVyc2VMKSxcbiAgICBuZXcgVGV0cm9taW5vKFNxdWFyZVswXSwgJ3llbGxvdycsIFs1LCAtMl0sIFNxdWFyZSksXG4gICAgbmV3IFRldHJvbWlubyhTWzBdLCAnZ3JlZW4nLCBbNSwgLTJdLCBTKSxcbiAgICBuZXcgVGV0cm9taW5vKFpbMF0sICdyZWQnLCBbNSwgLTJdLCBaKSxcbiAgICBuZXcgVGV0cm9taW5vKFRbMF0sICdwdXJwbGUnLCBbNSwgLTJdLCBUKV07XG5cbmZ1bmN0aW9uIGNyZWF0ZVRldHJvbWlubygpIHtcbiAgICBjb25zdCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRldHJvbWlub3MubGVuZ3RoKTtcblxuICAgIHJldHVybiB0ZXRyb21pbm9zW2luZGV4XTtcbn1cblxuY29uc3Qgc2Vzc2lvbnMgPSBBcnJheSgpO1xuXG5mdW5jdGlvbiBmaW5kR2FtZVNlc3Npb24ocm9vbSkge1xuICAgIHJldHVybiBzZXNzaW9ucy5maW5kKGVsZW1lbnQgPT4gZWxlbWVudC5yb29tID09PSByb29tKTtcbn1cblxuZnVuY3Rpb24gZmluZFVzZXJJblNlc3Npb24ocm9vbSwgdXNlcm5hbWUpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gZmluZEdhbWVTZXNzaW9uKHJvb20pO1xuICAgIGlmICghc2Vzc2lvbilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIHNlc3Npb24ucGxheWVycy5maW5kKHVzZXIgPT4gdXNlci5uYW1lID09PSB1c2VybmFtZSk7XG59XG5cbmV4cG9ydCBjb25zdCBjb3B5VGV0cm9taW5vID0gKHRldHJvbWlubykgPT4ge1xuICAgIHJldHVybiBuZXcgVGV0cm9taW5vKHRldHJvbWluby5zaGFwZSwgdGV0cm9taW5vLmNvbG9yLCBbMCwgLTFdLCB0ZXRyb21pbm8ucm90YXRpb25BcnJheSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXIoc2Vzc2lvbiwgbmFtZSwgc29ja2V0SUQpIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gICAgcGxheWVyLnNlc3Npb24gPSBzZXNzaW9uO1xuICAgIHBsYXllci5uYW1lID0gbmFtZTtcbiAgICBwbGF5ZXIuc29ja2V0SUQgPSBzb2NrZXRJRDtcbiAgICBzZXNzaW9uLnBsYXllcnMucHVzaChwbGF5ZXIpO1xuICAgIHBsYXllci5jdXJyZW50VGV0cm9taW5vID0gY29weVRldHJvbWlubyhzZXNzaW9uLnRldHJvbWlub3NbMF0pO1xuICAgIHBsYXllci5uZXh0VGV0cm9taW5vID0gY29weVRldHJvbWlubyhzZXNzaW9uLnRldHJvbWlub3NbMV0pO1xuICAgIHJldHVybiBwbGF5ZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdhbWVTZXNzaW9uKHJvb20sIGhvc3QpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gbmV3IEdhbWVTZXNzaW9uKCk7XG4gICAgc2Vzc2lvbi5yb29tID0gcm9vbTtcbiAgICBzZXNzaW9uLmhvc3QgPSBob3N0O1xuXG4gICAgc2Vzc2lvbnMucHVzaChzZXNzaW9uKTtcblxuICAgIHJldHVybiBzZXNzaW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R2FtZUludGVydmFsKHVzZXJuYW1lQW5kUm9vbSwgZ2FtZUludGVydmFsKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5pbnRlcnZhbCA9IGdhbWVJbnRlcnZhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVMZWZ0KHVzZXJuYW1lQW5kUm9vbSkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIubW92ZUxlZnQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVSaWdodCh1c2VybmFtZUFuZFJvb20pIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XG4gICAgcGxheWVyLm1vdmVSaWdodCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlQ3VycmVudFRldHJvbWlubyh1c2VybmFtZUFuZFJvb20pIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XG4gICAgcGxheWVyLnJvdGF0ZSgpO1xufVxuXG5mdW5jdGlvbiBnZXRVc2VyKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBmaW5kR2FtZVNlc3Npb24ocm9vbSkgfHwgY3JlYXRlR2FtZVNlc3Npb24ocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKTtcblxuICAgIGNvbnN0IHVzZXIgPSBmaW5kVXNlckluU2Vzc2lvbihyb29tLCB1c2VybmFtZSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFVzZXIgXCIke3VzZXJuYW1lfVwiIG5vdCBmb3VuZCBpbiBzZXNzaW9uLCBhZGRpbmcuLi5gKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBsYXllcihzZXNzaW9uLCB1c2VybmFtZSwgc29ja2V0SUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiBpcyBhbHJlYWR5IGluIHNlc3Npb24uYCk7XG4gICAgICAgIHVzZXIuc29ja2V0SUQgPSBzb2NrZXRJRDtcbiAgICAgICAgaW5pdGlhbFBhY2thZ2UodXNlcik7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVc2VybmFtZShzcGxpdCkge1xuICAgIHJldHVybiBzcGxpdFsxXVxuICAgICAgICA/IHNwbGl0WzFdLnNsaWNlKDAsIHNwbGl0WzFdLmxlbmd0aCAtIDEpXG4gICAgICAgIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gam9pblRldHJpcyhoYXNoLCBzb2NrZXRJRCkge1xuICAgIGNvbnN0IHNwbGl0ID0gaGFzaC5zcGxpdCgnWycpO1xuICAgIGNvbnN0IHJvb20gPSBzcGxpdFswXS5zbGljZSgxKTtcbiAgICBjb25zdCB1c2VybmFtZSA9IHBhcnNlVXNlcm5hbWUoc3BsaXQpO1xuXG4gICAgY29uc29sZS5sb2coXCJqb2luVGV0cmlzKCkgY2FsbGVkXCIpO1xuICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiB0cmllZCB0byBjb25uZWN0IHRvIHJvb206IFwiJHtyb29tfVwiYCk7XG5cbiAgICBjb25zdCB1c2VyID0gZ2V0VXNlcihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodXNlcilcbiAgICAgICAgICAgIHVzZXIucGxheSgpXG4gICAgfSwgaW50ZXJ2YWwpO1xufVxuIiwiXG5jb25zdCBhdXRvQmluZCA9IHJlcXVpcmUoJ2F1dG8tYmluZCcpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXRyb21pbm8ge1xuICAgIGNvbnN0cnVjdG9yKHNoYXBlLCBjb2xvciwgcG9zaXRpb24sIHJvdGF0aW9uQXJyYXkpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBzaGFwZTtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gWzMsIC00XTtcbiAgICAgICAgdGhpcy5yb3RhdGlvbkFycmF5ID0gcm90YXRpb25BcnJheTtcbiAgICB9XG5cbiAgICBkcmF3VGV0cm9taW5vKHBsYXlmaWVsZCkge1xuICAgICAgICBsZXQgcm93ID0gMDtcbiAgICAgICAgd2hpbGUgKHJvdyA8IDQpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA8IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bdGhpcy5wb3NpdGlvblswXSArIGNvbHVtbl0gJiYgdGhpcy5zaGFwZVtyb3ddW2NvbHVtbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVt0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZCkge1xuICAgICAgICBsZXQgcm93ID0gMDtcbiAgICAgICAgd2hpbGUgKHJvdyA8IDQpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA8IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bdGhpcy5wb3NpdGlvblswXSArIGNvbHVtbl0gJiYgdGhpcy5zaGFwZVtyb3ddW2NvbHVtbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVt0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXSA9ICdncmF5JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdyArPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZUxlZnQocGxheWZpZWxkKSB7XG4gICAgICAgIHRoaXMuZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMF0gLT0gMTtcbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSlcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gKz0gMTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgIH07XG5cbiAgICBtb3ZlUmlnaHQocGxheWZpZWxkKSB7XG4gICAgICAgIHRoaXMuZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMF0gKz0gMTtcbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSlcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gLT0gMTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgIH07XG5cbiAgICByb3RhdGUocGxheWZpZWxkKSB7XG4gICAgICAgIHRoaXMuZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSA9PT0gdGhpcy5yb3RhdGlvbkFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5W3RoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpICsgMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSlcbiAgICAgICAgICAgIHRoaXMuX3dhbGxLaWNrKHBsYXlmaWVsZCk7XG4gICAgICAgIHRoaXMuZHJhd1RldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICB9XG5cbiAgICBfd2FsbEtpY2socGxheWZpZWxkKSB7XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSAtIDEsIHRoaXMucG9zaXRpb25bMV1dLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdICsgMSwgdGhpcy5wb3NpdGlvblsxXV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gLSAxXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSArIDFdLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdIC0gMiwgdGhpcy5wb3NpdGlvblsxXV0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oW3RoaXMucG9zaXRpb25bMF0gKyAyLCB0aGlzLnBvc2l0aW9uWzFdXSwgcGxheWZpZWxkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90cnlUZXRyb21pbm9Qb3NpdGlvbihbdGhpcy5wb3NpdGlvblswXSwgdGhpcy5wb3NpdGlvblsxXSAtIDJdLCBwbGF5ZmllbGQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdICsgMl0sIHBsYXlmaWVsZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91bnJvdGF0ZSgpO1xuICAgIH1cblxuICAgIF91bnJvdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpIDwgMSkge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVt0aGlzLnJvdGF0aW9uQXJyYXkubGVuZ3RoIC0gMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5W3RoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpIC0gMV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdHJ5VGV0cm9taW5vUG9zaXRpb24ocG9zaXRpb24sIHBsYXlmaWVsZCkge1xuICAgICAgICBjb25zdCB0bXAgPSBbLi4udGhpcy5wb3NpdGlvbl07XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSA9IHBvc2l0aW9uWzBdO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdID0gcG9zaXRpb25bMV07XG4gICAgICAgIGlmIChwbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcykpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gPSB0bXBbMF07XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzFdID0gdG1wWzFdO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxufVxuIiwiXG5leHBvcnQgY29uc3QgU3F1YXJlID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBMaW5lID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDFdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAxXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBUID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBMID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXV07XG5cbmV4cG9ydCBjb25zdCBSZXZlcnNlTCA9IFtcbiAgICBbXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuXG5leHBvcnQgY29uc3QgUyA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuXG5leHBvcnQgY29uc3QgWiA9IFtcbiAgICBbXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1dO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXV0by1iaW5kXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvY2tldC5pb1wiKTsiXSwic291cmNlUm9vdCI6IiJ9