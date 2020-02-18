import {joinTetris, moveLeft, moveRight, rotateCurrentTetromino} from "./tetris";

const server = require('http').createServer();
const io = require('socket.io')(server);

export let interval = 150;

io.on('connection', (client) => {
    console.log("\nConnection happened.");
    client.on('Hash', function (string) {
        joinTetris(string, client.id);
    });
    client.on('ArrowUp', (usernameAndRoom) => {
        rotateCurrentTetromino(usernameAndRoom);
    });
    client.on('ArrowDown', () => {
        interval = 50;
    });
    client.on('ArrowDownUnpressed', () => {
        interval = 300;
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
server.listen(port);
console.log('listening on port ', port);
