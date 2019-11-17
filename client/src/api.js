import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');
function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 50);
}
export { subscribeToTimer };

export function subscribeToTetris(callback) {
    socket.on('playfield', timestamp => callback(null, timestamp));
    socket.emit('subscribeToTetris', 500);
}

