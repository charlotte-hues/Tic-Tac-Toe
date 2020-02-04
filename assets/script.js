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
    positions: [],
}

const player2 = {
    name: 'player 2',
    marker: 'O',
    isFirstMove: true,
    positions: [],

}

const game = (() => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => square.addEventListener('click', handleTurn));

    let turn = player1.isFirstMove === true ? player1 : player2;

    const squareIsEmpty = (square) => {
        if(square.dataset.inside === 'empty') {return true};        
    }
    
    const getResult = (player, square) => {
        console.log(square.id);
        player.positions.push(square.id);
        console.log(player.positions);
        const winArr = [
            ["0","1","2"], ["3","4","5"], ["6","7","8"], ["0","4","8"],
            ["0","3","6"], ["1","4","7"], ["2","5","8"], ["2","4","6"] 
        ]
        console.log(winArr[0]);
        const isWinner = (playerArr) => {
            return winArr.some(function(winVal) {
                return playerArr.includes(winVal[0] && winVal[1] && winVal[2])
            })
        }

        console.log(isWinner(player.positions));
        
    }

    const placeMarker = (player, square) => {
        square.setAttribute('data-inside', player.marker);
        square.classList.add(player.marker);
        square.innerHTML = player.marker;
    }

    function handleTurn(e) {
        if(!squareIsEmpty(e.target)) return;
        placeMarker(turn, e.target);
        let result = getResult(turn, this);
        console.log(result);
        // turn = turn === player1 ? player2 : player1;
        // return turn;
    }


})();