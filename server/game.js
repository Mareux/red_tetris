import { emit } from "./server";
import {
    emitGameMode,
    emitHostStatus,
    emitInitialEnemyPlayfield,
    emitLevel,
    emitNext,
    emitPlayerState,
    emitPlayfield,
    emitReadyStates,
    emitSessionState,
    emitTetromino
} from "./gameEmits";
import Session from "./session";
import { parseUsername } from "./utils";

export const defaultColor = "#111329";
export const disabledColor = "pink";

export function createPlayfield() {
    return [...new Array(20)].map(() => {
        return [...new Array(10)].map(() => defaultColor);
    });
}

export const levelUpRequirement = 4;

const sessions = Array();

export function joinSession(hash, socketID) {
    const split = hash.split("[");
    const room = split[0].slice(1);
    const username = parseUsername(split);

    console.log("joinTetris() called");
    console.log(`User "${username}" tried to connect to room: "${room}"`);
    const user = getUser(room, username, socketID);

    if (user) sendInitialPackageToEveryone(room);
}

export function getUser(room, username, socketID) {
    const session = findGameSession(room) || createGameSession(room, username);

    const user = session.findUser(username);

    if (!user) {
        console.log(`User "${username}" not found in session, adding...`);
        return session.addPlayer(username, socketID);
    } else {
        console.log(`User "${username}" is already in session.`);
        user.socketID = socketID;
        initialPackage(user);
    }
}

export function leaveSession(clientData) {
    const session = findGameSession(clientData.room);

    if (!session) return;

    const user = session.findUser(clientData.username);

    if (user.host) {
        const index = session.players.indexOf(user);
        if (index < session.players.length - 1) {
            session.players[index + 1].host = true;
            session.host = session.players[index + 1].username;
        }
    }

    session.players = session.players.filter(player => {
        return clientData.username !== player.name;
    });

    sendInitialPackageToEveryone(clientData.room);
}

export function startGame(clientData) {
    const session = findGameSession(clientData.room);

    if (!session) return;

    if (session.readyCheck() !== false && session.gameState !== "GAME_STARTED")
        session.startGame();
}

export function toggleGameMode(clientData) {
    const session = findGameSession(clientData.room);
    session.classicMode = !session.classicMode;
    emitGameMode(session);
}

export function toggleReady(clientData) {
    const session = findGameSession(clientData.room);
    if (!session) return;

    const user = session.findUser(clientData.username);

    if (!user) return;

    user.ready = !user.ready;
    console.log(user.ready);
    emitReadyStates(session);
}

function createGameSession(room, host) {
    const session = new Session();
    session.room = room;
    session.host = host;
    sessions.push(session);

    return session;
}

export function findGameSession(room) {
    return sessions.find(session => session.room === room);
}

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

function sendInitialPackageToEveryone(room) {
    findGameSession(room).players.forEach(player => {
        initialPackage(player);
    });
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
