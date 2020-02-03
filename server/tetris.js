const server = require("./server");
const rotations = require("./tetrominos");

let default_color = 'gray';

let color = default_color;

let yellow = 'yellow';
let blue = 'blue';
let purple = 'purple';

function createPlayfield() {
    let line = [color, color, color, color, color, color, color, color, color, color];
    let playfield = [[...line],
        [...line],
        [...line],
        [...line],
        [...line],
        [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line],
        [...line], [...line], [...line], [...line], [...line], [...line]];
    return playfield;
}

function emitEvents(thisPlayer) {
    server.emit('playfield', thisPlayer.playfield, thisPlayer.socketID);
    server.emit('nextTetromino', thisPlayer.nextTetromino, thisPlayer.socketID);
}

class Player {
    constructor() {
        this.session = false;
        this.playfield = createPlayfield();
        this.name = "";
        this.currentTetromino = nextTetromino();
        this.nextTetromino = nextTetromino();
        this.socketID = false;
        this.play = () => {
            if (this.currentTetromino) {
                        eraseCurrentTetromino(this.playfield, this.currentTetromino);
                        this.currentTetromino.position[1] += 1;
                        if (collisionDetected(this.playfield, this.currentTetromino)) {
                            this.currentTetromino.position[1] -= 1;
                            drawCurrentTetromino(this.playfield, this.currentTetromino);
                            removeFilledLines(this.playfield, this.currentTetromino);
                            this.newTetromino();
                        } else
                            drawCurrentTetromino(this.playfield, this.currentTetromino);
                    }
           server.emit('playfield', this.playfield, this.socketID);
        };
        this.newTetromino = function() {
            this.currentTetromino = this.nextTetromino;
            this.nextTetromino = nextTetromino();
        }
        this.moveLeft = function() {
            eraseCurrentTetromino(this.playfield, this.currentTetromino);
            this.currentTetromino.position[0] -= 1;
            if (collisionDetected(this.playfield, this.currentTetromino))
                this.currentTetromino.position[0] += 1;
            drawCurrentTetromino(this.playfield, this.currentTetromino);
            emitEvents(this);
        };
        this.moveRight = function() {
            eraseCurrentTetromino(this.playfield, this.currentTetromino);
            this.currentTetromino.position[0] += 1;
            if (collisionDetected(this.playfield, this.currentTetromino))
                this.currentTetromino.position[0] -= 1;
            drawCurrentTetromino(this.playfield, this.currentTetromino);
            emitEvents(this);
        };
        this.cancelRotation = function () {
            if (this.currentTetromino.name === "Line")
                this.unrotate(rotations.Line);
            else if (this.currentTetromino.name === "T")
                this.unrotate(rotations.T);
            else if (this.currentTetromino.name === "L")
                this.unrotate(rotations.L);
            else if (this.currentTetromino.name === "ReverseL")
                this.unrotate(rotations.ReverseL);
            else if (this.currentTetromino.name === "S")
                this.unrotate(rotations.S);
            else if (this.currentTetromino.name === "Z")
                this.unrotate(rotations.Z);
            emitEvents(this);
        };
        this.unrotate = function(arr) {
            if (this.currentTetromino.rotation < 1) {
                this.currentTetromino.shape = arr[3];
                this.currentTetromino.rotation = 3;
            } else {
                this.currentTetromino.rotation -= 1;
                this.currentTetromino.shape = arr[this.currentTetromino.rotation];
            }
        }
        this.tryTetrominoPosition = function(position) {
            let tmp = [...(this.currentTetromino.position)];

            this.currentTetromino.position[0] = position[0];
            this.currentTetromino.position[1] = position[1];
            if (collisionDetected(this.playfield, this.currentTetromino)) {
                this.currentTetromino.position[0] = tmp[0];
                this.currentTetromino.position[1] = tmp[1];
                return false;
            }
            return true;
        }
        this.wallKick = function() {
            if (this.tryTetrominoPosition([this.currentTetromino.position[0] - 1, this.currentTetromino.position[1]])) {
                return ;
            }
            if (this.tryTetrominoPosition([this.currentTetromino.position[0] + 1, this.currentTetromino.position[1]])) {
                return ;
            }
            if (this.tryTetrominoPosition([this.currentTetromino.position[0], this.currentTetromino.position[1] - 1])) {
                return ;
            }
            if (this.tryTetrominoPosition([this.currentTetromino.position[0], this.currentTetromino.position[1] + 1])) {
                return ;
            }
            if (this.tryTetrominoPosition([this.currentTetromino.position[0] - 2, this.currentTetromino.position[1]])) {
                return ;
            }
            if (this.tryTetrominoPosition([this.currentTetromino.position[0] + 2, this.currentTetromino.position[1]])) {
                return ;
            }
            if (this.tryTetrominoPosition([this.currentTetromino.position[0], this.currentTetromino.position[1] - 2])) {
                return ;
            }
            if (this.tryTetrominoPosition([this.currentTetromino.position[0], this.currentTetromino.position[1] + 2])) {
                return ;
            }
            this.cancelRotation();
        }
        this.rotate = function(arr) {
            eraseCurrentTetromino(this.playfield, this.currentTetromino);
            if (this.currentTetromino.rotation > 2) {
                this.currentTetromino.shape = arr[0];
                this.currentTetromino.rotation = 0;
            } else {
                this.currentTetromino.rotation += 1;
                this.currentTetromino.shape = arr[this.currentTetromino.rotation];
            }
            if (collisionDetected(this.playfield, this.currentTetromino))
                this.wallKick();
            drawCurrentTetromino(this.playfield, this.currentTetromino);
        }
        this.rotateCurrentTetromino = function() {
            if (this.currentTetromino.name === "Line")
                this.rotate(rotations.Line);
            else if (this.currentTetromino.name === "T")
                this.rotate(rotations.T);
            else if (this.currentTetromino.name === "L")
                this.rotate(rotations.L);
            else if (this.currentTetromino.name === "ReverseL")
                this.rotate(rotations.ReverseL);
            else if (this.currentTetromino.name === "S")
                this.rotate(rotations.S);
            else if (this.currentTetromino.name === "Z")
                this.rotate(rotations.Z);
            emitEvents(this);
        }
    }
}

class GameSession {
    constructor() {
        this.room = "";
        this.host = "";
        this.players = Array();
    }
}

let sessions = Array();

function findGameSession(room) {
    let result = false;
    sessions.map(function (session) {
        if (session.room === room) {
            result = session;
        }
    });
    return (result);
}

function findUserInSession(room, username) {
    let session = findGameSession(room);
    let result = false;
    if (!session.players)
        return ;
    session.players.map(function (user) {
        if (user.name === username) {
            result = user;
        }
    });
    return (result);
}

function createGameSession(room, host, socketID) {
    let session = new GameSession();
    session.room = room;
    session.host = host;

    let player = new Player();
    player.session = session;
    player.name = host;
    player.socketID = socketID;
    session.players.push(player);
    sessions.push(session);
}

function joinGameSession(room, user, socketID) {
    let session = findGameSession(room);
    let player = new Player();
    player.session = session;
    player.name = user;
    player.socketID = socketID;
    session.players.push(player);
}










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



exports.moveLeft = function(usernameAndRoom) {
    let player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
    player.moveLeft();
};

exports.moveRight = function(usernameAndRoom) {
    let player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
    player.moveRight();
};

exports.rotateCurrentTetromino = function(usernameAndRoom) {
    let player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
    player.rotateCurrentTetromino();
}


function eraseCurrentTetromino(playfield, currentTetromino) {
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

function drawCurrentTetromino(playfield, currentTetromino) {
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

function collisionDetected(playfield, currentTetromino) {
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

function collapseLines(i, playfield) {
    let line = [color, color, color, color, color, color, color, color, color, color];
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

function removeFilledLines(playfield, currentTetromino) {
    let i = currentTetromino.position[1];
    let limit = i + 4;

    while (i < limit) {
        if (playfield[i]) {
            if (lineIsFilled(playfield[i], 10)) {
                clearLine(playfield[i], 10);
                playfield = collapseLines(i, playfield);
            }
        }
        i += 1;
    }
}

let tetrominos = [pieceLine, pieceL, pieceReverseL, pieceSquare, pieceS, pieceZ, pieceT];

function nextTetromino() {
    let index = Math.floor(Math.random() * tetrominos.length);

    return new tetrominos[index];
}

function joinTetris(client, hash, socketID) {
    let split = hash.split('[');
    let room, username, user;
    room = split[0].slice(1);
    if (split[1]) {
        username = split[1].slice(0, split[1].length - 1);
    }
    console.log("joinTetris() called");
    console.log("User \"" + username + "\" tried to connect to room: \"" + room + "\"");
    let session = findGameSession(room);
    if (session === false) {
        console.log("Session not found, attempting to create a new session");
        createGameSession(room, username, socketID);
        session = findGameSession(room);
        if (!session) {
            console.log("Failed to create a session.");
        }
        else {
            console.log("Session \"" + room + "\" successfully created with \"" + session.host + "\" as host.");
        }
        user = session.players[0];
    }
    else {
        console.log("Session found, attempting to join.");
        user = findUserInSession(room, username);
        if (!user) {
            console.log("User \"" + username + "\" not found in session, adding...");
            joinGameSession(room, username, socketID);
        }
        else {
            console.log("User \"" + username + "\" is already in session.");
        }
    }
    setInterval(user.play, server.interval);
}

exports.joinTetris = joinTetris;
