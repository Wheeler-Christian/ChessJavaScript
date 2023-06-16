import { Queen } from '../classes/queen.js';

// =============== Test Suite canMove2 =======================================================================================================================================
describe('queen.canMove2()', () => {
    //test cases for TRUE
    let testCases = [
        { sq1: 'G2', sq2: 'G1', occArr: ['G2'] }, //TC 1: south 1
        { sq1: 'D1', sq2: 'B1', occArr: ['D1','D2'] }, //TC 2: west 2
        { sq1: 'A4', sq2: 'A7', occArr: ['B4','B5','B6'] }, //TC 3: north 3
        { sq1: 'B6', sq2: 'F6', occArr: ['B5','C5','D5','E5'] }, //TC 4: east 4
        { sq1: 'B8', sq2: 'B3', occArr: ['C7','C6','C5','C4','C3'] }, //TC 5: south 5
        { sq1: 'H5', sq2: 'B5', occArr: ['C4','D4','E4','C6','D6','E6'] }, //TC 6: west 6
        { sq1: 'E1', sq2: 'E8', occArr: ['D1','F2','D3','F4','D5','F6','D7'] }, //TC 7: north 7
        { sq1: 'H2', sq2: 'G1', occArr: ['H1'] }, //TC 8: southwest 1
        { sq1: 'C5', sq2: 'A7', occArr: ['C5','C6'] }, //TC 9: northwest 2
        { sq1: 'E2', sq2: 'H5', occArr: ['H4','H5','H6'] }, //TC 10: northeast 3
        { sq1: 'B6', sq2: 'F2', occArr: ['B5','C4','D3','E2'] }, //TC 11: southeast 4
        { sq1: 'H6', sq2: 'C1', occArr: ['C2','D3','E4','F5','G6'] }, //TC 12: southwest 5
        { sq1: 'G2', sq2: 'A8', occArr: ['A7','B6','C5','C7','D6','E5'] }, //TC 13: northwest 6
        { sq1: 'A1', sq2: 'H8', occArr: [] } //TC 14: northeast 7
    ];

    testCases.forEach(tc => {
        let queen = new Queen('ID', 'TEAM', tc.sq1, 'IMAGE'); //only location is needed to test this function, so the other fields are dummies
        let occSet = new Set(tc.occArr);
        it(`should say canMove2(${tc.sq2}) === true`, () => {
            chai.expect(queen.canMove2(tc.sq2, occSet)).to.be.ok;
        });
    });

    //test cases for FALSE
    testCases = [
        { sq1: 'B4', sq2: 'B4', occArr: ['A1','C4'] }, //TC 15: distance zero
        { sq1: 'D2', sq2: 'B5', occArr: [] }, //TC 16: north 1 west 2
        { sq1: 'A2', sq2: 'H6', occArr: [] }, //TC 17: north 4 east 7
        { sq1: 'B7', sq2: 'C2', occArr: [] }, //TC 18: south 5 east 1
        { sq1: 'F8', sq2: 'A5', occArr: [] }, //TC 19: south 3 west 6
        { sq1: 'B4', sq2: 'B2', occArr: ['B3'] }, //TC 20: south 2 --- invalid because path obstruction vvvvvvvvvv
        { sq1: 'F3', sq2: 'C3', occArr: ['D3'] }, //TC 21: west 3
        { sq1: 'D2', sq2: 'D6', occArr: ['D5'] }, //TC 22: north 4
        { sq1: 'A5', sq2: 'F5', occArr: ['C5'] }, //TC 23: east 5
        { sq1: 'F6', sq2: 'D8', occArr: ['E7'] }, //TC 24: northwest 2
        { sq1: 'D2', sq2: 'G5', occArr: ['F4'] }, //TC 25: northeast 3
        { sq1: 'D8', sq2: 'H4', occArr: ['G5'] }, //TC 26: southeast 4
        { sq1: 'F7', sq2: 'A2', occArr: ['C4'] } //TC 27: southwest 5
    ];

    testCases.forEach(tc => {
        let queen = new Queen('ID', 'TEAM', tc.sq1, 'IMAGE'); //only location is needed to test this function, so the other fields are dummies
        let occSet = new Set(tc.occArr);
        it(`should say canMove2(${tc.sq2}) === false`, () => {
            chai.expect(queen.canMove2(tc.sq2, occSet)).to.be.not.ok;
        });
    });
});