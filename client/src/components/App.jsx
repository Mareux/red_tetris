import React, {useMemo, useEffect} from 'react';
import './App.css';
import GameContainer from "../containers/GameContainer";
import io from 'socket.io-client';
import Field from "./Field";
// import {createStore} from "redux";
// import gameReducer from "../reducers/gameReducer";
//
// const store = createStore(gameReducer);

let clientData = {
    userName: "default",
    userRoom: "default"
}

function getClientData(hash) {
    let split = hash.split('[');
    let room, username;
    room = split[0].slice(1);
    if (split[1]) {
        username = split[1].slice(0, split[1].length - 1);
    }
    console.log("UserData: " + room + " " + username);
    clientData.userName = username;
    clientData.userRoom = room;
}

const App = () => {


    const socket = useMemo(() => {
        return io('http://localhost:8000')
    }, []);

    useEffect(() => {
        if (location.hash) {
            getClientData(location.hash);
            socket.emit("Hash", location.hash);
        }
    }, [socket]);

    useEffect(() => {
        window.onkeydown = (event) => {
            const key = event.code;

            if (key === 'ArrowUp'
                || key === 'ArrowDown'
                || key === 'ArrowLeft'
                || key === 'ArrowRight') {
                socket.emit(key, [clientData.userName, clientData.userRoom]);
            }
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
