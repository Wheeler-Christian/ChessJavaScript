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

    /**
     * Moves this ChessPiece object from the current location to the new location, by moving the img attribute in html
     * 
     * @param {string} newLocation the new location that this chess piece will be moved to
     */
    move(newLocation) {
        //put pieceID in new square
        document.querySelector(`#${newLocation}`).textContent = this.pieceID;
        //remove chess piece from old location
        const node = document.querySelector(`#${this.location}`).removeChild(document.querySelector(`#${this.pieceID}`));
        //place the chess piece in new square
        document.querySelector(`#${newLocation}`).appendChild(node);
        //remove pieceID from old square
        document.querySelector(`#${this.location}`).textContent = '';
        //update the location stored in this object
        this.location = newLocation;
    }

    /**
     * Checks the requested newLocation, to see if this ChessPiece can actually move there
     * 
     * @param {string} newLocation the location which we want to check that this piece is allowed to move to
     */
    canMove(newLocation) {
        //TODO: this function
        if(newLocation === this.location){
            return false;//it is invalid to move a piece zero spaces -- that doesn't make any sense
        }
        return true;
    }
}