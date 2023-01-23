//Import the external classes vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
import { ChessPiece } from './classes/ChessPiece.js';
//Import the external classes ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//to convert letters to numbers -- Z is a dummy value -- so the indeces of the letters line up with the numbering on the board
//                  0    1    2    3    4    5    6    7    8    
const alpha2num = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const EIGHT = 8;//since the length of alpha2num is obfuscated by the Z, use this instead of alpha2num.length-1, because that is confusing

//Create the ChessPiece objects, and store them in array vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
let chessPieces = new Array(32);
chessPieces[0] = new ChessPiece('DR2', 'dark', 'A8', 'images/dark-rook.png');//dark rook 2
chessPieces[1] = new ChessPiece('DK2', 'dark', 'B8', 'images/dark-knight.png');//dark knight 2
chessPieces[2] = new ChessPiece('DB2', 'dark', 'C8', 'images/dark-bishop.png');//dark bishop 2
chessPieces[3] = new ChessPiece('DQ1', 'dark', 'D8', 'images/dark-queen.png');//dark queen
chessPieces[4] = new ChessPiece('DQ0', 'dark', 'E8', 'images/dark-king.png');//dark king -- can't have pieceID 'DK1' because that will be used by dark knight 1 -- so I gave it pieceID of 'DQ0' so he can be associated with his wife, the queen
chessPieces[5] = new ChessPiece('DB1', 'dark', 'F8', 'images/dark-bishop.png');//dark bishop 1
chessPieces[6] = new ChessPiece('DK1', 'dark', 'G8', 'images/dark-knight.png');//dark knight 1
chessPieces[7] = new ChessPiece('DR1', 'dark', 'H8', 'images/dark-rook.png');//dark rook 1

//instead of this duplicate code, I did a for loop to do the same thing
//chessPieces[8] = new ChessPiece('DP8', 'dark', 'A7', 'images/dark-pawn.png');//dark pawn 8
//...
// chessPieces[15] = new ChessPiece('DP1', 'dark', 'H7', 'images/dark-pawn.png');//dark pawn 1
for (let col = 0; col < EIGHT; col++) {//loops through 8 times -- one for each pawn
    chessPieces[col + EIGHT] = new ChessPiece(`DP${EIGHT - col}`, 'dark', `${alpha2num[col + 1]}7`, 'images/dark-pawn.png');//creates dark pawn 8, ... dark pawn 1
}

//instead of this duplicate code, I did a for loop to do the same thing
//chessPieces[16] = new ChessPiece('LP1', 'light', 'A2', 'images/light-pawn.png');//light pawn 1
//...
//chessPieces[23] = new ChessPiece('LP8', 'light', 'H2', 'images/light-pawn.png');//light pawn 8
for (let col = 0; col < EIGHT; col++) {//loops through 8 times -- one for each pawn
    chessPieces[col + 16] = new ChessPiece(`LP${col + 1}`, 'light', `${alpha2num[col + 1]}2`, 'images/light-pawn.png');//creates light pawn 8, ... light pawn 1
}

chessPieces[24] = new ChessPiece('LR1', 'light', 'A1', 'images/light-rook.png');//light rook 1
chessPieces[25] = new ChessPiece('LK1', 'light', 'B1', 'images/light-knight.png');//light knight 1
chessPieces[26] = new ChessPiece('LB1', 'light', 'C1', 'images/light-bishop.png');//light bishop 1
chessPieces[27] = new ChessPiece('LQ1', 'light', 'D1', 'images/light-queen.png');//light queen
chessPieces[28] = new ChessPiece('LQ0', 'light', 'E1', 'images/light-king.png');//light king -- can't have pieceID 'LK1' because that will be used by light knight 1 -- so I gave it pieceID of 'LQ0' so he can be associated with his wife, the queen
chessPieces[29] = new ChessPiece('LB2', 'light', 'F1', 'images/light-bishop.png');//light bishop 2
chessPieces[30] = new ChessPiece('LK2', 'light', 'G1', 'images/light-knight.png');//light knight 2
chessPieces[31] = new ChessPiece('LR2', 'light', 'H1', 'images/light-rook.png');//light rook 2
//Create the ChessPiece objects, and store them in array ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//Once I create all the ChessPiece objects, place them on the board vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
for (let i = 0; i < chessPieces.length; i++) {
    const element = document.createElement('img');
    element.id = chessPieces[i].getPieceID();
    element.src = chessPieces[i].getImage();
    element.alt = chessPieces[i].getPieceID();
    document.querySelector(`#${chessPieces[i].getLocation()}`).appendChild(element);
}
//Once I create all the ChessPiece objects, place them on the board ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//garbage probably
const lightPawn1 = document.querySelector('#LP1');
console.log(lightPawn1);
lightPawn1.addEventListener('click', e => {
    lightPawn1.classList.toggle('clicked');
});

//this section adds event listeners for when the squares are clicked vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
//creates a 2d array to hold all the squares
let squares = new Array(EIGHT);
for (let i = 0; i < EIGHT; i++) {
    squares[i] = new Array(EIGHT);
}
//in a double for loop, adds all the squares to a 2D array
for (let col = 0; col < EIGHT; col++) {
    for (let row = 0; row < EIGHT; row++) {
        squares[col][row] = document.querySelector(`#${alpha2num[col + 1]}${row + 1}`);
    }
}
//adds event listeners to all the squares so they toggle an orange color when they are clicked
for (let col = 0; col < EIGHT; col++) {
    for (let row = 0; row < EIGHT; row++) {
        squares[col][row].addEventListener('click', e => {
            squares[col][row].classList.toggle('clicked');
        });
    }
}
//this section adds event listeners for when the squares are clicked ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
