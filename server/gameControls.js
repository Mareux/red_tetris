import { findUserInSession } from "./tetris";

export function setGameInterval(clientData, gameInterval) {
    const player = findUserInSession(clientData.room, clientData.username);

    if (!player) return;

    player.interval = gameInterval;
}

export function fallInstantly(clientData) {
    const player = findUserInSession(clientData.room, clientData.username);

    if (!player) return;

    player.interval = 0;
    player.instantFall = true;
}

export function moveLeft(clientData) {
    const player = findUserInSession(clientData.room, clientData.username);

    if (!player) return;

    player.moveLeft();
}

export function moveRight(clientData) {
    const player = findUserInSession(clientData.room, clientData.username);

    if (!player) return;

    player.moveRight();
}

export function rotateCurrentTetromino(clientData) {
    const player = findUserInSession(clientData.room, clientData.username);

    if (!player) return;

    player.rotate();
}
