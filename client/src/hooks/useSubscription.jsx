import {useEffect, useState} from 'react'

function useSubscription(socket, event, initialState) {
    const [item, setItem] = useState(initialState);

    useEffect(() => {
        console.log(socket);
        socket.on(event, setItem);

    }, [event, socket]);

    return item;
}

export default useSubscription;
