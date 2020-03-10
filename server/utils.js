import Piece from "./piece";
import { L, Line, ReverseL, S, Square, T, Z } from "./tetrominos";

const tetrominos = [
    new Piece(Line[0], "#40AEB3", [5, -2], Line),
    new Piece(L[0], "#68DF4E", [5, -2], L),
    new Piece(ReverseL[0], "#5369C2", [5, -2], ReverseL),
    new Piece(Square[0], "#F2B0EF", [5, -2], Square),
    new Piece(S[0], "#FAFE59", [5, -2], S),
    new Piece(Z[0], "#FFA65A", [5, -2], Z),
    new Piece(T[0], "#9949BF", [5, -2], T)
];

export function createTetromino() {
    const index = Math.floor(Math.random() * tetrominos.length);

    return tetrominos[index];
}

export const copyTetromino = tetromino => {
    return new Piece(
        tetromino.shape,
        tetromino.color,
        [0, -1],
        tetromino.rotationArray
    );
};

export function parseUsername(split) {
    return split[1] ? split[1].slice(0, split[1].length - 1) : undefined;
}
