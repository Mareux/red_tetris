import {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {
    CLASSIC_MODE, classicMode,
    CURRENT_TETROMINO,
    currentFigure, ENEMY_PLAYFIELD, enemyPlayfield, INITIAL_ENEMY_PLAYFIELD, initialEnemyPlayfield,
    NEXT_TETROMINO,
    nextFigure, PLAYER_STATE, READY_STATE, readyState, SET_CLEARED_LINES, SET_GAME_STATE, SET_HOST, SET_LEVEL,
    SET_PLAYFIELD, SET_SCORE, setClearedLines, setGameState, setHost, setLevel, setPlayerState,
    setPlayfield, setScore
} from "../actions/game";

function useSocketDispatcher(socket) {
    const dispatch = useDispatch();
    useEffect(() => {
        socket.on(NEXT_TETROMINO, nextFigure(dispatch));
        socket.on(SET_PLAYFIELD, setPlayfield(dispatch));
        socket.on(CURRENT_TETROMINO, currentFigure(dispatch));
        socket.on(SET_SCORE, setScore(dispatch));
        socket.on(SET_LEVEL, setLevel(dispatch));
        socket.on(SET_CLEARED_LINES, setClearedLines(dispatch));
        socket.on(SET_GAME_STATE, setGameState(dispatch));
        socket.on(SET_HOST, setHost(dispatch));
        socket.on(READY_STATE, readyState(dispatch));
        socket.on(ENEMY_PLAYFIELD, enemyPlayfield(dispatch));
        socket.on(INITIAL_ENEMY_PLAYFIELD, initialEnemyPlayfield(dispatch));
        socket.on(CLASSIC_MODE, classicMode(dispatch));
        socket.on(PLAYER_STATE, setPlayerState(dispatch));
    }, [socket]);
}

export default useSocketDispatcher;
