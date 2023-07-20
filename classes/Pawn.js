import { ChessPiece } from "./chess_piece.js";
import * as SQUARE from './square_methods.js';

export class Pawn extends ChessPiece {
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
     * @returns 1 if the team is Light; -1 if the team is dark
     * this is useful because for Light pieces, forward means up/north
     * while for dark pieces, forward means down/south
     */
    getSign() {
        return this.getTeam() === 'Light' ? 1 : -1;
    }

    /**
     * determines whether it is this pawn's first move
     * @returns true if it is the pawn's first move
     *          false otherwise
     */
    isFirstMove() {
        if (this.getTeam() === 'Light') {
            return this.location[1] === '2';
        }
        //else this.getTeam() === 'dark'
        return this.location[1] === '7';
    }

    /**
     * Determines whether this is a Passive1 move -- by calling pawn_methods.isPassive1()
     */
    isPassive1(dest) {
        if (SQUARE.DeltaY(this.getLocation(), dest) === 1 * this.getSign()) { //if the pawn is moving forward 1?
            return SQUARE.DeltaX(this.getLocation(), dest) === 0; //if delta x is 0, then this is passive move
        }
        else return false; //if not moving forward o1ne, not a Passive1 move
    }

    /**
     * Determines whether this is a Passive2 move -- by calling pawn_methods.isPassive2()
     */
    isPassive2(dest) {
        if (SQUARE.DeltaY(this.getLocation(), dest) === 2 * this.getSign()) { //if the pawn is moving forward 2?
            return SQUARE.DeltaX(this.getLocation(), dest) === 0; //if delta x is 0, then this is passive move
        }
        else return false; //if not moving forward 2, not a Passive2 move
    }

    /**
 * 
 * @param {string} dest the square we want to move the Pawn to
 * @returns true if that is an attack move; false otherwise
 */
    isAttack(dest) {
        if (SQUARE.DeltaY(this.getLocation(), dest) === 1 * this.getSign()) { //if the pawn is moving forward 1
            return SQUARE.DeltaDiag(this.getLocation(), dest) === 1; //if delta diag is 1, then this is attack move
        }
        else return false; //if not moving forward one, not an attack move
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
            return this.canMove2(target, occSet);//ask the pawn's specific rules for movement
        }
        //else super says no, you cannot move there
        return false;
    }

    /**
     * 
     * @param {string} target the square we want to move this pawn to
     * @param {Set<string>} occSet the set of occupied squares
     * @returns true if we are allowed to move there; false otherwise
     */
    canMove2(target, occSet) {
        if (occSet.has(target)) { //if the target square is occupied
            if (this.isAttack(target)) { //it better be an attack move
                return true;//attack successful
            }
            //else not an attack move
            this.setFeedback('Error: for a pawn to move to an occupied square, it must be a forward diagonal move of distance 1.');
            return false;
        }
        //else target square is empty
        if (this.isPassive1(target)) {
            return true;
        }
        //else it is not passive1, so it needs to be passive2
        if (this.isPassive2(target)) {
            if (this.isFirstMove()) {
                const cardinalDir = SQUARE.isPathCardinal(this.location, target);
                const path = SQUARE.calcPathCardinal(this.location, target, cardinalDir);//get the path
                return this.validatePath(path, occSet);//validate the path
            }
            //else not first move
            this.setFeedback('Error: a pawn may move 2 spaces forward, but only on its first move.');
            return false;
        }
        //else it is not allowed
        this.setFeedback('Error: for a pawn to move to an empty square, it must be a forward vertical move of distance 1 or 2.');
        return false;
    }
}