import { ChessPiece } from "./chess_piece.js";
import * as SQUARE from './square_methods.js';

export class Knight extends ChessPiece {
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
            const CM2 = this.canMove2(target);//ask the knight's specific rules for movement
            return this.canMove3(CM2);//publish the results
        }
        //else super says no, you cannot move there
        return false;
    }

    /**
     * helper function for the canMove function that can be unit tested since it doesn't use the DOM
     * @param {string} target the square we want to move to
     * @returns true if the knight is allowed to move there
     * @returns false, with an error string otherwise
     */
    canMove2(target){
        const dxAbs = Math.abs(SQUARE.DeltaX(this.location, target));
        const dyAbs = Math.abs(SQUARE.DeltaY(this.location, target));
        if(dxAbs === 1){
            if(dyAbs === 2){
                return true;
            }
            this.message = 'For knight, if |DeltaX| === 1, then |DeltaY| must equal 2.';
            return false;
        }
        if(dxAbs === 2){
            if(dyAbs === 1){
                return true;
            }
            this.message = 'For knight, if |DeltaX| === 2, then |DeltaY| must equal 1.';
            return false;
        }
        this.message = 'A knight must move in an "L"-shaped pattern';
        return false;
    }
}