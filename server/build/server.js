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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGxheWVyLmpzIiwid2VicGFjazovLy8uL3BsYXlmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGV0cmlzLmpzIiwid2VicGFjazovLy8uL3RldHJvbWluby5qcyIsIndlYnBhY2s6Ly8vLi90ZXRyb21pbm9zLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImF1dG8tYmluZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvY2tldC5pb1wiIl0sIm5hbWVzIjpbImF1dG9CaW5kIiwicmVxdWlyZSIsIlBsYXllciIsInNlc3Npb24iLCJwbGF5ZmllbGQiLCJQbGF5ZmllbGQiLCJjcmVhdGVQbGF5ZmllbGQiLCJuYW1lIiwiY3VycmVudFRldHJvbWlubyIsIm5leHRUZXRyb21pbm8iLCJuZXh0VGV0cm9taW5vSW5kZXgiLCJzb2NrZXRJRCIsInRldHJvbWlub3MiLCJpbnRlcnZhbCIsImdhbWVPdmVyIiwic2NvcmUiLCJ0b3RhbENsZWFyZWRMaW5lcyIsInJlYWR5IiwiaG9zdCIsImVyYXNlVGV0cm9taW5vIiwicG9zaXRpb24iLCJjb2xsaXNpb25EZXRlY3RlZCIsImRyYXdUZXRyb21pbm8iLCJlbWl0IiwiY2xlYXJlZExpbmVzIiwiY2xlYXJGaWxsZWRMaW5lcyIsImkiLCJkaXNhYmxlTGluZXMiLCJpbmNyZWFzZVNjb3JlIiwibmV3VGV0cm9taW5vIiwiZW1pdFBsYXlmaWVsZCIsImVtaXRUZXRyb21pbm8iLCJzZXRUaW1lb3V0IiwicGxheSIsImNvcHlUZXRyb21pbm8iLCJyb3RhdGUiLCJtb3ZlTGVmdCIsIm1vdmVSaWdodCIsInJvdyIsImxlbmd0aCIsImNvbHVtbiIsImRpc2FibGVkQ29sb3IiLCJzaGFwZSIsImRlZmF1bHRDb2xvciIsImxpbmUiLCJzb21lIiwiY2VsbCIsImN1cnJlbnRMaW5lSW5kZXgiLCJsYXN0Q2xlYXJhYmxlTGluZUluZGV4IiwibGluZUlzRmlsbGVkIiwiY2xlYXJMaW5lIiwiY29sbGFwc2VMaW5lcyIsImV4cHJlc3MiLCJhcHAiLCJzZXJ2ZXIiLCJTZXJ2ZXIiLCJpbyIsInBhdGgiLCJwb3J0IiwidXNlIiwiam9pbiIsIl9fZGlybmFtZSIsImdldCIsInJlcSIsInJlcyIsInNlbmRGaWxlIiwibGlzdGVuIiwib24iLCJjbGllbnQiLCJjb25zb2xlIiwibG9nIiwic3RyaW5nIiwiam9pblRldHJpcyIsImlkIiwidXNlcm5hbWVBbmRSb29tIiwicm90YXRlQ3VycmVudFRldHJvbWlubyIsInNldEdhbWVJbnRlcnZhbCIsImNsaWVudERhdGEiLCJzdGFydEdhbWUiLCJ0b2dnbGVSZWFkeSIsImV2ZW50IiwiYXJncyIsInRvIiwiY2FsbGJhY2siLCJBcnJheSIsIm1hcCIsImVtaXRFdmVudHMiLCJ0aGlzUGxheWVyIiwiZW1pdFNlc3Npb24iLCJpbml0aWFsUGFja2FnZSIsImVtaXRSZWFkeVN0YXRlcyIsImVtaXRIb3N0U3RhdHVzIiwiR2FtZVNlc3Npb24iLCJyb29tIiwiZ2FtZVN0YXRlIiwicGxheWVycyIsImNyZWF0ZVRldHJvbWlubyIsInB1c2giLCJ1c2VyIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJkaXNhYmxlTGluZSIsIlRldHJvbWlubyIsIkxpbmUiLCJMIiwiUmV2ZXJzZUwiLCJTcXVhcmUiLCJTIiwiWiIsIlQiLCJpbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInNlc3Npb25zIiwiZmluZEdhbWVTZXNzaW9uIiwiZmluZCIsImZpbmRVc2VySW5TZXNzaW9uIiwidXNlcm5hbWUiLCJ0ZXRyb21pbm8iLCJjb2xvciIsInJvdGF0aW9uQXJyYXkiLCJjcmVhdGVQbGF5ZXIiLCJwbGF5ZXIiLCJjcmVhdGVHYW1lU2Vzc2lvbiIsImdhbWVJbnRlcnZhbCIsImdldFVzZXIiLCJwYXJzZVVzZXJuYW1lIiwic3BsaXQiLCJzbGljZSIsInVuZGVmaW5lZCIsImhhc2giLCJyZWFkeUNoZWNrIiwiZXZlcnkiLCJzdGFydEdhbWVGb3JBbGxVc2VycyIsImluZGV4T2YiLCJfd2FsbEtpY2siLCJfdHJ5VGV0cm9taW5vUG9zaXRpb24iLCJfdW5yb3RhdGUiLCJ0bXAiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBT0E7O0FBQ0EsSUFBTUEsUUFBUSxHQUFHQyxtQkFBTyxDQUFDLDRCQUFELENBQXhCOztJQUVxQkMsTTs7O0FBQ2pCLG9CQUFjO0FBQUE7O0FBQ1ZGLFlBQVEsQ0FBQyxJQUFELENBQVI7QUFDQSxTQUFLRyxPQUFMLEdBQWUsSUFBZjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsSUFBSUMsa0RBQUosQ0FBY0MsK0RBQWUsRUFBN0Is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RCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUhKLEVBSUksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBSkosQ0FiYSxFQW1CYixDQUNJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQURKLEVBRUksQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUFWLENBRkosRUFHSSxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FISixFQUlJLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUpKLENBbkJhLENBQVYsQzs7Ozs7Ozs7Ozs7QUNoSlAsc0M7Ozs7Ozs7Ozs7O0FDQUEsb0M7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsc0MiLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2VydmVyLmpzXCIpO1xuIiwiaW1wb3J0IHsgZW1pdCB9IGZyb20gXCIuL3NlcnZlclwiO1xuaW1wb3J0IHtcbiAgICBjb3B5VGV0cm9taW5vLFxuICAgIGNyZWF0ZVBsYXlmaWVsZCxcbiAgICBkaXNhYmxlZENvbG9yLFxuICAgIGVtaXRQbGF5ZmllbGQsXG4gICAgZW1pdFRldHJvbWlub1xufSBmcm9tIFwiLi90ZXRyaXNcIjtcbmltcG9ydCBQbGF5ZmllbGQgZnJvbSBcIi4vcGxheWZpZWxkXCI7XG5jb25zdCBhdXRvQmluZCA9IHJlcXVpcmUoXCJhdXRvLWJpbmRcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNlc3Npb24gPSBudWxsO1xuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IG5ldyBQbGF5ZmllbGQoY3JlYXRlUGxheWZpZWxkKCkpO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8gPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm8gPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm9JbmRleCA9IDA7XG4gICAgICAgIHRoaXMuc29ja2V0SUQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDMwMDtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy50b3RhbENsZWFyZWRMaW5lcyA9IDA7XG4gICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmhvc3QgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50VGV0cm9taW5vKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArPSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMuY3VycmVudFRldHJvbWlubykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gLT0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8uZHJhd1RldHJvbWlubyh0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBlbWl0KFwiZ2FtZU92ZXJcIiwgXCJHQU1FX0ZJTklTSEVEXCIsIHRoaXMuc29ja2V0SUQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBjbGVhcmVkTGluZXMgPSB0aGlzLnBsYXlmaWVsZC5jbGVhckZpbGxlZExpbmVzKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm9cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xlYXJlZExpbmVzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uLmRpc2FibGVMaW5lcyh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNyZWFzZVNjb3JlKGNsZWFyZWRMaW5lcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXdUZXRyb21pbm8oKTtcbiAgICAgICAgICAgICAgICBlbWl0UGxheWZpZWxkKHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbWl0VGV0cm9taW5vKHRoaXMpO1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMucGxheSwgdGhpcy5pbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgaW5jcmVhc2VTY29yZShjbGVhcmVkTGluZXMpIHtcbiAgICAgICAgdGhpcy50b3RhbENsZWFyZWRMaW5lcyArPSBjbGVhcmVkTGluZXM7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gY2xlYXJlZExpbmVzICogKDEwICsgKGNsZWFyZWRMaW5lcyAtIDEpKTtcbiAgICAgICAgZW1pdChcInNjb3JlXCIsIHRoaXMuc2NvcmUsIHRoaXMuc29ja2V0SUQpO1xuICAgICAgICBlbWl0KFwiY2xlYXJlZExpbmVzXCIsIHRoaXMudG90YWxDbGVhcmVkTGluZXMsIHRoaXMuc29ja2V0SUQpO1xuICAgIH1cblxuICAgIG5ld1RldHJvbWlubygpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vID0gdGhpcy5uZXh0VGV0cm9taW5vO1xuICAgICAgICB0aGlzLm5leHRUZXRyb21pbm9JbmRleCsrO1xuICAgICAgICBpZiAoIXRoaXMuc2Vzc2lvbi50ZXRyb21pbm9zW3RoaXMubmV4dFRldHJvbWlub0luZGV4XSlcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi5uZXdUZXRyb21pbm8oKTtcbiAgICAgICAgdGhpcy5uZXh0VGV0cm9taW5vID0gY29weVRldHJvbWlubyhcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi50ZXRyb21pbm9zW3RoaXMubmV4dFRldHJvbWlub0luZGV4XVxuICAgICAgICApO1xuICAgICAgICBlbWl0KFwibmV4dFRldHJvbWlub1wiLCB0aGlzLm5leHRUZXRyb21pbm8sIHRoaXMuc29ja2V0SUQpO1xuICAgIH1cblxuICAgIHJvdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU92ZXIpIHJldHVybjtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLnJvdGF0ZSh0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgfVxuXG4gICAgbW92ZUxlZnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWVPdmVyKSByZXR1cm47XG4gICAgICAgIHRoaXMuY3VycmVudFRldHJvbWluby5tb3ZlTGVmdCh0aGlzLnBsYXlmaWVsZCk7XG4gICAgICAgIGVtaXRUZXRyb21pbm8odGhpcyk7XG4gICAgfVxuXG4gICAgbW92ZVJpZ2h0KCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lT3ZlcikgcmV0dXJuO1xuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ubW92ZVJpZ2h0KHRoaXMucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdFRldHJvbWlubyh0aGlzKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlTGluZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmVyYXNlVGV0cm9taW5vKHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZCk7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZC5sZW5ndGggLSAxOyByb3crKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDwgMTA7IGNvbHVtbisrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGQucGxheWZpZWxkW3Jvd11bXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtblxuICAgICAgICAgICAgICAgIF0gPSB0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGRbcm93ICsgMV1bY29sdW1uXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgIHRoaXMucGxheWZpZWxkLnBsYXlmaWVsZFt0aGlzLnBsYXlmaWVsZC5wbGF5ZmllbGQubGVuZ3RoIC0gMV1bXG4gICAgICAgICAgICAgICAgY29sdW1uXG4gICAgICAgICAgICBdID0gZGlzYWJsZWRDb2xvcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRUZXRyb21pbm8ucG9zaXRpb25bMV0gLT0gMTtcbiAgICAgICAgdGhpcy5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpcy5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICAgICAgZW1pdFBsYXlmaWVsZCh0aGlzKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgYXV0b0JpbmQgZnJvbSBcImF1dG8tYmluZFwiO1xuaW1wb3J0IHsgZGVmYXVsdENvbG9yLCBkaXNhYmxlZENvbG9yIH0gZnJvbSBcIi4vdGV0cmlzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXlmaWVsZCB7XG4gICAgY29uc3RydWN0b3IocGxheWZpZWxkKSB7XG4gICAgICAgIGF1dG9CaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnBsYXlmaWVsZCA9IHBsYXlmaWVsZDtcbiAgICB9XG5cbiAgICBjb2xsaXNpb25EZXRlY3RlZChjdXJyZW50VGV0cm9taW5vKSB7XG4gICAgICAgIGxldCByb3cgPSAwO1xuICAgICAgICB3aGlsZSAocm93IDwgNCkge1xuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VGV0cm9taW5vLnNoYXBlW3Jvd11bY29sdW1uXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZC5sZW5ndGggLSAxIDxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93IHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFswXS5sZW5ndGggLSAxIDxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzBdICsgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbiA8IDApIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZmllbGRbY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXSArIHJvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFtjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XVtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZmllbGRbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGV0cm9taW5vLnBvc2l0aW9uWzFdICsgcm93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1bY3VycmVudFRldHJvbWluby5wb3NpdGlvblswXSArIGNvbHVtbl0gIT09XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRDb2xvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGluZUlzRmlsbGVkKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuICFsaW5lLnNvbWUoXG4gICAgICAgICAgICBjZWxsID0+IGNlbGwgPT09IGRlZmF1bHRDb2xvciB8fCBjZWxsID09PSBkaXNhYmxlZENvbG9yXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgY2xlYXJMaW5lKGxpbmUpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsaW5lW2ldID0gZGVmYXVsdENvbG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29sbGFwc2VMaW5lcyhpKSB7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IGk7IHJvdyA+IDA7IHJvdy0tKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCAxMDsgY29sdW1uKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlmaWVsZFtyb3ddW2NvbHVtbl0gPSB0aGlzLnBsYXlmaWVsZFtyb3cgLSAxXVtjb2x1bW5dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJGaWxsZWRMaW5lcyhjdXJyZW50VGV0cm9taW5vKSB7XG4gICAgICAgIGxldCBjdXJyZW50TGluZUluZGV4ID0gY3VycmVudFRldHJvbWluby5wb3NpdGlvblsxXTtcbiAgICAgICAgY29uc3QgbGFzdENsZWFyYWJsZUxpbmVJbmRleCA9IGN1cnJlbnRMaW5lSW5kZXggKyA0O1xuICAgICAgICBsZXQgY2xlYXJlZExpbmVzID0gMDtcblxuICAgICAgICB3aGlsZSAoY3VycmVudExpbmVJbmRleCA8IGxhc3RDbGVhcmFibGVMaW5lSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpbmVJc0ZpbGxlZCh0aGlzLnBsYXlmaWVsZFtjdXJyZW50TGluZUluZGV4XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckxpbmUodGhpcy5wbGF5ZmllbGRbY3VycmVudExpbmVJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlTGluZXMoY3VycmVudExpbmVJbmRleCwgdGhpcy5wbGF5ZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhcmVkTGluZXMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50TGluZUluZGV4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsZWFyZWRMaW5lcztcbiAgICB9XG59XG4iLCJpbXBvcnQge1xuICAgIGpvaW5UZXRyaXMsXG4gICAgbW92ZUxlZnQsXG4gICAgbW92ZVJpZ2h0LFxuICAgIHJvdGF0ZUN1cnJlbnRUZXRyb21pbm8sXG4gICAgc2V0R2FtZUludGVydmFsLFxuICAgIHN0YXJ0R2FtZSxcbiAgICB0b2dnbGVSZWFkeVxufSBmcm9tIFwiLi90ZXRyaXNcIjtcblxuY29uc3QgZXhwcmVzcyA9IHJlcXVpcmUoXCJleHByZXNzXCIpO1xuY29uc3QgYXBwID0gZXhwcmVzcygpO1xuY29uc3Qgc2VydmVyID0gcmVxdWlyZShcImh0dHBcIikuU2VydmVyKGFwcCk7XG5jb25zdCBpbyA9IHJlcXVpcmUoXCJzb2NrZXQuaW9cIikoc2VydmVyKTtcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5jb25zdCBwb3J0ID0gODA4MDtcblxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcIi4uLy4uL2NsaWVudC9idWlsZFwiKSkpO1xuYXBwLmdldChcIi9cIiwgZnVuY3Rpb24ocmVxLCByZXMpIHtcbiAgICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi8uLi9jbGllbnQvYnVpbGRcIiwgXCJpbmRleC5odG1sXCIpKTtcbn0pO1xuXG5zZXJ2ZXIubGlzdGVuKHBvcnQpO1xuXG5leHBvcnQgbGV0IGludGVydmFsID0gMzAwO1xuXG5pby5vbihcImNvbm5lY3Rpb25cIiwgY2xpZW50ID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIlxcbkNvbm5lY3Rpb24gaGFwcGVuZWQuXCIpO1xuICAgIGNsaWVudC5vbihcIkhhc2hcIiwgZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICAgIGpvaW5UZXRyaXMoc3RyaW5nLCBjbGllbnQuaWQpO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbihcIkFycm93VXBcIiwgdXNlcm5hbWVBbmRSb29tID0+IHtcbiAgICAgICAgcm90YXRlQ3VycmVudFRldHJvbWlubyh1c2VybmFtZUFuZFJvb20pO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbihcIkFycm93RG93blwiLCB1c2VybmFtZUFuZFJvb20gPT4ge1xuICAgICAgICBzZXRHYW1lSW50ZXJ2YWwodXNlcm5hbWVBbmRSb29tLCA1MCk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKFwiQXJyb3dEb3duVW5wcmVzc2VkXCIsIHVzZXJuYW1lQW5kUm9vbSA9PiB7XG4gICAgICAgIHNldEdhbWVJbnRlcnZhbCh1c2VybmFtZUFuZFJvb20sIDMwMCk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKFwiQXJyb3dMZWZ0XCIsIHVzZXJuYW1lQW5kUm9vbSA9PiB7XG4gICAgICAgIG1vdmVMZWZ0KHVzZXJuYW1lQW5kUm9vbSk7XG4gICAgfSk7XG4gICAgY2xpZW50Lm9uKFwiQXJyb3dSaWdodFwiLCB1c2VybmFtZUFuZFJvb20gPT4ge1xuICAgICAgICBtb3ZlUmlnaHQodXNlcm5hbWVBbmRSb29tKTtcbiAgICB9KTtcbiAgICBjbGllbnQub24oXCJzdGFydEdhbWVcIiwgY2xpZW50RGF0YSA9PiB7XG4gICAgICAgc3RhcnRHYW1lKGNsaWVudERhdGEpO1xuICAgIH0pO1xuICAgIGNsaWVudC5vbihcInJlYWR5Q2hlY2tcIiwgY2xpZW50RGF0YSA9PiB7XG4gICAgICAgIHRvZ2dsZVJlYWR5KGNsaWVudERhdGEpO1xuICAgIH0pO1xufSk7XG5cbmV4cG9ydCBjb25zdCBlbWl0ID0gKGV2ZW50LCBhcmdzLCBzb2NrZXRJRCkgPT4ge1xuICAgIGlvLnRvKGAke3NvY2tldElEfWApLmVtaXQoZXZlbnQsIGFyZ3MpO1xufTtcblxuY29uc3Qgb24gPSAoZXZlbnQsIGNhbGxiYWNrLCBlbWl0KSA9PiB7fTtcbiIsImltcG9ydCB7IGVtaXQsIGludGVydmFsIH0gZnJvbSBcIi4vc2VydmVyXCI7XG5pbXBvcnQgVGV0cm9taW5vIGZyb20gXCIuL3RldHJvbWlub1wiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IEwsIExpbmUsIFJldmVyc2VMLCBTLCBTcXVhcmUsIFQsIFogfSBmcm9tIFwiLi90ZXRyb21pbm9zXCI7XG5cbmNvbnN0IGF1dG9CaW5kID0gcmVxdWlyZShcImF1dG8tYmluZFwiKTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb2xvciA9IFwiZ3JheVwiO1xuZXhwb3J0IGNvbnN0IGRpc2FibGVkQ29sb3IgPSBcInBpbmtcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBsYXlmaWVsZCgpIHtcbiAgICByZXR1cm4gWy4uLm5ldyBBcnJheSgyMCldLm1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiBbLi4ubmV3IEFycmF5KDEwKV0ubWFwKCgpID0+IGRlZmF1bHRDb2xvcik7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0RXZlbnRzKHRoaXNQbGF5ZXIpIHtcbiAgICBlbWl0KFwicGxheWZpZWxkXCIsIHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpc1BsYXllci5zb2NrZXRJRCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0UGxheWZpZWxkKHRoaXNQbGF5ZXIpIHtcbiAgICB0aGlzUGxheWVyLmN1cnJlbnRUZXRyb21pbm8uZXJhc2VUZXRyb21pbm8odGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICBlbWl0KFwicGxheWZpZWxkXCIsIHRoaXNQbGF5ZXIucGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpc1BsYXllci5zb2NrZXRJRCk7XG4gICAgdGhpc1BsYXllci5jdXJyZW50VGV0cm9taW5vLmRyYXdUZXRyb21pbm8odGhpc1BsYXllci5wbGF5ZmllbGQucGxheWZpZWxkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRUZXRyb21pbm8odGhpc1BsYXllcikge1xuICAgIGVtaXQoXCJ0ZXRyb21pbm9cIiwgdGhpc1BsYXllci5jdXJyZW50VGV0cm9taW5vLCB0aGlzUGxheWVyLnNvY2tldElEKTtcbn1cblxuZnVuY3Rpb24gZW1pdFNlc3Npb24odGhpc1BsYXllcikge31cblxuZnVuY3Rpb24gaW5pdGlhbFBhY2thZ2UodGhpc1BsYXllcikge1xuICAgIGVtaXRQbGF5ZmllbGQodGhpc1BsYXllcik7XG4gICAgZW1pdFRldHJvbWlubyh0aGlzUGxheWVyKTtcbiAgICBlbWl0UmVhZHlTdGF0ZXModGhpc1BsYXllci5zZXNzaW9uKTtcbiAgICBlbWl0SG9zdFN0YXR1cyh0aGlzUGxheWVyKTtcbn1cblxuY2xhc3MgR2FtZVNlc3Npb24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yb29tID0gXCJcIjtcbiAgICAgICAgdGhpcy5ob3N0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5nYW1lU3RhdGUgPSBcIlNUQVJUSU5HX1NDUkVFTlwiO1xuICAgICAgICB0aGlzLnBsYXllcnMgPSBBcnJheSgpO1xuICAgICAgICB0aGlzLnRldHJvbWlub3MgPSBBcnJheShjcmVhdGVUZXRyb21pbm8oKSwgY3JlYXRlVGV0cm9taW5vKCkpO1xuICAgIH1cblxuICAgIG5ld1RldHJvbWlubygpIHtcbiAgICAgICAgdGhpcy50ZXRyb21pbm9zLnB1c2goY3JlYXRlVGV0cm9taW5vKCkpO1xuICAgIH1cblxuICAgIGRpc2FibGVMaW5lcyh1c2VyKSB7XG4gICAgICAgIHRoaXMucGxheWVycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IHVzZXIpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmRpc2FibGVMaW5lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuY29uc3QgdGV0cm9taW5vcyA9IFtcbiAgICBuZXcgVGV0cm9taW5vKExpbmVbMF0sIFwiY3lhblwiLCBbNSwgLTJdLCBMaW5lKSxcbiAgICBuZXcgVGV0cm9taW5vKExbMF0sIFwib3JhbmdlXCIsIFs1LCAtMl0sIEwpLFxuICAgIG5ldyBUZXRyb21pbm8oUmV2ZXJzZUxbMF0sIFwiYmx1ZVwiLCBbNSwgLTJdLCBSZXZlcnNlTCksXG4gICAgbmV3IFRldHJvbWlubyhTcXVhcmVbMF0sIFwieWVsbG93XCIsIFs1LCAtMl0sIFNxdWFyZSksXG4gICAgbmV3IFRldHJvbWlubyhTWzBdLCBcImdyZWVuXCIsIFs1LCAtMl0sIFMpLFxuICAgIG5ldyBUZXRyb21pbm8oWlswXSwgXCJyZWRcIiwgWzUsIC0yXSwgWiksXG4gICAgbmV3IFRldHJvbWlubyhUWzBdLCBcInB1cnBsZVwiLCBbNSwgLTJdLCBUKVxuXTtcblxuZnVuY3Rpb24gY3JlYXRlVGV0cm9taW5vKCkge1xuICAgIGNvbnN0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGV0cm9taW5vcy5sZW5ndGgpO1xuXG4gICAgcmV0dXJuIHRldHJvbWlub3NbaW5kZXhdO1xufVxuXG5jb25zdCBzZXNzaW9ucyA9IEFycmF5KCk7XG5cbmZ1bmN0aW9uIGZpbmRHYW1lU2Vzc2lvbihyb29tKSB7XG4gICAgcmV0dXJuIHNlc3Npb25zLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50LnJvb20gPT09IHJvb20pO1xufVxuXG5mdW5jdGlvbiBmaW5kVXNlckluU2Vzc2lvbihyb29tLCB1c2VybmFtZSkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBmaW5kR2FtZVNlc3Npb24ocm9vbSk7XG4gICAgaWYgKCFzZXNzaW9uKSByZXR1cm47XG5cbiAgICByZXR1cm4gc2Vzc2lvbi5wbGF5ZXJzLmZpbmQodXNlciA9PiB1c2VyLm5hbWUgPT09IHVzZXJuYW1lKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvcHlUZXRyb21pbm8gPSB0ZXRyb21pbm8gPT4ge1xuICAgIHJldHVybiBuZXcgVGV0cm9taW5vKFxuICAgICAgICB0ZXRyb21pbm8uc2hhcGUsXG4gICAgICAgIHRldHJvbWluby5jb2xvcixcbiAgICAgICAgWzAsIC0xXSxcbiAgICAgICAgdGV0cm9taW5vLnJvdGF0aW9uQXJyYXlcbiAgICApO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyKHNlc3Npb24sIG5hbWUsIHNvY2tldElEKSB7XG4gICAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigpO1xuICAgIHBsYXllci5zZXNzaW9uID0gc2Vzc2lvbjtcbiAgICBwbGF5ZXIubmFtZSA9IG5hbWU7XG4gICAgcGxheWVyLnNvY2tldElEID0gc29ja2V0SUQ7XG4gICAgc2Vzc2lvbi5wbGF5ZXJzLnB1c2gocGxheWVyKTtcbiAgICBwbGF5ZXIuY3VycmVudFRldHJvbWlubyA9IGNvcHlUZXRyb21pbm8oc2Vzc2lvbi50ZXRyb21pbm9zWzBdKTtcbiAgICBwbGF5ZXIubmV4dFRldHJvbWlubyA9IGNvcHlUZXRyb21pbm8oc2Vzc2lvbi50ZXRyb21pbm9zWzFdKTtcbiAgICByZXR1cm4gcGxheWVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lU2Vzc2lvbihyb29tLCBob3N0KSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBHYW1lU2Vzc2lvbigpO1xuICAgIHNlc3Npb24ucm9vbSA9IHJvb207XG4gICAgc2Vzc2lvbi5ob3N0ID0gaG9zdDtcbiAgICBzZXNzaW9ucy5wdXNoKHNlc3Npb24pO1xuXG4gICAgcmV0dXJuIHNlc3Npb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHYW1lSW50ZXJ2YWwodXNlcm5hbWVBbmRSb29tLCBnYW1lSW50ZXJ2YWwpIHtcbiAgICBjb25zdCBwbGF5ZXIgPSBmaW5kVXNlckluU2Vzc2lvbih1c2VybmFtZUFuZFJvb21bMV0sIHVzZXJuYW1lQW5kUm9vbVswXSk7XG4gICAgcGxheWVyLmludGVydmFsID0gZ2FtZUludGVydmFsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZUxlZnQodXNlcm5hbWVBbmRSb29tKSB7XG4gICAgY29uc3QgcGxheWVyID0gZmluZFVzZXJJblNlc3Npb24odXNlcm5hbWVBbmRSb29tWzFdLCB1c2VybmFtZUFuZFJvb21bMF0pO1xuICAgIHBsYXllci5tb3ZlTGVmdCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbW92ZVJpZ2h0KHVzZXJuYW1lQW5kUm9vbSkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIubW92ZVJpZ2h0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3RhdGVDdXJyZW50VGV0cm9taW5vKHVzZXJuYW1lQW5kUm9vbSkge1xuICAgIGNvbnN0IHBsYXllciA9IGZpbmRVc2VySW5TZXNzaW9uKHVzZXJuYW1lQW5kUm9vbVsxXSwgdXNlcm5hbWVBbmRSb29tWzBdKTtcbiAgICBwbGF5ZXIucm90YXRlKCk7XG59XG5cbmZ1bmN0aW9uIGdldFVzZXIocm9vbSwgdXNlcm5hbWUsIHNvY2tldElEKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9XG4gICAgICAgIGZpbmRHYW1lU2Vzc2lvbihyb29tKSB8fCBjcmVhdGVHYW1lU2Vzc2lvbihyb29tLCB1c2VybmFtZSk7XG5cbiAgICBjb25zdCB1c2VyID0gZmluZFVzZXJJblNlc3Npb24ocm9vbSwgdXNlcm5hbWUpO1xuXG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiBub3QgZm91bmQgaW4gc2Vzc2lvbiwgYWRkaW5nLi4uYCk7XG4gICAgICAgIHJldHVybiBjcmVhdGVQbGF5ZXIoc2Vzc2lvbiwgdXNlcm5hbWUsIHNvY2tldElEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgVXNlciBcIiR7dXNlcm5hbWV9XCIgaXMgYWxyZWFkeSBpbiBzZXNzaW9uLmApO1xuICAgICAgICB1c2VyLnNvY2tldElEID0gc29ja2V0SUQ7XG4gICAgICAgIGluaXRpYWxQYWNrYWdlKHVzZXIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVXNlcm5hbWUoc3BsaXQpIHtcbiAgICByZXR1cm4gc3BsaXRbMV0gPyBzcGxpdFsxXS5zbGljZSgwLCBzcGxpdFsxXS5sZW5ndGggLSAxKSA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZW1pdEhvc3RTdGF0dXModXNlcikge1xuICAgIGVtaXQoXCJpc0hvc3RcIiwgdXNlci5zZXNzaW9uLmhvc3QgPT09IHVzZXIubmFtZSwgdXNlci5zb2NrZXRJRClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGpvaW5UZXRyaXMoaGFzaCwgc29ja2V0SUQpIHtcbiAgICBjb25zdCBzcGxpdCA9IGhhc2guc3BsaXQoXCJbXCIpO1xuICAgIGNvbnN0IHJvb20gPSBzcGxpdFswXS5zbGljZSgxKTtcbiAgICBjb25zdCB1c2VybmFtZSA9IHBhcnNlVXNlcm5hbWUoc3BsaXQpO1xuXG4gICAgY29uc29sZS5sb2coXCJqb2luVGV0cmlzKCkgY2FsbGVkXCIpO1xuICAgIGNvbnNvbGUubG9nKGBVc2VyIFwiJHt1c2VybmFtZX1cIiB0cmllZCB0byBjb25uZWN0IHRvIHJvb206IFwiJHtyb29tfVwiYCk7XG4gICAgZ2V0VXNlcihyb29tLCB1c2VybmFtZSwgc29ja2V0SUQpO1xuXG4gICAgY29uc3QgdXNlciA9IGZpbmRVc2VySW5TZXNzaW9uKHJvb20sIHVzZXJuYW1lKTtcbiAgICBlbWl0SG9zdFN0YXR1cyh1c2VyKTtcbn1cblxuZnVuY3Rpb24gcmVhZHlDaGVjayhzZXNzaW9uKSB7XG4gICAgcmV0dXJuIHNlc3Npb24ucGxheWVycy5ldmVyeSh1c2VyID0+ICB1c2VyLnJlYWR5KTtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lRm9yQWxsVXNlcnMoc2Vzc2lvbiwpIHtcbiAgICBzZXNzaW9uLnBsYXllcnMubWFwKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIpIHVzZXIucGxheSgpO1xuICAgICAgICB9LCBpbnRlcnZhbCk7XG4gICAgICAgIGVtaXQoXCJnYW1lU3RhcnRlZFwiLCBcIkdBTUVfU1RBUlRFRFwiLCB1c2VyLnNvY2tldElEKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0R2FtZShjbGllbnREYXRhKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGZpbmRHYW1lU2Vzc2lvbihjbGllbnREYXRhLnJvb20pO1xuICAgIGNvbnNvbGUubG9nKFwiRnVuY3Rpb24gcmV0dXJuczogXCIsIHJlYWR5Q2hlY2soc2Vzc2lvbikpO1xuICAgIGlmIChyZWFkeUNoZWNrKHNlc3Npb24pID09PSBmYWxzZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGVsc2VcbiAgICAgICAgc3RhcnRHYW1lRm9yQWxsVXNlcnMoc2Vzc2lvbik7XG59XG5cbmZ1bmN0aW9uIGVtaXRSZWFkeVN0YXRlcyhzZXNzaW9uKSB7XG4gICAgc2Vzc2lvbi5wbGF5ZXJzLm1hcChmdW5jdGlvbiAodXNlcikge1xuICAgICAgICBlbWl0KFwicmVhZHlTdGF0ZVwiLCB1c2VyLnJlYWR5LCB1c2VyLnNvY2tldElEKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZVJlYWR5KGNsaWVudERhdGEpIHtcbiAgICBjb25zdCB1c2VyID0gZmluZFVzZXJJblNlc3Npb24oY2xpZW50RGF0YS5yb29tLCBjbGllbnREYXRhLnVzZXJuYW1lKTtcbiAgICBpZiAodXNlci5yZWFkeSlcbiAgICAgICAgdXNlci5yZWFkeSA9IGZhbHNlO1xuICAgIGVsc2VcbiAgICAgICAgdXNlci5yZWFkeSA9IHRydWU7XG4gICAgY29uc29sZS5sb2codXNlci5yZWFkeSk7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGZpbmRHYW1lU2Vzc2lvbihjbGllbnREYXRhLnJvb20pO1xuICAgIGVtaXRSZWFkeVN0YXRlcyhzZXNzaW9uKTtcbn0iLCJjb25zdCBhdXRvQmluZCA9IHJlcXVpcmUoXCJhdXRvLWJpbmRcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRldHJvbWlubyB7XG4gICAgY29uc3RydWN0b3Ioc2hhcGUsIGNvbG9yLCBwb3NpdGlvbiwgcm90YXRpb25BcnJheSkge1xuICAgICAgICBhdXRvQmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zaGFwZSA9IHNoYXBlO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBbMywgLTRdO1xuICAgICAgICB0aGlzLnJvdGF0aW9uQXJyYXkgPSByb3RhdGlvbkFycmF5O1xuICAgIH1cblxuICAgIGRyYXdUZXRyb21pbm8ocGxheWZpZWxkKSB7XG4gICAgICAgIGxldCByb3cgPSAwO1xuICAgICAgICB3aGlsZSAocm93IDwgNCkge1xuICAgICAgICAgICAgbGV0IGNvbHVtbiA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoY29sdW1uIDwgNCkge1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd10pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgIF0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVbcm93XVtjb2x1bW5dXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWZpZWxkW3RoaXMucG9zaXRpb25bMV0gKyByb3ddW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zaXRpb25bMF0gKyBjb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgIF0gPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbHVtbiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlcmFzZVRldHJvbWlubyhwbGF5ZmllbGQpIHtcbiAgICAgICAgbGV0IHJvdyA9IDA7XG4gICAgICAgIHdoaWxlIChyb3cgPCA0KSB7XG4gICAgICAgICAgICBsZXQgY29sdW1uID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChjb2x1bW4gPCA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXlmaWVsZFt0aGlzLnBvc2l0aW9uWzFdICsgcm93XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSArIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFwZVtyb3ddW2NvbHVtbl1cbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZmllbGRbdGhpcy5wb3NpdGlvblsxXSArIHJvd11bXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvblswXSArIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgXSA9IFwiZ3JheVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbHVtbiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93ICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlTGVmdChwbGF5ZmllbGQpIHtcbiAgICAgICAgdGhpcy5lcmFzZVRldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblswXSAtPSAxO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKSB0aGlzLnBvc2l0aW9uWzBdICs9IDE7XG4gICAgICAgIHRoaXMuZHJhd1RldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBtb3ZlUmlnaHQocGxheWZpZWxkKSB7XG4gICAgICAgIHRoaXMuZXJhc2VUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgICAgIHRoaXMucG9zaXRpb25bMF0gKz0gMTtcbiAgICAgICAgaWYgKHBsYXlmaWVsZC5jb2xsaXNpb25EZXRlY3RlZCh0aGlzKSkgdGhpcy5wb3NpdGlvblswXSAtPSAxO1xuICAgICAgICB0aGlzLmRyYXdUZXRyb21pbm8ocGxheWZpZWxkLnBsYXlmaWVsZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcm90YXRlKHBsYXlmaWVsZCkge1xuICAgICAgICB0aGlzLmVyYXNlVGV0cm9taW5vKHBsYXlmaWVsZC5wbGF5ZmllbGQsIHRoaXMpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uQXJyYXkuaW5kZXhPZih0aGlzLnNoYXBlKSA9PT1cbiAgICAgICAgICAgIHRoaXMucm90YXRpb25BcnJheS5sZW5ndGggLSAxXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMucm90YXRpb25BcnJheVswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbXG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgKyAxXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF5ZmllbGQuY29sbGlzaW9uRGV0ZWN0ZWQodGhpcykpIHRoaXMuX3dhbGxLaWNrKHBsYXlmaWVsZCk7XG4gICAgICAgIHRoaXMuZHJhd1RldHJvbWlubyhwbGF5ZmllbGQucGxheWZpZWxkKTtcbiAgICB9XG5cbiAgICBfd2FsbEtpY2socGxheWZpZWxkKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdIC0gMSwgdGhpcy5wb3NpdGlvblsxXV0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdICsgMSwgdGhpcy5wb3NpdGlvblsxXV0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdIC0gMV0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdICsgMV0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdIC0gMiwgdGhpcy5wb3NpdGlvblsxXV0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdICsgMiwgdGhpcy5wb3NpdGlvblsxXV0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdIC0gMl0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuX3RyeVRldHJvbWlub1Bvc2l0aW9uKFxuICAgICAgICAgICAgICAgIFt0aGlzLnBvc2l0aW9uWzBdLCB0aGlzLnBvc2l0aW9uWzFdICsgMl0sXG4gICAgICAgICAgICAgICAgcGxheWZpZWxkXG4gICAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Vucm90YXRlKCk7XG4gICAgfVxuXG4gICAgX3Vucm90YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlID0gdGhpcy5yb3RhdGlvbkFycmF5W3RoaXMucm90YXRpb25BcnJheS5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUgPSB0aGlzLnJvdGF0aW9uQXJyYXlbXG4gICAgICAgICAgICAgICAgdGhpcy5yb3RhdGlvbkFycmF5LmluZGV4T2YodGhpcy5zaGFwZSkgLSAxXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3RyeVRldHJvbWlub1Bvc2l0aW9uKHBvc2l0aW9uLCBwbGF5ZmllbGQpIHtcbiAgICAgICAgY29uc3QgdG1wID0gWy4uLnRoaXMucG9zaXRpb25dO1xuXG4gICAgICAgIHRoaXMucG9zaXRpb25bMF0gPSBwb3NpdGlvblswXTtcbiAgICAgICAgdGhpcy5wb3NpdGlvblsxXSA9IHBvc2l0aW9uWzFdO1xuICAgICAgICBpZiAocGxheWZpZWxkLmNvbGxpc2lvbkRldGVjdGVkKHRoaXMpKSB7XG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uWzBdID0gdG1wWzBdO1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvblsxXSA9IHRtcFsxXTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3QgU3F1YXJlID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXVxuXTtcblxuZXhwb3J0IGNvbnN0IExpbmUgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDFdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXG5dO1xuXG5leHBvcnQgY29uc3QgVCA9IFtcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1cbl07XG5cbmV4cG9ydCBjb25zdCBMID0gW1xuICAgIFtcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXVxuXTtcblxuZXhwb3J0IGNvbnN0IFJldmVyc2VMID0gW1xuICAgIFtcbiAgICAgICAgWzEsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXVxuXTtcblxuZXhwb3J0IGNvbnN0IFMgPSBbXG4gICAgW1xuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMSwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdXG5dO1xuXG5leHBvcnQgY29uc3QgWiA9IFtcbiAgICBbXG4gICAgICAgIFsxLCAxLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDEsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF0sXG4gICAgW1xuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICBdLFxuICAgIFtcbiAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICBbMSwgMSwgMCwgMF0sXG4gICAgICAgIFswLCAxLCAxLCAwXSxcbiAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgXSxcbiAgICBbXG4gICAgICAgIFswLCAxLCAwLCAwXSxcbiAgICAgICAgWzEsIDEsIDAsIDBdLFxuICAgICAgICBbMSwgMCwgMCwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAwXVxuICAgIF1cbl07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhdXRvLWJpbmRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic29ja2V0LmlvXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=