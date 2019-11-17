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

let yellow = [255, 200, 0];
let blue = [50, 50, 255];
let purple = [255, 50, 255];

class piece_square {
    constructor(name, shape, color, position) {
        this.name = "Square";
        this.shape =
            [[1, 1, 0, 0],
             [1, 1, 0, 0],
             [0, 0, 0, 0],
             [0, 0, 0, 0]];
        this.color = yellow;
        this.position = [0, -1];
    }
}

class piece_line {
    constructor(name, shape, color, position) {
        this.name = "Line";
        this.shape =
            [[1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0]];
        this.color = blue;
        this.position = [0, -1];
    }
}

class piece_t {
    constructor(name, shape, color, position) {
        this.name = "T";
        this.shape =
            [[1, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
        this.color = purple;
        this.position = [0, -1];
    }
}

var current_tetromino = new piece_square();

io.on('connection', (client) => {
    client.on('subscribeToTetris', (interval) => {
        // console.log('client is subscribing to tetris with interval ', interval);
        setInterval(() => {
             client.emit('playfield', playfield);
         }, interval);
    });
    setInterval(runTetris, 500);
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);

function erase_current_tetromino()
{
    let row = 0;
    while (row < 4) {
        let column = 0;
        while (column < 4) {
            if (playfield[current_tetromino.position[1] + row]) {
                if (playfield[current_tetromino.position[1] + row][current_tetromino.position[0] + column] && current_tetromino.shape[row][column]) {
                    playfield[current_tetromino.position[1] + row][current_tetromino.position[0] + column] = default_color;
                }
            }
            column += 1;
        }
        row += 1;
    }
}

function draw_current_tetromino()
{
    let row = 0;
    while (row < 4) {
        let column = 0;
        while (column < 4) {
            if (playfield[current_tetromino.position[1] + row]) {
                if (playfield[current_tetromino.position[1] + row][current_tetromino.position[0] + column] && current_tetromino.shape[row][column]) {
                    playfield[current_tetromino.position[1] + row][current_tetromino.position[0] + column] = current_tetromino.color;
                }
            }
            column += 1;
        }
        row += 1;
    }
}

function collision_detected() {
    let row = 0;
    while (row < 4) {
        let column = 0;
        while (column < 4) {
            if (current_tetromino.shape[row][column]) {
                if (playfield.length - 1 < current_tetromino.position[1] + column || playfield[0].length - 1 < current_tetromino.position[0] + row)
                    return (true);
                if (playfield[current_tetromino.position[1] + row]) {
                    if (playfield[current_tetromino.position[1] + row][current_tetromino.position[0] + column]) {
                        if (playfield[current_tetromino.position[1] + row][current_tetromino.position[0] + column] != default_color)
                            return (true);
                    }
                }
            }
            column += 1;
        }
        row += 1;
    }
    return (false);
}

function next_tetromino() {
    if (current_tetromino.name == "Square")
        current_tetromino = new piece_line();
    else if (current_tetromino.name == "Line")
        current_tetromino = new piece_t;
    else
        current_tetromino = new piece_square;

}

function draw_playfield_in_console()
{
    console.log("----------- Playfield -----------")
    playfield.map(function (line) {
        let str = "";
        line.map(function (cell) {
            if (cell != default_color)
                str += "██";
            else
                str += "  ";
        })
        console.log(str);
    })
    console.log("---------------------------------\n\n");
}

function runTetris(interval = 3000.0)
{
    if (current_tetromino) {
        erase_current_tetromino();
        current_tetromino.position[1] += 1;
        if (collision_detected()) {
            current_tetromino.position[1] -= 1;
            draw_current_tetromino();
            next_tetromino();
        }
        else
            draw_current_tetromino();
        draw_playfield_in_console();
    }
}
