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

    return {checkForWin, setToken, emptyBoard, board}
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


const displayController = (() => { // spieler der dran ist muss noch markiert werden
    const fields = document.querySelectorAll(".field");
    const startBtn = document.querySelector(".start-button");
    const restartBtn = document.querySelector(".restart-button");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const player1Label = document.querySelector("#player1-label");
    const player2Label = document.querySelector("#player2-label");
    const inputPlayer1Parent = document.querySelector("#player1-container");
    const inputPlayer2Parent = document.querySelector("#player2-container");
    const player1Name = document.createElement("div");
    const player2Name = document.createElement("div");
    const winningMessage = document.createElement("div");
    const body = document.querySelector("body");

    let player1;
    let player2;

    const restartGame = () => {
        const lastPlayer = gameController.checkWhichPlayersTurnItIs(player1, player2);
        removeTurnIndication(lastPlayer);

        gameBoard.emptyBoard();
        gameController.setRoundCounterBack();
        deleteTokens();
        gameController.randomizeStartingPlayer();

        const player = gameController.checkWhichPlayersTurnItIs(player1, player2);
        
        showFirstTurnIndication(player); // hier gibts noch probleme mit den turn indications wenn restarted wird


        removeWinningMessage(); //wenn keine winning message da ist die func verbugged
        

    };

    const deleteTokens = () => {
        fields.forEach((field) => {
            field.textContent = ""
        });
    }

    const showTurnIndication = (player) => {
        if (player === player1) {
            player2Label.setAttribute("class", "active-player");
        } else if (player === player2) {
            player1Label.setAttribute("class", "active-player");
        }
    }

    const showFirstTurnIndication = (player) => {
        if (player === player1) {
            player1Label.setAttribute("class", "active-player");
        } else if (player === player2) {
            player2Label.setAttribute("class", "active-player");
        }
    }


    const removeTurnIndication = (player) => {
        if (player === player1) {
            player1Label.removeAttribute("class");
        } else if (player === player2) {
            player2Label.removeAttribute("class");
        }
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

        gameController.randomizeStartingPlayer();
        let player = gameController.checkWhichPlayersTurnItIs(player1, player2);
        showFirstTurnIndication(player);
    });

    fields.forEach((field) => {
        field.addEventListener("click", () => {
            const fieldNumber = parseInt(field.getAttribute("id"));
            let player = gameController.checkWhichPlayersTurnItIs(player1, player2);
            showTurnIndication(player);
            removeTurnIndication(player);
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


        });
    })

})();

