const gameBoard = (() => {
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

    const squareIsEmpty = (square) => {
        if(square.dataset.inside === 'empty') {return true};        
    }
    
    const checkResult = (player) => {
        const playerMarkerPositions = document.querySelectorAll(`.${player.marker}`); 
        playerMarkerPositions.forEach(position => console.log(position.id))  
        
    }

    const placeMarker = (player, square) => {
        square.setAttribute('data-inside', player.marker);
        square.classList.add(player.marker);
        square.innerHTML = player.marker;
        checkResult(player);
        render(player);
    }

    function handleTurn() {
        if(!squareIsEmpty(this)) return;
        placeMarker(turn, this);
        turn = turn === player1 ? player2 : player1;
        return turn;
    }

    function render(player) {
        console.log(squares);


        // const playerMarkers = squares.filter(squares.getAttribute('data-inside') === player.marker);
    }

    console.log(render());

})();