let expect = require('chai').expect;

//----- Test Suite IsValidSquare -------------------------------------------------------------------------
describe('square.IsValidSquare', () => {
    let IsValidSquare = require('../classes/square_methods').IsValidSquare;

    //the first time, the squares are all valid
    let testCases = [
        'A8', 'H8', 'H1', 'A1', //corner
        'D8', 'H4', 'C1', 'A6', //edge case
        'B5', 'E2', 'F7', 'G3' //happy path       
    ];
    //spec 1 valid squares
    testCases.forEach(square => {
        it(`Should say IsValidSquare(${square}) === true`, () => {
            expect(IsValidSquare(square)).to.be.ok;
        });
    });

    //the second time, the squares are all INVALID
    testCases = [
        'I1', 'Z1', 'A0', 'A9', 'Z9', 'I9', 'I0', 'Z0', //edge case invalid
        'M5', 'C10', 'D11', 'K14',
        '3C', '73', 'AA', '5', 'H3LLO'
    ];
    //spec 2 INVALID squares
    testCases.forEach(square => {
        it(`Should say IsValidSquare(${square}) === false`, () => {
            expect(IsValidSquare(square)).to.not.be.ok;
        });
    });
});

//----- Test Suite DeltaX -------------------------------------------------------------------------
describe('square.DeltaX', () => {
    let DeltaX = require('../classes/square_methods').DeltaX;

    let testCases = [
        { square1: 'C4', square2: 'C4', result: 0 },
        { square1: 'D7', square2: 'E7', result: 1 },
        { square1: 'E2', square2: 'G2', result: 2 },
        { square1: 'B6', square2: 'E6', result: 3 },
        { square1: 'C1', square2: 'G1', result: 4 },
        { square1: 'A5', square2: 'F5', result: 5 },
        { square1: 'B3', square2: 'H3', result: 6 },
        { square1: 'A8', square2: 'H8', result: 7 },
        { square1: 'H2', square2: 'G2', result: 1 },
        { square1: 'C4', square2: 'A4', result: 2 },
        { square1: 'G6', square2: 'D6', result: 3 },
        { square1: 'E8', square2: 'A8', result: 4 },
        { square1: 'F1', square2: 'A1', result: 5 },
        { square1: 'G3', square2: 'A3', result: 6 },
        { square1: 'H5', square2: 'A5', result: 7 }
    ];

    testCases.forEach(testCase => {
        it(`Should say DeltaX(${testCase.square1}, ${testCase.square2}) === ${testCase.result}`, () => {
            expect(DeltaX(testCase.square1, testCase.square2)).to.be.equal(testCase.result);
        });
    });
});

//----- Test Suite DeltaY -------------------------------------------------------------------------
describe('square.DeltaY', () => {
    let DeltaY = require('../classes/square_methods').DeltaY;

    let testCases = [
        { square1: 'A4', square2: 'A4', result: 0 },
        { square1: 'B7', square2: 'B8', result: 1 },
        { square1: 'D3', square2: 'D5', result: 2 },
        { square1: 'F5', square2: 'F8', result: 3 },
        { square1: 'H1', square2: 'H5', result: 4 },
        { square1: 'C3', square2: 'C8', result: 5 },
        { square1: 'E2', square2: 'E8', result: 6 },
        { square1: 'G1', square2: 'G8', result: 7 },
        { square1: 'A2', square2: 'A1', result: 1 },
        { square1: 'B4', square2: 'B2', result: 2 },
        { square1: 'C6', square2: 'C3', result: 3 },
        { square1: 'D8', square2: 'D4', result: 4 },
        { square1: 'E7', square2: 'E2', result: 5 },
        { square1: 'F7', square2: 'F1', result: 6 },
        { square1: 'G8', square2: 'G1', result: 7 }
    ];

    testCases.forEach(testCase => {
        it(`Should say DeltaY(${testCase.square1}, ${testCase.square2}) === ${testCase.result}`, () => {
            expect(DeltaY(testCase.square1, testCase.square2)).to.be.equal(testCase.result);
        });
    });
});

//----- Test Suite DeltaY2 -------------------------------------------------------------------------
describe('square.DeltaY2', () => {
    let DeltaY2 = require('../classes/square_methods').DeltaY2;

    //test cases for the light team
    let testCases = [
        { square1: 'A4', square2: 'A4', result: 0 },
        { square1: 'B7', square2: 'B8', result: 1 },
        { square1: 'D3', square2: 'D5', result: 2 },
        { square1: 'F5', square2: 'F8', result: 3 },
        { square1: 'H1', square2: 'H5', result: 4 },
        { square1: 'C3', square2: 'C8', result: 5 },
        { square1: 'E2', square2: 'E8', result: 6 },
        { square1: 'G1', square2: 'G8', result: 7 },
        { square1: 'A2', square2: 'A1', result: -1 },
        { square1: 'B4', square2: 'B2', result: -2 },
        { square1: 'C6', square2: 'C3', result: -3 },
        { square1: 'D8', square2: 'D4', result: -4 },
        { square1: 'E7', square2: 'E2', result: -5 },
        { square1: 'F7', square2: 'F1', result: -6 },
        { square1: 'G8', square2: 'G1', result: -7 }
    ];

    //test spec 1: light team
    testCases.forEach(testCase => {
        it(`Should say DeltaY2(light, ${testCase.square1}, ${testCase.square2}) === ${testCase.result}`, () => {
            expect(DeltaY2('light', testCase.square1, testCase.square2)).to.be.equal(testCase.result);
        });
    });

    //test cases for the dark team
    testCases = [
        { square1: 'A2', square2: 'B2', result: 0 },
        { square1: 'B2', square2: 'C1', result: 1 },
        { square1: 'C6', square2: 'D4', result: 2 },
        { square1: 'D8', square2: 'F5', result: 3 },
        { square1: 'E7', square2: 'H3', result: 4 },
        { square1: 'F6', square2: 'C1', result: 5 },
        { square1: 'G8', square2: 'E2', result: 6 },
        { square1: 'H8', square2: 'A1', result: 7 },
        { square1: 'A7', square2: 'H8', result: -1 },
        { square1: 'B5', square2: 'H7', result: -2 },
        { square1: 'C1', square2: 'H4', result: -3 },
        { square1: 'D4', square2: 'H8', result: -4 },
        { square1: 'E2', square2: 'A7', result: -5 },
        { square1: 'F2', square2: 'A8', result: -6 },
        { square1: 'G1', square2: 'A8', result: -7 }
    ];

    //test spec 2: dark team
    testCases.forEach(testCase => {
        it(`Should say DeltaY2(dark, ${testCase.square1}, ${testCase.square2}) === ${testCase.result}`, () => {
            expect(DeltaY2('dark', testCase.square1, testCase.square2)).to.be.equal(testCase.result);
        });
    });
});

//----- Test Suite DeltaDiag -------------------------------------------------------------------------
describe('square.DeltaDiag', () => {
    let DeltaDiag = require('../classes/square_methods').DeltaDiag;

    //the first time, the array stores test cases in which the moves are all diagonal
    let testCases = [
        { square1: 'A4', square2: 'A4', result: 0 },
        { square1: 'B7', square2: 'C8', result: 1 },
        { square1: 'D3', square2: 'F5', result: 2 },
        { square1: 'C5', square2: 'F8', result: 3 },
        { square1: 'D1', square2: 'H5', result: 4 },
        { square1: 'C3', square2: 'H8', result: 5 },
        { square1: 'A2', square2: 'G8', result: 6 },
        { square1: 'A1', square2: 'H8', result: 7 },
        { square1: 'A2', square2: 'B1', result: 1 },
        { square1: 'B4', square2: 'D2', result: 2 },
        { square1: 'E7', square2: 'H4', result: 3 },
        { square1: 'C5', square2: 'G1', result: 4 },
        { square1: 'C8', square2: 'H3', result: 5 },
        { square1: 'A7', square2: 'G1', result: 6 },
        { square1: 'A8', square2: 'H1', result: 7 }
    ];
    //spec 1 diagonals
    testCases.forEach(testCase => {
        it(`Should say DeltaDiag(${testCase.square1}, ${testCase.square2}) === ${testCase.result}`, () => {
            expect(DeltaDiag(testCase.square1, testCase.square2)).to.be.equal(testCase.result);
        });
    });

    //the second time, the array stores test cases in which the moves are all diagonal
    testCases = [
        { square1: 'D7', square2: 'C7' },
        { square1: 'F3', square2: 'H3' },
        { square1: 'G7', square2: 'G4' },
        { square1: 'A2', square2: 'A6' },
        { square1: 'D6', square2: 'C8' },
        { square1: 'E5', square2: 'B3' },
        { square1: 'B6', square2: 'F7' },
        { square1: 'D8', square2: 'G1' }
    ];
    //spec 2 NOT diagonals
    testCases.forEach(testCase => {
        it(`Should say DeltaDiag(${testCase.square1}, ${testCase.square2}) === -1`, () => {
            expect(DeltaDiag(testCase.square1, testCase.square2)).to.be.equal(-1);
        });
    });
});

