// Gameboard object

// Player object

// GameRunner object

// displayController ?

const Game = (function GameBoard() {
    // const board = new Array(3).fill("-").map(() => new Array(3).fill("-"));
    const board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const playerOne = null;
    const playerTwo = null;
    let moves = 0; // if 9 moves played, and no winner found, game is declared a draw

    console.log("Immediate invocation!!");

    const resetBoard = () => {
        for (let arr in board) {
            for (let cell in board[arr]) {
                board[arr][cell] = "-";
            }
        }
    }

    const checkResult = () => {
        // return winner or draw;

        let row = 0;
        let col = 0;
        
        const allEqual = arr => arr.every( v => v === arr[0] )

        //check for matching column
        while(col < 3) {
            if (board[0][col] === board[1][col] && board[0][col] === board[2][col]) {
                return `winner is ${board[0][col]}, at column: ${col}.`;
            } else {
                col++;
            }
        }

        // check each row
        for (let row in board) {
            if (allEqual(board[row])) {
                return `winner at row ${row}`;
            }
        }

        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return `winner is diagonal top left to bottom right`;
        }  
        if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            return `winner is diagonal bottom left to top right`;
        }
        if (moves >= 9) {
            return `Game is a draw`;
        }

        return `no winner yet`;

        /* 
         Better solution:
         if the input cell row == 0, or row == 2 or col == 0 or col == 2:
            check, row, col, center and opposite cell (just flipping the row/col number gives you the opposite cell)

         check if the row or col of the input cell creates an win

        */

    }

    // TODO: the symbol will be decided automatically later
    const updateBoard = (row, col, symbol) => {
        // array index change here

        if (board[row][col] === 'X' || board[row][col] === 'O') {
            alert("this space is already taken!");
        } else {
            board[row][col] = symbol;  // later this will depend on player/game logic
            moves++;
            displayController();
        }
    }

    const getBoard = () => board;  // for debugging...
    
    const displayController = () => {
        console.log(board[0]);
        console.log(board[1]);
        console.log(board[2]);
    }
    // TODO: remove board later. This will make the board array private
    return {board, resetBoard, updateBoard, getBoard, displayController, checkResult}; 
})();


function createUser(name) {
    //
}


// first col, should return:
// // winner is x at col 0. Works
// Game.updateBoard(0, 0);
// Game.updateBoard(1, 0);
// Game.updateBoard(2, 0);
// console.log(Game.checkResult());

// middle column
// should return winner is x, at col 1. Works
// Game.updateBoard(0, 1);
// Game.updateBoard(1, 1);
// Game.updateBoard(2, 1);
// console.log(Game.checkResult());

// last column
// should return winner is x, at col 2. Works
// Game.updateBoard(0, 2);
// Game.updateBoard(1, 2);
// Game.updateBoard(2, 2);
// console.log(Game.checkResult());

// works with all rows
// Game.updateBoard(2, 0);
// Game.updateBoard(2, 1);
// Game.updateBoard(2, 2);
// console.log(Game.checkResult());

// diagnoal test. Works
// Game.updateBoard(0, 2);
// Game.updateBoard(1, 1);
// Game.updateBoard(2, 0);
// console.log(Game.checkResult());