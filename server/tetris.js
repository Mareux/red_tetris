import { emit, interval } from "./server";
import Piece from "./piece";
import Player from "./player";
import { L, Line, ReverseL, S, Square, T, Z } from "./tetrominos";
import Playfield from "./playfield";
import {
    emitGameMode,
    emitHostStatus,
    emitInitialEnemyPlayfield, emitLevel, emitNext, emitPlayerState,
    emitPlayfield, emitReadyStates,
    emitSessionState,
    emitTetromino
} from "./gameEmits";

const autoBind = require("auto-bind");

export const defaultColor = "#111329";
export const disabledColor = "pink";

export function createPlayfield() {
    return [...new Array(20)].map(() => {
        return [...new Array(10)].map(() => defaultColor);
    });
}

const tetrominos = [
    new Piece(Line[0], "#40AEB3", [5, -2], Line),
    new Piece(L[0], "#68DF4E", [5, -2], L),
    new Piece(ReverseL[0], "#5369C2", [5, -2], ReverseL),
    new Piece(Square[0], "#F2B0EF", [5, -2], Square),
    new Piece(S[0], "#FAFE59", [5, -2], S),
    new Piece(Z[0], "#FFA65A", [5, -2], Z),
    new Piece(T[0], "#9949BF", [5, -2], T)
];

export const levelUpRequirement = 4;

const sessions = Array();

export function initialPackage(thisPlayer) {
    emitPlayfield(thisPlayer);
    emitInitialEnemyPlayfield(thisPlayer);
    emitTetromino(thisPlayer);
    emitReadyStates(thisPlayer.session);
    emitHostStatus(thisPlayer);
    emitSessionState(thisPlayer);
    emitLevel(thisPlayer);
    emit("classicMode", thisPlayer.session.classicMode, thisPlayer.socketID);
    if (thisPlayer.session.gameState === "GAME_STARTED") emitNext(thisPlayer);
}

class Game {
    constructor() {
        autoBind(this);
        this.room = "";
        this.host = "";
        this.gameState = "STARTING_SCREEN";
        this.players = Array();
        this.tetrominos = Array(createTetromino(), createTetromino());
        this.classicMode = false;
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

export function toggleGameMode(clientData) {
    const session = findGameSession(clientData.room);
    session.classicMode = !session.classicMode;
    emitGameMode(session);
}

function createTetromino() {
    const index = Math.floor(Math.random() * tetrominos.length);

    return tetrominos[index];
}

function findGameSession(room) {
    return sessions.find(element => element.room === room);
}

export function findUserInSession(room, username) {
    const session = findGameSession(room);
    if (!session) return;

    return session.players.find(user => user.name === username);
}

export const copyTetromino = tetromino => {
    return new Piece(
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
    player.host = name === session.host;
    session.players.push(player);
    player.currentTetromino = copyTetromino(session.tetrominos[0]);
    player.nextTetromino = copyTetromino(session.tetrominos[1]);
    return player;
}

function createGameSession(room, host) {
    const session = new Game();
    session.room = room;
    session.host = host;
    sessions.push(session);

    return session;
}

export function getUser(room, username, socketID) {
    const session = findGameSession(room) || createGameSession(room, username);

    const user = findUserInSession(room, username);

    if (!user) {
        console.log(`User "${username}" not found in session, adding...`);
        return createPlayer(session, username, socketID);
    } else {
        console.log(`User "${username}" is already in session.`);
        user.socketID = socketID;
        initialPackage(user);
    }
}

export function parseUsername(split) {
    return split[1] ? split[1].slice(0, split[1].length - 1) : undefined;
}


function sendInitialPackageToEveryone(room) {
    findGameSession(room).players.forEach(player => {
        initialPackage(player);
    });
}

export function joinTetris(hash, socketID) {
    const split = hash.split("[");
    const room = split[0].slice(1);
    const username = parseUsername(split);

    console.log("joinTetris() called");
    console.log(`User "${username}" tried to connect to room: "${room}"`);
    const user = getUser(room, username, socketID);

    if (user)
        sendInitialPackageToEveryone(room);
}

function readyCheck(session) {
    if (!session) return;
    return session.players.every(user => user.ready);
}

function startGameForAllUsers(session) {
    resetGame(session);
    if (session.gameState !== "GAME_STARTED")
        session.gameState = "GAME_STARTED";

    session.players.forEach(function(user) {
        initialPackage(user);
        clearTimeout(() => {
            if (user) user.play();
        }, interval);
        setTimeout(() => {
            if (user) user.play();
        }, interval);
        emitSessionState(user);
    });
}

export function resetGame(session) {
    session.gameState = "GAME_FINISHED";
    session.tetrominos = Array(createTetromino(), createTetromino());

    session.players.forEach(player => {
        player.playfield = new Playfield(createPlayfield());
        player.currentTetromino = null;
        player.nextTetromino = null;
        player.nextTetrominoIndex = 0;
        player.tetrominos = null;
        player.interval = 300;
        player.gameOver = false;
        player.score = 0;
        player.level = 1;
        player.linesToLevelUp = levelUpRequirement;
        player.totalClearedLines = 0;
        player.ready = false;
        player.currentTetromino = copyTetromino(session.tetrominos[0]);
        player.nextTetromino = copyTetromino(session.tetrominos[1]);
        player.instantFall = false;
    });
}

export function startGame(clientData) {
    const session = findGameSession(clientData.room);

    if (readyCheck(session) !== false && session.gameState !== "GAME_STARTED")
        startGameForAllUsers(session);
}

export function finishGame(session) {
    session.gameState = "GAME_FINISHED";
}

export function updatePlayer(thisPlayer) {
    emitPlayfield(thisPlayer);
    emitTetromino(thisPlayer);
    emitHostStatus(thisPlayer);
    emitSessionState(thisPlayer);
    emitPlayerState(thisPlayer);
    emitLevel(thisPlayer);
}

export function updateAllPlayers(session) {
    session.players.forEach(player => {
        initialPackage(player);
    });
}

export function checkGameOver(session) {
    return session.players.every(player => player.gameOver);
}

export function toggleReady(clientData) {
    const user = findUserInSession(clientData.room, clientData.username);

    if (!user) return;

    user.ready = !user.ready;
    console.log(user.ready);

    const session = findGameSession(clientData.room);
    emitReadyStates(session);
}
