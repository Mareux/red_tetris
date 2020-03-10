import { defaultColor } from "./game";

const autoBind = require("auto-bind");

export default class Piece {
    constructor(shape, color, position, rotationArray) {
        autoBind(this);
        this.shape = shape;
        this.color = color;
        this.position = [3, -4];
        this.rotationArray = rotationArray;
    }

    drawTetromino(playfield) {
        let row = 0;
        while (row < 4) {
            let column = 0;
            while (column < 4) {
                if (playfield[this.position[1] + row]) {
                    if (
                        playfield[this.position[1] + row][
                            this.position[0] + column
                        ] &&
                        this.shape[row][column]
                    ) {
                        playfield[this.position[1] + row][
                            this.position[0] + column
                        ] = this.color;
                    }
                }
                column += 1;
            }
            row += 1;
        }
    }

    eraseTetromino(playfield) {
        let row = 0;
        while (row < 4) {
            let column = 0;
            while (column < 4) {
                if (playfield[this.position[1] + row]) {
                    if (
                        playfield[this.position[1] + row][
                            this.position[0] + column
                        ] &&
                        this.shape[row][column]
                    ) {
                        playfield[this.position[1] + row][
                            this.position[0] + column
                        ] = defaultColor;
                    }
                }
                column += 1;
            }
            row += 1;
        }
    }

    moveLeft(playfield) {
        this.eraseTetromino(playfield.playfield, this);
        this.position[0] -= 1;
        if (playfield.collisionDetected(this)) this.position[0] += 1;
        this.drawTetromino(playfield.playfield, this);
    }

    moveRight(playfield) {
        this.eraseTetromino(playfield.playfield, this);
        this.position[0] += 1;
        if (playfield.collisionDetected(this)) this.position[0] -= 1;
        this.drawTetromino(playfield.playfield, this);
    }

    rotate(playfield) {
        this.eraseTetromino(playfield.playfield, this);
        if (
            this.rotationArray.indexOf(this.shape) ===
            this.rotationArray.length - 1
        ) {
            this.shape = this.rotationArray[0];
        } else {
            this.shape = this.rotationArray[
                this.rotationArray.indexOf(this.shape) + 1
            ];
        }
        if (playfield.collisionDetected(this)) this._wallKick(playfield);
        this.drawTetromino(playfield.playfield);
    }

    _wallKick(playfield) {
        if (
            this._tryTetrominoPosition(
                [this.position[0] - 1, this.position[1]],
                playfield
            )
        ) {
            return;
        }
        if (
            this._tryTetrominoPosition(
                [this.position[0] + 1, this.position[1]],
                playfield
            )
        ) {
            return;
        }
        if (
            this._tryTetrominoPosition(
                [this.position[0], this.position[1] - 1],
                playfield
            )
        ) {
            return;
        }
        if (
            this._tryTetrominoPosition(
                [this.position[0], this.position[1] + 1],
                playfield
            )
        ) {
            return;
        }
        if (
            this._tryTetrominoPosition(
                [this.position[0] - 2, this.position[1]],
                playfield
            )
        ) {
            return;
        }
        if (
            this._tryTetrominoPosition(
                [this.position[0] + 2, this.position[1]],
                playfield
            )
        ) {
            return;
        }
        if (
            this._tryTetrominoPosition(
                [this.position[0], this.position[1] - 2],
                playfield
            )
        ) {
            return;
        }
        if (
            this._tryTetrominoPosition(
                [this.position[0], this.position[1] + 2],
                playfield
            )
        ) {
            return;
        }
        this._unrotate();
    }

    _unrotate() {
        if (this.rotationArray.indexOf(this.shape) < 1) {
            this.shape = this.rotationArray[this.rotationArray.length - 1];
        } else {
            this.shape = this.rotationArray[
                this.rotationArray.indexOf(this.shape) - 1
            ];
        }
    }

    _tryTetrominoPosition(position, playfield) {
        const tmp = [...this.position];

        this.position[0] = position[0];
        this.position[1] = position[1];
        if (playfield.collisionDetected(this)) {
            this.position[0] = tmp[0];
            this.position[1] = tmp[1];
            return false;
        }
        return true;
    }
}
