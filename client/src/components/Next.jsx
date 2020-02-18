import React from 'react'
import './Next.css'
import {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {NEXT_TETROMINO, nextFigure} from "../actions/game";

function Next(props) {
    const dispatch = useDispatch();
    const next = useSelector(store => store.nextTetromino);

    useEffect(() => {
        props.socket.on(NEXT_TETROMINO, nextFigure(dispatch));//задиспачить экшн в стор
    }, [props.socket]);

    return (
        <div className="next">
            <p>Next</p>
            <div className="next_figure">{
                next.shape.map((row) => <div className={"row"}>
                    {
                        row.map((column) =>{
                            const color = !column ? 'gray' : next.color;
                            return <div
                                className={"column"}
                                style={{backgroundColor: color}}
                            />
                    })
                    }
                </div>)
            }</div>
        </div>
    );
}

export default Next
