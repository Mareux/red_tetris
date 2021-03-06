import React, { useMemo, useEffect } from "react";
import "./App.css";
import GameContainer from "../containers/GameContainer";
import io from "socket.io-client";
import Field from "./Field";
import { useSelector } from "react-redux";
import useSocketDispatcher from "../hooks/useSocketDispatcher";
import Menu from "./Menu";
import LogIn from "./LogInScreen";

function useHash(socket) {
    useEffect(() => {
        if (location.hash) {
            socket.emit("Hash", location.hash);
        }
    }, [socket]);
}

function useKeyHandlers(socket, clientData) {
    useEffect(() => {
        window.onkeydown = event => {
            const key = event.code;

            if (
                key === "ArrowUp" ||
                key === "ArrowDown" ||
                key === "ArrowLeft" ||
                key === "ArrowRight" ||
                key === "Space"
            ) {
                socket.emit(key, clientData);
            }
        };

        window.onkeyup = event => {
            const key = event.code;

            if (key === "ArrowDown" || key === "Space")
                socket.emit(key + "Unpressed", clientData);
        };
    }, [socket]);
}

function useSocket() {
    return useMemo(() => {
        return io.connect("http://localhost:8080");
    }, []);
}

const App = () => {
    const clientData = useSelector(store => store.clientData);

    const socket = useSocket();

    useSocketDispatcher(socket);

    useHash(socket);

    useKeyHandlers(socket, clientData);

    return (
        location.hash &&
        <>
            <Menu socket={socket}/>
            < GameContainer field={<Field />} />

        </>
        || <LogIn socket={socket}/>
    );
};

export default App;
