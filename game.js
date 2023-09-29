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
        } else if (board.length === 8 && board.includes("undefined") !== true) {
            alert("Tie");
            emptyBoard();
        }
    };

    return {checkForWin, setToken, board} //board müsste eigentlich jetzt wieder privat sein dürfen
})();


const gameController = (() => {
    let round = 1;

    const increaseRoundCounter = () => {
        round++
    };

    const playRound = (field, player1, player2) => {
        let player = checkWhichPlayersTurnItIs(player1, player2);
        gameBoard.setToken(field, player.token); //wenn ein belegtes feld angeklickt wird, wird playRound und der Counter trotzdem zu Ende ausgeführt!
        gameBoard.checkForWin(player.token);
        increaseRoundCounter();
    };

    const checkWhichPlayersTurnItIs = (player1, player2) => {
        if (round % 2 !== 0) {
            return player2
        } else if (round % 2 === 0) {
            return player1
        }
    }

    return {playRound, checkWhichPlayersTurnItIs, round}
})();

const Player = (playerName, token) => {
    return {playerName, token}
}


const displayController = (() => {
    const fields = document.querySelectorAll(".field");
    const startBtn = document.querySelector(".start-button");
    const player1Name = document.getElementById("player1").value;
    const player2Name = document.getElementById("player2").value;
    let player1;
    let player2;


    const displayToken = (field, player1, player2) => {
        let player = gameController.checkWhichPlayersTurnItIs(player1, player2);
        field.textContent = player.token;
    }

    startBtn.addEventListener("click", (event) => {
        event.preventDefault();
        player1 = Player(player1Name, "X");
        player2 = Player(player2Name, "O");
    });

    fields.forEach((field) => {
        field.addEventListener("click", () => {
            const fieldNumber = parseInt(field.getAttribute("id"));
            gameController.playRound(fieldNumber, player1, player2);
            displayToken(field, player1, player2); //X und O werden überschrieben wenn feld schon belegt ist; s.O.
        });
    })
})();

