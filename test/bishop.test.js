import { Bishop } from '../classes/bishop.js';

// =============== Test Suite canMove2 =======================================================================================================================================
describe('bishop.canMove2()', () => {
    //test cases for TRUE
    let testCases = [
        { sq1: 'A6', sq2: 'B7', occArr: ['A7'] }, //TC 1: northeast 1
        { sq1: 'C3', sq2: 'E1', occArr: ['C2', 'D1'] }, //TC 2: southeast 2
        { sq1: 'E7', sq2: 'B4', occArr: ['C4','D5','E6'] }, //TC 3: southwest 3
        { sq1: 'E2', sq2: 'A6', occArr: ['A5','B4','C3','D2'] }, //TC 4: northwest 4
        { sq1: 'C3', sq2: 'H8', occArr: ['D3','E4','F5','G6','H7'] }, //TC 5: northeast 5
        { sq1: 'B7', sq2: 'H1', occArr: ['B8','C7','D6','E5','F4','G3'] }, //TC 6: southeast 6
        { sq1: 'H8', sq2: 'A1', occArr: ['B1','C2','D3','E4','F5','G6','H7'] }, //TC 7: southwest 7
        { sq1: 'G2', sq2: 'F3', occArr: ['H1','H2','H3','H4','H5','H6','H7','H8'] }, //TC 8: northwest 1
    ];

    testCases.forEach(tc => {
        let bishop = new Bishop('ID', tc.sq1, 'IMAGE'); //only location is needed to test this function, so the other fields are dummies
        let occSet = new Set(tc.occArr);
        it(`should say canMove2(${tc.sq2}) === true`, () => {
            chai.expect(bishop.canMove2(tc.sq2, occSet)).to.be.ok;
        });
    });

    //test cases for FALSE
    testCases = [
        { sq1: 'C3', sq2: 'C4', occArr: ['D3'] }, //TC 9: north 1
        { sq1: 'D5', sq2: 'F5', occArr: ['E5', 'E6'] }, //TC 10: east 2
        { sq1: 'A7', sq2: 'A4', occArr: ['A5', 'B5', 'C5'] }, //TC 11: south 3
        { sq1: 'E5', sq2: 'A5', occArr: ['B5', 'B4', 'B3', 'B2'] }, //TC 12: west 4
        { sq1: 'H5', sq2: 'F3', occArr: ['G4'] }, //TC 13: southwest 2 OBSTRUCTED the rest are obstructed paths vvvvvvvvvvvvvvvv
        { sq1: 'E5', sq2: 'B8', occArr: ['C7'] }, //TC 14: northwest 3
        { sq1: 'C2', sq2: 'G6', occArr: ['F5'] }, //TC 15: northeast 4
        { sq1: 'C6', sq2: 'H1', occArr: ['F3'] }, //TC 16: southeast 5
        { sq1: 'G8', sq2: 'A2', occArr: ['E6'] }, //TC 17: southwest 6
        { sq1: 'H1', sq2: 'A8', occArr: ['G2'] }, //TC 18: northwest 7
        { sq1: 'F4', sq2: 'H6', occArr: ['G5'] }, //TC 19: northeast 2
        { sq1: 'B5', sq2: 'E2', occArr: ['C4'] }, //TC 20: southeast 3
        { sq1: 'C4', sq2: 'C4', occArr: ['B6'] } //TC 21: distance zero
    ];

    testCases.forEach(tc => {
        let bishop = new Bishop('ID', tc.sq1, 'IMAGE'); //only location is needed to test this function, so the other fields are dummies
        let occSet = new Set(tc.occArr);
        it(`should say canMove2(${tc.sq2}) === false`, () => {
            chai.expect(bishop.canMove2(tc.sq2, occSet)).to.be.not.ok;
        });
    });
});