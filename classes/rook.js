import { ChessPiece } from "./chess_piece.js";
import * as SQUARE from './square_methods.js';

export class Rook extends ChessPiece {
    /**
     * Pawn constructor
     * @param {string} pieceID 
     * @param {string} location 
     * @param {string} image 
     */
    constructor(pieceID, location, image) {
        super(pieceID, location, image);
    }

    /**
     * 
     * @param {string} target the square we want to move to
     * @param {Set<string>} occSet the set of squares which are occupied
     * @returns true if we can move to the target
     * @returns false otherwise
     */
     canMove(target, occSet) {
        if (super.canMove(target, occSet)) { //ask the parent class
            return this.canMove2(target, occSet);//ask the rook's specific rules for movement
        }
        //else super says no, you cannot move there
        return false;
    }

/**
     * helper function for the canMove function that can be unit tested since it doesn't use the DOM
     * @param {string} target the square we want to move to
     * @param {Set<string>} occSet a set containing the occupied squares
     * @returns true if the knight is allowed to move there
     * @returns false, with an error string otherwise
     */
    canMove2(target, occSet) {
        const cardinalDir = SQUARE.isPathCardinal(this.location, target);
        if (cardinalDir <= 0) { //if the direction is NOT cardinal
            this.setFeedback('The rook must move in a cardinal direction: North, East, South, or West');
            return false;
        }
        //else path is cardinal
        const path = SQUARE.calcPathCardinal(this.location, target, cardinalDir);//get the path
        return this.validatePath(path, occSet);//validate the path
    }
}