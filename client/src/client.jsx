import React, {useState} from 'react';
import {subscribeToTetris, subscribeToTimer} from './api';
import './components/Field.css'

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const Client = () => {

    const [timestamp, setTimestamp] = useState([]);

    subscribeToTetris((err, timestamp) => setTimestamp(timestamp));

    return (
        <div>
            {
                timestamp.map(item => {
                    return <div className="row"> {item.map(item1 => {
                        const color = rgbToHex(item1[0], item1[1], item1[2]);
                        return <div className={"column"} style={{backgroundColor: color}}>{""}</div>
                    }) }</div>
                })
            }
        </div>
    );
};

export default Client;
