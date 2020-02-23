import {useEffect} from 'react'
import {useDispatch} from "react-redux";
import {
    CURRENT_TETROMINO,
    currentFigure,
    NEXT_TETROMINO,
    nextFigure,
    SET_PLAYFIELD,
    setPlayfield
} from "../actions/game";

function useSocketDispatcher(socket) {
    const dispatch = useDispatch();
    useEffect(() => {
        socket.on(NEXT_TETROMINO, nextFigure(dispatch));
        socket.on(SET_PLAYFIELD, setPlayfield(dispatch));
        socket.on(CURRENT_TETROMINO, currentFigure(dispatch));
    }, [socket]);
}

export default useSocketDispatcher;
