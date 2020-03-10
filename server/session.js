import { createPlayfield, initialPackage, levelUpRequirement } from "./game";
import Player from "./player";
import Playfield from "./playfield";
import { interval } from "./server";
import { emitSessionState } from "./gameEmits";
import { copyTetromino, createTetromino } from "./utils";

const autoBind = require("auto-bind");

export default class Session {
    constructor() {
        autoBind(this);
        this.room = "";
        this.host = "";
        this.gameState = "STARTING_SCREEN";
        this.players = Array();
        this.tetrominos = Array(createTetromino(), createTetromino());
        this.classicMode = false;
    }

    startGame(){
        this._reset();
        if (this.gameState !== "GAME_STARTED")
            this.gameState = "GAME_STARTED";

        this.players.forEach(function(user) {
            initialPackage(user);
            clearTimeout(() => {
                if (user) user.play();
            }, interval);
            setTimeout(() => {
                if (user) user.play();
            }, interval);
            emitSessionState(user);
        });
    }

    finishGame(){
        this.gameState = "GAME_FINISHED";
    }

    readyCheck(){
        return this.players.every(user => user.ready);
    }

    gameOverCheck(){
        return this.players.every(player => player.gameOver);
    }

    _reset(){
        this.gameState = "GAME_FINISHED";
        this.tetrominos = Array(createTetromino(), createTetromino());

        this.players.forEach(player => {
            player.playfield = new Playfield(createPlayfield());
            player.currentTetromino = null;
            player.nextTetromino = null;
            player.nextTetrominoIndex = 0;
            player.tetrominos = null;
            player.interval = 300;
            player.gameOver = false;
            player.score = 0;
            player.level = 1;
            player.linesToLevelUp = levelUpRequirement;
            player.totalClearedLines = 0;
            player.ready = false;
            player.currentTetromino = copyTetromino(this.tetrominos[0]);
            player.nextTetromino = copyTetromino(this.tetrominos[1]);
            player.instantFall = false;
        });
    }

    addPlayer(name, socketID) {
        const player = new Player();
        player.session = this;
        player.name = name;
        player.socketID = socketID;
        player.host = name === this.host;
        this.players.push(player);
        player.currentTetromino = copyTetromino(this.tetrominos[0]);
        player.nextTetromino = copyTetromino(this.tetrominos[1]);
        return player;
    }

    findUser(username) {
        return this.players.find(user => user.name === username);
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
