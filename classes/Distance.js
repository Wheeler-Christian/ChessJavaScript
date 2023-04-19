//this javascript code is used to calculate the distance between squares

//number to letter 1    2    3    4    5    6    7    8
num2alpha = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

/**
 * Determines whether the given string is a valid square on the chess board
 * @param square a string representing the square
 * @returns true if valid square, false if invalid
 */
const IsValidSquare = square => {
    //is the length of the string valid?
    if(square.length != 2){
        return false;
    }
    //is the column valid?
    let column = square[0];
    if(column < 'A' || column > 'H'){
        return false;
    }
    //is the row valid?
    let row = Number(square[1]);
    if(Object.is(row, NaN) || row < 1 || row > 8){
        return false;
    }
    //it passed all my checks, so it is a valid square
    return true;
}

/**
 * Calculates the distance between the two squares in the x direction
 * @param square1 a string representing the source square
 * @param square2 a string representing the destination square
 * @returns the distance between the two COLUMNS
 */
const DeltaX = (square1, square2) => {
    let column1 = num2alpha.indexOf(square1[0]);//get the COLUMN of square1 and convert it to a number
    let column2 = num2alpha.indexOf(square2[0]);//get the COLUMN of square2 and convert it to a number
    return Math.abs(column2 - column1);//return the distance between those two COLUMNS
}

/**DeltaY
 * Calculates the distance between the two squares in the y direction
 * @param square1 a string representing the source square
 * @param square2 a string representing the destination square
 * @returns the distance between the two ROWS
 */
const DeltaY = (square1, square2) => {
    let row1 = square1[1];//get the ROW of square1
    let row2 = square2[1];//get the ROW of square2
    return Math.abs(row2 - row1);//return the distance between those two ROWS
}

/**DeltaY2
* Similar to DeltaY, but allows for the possibility of NEGATIVE distance
* @param square1 a string representing the source square
* @param square2 a string representing the destination square
* @returns the distance between the two ROWS
*          positive if moving UP (light team)
*          negative if moving DOWN (light team)
*/
const DeltaY2 = (square1, square2) => {
    let row1 = square1[1];//get the ROW of square1
    let row2 = square2[1];//get the ROW of square2
    return row2 - row1;//return the distance between those two ROWS
}

/**
 * Calculates the diagonal distance between the two squares
 * @param square1 a string representing the source square
 * @param square2 a string representing the destination square
 * @returns the diagonal distance between the two squares
 */
const DeltaDiag = (square1, square2) => {
    let distX = DeltaX(square1, square2);//find the x distance
    let distY = DeltaY(square1, square2);//find the y distance
    if (distX === distY) {//if DeltaX and DeltaY are the same, then it is a diagonal move
        return distX;//return DeltaX, as this is the same as the diagonal distance
    }
    return -1;//else this is NOT a diagonal move
}

//exports
module.exports.IsValidSquare = IsValidSquare;
module.exports.DeltaX = DeltaX;
module.exports.DeltaY = DeltaY;
module.exports.DeltaY2 = DeltaY2;
module.exports.DeltaDiag = DeltaDiag;
