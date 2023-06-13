import { ChessPiece } from "./chess_piece.js";
import * as SQUARE from './square_methods.js';

export class Rook extends ChessPiece {
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
        const cardinalDir = SQUARE.isPathCardinal(this.location, target);
        if(cardinalDir <= 0){ //if the direction is NOT cardinal
            this.setFeedback('The rook must move in a cardinal direction: North, East, South, or West');
            return false;
        }
        //else path is cardinal
        const path = SQUARE.calcPathCardinal(this.location, target, cardinalDir);//get the path

        return this.validatePath(path, occupiedSquares);//validate the path
    }
}