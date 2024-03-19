import { Knight } from '../classes/knight.js';

// =============== Test Suite canMove2 =======================================================================================================================================
describe('knight.canMove2()', () => {
    //test cases for TRUE
    let testCases = [
        { oldSquare: 'E4', newSquare: 'F6' }, //TC 1: North 2 East 1
        { oldSquare: 'E4', newSquare: 'G5' }, //TC 2: North 1 East 2
        { oldSquare: 'E4', newSquare: 'G3' }, //TC 3: South 1 East 2
        { oldSquare: 'E4', newSquare: 'F2' }, //TC 4: South 2 East 1
        { oldSquare: 'E4', newSquare: 'D2' }, //TC 5: South 2 West 1
        { oldSquare: 'E4', newSquare: 'C3' }, //TC 6: South 1 West 2
        { oldSquare: 'E4', newSquare: 'C5' }, //TC 7: North 1 West 2
        { oldSquare: 'E4', newSquare: 'D6' } //TC 8: North 2 West 1
    ];

    testCases.forEach(tc => {
        let knight = new Knight('ID', tc.oldSquare, 'IMAGE'); //only location is needed to test this function, so the other fields are dummies
        it(`should say knight.canMove2(${tc.newSquare}) === true`, () => {
            chai.expect(knight.canMove2(tc.newSquare)).to.be.ok;
        });
    });

    //test cases for FALSE
    testCases = [
        { oldSquare: 'E4', newSquare: 'D5' }, //TC 9: North 1 West 1
        { oldSquare: 'E4', newSquare: 'C6' }, //TC 10: North 2 West 2
        { oldSquare: 'E4', newSquare: 'E3' }, //TC 11: South 1
        { oldSquare: 'E4', newSquare: 'G4' } //TC 12: East 2
    ];

    testCases.forEach(tc => {
        let knight = new Knight('ID', tc.oldSquare, 'IMAGE'); //only the location is needed to test this function, so the other fields are dummies
        it(`should say knight.canMove2(${tc.newSquare}) === false`, () => {
            chai.expect(knight.canMove2(tc.newSquare)).to.be.not.ok;
        });
    });
});