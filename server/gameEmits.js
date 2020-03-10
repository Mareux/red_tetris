import { emit } from "./server";

export function emitPlayfield(thisPlayer) {
    thisPlayer.currentTetromino.eraseTetromino(thisPlayer.playfield.playfield);
    emit("playfield", thisPlayer.playfield.playfield, thisPlayer.socketID);

    if (thisPlayer.session.gameState === "GAME_STARTED") {
        thisPlayer.session.players.forEach(function(user) {
            if (user !== thisPlayer) {
                const enemyPlayfield = {
                    username: thisPlayer.name,
                    playfield: thisPlayer.playfield.playfield
                };
                emit("enemyPlayfield", enemyPlayfield, user.socketID);
            }
        });
    }

    thisPlayer.currentTetromino.drawTetromino(thisPlayer.playfield.playfield);
}

export function emitTetromino(thisPlayer) {
    emit("tetromino", thisPlayer.currentTetromino, thisPlayer.socketID);
}

export function emitSessionState(user) {
    emit("gameState", user.session.gameState, user.socketID);
}

export function emitPlayerState(user) {
    emit("gameOver", user.gameOver, user.socketID);
}

export function emitNext(user) {
    emit("nextTetromino", user.nextTetromino, user.socketID);
}

export function emitInitialEnemyPlayfield(user) {
    const enemyPlayfield = user.session.players
        .filter(player => player.name !== user.name)
        .map(player => {
            return {
                username: player.name,
                playfield: player.playfield.playfield
            };
        });

    if (enemyPlayfield) {
        emit("initialEnemyPlayfield", enemyPlayfield, user.socketID);
    }
}

export function emitGameMode(session) {
    session.players.forEach(player => {
        emit("classicMode", session.classicMode, player.socketID);
    });
}

export function emitHostStatus(user) {
    emit("isHost", user.session.host === user.name, user.socketID);
}

export function emitReadyStates(session) {
    const playerStates = session.players.map(function(user) {
        return {
            username: user.name,
            ready: user.ready,
            host: user.host
        };
    });
    console.log(playerStates);
    session.players.forEach(function(user) {
        emit("readyState", playerStates, user.socketID);
        emitPlayfield(user);
    });
}

export function emitLevel(thisPlayer) {
    emit("level", thisPlayer.level, thisPlayer.socketID);
}
