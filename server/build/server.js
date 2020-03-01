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
    this.ready = true;
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
            Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])("gameOver", "GAME_FINISHED", this.socketID);
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
      Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])("score", this.score, this.socketID);
      Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])("clearedLines", this.totalClearedLines, this.socketID);
    }
  }, {
    key: "newTetromino",
    value: function newTetromino() {
      this.currentTetromino = this.nextTetromino;
      this.nextTetrominoIndex++;
      if (!this.session.tetrominos[this.nextTetrominoIndex]) this.session.newTetromino();
      this.nextTetromino = Object(_tetris__WEBPACK_IMPORTED_MODULE_1__["copyTetromino"])(this.session.tetrominos[this.nextTetrominoIndex]);
      Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])("nextTetromino", this.nextTetromino, this.socketID);
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
app.use(express["static"](path.join(__dirname, "../../client/build")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});
server.listen(port);
var interval = 300;
io.on("connection", function (client) {
  console.log("\nConnection happened.");
  client.on("Hash", function (string) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["joinTetris"])(string, client.id);
  });
  client.on("ArrowUp", function (usernameAndRoom) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["rotateCurrentTetromino"])(usernameAndRoom);
  });
  client.on("ArrowDown", function (usernameAndRoom) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["setGameInterval"])(usernameAndRoom, 50);
  });
  client.on("ArrowDownUnpressed", function (usernameAndRoom) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["setGameInterval"])(usernameAndRoom, 300);
  });
  client.on("ArrowLeft", function (usernameAndRoom) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["moveLeft"])(usernameAndRoom);
  });
  client.on("ArrowRight", function (usernameAndRoom) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["moveRight"])(usernameAndRoom);
  });
  client.on("startGame", function (clientData) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["startGame"])(clientData, client.id);
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
/*! exports provided: defaultColor, disabledColor, createPlayfield, emitEvents, emitPlayfield, emitTetromino, copyTetromino, setGameInterval, moveLeft, moveRight, rotateCurrentTetromino, parseUsername, joinTetris, startGame */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startGame", function() { return startGame; });
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

var defaultColor = "gray";
var disabledColor = "pink";
function createPlayfield() {
  return _toConsumableArray(new Array(20)).map(function () {
    return _toConsumableArray(new Array(10)).map(function () {
      return defaultColor;
    });
  });
}
function emitEvents(thisPlayer) {
  Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])("playfield", thisPlayer.playfield.playfield, thisPlayer.socketID);
}
function emitPlayfield(thisPlayer) {
  thisPlayer.currentTetromino.eraseTetromino(thisPlayer.playfield.playfield);
  Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])("playfield", thisPlayer.playfield.playfield, thisPlayer.socketID);
  thisPlayer.currentTetromino.drawTetromino(thisPlayer.playfield.playfield);
}
function emitTetromino(thisPlayer) {
  Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])("tetromino", thisPlayer.currentTetromino, thisPlayer.socketID);
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

var tetrominos = [new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Line"][0], "cyan", [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Line"]), new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["L"][0], "orange", [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["L"]), new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["ReverseL"][0], "blue", [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["ReverseL"]), new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Square"][0], "yellow", [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Square"]), new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["S"][0], "green", [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["S"]), new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["Z"][0], "red", [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["Z"]), new _tetromino__WEBPACK_IMPORTED_MODULE_1__["default"](_tetrominos__WEBPACK_IMPORTED_MODULE_3__["T"][0], "purple", [5, -2], _tetrominos__WEBPACK_IMPORTED_MODULE_3__["T"])];

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
  var split = hash.split("[");
  var room = split[0].slice(1);
  var username = parseUsername(split);
  console.log("joinTetris() called");
  console.log("User \"".concat(username, "\" tried to connect to room: \"").concat(room, "\""));
  getUser(room, username, socketID);
}

function readyCheck(session) {
  return session.players.some(function (user) {
    return user.ready;
  });
}

function startGameForAllUsers(session, socketID) {
  session.players.map(function (user) {
    setTimeout(function () {
      if (user) user.play();
    }, _server__WEBPACK_IMPORTED_MODULE_0__["interval"]);
  });
  Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])("gameStarted", "GAME_STARTED", socketID);
}

function startGame(clientData, socketID) {
  var session = findGameSession(clientData.room);
  console.log("Function returns: ", readyCheck(session));
  if (readyCheck(session) === false) return;else startGameForAllUsers(session, socketID);
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
              playfield[this.position[1] + row][this.position[0] + column] = "gray";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGxheWVyLmpzIiwid2VicGFjazovLy8uL3BsYXlmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGV0cmlzLmpzIiwid2VicGFjazovLy8uL3RldHJvbWluby5qcyIsIndlYnBhY2s6Ly8vLi90ZXRyb21pbm9zLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF1dG8tYmluZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIl0sIm5hbWVzIjpbImF1dG9CaW5kIiwicmVxdWlyZSIsIlBsYXllciIsInNlc3Npb24iLCJwbGF5ZmllbGQiLCJQbGF5ZmllbGQiLCJjcmVhdGVQbGF5ZmllbGQiLCJuYW1lIiwiY3VycmVudFRldHJvbWlubyIsIm5leHRUZXRyb21pbm8iLCJuZXh0VGV0cm9taW5vSW5kZXgiLCJzb2NrZXRJRCIsInRldHJvbWlub3MiLCJpbnRlcnZhbCIsImdhbWVPdmVyIiwic2NvcmUiLCJ0b3RhbENsZWFyZWRMaW5lcyIsInJlYWR5IiwiZXJhc2VUZXRyb21pbm8iLCJwb3NpdGlvbiIsImNvbGxpc2lvbkRldGVjdGVkIiwiZHJhd1RldHJvbWlubyIsImVtaXQiLCJjbGVhcmVkTGluZXMiLCJjbGVhckZpbGxlZExpbmVzIiwiaSIsImRpc2FibGVMaW5lcyIsImluY3JlYXNlU2NvcmUiLCJuZXdUZXRyb21pbm8iLCJlbWl0UGxheWZpZWxkIiwiZW1pdFRldHJvbWlubyIsInNldFRpbWVvdXQiLCJwbGF5IiwiY29weVRldHJvbWlubyIsInJvdGF0ZSIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0Iiwicm93IiwibGVuZ3RoIiwiY29sdW1uIiwiZGlzYWJsZWRDb2xvciIsInNoYXBlIiwiZGVmYXVsdENvbG9yIiwibGluZSIsInNvbWUiLCJjZWxsIiwiY3VycmVudExpbmVJbmRleCIsImxhc3RDbGVhcmFibGVMaW5lSW5kZXgiLCJsaW5lSXNGaWxsZWQiLCJjbGVhckxpbmUiLCJjb2xsYXBzZUxpbmVzIiwiZXhwcmVzcyIsImFwcCIsInNlcnZlciIsIlNlcnZlciIsImlvIiwicGF0aCIsInBvcnQiLCJ1c2UiLCJqb2luIiwiX19kaXJuYW1lIiwiZ2V0IiwicmVxIiwicmVzIiwic2VuZEZpbGUiLCJsaXN0ZW4iLCJvbiIsImNsaWVudCIsImNvbnNvbGUiLCJsb2ciLCJzdHJpbmciLCJqb2luVGV0cmlzIiwiaWQiLCJ1c2VybmFtZUFuZFJvb20iLCJyb3RhdGVDdXJyZW50VGV0cm9taW5vIiwic2V0R2FtZUludGVydmFsIiwiY2xpZW50RGF0YSIsInN0YXJ0R2FtZSIsImV2ZW50IiwiYXJncyIsInRvIiwiY2FsbGJhY2siLCJBcnJheSIsIm1hcCIsImVtaXRFdmVudHMiLCJ0aGlzUGxheWVyIiwiZW1pdFNlc3Npb24iLCJpbml0aWFsUGFja2FnZSIsIkdhbWVTZXNzaW9uIiwicm9vbSIsImhvc3QiLCJnYW1lU3RhdGUiLCJwbGF5ZXJzIiwiY3JlYXRlVGV0cm9taW5vIiwicHVzaCIsInVzZXIiLCJmb3JFYWNoIiwiZWxlbWVudCIsImRpc2FibGVMaW5lIiwiVGV0cm9taW5vIiwiTGluZSIsIkwiLCJSZXZlcnNlTCIsIlNxdWFyZSIsIlMiLCJaIiwiVCIsImluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwic2Vzc2lvbnMiLCJmaW5kR2FtZVNlc3Npb24iLCJmaW5kIiwiZmluZFVzZXJJblNlc3Npb24iLCJ1c2VybmFtZSIsInRldHJvbWlubyIsImNvbG9yIiwicm90YXRpb25BcnJheSIsImNyZWF0ZVBsYXllciIsInBsYXllciIsImNyZWF0ZUdhbWVTZXNzaW9uIiwiZ2FtZUludGVydmFsIiwiZ2V0VXNlciIsInBhcnNlVXNlcm5hbWUiLCJzcGxpdCIsInNsaWNlIiwidW5kZWZpbmVkIiwiaGFzaCIsInJlYWR5Q2hlY2siLCJzdGFydEdhbWVGb3JBbGxVc2VycyIsImluZGV4T2YiLCJfd2FsbEtpY2siLCJfdHJ5VGV0cm9taW5vUG9zaXRpb24iLCJfdW5yb3RhdGUiLCJ0bXAiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBT0E7O0FBQ0EsSUFBTUEsUUFBUSxHQUFHQyxtQkFBTyxDQUFDLDRCQUFELENBQXhCOztJQUVxQkMsTTs7O0FBQ2pCLG9CQUFjO0FBQUE7O0FBQ1ZGLFlBQVEsQ0FBQyxJQUFELENBQVI7QUFDQSxTQUFLRyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsSUFBSUMsa0RBQUosQ0FBY0MsK0RBQWUsRUFBN0IsQ0FBakI7QUFDQSxTQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNBLFNBQUtDLGdCQUFMLEdBQXdCLElB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LENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQURKLEVBRUksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBRkosRUFHSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FISixFQUlJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUpKLENBbkJhLENBQVYsQzs7Ozs7Ozs7Ozs7QUNoSlAsc0M7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsc0MiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2VydmVyLmpzXCIpO1xuIiwiaW1wb3J0IHsgZW1pdCB9IGZyb20gXCIuL3NlcnZlclwiO1xuaW1wb3J0IHtcbiAgICBjb3B5VGV0cm9taW5vLFxuICAgIGNyZWF0ZVBsYXlmaWVsZCxcbiAgICBkaXNhYmxlZENvbG9yLFxuICAgIGVtaXRQbGF5ZmllbGQsXG4gICAgZW1pdFRldHJvbWlub1xufSBmcm9tIFwiLi90ZXRyaXNcIjtcbmltcG9ydCBQbGF5ZmllbGQgZnJvbSBcIi4vcGxheWZpZWxkXCI7XG5jb25zdCBhdXRvQmluZCA9IHJlcXVpcmUoXCJhdXRvLWJpbmRcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNlc3Npb24gPSBudWxsO1xuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IG5ldyBQbGF5ZmllbGQoY3JlYXRlUGxheWZpZWxkKCkpO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8gPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm8gPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm9JbmRleCA9IDA7XG4gICAgICAgIHRoaXMuc29ja2V0SUQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDMwMDtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy50b3RhbENsZWFyZWRMaW5lcyA9IDA7XG4gICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUZXRyb21pbm8pIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5lcmFzZVRldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICs9IDE7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcy5jdXJyZW50VGV0cm9taW5vKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSAtPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5kcmF3VGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGVtaXQoXCJnYW1lT3ZlclwiLCBcIkdBTUVfRklOSVNIRURcIiwgdGhpcy5zb2NrZXRJRCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGNsZWFyZWRMaW5lcyA9IHRoaXMucGxheWZpZWxkLmNsZWFyRmlsbGVkTGluZXMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWlub1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGVhcmVkTGluZXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlc3Npb24uZGlzYWJsZUxpbmVzKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmluY3JlYXNlU2NvcmUoY2xlYXJlZExpbmVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1RldHJvbWlubygpO1xuICAgICAgICAgICAgICAgIGVtaXRQbGF5ZmllbGQodGhpcyk7XG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5wbGF5LCB0aGlzLmludGVydmFsKTtcbiAgICB9XG5cbiAgICBpbmNyZWFzZVNjb3JlKGNsZWFyZWRMaW5lcykge1xuICAgICAgICB0aGlzLnRvdGFsQ2xlYXJlZExpbmVzICs9IGNsZWFyZWRMaW5lcztcbiAgICAgICAgdGhpcy5zY29yZSArPSBjbGVhcmVkTGluZXMgKiAoMTAgKyAoY2xlYXJlZExpbmVzIC0gMSkpO1xuICAgICAgICBlbWl0KFwic2NvcmVcIiwgdGhpcy5zY29yZSwgdGhpcy5zb2NrZXRJRCk7XG4gICAgICAgIGVtaXQoXCJjbGVhcmVkTGluZXNcIiwgdGhpcy50b3RhbENsZWFyZWRMaW5lcywgdGhpcy5zb2NrZXRJRCk7XG4gICAgfVxuXG4gICAgbmV3VGV0cm9taW5vKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8gPSB0aGlzLm5leHRUZXRyb21pbm87XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlub0luZGV4Kys7XG4gICAgICAgIGlmICghdGhpcy5zZXNzaW9uLnRldHJvbWlub3NbdGhpcy5uZXh0VGV0cm9taW5vSW5kZXhdKVxuICAgICAgICAgICAgdGhpcy5zZXNzaW9uLm5ld1RldHJvbWlubygpO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm8gPSBjb3B5VGV0cm9taW5vKFxuICAgICAgICAgICAgdGhpcy5zZXNzaW9uLnRldHJvbWlub3NbdGhpcy5uZXh0VGV0cm9taW5vSW5kZXhdXG4gICAgICAgICk7XG4gICAgICAgIGVtaXQoXCJuZXh0VGV0cm9taW5vXCIsIHRoaXMubmV4dFRldHJvbWlubywgdGhpcy5zb2NrZXRJRCk7XG4gICAgfVxuXG4gICAgcm90YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lT3ZlcikgcmV0dXJuO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucm90YXRlKHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdFRldHJvbWlubyh0aGlzKTtcbiAgICB9XG5cbiAgICBtb3ZlTGVmdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU92ZXIpIHJldHVybjtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLm1vdmVMZWZ0KHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdFRldHJvbWlubyh0aGlzKTtcbiAgICB9XG5cbiAgICBtb3ZlUmlnaHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVPdmVyKSByZXR1cm47XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5tb3ZlUmlnaHQodGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgIH1cblxuICAgIGRpc2FibGVMaW5lKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5wbGF5ZmllbGQucGxheWZpZWxkLmxlbmd0aCAtIDE7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGRbcm93XVtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uXG4gICAgICAgICAgICAgICAgXSA9IHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZFtyb3cgKyAxXVtjb2x1bW5dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQucGxheWZpZWxkW3RoaXMucGxheWZpZWxkLnBsYXlmaWVsZC5sZW5ndGggLSAxXVtcbiAgICAgICAgICAgICAgICBjb2x1bW5cbiAgICAgICAgICAgIF0gPSBkaXNhYmxlZENvbG9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSAtPSAxO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0UGxheWZpZWxkKHRoaXMpO1xuICAgIH1cbn1cbiIsImltcG9ydCBhdXRvQmluZCBmcm9tIFwiYXV0by1iaW5kXCI7XG5pbXBvcnQgeyBkZWZhdWx0Q29sb3IsIGRpc2FibGVkQ29sb3IgfSBmcm9tIFwiLi90ZXRyaXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWZpZWxkIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZmllbGQpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gcGxheWZpZWxkO1xuICAgIH1cblxuICAgIGNvbGxpc2lvbkRldGVjdGVkKGN1cnJlbnRUZXRyb21pbm8pIHtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChjb2x1bW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXRyb21pbm8uc2hhcGVbcm93XVtjb2x1bW5dKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLmxlbmd0aCAtIDEgPFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3cgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkWzBdLmxlbmd0aCAtIDEgPFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMF0gKyBjb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uIDwgMCkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3ddW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uXSAhPT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdENvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdyArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsaW5lSXNGaWxsZWQobGluZSkge1xuICAgICAgICByZXR1cm4gIWxpbmUuc29tZShcbiAgICAgICAgICAgIGNlbGwgPT4gY2VsbCA9PT0gZGVmYXVsdENvbG9yIHx8IGNlbGwgPT09IGRpc2FibGVkQ29sb3JcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjbGVhckxpbmUobGluZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpbmVbaV0gPSBkZWZhdWx0Q29sb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2xsYXBzZUxpbmVzKGkpIHtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gaTsgcm93ID4gMDsgcm93LS0pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkW3Jvd11bY29sdW1uXSA9IHRoaXMucGxheWZpZWxkW3JvdyAtIDFdW2NvbHVtbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckZpbGxlZExpbmVzKGN1cnJlbnRUZXRyb21pbm8pIHtcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lSW5kZXggPSBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdO1xuICAgICAgICBjb25zdCBsYXN0Q2xlYXJhYmxlTGluZUluZGV4ID0gY3VycmVudExpbmVJbmRleCArIDQ7XG4gICAgICAgIGxldCBjbGVhcmVkTGluZXMgPSAwO1xuXG4gICAgICAgIHdoaWxlIChjdXJyZW50TGluZUluZGV4IDwgbGFzdENsZWFyYWJsZUxpbmVJbmRleCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkW2N1cnJlbnRMaW5lSW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGluZUlzRmlsbGVkKHRoaXMucGxheWZpZWxkW2N1cnJlbnRMaW5lSW5kZXhdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyTGluZSh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VMaW5lcyhjdXJyZW50TGluZUluZGV4LCB0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyZWRMaW5lcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRMaW5lSW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xlYXJlZExpbmVzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgam9pblRldHJpcyxcbiAgICBtb3ZlTGVmdCxcbiAgICBtb3ZlUmlnaHQsXG4gICAgcm90YXRlQ3VycmVudFRldHJvbWlubyxcbiAgICBzZXRHYW1lSW50ZXJ2YWwsIHN0YXJ0R2FtZVxufSBmcm9tIFwiLi90ZXRyaXNcIjtcblxuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3Qgc2VydmVyID0gcmVxdWlyZShcImh0dHBcIikuU2VydmVyKGFwcCk7XG5jb25zdCBpbyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIikoc2VydmVyKTtcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5jb25zdCBwb3J0ID0gODA4MDtcblxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uL2NsaWVudC9idWlsZFwiKSkpO1xuYXBwLmdldChcIi9cIiwgZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi9jbGllbnQvYnVpbGRcIiwgXCJpbmRleC5odG1sXCIpKTtcbn0pO1xuXG5zZXJ2ZXIubGlzdGVuKHBvcnQpO1xuXG5leHBvcnQgbGV0IGludGVydmFsID0gMzAwO1xuXG5pby5vbihcImNvbm5lY3Rpb25cIiwgY2xpZW50ID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIlxcbkNvbm5lY3Rpb24gaGFwcGVuZWQuXCIpO1xuICAgIGNsaWVudC5vbihcIkhhc2hcIiwgZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICAgIGpvaW5UZXRyaXMoc3RyaW5nLCBjbGllbnQuaWQpO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbihcIkFycm93VXBcIiwgdXNlcm5hbWVBbmRSb29tID0+IHtcbiAgICAgICAgcm90YXRlQ3VycmVudFRldHJvbWlubyh1c2VybmFtZUFuZFJvb20pO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbihcIkFycm93RG93blwiLCB1c2VybmFtZUFuZFJvb20gPT4ge1xuICAgICAgICBzZXRHYW1lSW50ZXJ2YWwodXNlcm5hbWVBbmRSb29tLCA1MCk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKFwiQXJyb3dEb3duVW5wcmVzc2VkXCIsIHVzZXJuYW1lQW5kUm9vbSA9PiB7XG4gICAgICAgIHNldEdhbWVJbnRlcnZhbCh1c2VybmFtZUFuZFJvb20sIDMwMCk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKFwiQXJyb3dMZWZ0XCIsIHVzZXJuYW1lQW5kUm9vbSA9PiB7XG4gICAgICAgIG1vdmVMZWZ0KHVzZXJuYW1lQW5kUm9vbSk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKFwiQXJyb3dSaWdodFwiLCB1c2VybmFtZUFuZFJvb20gPT4ge1xuICAgICAgICBtb3ZlUmlnaHQodXNlcm5hbWVBbmRSb29tKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oXCJzdGFydEdhbWVcIiwgY2xpZW50RGF0YSA9PiB7XG4gICAgICAgc3RhcnRHYW1lKGNsaWVudERhdGEsIGNsaWVudC5pZCk7XG4gICAgfSk7XG59KTtcblxuZXhwb3J0IGNvbnN0IGVtaXQgPSAoZXZlbnQsIGFyZ3MsIHNvY2tldElEKSA9PiB7XG4gICAgaW8udG8oYCR7c29ja2V0SUR9YCkuZW1pdChldmVudCwgYXJncyk7XG59O1xuXG5jb25zdCBvbiA9IChldmVudCwgY2FsbGJhY2ssIGVtaXQpID0+IHt9O1xuIiwiaW1wb3J0IHsgZW1pdCwgaW50ZXJ2YWwgfSBmcm9tIFwiLi9zZXJ2ZXJcIjtcbmltcG9ydCBUZXRyb21pbm8gZnJvbSBcIi4vdGV0cm9taW5vXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgTCwgTGluZSwgUmV2ZXJzZUwsIFMsIFNxdWFyZSwgVCwgWiB9IGZyb20gXCIuL3RldHJvbWlub3NcIjtcblxuY29uc3QgYXV0b0JpbmQgPSByZXF1aXJlKFwiYXV0by1iaW5kXCIpO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdENvbG9yID0gXCJncmF5XCI7XG5leHBvcnQgY29uc3QgZGlzYWJsZWRDb2xvciA9IFwicGlua1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWZpZWxkKCkge1xuICAgIHJldHVybiBbLi4ubmV3IEFycmF5KDIwKV0ubWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIFsuLi5uZXcgQXJyYXkoMTApXS5tYXAoKCkgPT4gZGVmYXVsdENvbG9yKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRFdmVudHModGhpc1BsYXllcikge1xuICAgIGVtaXQoXCJwbGF5ZmllbGRcIiwgdGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzUGxheWVyLnNvY2tldElEKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRQbGF5ZmllbGQodGhpc1BsYXllcikge1xuICAgIHRoaXNQbGF5ZXIuY3VycmVudFRldHJvbWluby5lcmFzZVRldHJvbWlubyh0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgIGVtaXQoXCJwbGF5ZmllbGRcIiwgdGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzUGxheWVyLnNvY2tldElEKTtcbiAgICB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1pdFRldHJvbWlubyh0aGlzUGxheWVyKSB7XG4gICAgZW1pdChcInRldHJvbWlub1wiLCB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8sIHRoaXNQbGF5ZXIuc29ja2V0SUQpO1xufVxuXG5mdW5jdGlvbiBlbWl0U2Vzc2lvbih0aGlzUGxheWVyKSB7fVxuXG5mdW5jdGlvbiBpbml0aWFsUGFja2FnZSh0aGlzUGxheWVyKSB7XG4gICAgZW1pdFBsYXlmaWVsZCh0aGlzUGxheWVyKTtcbiAgICBlbWl0VGV0cm9taW5vKHRoaXNQbGF5ZXIpO1xufVxuXG5jbGFzcyBHYW1lU2Vzc2lvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJvb20gPSBcIlwiO1xuICAgICAgICB0aGlzLmhvc3QgPSBcIlwiO1xuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IFwiU1RBUlRJTkdfU0NSRUVOXCI7XG4gICAgICAgIHRoaXMucGxheWVycyA9IEFycmF5KCk7XG4gICAgICAgIHRoaXMudGV0cm9taW5vcyA9IEFycmF5KGNyZWF0ZVRldHJvbWlubygpLCBjcmVhdGVUZXRyb21pbm8oKSk7XG4gICAgfVxuXG4gICAgbmV3VGV0cm9taW5vKCkge1xuICAgICAgICB0aGlzLnRldHJvbWlub3MucHVzaChjcmVhdGVUZXRyb21pbm8oKSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZUxpbmVzKHVzZXIpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdXNlcikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzYWJsZUxpbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jb25zdCB0ZXRyb21pbm9zID0gW1xuICAgIG5ldyBUZXRyb21pbm8oTGluZVswXSwgXCJjeWFuXCIsIFs1LCAtMl0sIExpbmUpLFxuICAgIG5ldyBUZXRyb21pbm8oTFswXSwgXCJvcmFuZ2VcIiwgWzUsIC0yXSwgTCksXG4gICAgbmV3IFRldHJvbWlubyhSZXZlcnNlTFswXSwgXCJibHVlXCIsIFs1LCAtMl0sIFJldmVyc2VMKSxcbiAgICBuZXcgVGV0cm9taW5vKFNxdWFyZVswXSwgXCJ5ZWxsb3dcIiwgWzUsIC0yXSwgU3F1YXJlKSxcbiAgICBuZXcgVGV0cm9taW5vKFNbMF0sIFwiZ3JlZW5cIiwgWzUsIC0yXSwgUyksXG4gICAgbmV3IFRldHJvbWlubyhaWzBdLCBcInJlZFwiLCBbNSwgLTJdLCBaKSxcbiAgICBuZXcgVGV0cm9taW5vKFRbMF0sIFwicHVycGxlXCIsIFs1LCAtMl0sIFQpXG5dO1xuXG5mdW5jdGlvbiBjcmVhdGVUZXRyb21pbm8oKSB7XG4gICAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0ZXRyb21pbm9zLmxlbmd0aCk7XG5cbiAgICByZXR1cm4gdGV0cm9taW5vc1tpbmRleF07XG59XG5cbmNvbnN0IHNlc3Npb25zID0gQXJyYXkoKTtcblxuZnVuY3Rpb24gZmluZEdhbWVTZXNzaW9uKHJvb20pIHtcbiAgICByZXR1cm4gc2Vzc2lvbnMuZmluZChlbGVtZW50ID0+IGVsZW1lbnQucm9vbSA9PT0gcm9vbSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRVc2VySW5TZXNzaW9uKHJvb20sIHVzZXJuYW1lKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGZpbmRHYW1lU2Vzc2lvbihyb29tKTtcbiAgICBpZiAoIXNlc3Npb24pIHJldHVybjtcblxuICAgIHJldHVybiBzZXNzaW9uLnBsYXllcnMuZmluZCh1c2VyID0+IHVzZXIubmFtZSA9PT0gdXNlcm5hbWUpO1xufVxuXG5leHBvcnQgY29uc3QgY29weVRldHJvbWlubyA9IHRldHJvbWlubyA9PiB7XG4gICAgcmV0dXJuIG5ldyBUZXRyb21pbm8oXG4gICAgICAgIHRldHJvbWluby5zaGFwZSxcbiAgICAgICAgdGV0cm9taW5vLmNvbG9yLFxuICAgICAgICBbMCwgLTFdLFxuICAgICAgICB0ZXRyb21pbm8ucm90YXRpb25BcnJheVxuICAgICk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXIoc2Vzc2lvbiwgbmFtZSwgc29ja2V0SUQpIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gICAgcGxheWVyLnNlc3Npb24gPSBzZXNzaW9uO1xuICAgIHBsYXllci5uYW1lID0gbmFtZTtcbiAgICBwbGF5ZXIuc29ja2V0SUQgPSBzb2NrZXRJRDtcbiAgICBzZXNzaW9uLnBsYXllcnMucHVzaChwbGF5ZXIpO1xuICAgIHBsYXllci5jdXJyZW50VGV0cm9taW5vID0gY29weVRldHJvbWlubyhzZXNzaW9uLnRldHJvbWlub3NbMF0pO1xuICAgIHBsYXllci5uZXh0VGV0cm9taW5vID0gY29weVRldHJvbWlubyhzZXNzaW9uLnRldHJvbWlub3NbMV0pO1xuICAgIHJldHVybiBwbGF5ZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdhbWVTZXNzaW9uKHJvb20sIGhvc3QpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gbmV3IEdhbWVTZXNzaW9uKCk7XG4gICAgc2Vzc2lvbi5yb29tID0gcm9vbTtcbiAgICBzZXNzaW9uLmhvc3QgPSBob3N0O1xuXG4gICAgc2Vzc2lvbnMucHVzaChzZXNzaW9uKTtcblxuICAgIHJldHVybiBzZXNzaW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0R2FtZUludGVydmFsKHVzZXJuYW1lQW5kUm9vbSwgZ2FtZUludGVydmFsKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5pbnRlcnZhbCA9IGdhbWVJbnRlcnZhbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVMZWZ0KHVzZXJuYW1lQW5kUm9vbSkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIubW92ZUxlZnQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1vdmVSaWdodCh1c2VybmFtZUFuZFJvb20pIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XG4gICAgcGxheWVyLm1vdmVSaWdodCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm90YXRlQ3VycmVudFRldHJvbWlubyh1c2VybmFtZUFuZFJvb20pIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XG4gICAgcGxheWVyLnJvdGF0ZSgpO1xufVxuXG5mdW5jdGlvbiBnZXRVc2VyKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCkge1xuICAgIGNvbnN0IHNlc3Npb24gPVxuICAgICAgICBmaW5kR2FtZVNlc3Npb24ocm9vbSkgfHwgY3JlYXRlR2FtZVNlc3Npb24ocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKTtcblxuICAgIGNvbnN0IHVzZXIgPSBmaW5kVXNlckluU2Vzc2lvbihyb29tLCB1c2VybmFtZSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFVzZXIgXCIke3VzZXJuYW1lfVwiIG5vdCBmb3VuZCBpbiBzZXNzaW9uLCBhZGRpbmcuLi5gKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBsYXllcihzZXNzaW9uLCB1c2VybmFtZSwgc29ja2V0SUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiBpcyBhbHJlYWR5IGluIHNlc3Npb24uYCk7XG4gICAgICAgIHVzZXIuc29ja2V0SUQgPSBzb2NrZXRJRDtcbiAgICAgICAgaW5pdGlhbFBhY2thZ2UodXNlcik7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVc2VybmFtZShzcGxpdCkge1xuICAgIHJldHVybiBzcGxpdFsxXSA/IHNwbGl0WzFdLnNsaWNlKDAsIHNwbGl0WzFdLmxlbmd0aCAtIDEpIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gam9pblRldHJpcyhoYXNoLCBzb2NrZXRJRCkge1xuICAgIGNvbnN0IHNwbGl0ID0gaGFzaC5zcGxpdChcIltcIik7XG4gICAgY29uc3Qgcm9vbSA9IHNwbGl0WzBdLnNsaWNlKDEpO1xuICAgIGNvbnN0IHVzZXJuYW1lID0gcGFyc2VVc2VybmFtZShzcGxpdCk7XG5cbiAgICBjb25zb2xlLmxvZyhcImpvaW5UZXRyaXMoKSBjYWxsZWRcIik7XG4gICAgY29uc29sZS5sb2coYFVzZXIgXCIke3VzZXJuYW1lfVwiIHRyaWVkIHRvIGNvbm5lY3QgdG8gcm9vbTogXCIke3Jvb219XCJgKTtcbiAgICBnZXRVc2VyKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCk7XG59XG5cbmZ1bmN0aW9uIHJlYWR5Q2hlY2soc2Vzc2lvbikge1xuICAgIHJldHVybiBzZXNzaW9uLnBsYXllcnMuc29tZSh1c2VyID0+ICB1c2VyLnJlYWR5KTtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lRm9yQWxsVXNlcnMoc2Vzc2lvbiwgc29ja2V0SUQpIHtcbiAgICBzZXNzaW9uLnBsYXllcnMubWFwKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHVzZXIucGxheSgpO1xuICAgICAgICB9LCBpbnRlcnZhbCk7XG4gICAgfSk7XG4gICAgZW1pdChcImdhbWVTdGFydGVkXCIsIFwiR0FNRV9TVEFSVEVEXCIsIHNvY2tldElEKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0R2FtZShjbGllbnREYXRhLCBzb2NrZXRJRCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBmaW5kR2FtZVNlc3Npb24oY2xpZW50RGF0YS5yb29tKTtcbiAgICBjb25zb2xlLmxvZyhcIkZ1bmN0aW9uIHJldHVybnM6IFwiLCByZWFkeUNoZWNrKHNlc3Npb24pKTtcbiAgICBpZiAocmVhZHlDaGVjayhzZXNzaW9uKSA9PT0gZmFsc2UpXG4gICAgICAgIHJldHVybjtcbiAgICBlbHNlXG4gICAgICAgIHN0YXJ0R2FtZUZvckFsbFVzZXJzKHNlc3Npb24sIHNvY2tldElEKTtcbn0iLCJjb25zdCBhdXRvQmluZCA9IHJlcXVpcmUoXCJhdXRvLWJpbmRcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRldHJvbWlubyB7XG4gICAgY29uc3RydWN0b3Ioc2hhcGUsIGNvbG9yLCBwb3NpdGlvbiwgcm90YXRpb25BcnJheSkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBbMywgLTRdO1xuICAgICAgICB0aGlzLnJvdGF0aW9uQXJyYXkgPSByb3RhdGlvbkFycmF5O1xuICAgIH1cblxuICAgIGRyYXdUZXRyb21pbm8ocGxheWZpZWxkKSB7XG4gICAgICAgIGxldCByb3cgPSAwO1xuICAgICAgICB3aGlsZSAocm93IDwgNCkge1xuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgIF0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVbcm93XVtjb2x1bW5dXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgIF0gPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbHVtbiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlcmFzZVRldHJvbWlubyhwbGF5ZmllbGQpIHtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChjb2x1bW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSArIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFwZVtyb3ddW2NvbHVtbl1cbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSArIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgXSA9IFwiZ3JheVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbHVtbiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlTGVmdChwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSAtPSAxO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKSB0aGlzLnBvc2l0aW9uWzBdICs9IDE7XG4gICAgICAgIHRoaXMuZHJhd1RldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBtb3ZlUmlnaHQocGxheWZpZWxkKSB7XG4gICAgICAgIHRoaXMuZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMF0gKz0gMTtcbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSkgdGhpcy5wb3NpdGlvblswXSAtPSAxO1xuICAgICAgICB0aGlzLmRyYXdUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcm90YXRlKHBsYXlmaWVsZCkge1xuICAgICAgICB0aGlzLmVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSA9PT1cbiAgICAgICAgICAgIHRoaXMucm90YXRpb25BcnJheS5sZW5ndGggLSAxXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbXG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgKyAxXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcykpIHRoaXMuX3dhbGxLaWNrKHBsYXlmaWVsZCk7XG4gICAgICAgIHRoaXMuZHJhd1RldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICB9XG5cbiAgICBfd2FsbEtpY2socGxheWZpZWxkKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdIC0gMSwgdGhpcy5wb3NpdGlvblsxXV0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdICsgMSwgdGhpcy5wb3NpdGlvblsxXV0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdIC0gMV0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdICsgMV0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdIC0gMiwgdGhpcy5wb3NpdGlvblsxXV0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdICsgMiwgdGhpcy5wb3NpdGlvblsxXV0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdIC0gMl0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdICsgMl0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Vucm90YXRlKCk7XG4gICAgfVxuXG4gICAgX3Vucm90YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5W3RoaXMucm90YXRpb25BcnJheS5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbXG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgLSAxXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3RyeVRldHJvbWlub1Bvc2l0aW9uKHBvc2l0aW9uLCBwbGF5ZmllbGQpIHtcbiAgICAgICAgY29uc3QgdG1wID0gWy4uLnRoaXMucG9zaXRpb25dO1xuXG4gICAgICAgIHRoaXMucG9zaXRpb25bMF0gPSBwb3NpdGlvblswXTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblsxXSA9IHBvc2l0aW9uWzFdO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdID0gdG1wWzBdO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblsxXSA9IHRtcFsxXTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3QgU3F1YXJlID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXVxuXTtcblxuZXhwb3J0IGNvbnN0IExpbmUgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDFdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXG5dO1xuXG5leHBvcnQgY29uc3QgVCA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1cbl07XG5cbmV4cG9ydCBjb25zdCBMID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXVxuXTtcblxuZXhwb3J0IGNvbnN0IFJldmVyc2VMID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXVxuXTtcblxuZXhwb3J0IGNvbnN0IFMgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXG5dO1xuXG5leHBvcnQgY29uc3QgWiA9IFtcbiAgICBbXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1cbl07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhdXRvLWJpbmRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=