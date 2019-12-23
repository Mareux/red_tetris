import {gameState, NEXT_FIGURE, SET_GAME_STATE} from "../actions/game";

const INITIAL_STATE = {
  state: gameState.STARTING_SCREEN,
  figure: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
  color: "gray"
};

function gameReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_GAME_STATE:
            return Object.assign({}, state, {
                state: action.state
            });
        case NEXT_FIGURE:
            return Object.assign({}, state, {
                figure: action.figure,
                color: action.figure
            });
        default:
            return state;
    }
}

export default gameReducer;
