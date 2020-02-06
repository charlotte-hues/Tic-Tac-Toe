const gameBoard = (() => {
    const squares = [];
    const grid = document.getElementById('grid-container');
    const gameBoardArray = [
        '','','',
        '', '','',
        '', '', ''
    ];  

    gameBoardArray.forEach(function(tile, index) {
        let div = document.createElement('div');
        div.innerHTML = tile;
        div.classList.add('square');
        div.setAttribute('data-inside', 'empty');
        div.setAttribute('id', index);
        squares.push(div);
        grid.append(div);
    })
 
    return {squares}
})();

const players = (() => {
    const player1 = {
        name: 'player 1',
        marker: 'X',
        isFirstMove: false,
        positions: [],
        score: 0,
    }    
    const player2 = {
        name: 'player 2',
        marker: 'O',
        isFirstMove: true,
        positions: [],
        score: 0,
    }

    return {player1, player2}
})();



const game = (() => {
    let totalMoves = 0;
    let turn = players.player1.isFirstMove === true ? players.player1 : players.player2;
    
    const isWinner = (playerArr) => {
        const winArr = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6]]
        return winArr.some(winVal => winVal.every(winPos => playerArr.includes(winPos)))
    }
    
    const getResult = (player, square) => {
        const position = gameBoard.squares.indexOf(square);
        player.positions.push(position);        
        if(isWinner(player.positions)) return `${player.name} is the winner`;
        if(totalMoves === 9) return "It's a Draw!";
        return 'no result';
    }

    const placeMarker = (player, square) => {
        square.setAttribute('data-inside', player.marker);
        square.classList.add(player.marker);
        square.innerHTML = player.marker;
    }

    const squareIsEmpty = (square) => square.dataset.inside === 'empty';

    const endOfGame = (result) => {
        gameBoard.squares.forEach(square => square.removeEventListener('click', handleTurn));
        console.log(result);
    }

    const nextTurn = () => {
        turn = turn === players.player1 ? players.player2 : players.player1;
        console.log(`${turn.name}'s turn`);
    }

    const handleTurn = (e) => {
        if(!squareIsEmpty(e.target)) return;
        totalMoves++;
        placeMarker(turn, e.target);
        let result = getResult(turn, e.target);
        (result == 'no result') ? nextTurn() :  endOfGame(result);
        return;
    }

    const resetGame = () => {
        gameBoard.squares.forEach(square => square.addEventListener('click', handleTurn));
        gameBoard.squares.forEach(square => {
            square.setAttribute('data-inside', 'empty');
            square.classList.remove('X', 'O');
            square.innerHTML = '';
        });
        player1.positions.length = 0;
        player2.positions.length = 0;
        totalMoves = 0;
        turn = player1.isFirstMove === true ? player1 : player2;
    }

    gameBoard.squares.forEach(square => square.addEventListener('click', handleTurn));

    return {resetGame}
})();