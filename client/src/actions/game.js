export const SET_GAME_STATE = "gameState";
export const NEXT_TETROMINO = "nextTetromino";
export const CURRENT_TETROMINO = "tetromino";
export const SET_SCORE = "score";
export const SET_LEVEL = "level";
export const SET_CLEARED_LINES = "clearedLines";
export const SET_HOST = "isHost";
export const READY_STATE = "readyState";
export const ENEMY_PLAYFIELD = "enemyPlayfield";
export const GET_CLIENT_DATA = "GET_CLIENT_DATA";
export const INITIAL_ENEMY_PLAYFIELD = "initialEnemyPlayfield";
export const CLASSIC_MODE = "classicMode";
export const PLAYER_STATE = "gameOver";

export const SET_PLAYFIELD = "playfield";

export const gameState = {
    STARTING_SCREEN: "STARTING_SCREEN",
    GAME_STARTED: "GAME_STARTED",
    GAME_PAUSE: "GAME_PAUSE",
    GAME_FINISHED: "GAME_FINISHED"
};

export function getClientData(dispatch) {
    return clientData => {
        dispatch({
            type: GET_CLIENT_DATA,
            clientData
        });
    };
}

export function classicMode(dispatch) {
    return classicMode => {
        dispatch({
            type: CLASSIC_MODE,
            classicMode
        });
    };
}

export function initialEnemyPlayfield(dispatch) {
    return enemyPlayfield => {
        dispatch({
            type: INITIAL_ENEMY_PLAYFIELD,
            enemyPlayfield
        });
    };
}

export function enemyPlayfield(dispatch) {
    return enemyPlayfield => {
        dispatch({
            type: ENEMY_PLAYFIELD,
            enemyPlayfield
        });
    };
}

export function readyState(dispatch) {
    return players => {
        dispatch({
            type: READY_STATE,
            players
        });
    };
}

export function setHost(dispatch) {
    return host => {
        dispatch({
            type: SET_HOST,
            host
        });
    };
}

export function setScore(dispatch) {
    return score => {
        dispatch({
            type: SET_SCORE,
            score
        });
    };
}

export function setLevel(dispatch) {
    return level => {
        dispatch({
            type: SET_LEVEL,
            level
        });
    };
}

export function setClearedLines(dispatch) {
    return clearedLines => {
        dispatch({
            type: SET_CLEARED_LINES,
            clearedLines
        });
    };
}

export function setPlayerState(dispatch) {
    return gameOver => {
        dispatch({
            type: PLAYER_STATE,
            gameOver
        })
    }
}

export function setGameState(dispatch) {
    return gameState => {
        dispatch({
            type: SET_GAME_STATE,
            gameState
        });
    };
}

export function nextFigure(dispatch) {
    return nextTetromino => {
        dispatch({
            type: NEXT_TETROMINO,
            nextTetromino
        });
    };
}

export function currentFigure(dispatch) {
    return currentTetromino => {
        dispatch({
            type: CURRENT_TETROMINO,
            currentTetromino
        });
    };
}

export function setPlayfield(dispatch) {
    return playfield => {
        dispatch({
            type: SET_PLAYFIELD,
            playfield
        });
    };
}
