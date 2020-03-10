import { findGameSession } from "./game";

export function setGameInterval(clientData, gameInterval) {
    const session = findGameSession(clientData.room);
    const player = session.findUser(clientData.username);

    if (!player) return;

    player.interval = gameInterval;
}

export function fallInstantly(clientData) {
    const session = findGameSession(clientData.room);
    const player = session.findUser(clientData.username);

    if (!player) return;

    player.interval = 0;
    player.instantFall = true;
}

export function moveLeft(clientData) {
    const session = findGameSession(clientData.room);
    const player = session.findUser(clientData.username);

    if (!player) return;

    player.moveLeft();
}

export function moveRight(clientData) {
    const session = findGameSession(clientData.room);
    const player = session.findUser(clientData.username);

    if (!player) return;

    player.moveRight();
}

export function rotateCurrentTetromino(clientData) {
    const session = findGameSession(clientData.room);
    const player = session.findUser(clientData.username);

    if (!player) return;

    player.rotate();
}
