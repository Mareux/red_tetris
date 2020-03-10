import autoBind from "auto-bind";
import { defaultColor, disabledColor } from "./game";

export default class Playfield {
    constructor(playfield) {
        autoBind(this);
        this.playfield = playfield;
    }

    collisionDetected(currentTetromino) {
        let row = 0;
        while (row < 4) {
            let column = 0;
            while (column < 4) {
                if (currentTetromino.shape[row][column]) {
                    if (
                        this.playfield.length - 1 <
                            currentTetromino.position[1] + row ||
                        this.playfield[0].length - 1 <
                            currentTetromino.position[0] + column
                    )
                        return true;
                    if (currentTetromino.position[0] + column < 0) return true;
                    if (this.playfield[currentTetromino.position[1] + row]) {
                        if (
                            this.playfield[currentTetromino.position[1] + row][
                                currentTetromino.position[0] + column
                            ]
                        ) {
                            if (
                                this.playfield[
                                    currentTetromino.position[1] + row
                                ][currentTetromino.position[0] + column] !==
                                defaultColor
                            )
                                return true;
                        }
                    }
                }
                column += 1;
            }
            row += 1;
        }
        return false;
    }

    lineIsFilled(line) {
        return !line.some(
            cell => cell === defaultColor || cell === disabledColor
        );
    }

    clearLine(line) {
        for (let i = 0; i < line.length; i++) {
            line[i] = defaultColor;
        }
    }

    collapseLines(i) {
        for (let row = i; row > 0; row--) {
            for (let column = 0; column < 10; column++) {
                this.playfield[row][column] = this.playfield[row - 1][column];
            }
        }
    }

    clearFilledLines(currentTetromino) {
        let currentLineIndex = currentTetromino.position[1];
        const lastClearableLineIndex = currentLineIndex + 4;
        let clearedLines = 0;

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
}
