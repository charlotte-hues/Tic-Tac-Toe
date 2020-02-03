

const gameBoard = (() => {
    const grid = document.getElementById('grid-container');
    const gameBoardArray = ['x','o','x', 'o', 'x','o','x', 'o', 'x',];  

    gameBoardArray.forEach(tile => {
        let div = document.createElement('div');
        div.innerHTML = tile;
        grid.append(div);
    })


})();



const player = (name, marker) => {
    console.log(name);
    console.log(marker);
}


const charlotte = player('charlotte', 'x');


const game = () => {

}