import { emit } from "./server";
import {
    copyTetromino,
    createPlayfield,
    disabledColor,
    emitPlayfield,
    emitSessionState,
    emitTetromino,
    finishGame,
    initialPackage,
    updateAllPlayers,
    checkGameOver,
    updatePlayer,
    levelUpRequirement, emitLevel
} from "./tetris";
import Playfield from "./playfield";
const autoBind = require("auto-bind");

export default class Player {
    constructor() {
        autoBind(this);
        this.session = null;
        this.playfield = new Playfield(createPlayfield());
        this.name = "";
        this.currentTetromino = null;
        this.nextTetromino = null;
        this.nextTetrominoIndex = 0;
        this.socketID = false;
        this.tetrominos = null;
        this.interval = 300;
        this.level = 1;
        this.gameOver = false;
        this.score = 0;
        this.totalClearedLines = 0;
        this.linesToLevelUp = levelUpRequirement;
        this.ready = false;
        this.host = false;
    }

    play() {
        if (this.currentTetromino) {
            this.currentTetromino.eraseTetromino(this.playfield.playfield);
            this.currentTetromino.position[1] += 1;
            if (this.playfield.collisionDetected(this.currentTetromino)) {
                this.currentTetromino.position[1] -= 1;
                this.currentTetromino.drawTetromino(this.playfield.playfield);
                if (this.currentTetromino.position[1] < 0) {
                    this.gameOver = true;
                    if (checkGameOver(this.session)) {
                        finishGame(this.session);
                        updateAllPlayers(this.session);
                        console.log("meow");
                    }
                    else {
                        updatePlayer(this);
                    }
                    return;
                }
                let clearedLines = this.playfield.clearFilledLines(
                    this.currentTetromino
                );
                this.increaseLevel(clearedLines);
                for (let i = 0; i < clearedLines; i++) {
                    this.session.disableLines(this);
                }
                this.increaseScore(clearedLines);
                this.newTetromino();
                emitPlayfield(this);
            } else
                this.currentTetromino.drawTetromino(this.playfield.playfield);
        }
        emitTetromino(this);
        let finalInterval = this.interval;
        if (finalInterval > 100)
            finalInterval -= (this.level - 1) * 25;
        setTimeout(this.play, finalInterval);
    }

    increaseScore(clearedLines) {
        this.totalClearedLines += clearedLines;
        this.score += clearedLines * (10 + (clearedLines - 1));
        emit("score", this.score, this.socketID);
        emit("clearedLines", this.totalClearedLines, this.socketID);
    }

    increaseLevel(currentClearedLines) {
        this.linesToLevelUp -= currentClearedLines;
        if (this.linesToLevelUp <= 0 && this.level < 10) {
            this.level += 1;
            this.linesToLevelUp = levelUpRequirement;
        }
        emitLevel(this);
    }

    newTetromino() {
        this.currentTetromino = this.nextTetromino;
        this.nextTetrominoIndex++;
        if (!this.session.tetrominos[this.nextTetrominoIndex])
            this.session.newTetromino();
        this.nextTetromino = copyTetromino(
            this.session.tetrominos[this.nextTetrominoIndex]
        );
        emit("nextTetromino", this.nextTetromino, this.socketID);
    }

    rotate() {
        if (this.gameOver) return;
        this.currentTetromino.rotate(this.playfield);
        emitTetromino(this);
    }

    moveLeft() {
        if (this.gameOver) return;
        this.currentTetromino.moveLeft(this.playfield);
        emitTetromino(this);
    }

    moveRight() {
        if (this.gameOver) return;
        this.currentTetromino.moveRight(this.playfield);
        emitTetromino(this);
    }

    disableLine() {
        this.currentTetromino.eraseTetromino(this.playfield.playfield);
        for (let row = 0; row < this.playfield.playfield.length - 1; row++) {
            for (let column = 0; column < 10; column++) {
                this.playfield.playfield[row][
                    column
                ] = this.playfield.playfield[row + 1][column];
            }
        }
        for (let column = 0; column < 10; column++) {
            this.playfield.playfield[this.playfield.playfield.length - 1][
                column
            ] = disabledColor;
        }
        this.currentTetromino.position[1] -= 1;
        this.currentTetromino.drawTetromino(this.playfield.playfield);
        emitPlayfield(this);
    }
}
