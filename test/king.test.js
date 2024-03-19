import { King } from '../classes/king.js';

// =============== Test Suite canMove2 =======================================================================================================================================
describe('king.canMove2()', () => {
    //test cases for TRUE
    let testCases = [
        { sq1: 'F2', sq2: 'F1' }, //TC 1: south 1
        { sq1: 'C6', sq2: 'D6' }, //TC 2: west 1
        { sq1: 'G2', sq2: 'G3' }, //TC 3: north 1
        { sq1: 'A7', sq2: 'B7' }, //TC 4: east 1
        { sq1: 'D3', sq2: 'E2' }, //TC 5: southwest 1
        { sq1: 'H7', sq2: 'G8' }, //TC 6: northwest 1
        { sq1: 'B4', sq2: 'C5' }, //TC 7: northeast 1
        { sq1: 'E5', sq2: 'F4' }, //TC 8: southeast 1
    ];

    testCases.forEach(tc => {
        let king = new King('ID', tc.sq1, 'IMAGE'); //only location is needed to test this function, so the other fields are dummies
        let occSet = new Set(tc.occArr);
        it(`should say canMove2(${tc.sq2}) === true`, () => {
            chai.expect(king.canMove2(tc.sq2, occSet)).to.be.ok;
        });
    });

    //test cases for FALSE
    testCases = [
        { sq1: 'B4', sq2: 'B4'}, //TC 9: distance zero
        { sq1: 'A5', sq2: 'A7'}, //TC 10: north 2
        { sq1: 'B6', sq2: 'G6'}, //TC 11: east 5
        { sq1: 'C5', sq2: 'F2'}, //TC 12: southwest 3
        { sq1: 'D4', sq2: 'H8'}, //TC 13: northeast 4
        { sq1: 'D4', sq2: 'F5'}, //TC 14: north 1 east 2
        { sq1: 'H8', sq2: 'C5'}, //TC 14: south 3 west 5
    ];

    testCases.forEach(tc => {
        let king = new King('ID', tc.sq1, 'IMAGE'); //only location is needed to test this function, so the other fields are dummies
        let occSet = new Set(tc.occArr);
        it(`should say canMove2(${tc.sq2}) === false`, () => {
            chai.expect(king.canMove2(tc.sq2, occSet)).to.be.not.ok;
        });
    });
});