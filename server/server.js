const io = require('socket.io')();

let default_color = [50, 50, 50];

let color = default_color;

let line = [color, color, color, color, color, color, color, color, color, color];

let playfield = [[...line],
    [...line],
    [...line],
    [...line],
    [...line],
    [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line],
    [...line], [...line], [...line], [...line], [...line], [...line]];

let yellow = [200, 255, 0];

let t_square = {
    name: "test",
    shape: [[0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]],
    color: yellow,
    position: [0, 0]
}

var current_tetromino = t_square;

io.on('connection', (client) => {
    client.on('subscribeToTetris', (interval) => {
        // console.log('client is subscribing to tetris with interval ', interval);
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

    let i = 0;
    while (i < 3) {
        let j = 0;
        while (j < 3) {
            if (playfield[current_tetromino.position[0] + j]) {
                if (playfield[current_tetromino.position[0] + j][current_tetromino.position[1] + i] && current_tetromino.shape[j][i]) {
                    playfield[current_tetromino.position[0] + j][current_tetromino.position[1] + i] = default_color;
                }
            }
            j += 1;
        }
        i += 1;
    }
}

function draw_current_tetromino()
{
    if (!playfield[current_tetromino.position[0]])
        return ;

    let i = 0;
    while (i < 3) {
        let j = 0;
        while (j < 3) {
            if (playfield[current_tetromino.position[0] + j]) {
                if (playfield[current_tetromino.position[0] + j][current_tetromino.position[1] + i] && current_tetromino.shape[j][i]) {
                    playfield[current_tetromino.position[0] + j][current_tetromino.position[1] + i] = current_tetromino.color
                }
            }
            j += 1;
        }
        i += 1;
    }

}

function runTetris(interval = 3000.0)
{
    if (current_tetromino) {
        erase_current_tetromino();
        current_tetromino.position[0] += 1;
        draw_current_tetromino();
    }
}
