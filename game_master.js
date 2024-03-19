//Import the external classes vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
import { Pawn } from "./classes/pawn.js";
import { Rook } from "./classes/rook.js";
import { Knight } from "./classes/knight.js";
import { Bishop } from "./classes/bishop.js";
import { Queen } from "./classes/queen.js";
import { King } from "./classes/king.js";
//Import the external classes ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

export class GameMaster {
  //to convert letters to numbers -- Z is a dummy value -- so the indeces of the letters line up with the numbering on the board
  //             0    1    2    3    4    5    6    7    8
  #num2alpha = ["Z", "A", "B", "C", "D", "E", "F", "G", "H"];
  #NUM_COLS = 8; //the chess board has 8 columns
  #NUM_ROWS = 8; //the chess board has 8 columns

  #chosenSQ1 = "Z9";
  #chosenSQ2 = "Z9";

  #squareIDs = new Set();
  #chessPieces = new Map();
  #whoseTurn = "Light";
  #occupiedSquares = new Set();

  //constructor
  constructor() {
    //make references for all the square IDs and put them in a set
    //A1 A2 A3... B1 B2 B3...
    for (let c = 1; c <= this.#NUM_COLS; c++) {
      for (let r = 1; r <= this.#NUM_ROWS; r++) {
        this.#squareIDs.add(`${this.#num2alpha[c]}${r}`);
      }
    }
  }

  /**
   * output variables to help with debugging
   */
  debugOutput(squareID) {
    return (
      "squareID: " +
      squareID +
      "\nchosenSQ1: " +
      this.#chosenSQ1 +
      "\nchosenSQ2: " +
      this.#chosenSQ2 +
      "\nwhoseTurn: " +
      this.#whoseTurn +
      "\n"
    );
  }

  /**
   * sets up the game
   */
  gameSetup() {
    this.#createPieces();
    this.#aelSquares2();
    this.#aelPawnPromotion();
  }

  /**
   * creates all of the chess pieces and places them on the board
   */
  #createPieces() {
    //Create the dark chess pieces
    this.#chessPieces.set("DR2", new Rook("DR2", "A8"));
    this.#chessPieces.set("DN2", new Knight("DN2", "B8"));
    this.#chessPieces.set("DB2", new Bishop("DB2", "C8"));
    this.#chessPieces.set("DQ", new Queen("DQ", "D8"));
    this.#chessPieces.set("DK", new King("DK", "E8"));
    this.#chessPieces.set("DB1", new Bishop("DB1", "F8"));
    this.#chessPieces.set("DN1", new Knight("DN1", "G8"));
    this.#chessPieces.set("DR1", new Rook("DR1", "H8"));

    //Create the dark pawns
    //loops through 8 times -- one for each pawn
    for (let col = 0; col < this.#NUM_COLS; col++) {
      //creates dark pawn 8, ... dark pawn 1, and places it in the data structure
      const ID = `DP${this.#NUM_COLS - col}`;
      const LOCATION = `${this.#num2alpha[col + 1]}7`;
      this.#chessPieces.set(ID, new Pawn(ID, LOCATION));
    }

    //Create the light pawns
    //loops through 8 times -- one for each pawn
    for (let col = 0; col < this.#NUM_COLS; col++) {
      //creates light pawn 8, ... light pawn 1, and places it in the data structure
      const ID = `LP${col + 1}`;
      const LOCATION = `${this.#num2alpha[col + 1]}2`;
      this.#chessPieces.set(ID, new Pawn(ID, LOCATION));
    }

    //Create the light chess pieces
    this.#chessPieces.set("LR1", new Rook("LR1", "A1"));
    this.#chessPieces.set("LN1", new Knight("LN1", "B1"));
    this.#chessPieces.set("LB1", new Bishop("LB1", "C1"));
    this.#chessPieces.set("LQ", new Queen("LQ", "D1"));
    this.#chessPieces.set("LK", new King("LK", "E1"));
    this.#chessPieces.set("LB2", new Bishop("LB2", "F1"));
    this.#chessPieces.set("LN2", new Knight("LN2", "G1"));
    this.#chessPieces.set("LR2", new Rook("LR2", "H1"));

    //Once I create all the ChessPiece objects, place them on the board
    this.#chessPieces.forEach((chessPiece) => {
      this.#emplaceChessPiece(chessPiece);
    });
  }

  /**
   * there are two different places this needs to happen, so I put the code in a function
   * @param {ChessPiece} chessPiece
   */
  #emplaceChessPiece(chessPiece) {
    const element = document.createElement("img");
    element.id = chessPiece.getPieceID();
    element.src = chessPiece.getImage();
    element.alt = chessPiece.getPieceID();
    let currentLocation = `#${chessPiece.getLocation()}`;
    document.querySelector(currentLocation).textContent =
      chessPiece.getPieceID();
    document.querySelector(currentLocation).appendChild(element);
    this.#occupiedSquares.add(chessPiece.getLocation()); //occupy the starting location
  }

  /**
   * Move piece
   */
  #movePiece() {
    const pieceID = document.querySelector("#lblSQ1").textContent; //get the piece ID from the label
    const chessPiece = this.#chessPieces.get(pieceID); //get the chessPiece object to be moved
    const destination = document.querySelector("#lblSQ2").textContent; //get the new location from the input, trimmed and upper case
    if (chessPiece.canMove(destination, this.#occupiedSquares)) {
      //if this chess piece is allowed to move there
      this.#occupiedSquares.delete(chessPiece.getLocation()); //de-occupy the old location
      chessPiece.move(destination); //move it to the new location
      this.#occupiedSquares.add(destination); //occupy the new location

      // Do we need to do a pawn promotion
      if (this.#isPawnPromotion(chessPiece)) {
        console.log("PROMOTING PAWN");
        this.#promotePawn(chessPiece.getPieceID());
      } else {
        //no pawn promotion available
        this.#startNextTurn(); //start the next turn
      }

      // update the feedback text
      document.querySelector('#feedback').textContent = chessPiece.getFeedback();
    }
    else {
      // update the feedback text
      document.querySelector('#feedback').textContent = chessPiece.getFeedback();
    }
  }

  /**
   * Makes the board ready for the next turn
   */
  #startNextTurn() {
    // TODO VVVVV *************************************************************************
    // the chess pieces of the team that just finished
    let enemyChessPieces = null;
    // the location of the king of the team that did NOT just finish.
    //this.askIsKingChecked(enemyChessPieces, locationOfKing);
    // TODO ^^^^^ *************************************************************************

    this.#whoseTurn = this.#whoseTurn === "Light" ? "Dark" : "Light"; // if it was light's turn, it is now dark's turn, and vice versa
    document.querySelector("#whoseTurn").innerText = this.#whoseTurn;

    // unclick both squares
    this.#unclickSQ1(this.#chosenSQ1);
    this.#unclickSQ2(this.#chosenSQ2);
  }

  /**
   * Determines whether the king is checked
   */
  askIsKingChecked(enemyChessPieces, locationOfKing) {
    // Assume the King is not checked
    let isKingChecked = false;

    // Cycle through all the chess pieces of the opposite team, and ask if they check the specified King
    enemyChessPieces.forEach((chessPiece) => {
      if (chessPiece.canMove(locationOfKing, this.#occupiedSquares)) {
        // The King is checked!
        isKingChecked = true;
      }
    });

    return isKingChecked;
  }

  /**
   * Determines whether the king is in checkmate
   */
  isCheckmate() {
    // TODO: this whole function!
  }

  /**Add Event Listener to the Squares
   * this function adds an event listener to each button, so the user can choose how to move
   */
  #aelSquares2() {
    this.#squareIDs.forEach((squareID) => {
      document.querySelector(`#${squareID}`).addEventListener("click", (e) => {
        if (this.#occupiedSquares.has(squareID)) {
          // Is this square occupied?
          if (
            document
              .querySelector(`#${squareID}`)
              .innerText[0].toLowerCase() === this.#whoseTurn[0].toLowerCase()
          ) {
            // Does this square contain an ally?
            if (squareID !== this.#chosenSQ1) {
              // if this square is NOT currently chosen as SOURCE SQUARE
              this.#clickSQ1(squareID); // click this square
            }
          } // End of if(ally)
          else {
            // This square contains an enemy
            //console.log(squareID);
            if ("Z9" !== this.#chosenSQ1 && squareID !== this.#chosenSQ2) {
              // If SOURCE SQUARE has been identified, and this square is not currently chosen
              this.#clickSQ2(squareID); // click this square as DESTINATION
              this.#movePiece(); // Move the chess piece
            }
            //else do nothing
          }
        } else {
          // This square is empty
          if ("Z9" !== this.#chosenSQ1 && squareID !== this.#chosenSQ2) {
            // If SOURCE SQUARE has been identified, and this square is not currently chosen
            this.#clickSQ2(squareID); // click this square as DESTINATION
            this.#movePiece(); // Move the chess piece
          }
          //else do nothing
        }
      }); // End of add event listener
    }); // End of foreach loop
  }

  #unclickSQ1(squareID) {
    document.querySelector("#lblSQ1").innerText = "source";
    this.#chosenSQ1 = "Z9";
    document.querySelector(`#${squareID}`).classList.remove("ally");
  }

  #unclickSQ2(squareID) {
    document.querySelector("#lblSQ2").innerText = "target";
    this.#chosenSQ2 = "Z9";
    document.querySelector(`#${squareID}`).classList.remove("enemy");
  }

  #clickSQ1(squareID) {
    document.querySelector(`#${this.#chosenSQ1}`).classList.remove("ally");
    document.querySelector(`#${squareID}`).classList.add("ally");
    this.#chosenSQ1 = squareID;
    document.querySelector("#lblSQ1").innerText = document.querySelector(
      `#${squareID}`
    ).innerText;
  }

  #clickSQ2(squareID) {
    document.querySelector(`#${this.#chosenSQ2}`).classList.remove("enemy");
    document.querySelector(`#${squareID}`).classList.add("enemy");
    this.#chosenSQ2 = squareID;
    document.querySelector("#lblSQ2").innerText = squareID;
  }

  #isPawnPromotion(chessPiece) {
    // if this is a pawn
    if (chessPiece.getType() === "Pawn") {
      // is the team Light?
      if (chessPiece.getTeam() === "Light") {
        // eligible for promotion if rank is 8
        return chessPiece.getRank() === 8;
      } else {
        // the team is Dark
        return chessPiece.getRank() === 1;
      }
    } else return false; // not a pawn
  }

  #promotePawn(pawnID) {
    //show the promotion form, then wait for their answer
    document.querySelector("#spnPromoPawn").innerText = pawnID;
    document.querySelector("#spnPromoLoc").innerText = this.#chessPieces
      .get(pawnID)
      .getLocation();
    document.querySelector("#divPromo").classList.remove("hidden");
    console.log(document.querySelector("#divPromo"));
  }

  /**
   * adds event listeners for promoting pawns buttons
   */
  #aelPawnPromotion() {
    // Event listener for promoting a pawn:
    document.querySelector("#btnPromo").addEventListener("click", (e) => {
      e.preventDefault();

      //get the team
      const TEAM = document.querySelector("#spnPromoPawn").innerText[0];
      //get the type
      const TYPE = document.querySelector("#selPromo").value;
      // get the location
      const LOCATION = document.querySelector("#spnPromoLoc").innerText;
      //find a number ID
      let numId = 2; //start out with some number ID
      while (this.#chessPieces.has(`${TEAM}${TYPE}${numId}`)) {
        //if this particular ID is taken
        numId++; //try a different number part of the ID
      }
      //create the piece ID from these three separate parts
      const pieceID = `${TEAM}${TYPE}${numId}`;

      switch (TYPE) {
        case "R":
          this.#chessPieces.set(pieceID, new Rook(pieceID, LOCATION));
          break;
        case "N":
          this.#chessPieces.set(pieceID, new Knight(pieceID, LOCATION));
          break;
        case "B":
          this.#chessPieces.set(pieceID, new Bishop(pieceID, LOCATION));
          break;
        case "Q":
          this.#chessPieces.set(pieceID, new Queen(pieceID, LOCATION));
          break;
        default:
          throw new Error("Invalid promotion choice!");
      }
      //emplace the chess piece on the board
      this.#emplaceChessPiece(this.#chessPieces.get(pieceID));

      //hide the promo form, so they can't do anymore promos
      document.querySelector("#divPromo").classList.add("hidden");

      this.#startNextTurn(); //start the next turn
    });
  }
}
