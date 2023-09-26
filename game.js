const gameBoard = (() => {
    let board = [];
    const addMarker = (field, marker) => {
        if (board[field] === undefined) {
            board[field] = marker;
        }
    };
    return {addMarker, board}
})();

const gameFlow = (() => {
    let round = 0;
    const endRound = () => {
        round++
    }
    return {endRound}
})();
