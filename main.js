//watch this to know how to push changes to github vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//https://www.youtube.com/watch?v=3Tn58KQvWtU
//watch this to know how to push changes to github ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//Import the external classes vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//import { ChessPiece } from './classes/chess_piece.js';
import { Pawn } from './classes/pawn.js';
//Import the external classes ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



//dummy
//https://medium.com/dailyjs/running-mocha-tests-as-native-es6-modules-in-a-browser-882373f2ecb0











//to convert letters to numbers -- Z is a dummy value -- so the indeces of the letters line up with the numbering on the board
//                  0    1    2    3    4    5    6    7    8    
const num2alpha = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
console.log(num2alpha);
//tells us where the ChessPiece objects are stored in our array
/*const pieceID2Index = ['DR2', 'DK2', 'DB2', 'DQ1', 'DQ0', 'DB1', 'DK1', 'DR1',
                       'DP8', 'DP7', 'DP6', 'DP5', 'DP4', 'DP3', 'DP2', 'DP1',
                       'LP1', 'LP2', 'LP3', 'LP4', 'LP5', 'LP6', 'LP7', 'LP8',
                       'LR1', 'LK1', 'LB1', 'LQ1', 'LQ0', 'LB2', 'LK2', 'LR2'];*/
const NUM_COLS = 8;//the chess board has 8 columns
const NUM_ROWS = 8;//and 8 rows
const btnMove = document.querySelector('#btnMove');

//Create the ChessPiece objects, and store them in a Map data structure vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
let chessPieces = new Map();

//loops through 8 times -- one for each pawn
for (let col = 0; col < NUM_COLS; col++) {
    //creates dark pawn 8, ... dark pawn 1, and places it in the data structure
    chessPieces.set(`DP${NUM_COLS - col}`, new Pawn(`DP${NUM_COLS - col}`, 'dark', `${num2alpha[col + 1]}7`, 'images/dark-pawn.png'));
}

//loops through 8 times -- one for each pawn
for (let col = 0; col < NUM_COLS; col++) {
    //creates light pawn 8, ... light pawn 1, and places it in the data structure
    chessPieces.set(`LP${col + 1}`, new Pawn(`LP${col + 1}`, 'light', `${num2alpha[col + 1]}2`, 'images/light-pawn.png'));
}
//Create the ChessPiece objects, and store them in a Map data structure vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

chessPieces.forEach(chessPiece => {
    const element = document.createElement('img');
    element.id = chessPiece.getPieceID();
    element.src = chessPiece.getImage();
    element.alt = chessPiece.getPieceID();
    let currentLocation = `#${chessPiece.getLocation()}`;
    document.querySelector(currentLocation).textContent = chessPiece.getPieceID();
    document.querySelector(currentLocation).appendChild(element);
});

//Once I create all the ChessPiece objects, place them on the board ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//this section adds event listeners to help move pieces vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
btnMove.addEventListener('click', e => {
    e.preventDefault();
    let pieceID = document.querySelector('#movePiece').value;//get the piece ID from the input
    let chessPiece = chessPieces.get(pieceID);//get the chessPiece object to be moved
    let newLocation = document.querySelector('#newLocation').value.trim().toUpperCase();//get the new location from the input, trimmed and upper case
    if (chessPiece.canMove(newLocation)) {//if this chess piece is allowed to move there
        chessPiece.move(newLocation);//move it there
    }
});
//this section adds event listeners to help move pieces ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


