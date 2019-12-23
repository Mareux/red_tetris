import React, {useMemo, useEffect} from 'react';
import './App.css';
import GameContainer from "../containers/GameContainer";
import io from 'socket.io-client';
import Field from "./Field";
import {createStore} from "redux";
import gameReducer from "../reducers/gameReducer";

const store = createStore(gameReducer);


const App = () => {


    const socket = useMemo(() => {
        return io('http://localhost:8000')
    }, []);

    useEffect(() => {
        if (location.hash)
            socket.emit("Hash", location.hash);
    }, [socket]);

    useEffect(() => {
        window.onkeydown = (event) => {
            const key = event.code;

            if (key === 'ArrowUp'
                || key === 'ArrowDown'
                || key === 'ArrowLeft'
                || key === 'ArrowRight')
                socket.emit(key);
        };

        window.onkeyup = (event) => {
            const key = event.code;

            if (key === "ArrowDown")
                socket.emit(key + "Unpressed");
        };
    }, [socket]);

    return (
        <>
            <GameContainer
                field={<Field socket={socket}/>}
            />
        </>
    );
};

export default App;
