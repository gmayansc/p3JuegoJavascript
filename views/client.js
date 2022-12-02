
const sock = io();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let size = urlParams.get('size');


let color = urlParams.get('color');

const youWin = () =>{
    document.getElementById("winner").innerHTML = "<h1>GANASTE LA PARTIDA!</h1>";
}

const clearYouWin = () =>{
    document.getElementById("winner").innerHTML = "";
}

const getBoard = (canvas, numCells = size) => {
    const ctx = canvas.getContext('2d');
    const cellSize = Math.floor(canvas.width / numCells);


    const fillCell = (x, y, color) => {
        playerColor = color;
        ctx.fillStyle = color;
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }

    const drawGrid = () => {
        ctx.strokeStyle = "#333"
        ctx.beginPath();

        for (let i = 0; i < numCells + 1; i++) {
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, cellSize * numCells);
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(cellSize * numCells, i * cellSize);
        }
        ctx.stroke();
    };

    const clear = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    const renderBoard = (board = []) => {
        board.forEach((row, y) => {
            row.forEach((color, x) => {
                color && fillCell(x, y, color);
            })
        })
    }

    const reset = (board) => {
        clear();
        drawGrid();
        renderBoard(board);
    }

    const getCellCoordinates = (x, y) => {
        return {
            x: Math.floor(x / cellSize),
            y: Math.floor(y / cellSize),
        }
    }

    return { fillCell, reset, getCellCoordinates };
}

const getClickCoordinates = (element, ev) => {
    const { top, left } = element.getBoundingClientRect();
    const { clientX, clientY } = ev;

    return {
        x: clientX - left,
        y: clientY - top
    };
};

const onClick = (e) => {
    const { x, y } = getClickCoordinates(canvas, e);
    sock.emit('turn', getCellCoordinates(x, y));
    // fillRect(x, y, 'green');
}

let email = urlParams.get('email');
let avatar = urlParams.get('avatar');

const addCurrentPlayer = (email, avatar) => {
    const players = document.getElementById("players");

    const currentPlayer = `<div class="jugador-item d-flex">
    <img src="resources/profile-img/${avatar}.png" alt=""> <h4> ${email}</h4></div>`

    players.innerHTML += currentPlayer;
    return {email, avatar}

}

const canvas = document.querySelector("canvas");
const { fillCell, reset, getCellCoordinates } = getBoard(canvas);

sock.emit('userList', addCurrentPlayer(email, avatar));


sock.on('youWin', youWin);
sock.on("clearYouWin", clearYouWin);
sock.on('board', reset);
sock.on('turn', ({ x, y, color }) => fillCell(x, y, color));
sock.on('userList', ({email, avatar}) => addCurrentPlayer(email, avatar));

canvas.addEventListener("click", onClick);

