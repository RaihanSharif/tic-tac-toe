const GameBoard = (() => {
    // the board array, not a 2d array, too complex.
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    // symbol should be automatic?
    const updateBoard = (index, symbol) => {
        if (board[index] === "")  {
            board[index] = symbol;
            return true;
        }
        return false;
    }

    const resetBoard = () => {
        // fill method replaces all elems in array, not a copy
        board.fill(""); 
    }

    const checkResult = () => {
        // win/draw/loss logic goes here.

        // return 0 if playerOne wins, return 1 if
        // player 2 wins, otherwise return -1
        
    }

    return {getBoard, updateBoard, resetBoard, checkResult};
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

/*
a game controller module
    has a game board
    two players
    something to track which player's turn it is
    check winner/loser/draw
    execute a player move
    reset the game.
    keep track of scores during the session

    idea:
        if player was x last round, they are o this round
*/
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