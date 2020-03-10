import {
    joinSession,
    startGame,
    toggleReady,
    toggleGameMode, leaveSession
} from "./game";
import { fallInstantly, moveLeft, moveRight, rotateCurrentTetromino, setGameInterval } from "./gameControls";

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const path = require("path");

const port = 8080;

app.use(express.static(path.join(__dirname, "../../client/build")));
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

if (process.env.NODE_ENV !== 'test') {
    server.listen(port);
}

export let interval = 300;

io.on("connection", client => {
    console.log("\nConnection happened.");
    client.on("Hash", function(string) {
        joinSession(string, client.id);
    });
    client.on("ArrowUp", clientData => {
        rotateCurrentTetromino(clientData);
    });
    client.on("ArrowDown", clientData => {
        setGameInterval(clientData, 50);
    });
    client.on("ArrowDownUnpressed", clientData => {
        setGameInterval(clientData, 300);
    });
    client.on("ArrowLeft", clientData => {
        moveLeft(clientData);
    });
    client.on("ArrowRight", clientData => {
        moveRight(clientData);
    });
    client.on("startGame", clientData => {
       startGame(clientData);
    });
    client.on("readyCheck", clientData => {
        toggleReady(clientData);
    });
    client.on("leaveGame", clientData => {
        leaveSession(clientData);
    });
    client.on("Space", clientData => {
        fallInstantly(clientData);
    });
    client.on("toggleGameMode", clientData => {
       toggleGameMode(clientData);
    });
});

export const emit = (event, args, socketID) => {
    io.to(`${socketID}`).emit(event, args);
};

const on = (event, callback, emit) => {};
