import * as SQUARE from '../classes/square_methods.js';

// =============== test suite isValidSquare() =======================================================================================================================================
describe('isValidSquare()', function () {
    //test cases for isValidSquare TRUE
    let testCases = [
        { square: 'A8' }, //TC 1: corner
        { square: 'H4' }, //TC 2: right edge case
        { square: 'C1' }, //TC 3: bottom edge case
        { square: 'B5' }, //TC 4: happy path
        { square: 'E2' }, //TC 5: happy path
        { square: 'F7' }, //TC 6: happy path
        { square: 'G3' }, //TC 7: happy path 
    ];

    testCases.forEach(tc => {
        it(`should say square.isValidSquare(${tc.square}) === true`, () => {
            chai.expect(SQUARE.IsValidSquare(tc.square)).to.be.ok;
        });
    });

    //test cases for isValidSquare FALSE
    testCases = [
        { square: 'I1' }, //TC 8: edge case invalid
        { square: 'Z1' }, //TC 9: edge case invalid
        { square: 'A0' }, //TC 10: edge case invalid
        { square: 'A9' }, //TC 11: edge case invalid
        { square: 'M5' }, //TC 12: invalid column
        { square: 'C10' }, //TC 13: invalid row
        { square: 'D11' }, //TC 14: invalid row
        { square: 'K14' }, //TC 15: invalid both
    ];

    testCases.forEach(tc => {
        it(`should say square.isValidSquare(${tc.square}) === false`, () => {
            chai.expect(SQUARE.IsValidSquare(tc.square)).to.be.not.ok;
        });
    });
});

// =============== test suite DeltaX() =======================================================================================================================================
describe('DeltaX()', function () {
    let testCases = [
        { oldSquare: 'C4', newSquare: 'C4', result: 0 }, //TC 1: displacement 0
        { oldSquare: 'D7', newSquare: 'E7', result: 1 }, //TC 2: displacement 1 right
        { oldSquare: 'E2', newSquare: 'G2', result: 2 }, //TC 3: displacement 2 right
        { oldSquare: 'B6', newSquare: 'E6', result: 3 }, //TC 4: displacement 3 right
        { oldSquare: 'C1', newSquare: 'G1', result: 4 }, //TC 5: displacement 4 right
        { oldSquare: 'A5', newSquare: 'F5', result: 5 }, //TC 6: displacement 5 right
        { oldSquare: 'B3', newSquare: 'H3', result: 6 }, //TC 7: displacement 6 right
        { oldSquare: 'A8', newSquare: 'H8', result: 7 }, //TC 8: displacement 7 right
        { oldSquare: 'H2', newSquare: 'G2', result: -1 }, //TC 9: displacement 1 left
        { oldSquare: 'C4', newSquare: 'A4', result: -2 }, //TC 10: displacement 2 left
        { oldSquare: 'G6', newSquare: 'D6', result: -3 }, //TC 11: displacement 3 left
        { oldSquare: 'E8', newSquare: 'A8', result: -4 }, //TC 12: displacement 4 left
        { oldSquare: 'F1', newSquare: 'A1', result: -5 }, //TC 13: displacement 5 left
        { oldSquare: 'G3', newSquare: 'A3', result: -6 }, //TC 14: displacement 6 left
        { oldSquare: 'H5', newSquare: 'A5', result: -7 } //TC 15: displacement 7 left
    ];

    testCases.forEach(tc => {
        it(`should say square.DeltaX(${tc.oldSquare}, ${tc.newSquare}) === ${tc.result}`, () => {
            chai.expect(SQUARE.DeltaX(tc.oldSquare, tc.newSquare)).to.equal(tc.result);
        });
    });
});

// =============== test suite DeltaY() =======================================================================================================================================
describe('DeltaY()', function () {
    let testCases = [
        { oldSquare: 'A4', newSquare: 'A4', result: 0 }, //TC 1: displacement 0
        { oldSquare: 'B7', newSquare: 'B8', result: 1 }, //TC 2: displacement 1 up
        { oldSquare: 'D3', newSquare: 'D5', result: 2 }, //TC 3: displacement 2 up
        { oldSquare: 'F5', newSquare: 'F8', result: 3 }, //TC 4: displacement 3 up
        { oldSquare: 'H1', newSquare: 'H5', result: 4 }, //TC 5: displacement 4 up
        { oldSquare: 'C3', newSquare: 'C8', result: 5 }, //TC 6: displacement 5 up
        { oldSquare: 'E2', newSquare: 'E8', result: 6 }, //TC 7: displacement 6 up
        { oldSquare: 'G1', newSquare: 'G8', result: 7 }, //TC 8: displacement 7 up
        { oldSquare: 'A2', newSquare: 'A1', result: -1 }, //TC 9: displacement 1 down
        { oldSquare: 'B4', newSquare: 'B2', result: -2 }, //TC 10: displacement 2 down
        { oldSquare: 'C6', newSquare: 'C3', result: -3 }, //TC 11: displacement 3 down
        { oldSquare: 'D8', newSquare: 'D4', result: -4 }, //TC 12: displacement 4 down
        { oldSquare: 'E7', newSquare: 'E2', result: -5 }, //TC 13: displacement 5 down
        { oldSquare: 'F7', newSquare: 'F1', result: -6 }, //TC 14: displacement 6 down
        { oldSquare: 'G8', newSquare: 'G1', result: -7 } //TC 15: displacement 7 down

    ];

    testCases.forEach(tc => {
        it(`should say DeltaY(${tc.oldSquare}, ${tc.newSquare}) === ${tc.result}`, () => {
            chai.expect(SQUARE.DeltaY(tc.oldSquare, tc.newSquare)).to.equal(tc.result);
        });
    });
});

// =============== test suite DeltaDiag() =======================================================================================================================================
describe('DeltaDiag()', function () {
    let testCases = [
        { oldSquare: 'A4', newSquare: 'A4', result: 0 }, //TC	1: displacement 0
        { oldSquare: 'B7', newSquare: 'C8', result: 1 }, //TC	2: up right 1
        { oldSquare: 'D3', newSquare: 'F5', result: 2 }, //TC	3: up right 2
        { oldSquare: 'C5', newSquare: 'F8', result: 3 }, //TC	4: up right 3
        { oldSquare: 'D1', newSquare: 'H5', result: 4 }, //TC	5: up right 4
        { oldSquare: 'C3', newSquare: 'H8', result: 5 }, //TC	6: up right 5
        { oldSquare: 'A2', newSquare: 'G8', result: 6 }, //TC	7: up right 6
        { oldSquare: 'A1', newSquare: 'H8', result: 7 }, //TC	8: up right 7
        { oldSquare: 'A2', newSquare: 'B1', result: 1 }, //TC	9: down right 1
        { oldSquare: 'B4', newSquare: 'D2', result: 2 }, //TC	10: down right 2
        { oldSquare: 'E7', newSquare: 'H4', result: 3 }, //TC	11: down right 3
        { oldSquare: 'C5', newSquare: 'G1', result: 4 }, //TC	12: down right 4
        { oldSquare: 'C8', newSquare: 'H3', result: 5 }, //TC	13: down right 5
        { oldSquare: 'A7', newSquare: 'G1', result: 6 }, //TC	14: down right 6
        { oldSquare: 'A8', newSquare: 'H1', result: 7 }, //TC	15: down right 7
        { oldSquare: 'D7', newSquare: 'C7', result: -1 }, //TC	16: left 1
        { oldSquare: 'F3', newSquare: 'H3', result: -1 }, //TC	17: right 2
        { oldSquare: 'G7', newSquare: 'G4', result: -1 }, //TC	18: down 3
        { oldSquare: 'A2', newSquare: 'A6', result: -1 }, //TC	19: up 4
        { oldSquare: 'D6', newSquare: 'C8', result: -1 }, //TC	20: left 1 up 2
        { oldSquare: 'E5', newSquare: 'B3', result: -1 }, //TC	21: left 3 down 2
        { oldSquare: 'B6', newSquare: 'F7', result: -1 }, //TC	22: right 4 up 1
        { oldSquare: 'D8', newSquare: 'G1', result: -1 } //TC	23: right 3 down 7
    ];

    testCases.forEach(tc => {
        it(`should say DeltaDiag(${tc.oldSquare}, ${tc.newSquare}) === ${tc.result}`, () => {
            chai.expect(SQUARE.DeltaDiag(tc.oldSquare, tc.newSquare)).to.equal(tc.result);
        });
    });
});

// =============== test suite isPathCardinal() =======================================================================================================================================
describe('isPathCardinal()', function () {
    let testCases = [
        { sq1: 'D4', sq2: 'D5', result: 2 }, //TC 1: North 1
        { sq1: 'E3', sq2: 'G3', result: 4 }, //TC 2: east 2
        { sq1: 'C5', sq2: 'C2', result: 6 }, //TC 3: south 3
        { sq1: 'F2', sq2: 'B2', result: 8 }, //TC 4: west 4
        { sq1: 'B1', sq2: 'B1', result: 0 }, //TC 5: zero
        { sq1: 'A6', sq2: 'B7', result: -1 }, //TC 6: ne 1
        { sq1: 'F3', sq2: 'H1', result: -1 }, //TC 7: se 2
        { sq1: 'H5', sq2: 'E2', result: -1 }, //TC 8: sw 3
        { sq1: 'E2', sq2: 'A6', result: -1 } //TC 9: nw 4
    ];

    testCases.forEach(tc => {
        it(`should say isPathCardinal(${tc.sq1}, ${tc.sq2}) === ${tc.result}`, () => {
            chai.expect(SQUARE.isPathCardinal(tc.sq1, tc.sq2)).to.equal(tc.result);
        });
    });
});

// =============== test suite isPathOrdinal() =======================================================================================================================================
describe('isPathOrdinal()', function () {
    let testCases = [
        { sq1: 'E6', sq2: 'F7', result: 1 }, //TC 1: Northeast 1
        { sq1: 'C4', sq2: 'E2', result: 3 }, //TC 2: southeast 2
        { sq1: 'G5', sq2: 'D2', result: 5 }, //TC 3: southwest 3
        { sq1: 'F3', sq2: 'B7', result: 7 }, //TC 4: northwest 4
        { sq1: 'C3', sq2: 'H8', result: 1 }, //TC 5: northeast 5
        { sq1: 'B7', sq2: 'H1', result: 3 }, //TC 6: southeast 6
        { sq1: 'H8', sq2: 'A1', result: 5 }, //TC 7: southwest 7
        { sq1: 'E4', sq2: 'D5', result: 7 }, //TC 8: northwest 1
        { sq1: 'D5', sq2: 'D5', result: 0 }, //TC 9: move nowhere
        { sq1: 'B3', sq2: 'B4', result: 0 }, //TC 10: north 1
        { sq1: 'C6', sq2: 'E7', result: -1 }, //TC 11: east 2 north 1
        { sq1: 'F8', sq2: 'H5', result: -1 }, //TC 12: south 3 east 2
        { sq1: 'H2', sq2: 'D1', result: -1 } //TC 13: west 4 south 1

    ];

    testCases.forEach(tc => {
        it(`should say isPathOrdinal(${tc.sq1}, ${tc.sq2}) === ${tc.result}`, () => {
            chai.expect(SQUARE.isPathOrdinal(tc.sq1, tc.sq2)).to.equal(tc.result);
        });
    });
});

// =============== test suite calcPathCardinal() =======================================================================================================================================
describe('calcPathCardinal()', function () {
    let testCases = [
        { sq1: 'D4', sq2: 'D5', dir: 2, result: [] }, //TC	1	North 1
        { sq1: 'E3', sq2: 'G3', dir: 4, result: ['F3'] }, //TC	2	east 2
        { sq1: 'C5', sq2: 'C2', dir: 6, result: ['C4', 'C3'] }, //TC	3	south 3
        { sq1: 'F2', sq2: 'B2', dir: 8, result: ['E2', 'D2', 'C2'] }, //TC	4	west 4
        { sq1: 'B1', sq2: 'B6', dir: 2, result: ['B2', 'B3', 'B4', 'B5'] }, //TC	5	North 5
        { sq1: 'A6', sq2: 'G6', dir: 4, result: ['B6', 'C6', 'D6', 'E6', 'F6'] }, //TC	6	east 6
        { sq1: 'G8', sq2: 'G1', dir: 6, result: ['G7', 'G6', 'G5', 'G4', 'G3', 'G2'] }, //TC	7	south 7
        { sq1: 'H5', sq2: 'G5', dir: 8, result: [] }, //TC	8	west 1
        { sq1: 'A4', sq2: 'A6', dir: 2, result: ['A5'] }, //TC	9	North 2
        { sq1: 'B6', sq2: 'E6', dir: 4, result: ['C6', 'D6'] }, //TC	10	east 3
        { sq1: 'G7', sq2: 'G3', dir: 6, result: ['G6', 'G5', 'G4'] }, //TC	11	south 4
        { sq1: 'F3', sq2: 'A3', dir: 8, result: ['E3', 'D3', 'C3', 'B3'] }, //TC	12	west 5
        { sq1: 'C1', sq2: 'C7', dir: 2, result: ['C2', 'C3', 'C4', 'C5', 'C6'] }, //TC	13	North 6
        { sq1: 'A2', sq2: 'H2', dir: 4, result: ['B2', 'C2', 'D2', 'E2', 'F2', 'G2'] } //TC	14	east 7
    ];

    testCases.forEach(tc => {
        it(`should say calcPathCardinal(${tc.sq1}, ${tc.sq2}) === ${tc.result}`, () => {
            chai.expect(SQUARE.calcPathCardinal(tc.sq1, tc.sq2, tc.dir)).to.eql(tc.result);
        });
    });
});

// =============== test suite calcPathOrdinal() =======================================================================================================================================
describe('calcPathOrdinal()', function () {
    let testCases = [
        { sq1: 'E6', sq2: 'D7', dir: 7, result: [] }, //TC 1	Northwest 1
        { sq1: 'C2', sq2: 'E4', dir: 1, result: ['D3'] }, //TC 2	northeast 2
        { sq1: 'D8', sq2: 'G5', dir: 3, result: ['E7', 'F6'] }, //TC 3	southeast 3
        { sq1: 'F7', sq2: 'B3', dir: 5, result: ['E6', 'D5', 'C4'] }, //TC 4	southwest 4
        { sq1: 'H3', sq2: 'C8', dir: 7, result: ['G4', 'F5', 'E6', 'D7'] }, //TC 5	northwest 5
        { sq1: 'B1', sq2: 'H7', dir: 1, result: ['C2', 'D3', 'E4', 'F5', 'G6'] }, //TC 6	northeast 6
        { sq1: 'A8', sq2: 'H1', dir: 3, result: ['B7', 'C6', 'D5', 'E4', 'F3', 'G2'] }, //TC 7	southeast 7
        { sq1: 'E4', sq2: 'D3', dir: 5, result: [] }, //TC 8	southwest 1
        { sq1: 'D5', sq2: 'B7', dir: 7, result: ['C6'] }, //TC 9	northwest 2
        { sq1: 'B3', sq2: 'E6', dir: 1, result: ['C4', 'D5'] }, //TC 10	northeast 3
        { sq1: 'C6', sq2: 'G2', dir: 3, result: ['D5', 'E4', 'F3'] }, //TC 11	southeast 4
        { sq1: 'F8', sq2: 'A3', dir: 5, result: ['E7', 'D6', 'C5', 'B4'] }, //TC 12	southwest 5
        { sq1: 'H2', sq2: 'B8', dir: 7, result: ['G3', 'F4', 'E5', 'D6', 'C7'] }, //TC 13	northwest 6
        { sq1: 'A1', sq2: 'H8', dir: 1, result: ['B2', 'C3', 'D4', 'E5', 'F6', 'G7'] } //TC	14	northeast 7

    ];

    testCases.forEach(tc => {
        it(`should say calcPathOrdinal(${tc.sq1}, ${tc.sq2}) === ${tc.result}`, () => {
            chai.expect(SQUARE.calcPathOrdinal(tc.sq1, tc.sq2, tc.dir)).to.eql(tc.result);
        });
    });
});