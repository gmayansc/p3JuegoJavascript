const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const randomColor = require('randomcolor');
const createBoard = require('./create-board');

const app = express();

app.use(express.static(`${__dirname}/../views`));

const server = http.createServer(app);
const io = socketio(server);
const {clear, getBoard, makeTurn } = createBoard(20);

io.on('connection', (sock) => {
    const color = randomColor();

    sock.emit('board', getBoard());

    sock.on('turn', ({x, y}) => {
        const playerWon = makeTurn(x, y, color);
        io.emit('turn', {x,y, color});
        io.emit("clearYouWin");
        if(playerWon) {
            sock.emit('board');
            sock.emit('youWin')
            clear();
        }
    });

    sock.on('userList', ({email, avatar}) => io.emit("userList",{email, avatar}));
})

server.on ( 'error', (err) => {
    console.error(err)
})
server.listen(8080, () => {
    console.log("server ready");
})

