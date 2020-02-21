export const SET_GAME_STATE = 'SET_GAME_STATE';
export const NEXT_TETROMINO = 'nextTetromino';
export const CURRENT_TETROMINO = 'tetromino';

export const SET_PLAYFIELD = 'playfield';

export const gameState = {
    STARTING_SCREEN: 'STARTING_SCREEN',
    GAME_STARTED: 'GAME_STARTED',
    GAME_FINISHED: 'GAME_FINISHED'
};

export function setGameState(gameState) {
    return {
        type: SET_GAME_STATE,
        gameState
    }
}

export function nextFigure(dispatch) {
    return (nextTetromino) => {
        dispatch({
            type: NEXT_TETROMINO,
            nextTetromino,
        })
    }
}

export function currentFigure(dispatch) {
    return (currentTetromino) => {
        dispatch({
            type: CURRENT_TETROMINO,
            currentTetromino,
        })
    }
}

export function setPlayfield(dispatch) {
    return playfield => {
        dispatch({
            type: SET_PLAYFIELD,
            playfield
        });
    }
}
