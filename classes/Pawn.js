import { ChessPiece } from "./chess_piece.js";
const PAWN_METHODS = require('./pawn_methods');

export class Pawn extends ChessPiece {
    //default constructor
    constructor(pieceID, team, location, image) {
        super(pieceID, team, location, image);
        this.maxSpeed = 2;
    }

    /**
     * Determines whether this is a valid Pawn attack move -- by calling pawn_methods.isAttack()
     */
    isAttack(target) {
        return PAWN_METHODS.isAttack(this.getTeam(), this.getLocation(), target);
    }

    /**
     * Determines whether this is a Passive1 move -- by calling pawn_methods.isPassive1()
     */
     isPassive1(destination) {
        return PAWN_METHODS.isPassive1(this.getTeam(), this.getLocation(), destination);
    }

    /**
     * Determines whether this is a Passive2 move -- by calling pawn_methods.isPassive2()
     */
     isPassive2(destination) {
        return PAWN_METHODS.isPassive2(this.getTeam(), this.getLocation(), destination);
    }

    /**
     * Checks the requested newSquare, to see if this Pawn can actually move there
     */
    canMove(destination) {
        return PAWN_METHODS.canMove(this.getTeam(), this.getLocation(), destination);
    }
}