import React, {useEffect} from 'react'
import './Field.css'
import useFieldSubscription from "../hooks/useFieldSubscription";
import {useDispatch, useSelector} from "react-redux";
import {CURRENT_TETROMINO, currentFigure} from "../actions/game";

const Field = (props) => {
    const field = useFieldSubscription(props.socket);

    const dispatch = useDispatch();
    const current = useSelector(store => store.currentTetromino);

    useEffect(() => {
        props.socket.on(CURRENT_TETROMINO, currentFigure(dispatch));//задиспачить экшн в стор
    }, [props.socket]);


    const drawTetromino = () => {
        const fieldCopy = field.map(row => row.map(column => column));

        for (let row = 0; row < 4; row++) {
            for (let column = 0; column < 4; column += 1) {
                if (fieldCopy[current.position[1] + row]) {
                    if (fieldCopy[current.position[1] + row][current.position[0] + column] && current.shape[row][column]) {
                        fieldCopy[current.position[1] + row][current.position[0] + column] = current.color;
                    }
                }
            }
        }

        return fieldCopy;
    };

    const fieldWithTetromino = drawTetromino();

    onmousemove = (event) => {

    };

    return (
        <div>
            {fieldWithTetromino.map((row, i) =>
                <div key={i} className="row">
                    {row.map((column, i) =>
                        <div
                            key={i}
                            className={"column"}
                            style={{backgroundColor: column}}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Field;
