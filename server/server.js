import {joinTetris, moveLeft, moveRight, rotateCurrentTetromino, setGameInterval} from "./tetris";

const http = require('http');
const Server = require('socket.io');
const io = new Server(http,{
    path:"../client/build",
    serveClient: true
});

export let interval = 300;

io.on('connection', (client) => {
    console.log("\nConnection happened.");
    client.on('Hash', function (string) {
        joinTetris(string, client.id);
    });
    client.on('ArrowUp', (usernameAndRoom) => {
        rotateCurrentTetromino(usernameAndRoom);
    });
    client.on('ArrowDown', (usernameAndRoom) => {
        setGameInterval(usernameAndRoom, 50);
    });
    client.on('ArrowDownUnpressed', (usernameAndRoom) => {
        setGameInterval(usernameAndRoom, 300);
    });
    client.on('ArrowLeft', (usernameAndRoom) => {
        moveLeft(usernameAndRoom);
    });
    client.on('ArrowRight', (usernameAndRoom) => {
        moveRight(usernameAndRoom);
    })
});

export const emit = (event, args, socketID) => {
    io.to(`${socketID}`).emit(event, args);
};

const on = (event, callback, emit) => {

};

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
