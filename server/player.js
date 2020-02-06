import {emit} from "./server";
import {collisionDetected, copyTetromino, createPlayfield, emitEvents, clearFilledLines} from "./tetris";
const autoBind = require('auto-bind');

export default class Player {
    constructor() {
        autoBind(this);
        this.session = null;
        this.playfield = createPlayfield();
        this.name = "";
        this.currentTetromino = null;
        this.nextTetromino = null;
        this.nextTetrominoIndex = 0;
        this.socketID = false;
        this.tetrominos = null;
    }

    play() {
        if (this.currentTetromino) {
            this.currentTetromino.eraseTetromino(this.playfield);
            this.currentTetromino.position[1] += 1;
            if (collisionDetected(this.playfield, this.currentTetromino)) {
                this.currentTetromino.position[1] -= 1;
                this.currentTetromino.drawTetromino(this.playfield);
                let clearedLines = clearFilledLines(this.playfield, this.currentTetromino);
                for (let i = 0; i < clearedLines; i++) {
                    this.session.disableLines(this);
                }
                this.newTetromino();
            } else
                this.currentTetromino.drawTetromino(this.playfield);
        }
        emitEvents(this);
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
        this.currentTetromino.rotate(this.playfield);
        emitEvents(this);
    }

    moveLeft() {
        this.currentTetromino.moveLeft(this.playfield);
        emitEvents(this);
    };

    moveRight() {
        this.currentTetromino.moveRight(this.playfield);
        emitEvents(this);
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
