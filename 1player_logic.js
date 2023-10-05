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
        } else if (gameBoard.board.length === 9 && gameBoard.board.includes(undefined) !== true) { //wenn ganz zu Ende des Spiels ein Token gesetzt wird, dass den Sieg bringen würde, wird es als tie gewertet
            return "tie";
        }
    };

    const generateRandomField = () => {
        while (true) {
            const field = Math.floor(Math.random() * 9);
            if (gameBoard.board[field] === undefined) {
                    return field
                };
        }

    };

    return {checkForWin, setToken, emptyBoard, generateRandomField, board}
})();


const gameController = (() => {
    let round = 1;

    const increaseRoundCounter = () => {
        gameController.round++
    };

    const randomizeStartingPlayer = () => {
        const randomRound = Math.floor(Math.random() *2);
        gameController.round += randomRound 
    }

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

    return {checkWhichPlayersTurnItIs, setRoundCounterBack, increaseRoundCounter, randomizeStartingPlayer, round}
})();

const Player = (name, token) => {
    return {name, token}
}


const displayController = (() => {
    const fields = document.querySelectorAll(".field");
    const startBtn = document.querySelector(".start-button");
    const restartBtn = document.querySelector(".restart-button");
    const winningMessage = document.createElement("div");
    const body = document.querySelector("body");

    let player1;
    let player2;

    const restartGame = () => {
        gameBoard.emptyBoard();
        gameController.setRoundCounterBack();
        deleteTokens();

        gameController.randomizeStartingPlayer();
        const player = gameController.checkWhichPlayersTurnItIs(player1, player2);
        if (player === player2) {
            computerMove(player2);
        }

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
    };

    const computerMove = (player) => {
        const fieldNumber = gameBoard.generateRandomField();
        const field = document.getElementById(fieldNumber.toString())
        gameBoard.setToken(fieldNumber, player.token);
        displayToken(field, player);
    };

    restartBtn.addEventListener("click", restartGame);

    startBtn.addEventListener("click", (event) => {
        event.preventDefault();
        player1 = Player("You", "X");
        player2 = Player("AI", "O");
        
        gameController.randomizeStartingPlayer();
        const player = gameController.checkWhichPlayersTurnItIs(player1, player2);
        if (player === player2) {
            computerMove(player2);
        }
    });

    // eventlistener in ne function packen, die chekct, wer dran ist und dann nur auf klick das spieler kreuz setzen, sonst computerMove()
    
    fields.forEach((field) => {
        field.addEventListener("click", () => {
            //player turn
            const fieldNumber = parseInt(field.getAttribute("id"));
                if (gameBoard.board[fieldNumber] === undefined && 
                    gameBoard.checkForWin("X") !== "win" && 
                    gameBoard.checkForWin("O") !== "win" &&
                    gameBoard.checkForWin("X") !== "tie" && 
                    gameBoard.checkForWin("O") !== "tie") {
                    gameBoard.setToken(fieldNumber, player1.token); 
                    displayToken(field, player1);
                };
                if (gameBoard.checkForWin(player1.token)) { 
                    displayEndOfGameMessage(player1);
                }
                gameController.increaseRoundCounter();

                //computer turn
                if (gameBoard.checkForWin("X") !== "win" && 
                    gameBoard.checkForWin("O") !== "win" &&
                    gameBoard.checkForWin("X") !== "tie" && 
                    gameBoard.checkForWin("O") !== "tie") {
                        computerMove(player2);
                }
                if (gameBoard.checkForWin(player2.token)) {
                    displayEndOfGameMessage(player2);
                }
                gameController.increaseRoundCounter();            
        });
    })

            
    

})();
