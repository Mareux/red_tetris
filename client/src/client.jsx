import React, {useState, useEffect} from 'react';
import {subscribeToTetris, subscribeToTimer} from './api';
import './components/Field.css'

const Client = () => {

    const [timestamp, setTimestamp] = useState([]);

    useEffect(() => subscribeToTetris((err, timestamp) => setTimestamp(timestamp)), []);


    return (
        <div>
            {
                timestamp.map((row) => {
                    return <div className="row"> {row.map((column) => {
                        return (<div className={"column"} style={{backgroundColor: column}}>{""}</div>)
                    })}</div>
                })
            }
        </div>
    );
};

export default Client;
