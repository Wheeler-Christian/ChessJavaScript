//this javascript code is used to calculate stuff with squares, as in distance between squares and such

//number to letter  0    1    2    3    4    5    6    7    8
const num2alpha = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

/**
 * Determines whether the given string is a valid square on the chess board
 * @param {string} square a string representing the square
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
* Computes the horizontal displacement when moving from square1 to square2
 * @param {string} square1 a string representing the source square
 * @param {string} square2 a string representing the destination square
 * @returns the distance between the two COLUMNS
 *          Positive if moving East
 *          Negative if moving West
 */
export function DeltaX(square1, square2) {
    //                          column 2        minus          column 1
    return num2alpha.indexOf(square2[0]) - num2alpha.indexOf(square1[0]);//return the distance between those two COLUMNS
}

/**
* Computes the vertical displacement when moving from square1 to square2
 * @param {string} square1 a string representing the source square
 * @param {string} square2 a string representing the destination square
 * @returns the distance between the two COLUMNS
 *          Positive if moving North
 *          Negative if moving South
 */
export function DeltaY(square1, square2) {
    //      Row2    minus  Row 1
    return (square2[1] - square1[1]);//return the distance between those two ROWS
}

/**
 * Calculates the diagonal distance between the two squares
 * @param {string} square1 a string representing the source square
 * @param {string} square2 a string representing the destination square
 * @returns the diagonal distance between the two squares
 */
export function DeltaDiag(square1, square2) {
    let dX = Math.abs(DeltaX(square1, square2));//find the x distance
    let dY = Math.abs(DeltaY(square1, square2));//find the y distance
    if (dX === dY) {//if DeltaX and DeltaY are the same, then it is a diagonal move
        return dX;//return DeltaX, as this is the same as the diagonal distance
    }
    return -1;//else this is NOT a diagonal move
}

/**
 * 
 * @param {string} square1 the first square, where we start
 * @param {string} square2 the second square, where we end up
 * @returns 2 if path is north bound
 * @returns 4 if path is east bound
 * @returns 6 if path is south bound
 * @returns 8 if path is west bound
 * @returns 0 if the displacement between the two squares zero
 * @returns -1 if path is not a cardinal direction
 */
export function isPathCardinal(square1, square2) {
    const dx = DeltaX(square1, square2);
    const dy = DeltaY(square1, square2);
    if (dx === 0) {  //vertical?
        if (dy > 0) { //going up?
            return 2; //north
        }
        if (dy < 0) { //going down?
            return 6; //south
        }
        return 0; //dy === 0; going nowhere
    }
    if (dy === 0) {  //horizontal?
        if (dx > 0) { //going right?
            return 4; //east
        }
        if (dx < 0) { //going left?
            return 8; //west
        }
        return 0; //dx === 0; going nowhere
    }
    return -1; //not a cardinal direction
}

/**
 * 
 * @param {string} square1 the first square, where we start
 * @param {string} square2 the second square, where we end up
 * @returns 1 if path is headed northeast
 * @returns 3 if path is southeast
 * @returns 5 if path is southwest
 * @returns 7 if path is northwest
 * @returns 0 if one of the cardinal directions is zero
 * @returns -1 if path is not an ordinal direction
 */
export function isPathOrdinal(square1, square2) {
    const dx = DeltaX(square1, square2);
    const dy = DeltaY(square1, square2);
    if (dx === 0 || dy === 0) {
        return 0; //one of the cardinal directions is zero
    }
    if (Math.abs(dx) !== Math.abs(dy)) { //if the cardinal scalar distances are not the same
        return -1; //not ordinal
    }
    if (dx > 0) {  //going right?
        if (dy > 0) { //going up?
            return 1; //northeast
        }
        if (dy < 0) { //going down?
            return 3; //southeast
        }
    }
    if (dx < 0) {  //going left?
        if (dy > 0) { //going up?
            return 7; //northwest
        }
        if (dy < 0) { //going down?
            return 5; //southwest
        }
    }
}

/**
 * 
 * @param {string} square1 the first square, where we start
 * @param {string} square2 the second square, where we end up
 * @param {number} direction the direction we are moving
 * @returns {string[]}, representing the Cardinal path between the two
 * This function assumes that the path given to it is Cardinal, so it does not check for that
 */
export function calcPathCardinal(square1, square2, direction) {
    let array = [];
    const C1 = num2alpha.indexOf(square1[0]);
    const R1 = parseInt(square1[1]);
    const C2 = num2alpha.indexOf(square2[0]);
    const R2 = parseInt(square2[1]);

    const COLUMN = (square1[0]);

    switch (direction) {
        case 2: //north
            for (let row = R1 + 1; row < R2; row++) {
                array.push(`${COLUMN}${row}`);
            }
            return array;
        case 4: //east
            for (let col = C1 + 1; col < C2; col++) {
                array.push(`${num2alpha[col]}${R1}`);
            }
            return array;
        case 6: //south
            for (let row = R1 - 1; row > R2; row--) {
                array.push(`${COLUMN}${row}`);
            }
            return array;
        case 8: //west
            for (let col = C1 - 1; col > C2; col--) {
                array.push(`${num2alpha[col]}${R1}`);
            }
            return array;
        default:
            console.log('CRITICAL ERROR IN calcPathCardinal');
            return [];
    }
}

/**
 * 
 * @param {string} square1 the first square, where we start
 * @param {string} square2 the second square, where we end up
 * @param {number} direction the direction we are moving
 * @returns an array, representing the Ordinal path between the two
 * This function assumes that the path given to it is Ordinal, so it does not check for that
 */
export function calcPathOrdinal(square1, square2, direction) {
    let array = [];
    const C1 = num2alpha.indexOf(square1[0]);
    const R1 = parseInt(square1[1]);
    const C2 = num2alpha.indexOf(square2[0]);
    const R2 = parseInt(square2[1]);

    let col = C1;

    switch (direction) {
        case 1: //northeast
            for (let row = R1 + 1; row < R2; row++) {
                array.push(`${num2alpha[++col]}${row}`);
            }
            return array;
        case 3: //southeast
            for (let row = R1 - 1; row > R2; row--) {
                array.push(`${num2alpha[++col]}${row}`);
            }
            return array;
        case 5: //southwest
            for (let row = R1 - 1; row > R2; row--) {
                array.push(`${num2alpha[--col]}${row}`);
            }
            return array;
        case 7: //northwest
            for (let row = R1 + 1; row < R2; row++) {
                array.push(`${num2alpha[--col]}${row}`);
            }
            return array;
        default:
            console.log('CRITICAL ERROR IN calcPathOrdinal');
            return [];
    }
}