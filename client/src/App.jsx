import React, {useMemo} from 'react';
import './App.css';
import GameContainer from "./containers/GameContainer";
import io from 'socket.io-client';

const App = () => {

    const socket = useMemo(() => {
        return io('http://localhost:8000')
    }, []);

    onkeyup = (event) => {
        const key = event.code;

        if (key === 'ArrowUp'
            || key === 'ArrowDown'
            || key === 'ArrowLeft'
            || key === 'ArrowRight')
            socket.emit(key);
    };

    return (
        <>
            <GameContainer socket={socket}/>
        </>
    );
};

export default App;
