const GameBoard = (() => {
    // the board array, not a 2d array, too complex.
    const board = ["", "", "", "", "", "", "", "", ""];
    let moveCount = 0;
    let isGameOver = false;

    const getBoard = () => board;

    // symbol should be automatic?
    const updateBoard = (index, symbol) => {
        if (board[index] === "")  {
            board[index] = symbol;
            moveCount++;
            return true;
        }
        return false;
    }

    const resetBoard = () => {
        // fill method replaces all elems in array, not a copy
        board.fill(""); 
        moveCount = 0;
        isGameOver = false;
    }


    // checks that a given set of indices 
    // on the board all match a given symbol
    function checkLine(symbolIn, checkerArr) {
        return checkerArr.every((index) => {
            board[index] == symbolIn;
        });
    }

    // if the max possible number of moves has been played
    // game is over
    const getIsGameOver = () => isGameOver;

    const checkResult = (playerIndex) => {
        const leftDiag = [0, 4, 8];
        const rightDiag = [2, 4, 6];
        const firstCol = [0, 3, 6];
        const secondCol = [1, 4, 7];
        const thirdCol = [2, 5, 8];
        const playerSymbol = board[playerIndex];

        // Diags most likely to be a winning config
        // so check those first
        if (playerIndex % 2 === 0) {
            if (checkLine(playerSymbol, leftDiag) ||
            checkLine(playerSymbol, rightDiag)) {
                return true;
            }
        }

        // check col and row of the supplied cell
        switch (playerIndex % 3) {
            case 0:
                if (checkLine(playerSymbol, firstCol)) {
                    return true;
                }
                if (board[playerIndex + 1] === playerSymbol &&
                board[playerIndex + 2] === playerSymbol) {
                    return true;
                }
                break;
            case 1:
                if (checkLine(playerSymbol, secondCol)) {
                    return true;
                }
                if (board[playerIndex - 1] === playerSymbol &&
                board[playerIndex + 1] === playerSymbol) {
                    return true;
                }
                break;
            case 2:
                if (checkLine(playerSymbol, thirdCol)) {
                    return true;
                }
                if (board[playerIndex - 1] === playerSymbol &&
                board[playerIndex - 2] === playerSymbol) {
                    return true;
                }
                break;
        }
 
        // game is over.
        // use this in controller to check for draw
        if (moveCount === 9) {
            isGameOver = true;
        }
        // no winner
        return false;
    }
    return {getBoard, updateBoard, resetBoard, checkResult, getIsGameOver};
}); 

// a player factory function
//   player symbol should be auto calculated ??
const Player = (nameIn, symbolIn) => {
    let name = nameIn;
    let symbol = symbolIn;
    
    const setPlayerName = (nameIn) => name = nameIn;
    const getPlayerName = () => name;
    const setPlayerSymbol = (newSymbol) => symbol = newSymbol;
    const getPlayerSymbol = () => symbol;

    return {getPlayerName, setPlayerName, getPlayerSymbol, setPlayerSymbol};

}

const GameController = (() => {
    // give player symbol choice later
    const playerOne = Player('', 'x');
    const playerTwo = Player('', 'o');
    let isGameOver = false;
    let isPlayerOneTurn = true; // flips after every player turn

    // tracking score over several rounds
    let playerOneWins = 0;
    let playerTwoWins = 0;
    let draws = 0;

    const setPlayerNames = (playerOneName, playerTwoName) => {
        playerOne.setPlayerName(playerOneName);
        playerTwo.setPlayerName(playerTwoName);
    }

    const getCurretPlayer = () => {
        if (isPlayerOneTurn) {
            return playerOne;
        } else {
            return playerTwo;
        }
    }

    

});

/*
Display controller module
    display the UI elements
    update scores on the display
    A function to start the game and take input for player names
        then add a new 
*/