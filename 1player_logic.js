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
            return "win";
        } else if (gameBoard.board[1] === token && gameBoard.board[4] === token && gameBoard.board[7] === token) {
            return "win";
        } else if (gameBoard.board[2] === token && gameBoard.board[5] === token && gameBoard.board[8] === token) {
            return "win";
        } else if (gameBoard.board[0] === token && gameBoard.board[1] === token && gameBoard.board[2] === token) {
            return "win";
        } else if (gameBoard.board[3] === token && gameBoard.board[4] === token && gameBoard.board[5] === token) {
            return "win";
        } else if (gameBoard.board[6] === token && gameBoard.board[7] === token && gameBoard.board[8] === token) {
            return "win";
        } else if (gameBoard.board[0] === token && gameBoard.board[4] === token && gameBoard.board[8] === token) {
            return "win";
        } else if (gameBoard.board[2] === token && gameBoard.board[4] === token && gameBoard.board[6] === token) {
            return "win";
        } else if (gameBoard.board.length === 9 && gameBoard.board.includes(undefined) !== true) { 
            return "tie";
        }
    };

    const generateRandomField = () => {
        let field = Math.floor(Math.random() * 9) + 1;
        return field
    };

    return {checkForWin, setToken, emptyBoard, generateRandomField, board}
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
    const inputPlayer1Parent = document.querySelector("#player1-container");
    const inputPlayer2Parent = document.querySelector("#player2-container");
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

    const displayEndOfGameMessage = (player) => {
        winningMessage.setAttribute("class", "winning-message");
        if (gameBoard.checkForWin(player.token) === "win") {
            winningMessage.textContent = `Congratulations! ${player.name} wins the game!`;
        } else if (gameBoard.checkForWin(player.token) === "tie") {
            winningMessage.textContent = "Tie!";
        }
        body.appendChild(winningMessage);
    };

    const removeWinningMessage = () => {
        body.removeChild(winningMessage);
    }

    restartBtn.addEventListener("click", restartGame);

    startBtn.addEventListener("click", (event) => {
        event.preventDefault();
        player1 = Player("You", "X");
        player2 = Player("AI", "O");
    });

    fields.forEach((field) => {
        field.addEventListener("click", () => { //ist noch an einen eventlistener gebunden und AI zieht nur, wenn geklickt wird
            const fieldNumber = parseInt(field.getAttribute("id"));
            let player = gameController.checkWhichPlayersTurnItIs(player1, player2); 
            if (player === player1) {
                if (gameBoard.board[fieldNumber] === undefined && 
                    gameBoard.checkForWin("X") !== "win" && 
                    gameBoard.checkForWin("O") !== "win" &&
                    gameBoard.checkForWin("X") !== "tie" && 
                    gameBoard.checkForWin("O") !== "tie") {
                    gameBoard.setToken(fieldNumber, player.token); 
                    displayToken(field, player);
                    if (gameBoard.checkForWin(player.token)) { 
                        displayEndOfGameMessage(player)
                    };
                    gameController.increaseRoundCounter();
                }   
            } else if (player === player2) {
                if (gameBoard.board[fieldNumber] === undefined &&  //hier muss ich mir nochmal was mit der fieldnumber überlegen
                    gameBoard.checkForWin("X") !== "win" && 
                    gameBoard.checkForWin("O") !== "win" &&
                    gameBoard.checkForWin("X") !== "tie" && 
                    gameBoard.checkForWin("O") !== "tie") {
                    gameBoard.setToken(gameBoard.generateRandomField(), player.token); 
                    displayToken(field, player); //der displayed das noch in dem geklickten feld
                    if (gameBoard.checkForWin(player.token)) { 
                        displayEndOfGameMessage(player)
                    };
                    gameController.increaseRoundCounter();
                }   
            }


        });
    })

})();

