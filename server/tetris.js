import {emit, interval} from "./server";
import Tetromino from "./tetrimino";
import Player from "./player";
import {L, Line, ReverseL, S, Square, T, Z} from "./tetrominos";

const autoBind = require('auto-bind');

const default_color = 'gray';
const disabledColor = 'pink';

const color = default_color;

export function createPlayfield() {
    let line = [color, color, color, color, color, color, color, color, color, color];
    return [[...line],
        [...line],
        [...line],
        [...line],
        [...line],
        [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line],
        [...line], [...line], [...line], [...line], [...line], [...line]];
}

export function emitEvents(thisPlayer) {
    emit('playfield', thisPlayer.playfield, thisPlayer.socketID);
}

class GameSession {
    constructor() {
        this.room = "";
        this.host = "";
        this.players = Array();
        this.tetrominos = Array(nextTetromino(), nextTetromino());
        this.newTetromino = function () {
            this.tetrominos.push(nextTetromino());
        };
        this.disableLines = function (user) {
            this.players.forEach(function (element) {
                if (element !== user) {
                    element.disableLine();
                }
            });
        }
    }
}

let sessions = Array();

function findGameSession(room) {
    return sessions.find(element => element.room === room);
}

function findUserInSession(room, username) {
    let session = findGameSession(room);
    if (!session)
        return;

    return session.players.find(user => user.name === username);
}

export const copyTetromino = (tetromino) => {
  return new Tetromino(tetromino.shape, tetromino.color, [0, -1], tetromino.rotationArray);
};

function createPlayer(session, name, socketID) {
    let player = new Player();
    player.session = session;
    player.name = name;
    player.socketID = socketID;
    session.players.push(player);
    player.currentTetromino = copyTetromino(session.tetrominos[0]);
    player.nextTetromino = copyTetromino(session.tetrominos[1]);
    return player;
}

function createGameSession(room, host, socketID) {
    let session = new GameSession();
    session.room = room;
    session.host = host;

    createPlayer(session, host, socketID);
    sessions.push(session);
}

function joinGameSession(room, user, socketID) {
    let session = findGameSession(room);
    let player = createPlayer(session, user, socketID);
    return (player);
}

export function moveLeft(usernameAndRoom) {
    let player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
    player.moveLeft();
}

export function moveRight(usernameAndRoom) {
    let player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
    player.moveRight();
}

export function rotateCurrentTetromino(usernameAndRoom) {
    let player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
    player.rotate();
}

export function collisionDetected(playfield, currentTetromino) {
    let row = 0;
    while (row < 4) {
        let column = 0;
        while (column < 4) {
            if (currentTetromino.shape[row][column]) {
                if (playfield.length - 1 < currentTetromino.position[1] + row || playfield[0].length - 1 < currentTetromino.position[0] + column)
                    return true;
                if (currentTetromino.position[0] + column < 0)
                    return true;
                if (playfield[currentTetromino.position[1] + row]) {
                    if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column]) {
                        if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] !== default_color)
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

function lineIsFilled(arr, len) {
    let i = 0;

    while (i < len) {
        if (arr[i] === default_color || arr[i] === disabledColor)
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
    for (let row = i; row > 0; row--) {
        for (let column = 0; column < 10; column++) {
            playfield[row][column] = playfield[row - 1][column];
        }
    }
}

export function removeFilledLines(playfield, currentTetromino) {
    let i = currentTetromino.position[1];
    let limit = i + 4;
    let clearedLines = 0;

    while (i < limit) {
        if (playfield[i]) {
            if (lineIsFilled(playfield[i], 10)) {
                clearLine(playfield[i], 10);
                collapseLines(i, playfield);
                clearedLines++;
            }
        }
        i += 1;
    }
    return (clearedLines);
}

let tetrominos = [new Tetromino(Line[0], 'cyan', [0, -1], Line),
    new Tetromino(L[0], 'orange', [0, -1], L),
    new Tetromino(ReverseL[0], "blue", [0, -1], ReverseL),
    new Tetromino(Square[0], 'yellow', [0, -1], Square),
    new Tetromino(S[0], 'green', [0, -1], S),
    new Tetromino(Z[0], 'red', [0, -1], Z),
    new Tetromino(T[0], 'purple', [0, -1], T)];

function nextTetromino() {
    let index = Math.floor(Math.random() * tetrominos.length);

    return tetrominos[index];
}

export function joinTetris(hash, socketID) {
    let split = hash.split('[');
    let room, username, user;
    room = split[0].slice(1);
    if (split[1]) {
        username = split[1].slice(0, split[1].length - 1);
    }
    console.log("joinTetris() called");
    console.log("User \"" + username + "\" tried to connect to room: \"" + room + "\"");
    let session = findGameSession(room);
    if (!session) {
        console.log("Session not found, attempting to create a new session");
        createGameSession(room, username, socketID);
        session = findGameSession(room);
        if (!session) {
            console.log("Failed to create a session.");
        } else {
            console.log("Session \"" + room + "\" successfully created with \"" + session.host + "\" as host.");
        }
        user = session.players[0];
    } else {
        console.log("Session found, attempting to join.");
        user = findUserInSession(room, username);
        if (!user) {
            console.log("User \"" + username + "\" not found in session, adding...");
            user = joinGameSession(room, username, socketID);
        } else {
            console.log("User \"" + username + "\" is already in session.");
        }
    }
    setInterval(() => {
        user.play()
    }, interval);
}
