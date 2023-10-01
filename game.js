const gameBoard = (() => {
    let board = [];


    const emptyBoard = () => {
        gameBoard.board = [];
    };

    const setToken = (field, token) => {
            gameBoard.board[field] = token;
    };

    const checkForWin = (token) => {
        if (gameBoard.board[0] === token && gameBoard.board[3] === token && gameBoard.board[6] === token) {
            return true;
        } else if (gameBoard.board[1] === token && gameBoard.board[4] === token && gameBoard.board[7] === token) {
            return true;
        } else if (gameBoard.board[2] === token && gameBoard.board[5] === token && gameBoard.board[8] === token) {
            return true;
        } else if (gameBoard.board[0] === token && gameBoard.board[1] === token && gameBoard.board[2] === token) {
            return true;
        } else if (gameBoard.board[3] === token && gameBoard.board[4] === token && gameBoard.board[5] === token) {
            return true;
        } else if (gameBoard.board[6] === token && gameBoard.board[7] === token && gameBoard.board[8] === token) {
            return true;
        } else if (gameBoard.board[0] === token && gameBoard.board[4] === token && gameBoard.board[8] === token) {
            return true;
        } else if (gameBoard.board[2] === token && gameBoard.board[4] === token && gameBoard.board[6] === token) {
            return true;
        } else if (gameBoard.board.length === 9 && gameBoard.board.includes(undefined) !== true) { 
            return false;
        } else {
            return false;
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
    const winningMessage = document.createElement("div");
    const body = document.querySelector("body");

    let player1;
    let player2;

    const restartGame = () => {
        gameBoard.emptyBoard();
        gameController.setRoundCounterBack();
        deleteTokens();
        removeWinningMessage();
    };

    const deleteTokens = () => {
        fields.forEach((field) => {
            field.textContent = ""
        });
    }

    const displayToken = (field, player) => {
        field.textContent = player.token;
    };

    const displayWinningMessage = (player) => {
        winningMessage.setAttribute("class", "winning-message");
        winningMessage.textContent = `Congratulations! ${player.name} wins the game!`;
        body.appendChild(winningMessage);
    };

    const removeWinningMessage = () => {
        body.removeChild(winningMessage);
    }

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
            if (gameBoard.board[fieldNumber] === undefined && gameBoard.checkForWin(player.token) === false) { //hier kann ich nach dem sieg noch ein token setzen. warum?
                gameBoard.setToken(fieldNumber, player.token); 
                displayToken(field, player);
                if (gameBoard.checkForWin(player.token)) { //hier muss ich noch gucken, was ich mit einem tie mache
                    displayWinningMessage(player)
                };
                gameController.increaseRoundCounter();
            }


        });
    })

})();

