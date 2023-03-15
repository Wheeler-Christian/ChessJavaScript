//a class to calculate the distance between squares
class Distance {
    num2alpha = ['Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    /**
     * Calculates the distance between the two squares in the x direction
     * @param {*} square1 -- a string representing the the source square
     * @param {*} square2 -- a string representing the destination square
     * @returns the distance between the two COLUMNS
     */
    static DeltaX(square1, square2) {
        let column1 = num2alpha.indexOf(square1[0]);//get the COLUMN of square1 and convert it to a number
        let column2 = num2alpha.indexOf(square2[0]);//get the COLUMN of square2 and convert it to a number
        return Math.abs(column2 - column1);//return the distance between those two COLUMNS
    }

    /**DeltaY
     * Calculates the distance between the two squares in the y direction
     * @param {*} square1 -- a string representing the the source square
     * @param {*} square2 -- a string representing the destination square
     * @returns the distance between the two ROWS
     */
    static DeltaY(square1, square2) {
        let row1 = square1[1];//get the ROW of square1
        let row2 = square2[1];//get the ROW of square2
        return Math.abs(column2 - column1);//return the distance between those two ROWS
    }

    /**DeltaY2
    * Similar to DeltaY, but allows for the possibility of NEGATIVE distance
    * @param {*} square1 -- a string representing the the source square
    * @param {*} square2 -- a string representing the destination square
    * @returns the distance between the two ROWS
    *          positive if moving UP
    *          negative if moving DOWN
    */
    static DeltaY2(square1, square2) {
        let row1 = square1[1];//get the ROW of square1
        let row2 = square2[1];//get the ROW of square2
        return column2 - column1;//return the distance between those two ROWS
    }

    /**
     * Calculates the diagonal distance between the two squares
     * @param {*} square1 -- a string representing the the source square
     * @param {*} square2 -- a string representing the destination square
     * @returns the diagonal distance between the two squares
     */
    static DeltaDiag(square1, square2) {
        let distX = this.DeltaX(square1, square2);//find the x distance
        let distY = this.DeltaY(square1, sqaure2);//find the y distance
        if (distX === distY) {//if DeltaX and DeltaY are the same, then it is a diagonal move
            return distX;//return DeltaX, as this is the same as the diagonal distance
        }
        return -1;//else this is NOT a diagonal move
    }

    static IsMoveStraightForward(square1, square2){
        //TODO: this function
    }
}