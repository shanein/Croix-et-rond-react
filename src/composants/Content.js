import App from "./App";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

var initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function getDiagonals(board) {
    return [board.map(function (row, y) { return row[y]; }), board.map(function (row, y) { return row[2 - y]; })];
}

function getColumns(board) {
    return board.map(function (row, y) { return row.map(function (_, x) { return board[x][y]; }); });
}

function getRows(board) {
    return board;
}

function getOwner(cells) {
    return cells.every(function (cell) { return cell !== null && cell === cells[0]; })
        ? cells[0]
        : null;
}

function getWinner(board) {
    var diagonals = getDiagonals(board);
    var columns = getColumns(board);
    var rows = getRows(board);
    return __spreadArray(__spreadArray(__spreadArray([], diagonals, true), columns, true), rows, true).reduce(function (winner, cells) {
        return winner || getOwner(cells);
    }, null);
}

function isEven(n) {
    return n % 2 === 0;
}

function getNextPlayer(board) {
    var getEmptyCellCount = function (row) {
        return row.filter(function (cell) { return cell === null; }).length;
    };
    var emptyCellsCount = board.reduce(function (sum, row) { return sum + getEmptyCellCount(row); }, 0);
    return isEven(emptyCellsCount) ? 2 : 1;
}

function play(board, x, y) {
    if (!getWinner(board) && !board[y][x]) {
        return board.map(function (row, rowY) {
            return rowY === y
                ? row.map(function (cell, cellX) { return (cellX === x ? getNextPlayer(board) : cell); })
                : row;
        });
    }
    return board;
}

function Content() {
    function reloadComponent(){
        window.location.reload(false);
    }
    let positions = ["00","01","02","10","11","12","20","21","22"]
    return (<div className="content">
        <div id="app">
            {positions.map((position) => (
                <div className="case event"  key={position} id={position} onClick={handleClick}></div>
            ))}
        </div>
        <div className="texte-plus">
            <div className="victory">Victoire du joueur <span className="victory-player"></span> !</div>
            <div className="draw">Egalité !</div>
            <a onClick={reloadComponent} className="restart">Rejouer</a>
        </div>
    </div>)
}

let board = initialBoard
let i = 0

function handleClick(e) {
    // console.log('✨ Ceci est mon event :', e.target.id)
    // console.log('✨ Ceci est mon event :', e.target.className)
    // console.log('✨ Ceci est mon event :', e.target.id)
    // if (e.target.classList.contains("event")) {
    //     console.log("event")
    // }
    // e.target.classList.add('rond');
    // e.target.classList.remove('event');

    if (e.target.classList.contains("event") == true && getWinner(board) == null) {
        var id = e.target.id;
        var x = parseInt(id.substr(0, 1))
        var y = parseInt(id.substr(1, 1))
        board = play(board, x, y)
        if (getNextPlayer(board) === 2) {
            e.target.classList.add("croix")
        } else {
            e.target.classList.add('rond');
        }
        e.target.classList.remove("event");
        console.log(board)
        console.log(getWinner(board))
        if (getWinner(board) != null) {
            document.querySelectorAll('.event').forEach(item => {
                item.classList.remove("event")
            })
            document.getElementsByClassName('content')[0].classList.add("stop")
        }

        if (getWinner(board) === 1) {
            document.getElementsByClassName('victory')[0].classList.add("active")
            document.getElementsByClassName('restart')[0].classList.add("active")
            document.getElementsByClassName('victory-player')[0].textContent = "X"
        }

        if (getWinner(board) === 2) {
            document.getElementsByClassName('victory')[0].classList.add("active")
            document.getElementsByClassName('restart')[0].classList.add("active")
            document.getElementsByClassName('victory-player')[0].textContent = "0"
        }
        if (i === 8 && getWinner(board) == null) {
            console.log("draw")
            document.getElementsByClassName('draw')[0].classList.add("active")
            document.getElementsByClassName('restart')[0].classList.add("active")
            document.getElementsByClassName('content')[0].classList.add("stop")
        }
    }
    i++
}


export default Content;
