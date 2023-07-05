//Import the external classes vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
import { Pawn } from './classes/pawn.js';
import { Rook } from './classes/rook.js';
import { Knight } from './classes/knight.js';
import { Bishop } from './classes/bishop.js';
import { Queen } from './classes/queen.js';
import { King } from './classes/king.js';
//Import the external classes ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

export class GameMaster {
    //to convert letters to numbers -- Z is a dummy value -- so the indeces of the letters line up with the numbering on the board
    //             0    1    2    3    4    5    6    7    8    
    #num2alpha = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    #NUM_COLS = 8;//the chess board has 8 columns
    #NUM_ROWS = 8;//the chess board has 8 columns

    //To give the user a hint on how to move
    #HINT = 'Try clicking on a square.';

    //"Source And Target Squares" -- sats[1]=source, sats[2]=target
    #sats = null;

    //To send output to the web page about the source and target squares
    #labelsSats = null;

    #squareIDs = new Set();
    #chessPieces = new Map();
    #whoseTurn = 'light';
    #jail = new Map();
    #occupiedSquares = new Set();

    constructor() {
        this.#HINT = 'Try clicking on a square.';

        //"Source And Target Squares" -- sats[1]=source, sats[2]=target
        this.#sats = ['ZERO', this.#HINT, this.#HINT];

        //To send output to the web page about the source and target squares
        this.#labelsSats = ['ZERO', document.querySelector('#stringSource'), document.querySelector('#stringTarget')];
    }

    /**
     * sets up the game
     */
    gameSetup() {
        this.#createPieces();
        this.#aelButton();
        this.#aelSquares();
    }

    /**
     * creates all of the chess pieces and places them on the board
     */
    #createPieces() {
        //Create the dark chess pieces
        this.#chessPieces.set('DR2', new Rook('DR2', 'dark', 'A8', 'images/dark-rook.png'));
        this.#chessPieces.set('DN2', new Knight('DN2', 'dark', 'B8', 'images/dark-knight.png'));
        this.#chessPieces.set('DB2', new Bishop('DB2', 'dark', 'C8', 'images/dark-bishop.png'));
        this.#chessPieces.set('DQ', new Queen('DQ', 'dark', 'D8', 'images/dark-queen.png'));
        this.#chessPieces.set('DK', new King('DK', 'dark', 'E8', 'images/dark-king.png'));
        this.#chessPieces.set('DB1', new Bishop('DB1', 'dark', 'F8', 'images/dark-bishop.png'));
        this.#chessPieces.set('DN1', new Knight('DN1', 'dark', 'G8', 'images/dark-knight.png'));
        this.#chessPieces.set('DR1', new Rook('DR1', 'dark', 'H8', 'images/dark-rook.png'));

        //Create the dark pawns
        //loops through 8 times -- one for each pawn
        for (let col = 0; col < this.#NUM_COLS; col++) {
            //creates dark pawn 8, ... dark pawn 1, and places it in the data structure
            const ID = `DP${this.#NUM_COLS - col}`;
            const LOCATION = `${this.#num2alpha[col + 1]}7`;
            this.#chessPieces.set(ID, new Pawn(ID, 'dark', LOCATION, 'images/dark-pawn.png'));
        }

        //Create the light pawns
        //loops through 8 times -- one for each pawn
        for (let col = 0; col < this.#NUM_COLS; col++) {
            //creates light pawn 8, ... light pawn 1, and places it in the data structure
            const ID = `LP${col + 1}`;
            const LOCATION = `${this.#num2alpha[col + 1]}2`;
            this.#chessPieces.set(ID, new Pawn(ID, 'light', LOCATION, 'images/light-pawn.png'));
        }

        //Create the light chess pieces
        this.#chessPieces.set('LR1', new Rook('LR1', 'light', 'A1', 'images/light-rook.png'));
        this.#chessPieces.set('LN1', new Knight('LN1', 'light', 'B1', 'images/light-knight.png'));
        this.#chessPieces.set('LB1', new Bishop('LB1', 'light', 'C1', 'images/light-bishop.png'));
        this.#chessPieces.set('LQ', new Queen('LQ', 'light', 'D1', 'images/light-queen.png'));
        this.#chessPieces.set('LK', new King('LK', 'light', 'E1', 'images/light-king.png'));
        this.#chessPieces.set('LB2', new Bishop('LB2', 'light', 'F1', 'images/light-bishop.png'));
        this.#chessPieces.set('LN2', new Knight('LN2', 'light', 'G1', 'images/light-knight.png'));
        this.#chessPieces.set('LR2', new Rook('LR2', 'light', 'H1', 'images/light-rook.png'));

        //Once I create all the ChessPiece objects, place them on the board
        this.#chessPieces.forEach(chessPiece => {
            const element = document.createElement('img');
            element.id = chessPiece.getPieceID();
            element.src = chessPiece.getImage();
            element.alt = chessPiece.getPieceID();
            let currentLocation = `#${chessPiece.getLocation()}`;
            document.querySelector(currentLocation).textContent = chessPiece.getPieceID();
            document.querySelector(currentLocation).appendChild(element);
            this.#occupiedSquares.add(chessPiece.getLocation());//occupy the starting location
        });
    }

    /**Add Event Listener to the button
     * this function adds an event listener to the button that moves the pieces
     */
    #aelButton() {
        const btnMove = document.querySelector('#btnMove');
        btnMove.addEventListener('click', e => {
            e.preventDefault();
            const pieceID = document.querySelector('#stringSource').textContent;//get the piece ID from the label
            const chessPiece = this.#chessPieces.get(pieceID);//get the chessPiece object to be moved
            const newLocation = document.querySelector('#stringTarget').textContent;//get the new location from the input, trimmed and upper case
            if (chessPiece.canMove(newLocation, this.#occupiedSquares)) {//if this chess piece is allowed to move there
                this.#occupiedSquares.delete(chessPiece.getLocation());//de-occupy the old location
                chessPiece.move(newLocation);//move it to the new location
                this.#occupiedSquares.add(newLocation);//occupy the new location
            }
        });
    }

    /**Add Event Listener to the Squares
     * this function adds an event listener to each button, so the user can choose how to move
     */
    #aelSquares() {
        //make references for all the square IDs and put them in an array
        //A1 A2 A3... B1 B2 B3...
        for (let c = 1; c <= this.#NUM_COLS; c++) {
            for (let r = 1; r <= this.#NUM_ROWS; r++) {
                squares.push(
                    `${this.#num2alpha[c]}${r}`
                );
            }
        }

        //TODO: finish this function, as described in my notebook
        this.#squareIDs.forEach(squareID => {
            
        });
    }

    /**
     * 
     * @param {number} index must be 1 or 2
     * @param {string} squareID the id of the square to be unclicked
     */
    #unclick(index, squareID){
        this.#labelsSats[index].innerText = this.#HINT;
        document.querySelector(squareID).classList.Remove('clicked');
    }

     /**
     * 
     * @param {number} index must be 1 or 2
     * @param {string} squareID the id of the square to be CLICKED
     */
    #click(index, squareID){
        document.querySelector(this.#sats[index]).classList.Remove('clicked');
        document.querySelector(squareID).classList.add('clicked');
        this.#sats[index] = squareID;
        this.#labelsSats[index].innerText = squareID;
    }
}