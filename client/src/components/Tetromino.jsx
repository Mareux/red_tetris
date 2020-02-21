import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {CURRENT_TETROMINO, currentFigure} from "../actions/game";

const Tetromino = (props) => {

    const dispatch = useDispatch();
    const current = useSelector(store => store.currentTetromino);

    useEffect(() => {
        props.socket.on(CURRENT_TETROMINO, currentFigure(dispatch));//задиспачить экшн в стор
    }, [props.socket]);

    // return (
    //
    // );
};

export default Tetromino;
