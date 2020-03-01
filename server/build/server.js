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
    this.host = false;
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
  emitHostStatus(thisPlayer);
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
  var session = findGameSession(room) || createGameSession(room, username);
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

function emitHostStatus(user) {
  Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])("isHost", user.session.host === user.name, user.socketID);
}

function joinTetris(hash, socketID) {
  var split = hash.split("[");
  var room = split[0].slice(1);
  var username = parseUsername(split);
  console.log("joinTetris() called");
  console.log("User \"".concat(username, "\" tried to connect to room: \"").concat(room, "\""));
  getUser(room, username, socketID);
  var user = findUserInSession(room, username);
  emitHostStatus(user);
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
  var playerStates = Array();
  session.players.forEach(function (user) {
    var readyState = {
      username: user.name,
      ready: user.ready
    };
    playerStates.push(readyState);
  });
  console.log(playerStates);
  session.players.forEach(function (user) {
    Object(_server__WEBPACK_IMPORTED_MODULE_0__["emit"])("readyState", playerStates, user.socketID);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGxheWVyLmpzIiwid2VicGFjazovLy8uL3BsYXlmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGV0cmlzLmpzIiwid2VicGFjazovLy8uL3RldHJvbWluby5qcyIsIndlYnBhY2s6Ly8vLi90ZXRyb21pbm9zLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF1dG8tYmluZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIl0sIm5hbWVzIjpbImF1dG9CaW5kIiwicmVxdWlyZSIsIlBsYXllciIsInNlc3Npb24iLCJwbGF5ZmllbGQiLCJQbGF5ZmllbGQiLCJjcmVhdGVQbGF5ZmllbGQiLCJuYW1lIiwiY3VycmVudFRldHJvbWlubyIsIm5leHRUZXRyb21pbm8iLCJuZXh0VGV0cm9taW5vSW5kZXgiLCJzb2NrZXRJRCIsInRldHJvbWlub3MiLCJpbnRlcnZhbCIsImdhbWVPdmVyIiwic2NvcmUiLCJ0b3RhbENsZWFyZWRMaW5lcyIsInJlYWR5IiwiaG9zdCIsImVyYXNlVGV0cm9taW5vIiwicG9zaXRpb24iLCJjb2xsaXNpb25EZXRlY3RlZCIsImRyYXdUZXRyb21pbm8iLCJlbWl0IiwiY2xlYXJlZExpbmVzIiwiY2xlYXJGaWxsZWRMaW5lcyIsImkiLCJkaXNhYmxlTGluZXMiLCJpbmNyZWFzZVNjb3JlIiwibmV3VGV0cm9taW5vIiwiZW1pdFBsYXlmaWVsZCIsImVtaXRUZXRyb21pbm8iLCJzZXRUaW1lb3V0IiwicGxheSIsImNvcHlUZXRyb21pbm8iLCJyb3RhdGUiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsInJvdyIsImxlbmd0aCIsImNvbHVtbiIsImRpc2FibGVkQ29sb3IiLCJzaGFwZSIsImRlZmF1bHRDb2xvciIsImxpbmUiLCJzb21lIiwiY2VsbCIsImN1cnJlbnRMaW5lSW5kZXgiLCJsYXN0Q2xlYXJhYmxlTGluZUluZGV4IiwibGluZUlzRmlsbGVkIiwiY2xlYXJMaW5lIiwiY29sbGFwc2VMaW5lcyIsImV4cHJlc3MiLCJhcHAiLCJzZXJ2ZXIiLCJTZXJ2ZXIiLCJpbyIsInBhdGgiLCJwb3J0IiwidXNlIiwiam9pbiIsIl9fZGlybmFtZSIsImdldCIsInJlcSIsInJlcyIsInNlbmRGaWxlIiwibGlzdGVuIiwib24iLCJjbGllbnQiLCJjb25zb2xlIiwibG9nIiwic3RyaW5nIiwiam9pblRldHJpcyIsImlkIiwidXNlcm5hbWVBbmRSb29tIiwicm90YXRlQ3VycmVudFRldHJvbWlubyIsInNldEdhbWVJbnRlcnZhbCIsImNsaWVudERhdGEiLCJzdGFydEdhbWUiLCJ0b2dnbGVSZWFkeSIsImV2ZW50IiwiYXJncyIsInRvIiwiY2FsbGJhY2siLCJBcnJheSIsIm1hcCIsImVtaXRFdmVudHMiLCJ0aGlzUGxheWVyIiwiZW1pdFNlc3Npb24iLCJpbml0aWFsUGFja2FnZSIsImVtaXRSZWFkeVN0YXRlcyIsImVtaXRIb3N0U3RhdHVzIiwiR2FtZVNlc3Npb24iLCJyb29tIiwiZ2FtZVN0YXRlIiwicGxheWVycyIsImNyZWF0ZVRldHJvbWlubyIsInB1c2giLCJ1c2VyIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJkaXNhYmxlTGluZSIsIlRldHJvbWlubyIsIkxpbmUiLCJMIiwiUmV2ZXJzZUwiLCJTcXVhcmUiLCJTIiwiWiIsIlQiLCJpbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInNlc3Npb25zIiwiZmluZEdhbWVTZXNzaW9uIiwiZmluZCIsImZpbmRVc2VySW5TZXNzaW9uIiwidXNlcm5hbWUiLCJ0ZXRyb21pbm8iLCJjb2xvciIsInJvdGF0aW9uQXJyYXkiLCJjcmVhdGVQbGF5ZXIiLCJwbGF5ZXIiLCJjcmVhdGVHYW1lU2Vzc2lvbiIsImdhbWVJbnRlcnZhbCIsImdldFVzZXIiLCJwYXJzZVVzZXJuYW1lIiwic3BsaXQiLCJzbGljZSIsInVuZGVmaW5lZCIsImhhc2giLCJyZWFkeUNoZWNrIiwiZXZlcnkiLCJzdGFydEdhbWVGb3JBbGxVc2VycyIsInBsYXllclN0YXRlcyIsInJlYWR5U3RhdGUiLCJpbmRleE9mIiwiX3dhbGxLaWNrIiwiX3RyeVRldHJvbWlub1Bvc2l0aW9uIiwiX3Vucm90YXRlIiwidG1wIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQU9BOztBQUNBLElBQU1BLFFBQVEsR0FBR0MsbUJBQU8sQ0FBQyw0QkFBRCxDQUF4Qjs7SUFFcUJDLE07OztBQUNqQixvQkFBYztBQUFBOztBQUNWRixZQUFRLENBQUMsSUFBRCxDQUFSO0FBQ0EsU0FBS0csT0FBTCxHQUFlLElBQWY7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLElB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LEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FESixFQUVJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUZKLEVBR0ksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBSEosRUFJSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FKSixDQVBhLEVBYWIsQ0FDSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FESixFQUVJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUZKLEVBR0ksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBSEosRUFJSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FKSixDQWJhLEVBbUJiLENBQ0ksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBREosRUFFSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FGSixFQUdJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUhKLEVBSUksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBSkosQ0FuQmEsQ0FBVixDOzs7Ozs7Ozs7OztBQ2hKUCxzQzs7Ozs7Ozs7Ozs7QUNBQSxvQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxzQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zZXJ2ZXIuanNcIik7XG4iLCJpbXBvcnQgeyBlbWl0IH0gZnJvbSBcIi4vc2VydmVyXCI7XG5pbXBvcnQge1xuICAgIGNvcHlUZXRyb21pbm8sXG4gICAgY3JlYXRlUGxheWZpZWxkLFxuICAgIGRpc2FibGVkQ29sb3IsXG4gICAgZW1pdFBsYXlmaWVsZCxcbiAgICBlbWl0VGV0cm9taW5vXG59IGZyb20gXCIuL3RldHJpc1wiO1xuaW1wb3J0IFBsYXlmaWVsZCBmcm9tIFwiLi9wbGF5ZmllbGRcIjtcbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZShcImF1dG8tYmluZFwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IG51bGw7XG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gbmV3IFBsYXlmaWVsZChjcmVhdGVQbGF5ZmllbGQoKSk7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiXCI7XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWlubyA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlubyA9IG51bGw7XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlub0luZGV4ID0gMDtcbiAgICAgICAgdGhpcy5zb2NrZXRJRCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRldHJvbWlub3MgPSBudWxsO1xuICAgICAgICB0aGlzLmludGVydmFsID0gMzAwO1xuICAgICAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLnRvdGFsQ2xlYXJlZExpbmVzID0gMDtcbiAgICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgIHRoaXMuaG9zdCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRUZXRyb21pbm8pIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5lcmFzZVRldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICs9IDE7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcy5jdXJyZW50VGV0cm9taW5vKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSAtPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5kcmF3VGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGVtaXQoXCJnYW1lT3ZlclwiLCBcIkdBTUVfRklOSVNIRURcIiwgdGhpcy5zb2NrZXRJRCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGNsZWFyZWRMaW5lcyA9IHRoaXMucGxheWZpZWxkLmNsZWFyRmlsbGVkTGluZXMoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWlub1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGVhcmVkTGluZXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlc3Npb24uZGlzYWJsZUxpbmVzKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmluY3JlYXNlU2NvcmUoY2xlYXJlZExpbmVzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1RldHJvbWlubygpO1xuICAgICAgICAgICAgICAgIGVtaXRQbGF5ZmllbGQodGhpcyk7XG4gICAgICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgICAgIHNldFRpbWVvdXQodGhpcy5wbGF5LCB0aGlzLmludGVydmFsKTtcbiAgICB9XG5cbiAgICBpbmNyZWFzZVNjb3JlKGNsZWFyZWRMaW5lcykge1xuICAgICAgICB0aGlzLnRvdGFsQ2xlYXJlZExpbmVzICs9IGNsZWFyZWRMaW5lcztcbiAgICAgICAgdGhpcy5zY29yZSArPSBjbGVhcmVkTGluZXMgKiAoMTAgKyAoY2xlYXJlZExpbmVzIC0gMSkpO1xuICAgICAgICBlbWl0KFwic2NvcmVcIiwgdGhpcy5zY29yZSwgdGhpcy5zb2NrZXRJRCk7XG4gICAgICAgIGVtaXQoXCJjbGVhcmVkTGluZXNcIiwgdGhpcy50b3RhbENsZWFyZWRMaW5lcywgdGhpcy5zb2NrZXRJRCk7XG4gICAgfVxuXG4gICAgbmV3VGV0cm9taW5vKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8gPSB0aGlzLm5leHRUZXRyb21pbm87XG4gICAgICAgIHRoaXMubmV4dFRldHJvbWlub0luZGV4Kys7XG4gICAgICAgIGlmICghdGhpcy5zZXNzaW9uLnRldHJvbWlub3NbdGhpcy5uZXh0VGV0cm9taW5vSW5kZXhdKVxuICAgICAgICAgICAgdGhpcy5zZXNzaW9uLm5ld1RldHJvbWlubygpO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm8gPSBjb3B5VGV0cm9taW5vKFxuICAgICAgICAgICAgdGhpcy5zZXNzaW9uLnRldHJvbWlub3NbdGhpcy5uZXh0VGV0cm9taW5vSW5kZXhdXG4gICAgICAgICk7XG4gICAgICAgIGVtaXQoXCJuZXh0VGV0cm9taW5vXCIsIHRoaXMubmV4dFRldHJvbWlubywgdGhpcy5zb2NrZXRJRCk7XG4gICAgfVxuXG4gICAgcm90YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lT3ZlcikgcmV0dXJuO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucm90YXRlKHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdFRldHJvbWlubyh0aGlzKTtcbiAgICB9XG5cbiAgICBtb3ZlTGVmdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU92ZXIpIHJldHVybjtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLm1vdmVMZWZ0KHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdFRldHJvbWlubyh0aGlzKTtcbiAgICB9XG5cbiAgICBtb3ZlUmlnaHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVPdmVyKSByZXR1cm47XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5tb3ZlUmlnaHQodGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgIH1cblxuICAgIGRpc2FibGVMaW5lKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5wbGF5ZmllbGQucGxheWZpZWxkLmxlbmd0aCAtIDE7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGRbcm93XVtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uXG4gICAgICAgICAgICAgICAgXSA9IHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZFtyb3cgKyAxXVtjb2x1bW5dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQucGxheWZpZWxkW3RoaXMucGxheWZpZWxkLnBsYXlmaWVsZC5sZW5ndGggLSAxXVtcbiAgICAgICAgICAgICAgICBjb2x1bW5cbiAgICAgICAgICAgIF0gPSBkaXNhYmxlZENvbG9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSAtPSAxO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICBlbWl0UGxheWZpZWxkKHRoaXMpO1xuICAgIH1cbn1cbiIsImltcG9ydCBhdXRvQmluZCBmcm9tIFwiYXV0by1iaW5kXCI7XG5pbXBvcnQgeyBkZWZhdWx0Q29sb3IsIGRpc2FibGVkQ29sb3IgfSBmcm9tIFwiLi90ZXRyaXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWZpZWxkIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZmllbGQpIHtcbiAgICAgICAgYXV0b0JpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucGxheWZpZWxkID0gcGxheWZpZWxkO1xuICAgIH1cblxuICAgIGNvbGxpc2lvbkRldGVjdGVkKGN1cnJlbnRUZXRyb21pbm8pIHtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChjb2x1bW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUZXRyb21pbm8uc2hhcGVbcm93XVtjb2x1bW5dKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLmxlbmd0aCAtIDEgPFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3cgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkWzBdLmxlbmd0aCAtIDEgPFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMF0gKyBjb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uIDwgMCkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkW2N1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3ddW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gKyByb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uXSAhPT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdENvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJvdyArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsaW5lSXNGaWxsZWQobGluZSkge1xuICAgICAgICByZXR1cm4gIWxpbmUuc29tZShcbiAgICAgICAgICAgIGNlbGwgPT4gY2VsbCA9PT0gZGVmYXVsdENvbG9yIHx8IGNlbGwgPT09IGRpc2FibGVkQ29sb3JcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBjbGVhckxpbmUobGluZSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxpbmVbaV0gPSBkZWZhdWx0Q29sb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2xsYXBzZUxpbmVzKGkpIHtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gaTsgcm93ID4gMDsgcm93LS0pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IDEwOyBjb2x1bW4rKykge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWZpZWxkW3Jvd11bY29sdW1uXSA9IHRoaXMucGxheWZpZWxkW3JvdyAtIDFdW2NvbHVtbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckZpbGxlZExpbmVzKGN1cnJlbnRUZXRyb21pbm8pIHtcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lSW5kZXggPSBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdO1xuICAgICAgICBjb25zdCBsYXN0Q2xlYXJhYmxlTGluZUluZGV4ID0gY3VycmVudExpbmVJbmRleCArIDQ7XG4gICAgICAgIGxldCBjbGVhcmVkTGluZXMgPSAwO1xuXG4gICAgICAgIHdoaWxlIChjdXJyZW50TGluZUluZGV4IDwgbGFzdENsZWFyYWJsZUxpbmVJbmRleCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkW2N1cnJlbnRMaW5lSW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGluZUlzRmlsbGVkKHRoaXMucGxheWZpZWxkW2N1cnJlbnRMaW5lSW5kZXhdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyTGluZSh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VMaW5lcyhjdXJyZW50TGluZUluZGV4LCB0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyZWRMaW5lcysrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRMaW5lSW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xlYXJlZExpbmVzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7XG4gICAgam9pblRldHJpcyxcbiAgICBtb3ZlTGVmdCxcbiAgICBtb3ZlUmlnaHQsXG4gICAgcm90YXRlQ3VycmVudFRldHJvbWlubyxcbiAgICBzZXRHYW1lSW50ZXJ2YWwsXG4gICAgc3RhcnRHYW1lLFxuICAgIHRvZ2dsZVJlYWR5XG59IGZyb20gXCIuL3RldHJpc1wiO1xuXG5jb25zdCBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG5jb25zdCBzZXJ2ZXIgPSByZXF1aXJlKFwiaHR0cFwiKS5TZXJ2ZXIoYXBwKTtcbmNvbnN0IGlvID0gcmVxdWlyZShcInNvY2tldC5pb1wiKShzZXJ2ZXIpO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5cbmNvbnN0IHBvcnQgPSA4MDgwO1xuXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi4vLi4vY2xpZW50L2J1aWxkXCIpKSk7XG5hcHAuZ2V0KFwiL1wiLCBmdW5jdGlvbihyZXEsIHJlcykge1xuICAgIHJlcy5zZW5kRmlsZShwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uL2NsaWVudC9idWlsZFwiLCBcImluZGV4Lmh0bWxcIikpO1xufSk7XG5cbnNlcnZlci5saXN0ZW4ocG9ydCk7XG5cbmV4cG9ydCBsZXQgaW50ZXJ2YWwgPSAzMDA7XG5cbmlvLm9uKFwiY29ubmVjdGlvblwiLCBjbGllbnQgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiXFxuQ29ubmVjdGlvbiBoYXBwZW5lZC5cIik7XG4gICAgY2xpZW50Lm9uKFwiSGFzaFwiLCBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgICAgam9pblRldHJpcyhzdHJpbmcsIGNsaWVudC5pZCk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKFwiQXJyb3dVcFwiLCB1c2VybmFtZUFuZFJvb20gPT4ge1xuICAgICAgICByb3RhdGVDdXJyZW50VGV0cm9taW5vKHVzZXJuYW1lQW5kUm9vbSk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKFwiQXJyb3dEb3duXCIsIHVzZXJuYW1lQW5kUm9vbSA9PiB7XG4gICAgICAgIHNldEdhbWVJbnRlcnZhbCh1c2VybmFtZUFuZFJvb20sIDUwKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oXCJBcnJvd0Rvd25VbnByZXNzZWRcIiwgdXNlcm5hbWVBbmRSb29tID0+IHtcbiAgICAgICAgc2V0R2FtZUludGVydmFsKHVzZXJuYW1lQW5kUm9vbSwgMzAwKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oXCJBcnJvd0xlZnRcIiwgdXNlcm5hbWVBbmRSb29tID0+IHtcbiAgICAgICAgbW92ZUxlZnQodXNlcm5hbWVBbmRSb29tKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oXCJBcnJvd1JpZ2h0XCIsIHVzZXJuYW1lQW5kUm9vbSA9PiB7XG4gICAgICAgIG1vdmVSaWdodCh1c2VybmFtZUFuZFJvb20pO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbihcInN0YXJ0R2FtZVwiLCBjbGllbnREYXRhID0+IHtcbiAgICAgICBzdGFydEdhbWUoY2xpZW50RGF0YSk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKFwicmVhZHlDaGVja1wiLCBjbGllbnREYXRhID0+IHtcbiAgICAgICAgdG9nZ2xlUmVhZHkoY2xpZW50RGF0YSk7XG4gICAgfSk7XG59KTtcblxuZXhwb3J0IGNvbnN0IGVtaXQgPSAoZXZlbnQsIGFyZ3MsIHNvY2tldElEKSA9PiB7XG4gICAgaW8udG8oYCR7c29ja2V0SUR9YCkuZW1pdChldmVudCwgYXJncyk7XG59O1xuXG5jb25zdCBvbiA9IChldmVudCwgY2FsbGJhY2ssIGVtaXQpID0+IHt9O1xuIiwiaW1wb3J0IHsgZW1pdCwgaW50ZXJ2YWwgfSBmcm9tIFwiLi9zZXJ2ZXJcIjtcbmltcG9ydCBUZXRyb21pbm8gZnJvbSBcIi4vdGV0cm9taW5vXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgTCwgTGluZSwgUmV2ZXJzZUwsIFMsIFNxdWFyZSwgVCwgWiB9IGZyb20gXCIuL3RldHJvbWlub3NcIjtcblxuY29uc3QgYXV0b0JpbmQgPSByZXF1aXJlKFwiYXV0by1iaW5kXCIpO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdENvbG9yID0gXCJncmF5XCI7XG5leHBvcnQgY29uc3QgZGlzYWJsZWRDb2xvciA9IFwicGlua1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxheWZpZWxkKCkge1xuICAgIHJldHVybiBbLi4ubmV3IEFycmF5KDIwKV0ubWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIFsuLi5uZXcgQXJyYXkoMTApXS5tYXAoKCkgPT4gZGVmYXVsdENvbG9yKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRFdmVudHModGhpc1BsYXllcikge1xuICAgIGVtaXQoXCJwbGF5ZmllbGRcIiwgdGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzUGxheWVyLnNvY2tldElEKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRQbGF5ZmllbGQodGhpc1BsYXllcikge1xuICAgIHRoaXNQbGF5ZXIuY3VycmVudFRldHJvbWluby5lcmFzZVRldHJvbWlubyh0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgIGVtaXQoXCJwbGF5ZmllbGRcIiwgdGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzUGxheWVyLnNvY2tldElEKTtcbiAgICB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzUGxheWVyLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW1pdFRldHJvbWlubyh0aGlzUGxheWVyKSB7XG4gICAgZW1pdChcInRldHJvbWlub1wiLCB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8sIHRoaXNQbGF5ZXIuc29ja2V0SUQpO1xufVxuXG5mdW5jdGlvbiBlbWl0U2Vzc2lvbih0aGlzUGxheWVyKSB7fVxuXG5mdW5jdGlvbiBpbml0aWFsUGFja2FnZSh0aGlzUGxheWVyKSB7XG4gICAgZW1pdFBsYXlmaWVsZCh0aGlzUGxheWVyKTtcbiAgICBlbWl0VGV0cm9taW5vKHRoaXNQbGF5ZXIpO1xuICAgIGVtaXRSZWFkeVN0YXRlcyh0aGlzUGxheWVyLnNlc3Npb24pO1xuICAgIGVtaXRIb3N0U3RhdHVzKHRoaXNQbGF5ZXIpO1xufVxuXG5jbGFzcyBHYW1lU2Vzc2lvbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnJvb20gPSBcIlwiO1xuICAgICAgICB0aGlzLmhvc3QgPSBcIlwiO1xuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IFwiU1RBUlRJTkdfU0NSRUVOXCI7XG4gICAgICAgIHRoaXMucGxheWVycyA9IEFycmF5KCk7XG4gICAgICAgIHRoaXMudGV0cm9taW5vcyA9IEFycmF5KGNyZWF0ZVRldHJvbWlubygpLCBjcmVhdGVUZXRyb21pbm8oKSk7XG4gICAgfVxuXG4gICAgbmV3VGV0cm9taW5vKCkge1xuICAgICAgICB0aGlzLnRldHJvbWlub3MucHVzaChjcmVhdGVUZXRyb21pbm8oKSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZUxpbmVzKHVzZXIpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdXNlcikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZGlzYWJsZUxpbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jb25zdCB0ZXRyb21pbm9zID0gW1xuICAgIG5ldyBUZXRyb21pbm8oTGluZVswXSwgXCJjeWFuXCIsIFs1LCAtMl0sIExpbmUpLFxuICAgIG5ldyBUZXRyb21pbm8oTFswXSwgXCJvcmFuZ2VcIiwgWzUsIC0yXSwgTCksXG4gICAgbmV3IFRldHJvbWlubyhSZXZlcnNlTFswXSwgXCJibHVlXCIsIFs1LCAtMl0sIFJldmVyc2VMKSxcbiAgICBuZXcgVGV0cm9taW5vKFNxdWFyZVswXSwgXCJ5ZWxsb3dcIiwgWzUsIC0yXSwgU3F1YXJlKSxcbiAgICBuZXcgVGV0cm9taW5vKFNbMF0sIFwiZ3JlZW5cIiwgWzUsIC0yXSwgUyksXG4gICAgbmV3IFRldHJvbWlubyhaWzBdLCBcInJlZFwiLCBbNSwgLTJdLCBaKSxcbiAgICBuZXcgVGV0cm9taW5vKFRbMF0sIFwicHVycGxlXCIsIFs1LCAtMl0sIFQpXG5dO1xuXG5mdW5jdGlvbiBjcmVhdGVUZXRyb21pbm8oKSB7XG4gICAgY29uc3QgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0ZXRyb21pbm9zLmxlbmd0aCk7XG5cbiAgICByZXR1cm4gdGV0cm9taW5vc1tpbmRleF07XG59XG5cbmNvbnN0IHNlc3Npb25zID0gQXJyYXkoKTtcblxuZnVuY3Rpb24gZmluZEdhbWVTZXNzaW9uKHJvb20pIHtcbiAgICByZXR1cm4gc2Vzc2lvbnMuZmluZChlbGVtZW50ID0+IGVsZW1lbnQucm9vbSA9PT0gcm9vbSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRVc2VySW5TZXNzaW9uKHJvb20sIHVzZXJuYW1lKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGZpbmRHYW1lU2Vzc2lvbihyb29tKTtcbiAgICBpZiAoIXNlc3Npb24pIHJldHVybjtcblxuICAgIHJldHVybiBzZXNzaW9uLnBsYXllcnMuZmluZCh1c2VyID0+IHVzZXIubmFtZSA9PT0gdXNlcm5hbWUpO1xufVxuXG5leHBvcnQgY29uc3QgY29weVRldHJvbWlubyA9IHRldHJvbWlubyA9PiB7XG4gICAgcmV0dXJuIG5ldyBUZXRyb21pbm8oXG4gICAgICAgIHRldHJvbWluby5zaGFwZSxcbiAgICAgICAgdGV0cm9taW5vLmNvbG9yLFxuICAgICAgICBbMCwgLTFdLFxuICAgICAgICB0ZXRyb21pbm8ucm90YXRpb25BcnJheVxuICAgICk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXIoc2Vzc2lvbiwgbmFtZSwgc29ja2V0SUQpIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gICAgcGxheWVyLnNlc3Npb24gPSBzZXNzaW9uO1xuICAgIHBsYXllci5uYW1lID0gbmFtZTtcbiAgICBwbGF5ZXIuc29ja2V0SUQgPSBzb2NrZXRJRDtcbiAgICBzZXNzaW9uLnBsYXllcnMucHVzaChwbGF5ZXIpO1xuICAgIHBsYXllci5jdXJyZW50VGV0cm9taW5vID0gY29weVRldHJvbWlubyhzZXNzaW9uLnRldHJvbWlub3NbMF0pO1xuICAgIHBsYXllci5uZXh0VGV0cm9taW5vID0gY29weVRldHJvbWlubyhzZXNzaW9uLnRldHJvbWlub3NbMV0pO1xuICAgIHJldHVybiBwbGF5ZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUdhbWVTZXNzaW9uKHJvb20sIGhvc3QpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gbmV3IEdhbWVTZXNzaW9uKCk7XG4gICAgc2Vzc2lvbi5yb29tID0gcm9vbTtcbiAgICBzZXNzaW9uLmhvc3QgPSBob3N0O1xuICAgIHNlc3Npb25zLnB1c2goc2Vzc2lvbik7XG5cbiAgICByZXR1cm4gc2Vzc2lvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdhbWVJbnRlcnZhbCh1c2VybmFtZUFuZFJvb20sIGdhbWVJbnRlcnZhbCkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIuaW50ZXJ2YWwgPSBnYW1lSW50ZXJ2YWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlTGVmdCh1c2VybmFtZUFuZFJvb20pIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XG4gICAgcGxheWVyLm1vdmVMZWZ0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlUmlnaHQodXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5tb3ZlUmlnaHQoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdGF0ZUN1cnJlbnRUZXRyb21pbm8odXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5yb3RhdGUoKTtcbn1cblxuZnVuY3Rpb24gZ2V0VXNlcihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpIHtcbiAgICBjb25zdCBzZXNzaW9uID1cbiAgICAgICAgZmluZEdhbWVTZXNzaW9uKHJvb20pIHx8IGNyZWF0ZUdhbWVTZXNzaW9uKHJvb20sIHVzZXJuYW1lKTtcblxuICAgIGNvbnN0IHVzZXIgPSBmaW5kVXNlckluU2Vzc2lvbihyb29tLCB1c2VybmFtZSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFVzZXIgXCIke3VzZXJuYW1lfVwiIG5vdCBmb3VuZCBpbiBzZXNzaW9uLCBhZGRpbmcuLi5gKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVBsYXllcihzZXNzaW9uLCB1c2VybmFtZSwgc29ja2V0SUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiBpcyBhbHJlYWR5IGluIHNlc3Npb24uYCk7XG4gICAgICAgIHVzZXIuc29ja2V0SUQgPSBzb2NrZXRJRDtcbiAgICAgICAgaW5pdGlhbFBhY2thZ2UodXNlcik7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVc2VybmFtZShzcGxpdCkge1xuICAgIHJldHVybiBzcGxpdFsxXSA/IHNwbGl0WzFdLnNsaWNlKDAsIHNwbGl0WzFdLmxlbmd0aCAtIDEpIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBlbWl0SG9zdFN0YXR1cyh1c2VyKSB7XG4gICAgZW1pdChcImlzSG9zdFwiLCB1c2VyLnNlc3Npb24uaG9zdCA9PT0gdXNlci5uYW1lLCB1c2VyLnNvY2tldElEKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gam9pblRldHJpcyhoYXNoLCBzb2NrZXRJRCkge1xuICAgIGNvbnN0IHNwbGl0ID0gaGFzaC5zcGxpdChcIltcIik7XG4gICAgY29uc3Qgcm9vbSA9IHNwbGl0WzBdLnNsaWNlKDEpO1xuICAgIGNvbnN0IHVzZXJuYW1lID0gcGFyc2VVc2VybmFtZShzcGxpdCk7XG5cbiAgICBjb25zb2xlLmxvZyhcImpvaW5UZXRyaXMoKSBjYWxsZWRcIik7XG4gICAgY29uc29sZS5sb2coYFVzZXIgXCIke3VzZXJuYW1lfVwiIHRyaWVkIHRvIGNvbm5lY3QgdG8gcm9vbTogXCIke3Jvb219XCJgKTtcbiAgICBnZXRVc2VyKHJvb20sIHVzZXJuYW1lLCBzb2NrZXRJRCk7XG5cbiAgICBjb25zdCB1c2VyID0gZmluZFVzZXJJblNlc3Npb24ocm9vbSwgdXNlcm5hbWUpO1xuICAgIGVtaXRIb3N0U3RhdHVzKHVzZXIpO1xufVxuXG5mdW5jdGlvbiByZWFkeUNoZWNrKHNlc3Npb24pIHtcbiAgICByZXR1cm4gc2Vzc2lvbi5wbGF5ZXJzLmV2ZXJ5KHVzZXIgPT4gIHVzZXIucmVhZHkpO1xufVxuXG5mdW5jdGlvbiBzdGFydEdhbWVGb3JBbGxVc2VycyhzZXNzaW9uLCkge1xuICAgIHNlc3Npb24ucGxheWVycy5tYXAoZnVuY3Rpb24gKHVzZXIpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodXNlcikgdXNlci5wbGF5KCk7XG4gICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgICAgZW1pdChcImdhbWVTdGFydGVkXCIsIFwiR0FNRV9TVEFSVEVEXCIsIHVzZXIuc29ja2V0SUQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRHYW1lKGNsaWVudERhdGEpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gZmluZEdhbWVTZXNzaW9uKGNsaWVudERhdGEucm9vbSk7XG4gICAgY29uc29sZS5sb2coXCJGdW5jdGlvbiByZXR1cm5zOiBcIiwgcmVhZHlDaGVjayhzZXNzaW9uKSk7XG4gICAgaWYgKHJlYWR5Q2hlY2soc2Vzc2lvbikgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm47XG4gICAgZWxzZVxuICAgICAgICBzdGFydEdhbWVGb3JBbGxVc2VycyhzZXNzaW9uKTtcbn1cblxuZnVuY3Rpb24gZW1pdFJlYWR5U3RhdGVzKHNlc3Npb24pIHtcbiAgICBjb25zdCBwbGF5ZXJTdGF0ZXMgPSBBcnJheSgpO1xuICAgIHNlc3Npb24ucGxheWVycy5mb3JFYWNoKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIGNvbnN0IHJlYWR5U3RhdGUgPSB7XG4gICAgICAgICAgICB1c2VybmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgICAgcmVhZHk6IHVzZXIucmVhZHlcbiAgICAgICAgfTtcbiAgICAgICAgcGxheWVyU3RhdGVzLnB1c2gocmVhZHlTdGF0ZSk7XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2cocGxheWVyU3RhdGVzKTtcbiAgICBzZXNzaW9uLnBsYXllcnMuZm9yRWFjaChmdW5jdGlvbiAodXNlcikge1xuICAgICAgICBlbWl0KFwicmVhZHlTdGF0ZVwiLCBwbGF5ZXJTdGF0ZXMsIHVzZXIuc29ja2V0SUQpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlUmVhZHkoY2xpZW50RGF0YSkge1xuICAgIGNvbnN0IHVzZXIgPSBmaW5kVXNlckluU2Vzc2lvbihjbGllbnREYXRhLnJvb20sIGNsaWVudERhdGEudXNlcm5hbWUpO1xuICAgIGlmICh1c2VyLnJlYWR5KVxuICAgICAgICB1c2VyLnJlYWR5ID0gZmFsc2U7XG4gICAgZWxzZVxuICAgICAgICB1c2VyLnJlYWR5ID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZyh1c2VyLnJlYWR5KTtcbiAgICBjb25zdCBzZXNzaW9uID0gZmluZEdhbWVTZXNzaW9uKGNsaWVudERhdGEucm9vbSk7XG4gICAgZW1pdFJlYWR5U3RhdGVzKHNlc3Npb24pO1xufSIsImNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZShcImF1dG8tYmluZFwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV0cm9taW5vIHtcbiAgICBjb25zdHJ1Y3RvcihzaGFwZSwgY29sb3IsIHBvc2l0aW9uLCByb3RhdGlvbkFycmF5KSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNoYXBlID0gc2hhcGU7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IFszLCAtNF07XG4gICAgICAgIHRoaXMucm90YXRpb25BcnJheSA9IHJvdGF0aW9uQXJyYXk7XG4gICAgfVxuXG4gICAgZHJhd1RldHJvbWlubyhwbGF5ZmllbGQpIHtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChjb2x1bW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSArIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFwZVtyb3ddW2NvbHVtbl1cbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSArIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgXSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZCkge1xuICAgICAgICBsZXQgcm93ID0gMDtcbiAgICAgICAgd2hpbGUgKHJvdyA8IDQpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGNvbHVtbiA8IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICBdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXBlW3Jvd11bY29sdW1uXVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdICsgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICBdID0gXCJncmF5XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVMZWZ0KHBsYXlmaWVsZCkge1xuICAgICAgICB0aGlzLmVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzBdIC09IDE7XG4gICAgICAgIGlmIChwbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcykpIHRoaXMucG9zaXRpb25bMF0gKz0gMTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgIH1cblxuICAgIG1vdmVSaWdodChwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSArPSAxO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKSB0aGlzLnBvc2l0aW9uWzBdIC09IDE7XG4gICAgICAgIHRoaXMuZHJhd1RldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICB9XG5cbiAgICByb3RhdGUocGxheWZpZWxkKSB7XG4gICAgICAgIHRoaXMuZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMucm90YXRpb25BcnJheS5pbmRleE9mKHRoaXMuc2hhcGUpID09PVxuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkFycmF5Lmxlbmd0aCAtIDFcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5WzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSArIDFcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSkgdGhpcy5fd2FsbEtpY2socGxheWZpZWxkKTtcbiAgICAgICAgdGhpcy5kcmF3VGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgIH1cblxuICAgIF93YWxsS2ljayhwbGF5ZmllbGQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0gLSAxLCB0aGlzLnBvc2l0aW9uWzFdXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0gKyAxLCB0aGlzLnBvc2l0aW9uWzFdXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gLSAxXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gKyAxXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0gLSAyLCB0aGlzLnBvc2l0aW9uWzFdXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0gKyAyLCB0aGlzLnBvc2l0aW9uWzFdXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gLSAyXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5fdHJ5VGV0cm9taW5vUG9zaXRpb24oXG4gICAgICAgICAgICAgICAgW3RoaXMucG9zaXRpb25bMF0sIHRoaXMucG9zaXRpb25bMV0gKyAyXSxcbiAgICAgICAgICAgICAgICBwbGF5ZmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdW5yb3RhdGUoKTtcbiAgICB9XG5cbiAgICBfdW5yb3RhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbdGhpcy5yb3RhdGlvbkFycmF5Lmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSAtIDFcbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfdHJ5VGV0cm9taW5vUG9zaXRpb24ocG9zaXRpb24sIHBsYXlmaWVsZCkge1xuICAgICAgICBjb25zdCB0bXAgPSBbLi4udGhpcy5wb3NpdGlvbl07XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSA9IHBvc2l0aW9uWzBdO1xuICAgICAgICB0aGlzLnBvc2l0aW9uWzFdID0gcG9zaXRpb25bMV07XG4gICAgICAgIGlmIChwbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcykpIHtcbiAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gPSB0bXBbMF07XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzFdID0gdG1wWzFdO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCBTcXVhcmUgPSBbXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXG5dO1xuXG5leHBvcnQgY29uc3QgTGluZSA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAxXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1cbl07XG5cbmV4cG9ydCBjb25zdCBUID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXVxuXTtcblxuZXhwb3J0IGNvbnN0IEwgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXG5dO1xuXG5leHBvcnQgY29uc3QgUmV2ZXJzZUwgPSBbXG4gICAgW1xuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXG5dO1xuXG5leHBvcnQgY29uc3QgUyA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1cbl07XG5cbmV4cG9ydCBjb25zdCBaID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXVxuXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF1dG8tYmluZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==