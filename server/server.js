const tetris = require('./tetris');

const server = require('http').createServer();
const io = require('socket.io')(server);



exports.interval = 300;

io.on('connection', (client) => {
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

setTimeout(tetris.runTetris, exports.interval);

const port = 8000;
server.listen(port);
console.log('listening on port ', port);
