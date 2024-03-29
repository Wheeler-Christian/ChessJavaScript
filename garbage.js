//Import the external classes vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
import { Pawn } from './classes/pawn.js';
import { Rook } from './classes/rook.js';
import { Knight } from './classes/knight.js';
import { Bishop } from './classes/bishop.js';
import { Queen } from './classes/queen.js';
import { King } from './classes/king.js';
//Import the external classes ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//to convert letters to numbers -- Z is a dummy value -- so the indeces of the letters line up with the numbering on the board
//                  0    1    2    3    4    5    6    7    8    
const num2alpha = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const NUM_COLS = 8;//the chess board has 8 columns
const NUM_ROWS = 8;//the chess board has 8 columns
const btnMove = document.querySelector('#btnMove');

let sourceSquare = 'A2';
let targetSquare = 'A3';
let lightsTurn = true; //true if it is light team's turn; false if it is dark team's turn

let occupiedSquares = new Set();
let chessPieces = new Map();

//make references for all the squares and put them in an array
let squares = [];
//A1 A2 A3...
for (let c = 1; c <= NUM_COLS; c++) {
    for (let r = 1; r <= NUM_ROWS; r++) {
        squares.push(
            `${num2alpha[c]}${r}`
            );
    }
}

//Create the ChessPiece objects, and store them in a Map data structure vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
chessPieces.set('DR2', new Rook('DR2', 'dark', 'A8', 'images/dark-rook.png'));
chessPieces.set('DN2', new Knight('DN2', 'dark', 'B8', 'images/dark-knight.png'));
chessPieces.set('DB2', new Bishop('DB2', 'dark', 'C8', 'images/dark-bishop.png'));
chessPieces.set('DQ', new Queen('DQ', 'dark', 'D8', 'images/dark-queen.png'));
chessPieces.set('DK', new King('DK', 'dark', 'E8', 'images/dark-king.png'));
chessPieces.set('DB1', new Bishop('DB1', 'dark', 'F8', 'images/dark-bishop.png'));
chessPieces.set('DN1', new Knight('DN1', 'dark', 'G8', 'images/dark-knight.png'));
chessPieces.set('DR1', new Rook('DR1', 'dark', 'H8', 'images/dark-rook.png'));


//loops through 8 times -- one for each pawn
for (let col = 0; col < NUM_COLS; col++) {
    //creates dark pawn 8, ... dark pawn 1, and places it in the data structure
    const ID = `DP${NUM_COLS - col}`;
    const LOCATION = `${num2alpha[col + 1]}7`;
    chessPieces.set(ID, new Pawn(ID, 'dark', LOCATION, 'images/dark-pawn.png'));
    //chessPieces.get(ID).makeOccupied(LOCATION);
}

//loops through 8 times -- one for each pawn
for (let col = 0; col < NUM_COLS; col++) {
    //creates light pawn 8, ... light pawn 1, and places it in the data structure
    const ID = `LP${col + 1}`;
    const LOCATION = `${num2alpha[col + 1]}2`;
    chessPieces.set(ID, new Pawn(ID, 'light', LOCATION, 'images/light-pawn.png'));
}

chessPieces.set('LR1', new Rook('LR1', 'light', 'A1', 'images/light-rook.png'));
chessPieces.set('LN1', new Knight('LN1', 'light', 'B1', 'images/light-knight.png'));
chessPieces.set('LB1', new Bishop('LB1', 'light', 'C1', 'images/light-bishop.png'));
chessPieces.set('LQ', new Queen('LQ', 'light', 'D1', 'images/light-queen.png'));
chessPieces.set('LK', new King('LK', 'light', 'E1', 'images/light-king.png'));
chessPieces.set('LB2', new Bishop('LB2', 'light', 'F1', 'images/light-bishop.png'));
chessPieces.set('LN2', new Knight('LN2', 'light', 'G1', 'images/light-knight.png'));
chessPieces.set('LR2', new Rook('LR2', 'light', 'H1', 'images/light-rook.png'));
//Create the ChessPiece objects, and store them in a Map data structure vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

chessPieces.forEach(chessPiece => {
    const element = document.createElement('img');
    element.id = chessPiece.getPieceID();
    element.src = chessPiece.getImage();
    element.alt = chessPiece.getPieceID();
    let currentLocation = `#${chessPiece.getLocation()}`;
    document.querySelector(currentLocation).textContent = chessPiece.getPieceID();
    document.querySelector(currentLocation).appendChild(element);
    occupiedSquares.add(chessPiece.getLocation());//occupy the starting location
});

//Once I create all the ChessPiece objects, place them on the board ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//this section adds event listeners to help move pieces vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
btnMove.addEventListener('click', e => {
    e.preventDefault();
    let pieceID = document.querySelector('#movePiece').textContent;//get the piece ID from the label
    let chessPiece = chessPieces.get(pieceID);//get the chessPiece object to be moved
    let newLocation = document.querySelector('#newLocation').textContent;//get the new location from the input, trimmed and upper case
    if (chessPiece.canMove(newLocation, occupiedSquares)) {//if this chess piece is allowed to move there
        occupiedSquares.delete(chessPiece.getLocation);//de-occupy the old location
        chessPiece.move(newLocation);//move it to the new location
        occupiedSquares.add(newLocation);//occupy the new location
    }
});
//this section adds event listeners to help move pieces ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//this section adds event listeners so we can click on the squares vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
function modifySource(newSource){
    //out with the old
    document.querySelector(`#${sourceSquare}`).classList.remove('clicked');

    //in with the new
    document.querySelector(`#${newSource}`).classList.add('clicked');
    sourceSquare = newSource;
}

function modifyTarget(newTarget){

}

squares.forEach(squareID => {
    const element = document.querySelector(`#${squareID}`);
    element.addEventListener('click', e => {
        if(squareID === targetSquare){ //just unclick this square
            document.querySelector(`#${targetSquare}`).classList.remove('clicked'); //the old target square is no longer clicked
            document.querySelector('#movePiece').textContent = 'Try clicking on a square';
        }
        if(occupiedSquares.has(squareID)){ //if clicked square is occupied

        }
        else { //clicked square is empty
            document.querySelector(`#${targetSquare}`).classList.remove('clicked'); //the old target square is no longer clicked

        }
    });
});
//this section adds event listeners so we can click on the squares ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
