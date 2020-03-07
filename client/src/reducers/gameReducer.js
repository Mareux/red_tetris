import {
    CURRENT_TETROMINO, ENEMY_PLAYFIELD,
    gameState, GET_CLIENT_DATA,
    NEXT_TETROMINO, READY_STATE,
    SET_CLEARED_LINES,
    SET_GAME_STATE, SET_HOST, SET_LEVEL,
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
    clientData: getClientData(location.hash),
    menuState: false,
    players: [{
        username: getClientData(location.hash).username,
        host: false,
        ready: false,
    }],
    host: true,
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
    enemyPlayfield: null,
    score: 0,
    clearedLines: 0,
    level: 1,
};

function gameReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CLIENT_DATA:
            return {
              ...state,
              clientData: action.clientData
            };
        case SET_PLAYFIELD:
            return {
                ...state,
                playfield: action.playfield,
            };
        case ENEMY_PLAYFIELD:
            return {
              ...state,
              enemyPlayfield: action.enemyPlayfield,
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
        case SET_LEVEL:
            return {
              ...state,
              level: action.level,
            };
        case SET_CLEARED_LINES:
            return {
                ...state,
                clearedLines: action.clearedLines,
            };
        case SET_HOST:
            return {
                ...state,
                host: action.host,
            };
        case READY_STATE:
            return {
                ...state,
                players: action.players,
            };
        default:
            return state;
    }
}

export default gameReducer;
