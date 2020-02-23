import React from 'react'
import './Field.css'
import {useSelector} from "react-redux";
import {gameState} from "../actions/game";

let gameOverAnimationStarted = false;
let currentCell = [0, 0];
let playfield = null;
function gameOverAnimation() {
    playfield[currentCell[0]][currentCell[1]] = 'black';
    if (currentCell[0] < 9)
        currentCell[0] += 1;
    else {
        currentCell[0] = 0;
        currentCell[1] += 1;
    }
    if (currentCell[1] < 19)
        setTimeout(() => gameOverAnimation(), 50);
        console.log(currentCell);
}

const Field = () => {

    const field = useSelector(store => store.playfield);
    const current = useSelector(store => store.currentTetromino);
    const gameState = useSelector(store => store.gameState);

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

    if (gameState === 'GAME_FINISHED') {
        // if (!gameOverAnimationStarted) {
        //     gameOverAnimationStarted = true;
            playfield = fieldWithTetromino;
            gameOverAnimation();
        // }
    }

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
