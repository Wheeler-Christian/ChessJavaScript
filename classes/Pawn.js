import { ChessPiece } from "./chess_piece.js";

class Pawn extends ChessPiece {
    //default constructor for now
    constructor() {
        this.maxSpeed = 1;
    }

    /**
     * Calculates the diagonal distance between the two squares
     * @param {string} team the team of the piece to be moved
     * @param {string} square1 a string representing the source square
     * @param {string} square2 a string representing the destination square
     * @returns true if it is straight forward, false otherwise
     */
    IsMoveStraightForward = (team, square1, square2) => {
        if (DeltaX(square1, square2) > 0) { //moving sideways means not straight forward
            return false;
        }
        let deltaY2 = DeltaY2(square1, square2);
        if (team === 'light') { //for light team, positive distance is forward
            return deltaY2 > 0;
        }
        return deltaY2 < 0; //for dark team, negative distance is forward
    }

    /**
     * Checks the requested newSquare, to see if this Pawn can actually move there
     * 
     * @param {string} newSquare the location which we want to check that this Pawn is allowed to move to
     */
    canMove(newSquare) {
        if (!this.super(newSquare)) {//if the ChessPiece class says we cannot move there
            return false;//then we cannot move there
        }

        //TODO: FINISH THIS
    }
}