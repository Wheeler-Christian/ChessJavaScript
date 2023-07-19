import { ChessPiece } from "./chess_piece.js";
import * as SQUARE from './square_methods.js';

export class Bishop extends ChessPiece {
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
            const CM2 = this.canMove2(target);//ask the bishop's specific rules for movement
            return this.canMove3(CM2);//publish the results
        }
        //else super says no, you cannot move there
        return false;
    }

    /**
     * 
     * @param {string} target the square we want to move to
     * @param {Set<string>} occSet the squares which are occupied
     */
    canMove2(target, occSet) {
        const ordinalDir = SQUARE.isPathOrdinal(this.location, target);
        if (ordinalDir <= 0) { //if the direction is NOT ordinal
            this.message = 'The bishop must move in an ordinal direction: Northeast, Southeast, Southwest, or Northwest';
            return false;
        }
        //else path is ordinal
        const path = SQUARE.calcPathOrdinal(this.location, target, ordinalDir);//get the path

        return this.validatePath(path, occSet);//validate the path
    }
}