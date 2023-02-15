//watch this to know how to push changes to github vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//https://www.youtube.com/watch?v=3Tn58KQvWtU
//watch this to know how to push changes to github ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//Import the external classes vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
import { ChessPiece } from './classes/ChessPiece.js';
//Import the external classes ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//to convert letters to numbers -- Z is a dummy value -- so the indeces of the letters line up with the numbering on the board
//                  0    1    2    3    4    5    6    7    8    
const alpha2num = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const pieceID2Index = ['DR2', 'DK2', 'DB2', 'DQ1', 'DQ0', 'DB1', 'DK1', 'DR1',
                       'DP8', 'DP7', 'DP6', 'DP5', 'DP4', 'DP3', 'DP2', 'DP1',
                       'LP1', 'LP2', 'LP3', 'LP4', 'LP5', 'LP6', 'LP7', 'LP8',
                       'LR1', 'LK1', 'LB1', 'LQ1', 'LQ0', 'LB2', 'LK2', 'LR2'];
const NUM_COLS = 8;//the chess board has 8 columns
const NUM_ROWS = 8;//and 8 rows
const btnMove = document.querySelector('#btnMove');

//Create the ChessPiece objects, and store them in array vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
let chessPieces = new Array(32);
chessPieces[0] = new ChessPiece('DR2', 'dark', 'A8', 'images/dark-rook.png');//dark rook 2
chessPieces[1] = new ChessPiece('DK2', 'dark', 'B8', 'images/dark-knight.png');//dark knight 2
chessPieces[2] = new ChessPiece('DB2', 'dark', 'C8', 'images/dark-bishop.png');//dark bishop 2
chessPieces[3] = new ChessPiece('DQ1', 'dark', 'D8', 'images/dark-queen.png');//dark queen
chessPieces[4] = new ChessPiece('DQ0', 'dark', 'E8', 'images/dark-king.png');//dark king
chessPieces[5] = new ChessPiece('DB1', 'dark', 'F8', 'images/dark-bishop.png');//dark bishop 1
chessPieces[6] = new ChessPiece('DK1', 'dark', 'G8', 'images/dark-knight.png');//dark knight 1
chessPieces[7] = new ChessPiece('DR1', 'dark', 'H8', 'images/dark-rook.png');//dark rook 1
for (let col = 0; col < NUM_COLS; col++) {//loops through 8 times -- one for each pawn
    chessPieces[col + NUM_COLS] = new ChessPiece(`DP${NUM_COLS - col}`, 'dark', `${alpha2num[col + 1]}7`, 'images/dark-pawn.png');//creates dark pawn 8, ... dark pawn 1
}
for (let col = 0; col < NUM_COLS; col++) {//loops through 8 times -- one for each pawn
    chessPieces[col+16] = new ChessPiece(`LP${col + 1}`, 'light', `${alpha2num[col + 1]}2`, 'images/light-pawn.png');//creates light pawn 8, ... light pawn 1
}
chessPieces[24] = new ChessPiece('LR1', 'light', 'A1', 'images/light-rook.png');//light rook 1
chessPieces[25] = new ChessPiece('LK1', 'light', 'B1', 'images/light-knight.png');//light knight 1
chessPieces[26] = new ChessPiece('LB1', 'light', 'C1', 'images/light-bishop.png');//light bishop 1
chessPieces[27] = new ChessPiece('LQ1', 'light', 'D1', 'images/light-queen.png');//light queen
chessPieces[28] = new ChessPiece('LQ0', 'light', 'E1', 'images/light-king.png');//light king
chessPieces[29] = new ChessPiece('LB2', 'light', 'F1', 'images/light-bishop.png');//light bishop 2
chessPieces[30] = new ChessPiece('LK2', 'light', 'G1', 'images/light-knight.png');//light knight 2
chessPieces[31] = new ChessPiece('LR2', 'light', 'H1', 'images/light-rook.png');//light rook 2
//Create the light ChessPiece objects, and store them in array ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//Once I create all the ChessPiece objects, place them on the board vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
for (let i = 0; i < chessPieces.length; i++) {
    const element = document.createElement('img');
    element.id = chessPieces[i].getPieceID();
    element.src = chessPieces[i].getImage();
    element.alt = chessPieces[i].getPieceID();
    let currentLocation = `#${chessPieces[i].getLocation()}`;
    document.querySelector(currentLocation).textContent = chessPieces[i].getPieceID();
    document.querySelector(currentLocation).appendChild(element);
    //document.querySelector(currentLocation).classList.add('occupied');
}
//Once I create all the ChessPiece objects, place them on the board ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//this section adds event listeners to help move pieces vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
btnMove.addEventListener('click', e => {
    e.preventDefault();
    let pieceID = document.querySelector('#movePiece').value;//get the piece ID from the input
    let chessPiece = chessPieces[pieceID2Index.indexOf(pieceID)];//get the chessPiece object to be moved
    let newLocation = document.querySelector('#newLocation').value.trim().toUpperCase();//get the new location from the input, trimmed and upper case
    if(chessPiece.canMove(newLocation)){
        chessPiece.move(newLocation);
    }
});
//this section adds event listeners to help move pieces ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^




/*
//garbage vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//this section adds event listeners for when the squares are clicked vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//creates a 2d array to hold all the squares
let squares = new Array(NUM_COLS);
for (let i = 0; i < NUM_COLS; i++) {
    squares[i] = new Array(NUM_ROWS);
}

let originClicked = null;
let destinationClicked = null;

//in a double for loop, adds all the squares to a 2D array
for (let col = 0; col < NUM_COLS; col++) {
    for (let row = 0; row < NUM_ROWS; row++) {
        squares[col][row] = document.querySelector(`#${alpha2num[col + 1]}${row + 1}`);
    }
}
//adds event listeners to all the squares so they toggle color when they are clicked
for (let col = 0; col < NUM_COLS; col++) {
    for (let row = 0; row < NUM_ROWS; row++) {
        const square = squares[col][row];
        square.addEventListener('click', e => {
            square.classList.toggle('clicked');
            console.log(square);
        });
    }
}
//this section adds event listeners for when the squares are clicked ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/