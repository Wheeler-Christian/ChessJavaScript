import * as SQUARE from './square_methods.js';

export class ChessPiece {
    /**
     * ChessPiece constructor
     * @param {string} pieceID, example 'LP1'
     * @param {string} team 
     * @param {string} location, example 'A2'
     * @param {string} image 
     */
    constructor(pieceID, team, location, image) {
        this.pieceID = pieceID;
        this.team = team;
        this.location = location;
        this.image = image;
        this.message = '';
    }

    //getters
    getPieceID() { return this.pieceID; }
    getLocation() { return this.location; }
    getImage() { return this.image; }

    // get team
    getTeam() { 
        if(this.pieceID[0] === 'L'){
            return 'Light';
        } 
        if(this.pieceID[0] === 'D'){
            return 'Dark';
        }
        throw new Error('Team is neither Light nor Dark!');
    }

    // get type
    getType() {
        switch (this.pieceID[1]) {
            case "P":
                return "Pawn";
            case "R":
                return "Rook";
            case "N":
                return "Knight";
            case "B":
                return "Bishop";
            case "Q":
                return "Queen";
            case "K":
                return "King";
            default:
                throw new Error('Type of Chess Piece is invalid!');
        }
    }

    // get rank AKA row
    getRank() {
        return Number(this.location[1]);
    }

    //for giving the user feedback on whether their move was successful
    setFeedback(text) {
        document.querySelector('#feedback').textContent = text;
    }

    /**---------------------------------------------------------------------------------------------------------------------------------------
     * Moves this ChessPiece object from the current location to the new location, by updating the location field
     * 
     * @param {string} newSquare the new square that this chess piece will be moved to
     */
    move(newSquare) {
        //store the old location square in a variable, so it is clear which one we are referring to
        const oldSquare = this.location;

        //put pieceID in NEW square
        document.querySelector(`#${newSquare}`).textContent = this.pieceID;
        //remove chess piece from OLD square
        const node = document.querySelector(`#${oldSquare}`).removeChild(document.querySelector(`#${this.pieceID}`));
        //place the chess piece in NEW square
        document.querySelector(`#${newSquare}`).appendChild(node);
        //remove pieceID from OLD square
        document.querySelector(`#${oldSquare}`).textContent = '';
        //update the location stored in this object
        this.location = newSquare;
        //inform the user of success
        this.setFeedback(`Successfully moved chess piece ${this.pieceID} to ${this.location}`);
    }

    /**---------------------------------------------------------------------------------------------------------------------------------------
     * Checks the requested newSquare, to see if this ChessPiece can actually move there
     * 
     * @param {string} newSquare the location which we want to check that this piece is allowed to move to
     * @param {Set<string>} occupiedSquares the squares which are occupied
     * @return boolean true if the ChessPiece can move there, false otherwise
     */
    canMove(newSquare, occupiedSquares) {
        //if new square is invalid
        if (!SQUARE.IsValidSquare(newSquare)) {
            this.setFeedback(`Error: the square ${newSquare} does not exist`);
            return false; //you cannot move to an invalid square
        }
        //if the user tries to move 0 spaces
        if (newSquare === this.location) {
            this.setFeedback('Error: you cannot move 0 spaces');
            return false;//it is invalid to move a piece zero spaces -- that doesn't make any sense
        }
        //if new square is empty
        if (!occupiedSquares.has(newSquare)) {
            return true;
        }
        //if new square has an ally on it -- the teams are same
        if (this.pieceID[0] === document.querySelector(`#${newSquare}`).textContent[0]) {
            this.setFeedback('Error: you cannot capture your own pieces');
            return false; //can't capture our own players!

        }
        // else the destination square has an enemy on it
        return true;
    }

    /**
     * 
     * @param {boolean} CM2 the result of calling the canMove2() function
     * @returns 
     */
    canMove3(CM2) {
        if (CM2) { //ask the result of canMove2
            return true; //we can move there
        }
        //else we cannot move there
        this.setFeedback(this.message); //tell the user the bad news
        return false;
    }

    /**
     * 
     * @param {string[]} path the path of squares that we want to travel on
     * @param {Set<string>} occupiedSquares the squares that are currently occupied
     * @returns true if all the squares in the path are empty
     * @returns false if any of the squares in the path are occupied
     */
    validatePath(path, occupiedSquares) {
        let pathIsClear = true;//assume the path is clear until we discover otherwise
        path.forEach(square => { //check each square in the path
            if (occupiedSquares.has(square)) { //is that square occupied?
                this.message = `Error: the pathway is obstructed because ${square} is occupied`;
                pathIsClear = false; //we found an obstruction
                return; //if it is occupied, stop searching
            }
        });
        return pathIsClear;//return whether the path is clear
    }
}