import {gameState, SET_GAME_STATE} from "../actions/game";

const {STARTING_SCREEN} = gameState;

function game(state = STARTING_SCREEN, action) {
    switch (action.type) {
        case SET_GAME_STATE:
            return action.state;
        default:
            return state;
    }
}

export default game;
