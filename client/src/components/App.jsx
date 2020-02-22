import React, {useMemo, useEffect} from 'react';
import './App.css';
import GameContainer from "../containers/GameContainer";
import io from 'socket.io-client';
import Field from "./Field";
import {useSelector} from "react-redux";
import useSocketDispatcher from "../hooks/useSocketDispatcher";

function useHash(socket) {
    useEffect(() => {
        if (location.hash) {
            socket.emit("Hash", location.hash);
        }
    }, [socket]);
}

function useKeyHandlers(socket, clientData) {
    useEffect(() => {
        window.onkeydown = (event) => {
            const key = event.code;

            if (key === 'ArrowUp'
                || key === 'ArrowDown'
                || key === 'ArrowLeft'
                || key === 'ArrowRight') {
                socket.emit(key, [clientData.username, clientData.room]);
            }
        };

        window.onkeyup = (event) => {
            const key = event.code;

            if (key === "ArrowDown")
                socket.emit(key + "Unpressed", [clientData.username, clientData.room]);
        };
    }, [socket]);
}

function useSocket() {
    return useMemo(() => {
        return io('http://localhost:8000')
    }, []);
}

const App = () => {
    const clientData = useSelector(store => store.clientData);

    const socket = useSocket();

    useSocketDispatcher(socket);

    useHash(socket);

    useKeyHandlers(socket, clientData);

    return (
        <GameContainer field={<Field/>}/>
    );
};

export default App;
