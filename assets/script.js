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
        isFirstMove: true,
        positions: [],
        score: 0,
    }    
    const player2 = {
        name: 'player 2',
        marker: 'O',
        isFirstMove: false,
        positions: [],
        score: 0,
    }

    const markers = [player1.marker, player2.marker];

    return {player1, player2, markers}
})();

const game = () => {
    let totalMoves = 0;
    let turn = players.player1.isFirstMove === true ? players.player1 : players.player2;
    domEl.gameInfo.innerHTML = `${turn.name} goes first`;
    
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
        domEl.gameInfo.innerHTML = result;
    }

    const nextTurn = () => {
        turn = turn === players.player1 ? players.player2 : players.player1;        
        domEl.gameInfo.innerHTML = (`${turn.name}'s turn`);
    }

    const handleTurn = (e) => {
        if(!squareIsEmpty(e.target)) return;
        totalMoves++;
        placeMarker(turn, e.target);
        let result = getResult(turn, e.target);
        (result == 'no result') ? nextTurn() :  endOfGame(result);
        return;
    }

    const resetGame = (() => {
        gameBoard.squares.forEach(square => square.addEventListener('click', handleTurn));
        gameBoard.squares.forEach(square => {
            square.setAttribute('data-inside', 'empty');
            square.classList.remove('X', 'O');
            square.innerHTML = '';
        });
        players.player1.positions.length = 0;
        players.player2.positions.length = 0;
        totalMoves = 0;
        turn = players.player1.isFirstMove === true ? players.player1 : players.player2;
    })();

    gameBoard.squares.forEach(square => square.addEventListener('click', handleTurn));

    return {resetGame}
};

const domEl = (() => {
    const gameInfo = document.querySelector('#turn-info');
    const startGameButton = document.querySelector('#start-game');
    const player1Name = document.querySelector('#player1-name');
    const player2Name = document.querySelector('#player2-name');

    const player1Naught = document.querySelector('#player1-naught-selector');
    const player1Cross = document.querySelector('#player1-cross-selector');
    const player2Naught = document.querySelector('#player2-naught-selector');
    const player2Cross = document.querySelector('#player2-cross-selector');


    const playerInputs = [player1Name, player2Name];
    const playerMarkers = [player1Naught, player1Cross, player2Naught, player2Cross];

    const togglePlayerMarkers = () => {
        playerMarkers.forEach(marker => {
            marker.classList.toggle('selected');
            marker.disabled = marker.disabled ? false : true;
        })
        players.player1.marker = players.player1.marker === 'X' ? 'O' : 'X';
        players.player2.marker = players.player2.marker === 'X' ? 'O' : 'X';
    }

    const updatePlayerName = (e) => {
        players[e.target.dataset.player].name = e.target.value;
    }

    startGameButton.addEventListener('click', game);
    playerInputs.forEach(input => input.addEventListener('input', updatePlayerName));
    playerMarkers.forEach(marker => marker.addEventListener('click', togglePlayerMarkers));
    
    return {gameInfo, startGameButton}
})();