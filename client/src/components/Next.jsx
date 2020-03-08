import React from "react";
import "./Next.css";
import { useSelector } from "react-redux";

function Next() {
    const next = useSelector(store => store.nextTetromino);


    const newNext =  [...new Array(5)].map(() => {
        return [...new Array(5)].map(() => '#111329');
    });

    const combinedNext = newNext.map((row, rowIndex) => row.map((column, index) => {
        if (rowIndex > 0 && index > 0)
            return next.shape[rowIndex - 1][index - 1];
    }));

    return (
        <div className="next">
            <p>Next</p>
            <div className="next_figure">
                {combinedNext.map(row => (
                    <div className={"row"}>
                        {row.map(column => {
                            const color = !column ? "#111329" : next.color;
                            return (
                                <div
                                    className={"column"}
                                    style={{ backgroundColor: color }}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Next;
