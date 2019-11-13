const io = require('socket.io')();


let default_color = [50, 50, 50];

let color = default_color;

let line = [color, color, color, color, color, color, color, color, color, color];

const playfield = [[...line],
    [...line],
    [...line],
    [...line],
    [...line],
    [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line],
    [...line], [...line], [...line], [...line], [...line], [...line]];

let yellow = [200, 255, 0];

playfield[0][0] = yellow;

let test = {
    name: "test",
    shape: [1],
    color: yellow,
    position: [0, 0]
}

var current_tetromino = test;

io.on('connection', (client) => {
    client.on('subscribeToTetris', (interval) => {
        console.log('client is subscribing to tetris with interval ', interval);
        setInterval(() => {
             client.emit('playfield', playfield);
         }, interval);
    });
    setInterval(runTetris, 1000);
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

function erase_current_tetromino()
{
    if (!playfield[current_tetromino.position[0]])
        return ;
    if (playfield[current_tetromino.position[0]][current_tetromino.position[1]])
    {
        playfield[current_tetromino.position[0]][current_tetromino.position[1]] = default_color;
    }
}

function draw_current_tetromino(tetromino)
{
    if (!playfield[current_tetromino.position[0]])
        return ;
    if (playfield[current_tetromino.position[0]][current_tetromino.position[1]])
    {
        playfield[current_tetromino.position[0]][current_tetromino.position[1]] = tetromino.color;
    }
}

function runTetris(interval = 3000.0)
{
    if (current_tetromino)
    {
        erase_current_tetromino();
        current_tetromino.position[0] += 1;
        draw_current_tetromino(current_tetromino);
    }

}
