import {
    joinTetris,
    moveLeft,
    moveRight,
    rotateCurrentTetromino,
    setGameInterval,
    startGame,
    toggleReady
} from "./tetris";

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

server.listen(port);

export let interval = 300;

io.on("connection", client => {
    console.log("\nConnection happened.");
    client.on("Hash", function(string) {
        joinTetris(string, client.id);
    });
    client.on("ArrowUp", usernameAndRoom => {
        rotateCurrentTetromino(usernameAndRoom);
    });
    client.on("ArrowDown", usernameAndRoom => {
        setGameInterval(usernameAndRoom, 50);
    });
    client.on("ArrowDownUnpressed", usernameAndRoom => {
        setGameInterval(usernameAndRoom, 300);
    });
    client.on("ArrowLeft", usernameAndRoom => {
        moveLeft(usernameAndRoom);
    });
    client.on("ArrowRight", usernameAndRoom => {
        moveRight(usernameAndRoom);
    });
    client.on("startGame", clientData => {
       startGame(clientData);
    });
    client.on("readyCheck", clientData => {
        toggleReady(clientData);
    });
});

export const emit = (event, args, socketID) => {
    io.to(`${socketID}`).emit(event, args);
};

const on = (event, callback, emit) => {};
