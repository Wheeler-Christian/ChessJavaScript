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
        console.log(`moving ${this.pieceID} to ${target}`);
        if (!super.canMove(target)) {
            return false; //if super says no, then no
        }
        const direction = SQUARE.isPathCardinal(this.location, target);
        if(direction <= 0){ //if the direction is NOT cardinal
            this.setFeedback('The rook must move in a CARDINAL direction: North, East, South, or West');
            return false;
        }
        //else path is cardinal
        const path = SQUARE.calcPathCardinal(this.location, target, direction);//get the path
        let pathIsClear = true;//assume the path is clear until we discover otherwise
        path.forEach(square => { //check each square in the path
            if(occupiedSquares(square)){ //is that square occupied?
                this.setFeedback(`Error: the pathway is obstructed because ${square} is occupied`);
                pathIsClear = false; //we found an obstruction
                return; //if it is occupied, stop searching
            }
        });
        return pathIsClear;//return whether the path is clear
    }
}