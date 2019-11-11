import React, {useState} from 'react';
import {subscribeToTetris, subscribeToTimer} from './api';

const Client = () => {

    const [timestamp, setTimestamp] = useState();

    subscribeToTetris((err, timestamp) => setTimestamp(timestamp));

    return (
        <div>
            <p>
                {timestamp}
            </p>
        </div>
    );
};

export default Client;
