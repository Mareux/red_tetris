import { emit, interval } from "./server";
import Tetromino from "./tetromino";
import Player from "./player";
import { L, Line, ReverseL, S, Square, T, Z } from "./tetrominos";

const autoBind = require("auto-bind");

export const defaultColor = "gray";
export const disabledColor = "pink";

export function createPlayfield() {
    return [...new Array(20)].map(() => {
        return [...new Array(10)].map(() => defaultColor);
    });
}

export function emitEvents(thisPlayer) {
    emit("playfield", thisPlayer.playfield.playfield, thisPlayer.socketID);
}

export function emitPlayfield(thisPlayer) {
    thisPlayer.currentTetromino.eraseTetromino(thisPlayer.playfield.playfield);
    emit("playfield", thisPlayer.playfield.playfield, thisPlayer.socketID);

    thisPlayer.session.players.forEach(function(user) {
        if (user !== thisPlayer) {
            const enemyPlayfield = {
                username: thisPlayer.name,
                playfield: thisPlayer.playfield.playfield
            };
            emit("enemyPlayfield", enemyPlayfield, user.socketID);
        }
    });

    thisPlayer.currentTetromino.drawTetromino(thisPlayer.playfield.playfield);
}

export function emitTetromino(thisPlayer) {
    emit("tetromino", thisPlayer.currentTetromino, thisPlayer.socketID);
}

export function emitSessionState(user){
    emit("gameState", user.session.gameState, user.socketID)
}

function initialPackage(thisPlayer) {
    emitPlayfield(thisPlayer);
    emitTetromino(thisPlayer);
    emitReadyStates(thisPlayer.session);
    emitHostStatus(thisPlayer);
    emitSessionState(thisPlayer);
}

class GameSession {
    constructor() {
        autoBind(this);
        this.room = "";
        this.host = "";
        this.gameState = "STARTING_SCREEN";
        this.players = Array();
        this.tetrominos = Array(createTetromino(), createTetromino());
    }

    newTetromino() {
        this.tetrominos.push(createTetromino());
    }

    disableLines(user) {
        this.players.forEach(element => {
            if (element !== user) {
                element.disableLine();
            }
        });
    }
}

const tetrominos = [
    new Tetromino(Line[0], "cyan", [5, -2], Line),
    new Tetromino(L[0], "orange", [5, -2], L),
    new Tetromino(ReverseL[0], "blue", [5, -2], ReverseL),
    new Tetromino(Square[0], "yellow", [5, -2], Square),
    new Tetromino(S[0], "green", [5, -2], S),
    new Tetromino(Z[0], "red", [5, -2], Z),
    new Tetromino(T[0], "purple", [5, -2], T)
];

function createTetromino() {
    const index = Math.floor(Math.random() * tetrominos.length);

    return tetrominos[index];
}

const sessions = Array();

function findGameSession(room) {
    return sessions.find(element => element.room === room);
}

function findUserInSession(room, username) {
    const session = findGameSession(room);
    if (!session) return;

    return session.players.find(user => user.name === username);
}

export const copyTetromino = tetromino => {
    return new Tetromino(
        tetromino.shape,
        tetromino.color,
        [0, -1],
        tetromino.rotationArray
    );
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

function createGameSession(room, host) {
    const session = new GameSession();
    session.room = room;
    session.host = host;
    sessions.push(session);

    return session;
}

export function setGameInterval(usernameAndRoom, gameInterval) {
    const player = findUserInSession(usernameAndRoom[1], usernameAndRoom[0]);
    player.interval = gameInterval;
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

function getUser(room, username, socketID) {
    const session = findGameSession(room) || createGameSession(room, username);

    const user = findUserInSession(room, username);

    if (!user) {
        console.log(`User "${username}" not found in session, adding...`);
        return createPlayer(session, username, socketID);
    } else {
        console.log(`User "${username}" is already in session.`);
        user.socketID = socketID;
    }
}

export function parseUsername(split) {
    return split[1] ? split[1].slice(0, split[1].length - 1) : undefined;
}

function emitHostStatus(user) {
    emit("isHost", user.session.host === user.name, user.socketID);
}

export function joinTetris(hash, socketID) {
    const split = hash.split("[");
    const room = split[0].slice(1);
    const username = parseUsername(split);

    console.log("joinTetris() called");
    console.log(`User "${username}" tried to connect to room: "${room}"`);
    getUser(room, username, socketID);

    const user = findUserInSession(room, username);
    initialPackage(user);
}

function readyCheck(session) {
    return session.players.every(user => user.ready);
}

function startGameForAllUsers(session) {
    session.players.map(function(user) {
        setTimeout(() => {
            if (user) user.play();
        }, interval);
        session.gameState = "GAME_STARTED";
        emitSessionState(user);
    });
}

export function startGame(clientData) {
    const session = findGameSession(clientData.room);
    console.log("Function returns: ", readyCheck(session));
    if (readyCheck(session) !== false) startGameForAllUsers(session);
}

function emitReadyStates(session) {
    const playerStates = Array();
    session.players.forEach(function(user) {
        const readyState = {
            username: user.name,
            ready: user.ready,
            host: user.host
        };
        playerStates.push(readyState);
    });
    console.log(playerStates);
    session.players.forEach(function(user) {
        emit("readyState", playerStates, user.socketID);
    });
}

export function toggleReady(clientData) {
    const user = findUserInSession(clientData.room, clientData.username);
    user.ready = !user.ready;
    console.log(user.ready);
    const session = findGameSession(clientData.room);
    emitReadyStates(session);
}
