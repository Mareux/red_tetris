import {emit} from "./server";
import {copyTetromino, createPlayfield, emitPlayfield, emitTetromino} from "./tetris";
import Playfield from "./playfield";
const autoBind = require('auto-bind');

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
        this.gameOver = false;
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
                    emit('gameOver', null, this.socketID);
                    return ;
                }
                let clearedLines = this.playfield.clearFilledLines(this.currentTetromino);
                for (let i = 0; i < clearedLines; i++) {
                    this.session.disableLines(this);
                }
                this.newTetromino();
                emitPlayfield(this);
            } else
                this.currentTetromino.drawTetromino(this.playfield.playfield);
        }
        emitTetromino(this);
        setTimeout(this.play, this.interval);
    }

    newTetromino() {
        this.currentTetromino = this.nextTetromino;
        this.nextTetrominoIndex++;
        if (!this.session.tetrominos[this.nextTetrominoIndex])
            this.session.newTetromino();
        this.nextTetromino = copyTetromino(this.session.tetrominos[this.nextTetrominoIndex]);
        emit('nextTetromino', this.nextTetromino, this.socketID);
    }

    rotate() {
        if (this.gameOver)
            return;
        this.currentTetromino.rotate(this.playfield);
        emitTetromino(this);
    }

    moveLeft() {
        if (this.gameOver)
            return;
        this.currentTetromino.moveLeft(this.playfield);
        emitTetromino(this);
    };

    moveRight() {
        if (this.gameOver)
            return ;
        this.currentTetromino.moveRight(this.playfield);
        emitTetromino(this);
    };

    disableLine() {
        for (let row = 0; row < this.playfield.length - 1; row++) {
            for (let column = 0; column < 10; column++) {
                this.playfield[row][column] = this.playfield[row + 1][column];
            }
        }
        for (let column = 0; column < 10; column++) {
            this.playfield[this.playfield.length - 1][column] = 'gray';
        }
    }
}