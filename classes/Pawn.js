import { ChessPiece } from "./chess_piece.js";
import * as SQUARE_METHODS from './square_methods.js';

export class Pawn extends ChessPiece {
    /**
     * Pawn constructor
     * @param {string} pieceID 
     * @param {string} team 
     * @param {string} location 
     * @param {string} image 
     */
    constructor(pieceID, team, location, image) {
        super(pieceID, team, location, image);
    }

    /**
     * 
     * @returns 1 if the team is light; -1 if the team is dark
     * this is useful because for light pieces, forward means up/north
     * while for dark pieces, forward means down/south
     */
    getSign() {
        return this.getTeam() === 'light' ? 1 : -1;
    }

    /**
     * determines whether it is this pawn's first move
     * @returns true if it is the pawn's first move
     *          false otherwise
     */
    isFirstMove() {
        if (this.getTeam() === 'light') {
            return this.location[1] === '2';
        }
        //else this.getTeam() === 'dark'
        return this.location[1] === '7';
    }

    /**
     * Determines whether this is a Passive1 move -- by calling pawn_methods.isPassive1()
     */
    isPassive1(dest) {
        if (SQUARE_METHODS.DeltaY(this.getLocation(), dest) === 1 * this.getSign()) { //if the pawn is moving forward 1?
            return SQUARE_METHODS.DeltaX(this.getLocation(), dest) === 0; //if delta x is 0, then this is passive move
        }
        else return false; //if not moving forward o1ne, not a Passive1 move
    }

    /**
     * Determines whether this is a Passive2 move -- by calling pawn_methods.isPassive2()
     */
    isPassive2(dest) {
        if (SQUARE_METHODS.DeltaY(this.getLocation(), dest) === 2 * this.getSign()) { //if the pawn is moving forward 2?
            return SQUARE_METHODS.DeltaX(this.getLocation(), dest) === 0; //if delta x is 0, then this is passive move
        }
        else return false; //if not moving forward 2, not a Passive2 move
    }

    /**
 * 
 * @param {string} dest the square we want to move the Pawn to
 * @returns true if that is an attack move; false otherwise
 */
    isAttack(dest) {
        if (SQUARE_METHODS.DeltaY(this.getLocation(), dest) === 1 * this.getSign()) { //if the pawn is moving forward 1
            return SQUARE_METHODS.DeltaDiag(this.getLocation(), dest) === 1; //if delta diag is 1, then this is attack move
        }
        else return false; //if not moving forward one, not an attack move
    }

    /**
     * calcForward1
     * @returns the new location if the chess piece moved forward 1 space
     */
    calcForward1(team, square) {
        const col = square[0];
        let row = Number(square[1]);
        if (team === 'light') {
            row++;
        }
        else if (team === 'dark') {
            row--;
        }
        return `${col}${row}`;
    }

    /**
     * 
     * @param {string} newSquare the square we want to move this pawn to
     * @param {Set<string>} occupiedSquares the squares which are occupied
     */
    canMove(newSquare, occupiedSquares) {
        if (!super.canMove(newSquare, occupiedSquares)) {
            return false; //if super says no, then no
        }
        const cm2 = this.canMove2(newSquare);
        switch (cm2) {
            case 201: //is it a passive1 move? -----
                if (occupiedSquares.has(newSquare)) { //if the destination is occupied
                    this.setFeedback('Error: for a pawn to do a linear passive move, the target square must be empty');
                    return false;
                }
                //else empty
                return true;
            case 202: //is it a passive2 move? -----
                if (occupiedSquares.has(newSquare)) { //if the destination is occupied
                    this.setFeedback('Error: for a pawn to do a linear passive move, the target square must be empty');
                    return false;
                }
                //else empty
                const path = this.calcForward1(this.getTeam(), this.getLocation()); //find the square in front of this pawn
                if (occupiedSquares.has(path)) { //is the path obstructed?
                    this.setFeedback(`The path is obstructed because square ${path} is occupied`);
                    return false; //the path is obstructed, so this move is not allowed
                }
                //else path is clear
                return true;
            case 203: //is it an attack move? -----
                if (occupiedSquares.has(newSquare)) { //is the destination occupied?
                    return true; //you may attack an occupied square
                }
                //else the destination is not occupied
                this.setFeedback('Error: for a pawn to do a diagonal attack move, the target square must be occupied');
                return false;
            case 402: //is it a failed passive2 move, because not the first move? -----
                this.setFeedback('Error: a pawn may move 2 spaces, but only on its first move');
                return false;
            case 404: //does this move fail for some other reason? -----
                this.setFeedback(`Error: you cannot move Pawn ${this.getPieceID()} to ${newSquare}. The Pawn has three possible moves: (1) Diagonal attack distance 1, (2) Straight-forward peaceful distance 1, and (3) Straight-forward peaceful distance 2.`);
                return false; //the move did not match any of the 3 categories
        }
    }

    /**
     * 
     * @param {string} newSquare the square to move to
     * @returns 201 if isPassive1(newSquare) === true
     *          202 if isPassive2(newSquare) === true and it is the first move
     *          203 if isAttack(newSquare) === true
     *          402 if isPassive2(newSquare) === true but it is NOT the first move
     *          404 if none of the above are true
     *          
     * Helper function for the canMove() function
     */
    canMove2(newSquare) {
        if (this.isPassive1(newSquare)) { //is it an attack move?
            return 201; //attack successful
        }
        //else
        if (this.isPassive2(newSquare)) { //is this a passive2 move?
            if (this.isFirstMove()) { //is it the first move?
                return 202; //passive2 successful
            }
            //else not first move
            else return 402; //passive2 failed
        }
        //else
        if (this.isAttack(newSquare)) //is it an attack move?
        {
            return 203; //attack successful
        }
        //else it is an invalid move
        return 404;
    }
}