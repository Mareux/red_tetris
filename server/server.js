
const tetris = require('./tetris');

const server = require('http').createServer();
const io = require('socket.io')(server);

exports.interval = 300;

io.on('connection', (client) => {
    console.log("\nConnection happened.");
    client.on('Hash', function (string) {
        tetris.joinTetris(client, string, client.id);
    });
    client.on('ArrowUp', (usernameAndRoom) => {
        tetris.rotateCurrentTetromino(usernameAndRoom);
    });
    client.on('ArrowDown', () => {
        exports.interval = 50;
    });
    client.on('ArrowDownUnpressed', () => {
        exports.interval = 300;
    });
    client.on('ArrowLeft', (usernameAndRoom) => {
        tetris.moveLeft(usernameAndRoom);
    });
    client.on('ArrowRight', (usernameAndRoom) => {
        tetris.moveRight(usernameAndRoom);
    })
});

exports.emit = (event, args, socketID) => {
    io.to(`${socketID}`).emit(event, args);
};

const on = (event, callback, emit) => {

};

const port = 8000;
server.listen(port);
console.log('listening on port ', port);
