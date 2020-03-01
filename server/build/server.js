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
  return session.players.some(function (user) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGxheWVyLmpzIiwid2VicGFjazovLy8uL3BsYXlmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGV0cmlzLmpzIiwid2VicGFjazovLy8uL3RldHJvbWluby5qcyIsIndlYnBhY2s6Ly8vLi90ZXRyb21pbm9zLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF1dG8tYmluZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIl0sIm5hbWVzIjpbImF1dG9CaW5kIiwicmVxdWlyZSIsIlBsYXllciIsInNlc3Npb24iLCJwbGF5ZmllbGQiLCJQbGF5ZmllbGQiLCJjcmVhdGVQbGF5ZmllbGQiLCJuYW1lIiwiY3VycmVudFRldHJvbWlubyIsIm5leHRUZXRyb21pbm8iLCJuZXh0VGV0cm9taW5vSW5kZXgiLCJzb2NrZXRJRCIsInRldHJvbWlub3MiLCJpbnRlcnZhbCIsImdhbWVPdmVyIiwic2NvcmUiLCJ0b3RhbENsZWFyZWRMaW5lcyIsInJlYWR5IiwiZXJhc2VUZXRyb21pbm8iLCJwb3NpdGlvbiIsImNvbGxpc2lvbkRldGVjdGVkIiwiZHJhd1RldHJvbWlubyIsImVtaXQiLCJjbGVhcmVkTGluZXMiLCJjbGVhckZpbGxlZExpbmVzIiwiaSIsImRpc2FibGVMaW5lcyIsImluY3JlYXNlU2NvcmUiLCJuZXdUZXRyb21pbm8iLCJlbWl0UGxheWZpZWxkIiwiZW1pdFRldHJvbWlubyIsInNldFRpbWVvdXQiLCJwbGF5IiwiY29weVRldHJvbWlubyIsInJvdGF0ZSIsIm1vdmVMZWZ0IiwibW92ZVJpZ2h0Iiwicm93IiwibGVuZ3RoIiwiY29sdW1uIiwiZGlzYWJsZWRDb2xvciIsInNoYXBlIiwiZGVmYXVsdENvbG9yIiwibGluZSIsInNvbWUiLCJjZWxsIiwiY3VycmVudExpbmVJbmRleCIsImxhc3RDbGVhcmFibGVMaW5lSW5kZXgiLCJsaW5lSXNGaWxsZWQiLCJjbGVhckxpbmUiLCJjb2xsYXBzZUxpbmVzIiwiZXhwcmVzcyIsImFwcCIsInNlcnZlciIsIlNlcnZlciIsImlvIiwicGF0aCIsInBvcnQiLCJ1c2UiLCJqb2luIiwiX19kaXJuYW1lIiwiZ2V0IiwicmVxIiwicmVzIiwic2VuZEZpbGUiLCJsaXN0ZW4iLCJvbiIsImNsaWVudCIsImNvbnNvbGUiLCJsb2ciLCJzdHJpbmciLCJqb2luVGV0cmlzIiwiaWQiLCJ1c2VybmFtZUFuZFJvb20iLCJyb3RhdGVDdXJyZW50VGV0cm9taW5vIiwic2V0R2FtZUludGVydmFsIiwiY2xpZW50RGF0YSIsInN0YXJ0R2FtZSIsInRvZ2dsZVJlYWR5IiwiZXZlbnQiLCJhcmdzIiwidG8iLCJjYWxsYmFjayIsIkFycmF5IiwibWFwIiwiZW1pdEV2ZW50cyIsInRoaXNQbGF5ZXIiLCJlbWl0U2Vzc2lvbiIsImluaXRpYWxQYWNrYWdlIiwiZW1pdFJlYWR5U3RhdGVzIiwiR2FtZVNlc3Npb24iLCJyb29tIiwiaG9zdCIsImdhbWVTdGF0ZSIsInBsYXllcnMiLCJjcmVhdGVUZXRyb21pbm8iLCJwdXNoIiwidXNlciIsImZvckVhY2giLCJlbGVtZW50IiwiZGlzYWJsZUxpbmUiLCJUZXRyb21pbm8iLCJMaW5lIiwiTCIsIlJldmVyc2VMIiwiU3F1YXJlIiwiUyIsIloiLCJUIiwiaW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzZXNzaW9ucyIsImZpbmRHYW1lU2Vzc2lvbiIsImZpbmQiLCJmaW5kVXNlckluU2Vzc2lvbiIsInVzZXJuYW1lIiwidGV0cm9taW5vIiwiY29sb3IiLCJyb3RhdGlvbkFycmF5IiwiY3JlYXRlUGxheWVyIiwicGxheWVyIiwiY3JlYXRlR2FtZVNlc3Npb24iLCJnYW1lSW50ZXJ2YWwiLCJnZXRVc2VyIiwicGFyc2VVc2VybmFtZSIsInNwbGl0Iiwic2xpY2UiLCJ1bmRlZmluZWQiLCJoYXNoIiwicmVhZHlDaGVjayIsInN0YXJ0R2FtZUZvckFsbFVzZXJzIiwiaW5kZXhPZiIsIl93YWxsS2ljayIsIl90cnlUZXRyb21pbm9Qb3NpdGlvbiIsIl91bnJvdGF0ZSIsInRtcCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFPQTs7QUFDQSxJQUFNQSxRQUFRLEdBQUdDLG1CQUFPLENBQUMsNEJBQUQsQ0FBeEI7O0lBRXFCQyxNOzs7QUFDakIsb0JBQWM7QUFBQTs7QUFDVkYsWUFBUSxDQUFDLElBQUQsQ0FBUjtBQUNBLFNBQUtHLE9BQUwsR0FBZSxJQUFmO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixJQUFJQyxrREFBSixDQUFjQywrREFBZSxFQUE3QixDQUFqQjtBQUNBLFNBQUtDLElBQUwsR0FB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Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zZXJ2ZXIuanNcIik7XG4iLCJpbXBvcnQgeyBlbWl0IH0gZnJvbSBcIi4vc2VydmVyXCI7XG5pbXBvcnQge1xuICAgIGNvcHlUZXRyb21pbm8sXG4gICAgY3JlYXRlUGxheWZpZWxkLFxuICAgIGRpc2FibGVkQ29sb3IsXG4gICAgZW1pdFBsYXlmaWVsZCxcbiAgICBlbWl0VGV0cm9taW5vXG59IGZyb20gXCIuL3RldHJpc1wiO1xuaW1wb3J0IFBsYXlmaWVsZCBmcm9tIFwiLi9wbGF5ZmllbGRcIjtcbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZShcImF1dG8tYmluZFwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IG51bGw7XG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gbmV3IFBsYXlmaWVsZChjcmVhdGVQbGF5ZmllbGQoKSk7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWlubyA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlubyA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlub0luZGV4ID0gMDtcbiAgICAgICAgdGhpcy5zb2NrZXRJRCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRldHJvbWlub3MgPSBudWxsO1xuICAgICAgICB0aGlzLmludGVydmFsID0gMzAwO1xuICAgICAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLnRvdGFsQ2xlYXJlZExpbmVzID0gMDtcbiAgICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFRldHJvbWlubykge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmVyYXNlVGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKz0gMTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzLmN1cnJlbnRUZXRyb21pbm8pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdIC09IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZW1pdChcImdhbWVPdmVyXCIsIFwiR0FNRV9GSU5JU0hFRFwiLCB0aGlzLnNvY2tldElEKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgY2xlYXJlZExpbmVzID0gdGhpcy5wbGF5ZmllbGQuY2xlYXJGaWxsZWRMaW5lcyhcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsZWFyZWRMaW5lczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5kaXNhYmxlTGluZXModGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVhc2VTY29yZShjbGVhcmVkTGluZXMpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3VGV0cm9taW5vKCk7XG4gICAgICAgICAgICAgICAgZW1pdFBsYXlmaWVsZCh0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5kcmF3VGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgICAgIH1cbiAgICAgICAgZW1pdFRldHJvbWlubyh0aGlzKTtcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnBsYXksIHRoaXMuaW50ZXJ2YWwpO1xuICAgIH1cblxuICAgIGluY3JlYXNlU2NvcmUoY2xlYXJlZExpbmVzKSB7XG4gICAgICAgIHRoaXMudG90YWxDbGVhcmVkTGluZXMgKz0gY2xlYXJlZExpbmVzO1xuICAgICAgICB0aGlzLnNjb3JlICs9IGNsZWFyZWRMaW5lcyAqICgxMCArIChjbGVhcmVkTGluZXMgLSAxKSk7XG4gICAgICAgIGVtaXQoXCJzY29yZVwiLCB0aGlzLnNjb3JlLCB0aGlzLnNvY2tldElEKTtcbiAgICAgICAgZW1pdChcImNsZWFyZWRMaW5lc1wiLCB0aGlzLnRvdGFsQ2xlYXJlZExpbmVzLCB0aGlzLnNvY2tldElEKTtcbiAgICB9XG5cbiAgICBuZXdUZXRyb21pbm8oKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWlubyA9IHRoaXMubmV4dFRldHJvbWlubztcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vSW5kZXgrKztcbiAgICAgICAgaWYgKCF0aGlzLnNlc3Npb24udGV0cm9taW5vc1t0aGlzLm5leHRUZXRyb21pbm9JbmRleF0pXG4gICAgICAgICAgICB0aGlzLnNlc3Npb24ubmV3VGV0cm9taW5vKCk7XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlubyA9IGNvcHlUZXRyb21pbm8oXG4gICAgICAgICAgICB0aGlzLnNlc3Npb24udGV0cm9taW5vc1t0aGlzLm5leHRUZXRyb21pbm9JbmRleF1cbiAgICAgICAgKTtcbiAgICAgICAgZW1pdChcIm5leHRUZXRyb21pbm9cIiwgdGhpcy5uZXh0VGV0cm9taW5vLCB0aGlzLnNvY2tldElEKTtcbiAgICB9XG5cbiAgICByb3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVPdmVyKSByZXR1cm47XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5yb3RhdGUodGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgIH1cblxuICAgIG1vdmVMZWZ0KCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lT3ZlcikgcmV0dXJuO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ubW92ZUxlZnQodGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgIH1cblxuICAgIG1vdmVSaWdodCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU92ZXIpIHJldHVybjtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLm1vdmVSaWdodCh0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgfVxuXG4gICAgZGlzYWJsZUxpbmUoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5lcmFzZVRldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQubGVuZ3RoIC0gMTsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZFtyb3ddW1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5cbiAgICAgICAgICAgICAgICBdID0gdGhpcy5wbGF5ZmllbGQucGxheWZpZWxkW3JvdyArIDFdW2NvbHVtbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGRbdGhpcy5wbGF5ZmllbGQucGxheWZpZWxkLmxlbmd0aCAtIDFdW1xuICAgICAgICAgICAgICAgIGNvbHVtblxuICAgICAgICAgICAgXSA9IGRpc2FibGVkQ29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdIC09IDE7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5kcmF3VGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgICAgIGVtaXRQbGF5ZmllbGQodGhpcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IGF1dG9CaW5kIGZyb20gXCJhdXRvLWJpbmRcIjtcbmltcG9ydCB7IGRlZmF1bHRDb2xvciwgZGlzYWJsZWRDb2xvciB9IGZyb20gXCIuL3RldHJpc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZmllbGQge1xuICAgIGNvbnN0cnVjdG9yKHBsYXlmaWVsZCkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5wbGF5ZmllbGQgPSBwbGF5ZmllbGQ7XG4gICAgfVxuXG4gICAgY29sbGlzaW9uRGV0ZWN0ZWQoY3VycmVudFRldHJvbWlubykge1xuICAgICAgICBsZXQgcm93ID0gMDtcbiAgICAgICAgd2hpbGUgKHJvdyA8IDQpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA8IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRldHJvbWluby5zaGFwZVtyb3ddW2NvbHVtbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQubGVuZ3RoIC0gMSA8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvdyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGRbMF0ubGVuZ3RoIC0gMSA8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMF0gKyBjb2x1bW4gPCAwKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGRbY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvd11bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMF0gKyBjb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMF0gKyBjb2x1bW5dICE9PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q29sb3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbHVtbiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxpbmVJc0ZpbGxlZChsaW5lKSB7XG4gICAgICAgIHJldHVybiAhbGluZS5zb21lKFxuICAgICAgICAgICAgY2VsbCA9PiBjZWxsID09PSBkZWZhdWx0Q29sb3IgfHwgY2VsbCA9PT0gZGlzYWJsZWRDb2xvclxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNsZWFyTGluZShsaW5lKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGluZVtpXSA9IGRlZmF1bHRDb2xvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbGxhcHNlTGluZXMoaSkge1xuICAgICAgICBmb3IgKGxldCByb3cgPSBpOyByb3cgPiAwOyByb3ctLSkge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGRbcm93XVtjb2x1bW5dID0gdGhpcy5wbGF5ZmllbGRbcm93IC0gMV1bY29sdW1uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyRmlsbGVkTGluZXMoY3VycmVudFRldHJvbWlubykge1xuICAgICAgICBsZXQgY3VycmVudExpbmVJbmRleCA9IGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV07XG4gICAgICAgIGNvbnN0IGxhc3RDbGVhcmFibGVMaW5lSW5kZXggPSBjdXJyZW50TGluZUluZGV4ICsgNDtcbiAgICAgICAgbGV0IGNsZWFyZWRMaW5lcyA9IDA7XG5cbiAgICAgICAgd2hpbGUgKGN1cnJlbnRMaW5lSW5kZXggPCBsYXN0Q2xlYXJhYmxlTGluZUluZGV4KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGRbY3VycmVudExpbmVJbmRleF0pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5saW5lSXNGaWxsZWQodGhpcy5wbGF5ZmllbGRbY3VycmVudExpbmVJbmRleF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJMaW5lKHRoaXMucGxheWZpZWxkW2N1cnJlbnRMaW5lSW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUxpbmVzKGN1cnJlbnRMaW5lSW5kZXgsIHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJlZExpbmVzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudExpbmVJbmRleCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbGVhcmVkTGluZXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHtcbiAgICBqb2luVGV0cmlzLFxuICAgIG1vdmVMZWZ0LFxuICAgIG1vdmVSaWdodCxcbiAgICByb3RhdGVDdXJyZW50VGV0cm9taW5vLFxuICAgIHNldEdhbWVJbnRlcnZhbCxcbiAgICBzdGFydEdhbWUsXG4gICAgdG9nZ2xlUmVhZHlcbn0gZnJvbSBcIi4vdGV0cmlzXCI7XG5cbmNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHNlcnZlciA9IHJlcXVpcmUoXCJodHRwXCIpLlNlcnZlcihhcHApO1xuY29uc3QgaW8gPSByZXF1aXJlKFwic29ja2V0LmlvXCIpKHNlcnZlcik7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcblxuY29uc3QgcG9ydCA9IDgwODA7XG5cbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi9jbGllbnQvYnVpbGRcIikpKTtcbmFwcC5nZXQoXCIvXCIsIGZ1bmN0aW9uKHJlcSwgcmVzKSB7XG4gICAgcmVzLnNlbmRGaWxlKHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vY2xpZW50L2J1aWxkXCIsIFwiaW5kZXguaHRtbFwiKSk7XG59KTtcblxuc2VydmVyLmxpc3Rlbihwb3J0KTtcblxuZXhwb3J0IGxldCBpbnRlcnZhbCA9IDMwMDtcblxuaW8ub24oXCJjb25uZWN0aW9uXCIsIGNsaWVudCA9PiB7XG4gICAgY29uc29sZS5sb2coXCJcXG5Db25uZWN0aW9uIGhhcHBlbmVkLlwiKTtcbiAgICBjbGllbnQub24oXCJIYXNoXCIsIGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgICBqb2luVGV0cmlzKHN0cmluZywgY2xpZW50LmlkKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oXCJBcnJvd1VwXCIsIHVzZXJuYW1lQW5kUm9vbSA9PiB7XG4gICAgICAgIHJvdGF0ZUN1cnJlbnRUZXRyb21pbm8odXNlcm5hbWVBbmRSb29tKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oXCJBcnJvd0Rvd25cIiwgdXNlcm5hbWVBbmRSb29tID0+IHtcbiAgICAgICAgc2V0R2FtZUludGVydmFsKHVzZXJuYW1lQW5kUm9vbSwgNTApO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbihcIkFycm93RG93blVucHJlc3NlZFwiLCB1c2VybmFtZUFuZFJvb20gPT4ge1xuICAgICAgICBzZXRHYW1lSW50ZXJ2YWwodXNlcm5hbWVBbmRSb29tLCAzMDApO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbihcIkFycm93TGVmdFwiLCB1c2VybmFtZUFuZFJvb20gPT4ge1xuICAgICAgICBtb3ZlTGVmdCh1c2VybmFtZUFuZFJvb20pO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbihcIkFycm93UmlnaHRcIiwgdXNlcm5hbWVBbmRSb29tID0+IHtcbiAgICAgICAgbW92ZVJpZ2h0KHVzZXJuYW1lQW5kUm9vbSk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKFwic3RhcnRHYW1lXCIsIGNsaWVudERhdGEgPT4ge1xuICAgICAgIHN0YXJ0R2FtZShjbGllbnREYXRhKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oXCJyZWFkeUNoZWNrXCIsIGNsaWVudERhdGEgPT4ge1xuICAgICAgICB0b2dnbGVSZWFkeShjbGllbnREYXRhKTtcbiAgICB9KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgZW1pdCA9IChldmVudCwgYXJncywgc29ja2V0SUQpID0+IHtcbiAgICBpby50byhgJHtzb2NrZXRJRH1gKS5lbWl0KGV2ZW50LCBhcmdzKTtcbn07XG5cbmNvbnN0IG9uID0gKGV2ZW50LCBjYWxsYmFjaywgZW1pdCkgPT4ge307XG4iLCJpbXBvcnQgeyBlbWl0LCBpbnRlcnZhbCB9IGZyb20gXCIuL3NlcnZlclwiO1xuaW1wb3J0IFRldHJvbWlubyBmcm9tIFwiLi90ZXRyb21pbm9cIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBMLCBMaW5lLCBSZXZlcnNlTCwgUywgU3F1YXJlLCBULCBaIH0gZnJvbSBcIi4vdGV0cm9taW5vc1wiO1xuXG5jb25zdCBhdXRvQmluZCA9IHJlcXVpcmUoXCJhdXRvLWJpbmRcIik7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q29sb3IgPSBcImdyYXlcIjtcbmV4cG9ydCBjb25zdCBkaXNhYmxlZENvbG9yID0gXCJwaW5rXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQbGF5ZmllbGQoKSB7XG4gICAgcmV0dXJuIFsuLi5uZXcgQXJyYXkoMjApXS5tYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gWy4uLm5ldyBBcnJheSgxMCldLm1hcCgoKSA9PiBkZWZhdWx0Q29sb3IpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1pdEV2ZW50cyh0aGlzUGxheWVyKSB7XG4gICAgZW1pdChcInBsYXlmaWVsZFwiLCB0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXNQbGF5ZXIuc29ja2V0SUQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1pdFBsYXlmaWVsZCh0aGlzUGxheWVyKSB7XG4gICAgdGhpc1BsYXllci5jdXJyZW50VGV0cm9taW5vLmVyYXNlVGV0cm9taW5vKHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgZW1pdChcInBsYXlmaWVsZFwiLCB0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXNQbGF5ZXIuc29ja2V0SUQpO1xuICAgIHRoaXNQbGF5ZXIuY3VycmVudFRldHJvbWluby5kcmF3VGV0cm9taW5vKHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0VGV0cm9taW5vKHRoaXNQbGF5ZXIpIHtcbiAgICBlbWl0KFwidGV0cm9taW5vXCIsIHRoaXNQbGF5ZXIuY3VycmVudFRldHJvbWlubywgdGhpc1BsYXllci5zb2NrZXRJRCk7XG59XG5cbmZ1bmN0aW9uIGVtaXRTZXNzaW9uKHRoaXNQbGF5ZXIpIHt9XG5cbmZ1bmN0aW9uIGluaXRpYWxQYWNrYWdlKHRoaXNQbGF5ZXIpIHtcbiAgICBlbWl0UGxheWZpZWxkKHRoaXNQbGF5ZXIpO1xuICAgIGVtaXRUZXRyb21pbm8odGhpc1BsYXllcik7XG4gICAgZW1pdFJlYWR5U3RhdGVzKHRoaXNQbGF5ZXIuc2Vzc2lvbik7XG59XG5cbmNsYXNzIEdhbWVTZXNzaW9uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucm9vbSA9IFwiXCI7XG4gICAgICAgIHRoaXMuaG9zdCA9IFwiXCI7XG4gICAgICAgIHRoaXMuZ2FtZVN0YXRlID0gXCJTVEFSVElOR19TQ1JFRU5cIjtcbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gQXJyYXkoKTtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zID0gQXJyYXkoY3JlYXRlVGV0cm9taW5vKCksIGNyZWF0ZVRldHJvbWlubygpKTtcbiAgICB9XG5cbiAgICBuZXdUZXRyb21pbm8oKSB7XG4gICAgICAgIHRoaXMudGV0cm9taW5vcy5wdXNoKGNyZWF0ZVRldHJvbWlubygpKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlTGluZXModXNlcikge1xuICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50ICE9PSB1c2VyKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5kaXNhYmxlTGluZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNvbnN0IHRldHJvbWlub3MgPSBbXG4gICAgbmV3IFRldHJvbWlubyhMaW5lWzBdLCBcImN5YW5cIiwgWzUsIC0yXSwgTGluZSksXG4gICAgbmV3IFRldHJvbWlubyhMWzBdLCBcIm9yYW5nZVwiLCBbNSwgLTJdLCBMKSxcbiAgICBuZXcgVGV0cm9taW5vKFJldmVyc2VMWzBdLCBcImJsdWVcIiwgWzUsIC0yXSwgUmV2ZXJzZUwpLFxuICAgIG5ldyBUZXRyb21pbm8oU3F1YXJlWzBdLCBcInllbGxvd1wiLCBbNSwgLTJdLCBTcXVhcmUpLFxuICAgIG5ldyBUZXRyb21pbm8oU1swXSwgXCJncmVlblwiLCBbNSwgLTJdLCBTKSxcbiAgICBuZXcgVGV0cm9taW5vKFpbMF0sIFwicmVkXCIsIFs1LCAtMl0sIFopLFxuICAgIG5ldyBUZXRyb21pbm8oVFswXSwgXCJwdXJwbGVcIiwgWzUsIC0yXSwgVClcbl07XG5cbmZ1bmN0aW9uIGNyZWF0ZVRldHJvbWlubygpIHtcbiAgICBjb25zdCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRldHJvbWlub3MubGVuZ3RoKTtcblxuICAgIHJldHVybiB0ZXRyb21pbm9zW2luZGV4XTtcbn1cblxuY29uc3Qgc2Vzc2lvbnMgPSBBcnJheSgpO1xuXG5mdW5jdGlvbiBmaW5kR2FtZVNlc3Npb24ocm9vbSkge1xuICAgIHJldHVybiBzZXNzaW9ucy5maW5kKGVsZW1lbnQgPT4gZWxlbWVudC5yb29tID09PSByb29tKTtcbn1cblxuZnVuY3Rpb24gZmluZFVzZXJJblNlc3Npb24ocm9vbSwgdXNlcm5hbWUpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gZmluZEdhbWVTZXNzaW9uKHJvb20pO1xuICAgIGlmICghc2Vzc2lvbikgcmV0dXJuO1xuXG4gICAgcmV0dXJuIHNlc3Npb24ucGxheWVycy5maW5kKHVzZXIgPT4gdXNlci5uYW1lID09PSB1c2VybmFtZSk7XG59XG5cbmV4cG9ydCBjb25zdCBjb3B5VGV0cm9taW5vID0gdGV0cm9taW5vID0+IHtcbiAgICByZXR1cm4gbmV3IFRldHJvbWlubyhcbiAgICAgICAgdGV0cm9taW5vLnNoYXBlLFxuICAgICAgICB0ZXRyb21pbm8uY29sb3IsXG4gICAgICAgIFswLCAtMV0sXG4gICAgICAgIHRldHJvbWluby5yb3RhdGlvbkFycmF5XG4gICAgKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllcihzZXNzaW9uLCBuYW1lLCBzb2NrZXRJRCkge1xuICAgIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcbiAgICBwbGF5ZXIuc2Vzc2lvbiA9IHNlc3Npb247XG4gICAgcGxheWVyLm5hbWUgPSBuYW1lO1xuICAgIHBsYXllci5zb2NrZXRJRCA9IHNvY2tldElEO1xuICAgIHNlc3Npb24ucGxheWVycy5wdXNoKHBsYXllcik7XG4gICAgcGxheWVyLmN1cnJlbnRUZXRyb21pbm8gPSBjb3B5VGV0cm9taW5vKHNlc3Npb24udGV0cm9taW5vc1swXSk7XG4gICAgcGxheWVyLm5leHRUZXRyb21pbm8gPSBjb3B5VGV0cm9taW5vKHNlc3Npb24udGV0cm9taW5vc1sxXSk7XG4gICAgcmV0dXJuIHBsYXllcjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlR2FtZVNlc3Npb24ocm9vbSwgaG9zdCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBuZXcgR2FtZVNlc3Npb24oKTtcbiAgICBzZXNzaW9uLnJvb20gPSByb29tO1xuICAgIHNlc3Npb24uaG9zdCA9IGhvc3Q7XG5cbiAgICBzZXNzaW9ucy5wdXNoKHNlc3Npb24pO1xuXG4gICAgcmV0dXJuIHNlc3Npb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHYW1lSW50ZXJ2YWwodXNlcm5hbWVBbmRSb29tLCBnYW1lSW50ZXJ2YWwpIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XG4gICAgcGxheWVyLmludGVydmFsID0gZ2FtZUludGVydmFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZUxlZnQodXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5tb3ZlTGVmdCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZVJpZ2h0KHVzZXJuYW1lQW5kUm9vbSkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIubW92ZVJpZ2h0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVDdXJyZW50VGV0cm9taW5vKHVzZXJuYW1lQW5kUm9vbSkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIucm90YXRlKCk7XG59XG5cbmZ1bmN0aW9uIGdldFVzZXIocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9XG4gICAgICAgIGZpbmRHYW1lU2Vzc2lvbihyb29tKSB8fCBjcmVhdGVHYW1lU2Vzc2lvbihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpO1xuXG4gICAgY29uc3QgdXNlciA9IGZpbmRVc2VySW5TZXNzaW9uKHJvb20sIHVzZXJuYW1lKTtcblxuICAgIGlmICghdXNlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNlciBcIiR7dXNlcm5hbWV9XCIgbm90IGZvdW5kIGluIHNlc3Npb24sIGFkZGluZy4uLmApO1xuICAgICAgICByZXR1cm4gY3JlYXRlUGxheWVyKHNlc3Npb24sIHVzZXJuYW1lLCBzb2NrZXRJRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYFVzZXIgXCIke3VzZXJuYW1lfVwiIGlzIGFscmVhZHkgaW4gc2Vzc2lvbi5gKTtcbiAgICAgICAgdXNlci5zb2NrZXRJRCA9IHNvY2tldElEO1xuICAgICAgICBpbml0aWFsUGFja2FnZSh1c2VyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVVzZXJuYW1lKHNwbGl0KSB7XG4gICAgcmV0dXJuIHNwbGl0WzFdID8gc3BsaXRbMV0uc2xpY2UoMCwgc3BsaXRbMV0ubGVuZ3RoIC0gMSkgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqb2luVGV0cmlzKGhhc2gsIHNvY2tldElEKSB7XG4gICAgY29uc3Qgc3BsaXQgPSBoYXNoLnNwbGl0KFwiW1wiKTtcbiAgICBjb25zdCByb29tID0gc3BsaXRbMF0uc2xpY2UoMSk7XG4gICAgY29uc3QgdXNlcm5hbWUgPSBwYXJzZVVzZXJuYW1lKHNwbGl0KTtcblxuICAgIGNvbnNvbGUubG9nKFwiam9pblRldHJpcygpIGNhbGxlZFwiKTtcbiAgICBjb25zb2xlLmxvZyhgVXNlciBcIiR7dXNlcm5hbWV9XCIgdHJpZWQgdG8gY29ubmVjdCB0byByb29tOiBcIiR7cm9vbX1cImApO1xuICAgIGdldFVzZXIocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKTtcbn1cblxuZnVuY3Rpb24gcmVhZHlDaGVjayhzZXNzaW9uKSB7XG4gICAgcmV0dXJuIHNlc3Npb24ucGxheWVycy5zb21lKHVzZXIgPT4gIHVzZXIucmVhZHkpO1xufVxuXG5mdW5jdGlvbiBzdGFydEdhbWVGb3JBbGxVc2VycyhzZXNzaW9uLCkge1xuICAgIHNlc3Npb24ucGxheWVycy5tYXAoZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikgdXNlci5wbGF5KCk7XG4gICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgICAgZW1pdChcImdhbWVTdGFydGVkXCIsIFwiR0FNRV9TVEFSVEVEXCIsIHVzZXIuc29ja2V0SUQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRHYW1lKGNsaWVudERhdGEpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gZmluZEdhbWVTZXNzaW9uKGNsaWVudERhdGEucm9vbSk7XG4gICAgY29uc29sZS5sb2coXCJGdW5jdGlvbiByZXR1cm5zOiBcIiwgcmVhZHlDaGVjayhzZXNzaW9uKSk7XG4gICAgaWYgKHJlYWR5Q2hlY2soc2Vzc2lvbikgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm47XG4gICAgZWxzZVxuICAgICAgICBzdGFydEdhbWVGb3JBbGxVc2VycyhzZXNzaW9uKTtcbn1cblxuZnVuY3Rpb24gZW1pdFJlYWR5U3RhdGVzKHNlc3Npb24pIHtcbiAgICBzZXNzaW9uLnBsYXllcnMubWFwKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIGVtaXQoXCJyZWFkeVN0YXRlXCIsIHVzZXIucmVhZHksIHVzZXIuc29ja2V0SUQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlUmVhZHkoY2xpZW50RGF0YSkge1xuICAgIGNvbnN0IHVzZXIgPSBmaW5kVXNlckluU2Vzc2lvbihjbGllbnREYXRhLnJvb20sIGNsaWVudERhdGEudXNlcm5hbWUpO1xuICAgIGlmICh1c2VyLnJlYWR5KVxuICAgICAgICB1c2VyLnJlYWR5ID0gZmFsc2U7XG4gICAgZWxzZVxuICAgICAgICB1c2VyLnJlYWR5ID0gdHJ1ZTtcbiAgICBjb25zdCBzZXNzaW9uID0gZmluZEdhbWVTZXNzaW9uKGNsaWVudERhdGEucm9vbSk7XG4gICAgZW1pdFJlYWR5U3RhdGVzKHNlc3Npb24pO1xufSIsImNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZShcImF1dG8tYmluZFwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV0cm9taW5vIHtcbiAgICBjb25zdHJ1Y3RvcihzaGFwZSwgY29sb3IsIHBvc2l0aW9uLCByb3RhdGlvbkFycmF5KSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNoYXBlID0gc2hhcGU7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IFszLCAtNF07XG4gICAgICAgIHRoaXMucm90YXRpb25BcnJheSA9IHJvdGF0aW9uQXJyYXk7XG4gICAgfVxuXG4gICAgZHJhd1RldHJvbWlubyhwbGF5ZmllbGQpIHtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChjb2x1bW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSArIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFwZVtyb3ddW2NvbHVtbl1cbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSArIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgXSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZCkge1xuICAgICAgICBsZXQgcm93ID0gMDtcbiAgICAgICAgd2hpbGUgKHJvdyA8IDQpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA8IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICBdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXBlW3Jvd11bY29sdW1uXVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICBdID0gXCJncmF5XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVMZWZ0KHBsYXlmaWVsZCkge1xuICAgICAgICB0aGlzLmVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzBdIC09IDE7XG4gICAgICAgIGlmIChwbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcykpIHRoaXMucG9zaXRpb25bMF0gKz0gMTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgIH1cblxuICAgIG1vdmVSaWdodChwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSArPSAxO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKSB0aGlzLnBvc2l0aW9uWzBdIC09IDE7XG4gICAgICAgIHRoaXMuZHJhd1RldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICB9XG5cbiAgICByb3RhdGUocGxheWZpZWxkKSB7XG4gICAgICAgIHRoaXMuZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpID09PVxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkFycmF5Lmxlbmd0aCAtIDFcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5WzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSArIDFcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSkgdGhpcy5fd2FsbEtpY2socGxheWZpZWxkKTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgIH1cblxuICAgIF93YWxsS2ljayhwbGF5ZmllbGQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0gLSAxLCB0aGlzLnBvc2l0aW9uWzFdXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0gKyAxLCB0aGlzLnBvc2l0aW9uWzFdXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gLSAxXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gKyAxXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0gLSAyLCB0aGlzLnBvc2l0aW9uWzFdXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0gKyAyLCB0aGlzLnBvc2l0aW9uWzFdXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gLSAyXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gKyAyXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdW5yb3RhdGUoKTtcbiAgICB9XG5cbiAgICBfdW5yb3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbdGhpcy5yb3RhdGlvbkFycmF5Lmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSAtIDFcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdHJ5VGV0cm9taW5vUG9zaXRpb24ocG9zaXRpb24sIHBsYXlmaWVsZCkge1xuICAgICAgICBjb25zdCB0bXAgPSBbLi4udGhpcy5wb3NpdGlvbl07XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSA9IHBvc2l0aW9uWzBdO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdID0gcG9zaXRpb25bMV07XG4gICAgICAgIGlmIChwbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcykpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gPSB0bXBbMF07XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzFdID0gdG1wWzFdO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCBTcXVhcmUgPSBbXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXG5dO1xuXG5leHBvcnQgY29uc3QgTGluZSA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAxXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1cbl07XG5cbmV4cG9ydCBjb25zdCBUID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXVxuXTtcblxuZXhwb3J0IGNvbnN0IEwgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXG5dO1xuXG5leHBvcnQgY29uc3QgUmV2ZXJzZUwgPSBbXG4gICAgW1xuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXG5dO1xuXG5leHBvcnQgY29uc3QgUyA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1cbl07XG5cbmV4cG9ydCBjb25zdCBaID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXVxuXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF1dG8tYmluZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==