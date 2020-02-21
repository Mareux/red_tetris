import React from 'react'
import './Next.css'
import {useSelector} from "react-redux";

function Next() {
    const next = useSelector(store => store.nextTetromino);

    return (
        <div className="next">
            <p>Next</p>
            <div className="next_figure">
                {next.shape.map((row) =>
                    <div className={"row"}>
                        {row.map((column) => {
                            const color = !column ? 'gray' : next.color;
                            return <div
                                className={"column"}
                                style={{backgroundColor: color}}
                            />
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Next
