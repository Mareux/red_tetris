export const SET_GAME_STATE = 'SET_GAME_STATE';
export const NEXT_FIGURE = 'NEXT_FIGURE';
export const CURRENT_FIGURE = 'CURRENT_FIGURE';

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

export function nextFigure(figure, color) {
    return {
        type: NEXT_FIGURE,
        figure,
        color
    }
}

export function currentFigure(figure, color) {
    return {
        type: CURRENT_FIGURE,
        figure,
        color
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
