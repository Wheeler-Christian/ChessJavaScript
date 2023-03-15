import { ChessPiece } from "./ChessPiece";

class Pawn extends ChessPiece {
    //default constructor for now
    constructor() {
        this.maxSpeed = 1;
    }

/**
 * Checks the requested newSquare, to see if this Pawn can actually move there
 * 
 * @param {string} newSquare the location which we want to check that this Pawn is allowed to move to
 */
    canMove(newSquare) {
        if(!this.super(newSquare)){//if the ChessPiece class says we cannot move there
            return false;//then we cannot move there
        }

        //TODO: FINISH THIS
    }
}