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
    const totalMoves = [];
    let turn = players.player1.isFirstMove === true ? players.player1 : players.player2;
    domEl.gameInfo.innerHTML = `${turn.name} goes first`;
    
    const isWinner = (playerArr) => {
        const winArr = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6]]
        return winArr.some(winVal => winVal.every(winPos => playerArr.includes(winPos)))
    }
    
    const getResult = (player, square) => {
        const position = gameBoard.squares.indexOf(square);
        player.positions.push(position);        
        if(isWinner(player.positions)) return `${player.name} is the winner!`;
        if(totalMoves.length >= 9) return "It's a Draw!";
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
        placeMarker(turn, e.target);
        let result = getResult(turn, e.target);
        (result == 'no result') ? nextTurn() :  endOfGame(result);
        return;
    }

    const clearBoard = () => {
        gameBoard.squares.forEach(square => square.removeEventListener('click', handleTurn));
        gameBoard.squares.forEach(square => {
            square.setAttribute('data-inside', 'empty');
            square.classList.remove('X', 'O');
            square.innerHTML = '';
        });
        domEl.gameInfo.innerHTML = `Do you want to play again?`;
        domEl.startGameButton.removeEventListener('click', clearBoard);
    }

    const resetGame = () => {
        gameBoard.squares.forEach(square => square.addEventListener('click', handleTurn));
        players.player1.positions.length = 0;
        players.player2.positions.length = 0;
    };

    domEl.startGameButton.addEventListener('click', clearBoard);
    resetGame();


    return {resetGame}
};

const domEl = (() => {
    const gameInfo = document.querySelector('#turn-info');
    const startGameButton = document.querySelector('#start-game');

    const playerNames = [
        document.querySelector('#player1-name'),
        document.querySelector('#player2-name')
    ];
    const playerMarkers = [
        document.querySelector('#player1-naught-selector'),
        document.querySelector('#player1-cross-selector'),
        document.querySelector('#player2-naught-selector'),
        document.querySelector('#player2-cross-selector')
    ];
    const playerInputs = playerNames.concat(playerMarkers);

    const togglePlayerMarkers = () => {
        console.log('switch');
        playerMarkers.forEach(marker => {
            marker.classList.toggle('selected');
            marker.classList.contains('selected') ? marker.disabled = true : marker.disabled = false;
        })
        players.player1.marker = players.player1.marker === 'X' ? 'O' : 'X';
        players.player2.marker = players.player2.marker === 'X' ? 'O' : 'X';
    }

    const updatePlayerName = (e) => {
        players[e.target.dataset.player].name = e.target.value;
    }

    const startGame = (e) => {
        if(e.target.innerHTML == 'Start') {
            startGameButton.innerHTML = 'New Game';
            playerInputs.forEach(marker => marker.disabled = true);
            game();
        } else {
            startGameButton.innerHTML = 'Start';
            playerInputs.forEach(marker => marker.disabled = false);
        }
        
    }

    startGameButton.addEventListener('click', startGame);
    playerNames.forEach(input => input.addEventListener('input', updatePlayerName));
    playerMarkers.forEach(marker => marker.addEventListener('click', togglePlayerMarkers));
    
    return {gameInfo, startGameButton}
})();