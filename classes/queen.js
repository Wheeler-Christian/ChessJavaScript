import { ChessPiece } from "./chess_piece.js";
import * as SQUARE from './square_methods.js';

export class Queen extends ChessPiece {
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
    canMove(target, occupiedSquares) {
        if (!super.canMove(target, occupiedSquares)) {
            return false; //if super says no, then no
        }
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