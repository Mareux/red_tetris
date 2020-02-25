import {
    CURRENT_TETROMINO,
    gameState,
    NEXT_TETROMINO,
    SET_CLEARED_LINES,
    SET_GAME_STATE,
    SET_PLAYFIELD,
    SET_SCORE
} from "../actions/game";

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
    menuState: false,
    players: [{
        username: getClientData(location.hash).username,
        host: true,
        ready: false,
    }, {
        username: "Masha",
        host: false,
        ready: true,
    }],
    host: true,
    clientData: getClientData(location.hash),
    gameState: gameState.STARTING_SCREEN,
    playfield: [...new Array(20)].map(() => {
        return [...new Array(10)].map(() => 'gray');
    }),
    nextTetromino: {
        name: "",
        shape: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        color: 'gray',
        position: [0, 0],
        rotation: 0,
    },
    currentTetromino: {
        name: "",
        shape: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        color: 'gray',
        position: [0, 0],
        rotation: 0,
    },
    score: 0,
    clearedLines: 0,
};

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
        case NEXT_TETROMINO:
            return {
                ...state,
                nextTetromino: action.nextTetromino,
            };
        case CURRENT_TETROMINO:
            return {
                ...state,
                currentTetromino: action.currentTetromino,
            };
        case SET_SCORE:
            return {
                ...state,
                score: action.score,
            };
        case SET_CLEARED_LINES:
            return {
                ...state,
                clearedLines: action.clearedLines,
            };
        default:
            return state;
    }
}

export default gameReducer;
