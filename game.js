const gameBoard = (() => {
    let board = [];


    const emptyBoard = () => {
        board = [];
    };

    const checkForWin = (token) => {
        if (board[0] === token && board[3] === token && board[6] === token) {
            alert("Win");
            emptyBoard();
        } else if (board[1] === token && board[4] === token && board[7] === token) {
            alert("Win");
            emptyBoard();
        } else if (board[2] === token && board[5] === token && board[8] === token) {
            alert("Win");
            emptyBoard();
        } else if (board[0] === token && board[1] === token && board[2] === token) {
            alert("Win");
            emptyBoard();
        } else if (board[3] === token && board[4] === token && board[5] === token) {
            alert("Win");
            emptyBoard();
        } else if (board[6] === token && board[7] === token && board[8] === token) {
            alert("Win");
            emptyBoard();
        } else if (board[0] === token && board[4] === token && board[8] === token) {
            alert("Win");
            emptyBoard();
        } else if (board[2] === token && board[4] === token && board[6] === token) {
            alert("Win");
            emptyBoard();
        } else if (board.length === 8) {
            alert("Tie");
            emptyBoard();
        }
    };

    return {setToken, checkForWin, board}
})();

const gameController = (() => {
    let round = 0;

    const increaseRoundCounter = () => {
        round++ //hier muss wahrscheinlich noch mehr hin
    };

    const playRound = (field, token) => { //wenn ein belegtes feld angeklickt wird, wird playRound und der Counter trotzdem zu Ende ausgeführt!
        gameBoard.setToken(field, token);
        gameBoard.checkForWin(token);
        increaseRoundCounter();
    };

    return {playRound}
})();

const Player = (playerName) => {
    const setToken = (field, token) => {
        if (board[field] === undefined) {
            board[field] = token;
        }
    };

    return {playerName, setToken}
}
