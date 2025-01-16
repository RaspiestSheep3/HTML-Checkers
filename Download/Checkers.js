//DRAWING GRID

function DrawGrid(pieceGrid){

    let pieceDictionary = new Map ([
        [0 , null],
        [1 , "Images/Checkers_1.png"],
        [2 , "Images/Checkers_3.png"],
        [3 , "Images/Checkers_2.png"],
        [4 , "Images/Checkers_4.png"]
    ])

    

    for(let rowIndex = 0; rowIndex < 8; rowIndex++){
        let line = "";
        let row = document.getElementById("Row" + String(rowIndex));
        
        for(let columnIndex = 0; columnIndex < 8; columnIndex++){
            let piece = pieceDictionary.get(pieceGrid[rowIndex][columnIndex])

            if(piece === null){
                //Empty
                total = (rowIndex + columnIndex) % 2;
                if(total === 0){
                    line += `<img class = "cell" id = "Cell ${rowIndex} ${columnIndex}" src="Images/Checkers_0.png">`
                }
                else{
                    line += `<img class = "cell" id = "Cell ${rowIndex} ${columnIndex}" src="Images/Checkers_5.png">`
                }
            }
            else line += `<img class = "cell" id = "Cell ${rowIndex} ${columnIndex}" src="${piece}">`
        }
        row.innerHTML = line;
    }

    //Set Turn Label
    let turnLabel = document.getElementById("turnDisplay");
    if(playerTurn === 1) turnLabel.innerHTML = `It is White's Turn`;
    else turnLabel.innerHTML = `It is Black's Turn`;
}

//TRACKING GRID AND PLAYERS

playerTurn = 1 //1 = White, 0 = Black

//0 = Empty, 1 = White Normal, 2 = Black Normal, 3 = White King, 4 = Black King
grid = [];

function GenerateGrid(){
    for(let i = 0; i < 8; i++){
        if(i<=2){
            if(i % 2 === 0) baseArray = [1, 0];
            else baseArray = [0,1]; 
            let result = Array(4).fill(baseArray).flat(); // Repeat 2 times
            grid.push(result);
        }

        else if(i >= 5){
            if(i % 2 === 0) baseArray = [2, 0];
            else baseArray = [0,2];
            let result = Array(4).fill(baseArray).flat(); // Repeat 2 times
            grid.push(result);
        }
        else grid.push([0,0,0,0,0,0,0,0])
    }
}

//USER INPUT
targetPieceLocation = null
pieceGridPoint = null;
document.querySelector('.board').addEventListener('click', function(event) {
    // Check if the clicked element is a cell
    if (event.target.classList.contains('cell')) {
        
        // Get the id of the clicked cell
        let cellId = event.target.id;
        
        targetLocation = [+cellId.slice(5,6), +cellId.slice(7,8)];

        let gridPoint = grid[targetLocation[0]][targetLocation[1]];


        if((!(gridPoint === 0)) && (gridPoint % 2 === playerTurn)){
            //Setting target piece
            targetPieceLocation = targetLocation;
            pieceGridPoint = grid[targetPieceLocation[0]][targetPieceLocation[1]];
        }

        if((gridPoint === 0) && !(targetPieceLocation === null)){
            //We are attempting a turn
            let turnValid = true;
            let jumpTarget = null;

            //Movement is straight in one or both directions
            if((Math.abs(targetPieceLocation[0] - targetLocation[0]) === 0) || Math.abs(targetPieceLocation[1] - targetLocation[1]) === 0) turnValid = false;

            //Movement is perfectly diagonal
            if (!(Math.abs(targetPieceLocation[0] - targetLocation[0]) === Math.abs(targetPieceLocation[1] - targetLocation[1]))) turnValid = false;

            //Cannot move backwards unless a king
            let difference = [targetLocation[0] - targetPieceLocation[0], targetLocation[1] - targetPieceLocation[1]];
            if((pieceGridPoint < 3)) 
            {
                if(playerTurn === 0){
                    if(difference[0] >= 0) turnValid = false;
                }
                else if(playerTurn === 1){
                    if(difference[0] <= 0) turnValid = false;
                }
            }

            if(Math.abs(targetPieceLocation[0] - targetLocation[0]) === 2){
                //Jumping move
                let jumpPosition = [targetLocation[0] - (difference[0]/2), targetLocation[1] - (difference[1]/2)];
                
                console.log(jumpPosition);
                if((grid[jumpPosition[0]][jumpPosition[1]] === 0) || (grid[jumpPosition[0]][jumpPosition[1]] % 2 === playerTurn)) turnValid = false;
                else jumpTarget = jumpPosition;
            }

            console.log(`V${turnValid} T${targetLocation} P${targetPieceLocation} G${gridPoint} GP${pieceGridPoint}`);

            if(turnValid){

                if((playerTurn === 0 && targetLocation[0] === 0) || (playerTurn === 1 && targetLocation[0] === 7))
                {
                    //Promotion
                    grid[targetLocation[0]][targetLocation[1]] = grid[targetPieceLocation[0]][targetPieceLocation[1]] + 2;
                }
                else grid[targetLocation[0]][targetLocation[1]] = grid[targetPieceLocation[0]][targetPieceLocation[1]];
                
                
                grid[targetPieceLocation[0]][targetPieceLocation[1]] = 0;
                if(!(jumpTarget === null)) grid[jumpTarget[0]][jumpTarget[1]] = 0;
                playerTurn = (playerTurn + 1) % 2;
                DrawGrid(grid);
            }
        }

        
    }
});


//MAIN PROGRAM
window.onload = GenerateGrid();
console.log(grid)
window.onload = DrawGrid(grid);