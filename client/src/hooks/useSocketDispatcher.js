import {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {
    CURRENT_TETROMINO,
    currentFigure,
    NEXT_TETROMINO,
    nextFigure, SET_CLEARED_LINES, SET_HOST,
    SET_PLAYFIELD, SET_SCORE, setClearedLines, setGameState, setHost,
    setPlayfield, setScore
} from "../actions/game";

function useSocketDispatcher(socket) {
    const dispatch = useDispatch();
    useEffect(() => {
        socket.on(NEXT_TETROMINO, nextFigure(dispatch));
        socket.on(SET_PLAYFIELD, setPlayfield(dispatch));
        socket.on(CURRENT_TETROMINO, currentFigure(dispatch));
        socket.on('gameOver', setGameState(dispatch));
        socket.on(SET_SCORE, setScore(dispatch));
        socket.on(SET_CLEARED_LINES, setClearedLines(dispatch));
        socket.on('gameStarted', setGameState(dispatch));
        socket.on(SET_HOST, setHost(dispatch));
    }, [socket]);
}

export default useSocketDispatcher;
