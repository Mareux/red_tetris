import React from 'react'
import './Field.css'
import useSubscription from "../hooks/useSubscription";

const color = 'gray';

const line = [color, color, color, color, color, color, color, color, color, color];

const playfield = [[...line],
    [...line],
    [...line],
    [...line],
    [...line],
    [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line],
    [...line], [...line], [...line], [...line], [...line], [...line]];

const Field = (props) => {
    const field = useSubscription(props.socket, "playfield", playfield);

    onmousemove = (event) => {

    };

    return (
        <div>
            {field.map((row) =>
                <div className="row">
                    {row.map((column) =>
                        <div
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
