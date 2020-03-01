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
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["startGame"])(clientData);
  });
  client.on("readyCheck", function (clientData) {
    Object(_tetris__WEBPACK_IMPORTED_MODULE_0__["toggleReady"])(clientData);
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
/*! exports provided: defaultColor, disabledColor, createPlayfield, emitEvents, emitPlayfield, emitTetromino, copyTetromino, setGameInterval, moveLeft, moveRight, rotateCurrentTetromino, parseUsername, joinTetris, startGame, toggleReady */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleReady", function() { return toggleReady; });
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
  emitReadyStates(thisPlayer.session);
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
  return session.players.every(function (user) {
    return user.ready;
  });
}

function startGameForAllUsers(session) {
  session.players.map(function (user) {
    setTimeout(function () {
      if (user) user.play();
    }, _server__WEBPACK_IMPORTED_MODULE_0__["interval"]);
    Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])("gameStarted", "GAME_STARTED", user.socketID);
  });
}

function startGame(clientData) {
  var session = findGameSession(clientData.room);
  console.log("Function returns: ", readyCheck(session));
  if (readyCheck(session) === false) return;else startGameForAllUsers(session);
}

function emitReadyStates(session) {
  session.players.map(function (user) {
    Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])("readyState", user.ready, user.socketID);
  });
}

function toggleReady(clientData) {
  var user = findUserInSession(clientData.room, clientData.username);
  if (user.ready) user.ready = false;else user.ready = true;
  console.log(user.ready);
  var session = findGameSession(clientData.room);
  emitReadyStates(session);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGxheWVyLmpzIiwid2VicGFjazovLy8uL3BsYXlmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGV0cmlzLmpzIiwid2VicGFjazovLy8uL3RldHJvbWluby5qcyIsIndlYnBhY2s6Ly8vLi90ZXRyb21pbm9zLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF1dG8tYmluZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIl0sIm5hbWVzIjpbImF1dG9CaW5kIiwicmVxdWlyZSIsIlBsYXllciIsInNlc3Npb24iLCJwbGF5ZmllbGQiLCJQbGF5ZmllbGQiLCJjcmVhdGVQbGF5ZmllbGQiLCJuYW1lIiwiY3VycmVudFRldHJvbWlubyIsIm5leHRUZXRyb21pbm8iLCJuZXh0VGV0cm9taW5vSW5kZXgiLCJzb2NrZXRJRCIsInRldHJvbWlub3MiLCJpbnRlcnZhbCIsImdhbWVPdmVyIiwic2NvcmUiLCJ0b3RhbENsZWFyZWRMaW5lcyIsInJlYWR5IiwiZXJhc2VUZXRyb21pbm8iLCJwb3NpdGlvbiIsImNvbGxpc2lvbkRldGVjdGVkIiwiZHJhd1RldHJvbWlubyIsImVtaXQiLCJjbGVhcmVkTGluZXMiLCJjbGVhckZpbGxlZExpbmVzIiwiaSIsImRpc2FibGVMaW5lcyIsImluY3JlYXNlU2NvcmUiLCJuZXdUZXRyb21pbm8iLCJlbWl0UGxheWZpZWxkIiwiZW1pdFRldHJvbWlubyIsInNldFRpbWVvdXQiLCJwbGF5IiwiY29weVRldHJvbWlubyIsInJvdGF0ZSIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0Iiwicm93IiwibGVuZ3RoIiwiY29sdW1uIiwiZGlzYWJsZWRDb2xvciIsInNoYXBlIiwiZGVmYXVsdENvbG9yIiwibGluZSIsInNvbWUiLCJjZWxsIiwiY3VycmVudExpbmVJbmRleCIsImxhc3RDbGVhcmFibGVMaW5lSW5kZXgiLCJsaW5lSXNGaWxsZWQiLCJjbGVhckxpbmUiLCJjb2xsYXBzZUxpbmVzIiwiZXhwcmVzcyIsImFwcCIsInNlcnZlciIsIlNlcnZlciIsImlvIiwicGF0aCIsInBvcnQiLCJ1c2UiLCJqb2luIiwiX19kaXJuYW1lIiwiZ2V0IiwicmVxIiwicmVzIiwic2VuZEZpbGUiLCJsaXN0ZW4iLCJvbiIsImNsaWVudCIsImNvbnNvbGUiLCJsb2ciLCJzdHJpbmciLCJqb2luVGV0cmlzIiwiaWQiLCJ1c2VybmFtZUFuZFJvb20iLCJyb3RhdGVDdXJyZW50VGV0cm9taW5vIiwic2V0R2FtZUludGVydmFsIiwiY2xpZW50RGF0YSIsInN0YXJ0R2FtZSIsInRvZ2dsZVJlYWR5IiwiZXZlbnQiLCJhcmdzIiwidG8iLCJjYWxsYmFjayIsIkFycmF5IiwibWFwIiwiZW1pdEV2ZW50cyIsInRoaXNQbGF5ZXIiLCJlbWl0U2Vzc2lvbiIsImluaXRpYWxQYWNrYWdlIiwiZW1pdFJlYWR5U3RhdGVzIiwiR2FtZVNlc3Npb24iLCJyb29tIiwiaG9zdCIsImdhbWVTdGF0ZSIsInBsYXllcnMiLCJjcmVhdGVUZXRyb21pbm8iLCJwdXNoIiwidXNlciIsImZvckVhY2giLCJlbGVtZW50IiwiZGlzYWJsZUxpbmUiLCJUZXRyb21pbm8iLCJMaW5lIiwiTCIsIlJldmVyc2VMIiwiU3F1YXJlIiwiUyIsIloiLCJUIiwiaW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzZXNzaW9ucyIsImZpbmRHYW1lU2Vzc2lvbiIsImZpbmQiLCJmaW5kVXNlckluU2Vzc2lvbiIsInVzZXJuYW1lIiwidGV0cm9taW5vIiwiY29sb3IiLCJyb3RhdGlvbkFycmF5IiwiY3JlYXRlUGxheWVyIiwicGxheWVyIiwiY3JlYXRlR2FtZVNlc3Npb24iLCJnYW1lSW50ZXJ2YWwiLCJnZXRVc2VyIiwicGFyc2VVc2VybmFtZSIsInNwbGl0Iiwic2xpY2UiLCJ1bmRlZmluZWQiLCJoYXNoIiwicmVhZHlDaGVjayIsImV2ZXJ5Iiwic3RhcnRHYW1lRm9yQWxsVXNlcnMiLCJpbmRleE9mIiwiX3dhbGxLaWNrIiwiX3RyeVRldHJvbWlub1Bvc2l0aW9uIiwiX3Vucm90YXRlIiwidG1wIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQU9BOztBQUNBLElBQU1BLFFBQVEsR0FBR0MsbUJBQU8sQ0FBQyw0QkFBRCxDQUF4Qjs7SUFFcUJDLE07OztBQUNqQixvQkFBYztBQUFBOztBQUNWRixZQUFRLENBQUMsSUFBRCxDQUFSO0FBQ0EsU0FBS0csT0FBTCxHQUFlLElBQWY7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLElBQUlDLGtEQUFKLENBQWNDLCtEQUFlLEVBQTdCLENBQWpCO0FBQ0EsU0FBS0Ms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LENBQVYsQ0FGSixFQUdJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUhKLEVBSUksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBSkosQ0FuQmdCLENBQWI7QUEyQkEsSUFBTU0sQ0FBQyxHQUFHLENBQ2IsQ0FDSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FESixFQUVJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUZKLEVBR0ksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBSEosRUFJSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FKSixDQURhLEVBT2IsQ0FDSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FESixFQUVJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUZKLEVBR0ksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBSEosRUFJSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FKSixDQVBhLEVBYWIsQ0FDSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FESixFQUVJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUZKLEVBR0ksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBSEosRUFJSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FKSixDQWJhLEVBbUJiLENBQ0ksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBREosRUFFSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FGSixFQUdJLENBQUMsQ0FBRCxFQUFJ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Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHNDIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NlcnZlci5qc1wiKTtcbiIsImltcG9ydCB7IGVtaXQgfSBmcm9tIFwiLi9zZXJ2ZXJcIjtcbmltcG9ydCB7XG4gICAgY29weVRldHJvbWlubyxcbiAgICBjcmVhdGVQbGF5ZmllbGQsXG4gICAgZGlzYWJsZWRDb2xvcixcbiAgICBlbWl0UGxheWZpZWxkLFxuICAgIGVtaXRUZXRyb21pbm9cbn0gZnJvbSBcIi4vdGV0cmlzXCI7XG5pbXBvcnQgUGxheWZpZWxkIGZyb20gXCIuL3BsYXlmaWVsZFwiO1xuY29uc3QgYXV0b0JpbmQgPSByZXF1aXJlKFwiYXV0by1iaW5kXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy5wbGF5ZmllbGQgPSBuZXcgUGxheWZpZWxkKGNyZWF0ZVBsYXlmaWVsZCgpKTtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJcIjtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnNvY2tldElEID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGV0cm9taW5vcyA9IG51bGw7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSAzMDA7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMudG90YWxDbGVhcmVkTGluZXMgPSAwO1xuICAgICAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VGV0cm9taW5vKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArPSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMuY3VycmVudFRldHJvbWlubykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gLT0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBlbWl0KFwiZ2FtZU92ZXJcIiwgXCJHQU1FX0ZJTklTSEVEXCIsIHRoaXMuc29ja2V0SUQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBjbGVhcmVkTGluZXMgPSB0aGlzLnBsYXlmaWVsZC5jbGVhckZpbGxlZExpbmVzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm9cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xlYXJlZExpbmVzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uLmRpc2FibGVMaW5lcyh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNyZWFzZVNjb3JlKGNsZWFyZWRMaW5lcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdUZXRyb21pbm8oKTtcbiAgICAgICAgICAgICAgICBlbWl0UGxheWZpZWxkKHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMucGxheSwgdGhpcy5pbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgaW5jcmVhc2VTY29yZShjbGVhcmVkTGluZXMpIHtcbiAgICAgICAgdGhpcy50b3RhbENsZWFyZWRMaW5lcyArPSBjbGVhcmVkTGluZXM7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gY2xlYXJlZExpbmVzICogKDEwICsgKGNsZWFyZWRMaW5lcyAtIDEpKTtcbiAgICAgICAgZW1pdChcInNjb3JlXCIsIHRoaXMuc2NvcmUsIHRoaXMuc29ja2V0SUQpO1xuICAgICAgICBlbWl0KFwiY2xlYXJlZExpbmVzXCIsIHRoaXMudG90YWxDbGVhcmVkTGluZXMsIHRoaXMuc29ja2V0SUQpO1xuICAgIH1cblxuICAgIG5ld1RldHJvbWlubygpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vID0gdGhpcy5uZXh0VGV0cm9taW5vO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm9JbmRleCsrO1xuICAgICAgICBpZiAoIXRoaXMuc2Vzc2lvbi50ZXRyb21pbm9zW3RoaXMubmV4dFRldHJvbWlub0luZGV4XSlcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5uZXdUZXRyb21pbm8oKTtcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vID0gY29weVRldHJvbWlubyhcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi50ZXRyb21pbm9zW3RoaXMubmV4dFRldHJvbWlub0luZGV4XVxuICAgICAgICApO1xuICAgICAgICBlbWl0KFwibmV4dFRldHJvbWlub1wiLCB0aGlzLm5leHRUZXRyb21pbm8sIHRoaXMuc29ja2V0SUQpO1xuICAgIH1cblxuICAgIHJvdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU92ZXIpIHJldHVybjtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLnJvdGF0ZSh0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgfVxuXG4gICAgbW92ZUxlZnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVPdmVyKSByZXR1cm47XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5tb3ZlTGVmdCh0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgfVxuXG4gICAgbW92ZVJpZ2h0KCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lT3ZlcikgcmV0dXJuO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ubW92ZVJpZ2h0KHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdFRldHJvbWlubyh0aGlzKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlTGluZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmVyYXNlVGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZC5sZW5ndGggLSAxOyByb3crKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQucGxheWZpZWxkW3Jvd11bXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtblxuICAgICAgICAgICAgICAgIF0gPSB0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGRbcm93ICsgMV1bY29sdW1uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZFt0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQubGVuZ3RoIC0gMV1bXG4gICAgICAgICAgICAgICAgY29sdW1uXG4gICAgICAgICAgICBdID0gZGlzYWJsZWRDb2xvcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gLT0gMTtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdFBsYXlmaWVsZCh0aGlzKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgYXV0b0JpbmQgZnJvbSBcImF1dG8tYmluZFwiO1xuaW1wb3J0IHsgZGVmYXVsdENvbG9yLCBkaXNhYmxlZENvbG9yIH0gZnJvbSBcIi4vdGV0cmlzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXlmaWVsZCB7XG4gICAgY29uc3RydWN0b3IocGxheWZpZWxkKSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IHBsYXlmaWVsZDtcbiAgICB9XG5cbiAgICBjb2xsaXNpb25EZXRlY3RlZChjdXJyZW50VGV0cm9taW5vKSB7XG4gICAgICAgIGxldCByb3cgPSAwO1xuICAgICAgICB3aGlsZSAocm93IDwgNCkge1xuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGV0cm9taW5vLnNoYXBlW3Jvd11bY29sdW1uXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZC5sZW5ndGggLSAxIDxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93IHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFswXS5sZW5ndGggLSAxIDxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbiA8IDApIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGRbY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGRbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1bY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbl0gIT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRDb2xvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGluZUlzRmlsbGVkKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuICFsaW5lLnNvbWUoXG4gICAgICAgICAgICBjZWxsID0+IGNlbGwgPT09IGRlZmF1bHRDb2xvciB8fCBjZWxsID09PSBkaXNhYmxlZENvbG9yXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY2xlYXJMaW5lKGxpbmUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaW5lW2ldID0gZGVmYXVsdENvbG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29sbGFwc2VMaW5lcyhpKSB7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IGk7IHJvdyA+IDA7IHJvdy0tKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFtyb3ddW2NvbHVtbl0gPSB0aGlzLnBsYXlmaWVsZFtyb3cgLSAxXVtjb2x1bW5dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJGaWxsZWRMaW5lcyhjdXJyZW50VGV0cm9taW5vKSB7XG4gICAgICAgIGxldCBjdXJyZW50TGluZUluZGV4ID0gY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXTtcbiAgICAgICAgY29uc3QgbGFzdENsZWFyYWJsZUxpbmVJbmRleCA9IGN1cnJlbnRMaW5lSW5kZXggKyA0O1xuICAgICAgICBsZXQgY2xlYXJlZExpbmVzID0gMDtcblxuICAgICAgICB3aGlsZSAoY3VycmVudExpbmVJbmRleCA8IGxhc3RDbGVhcmFibGVMaW5lSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpbmVJc0ZpbGxlZCh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckxpbmUodGhpcy5wbGF5ZmllbGRbY3VycmVudExpbmVJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlTGluZXMoY3VycmVudExpbmVJbmRleCwgdGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhcmVkTGluZXMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50TGluZUluZGV4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsZWFyZWRMaW5lcztcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICAgIGpvaW5UZXRyaXMsXG4gICAgbW92ZUxlZnQsXG4gICAgbW92ZVJpZ2h0LFxuICAgIHJvdGF0ZUN1cnJlbnRUZXRyb21pbm8sXG4gICAgc2V0R2FtZUludGVydmFsLFxuICAgIHN0YXJ0R2FtZSxcbiAgICB0b2dnbGVSZWFkeVxufSBmcm9tIFwiLi90ZXRyaXNcIjtcblxuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3Qgc2VydmVyID0gcmVxdWlyZShcImh0dHBcIikuU2VydmVyKGFwcCk7XG5jb25zdCBpbyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIikoc2VydmVyKTtcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5jb25zdCBwb3J0ID0gODA4MDtcblxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uL2NsaWVudC9idWlsZFwiKSkpO1xuYXBwLmdldChcIi9cIiwgZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi9jbGllbnQvYnVpbGRcIiwgXCJpbmRleC5odG1sXCIpKTtcbn0pO1xuXG5zZXJ2ZXIubGlzdGVuKHBvcnQpO1xuXG5leHBvcnQgbGV0IGludGVydmFsID0gMzAwO1xuXG5pby5vbihcImNvbm5lY3Rpb25cIiwgY2xpZW50ID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIlxcbkNvbm5lY3Rpb24gaGFwcGVuZWQuXCIpO1xuICAgIGNsaWVudC5vbihcIkhhc2hcIiwgZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICAgIGpvaW5UZXRyaXMoc3RyaW5nLCBjbGllbnQuaWQpO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbihcIkFycm93VXBcIiwgdXNlcm5hbWVBbmRSb29tID0+IHtcbiAgICAgICAgcm90YXRlQ3VycmVudFRldHJvbWlubyh1c2VybmFtZUFuZFJvb20pO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbihcIkFycm93RG93blwiLCB1c2VybmFtZUFuZFJvb20gPT4ge1xuICAgICAgICBzZXRHYW1lSW50ZXJ2YWwodXNlcm5hbWVBbmRSb29tLCA1MCk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKFwiQXJyb3dEb3duVW5wcmVzc2VkXCIsIHVzZXJuYW1lQW5kUm9vbSA9PiB7XG4gICAgICAgIHNldEdhbWVJbnRlcnZhbCh1c2VybmFtZUFuZFJvb20sIDMwMCk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKFwiQXJyb3dMZWZ0XCIsIHVzZXJuYW1lQW5kUm9vbSA9PiB7XG4gICAgICAgIG1vdmVMZWZ0KHVzZXJuYW1lQW5kUm9vbSk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKFwiQXJyb3dSaWdodFwiLCB1c2VybmFtZUFuZFJvb20gPT4ge1xuICAgICAgICBtb3ZlUmlnaHQodXNlcm5hbWVBbmRSb29tKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oXCJzdGFydEdhbWVcIiwgY2xpZW50RGF0YSA9PiB7XG4gICAgICAgc3RhcnRHYW1lKGNsaWVudERhdGEpO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbihcInJlYWR5Q2hlY2tcIiwgY2xpZW50RGF0YSA9PiB7XG4gICAgICAgIHRvZ2dsZVJlYWR5KGNsaWVudERhdGEpO1xuICAgIH0pO1xufSk7XG5cbmV4cG9ydCBjb25zdCBlbWl0ID0gKGV2ZW50LCBhcmdzLCBzb2NrZXRJRCkgPT4ge1xuICAgIGlvLnRvKGAke3NvY2tldElEfWApLmVtaXQoZXZlbnQsIGFyZ3MpO1xufTtcblxuY29uc3Qgb24gPSAoZXZlbnQsIGNhbGxiYWNrLCBlbWl0KSA9PiB7fTtcbiIsImltcG9ydCB7IGVtaXQsIGludGVydmFsIH0gZnJvbSBcIi4vc2VydmVyXCI7XG5pbXBvcnQgVGV0cm9taW5vIGZyb20gXCIuL3RldHJvbWlub1wiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IEwsIExpbmUsIFJldmVyc2VMLCBTLCBTcXVhcmUsIFQsIFogfSBmcm9tIFwiLi90ZXRyb21pbm9zXCI7XG5cbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZShcImF1dG8tYmluZFwiKTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb2xvciA9IFwiZ3JheVwiO1xuZXhwb3J0IGNvbnN0IGRpc2FibGVkQ29sb3IgPSBcInBpbmtcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXlmaWVsZCgpIHtcbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheSgyMCldLm1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBbLi4ubmV3IEFycmF5KDEwKV0ubWFwKCgpID0+IGRlZmF1bHRDb2xvcik7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0RXZlbnRzKHRoaXNQbGF5ZXIpIHtcbiAgICBlbWl0KFwicGxheWZpZWxkXCIsIHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpc1BsYXllci5zb2NrZXRJRCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0UGxheWZpZWxkKHRoaXNQbGF5ZXIpIHtcbiAgICB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICBlbWl0KFwicGxheWZpZWxkXCIsIHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpc1BsYXllci5zb2NrZXRJRCk7XG4gICAgdGhpc1BsYXllci5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRUZXRyb21pbm8odGhpc1BsYXllcikge1xuICAgIGVtaXQoXCJ0ZXRyb21pbm9cIiwgdGhpc1BsYXllci5jdXJyZW50VGV0cm9taW5vLCB0aGlzUGxheWVyLnNvY2tldElEKTtcbn1cblxuZnVuY3Rpb24gZW1pdFNlc3Npb24odGhpc1BsYXllcikge31cblxuZnVuY3Rpb24gaW5pdGlhbFBhY2thZ2UodGhpc1BsYXllcikge1xuICAgIGVtaXRQbGF5ZmllbGQodGhpc1BsYXllcik7XG4gICAgZW1pdFRldHJvbWlubyh0aGlzUGxheWVyKTtcbiAgICBlbWl0UmVhZHlTdGF0ZXModGhpc1BsYXllci5zZXNzaW9uKTtcbn1cblxuY2xhc3MgR2FtZVNlc3Npb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yb29tID0gXCJcIjtcbiAgICAgICAgdGhpcy5ob3N0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBcIlNUQVJUSU5HX1NDUkVFTlwiO1xuICAgICAgICB0aGlzLnBsYXllcnMgPSBBcnJheSgpO1xuICAgICAgICB0aGlzLnRldHJvbWlub3MgPSBBcnJheShjcmVhdGVUZXRyb21pbm8oKSwgY3JlYXRlVGV0cm9taW5vKCkpO1xuICAgIH1cblxuICAgIG5ld1RldHJvbWlubygpIHtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zLnB1c2goY3JlYXRlVGV0cm9taW5vKCkpO1xuICAgIH1cblxuICAgIGRpc2FibGVMaW5lcyh1c2VyKSB7XG4gICAgICAgIHRoaXMucGxheWVycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IHVzZXIpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmRpc2FibGVMaW5lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY29uc3QgdGV0cm9taW5vcyA9IFtcbiAgICBuZXcgVGV0cm9taW5vKExpbmVbMF0sIFwiY3lhblwiLCBbNSwgLTJdLCBMaW5lKSxcbiAgICBuZXcgVGV0cm9taW5vKExbMF0sIFwib3JhbmdlXCIsIFs1LCAtMl0sIEwpLFxuICAgIG5ldyBUZXRyb21pbm8oUmV2ZXJzZUxbMF0sIFwiYmx1ZVwiLCBbNSwgLTJdLCBSZXZlcnNlTCksXG4gICAgbmV3IFRldHJvbWlubyhTcXVhcmVbMF0sIFwieWVsbG93XCIsIFs1LCAtMl0sIFNxdWFyZSksXG4gICAgbmV3IFRldHJvbWlubyhTWzBdLCBcImdyZWVuXCIsIFs1LCAtMl0sIFMpLFxuICAgIG5ldyBUZXRyb21pbm8oWlswXSwgXCJyZWRcIiwgWzUsIC0yXSwgWiksXG4gICAgbmV3IFRldHJvbWlubyhUWzBdLCBcInB1cnBsZVwiLCBbNSwgLTJdLCBUKVxuXTtcblxuZnVuY3Rpb24gY3JlYXRlVGV0cm9taW5vKCkge1xuICAgIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGV0cm9taW5vcy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHRldHJvbWlub3NbaW5kZXhdO1xufVxuXG5jb25zdCBzZXNzaW9ucyA9IEFycmF5KCk7XG5cbmZ1bmN0aW9uIGZpbmRHYW1lU2Vzc2lvbihyb29tKSB7XG4gICAgcmV0dXJuIHNlc3Npb25zLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50LnJvb20gPT09IHJvb20pO1xufVxuXG5mdW5jdGlvbiBmaW5kVXNlckluU2Vzc2lvbihyb29tLCB1c2VybmFtZSkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBmaW5kR2FtZVNlc3Npb24ocm9vbSk7XG4gICAgaWYgKCFzZXNzaW9uKSByZXR1cm47XG5cbiAgICByZXR1cm4gc2Vzc2lvbi5wbGF5ZXJzLmZpbmQodXNlciA9PiB1c2VyLm5hbWUgPT09IHVzZXJuYW1lKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvcHlUZXRyb21pbm8gPSB0ZXRyb21pbm8gPT4ge1xuICAgIHJldHVybiBuZXcgVGV0cm9taW5vKFxuICAgICAgICB0ZXRyb21pbm8uc2hhcGUsXG4gICAgICAgIHRldHJvbWluby5jb2xvcixcbiAgICAgICAgWzAsIC0xXSxcbiAgICAgICAgdGV0cm9taW5vLnJvdGF0aW9uQXJyYXlcbiAgICApO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyKHNlc3Npb24sIG5hbWUsIHNvY2tldElEKSB7XG4gICAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigpO1xuICAgIHBsYXllci5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICBwbGF5ZXIubmFtZSA9IG5hbWU7XG4gICAgcGxheWVyLnNvY2tldElEID0gc29ja2V0SUQ7XG4gICAgc2Vzc2lvbi5wbGF5ZXJzLnB1c2gocGxheWVyKTtcbiAgICBwbGF5ZXIuY3VycmVudFRldHJvbWlubyA9IGNvcHlUZXRyb21pbm8oc2Vzc2lvbi50ZXRyb21pbm9zWzBdKTtcbiAgICBwbGF5ZXIubmV4dFRldHJvbWlubyA9IGNvcHlUZXRyb21pbm8oc2Vzc2lvbi50ZXRyb21pbm9zWzFdKTtcbiAgICByZXR1cm4gcGxheWVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lU2Vzc2lvbihyb29tLCBob3N0KSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBHYW1lU2Vzc2lvbigpO1xuICAgIHNlc3Npb24ucm9vbSA9IHJvb207XG4gICAgc2Vzc2lvbi5ob3N0ID0gaG9zdDtcblxuICAgIHNlc3Npb25zLnB1c2goc2Vzc2lvbik7XG5cbiAgICByZXR1cm4gc2Vzc2lvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdhbWVJbnRlcnZhbCh1c2VybmFtZUFuZFJvb20sIGdhbWVJbnRlcnZhbCkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIuaW50ZXJ2YWwgPSBnYW1lSW50ZXJ2YWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlTGVmdCh1c2VybmFtZUFuZFJvb20pIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XG4gICAgcGxheWVyLm1vdmVMZWZ0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlUmlnaHQodXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5tb3ZlUmlnaHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZUN1cnJlbnRUZXRyb21pbm8odXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5yb3RhdGUoKTtcbn1cblxuZnVuY3Rpb24gZ2V0VXNlcihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpIHtcbiAgICBjb25zdCBzZXNzaW9uID1cbiAgICAgICAgZmluZEdhbWVTZXNzaW9uKHJvb20pIHx8IGNyZWF0ZUdhbWVTZXNzaW9uKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCk7XG5cbiAgICBjb25zdCB1c2VyID0gZmluZFVzZXJJblNlc3Npb24ocm9vbSwgdXNlcm5hbWUpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiBub3QgZm91bmQgaW4gc2Vzc2lvbiwgYWRkaW5nLi4uYCk7XG4gICAgICAgIHJldHVybiBjcmVhdGVQbGF5ZXIoc2Vzc2lvbiwgdXNlcm5hbWUsIHNvY2tldElEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNlciBcIiR7dXNlcm5hbWV9XCIgaXMgYWxyZWFkeSBpbiBzZXNzaW9uLmApO1xuICAgICAgICB1c2VyLnNvY2tldElEID0gc29ja2V0SUQ7XG4gICAgICAgIGluaXRpYWxQYWNrYWdlKHVzZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVXNlcm5hbWUoc3BsaXQpIHtcbiAgICByZXR1cm4gc3BsaXRbMV0gPyBzcGxpdFsxXS5zbGljZSgwLCBzcGxpdFsxXS5sZW5ndGggLSAxKSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGpvaW5UZXRyaXMoaGFzaCwgc29ja2V0SUQpIHtcbiAgICBjb25zdCBzcGxpdCA9IGhhc2guc3BsaXQoXCJbXCIpO1xuICAgIGNvbnN0IHJvb20gPSBzcGxpdFswXS5zbGljZSgxKTtcbiAgICBjb25zdCB1c2VybmFtZSA9IHBhcnNlVXNlcm5hbWUoc3BsaXQpO1xuXG4gICAgY29uc29sZS5sb2coXCJqb2luVGV0cmlzKCkgY2FsbGVkXCIpO1xuICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiB0cmllZCB0byBjb25uZWN0IHRvIHJvb206IFwiJHtyb29tfVwiYCk7XG4gICAgZ2V0VXNlcihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpO1xufVxuXG5mdW5jdGlvbiByZWFkeUNoZWNrKHNlc3Npb24pIHtcbiAgICByZXR1cm4gc2Vzc2lvbi5wbGF5ZXJzLmV2ZXJ5KHVzZXIgPT4gIHVzZXIucmVhZHkpO1xufVxuXG5mdW5jdGlvbiBzdGFydEdhbWVGb3JBbGxVc2VycyhzZXNzaW9uLCkge1xuICAgIHNlc3Npb24ucGxheWVycy5tYXAoZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikgdXNlci5wbGF5KCk7XG4gICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgICAgZW1pdChcImdhbWVTdGFydGVkXCIsIFwiR0FNRV9TVEFSVEVEXCIsIHVzZXIuc29ja2V0SUQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRHYW1lKGNsaWVudERhdGEpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gZmluZEdhbWVTZXNzaW9uKGNsaWVudERhdGEucm9vbSk7XG4gICAgY29uc29sZS5sb2coXCJGdW5jdGlvbiByZXR1cm5zOiBcIiwgcmVhZHlDaGVjayhzZXNzaW9uKSk7XG4gICAgaWYgKHJlYWR5Q2hlY2soc2Vzc2lvbikgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm47XG4gICAgZWxzZVxuICAgICAgICBzdGFydEdhbWVGb3JBbGxVc2VycyhzZXNzaW9uKTtcbn1cblxuZnVuY3Rpb24gZW1pdFJlYWR5U3RhdGVzKHNlc3Npb24pIHtcbiAgICBzZXNzaW9uLnBsYXllcnMubWFwKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIGVtaXQoXCJyZWFkeVN0YXRlXCIsIHVzZXIucmVhZHksIHVzZXIuc29ja2V0SUQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlUmVhZHkoY2xpZW50RGF0YSkge1xuICAgIGNvbnN0IHVzZXIgPSBmaW5kVXNlckluU2Vzc2lvbihjbGllbnREYXRhLnJvb20sIGNsaWVudERhdGEudXNlcm5hbWUpO1xuICAgIGlmICh1c2VyLnJlYWR5KVxuICAgICAgICB1c2VyLnJlYWR5ID0gZmFsc2U7XG4gICAgZWxzZVxuICAgICAgICB1c2VyLnJlYWR5ID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyh1c2VyLnJlYWR5KTtcbiAgICBjb25zdCBzZXNzaW9uID0gZmluZEdhbWVTZXNzaW9uKGNsaWVudERhdGEucm9vbSk7XG4gICAgZW1pdFJlYWR5U3RhdGVzKHNlc3Npb24pO1xufSIsImNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZShcImF1dG8tYmluZFwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV0cm9taW5vIHtcbiAgICBjb25zdHJ1Y3RvcihzaGFwZSwgY29sb3IsIHBvc2l0aW9uLCByb3RhdGlvbkFycmF5KSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNoYXBlID0gc2hhcGU7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IFszLCAtNF07XG4gICAgICAgIHRoaXMucm90YXRpb25BcnJheSA9IHJvdGF0aW9uQXJyYXk7XG4gICAgfVxuXG4gICAgZHJhd1RldHJvbWlubyhwbGF5ZmllbGQpIHtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChjb2x1bW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSArIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFwZVtyb3ddW2NvbHVtbl1cbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSArIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgXSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZCkge1xuICAgICAgICBsZXQgcm93ID0gMDtcbiAgICAgICAgd2hpbGUgKHJvdyA8IDQpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA8IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICBdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXBlW3Jvd11bY29sdW1uXVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICBdID0gXCJncmF5XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVMZWZ0KHBsYXlmaWVsZCkge1xuICAgICAgICB0aGlzLmVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzBdIC09IDE7XG4gICAgICAgIGlmIChwbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcykpIHRoaXMucG9zaXRpb25bMF0gKz0gMTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgIH1cblxuICAgIG1vdmVSaWdodChwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSArPSAxO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKSB0aGlzLnBvc2l0aW9uWzBdIC09IDE7XG4gICAgICAgIHRoaXMuZHJhd1RldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICB9XG5cbiAgICByb3RhdGUocGxheWZpZWxkKSB7XG4gICAgICAgIHRoaXMuZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpID09PVxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkFycmF5Lmxlbmd0aCAtIDFcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5WzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSArIDFcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSkgdGhpcy5fd2FsbEtpY2socGxheWZpZWxkKTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgIH1cblxuICAgIF93YWxsS2ljayhwbGF5ZmllbGQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0gLSAxLCB0aGlzLnBvc2l0aW9uWzFdXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0gKyAxLCB0aGlzLnBvc2l0aW9uWzFdXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gLSAxXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gKyAxXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0gLSAyLCB0aGlzLnBvc2l0aW9uWzFdXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0gKyAyLCB0aGlzLnBvc2l0aW9uWzFdXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gLSAyXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gKyAyXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdW5yb3RhdGUoKTtcbiAgICB9XG5cbiAgICBfdW5yb3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbdGhpcy5yb3RhdGlvbkFycmF5Lmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSAtIDFcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdHJ5VGV0cm9taW5vUG9zaXRpb24ocG9zaXRpb24sIHBsYXlmaWVsZCkge1xuICAgICAgICBjb25zdCB0bXAgPSBbLi4udGhpcy5wb3NpdGlvbl07XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSA9IHBvc2l0aW9uWzBdO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdID0gcG9zaXRpb25bMV07XG4gICAgICAgIGlmIChwbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcykpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gPSB0bXBbMF07XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzFdID0gdG1wWzFdO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCBTcXVhcmUgPSBbXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXG5dO1xuXG5leHBvcnQgY29uc3QgTGluZSA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAxXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1cbl07XG5cbmV4cG9ydCBjb25zdCBUID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXVxuXTtcblxuZXhwb3J0IGNvbnN0IEwgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXG5dO1xuXG5leHBvcnQgY29uc3QgUmV2ZXJzZUwgPSBbXG4gICAgW1xuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXG5dO1xuXG5leHBvcnQgY29uc3QgUyA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1cbl07XG5cbmV4cG9ydCBjb25zdCBaID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXVxuXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF1dG8tYmluZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==