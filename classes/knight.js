import { ChessPiece } from "./chess_piece.js";
import * as SQUARE from './square_methods.js';

export class Knight extends ChessPiece {
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
     * @param {string} target the square we want to move to
     * @param {Set<string>} occupiedSquares the squares which are occupied
     */
    canMove(target, occupiedSquares){
        if (!super.canMove(target, occupiedSquares)) {
            return false; //if super says no, then no
        }
        const dxAbs = Math.abs(SQUARE.DeltaX(this.location, target));
        const dyAbs = Math.abs(SQUARE.DeltaY(this.location, target));
        if(dxAbs === 1){
            if(dyAbs === 2){
                return true;
            }
            this.setFeedback('For knight, if |DeltaX| === 1, then |DeltaY| must equal 2.');
            return false;
        }
        if(dxAbs === 2){
            if(dyAbs === 1){
                return true;
            }
            this.setFeedback('For knight, if |DeltaX| === 2, then |DeltaY| must equal 1.');
            return false;
        }
        this.setFeedback('A knight must move in an "L"-shaped pattern: 1 square horizontally or vertically, and then 2 squares horizontally or vertically');
        return false;
    }
}