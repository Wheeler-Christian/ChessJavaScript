import { Knight } from '../classes/knight.js';

// =============== Test Suite canMove =======================================================================================================================================
describe('knight.canMove() function', () => {
    //test cases for isPassive1 TRUE
    let testCases = [
        { oldSquare: 'E4', newSquare: 'F6' }, //TC 1: North 2 East 1
        { oldSquare: 'E4', newSquare: 'G5' }, //TC 2: 
        { oldSquare: 'E4', newSquare: 'G3' }, //TC 3: 
        { oldSquare: 'E4', newSquare: 'F2' }, //TC 4: 
        { oldSquare: 'E4', newSquare: 'D2' }, //TC 5: 
        { oldSquare: 'E4', newSquare: 'C3' }, //TC 6: 
        { oldSquare: 'E4', newSquare: 'C5' }, //TC 7: 
        { oldSquare: 'E4', newSquare: 'D6' } //TC 8:
    ];

    testCases.forEach(tc => {
        let knight = new Knight('ID', 'TEAM', tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say knight.canMove(${tc.newSquare}) === true`, () => {
            chai.expect(knight.canMove(tc.newSquare)).to.be.ok;
        });
    });

    //test cases for isPassive1 TRUE
    testCases = [
        { oldSquare: 'E4', newSquare: 'D5' }, //TC 9: 
        { oldSquare: 'E4', newSquare: 'C6' }, //TC 10: 
        { oldSquare: 'E4', newSquare: 'E3' }, //TC 11: 
        { oldSquare: 'E4', newSquare: 'G4' } //TC 12: 
    ];

    testCases.forEach(tc => {
        let knight = new Knight('ID', 'TEAM', tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say knight.canMove(${tc.newSquare}) === true`, () => {
            chai.expect(knight.canMove(tc.newSquare)).to.be.not.ok;
        });
    });
});