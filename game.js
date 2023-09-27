const gameBoard = (() => {
    let board = [];
    const setToken = (field, token) => {
        if (board[field] === undefined) {
            board[field] = token;
        }
    };

    const checkForWin = (token) => {
        if (board[0] === token && board[3] === token && board[6] === token) {
            alert("Win");
        } else if (board[1] === token && board[4] === token && board[7] === token) {
            alert("Win");
        } else if (board[2] === token && board[5] === token && board[8] === token) {
            alert("Win");
        } else if (board[0] === token && board[1] === token && board[2] === token) {
            alert("Win");
        } else if (board[3] === token && board[4] === token && board[5] === token) {
            alert("Win");
        } else if (board[6] === token && board[7] === token && board[8] === token) {
            alert("Win");
        } else if (board[0] === token && board[4] === token && board[8] === token) {
            alert("Win");
        } else if (board[2] === token && board[4] === token && board[6] === token) {
            alert("Win");
        }

        switch("X") {
            case board[0] === "X" && board[3] === "X" && board[6] === "X":
                alert("Win")
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

    const playRound = (field, token) => {
        gameBoard.setToken(field, token);
        gameBoard.checkForWin(token[0]);
        gameBoard.checkForWin(token[1]);
        endRound();
    };

    return {endRound, playRound}
})();

const player = (playerName) => {
    return {playerName}
}
