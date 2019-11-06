import React, {useState} from 'react';
import { subscribeToTimer } from './api';

const Client = () => {

    const [timestamp, setTimestamp] = useState();

    subscribeToTimer((err, timestamp) => setTimestamp(timestamp));

    return (
        <div>
            <p>
                This is timer value: {new Date().toISOString(timestamp)}
            </p>
        </div>
    );
};

export default Client;
