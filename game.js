const gameBoard = (() => {
    let board = [];


    const emptyBoard = () => {
        board = [];
    };

    const setToken = (field, token) => {
        if (gameBoard.board[field] === undefined) {
            gameBoard.board[field] = token;
        }
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

    return {checkForWin, setToken, board} //board müsste eigentlich jetzt wieder privat sein dürfen
})();

const gameController = (() => {
    let round = 0;

    const increaseRoundCounter = () => {
        round++ //hier muss wahrscheinlich noch mehr hin
    };

    const playRound = (field, player) => { //hier muss gameBoard.board[field] als field eingegeben werden
        gameBoard.setToken(field, player.token); //wenn ein belegtes feld angeklickt wird, wird playRound und der Counter trotzdem zu Ende ausgeführt!
        gameBoard.checkForWin(player.token);
        increaseRoundCounter();
    };

    return {playRound}
})();

const Player = (playerName, token) => {
    


    return {playerName, token}
}
