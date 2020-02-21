import React from 'react'
import './Field.css'
import {useSelector} from "react-redux";

const Field = () => {

    const field = useSelector(store => store.playfield);
    const current = useSelector(store => store.currentTetromino);

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
