//this javascript code is used to calculate stuff with squares, as in distance between squares and such

//number to letter  0    1    2    3    4    5    6    7    8
const num2alpha = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

/**
 * Determines whether the given string is a valid square on the chess board
 * @param square a string representing the square
 * @returns true if valid square, false if invalid
 */
export function IsValidSquare(square) {
    //is the length of the string valid?
    if (square.length != 2) {
        return false;
    }
    //is the column valid?
    let column = square[0];
    if (column < 'A' || column > 'H') {
        return false;
    }
    //is the row valid?
    let row = Number(square[1]);
    if (Object.is(row, NaN) || row < 1 || row > 8) {
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
export function DeltaX(square1, square2) {
    //let column1 = num2alpha.indexOf(square1[0]);//get the COLUMN of square1 and convert it to a number
    //let column2 = num2alpha.indexOf(square2[0]);//get the COLUMN of square2 and convert it to a number
    //return Math.abs(column2 - column1);
    return Math.abs(num2alpha.indexOf(square2[0]) - num2alpha.indexOf(square1[0]));//return the distance between those two COLUMNS
}

/**DeltaY
 * Calculates the distance between the two squares in the y direction
 * @param square1 a string representing the source square
 * @param square2 a string representing the destination square
 * @returns the distance between the two ROWS
 */
export function DeltaY(square1, square2) {
    //let row1 = square1[1];//get the ROW of square1
    //let row2 = square2[1];//get the ROW of square2
    //return Math.abs(row2 - row1);//return the distance between those two ROWS
    return Math.abs(square2[1] - square1[1]);//return the distance between those two ROWS
}

/**DeltaY2
* Similar to DeltaY, but allows for the possibility of NEGATIVE distance:
* where the +/- depends on the team
* @param team the team that this piece is on
* @param square1 a string representing the source square
* @param square2 a string representing the destination square
* @returns the distance between the two ROWS
*          positive if moving UP (LIGHT team)
*          negative if moving DOWN (LIGHT team)
*          positive if moving DOWN (DARK team)
*          negative if moving UP (DARK team)
*/
export function DeltaY2(team, square1, square2) {
    if (team === 'light') {
        return square2[1] - square1[1];//return the distance between those two ROWS
    }
    //else team is dark
    return square1[1] - square2[1];
}

/**
 * Calculates the diagonal distance between the two squares
 * @param square1 a string representing the source square
 * @param square2 a string representing the destination square
 * @returns the diagonal distance between the two squares
 */
export function DeltaDiag(square1, square2) {
    let dX = DeltaX(square1, square2);//find the x distance
    let dY = DeltaY(square1, square2);//find the y distance
    if (dX === dY) {//if DeltaX and DeltaY are the same, then it is a diagonal move
        return dX;//return DeltaX, as this is the same as the diagonal distance
    }
    return -1;//else this is NOT a diagonal move
}



