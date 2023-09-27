const gameBoard = (() => {
    let board = [];
    const addMarker = (field, marker) => {
        if (board[field] === undefined) {
            board[field] = marker;
        }
    };
    return {addMarker}
})();

const gameController = (() => {
    let round = 0;
    const endRound = () => {
        round++ //hier muss wahrscheinlich noch mehr hin
    }
    return {endRound}
})();

const player = (playerName) => {
    return {playerName}
}
