const server = require("./server");
const rotations = require("./tetrominos");

let default_color = 'gray';

let color = default_color;

let line = [color, color, color, color, color, color, color, color, color, color];

let playfield = [[...line],
    [...line],
    [...line],
    [...line],
    [...line],
    [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line],
    [...line], [...line], [...line], [...line], [...line], [...line]];

let yellow = 'yellow';
let blue = 'blue';
let purple = 'purple';

class Player {
    constructor(playfield, ID = false, nextTetromino = false) {
        this.playfield = playfield;
        this.nextTetromino = nextTetromino;
        this.ID = ID;
    }
}

class GameSession {
    constructor(players) {
        this.players = Array();
    }
}

let sessions = Array();

function createGameSession(hostID) {
    let session = new GameSession();
    let player = new Player(playfield, hostID);
    session.players.push(player);
    sessions.push(session);
}

function tryTetrominoPosition(position) {
    let tmp = [...currentTetromino.position];

    currentTetromino.position[0] = position[0];
    currentTetromino.position[1] = position[1];
    if (collisionDetected()) {
        currentTetromino.position[0] = tmp[0];
        currentTetromino.position[1] = tmp[1];
        return false;
    }
    return true;
}

function wallKick() {
    if (tryTetrominoPosition([currentTetromino.position[0] - 1, currentTetromino.position[1]])) {
        return ;
    }
    if (tryTetrominoPosition([currentTetromino.position[0] + 1, currentTetromino.position[1]])) {
        return ;
    }
    if (tryTetrominoPosition([currentTetromino.position[0], currentTetromino.position[1] - 1])) {
        return ;
    }
    if (tryTetrominoPosition([currentTetromino.position[0], currentTetromino.position[1] + 1])) {
        return ;
    }
    if (tryTetrominoPosition([currentTetromino.position[0] - 2, currentTetromino.position[1]])) {
        return ;
    }
    if (tryTetrominoPosition([currentTetromino.position[0] + 2, currentTetromino.position[1]])) {
        return ;
    }
    if (tryTetrominoPosition([currentTetromino.position[0], currentTetromino.position[1] - 2])) {
        return ;
    }
    if (tryTetrominoPosition([currentTetromino.position[0], currentTetromino.position[1] + 2])) {
        return ;
    }
    cancelRotation();
}

cancelRotation = function () {
    if (currentTetromino.name === "Line")
        unrotate(rotations.Line);
    else if (currentTetromino.name === "T")
        unrotate(rotations.T);
    else if (currentTetromino.name === "L")
        unrotate(rotations.L);
    else if (currentTetromino.name === "ReverseL")
        unrotate(rotations.ReverseL);
    else if (currentTetromino.name === "S")
        unrotate(rotations.S);
    else if (currentTetromino.name === "Z")
        unrotate(rotations.Z);
    server.emit('playfield', playfield);
};

function unrotate(arr) {
    if (currentTetromino.rotation < 1) {
        currentTetromino.shape = arr[3];
        currentTetromino.rotation = 3;
    } else {
        currentTetromino.rotation -= 1;
        currentTetromino.shape = arr[currentTetromino.rotation];
    }
}

function rotate(arr) {
    eraseCurrentTetromino();
    if (currentTetromino.rotation > 2) {
        currentTetromino.shape = arr[0];
        currentTetromino.rotation = 0;
    } else {
        currentTetromino.rotation += 1;
        currentTetromino.shape = arr[currentTetromino.rotation];
    }
    if (collisionDetected())
        wallKick();
    drawCurrentTetromino();
}

exports.rotate_current_tetromino = function () {
    if (currentTetromino.name === "Line")
        rotate(rotations.Line);
    else if (currentTetromino.name === "T")
        rotate(rotations.T);
    else if (currentTetromino.name === "L")
        rotate(rotations.L);
    else if (currentTetromino.name === "ReverseL")
        rotate(rotations.ReverseL);
    else if (currentTetromino.name === "S")
        rotate(rotations.S);
    else if (currentTetromino.name === "Z")
        rotate(rotations.Z);
    server.emit('playfield', playfield);
};

class pieceSquare {
    constructor(name, shape, color, position) {
        this.name = "Square";
        this.shape =
            [[1, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
        this.color = yellow;
        this.position = [0, -1];
    }
}

class pieceLine {
    constructor(name, shape, color, position, rotation) {
        this.name = "Line";
        this.shape = rotations.Line[0];
        this.color = 'cyan';
        this.position = [0, -1];
        this.rotation = 0;
    }
}

class pieceT {
    constructor(name, shape, color, position, rotation) {
        this.name = "T";
        this.shape = rotations.T[0];
        this.color = purple;
        this.position = [0, -1];
        this.rotation = 0;
    }
}

class pieceL {
    constructor(name, shape, color, position, rotation) {
        this.name = "L";
        this.shape = rotations.L[0];
        this.color = 'orange';
        this.position = [0, -1];
        this.rotation = 0;
    }
}

class pieceReverseL {
    constructor(name, shape, color, position, rotation) {
        this.name = "ReverseL";
        this.shape = rotations.ReverseL[0];
        this.color = 'blue';
        this.position = [0, -1];
        this.rotation = 0;
    }
}

class pieceS {
    constructor(name, shape, color, position, rotation) {
        this.name = "S";
        this.shape = rotations.S[0];
        this.color = 'green';
        this.position = [0, -1];
        this.rotation = 0;
    }
}

class pieceZ {
    constructor(name, shape, color, position, rotation) {
        this.name = "Z";
        this.shape = rotations.Z[0];
        this.color = 'red';
        this.position = [0, -1];
        this.rotation = 0;
    }
}

var currentTetromino = new pieceSquare();

exports.moveLeft = function () {
    eraseCurrentTetromino();
    currentTetromino.position[0] -= 1;
    if (collisionDetected())
        currentTetromino.position[0] += 1;
    drawCurrentTetromino();
    server.emit('playfield', playfield);
};

exports.moveRight = function () {
    eraseCurrentTetromino();
    currentTetromino.position[0] += 1;
    if (collisionDetected())
        currentTetromino.position[0] -= 1;
    drawCurrentTetromino();
    server.emit('playfield', playfield);
};


function eraseCurrentTetromino() {
    let row = 0;
    while (row < 4) {
        let column = 0;
        while (column < 4) {
            if (playfield[currentTetromino.position[1] + row]) {
                if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] && currentTetromino.shape[row][column]) {
                    playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] = default_color;
                }
            }
            column += 1;
        }
        row += 1;
    }
}

function drawCurrentTetromino() {
    let row = 0;
    while (row < 4) {
        let column = 0;
        while (column < 4) {
            if (playfield[currentTetromino.position[1] + row]) {
                if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] && currentTetromino.shape[row][column]) {
                    playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] = currentTetromino.color;
                }
            }
            column += 1;
        }
        row += 1;
    }
}

function collisionDetected() {
    let row = 0;
    while (row < 4) {
        let column = 0;
        while (column < 4) {
            if (currentTetromino.shape[row][column]) {
                if (playfield.length - 1 < currentTetromino.position[1] + row || playfield[0].length - 1 < currentTetromino.position[0] + column)
                    return (true);
                if (currentTetromino.position[0] + column < 0)
                    return (true);
                if (playfield[currentTetromino.position[1] + row]) {
                    if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column]) {
                        if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] !== default_color)
                            return (true);
                    }
                }
            }
            column += 1;
        }
        row += 1;
    }
    return false;
}

function lineIsFilled(arr, len) {
    let i = 0;

    while (i < len) {
        if (arr[i] === default_color)
            return false;
        i += 1;
    }
    return true;
}

function clearLine(arr, len) {
    let i = 0;

    while (i < len) {
        arr[i] = default_color;
        i += 1;
    }
}

function collapseLines(i) {
    return playfield.map((item, index) => {
        if (index === 0)
            return [...line];
        if (index <= i && index > 0) {
            return playfield[index - 1];
        } else {
            return item;
        }
    });
}

function removeFilledLines() {
    let i = currentTetromino.position[1];
    let limit = i + 4;
    let result = false;

    while (i < limit) {
        if (playfield[i]) {
            if (lineIsFilled(playfield[i], 10)) {
                clearLine(playfield[i], 10);
                playfield = collapseLines(i);
            }
        }
        i += 1;
    }
    return (result);
}

let tetrominos = [pieceLine, pieceL, pieceReverseL, pieceSquare, pieceS, pieceZ, pieceT];

function nextTetromino() {
    let index = Math.floor(Math.random() * tetrominos.length);

    return new tetrominos[index];
}

function runTetris() {
    // console.log("Call");
    // console.log(new Date().getSeconds().toString() + "." + new Date().getMilliseconds().toString());

    if (currentTetromino) {
        eraseCurrentTetromino();
        currentTetromino.position[1] += 1;
        if (collisionDetected()) {
            currentTetromino.position[1] -= 1;
            drawCurrentTetromino();
            removeFilledLines();
            nextTetromino();
        } else
            drawCurrentTetromino();
    }
    server.emit('playfield', playfield);
    setTimeout(runTetris, server.interval);
}

exports.runTetris = runTetris;
