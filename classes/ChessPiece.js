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
        //console.log(this);
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
        const node = document.querySelector(`#${location}`).removeChild(`#${pieceID}`);//go to the square where this chess piece is located, and remove its child, which will be an image, and store the image as a node
        document.querySelector(`#${newLocation}`).appendChild(node);//go to the square which is to be the new location, and place the image there
        location = newLocation;//update the location stored in this object
    }

    /**
     * Checks the requested newLocation, to see if this ChessPiece can actually move there
     * 
     * @param {string} newLocation the location which we want to check that this piece is allowed to move to
     */
    canMove(newLocation) {
        //TODO: this function
    }
}