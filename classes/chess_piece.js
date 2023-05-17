const IsValidSquare = require('./square_methods').isValidSquare;

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
    }

    //getters
    getPieceID() { return this.pieceID; }
    getTeam() { return this.team; }
    getLocation() { return this.location; }
    getImage() { return this.image; }

    //setters -- dummy functions -- delete later
    setTeam(newTeam) { this.team = newTeam; }
    setLocation(newLocation) { this.location = newLocation; }


    /**
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
        document.querySelector(`#${oldSquare}`).classList.remove('occupied');
        //declare that the NEW square is now occupied
        document.querySelector(`#${newSquare}`).classList.add('occupied');

        //update the location stored in this object
        this.location = newSquare;
    }

    /**
     * Checks the requested newSquare, to see if this ChessPiece can actually move there
     * 
     * @param {string} newSquare the location which we want to check that this piece is allowed to move to
     * @return boolean true if the ChessPiece can move there, false otherwise
     */
    canMove(newSquare) {
        if(!isValidSquare(newSquare)){
            return false; //you cannot move to an invalid square
        }
                
        if (newSquare === this.location) {//if the user tries to move 0 spaces
            console.log('You cannot move 0 spaces!');
            return false;//it is invalid to move a piece zero spaces -- that doesn't make any sense
        }

        if (!document.querySelector(`#${newSquare}`).classList.contains('occupied')) {//if newSquare is empty -- new square is NOT occupied
            console.log('You successfully moved to an empty square');
            return true;
        }

        if (this.pieceID[0] != document.querySelector(`#${newSquare}`).textContent[0]) {//if new square has an enemy on it -- the teams are opposite
            console.log('Enemy captured!');
            return true;
        } 
        else { //the destination square has a player of our team on it
            console.log('You cannot capture your own pieces!');
            return false;//can't capture our own players!
        }
    }
}