import {emit, interval} from "./server";
import Tetromino from "./tetrimino";
import Player from "./player";
import {L, Line, ReverseL, S, Square, T, Z} from "./tetrominos";

const autoBind = require('auto-bind');

const defaultColor = 'gray';
const disabledColor = 'pink';

export function createPlayfield() {
    return [...new Array(20)].map(() => {
        return [...new Array(10)].map(() => defaultColor);
    });
}

export function emitEvents(thisPlayer) {
    emit('playfield', thisPlayer.playfield, thisPlayer.socketID);
}

class GameSession {
    constructor() {
        autoBind(this);
        this.room = "";
        this.host = "";
        this.players = Array();
        this.tetrominos = Array(nextTetromino(), nextTetromino());
    }

    newTetromino() {
        this.tetrominos.push(nextTetromino());
    }

    disableLines(user) {
        this.players.forEach(element => {
            if (element !== user) {
                element.disableLine();
            }
        });
    }
}

const sessions = Array();

function findGameSession(room) {
    return sessions.find(element => element.room === room);
}

function findUserInSession(room, username) {
    const session = findGameSession(room);
    if (!session)
        return;

    return session.players.find(user => user.name === username);
}

export const copyTetromino = (tetromino) => {
    return new Tetromino(tetromino.shape, tetromino.color, [0, -1], tetromino.rotationArray);
};

function createPlayer(session, name, socketID) {
    const player = new Player();
    player.session = session;
    player.name = name;
    player.socketID = socketID;
    session.players.push(player);
    player.currentTetromino = copyTetromino(session.tetrominos[0]);
    player.nextTetromino = copyTetromino(session.tetrominos[1]);
    return player;
}

function createGameSession(room, host, socketID) {
    const session = new GameSession();
    session.room = room;
    session.host = host;

    createPlayer(session, host, socketID);
    sessions.push(session);

    return session;
}

function joinGameSession(room, user, socketID) {
    const session = findGameSession(room);
    return createPlayer(session, user, socketID);
}

export function moveLeft(usernameAndRoom) {
    const player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
    player.moveLeft();
}

export function moveRight(usernameAndRoom) {
    const player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
    player.moveRight();
}

export function rotateCurrentTetromino(usernameAndRoom) {
    const player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
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
                        if (playfield[currentTetromino.position[1] + row][currentTetromino.position[0] + column] !== defaultColor)
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

function lineIsFilled(line) {
    return !line.some(cell => cell === defaultColor || cell === disabledColor);
}

function clearLine(line) {
    for (let i = 0; i < line.length; i++) {
        line[i] = defaultColor;
    }
}

function collapseLines(i, playfield) {
    for (let row = i; row > 0; row--) {
        for (let column = 0; column < 10; column++) {
            playfield[row][column] = playfield[row - 1][column];
        }
    }
}

export function clearFilledLines(playfield, currentTetromino) {
    let currentLineIndex = currentTetromino.position[1];
    const lastClearableLineIndex = currentLineIndex + 4;
    let clearedLines = 0;

    while (currentLineIndex < lastClearableLineIndex) {
        if (playfield[currentLineIndex]) {
            if (lineIsFilled(playfield[currentLineIndex])) {
                clearLine(playfield[currentLineIndex]);
                collapseLines(currentLineIndex, playfield);
                clearedLines++;
            }
        }
        currentLineIndex += 1;
    }
    return (clearedLines);
}

const tetrominos = [new Tetromino(Line[0], 'cyan', [0, -1], Line),
    new Tetromino(L[0], 'orange', [0, -1], L),
    new Tetromino(ReverseL[0], "blue", [0, -1], ReverseL),
    new Tetromino(Square[0], 'yellow', [0, -1], Square),
    new Tetromino(S[0], 'green', [0, -1], S),
    new Tetromino(Z[0], 'red', [0, -1], Z),
    new Tetromino(T[0], 'purple', [0, -1], T)];

function nextTetromino() {
    const index = Math.floor(Math.random() * tetrominos.length);

    return tetrominos[index];
}

function createSessionWithUser(room, username, socketID) {
    console.log("Session not found, attempting to create a new session");
    const newSession = createGameSession(room, username, socketID);
    if (!newSession) {
        console.log("Failed to create a session.");
    } else {
        console.log(`Session "${room}" successfully created with "${newSession.host}" as host.`);
    }
    return newSession.players[0];
}

function getUser(room, username, socketID) {
    if (!findGameSession(room))
        return createSessionWithUser(room, username, socketID);

    console.log("Session found, attempting to join.");
    const user = findUserInSession(room, username);

    if (!user) {
        console.log(`User "${username}" not found in session, adding...`);
        return joinGameSession(room, username, socketID);
    } else {
        console.log(`User "${username}" is already in session.`);
    }

    return user;
}

function parseUsername(split) {
    return split[1]
        ? split[1].slice(0, split[1].length - 1)
        : undefined;
}

export function joinTetris(hash, socketID) {
    const split = hash.split('[');
    const room = split[0].slice(1);
    const username = parseUsername(split);

    console.log("joinTetris() called");
    console.log(`User "${username}" tried to connect to room: "${room}"`);

    const user = getUser(room, username, socketID);
    setInterval(() => {
        user.play()
    }, interval);
}
