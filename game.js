const gameBoard = (() => {
    let board = [];


    const emptyBoard = () => {
        board = [];
    };

    const setToken = (field, token) => { //if else counter -1 dann?
            board[field] = token;
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
        } else if (board.length === 9 && board.includes(undefined) !== true) { 
            alert("Tie"); 
        }
    };

    return {checkForWin, setToken, emptyBoard, board}
})();


const gameController = (() => {
    let round = 1;

    const increaseRoundCounter = () => {
        gameController.round++
    };

    const checkWhichPlayersTurnItIs = (player1, player2) => {
        if (gameController.round % 2 === 0) {
            return player2
        } else if (gameController.round % 2 !== 0) {
            return player1
        }
    };
    
    const setRoundCounterBack = () => {
        gameController.round = 1;
    }

    return {checkWhichPlayersTurnItIs, setRoundCounterBack, increaseRoundCounter, round}
})();

const Player = (name, token) => {
    return {name, token}
}


const displayController = (() => {
    const fields = document.querySelectorAll(".field");
    const startBtn = document.querySelector(".start-button");
    const restartBtn = document.querySelector(".restart-button");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const inputPlayer1Parent = document.querySelector("#player1-container");
    const inputPlayer2Parent = document.querySelector("#player2-container");
    const player1Name = document.createElement("div");
    const player2Name = document.createElement("div");

    let player1;
    let player2;

    const restartGame = () => {
        gameBoard.emptyBoard();
        gameController.setRoundCounterBack();
        deleteTokens();
    };

    const deleteTokens = () => {
        fields.forEach((field) => {
            field.textContent = ""
        });
    }

    const displayToken = (field, player) => {
        field.textContent = player.token;
    };

    const removeInputFields = () => {
        inputPlayer1Parent.removeChild(player1Input);
        inputPlayer2Parent.removeChild(player2Input);
    }

    const displayPlayerName = (player1, player2) => {
        removeInputFields();
        player1Name.textContent = player1.name + " (X)";
        player2Name.textContent = player2.name + " (O)";
        player1Name.setAttribute("class", "player-name");
        player2Name.setAttribute("class", "player-name");
        inputPlayer1Parent.appendChild(player1Name);
        inputPlayer2Parent.appendChild(player2Name);
    };

    restartBtn.addEventListener("click", restartGame);

    startBtn.addEventListener("click", (event) => {
        event.preventDefault();
        player1 = Player(player1Input.value, "X");
        player2 = Player(player2Input.value, "O");
        displayPlayerName(player1, player2);
    });

    fields.forEach((field) => {
        field.addEventListener("click", () => {
            const fieldNumber = parseInt(field.getAttribute("id"));
            let player = gameController.checkWhichPlayersTurnItIs(player1, player2);
            if (gameBoard.board[fieldNumber] === undefined) { //in der zweiten runde gibts probleme; kann nur felder auswählen, die in der ersten runde noch nicht belegt waren; ist der rest nicht undefined?
                gameBoard.setToken(fieldNumber, player.token); //wenn ein belegtes feld angeklickt wird, wird playRound und der Counter trotzdem zu Ende ausgeführt! 
                displayToken(field, player); //X und O werden überschrieben wenn feld schon belegt ist; s.O.
                gameBoard.checkForWin(player.token);
                gameController.increaseRoundCounter();
            }


        });
    })

})();

