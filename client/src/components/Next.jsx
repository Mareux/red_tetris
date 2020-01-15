import React from 'react'
import './Next.css'
import useSubscription from "../hooks/useSubscription";

const figureInitialState = [[0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],];

function Next(props) {

    // const figure = useSubscription(props.socket,
    //     "nextFigure", figureInitialState);

    return (
        <div className="next">
            {/*<p>Next</p>*/}
            {/*<div className="next_figure">{*/}
            {/*    figure.map((row) => <div>*/}
            {/*        {*/}
            {/*            row.map((column) =>*/}
            {/*                <div*/}
            {/*                    className={"column"}*/}
            {/*                    style={{backgroundColor: "gray"}}*/}
            {/*                />)*/}
            {/*        }*/}
            {/*    </div>)*/}
            {/*}</div>*/}
        </div>
    );
}

export default Next
