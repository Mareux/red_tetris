const server = require("./server");

let default_color = 'gray';

let color = default_color;

let line = [color, color, color, color, color, color, color, color, color, color];

let playfield = [[...line],
    [...line],
    [...line],
    [...line],
    [...line],
    [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line], [...line],
    [...line], [...line], [...line], [...line], [...line], [...line]];

let yellow = 'yellow';
let blue = 'blue';
let purple = 'purple';

const rot_line = [
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
    ]];


function rotate(arr) {
    if (current_tetromino.rotation > 2)
    {
        erase_current_tetromino();
        current_tetromino.shape = arr[0];
        current_tetromino.rotation = 0;
        draw_current_tetromino();
    }
    else
    {
        erase_current_tetromino();
        current_tetromino.rotation += 1;
        current_tetromino.shape = arr[current_tetromino.rotation];
        draw_current_tetromino();
    }
}


exports.rotate_current_tetromino = function() {
    if (current_tetromino.name === "Line")
        rotate(rot_line);
    server.emit('playfield', playfield);
};

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
    constructor(name, shape, color, position, rotation) {
        this.name = "Line";
        this.shape =
            [[0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]];
        this.color = blue;
        this.position = [0, -1];
        this.rotation = 0;
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

exports.move_left = function() {
    erase_current_tetromino();
    current_tetromino.position[0] -= 1;
    if (collision_detected())
        current_tetromino.position[0] += 1;
    draw_current_tetromino();
    server.emit('playfield', playfield);
};

exports.move_right = function() {
    erase_current_tetromino();
    current_tetromino.position[0] += 1;
    if (collision_detected())
        current_tetromino.position[0] -= 1;
    draw_current_tetromino();
    server.emit('playfield', playfield);
};


function erase_current_tetromino() {
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

function draw_current_tetromino() {
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
                if (playfield.length - 1 < current_tetromino.position[1] + row || playfield[0].length - 1 < current_tetromino.position[0] + column)
                    return (true);
                if (current_tetromino.position[0] + column < 0)
                    return (true);
                if (playfield[current_tetromino.position[1] + row]) {
                    if (playfield[current_tetromino.position[1] + row][current_tetromino.position[0] + column]) {
                        if (playfield[current_tetromino.position[1] + row][current_tetromino.position[0] + column] !== default_color)
                            return (true);
                    }
                }
            }
            column += 1;
        }
        row += 1;
    }
    return false;
}

function line_is_filled(arr, len)
{
    let i = 0;

    while (i < len) {
        if (arr[i] === default_color)
            return false;
        i += 1;
    }
    return true;
}

function clear_line(arr, len)
{
    let i = 0;

    while (i < len) {
        arr[i] = default_color;
        i += 1;
    }
}

function collapse_lines(i)
{

    return [...playfield].map((item, index) => {
        if (index === 0)
            return [...line];
        if (index <= i && index > 0) {
            const tmp = [...playfield].slice(index - 1, index)[0];
            console.log(index + "-tmp:  " + tmp);
            return tmp;
        }
        else {
            console.log(index + ": " + item);
            return item;
        }
    });
    // while (i >= 0) {
    //     playfield[i] = [...playfield.slice(i - 1, i)];
    //     i -= 1;
    // }
}

function remove_filled_lines() {
    let i = current_tetromino.position[1];
    let limit = i + 3;
    let result = false;

    while (i < limit) {
        if (playfield[i]) {
            if (line_is_filled(playfield[i], 10)) {
                clear_line(playfield[i], 10);
                playfield = collapse_lines(i);
            }
        }
        i += 1;
    }
    return (result);
}

function next_tetromino() {
    if (current_tetromino.name === "Square")
        current_tetromino = new piece_line();
    else if (current_tetromino.name === "Line")
        current_tetromino = new piece_t;
    else
        current_tetromino = new piece_square;

}

function draw_playfield_in_console() {
    console.log("----------- Playfield -----------")
    playfield.map(function (line) {
        let str = "";
        line.map(function (cell) {
            if (cell !== default_color)
                str += "██";
            else
                str += "  ";
        })
        console.log(str);
    })
    console.log("---------------------------------\n\n");
}

exports.runTetris = function() {
    // console.log("Call");
    // console.log(new Date().getSeconds().toString() + "." + new Date().getMilliseconds().toString());

    if (current_tetromino) {
        erase_current_tetromino();
        current_tetromino.position[1] += 1;
        if (collision_detected()) {
            current_tetromino.position[1] -= 1;
            draw_current_tetromino();
            remove_filled_lines();
            next_tetromino();
        }
        else
            draw_current_tetromino();
    }
    server.emit('playfield', playfield);
    setTimeout(exports.runTetris, server.interval);
};
