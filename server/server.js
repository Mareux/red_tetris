const io = require('socket.io')();

let color = [0, 0, 0];

let line = [color, color, color, color, color, color, color, color, color, color];

const playfield = [line, line, line, line, line, line, line, line, line, line, line, line, line, line, line, line, line, line, line, line];

io.on('connection', (client) => {
    client.on('subscribeToTetris', (interval) => {
        console.log('client is subscribing to tetris with interval ', interval);
        setInterval(() => {
            client.emit('playfield', playfield);
        }, interval);
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
