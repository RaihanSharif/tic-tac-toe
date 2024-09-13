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


    // TODO: change this to return 1 if there is a winner
    // 0 if not, and -1 if game is over
    const checkResult = (playerIndex) => {
        const leftDiag = [0, 4, 8];
        const rightDiag = [2, 4, 6];
        const firstCol = [0, 3, 6];
        const secondCol = [1, 4, 7];
        const thirdCol = [2, 5, 8];
        const playerSymbol = board[playerIndex];
        let hasWinner = false;

        // Diags most likely to be a winning config
        // so check those first
        if (playerIndex % 2 === 0) {
            if (checkLine(playerSymbol, leftDiag) ||
            checkLine(playerSymbol, rightDiag)) {
                hasWinner = true;
                isGameOver = true;
                return hasWinner;
            }
        }

        // check col and row of the supplied cell
        switch (playerIndex % 3) {
            case 0:
                if (checkLine(playerSymbol, firstCol)) {
                    hasWinner = true;
                } else if (board[playerIndex + 1] === playerSymbol &&
                board[playerIndex + 2] === playerSymbol) {
                    hasWinner = true;
                }
                break;
            case 1:
                if (checkLine(playerSymbol, secondCol)) {
                    hasWinner = true;
                } else if (board[playerIndex - 1] === playerSymbol &&
                board[playerIndex + 1] === playerSymbol) {
                    hasWinner = true;
                }
                break;
            case 2:
                if (checkLine(playerSymbol, thirdCol)) {
                    return true;
                } else if (board[playerIndex - 1] === playerSymbol &&
                board[playerIndex - 2] === playerSymbol) {
                    hasWinner = true;
                }
                break;
        }
 
        // game is over.
        // use this in controller to check for draw
        if (moveCount === 9 || hasWinner) {
            isGameOver = true;
        }
        // no winner
        return hasWinner;
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
    let isPlayerOneTurn = true; // flips after every player turn

    // tracking score over several rounds
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let draws = 0;

    const getCurrentPlayer = () => {
        if (isPlayerOneTurn) {
            return playerOne;
        } else {
            return playerTwo;
        }
    }

    const setPlayerNames = (playerOneName, playerTwoName) => {
        playerOne.setPlayerName(playerOneName);
        playerTwo.setPlayerName(playerTwoName);
    }

    const playMove = (index) => {
        // need to break here if gameOver?
        let output = "";
        const curentPlayer = getCurrentPlayer();
        const playMove = GameBoard.updateBoard(index, curentPlayer.getPlayerSymbol());

        if(playMove) {
            const winner = GameBoard.checkResult(index);
            if (winner) {
                if (isPlayerOneTurn) {
                    playerOneScore++;
                } else {
                    playerTwoScore++;
                }
                output = `${curentPlayer.getPlayerName()} is the winner`;
            } else if (GameBoard.getIsGameOver()) {
                draws++;
                output = "It's a draw!";
            }
            isPlayerOneTurn = !isPlayerOneTurn; // if move is played, change turn
        } else {
            // prompt for another move;
        }
        return output;
    }

    const resetGame = () => {
        GameBoard.resetBoard();
        isPlayerOneTurn = true;
        playerOneScore = 0;
        playerTwoScore = 0;
        draws = 0;
        // reset players later
    }

    const getScores = () =>  ({
        playerOneScore,
        playerTwoScore,
        ties,
    });

    return {getCurrentPlayer, setPlayerNames, playMove, resetGame, getScores};

})();

/*
Display controller module
    display the UI elements
    update scores on the display
    A function to start the game and take input for player names
        then add a new 
*/

const DisplayController = (() => {
    const gameBoard = document.getElementById("gameboard");
    const restartBtn = document.getElementById("btn-restart");
    const startBtn = document.getElementById("btn-start");
    const plOneInput = document.getElementById("input-player-one");
    const plTwoInput = document.getElementById("input-player-two");
    const gameStatus = document.getElementById("status"); // change later
    const plOneScore = document.getElementById("score-player-one");
    const plTwoScore = document.getElementById("score-player-two");
    const tieScore = document.getElementById("score-ties");

    // this is not the way to do it...
    // display should speak to GameController, not GameBoard
    const renderBoard = () => {
        gameBoard.innerHTML = ""; // clears the element
        const board = GameBoard.getBoard();
        board.array.forEach((symbol, index) => {
            const cell = document.createElement("div");
            cell.textContent = symbol;
            // move listener to gameBoard element later
            // try putting the index arg in the empty brackets see what happens
            cell.addEventListener("click", () => cellClickHandler(index)); 
            gameBoard.appendChild(cell);
        });
    }

    // a fucntion to update the scores on the screen
    // cell click handler
    // game start function
    // game reset function

    // event listeners for all the buttons

    // render the board
});