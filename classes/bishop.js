import { ChessPiece } from "./chess_piece.js";
import * as SQUARE from './square_methods.js';

export class Bishop extends ChessPiece {
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
        const ordinalDir = SQUARE.isPathOrdinal(this.location, target);
        if(ordinalDir <= 0){ //if the direction is NOT ordinal
            this.setFeedback('The bishop must move in an ordinal direction: Northeast, Southeast, Southwest, or Northwest');
            return false;
        }
        //else path is ordinal
        const path = SQUARE.calcPathOrdinal(this.location, target, ordinalDir);//get the path

        return this.validatePath(path, occupiedSquares);//validate the path
    }
}