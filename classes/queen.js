import { ChessPiece } from "./chess_piece.js";
import * as SQUARE from './square_methods.js';

export class Queen extends ChessPiece {
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
            return this.canMove2(target, occSet);//ask the queen's specific rules for movement
            //return this.canMove3(CM2);//publish the results
        }
        //else super says no, you cannot move there
        return false;
    }

    /**
     * 
     * @param {string} target the square we want to move to
     * @param {Set<string>} occupiedSquares the squares which are occupied
     */
    canMove2(target, occupiedSquares) {
        const dir1 = SQUARE.isPathCardinal(this.location, target);
        if (dir1 > 0) { //if the direction is CARDINAL
            const path = SQUARE.calcPathCardinal(this.location, target, dir1);//get the path
            return this.validatePath(path, occupiedSquares);//validate the path
        }
        //else the direction might be ORDINAL
        const dir2 = SQUARE.isPathOrdinal(this.location, target);
        if (dir2 > 0) { //if the direction is ORDINAL
            const path = SQUARE.calcPathOrdinal(this.location, target, dir2);//get the path
            return this.validatePath(path, occupiedSquares);//validate the path
        }
        //else it is not allowed
        this.setFeedback(`You cannot move the queen to ${target}`);
        return false;
    }
}