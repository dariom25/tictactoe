const gameBoard = (() => {
    let board = [];
    const setToken = (field, token) => {
        if (board[field] === undefined) {
            board[field] = token;
        }
    };

    const checkForWin = () => {
        if (board[0] === board[3] && board[0] === board[6]) {
            alert("Win");
        } else if (board[1] === board[4] && board[0] === board[7]) {
            alert("Win");
        } else if (board[1] === board[4] && board[1] === board[7]) {
            alert("Win");
        } else if (board[2] === board[5] && board[2] === board[8]) {
            alert("Win");
        } else if (board[0] === board[1] && board[0] === board[2]) {
            alert("Win");
        } else if (board[3] === board[4] && board[3] === board[5]) {
            alert("Win");
        } else if (board[6] === board[7] && board[6] === board[8]) {
            alert("Win");
        } else if (board[0] === board[4] && board[0] === board[8]) {
            alert("Win");
        } else if (board[2] === board[4] && board[2] === board[6]) {
            alert("Win");
        }
    };

    return {setToken, checkForWin, board}
})();

const gameController = (() => {
    let round = 0;
    let token = ["X", "O"];
    const endRound = () => {
        round++ //hier muss wahrscheinlich noch mehr hin
    };

    
    return {endRound, playRound}
})();

const player = (playerName) => {
    return {playerName}
}
