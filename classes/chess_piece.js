import * as SQUARE_METHODS from './square_methods.js';

export class ChessPiece {
    /**
     * Creates an instance of ChessPiece
     * Initialize all the fields
     */
    constructor(pieceID, team, location, image) {
        this.pieceID = pieceID;
        this.team = team;
        this.location = location;
        this.image = image;
        this.makeOccupied(location);
    }

    feedback = document.querySelector('#feedback');

    //getters
    getPieceID() { return this.pieceID; }
    getTeam() { return this.team; }
    getLocation() { return this.location; }
    getImage() { return this.image; }

    //setters -- dummy functions -- delete later
    setTeam(newTeam) { this.team = newTeam; }
    setLocation(newLocation) { this.location = newLocation; }
    setFeedback(text) {this.feedback.textContent = text; }

    /**---------------------------------------------------------------------------------------------------------------------------------------
     * 
     * @param {string} square 
     * @returns true if the square is occupied, false otherwise
     */
     isOccupied(square) {
        return document.querySelector(`#${square}`).classList.contains('occupied');
    }

    /**---------------------------------------------------------------------------------------------------------------------------------------
     * 
     * @param {string} square 
     * @returns true if the square is occupied, false otherwise
     */
     makeOccupied(square) {
        document.querySelector(`#${square}`).classList.add('occupied');
    }

    /**---------------------------------------------------------------------------------------------------------------------------------------
     * 
     * @param {string} square 
     * @returns true if the square is occupied, false otherwise
     */
    makeEmpty(square) {
        document.querySelector(`#${square}`).classList.remove('occupied');
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

        //declare that the OLD square is no longer occupied
        this.makeEmpty(oldSquare);
        //declare that the NEW square is now occupied
        this.makeOccupied(newSquare);

        //update the location stored in this object
        this.location = newSquare;

        feedback.textContent = 'Successfully moved a chess piece to new location';
        console.log('Successfully moved a chess piece to new location');
    }

    /**---------------------------------------------------------------------------------------------------------------------------------------
     * Checks the requested newSquare, to see if this ChessPiece can actually move there
     * 
     * @param {string} newSquare the location which we want to check that this piece is allowed to move to
     * @return boolean true if the ChessPiece can move there, false otherwise
     */
    canMove(newSquare) {
        //if new square is invalid
        if (!SQUARE_METHODS.IsValidSquare(newSquare)) {
            feedback.textContent = `Error: the square ${newSquare} does not exist`;
            console.log(`Error: the square ${newSquare} does not exist`);
            return false; //you cannot move to an invalid square
        }

        //if the user tries to move 0 spaces
        if (newSquare === this.location) {
            feedback.textContent = 'Error: you cannot move 0 spaces';
            console.log('Error: you cannot move 0 spaces');
            return false;//it is invalid to move a piece zero spaces -- that doesn't make any sense
        }

        //if new square is empty
        if (!this.isOccupied(newSquare)) {
            return true;
        }

        //if new square has an ally on it -- the teams are same
        if (this.pieceID[0] === document.querySelector(`#${newSquare}`).textContent[0]) {
            feedback.textContent = 'Error: you cannot capture your own pieces';
            console.log('Error: you cannot capture your own pieces');
            return false; //can't capture our own players!

        }
        // else the destination square has an enemy on it
        feedback.textContent = 'Attempting to capture an enemy';
        console.log('Attempting to capture an enemy');
        return true;
    }
}