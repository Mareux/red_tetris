const tetris = require('./tetris');

const server = require('http').createServer();
const io = require('socket.io')(server);

exports.interval = 300;

io.on('connection', (client) => {
    console.log("Greetings, traveler!");
    client.on('Hash', function (string) {
        tetris.joinTetris(client, string);
    });
    client.on('ArrowUp', () => {
        tetris.rotate_current_tetromino();
    });
    client.on('ArrowDown', () => {
        exports.interval = 50;
    });
    client.on('ArrowDownUnpressed', () => {
        exports.interval = 300;
    });
    client.on('ArrowLeft', () => {
        tetris.moveLeft();
    });
    client.on('ArrowRight', () => {
        tetris.moveRight();
    })
})

exports.emit = (event, args) => {
    io.sockets.emit(event, args);
};

const on = (event, callback, emit) => {

};

const port = 8000;
server.listen(port);
console.log('listening on port ', port);
