import { ChessPiece } from "./chess_piece.js";
//import * as PAWN_METHODS from './pawn_methods.js';
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
        this.isFirstMove = true;
    }

    /**
     * 
     * @param {string} dest the square we want to move the Pawn to
     * @returns true if that is an attack move; false otherwise
     */
    isAttack(dest) {
        if (SQUARE_METHODS.DeltaY2(this.getTeam(), this.getLocation(), dest) === 1) { //if the pawn is moving forward 1
            return SQUARE_METHODS.DeltaDiag(this.getLocation(), dest) === 1; //if delta diag is 1, then this is attack move
        }
        else return false; //if not moving forward one, not an attack move
    }

    /**
     * Determines whether this is a Passive1 move -- by calling pawn_methods.isPassive1()
     */
    isPassive1(dest) {
        //return PAWN_METHODS.isPassive1(this.getTeam(), this.getLocation(), dest);
        if (SQUARE_METHODS.DeltaY2(this.getTeam(), this.getLocation(), dest) === 1) { //if the pawn is moving forward 1
            return SQUARE_METHODS.DeltaX(this.getLocation(), dest) === 0; //if delta x is 0, then this is passive move
        }
        else return false; //if not moving forward o1ne, not a Passive1 move
    }

    /**
     * Determines whether this is a Passive2 move -- by calling pawn_methods.isPassive2()
     */
    isPassive2(dest) {
        //return PAWN_METHODS.isPassive2(this.getTeam(), this.getLocation(), dest);
        if (SQUARE_METHODS.DeltaY2(this.getTeam(), this.getLocation(), dest) === 2) { //if the pawn is moving forward 2
            return SQUARE_METHODS.DeltaX(this.getLocation(), dest) === 0; //if delta x is 0, then this is passive move
        }
        else return false; //if not moving forward 2, not a Passive2 move
    }

    /**
     * forward1
     * @returns the new location if the chess piece moved forward 1 space
     */
    forward1(team, square) {
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
     * canMove
     * @param {string} dest the new square that we want to move to
     * @returns true if the Pawn is allowed to move there, false otherwise
     */
    canMove(dest) {
        console.log('Pawn.canMove()');
        if (!super.canMove(dest)) {
            //if super says no, then no
            return false;
        }
        if (this.isOccupied(dest)) { //is the destination occupied?
            if (this.isAttack(dest)) { //is it an attack move?
                //this.setFeedback(`Attacking square ${dest}`);
                return true;
            }
            //else not an attack move
            this.setFeedback("Error: a pawn's attack must be a forward diagonal move of distance 1");
            return false;
        }
        //else the destination is not occupied
        if (this.isPassive1(dest)) { //is it a passive1 move?
            //this.setFeedback(`Peacefully moving to square ${dest}`); //passive moves are allowed to empty squares
            return true;
        }
        if (!this.isPassive2(dest)) { //is this NOT a passive2 move?
            this.setFeedback(`Error: you cannot move Pawn ${this.getPieceID()} to ${dest}. The Pawn has three possible moves: (1) Diagonal attack distance 1, (2) 
            Straight-forward peaceful distance 1, and (3) Straight-forward peaceful distance 2.`);
            return false; //the move did not match any of the 3 categories

        }
        //else this is a passive 2 move
        if (!this.isFirstMove) { //is this NOT the first move for this pawn?
            this.setFeedback('Error: a pawn may move 2 spaces, but only on its first move');
            return false; //not first move, passive2 is not allowed
        }
        //else it is the pawn's first move
        const path = this.forward1(this.getTeam(), this.getLocation()); //find the square in front of this pawn
        if(this.isOccupied(path)) { //is the path obstructed?
            this.setFeedback(`The path is obstructed because square ${path} is occupied`);
            return false; //the path is obstructed, so this move is not allowed
        }
        //else the path is clear
        //this.setFeedback(`The path is clear because ${path} is empty`);
        return true;
    }

    /**
     * 
     * @param {string} newSquare 
     * calls the base function to move the pawn to the new square, 
     * then updates the Pawn's "isFirstMove" boolean variable to false
     */
    move(newSquare) {
        super.move(newSquare);
        this.isFirstMove = false;
    }
}