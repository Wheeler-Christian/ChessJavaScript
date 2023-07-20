import { ChessPiece } from "./chess_piece.js";
import * as SQUARE from './square_methods.js';

export class King extends ChessPiece {
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
            return this.canMove2(target);//ask the knight's specific rules for movement
        }
        //else super says no, you cannot move there
        return false;
    }

    /**
 * 
 * @param {string} target the square we want to move to
 * @param {Set<string>} occupiedSquares the squares which are occupied
 */
    canMove2(target) {
        const dxAbs = Math.abs(SQUARE.DeltaX(this.location, target));
        const dyAbs = Math.abs(SQUARE.DeltaY(this.location, target));

        if (dxAbs === 1) {
            if (dyAbs === 0) { //is it a horizontal move?
                return true; //horizontal move, distance 1
            }
            //else dyAbs !== 0
            if (dyAbs === 1) {
                return true; //diagonal move, distance 1
            }
            //else dyAbs > 1
            this.setFeedback('You cannot move the king that far.');
            return false; //not allowed
        }
        //else dxAbs !== 1
        if (dxAbs === 0) {
            if (dyAbs === 1) { //is it a vertical move?
                return true; //vertical move, distance 1
            }
            //else dyAbs !== 1, which means dyAbs > 1
            this.setFeedback('You cannot move the king that far.');
            return false; //not allowed
        }
        //else dxAbs > 1
        this.setFeedback('You cannot move the king that far.');
        return false; //not allowed
    }
}