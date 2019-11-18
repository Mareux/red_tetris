import React, {useMemo} from 'react';
import './App.css';
import GameContainer from "./containers/GameContainer";
import io from 'socket.io-client';

const App = () => {

    const socket = useMemo(() => {
        return io('http://localhost:8000')
    }, []);

    onkeydown = (event) => {
        const key = event.code;

        if (key === 'ArrowUp'
            || key === 'ArrowDown'
            || key === 'ArrowLeft'
            || key === 'ArrowRight')
            socket.emit(key);
    };

    onkeyup = (event) => {
      const key = event.code;

      if (key === "ArrowDown")
          socket.emit(key + "Unpressed");
    };

    return (
        <>
            <GameContainer socket={socket}/>
        </>
    );
};

export default App;
