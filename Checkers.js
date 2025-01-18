//DRAWING GRID

function DrawGrid(pieceGrid){

    let pieceDictionary = new Map ([
        [0 , null],
        [1 , "Images/Checkers_1.png"],
        [2 , "Images/Checkers_3.png"],
        [3 , "Images/Checkers_2.png"],
        [4 , "Images/Checkers_4.png"]
    ])

    whitePieces = 0;
    blackPieces = 0;

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

        whitePieces += pieceGrid[rowIndex].filter(item=>item === 1).length;
        whitePieces += pieceGrid[rowIndex].filter(item=>item === 3).length;

        blackPieces += pieceGrid[rowIndex].filter(item=>item === 2).length;
        blackPieces += pieceGrid[rowIndex].filter(item=>item === 4).length;

        row.innerHTML = line;
    }

    //Set Turn Label
    let turnLabel = document.getElementById("turnDisplay");
    if(whitePieces === 0) turnLabel.innerHTML = "Black Has Won";
    else if(blackPieces === 0) turnLabel.innerHTML = "White Has Won";
    else{

        if(playerTurn === 1) turnLabel.innerHTML = `It Is White's Turn`;
        else turnLabel.innerHTML = `It Is Black's Turn`;
    }
}

//TRACKING GRID AND PLAYERS

whitePieces = 12
blackPieces = 12

playerTurn = 1 //1 = White, 0 = Black

//0 = Empty, 1 = White Normal, 2 = Black Normal, 3 = White King, 4 = Black King
grid = [];

function GenerateGrid(){
    grid = [];
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

function CheckPieceJumps(pieceLocation){
    let areasToJumpTo = [];

    let targetPiece = grid[pieceLocation[0]][pieceLocation[1]]

    if(targetPiece % 2 === 1){
        //White 

        //Forwards Right
        if((pieceLocation[0] + 2 < 8) && (pieceLocation[1] + 2 < 8) && ((grid[pieceLocation[0] + 1][pieceLocation[1] + 1] + 1)% 2 === playerTurn) && ((grid[pieceLocation[0] + 1][pieceLocation[1] + 1]) !== 0) && (grid[pieceLocation[0] + 2][pieceLocation[1] + 2] === 0))
        {
            areasToJumpTo = areasToJumpTo.concat([[pieceLocation[0] + 2 , pieceLocation[1] + 2]]);
            //console.log(`${pieceLocation[0] + 1} ${pieceLocation[1] + 1} ${grid[pieceLocation[0] + 1][pieceLocation[1] + 1]}`);
        }

        //Forwards Left
        if((pieceLocation[0] + 2 < 8) && (pieceLocation[1] - 2 > -1) && ((grid[pieceLocation[0] + 1][pieceLocation[1] - 1] + 1)% 2 === playerTurn) && ((grid[pieceLocation[0] + 1][pieceLocation[1] - 1]) !== 0)  && (grid[pieceLocation[0] + 2][pieceLocation[1] - 2] === 0))
        {
            areasToJumpTo = areasToJumpTo.concat([[pieceLocation[0] + 2 , pieceLocation[1] - 2]]);
            //console.log(`${pieceLocation[0] + 1} ${pieceLocation[1] - 1} ${grid[pieceLocation[0] + 1][pieceLocation[1] - 1]}`);
        }

        if(targetPiece === 3){
            //White King

            //Backwards Right
            if((pieceLocation[0] - 2 > -1) && (pieceLocation[1] + 2 < 8) && ((grid[pieceLocation[0] - 1][pieceLocation[1] + 1] + 1)% 2 === playerTurn) && ((grid[pieceLocation[0] - 1][pieceLocation[1] + 1]) !== 0) && (grid[pieceLocation[0] - 2][pieceLocation[1] + 2] === 0))
            {
                areasToJumpTo = areasToJumpTo.concat([[pieceLocation[0] - 2 , pieceLocation[1] + 2]]);
                //console.log(`${pieceLocation[0] + 1} ${pieceLocation[1] + 1} ${grid[pieceLocation[0] + 1][pieceLocation[1] + 1]}`);
            }

            //Backwards Left
            if((pieceLocation[0] - 2 > -1) && (pieceLocation[1] - 2 > -1) && ((grid[pieceLocation[0] - 1][pieceLocation[1] - 1] + 1)% 2 === playerTurn) && ((grid[pieceLocation[0] - 1][pieceLocation[1] - 1]) !== 0)  && (grid[pieceLocation[0] - 2][pieceLocation[1] - 2] === 0))
            {
                areasToJumpTo = areasToJumpTo.concat([[pieceLocation[0] - 2 , pieceLocation[1] - 2]]);
                //console.log(`${pieceLocation[0] + 1} ${pieceLocation[1] - 1} ${grid[pieceLocation[0] + 1][pieceLocation[1] - 1]}`);
            }
        }
    }
    else{
        //Black

        //Forwards Right
        if((pieceLocation[0] - 2 > -1) && (pieceLocation[1] + 2 < 8) && ((grid[pieceLocation[0] - 1][pieceLocation[1] + 1] + 1)% 2 === playerTurn) && ((grid[pieceLocation[0] - 1][pieceLocation[1] + 1]) !== 0) && (grid[pieceLocation[0] - 2][pieceLocation[1] + 2] === 0))
            { 
                areasToJumpTo = areasToJumpTo.concat([[pieceLocation[0] - 2 , pieceLocation[1] + 2]]);
                //console.log(`${pieceLocation[0] + 1} ${pieceLocation[1] + 1} ${grid[pieceLocation[0] + 1][pieceLocation[1] + 1]}`);
            }

            //Forwards Left
            if((pieceLocation[0] - 2 > -1) && (pieceLocation[1] - 2 > -1) && ((grid[pieceLocation[0] - 1][pieceLocation[1] - 1] + 1)% 2 === playerTurn) && ((grid[pieceLocation[0] - 1][pieceLocation[1] - 1]) !== 0)  && (grid[pieceLocation[0] - 2][pieceLocation[1] - 2] === 0))
            {
                areasToJumpTo = areasToJumpTo.concat([[pieceLocation[0] - 2 , pieceLocation[1] - 2]]);
                //console.log(`${pieceLocation[0] + 1} ${pieceLocation[1] - 1} ${grid[pieceLocation[0] + 1][pieceLocation[1] - 1]}`);
            }
        
        if(targetPiece === 4)
        {
            //Black King

            //Backwards Right
            if((pieceLocation[0] + 2 < 8) && (pieceLocation[1] + 2 < 8) && ((grid[pieceLocation[0] + 1][pieceLocation[1] + 1] + 1)% 2 === playerTurn) && ((grid[pieceLocation[0] + 1][pieceLocation[1] + 1]) !== 0) && (grid[pieceLocation[0] + 2][pieceLocation[1] + 2] === 0))
            {
                areasToJumpTo = areasToJumpTo.concat([[pieceLocation[0] + 2 , pieceLocation[1] + 2]]);
                //console.log(`${pieceLocation[0] + 1} ${pieceLocation[1] + 1} ${grid[pieceLocation[0] + 1][pieceLocation[1] + 1]}`);
            }
    
            //Backwards Left
            if((pieceLocation[0] + 2 < 8) && (pieceLocation[1] - 2 > -1) && ((grid[pieceLocation[0] + 1][pieceLocation[1] - 1] + 1)% 2 === playerTurn) && ((grid[pieceLocation[0] + 1][pieceLocation[1] - 1]) !== 0)  && (grid[pieceLocation[0] + 2][pieceLocation[1] - 2] === 0))
            {
                areasToJumpTo = areasToJumpTo.concat([[pieceLocation[0] + 2 , pieceLocation[1] - 2]]);
                //console.log(`${pieceLocation[0] + 1} ${pieceLocation[1] - 1} ${grid[pieceLocation[0] + 1][pieceLocation[1] - 1]}`);
            }
        }
    }

    return areasToJumpTo;
}

//USER INPUT
var targetPieceLocation = null
var pieceGridPoint = null;
var movesThisTurn = 0;

allowedJumpPositions = [];

document.querySelector('.board').addEventListener('click', function(event) {
    // Check if the clicked element is a cell

    if (event.target.classList.contains('cell')) {
        allowedJumpPositions = [];

        // Get the id of the clicked cell
        let cellId = event.target.id;
        
        targetLocation = [+cellId.slice(5,6), +cellId.slice(7,8)];

        let gridPoint = grid[targetLocation[0]][targetLocation[1]];


        //Generating list of jump moves that can be played across all pieces
        for(let rowIndex = 0; rowIndex < 8; rowIndex++){
            for(let columnIndex = 0; columnIndex < 8; columnIndex++){
                if((grid[rowIndex][columnIndex] !== 0) && (grid[rowIndex][columnIndex] % 2 === playerTurn)){
                    
                    let pieceJumpPoints = CheckPieceJumps([rowIndex,columnIndex]);
                    for(let pieceJumpPoint of pieceJumpPoints){
                        //console.log(`JUMP ${JSON.stringify(pieceJumpPoints)} ${JSON.stringify(pieceJumpPoint)} ${Array.isArray(pieceJumpPoints)}`);
                        allowedJumpPositions = allowedJumpPositions.concat([pieceJumpPoint]);
                    }

                }
            }
        }

        console.log(`JUMPS ${JSON.stringify(allowedJumpPositions)}`);

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

            //Checking if jump moves can be done, and if so if target move is among them
            if(allowedJumpPositions.length !== 0){
                console.log("TESTING 1");

                //Checks if targetLocation is in allowedJumpPositions - we have to stringify because JS works off reference in memory, not content
                let isArrayPresent = allowedJumpPositions.some(arr => JSON.stringify(arr) === JSON.stringify(targetLocation));
                if(isArrayPresent === false){
                    console.log(`TESTING 2 ${JSON.stringify(targetLocation)}`);
                    turnValid = false;
                }
            }

            if(Math.abs(targetPieceLocation[0] - targetLocation[0]) === 2){
                //Jumping move
                let jumpPosition = [targetLocation[0] - (difference[0]/2), targetLocation[1] - (difference[1]/2)];
                
                console.log(`JUMP POSITION : ${jumpPosition}`);
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
                movesThisTurn += 1;
                
                playerTurn = (playerTurn + 1) % 2;
                movesThisTurn = 0;
                DrawGrid(grid);
            }
        }

        
    }
});


//MAIN PROGRAM
window.onload = GenerateGrid();
console.log(grid)
window.onload = DrawGrid(grid);