import { Rook } from '../classes/rook.js';

// =============== Test Suite canMove2 =======================================================================================================================================
describe('rook.canMove2()', () => {
    //test cases for TRUE
    let testCases = [
        { sq1: 'E4', sq2: 'E5', occArr: [] }, //TC 1: north 1
        { sq1: 'C2', sq2: 'E2', occArr: ['D1'] }, //TC 2: east 2
        { sq1: 'F7', sq2: 'F4', occArr: ['E6', 'E5'] }, //TC 3: south 3
        { sq1: 'H5', sq2: 'D5', occArr: ['E4', 'F4', 'G4'] }, //TC 4: west 4
        { sq1: 'D3', sq2: 'D8', occArr: ['C4', 'C5', 'C6', 'C7'] }, //TC 5: north 5
        { sq1: 'A7', sq2: 'G7', occArr: ['A8', 'B8', 'C8', 'D8', 'E8'] }, //TC 6: east 6
        { sq1: 'G8', sq2: 'G1', occArr: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6'] } //TC 7: south 7
    ];

    testCases.forEach(tc => {
        let rook = new Rook('ID', tc.sq1, 'IMAGE'); //only location is needed to test this function, so the other fields are dummies
        let occSet = new Set(tc.occArr);
        it(`should say rook.canMove2(${tc.sq2}) === true`, () => {
            chai.expect(rook.canMove2(tc.sq2, occSet)).to.be.ok;
        });
    });

    //test cases for FALSE
    testCases = [
        { sq1: 'G7', sq2: 'H8', occArr: ['H7'] }, //TC 8: northeast 1
        { sq1: 'B3', sq2: 'D1', occArr: ['D2', 'E2'] }, //TC 9: southeast 2
        { sq1: 'D6', sq2: 'A3', occArr: ['A4', 'B5', 'C6'] }, //TC 10: southwest 3
        { sq1: 'F2', sq2: 'B6', occArr: ['E1', 'E2', 'E3', 'E4'] }, //TC 11: northwest 4 and obstructed
        { sq1: 'D4', sq2: 'D4', occArr: ['A1'] }, //TC 12: distance zero
        { sq1: 'G2', sq2: 'G4', occArr: ['G3'] }, //TC 13: north 2 OBSTRUCTED the rest are obstructed paths vvvvvvvvvvvvvvvv
        { sq1: 'C7', sq2: 'F7', occArr: ['E7'] }, //TC 14: east 3
        { sq1: 'F6', sq2: 'F2', occArr: ['F4'] }, //TC 15: south 4
        { sq1: 'G4', sq2: 'B4', occArr: ['C4'] }, //TC 16: west 5
        { sq1: 'E2', sq2: 'E8', occArr: ['E5'] }, //TC 17: north 6
        { sq1: 'A2', sq2: 'H2', occArr: ['B2'] }, //TC 18: east 7
        { sq1: 'H5', sq2: 'H3', occArr: ['H4'] }, //TC 19: south 2
        { sq1: 'D6', sq2: 'A6', occArr: ['B6'] } //TC 20: west 3
    ];

    testCases.forEach(tc => {
        let rook = new Rook('ID', tc.sq1, 'IMAGE'); //only location is needed to test this function, so the other fields are dummies
        let occSet = new Set(tc.occArr);
        it(`should say rook.canMove2(${tc.sq2}) === false`, () => {
            chai.expect(rook.canMove2(tc.sq2, occSet)).to.be.not.ok;
        });
    });
});