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

const Field = (props) =>{

    return (
        <div>
            {
                useSubscription(props.socket,"playfield", playfield).map((row) => {
                    return <div className="row"> {row.map((column) => {
                        return (<div className={"column"} style={{backgroundColor: column}}>{""}</div>)
                    })}</div>
                })
            }
        </div>
    );
};

export default Field;
