const gameBoard = (() => {
    const grid = document.getElementById('grid-container');
    const gameBoardArray = [
        '','','',
        '', '','',
        '', '', ''
    ];  

    gameBoardArray.forEach(tile => {
        let div = document.createElement('div');
        div.innerHTML = tile;
        div.classList.add('square');
        div.setAttribute('data-inside', 'empty');
        grid.append(div);
    })


})();

const player1 = {
    name: 'player 1',
    marker: 'X',
    isFirstMove: false,
}

const player2 = {
    name: 'player 2',
    marker: 'O',
    isFirstMove: true,
}

const game = (() => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('click', handleTurn));

    let turn = player1.isFirstMove === true ? player1 : player2;

    const canGo = (square) => {
        if(square.dataset.inside === 'empty') {return true};        
    }

    const checkResult = (player) => {
        console.log(player);
    }

    const placeMarker = (player, square) => {
        square.setAttribute('data-inside', player.marker);
        square.classList.add(player.marker);
        checkResult(player);
    }

    function handleTurn() {
        if(!canGo(this)) return;
        placeMarker(turn, this);
        turn = turn === player1 ? player2 : player1;
        return turn;
    }


})();