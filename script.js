// Gameboard object

// Player object

// GameRunner object

// displayController ?

const Game = (function() {
    const Gameboard = () => {
        const board = new Array(3).fill("-").map(() => new Array(3).fill("-"));
        const resetBoard = () => {
            for (let arr in board) {
                for (let cell in board[arr]) {
                    board[arr][cell] = "!";
                }
            }
            console.log(board);
        }

        const updateBoard = (input) => {
            // array index change here
        }

        const getBoard = () => board;

        return {board, resetBoard, updateBoard, getBoard};
    }
    
    const displayController = () => {
        const doc = "document.createElement('div')";
        return doc;
    }

    return {Gameboard, displayController};
})();


function createUser(name) {
    //
}