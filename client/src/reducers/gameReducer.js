import {gameState, NEXT_FIGURE, SET_GAME_STATE, SET_PLAYFIELD} from "../actions/game";

function getClientData(hash) {
    if (!hash)
        return {
            username: "default",
            room: "default",
        };

    let split = hash.split('[');
    let room, username;
    room = split[0].slice(1);
    if (split[1]) {
        username = split[1].slice(0, split[1].length - 1);
    }

    return {
        username,
        room,
    }
}

const INITIAL_STATE = {
    clientData: getClientData(location.hash),
    gameState: gameState.STARTING_SCREEN,
    playfield: [...new Array(20)].map(() => {
        return [...new Array(10)].map(() => 'gray');
    }),
    figure: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    currentFigure: {
        position: [0, 0],
        shape: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    },

    color: "gray"
};
//
// function gameState(state = gameState.STARTING_SCREEN, action){
//     switch (action.type) {
//         case SET_GAME_STATE:
//             return action.state;
//         default:
//             return state;
//
//     }
// }

function gameReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_PLAYFIELD:
            return {
                ...state,
                playfield: action.playfield,
            };
        case SET_GAME_STATE:
            return {
                ...state,
                gameState: action.gameState
            };
        case NEXT_FIGURE:
            return {
                ...state,
                figure: action.figure,
                color: action.figure
            };
        default:
            return state;
    }
}

export default gameReducer;
