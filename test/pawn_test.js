let expect = require('chai').expect;

// =============== Test Suite isAttack =============================================
describe('pawn.isAttack', () => {
    let isAttack = require('../classes/pawn_methods').isAttack;

    //test cases for TRUE result
    let testCases = [
        { team: 'light', oldSq: 'A2', newSq: 'B3' },
        { team: 'light', oldSq: 'H3', newSq: 'G4' },
        { team: 'dark', oldSq: 'C6', newSq: 'B5' },
        { team: 'dark', oldSq: 'D7', newSq: 'E6' }
    ];

    //test spec 1
    testCases.forEach(tc => {
        it(`Should say pawn.isAttack(${tc.team}, ${tc.oldSq}, ${tc.newSq}) === true`, () => {
            expect(isAttack(tc.team, tc.oldSq, tc.newSq)).to.be.ok;
        });
    });

    //test cases for FALSE result
    testCases = [
        { team: 'light', oldSq: 'G7', newSq: 'F7' },
        { team: 'dark', oldSq: 'E2', newSq: 'E2' },
        { team: 'light', oldSq: 'A5', newSq: 'B4' },
        { team: 'dark', oldSq: 'F4', newSq: 'E5' },
        { team: 'light', oldSq: 'C3', newSq: 'C4' },
        { team: 'dark', oldSq: 'B6', newSq: 'B5' }
    ];

    //test spec 2
    testCases.forEach(tc => {
        it(`Should say pawn.isAttack(${tc.team}, ${tc.oldSq}, ${tc.newSq}) === false`, () => {
            expect(isAttack(tc.team, tc.oldSq, tc.newSq)).to.be.not.ok;
        });
    });
});

// =============== Test Suite isPassive1 =============================================
describe('pawn.isPassive1', () => {
    let isPassive1 = require('../classes/pawn_methods').isPassive1;

    //test cases for TRUE result
    let testCases = [
        { team: 'light', oldSq: 'D5', newSq: 'D6' },
        { team: 'dark', oldSq: 'C3', newSq: 'C2' },
    ];

    //test spec 1
    testCases.forEach(tc => {
        it(`Should say pawn.isPassive1(${tc.team}, ${tc.oldSq}, ${tc.newSq}) === true`, () => {
            expect(isPassive1(tc.team, tc.oldSq, tc.newSq)).to.be.ok;
        });
    });

    //test cases for FALSE result
    testCases = [
        { team: 'light', oldSq: 'D5', newSq: 'D7' },
        { team: 'light', oldSq: 'D5', newSq: 'D4' },
        { team: 'light', oldSq: 'D5', newSq: 'E5' },
        { team: 'light', oldSq: 'D5', newSq: 'C5' },
        { team: 'dark', oldSq: 'C3', newSq: 'C1' },
        { team: 'dark', oldSq: 'C3', newSq: 'C4' },
        { team: 'dark', oldSq: 'C3', newSq: 'B3' },
        { team: 'dark', oldSq: 'C3', newSq: 'D3' }
    ];

    //test spec 2
    testCases.forEach(tc => {
        it(`Should say pawn.isPassive1(${tc.team}, ${tc.oldSq}, ${tc.newSq}) === false`, () => {
            expect(isPassive1(tc.team, tc.oldSq, tc.newSq)).to.be.not.ok;
        });
    });
});

// =============== Test Suite isPassive2 =============================================
describe('pawn.isPassive2', () => {
    let isPassive2 = require('../classes/pawn_methods').isPassive2;

    //test cases for TRUE result
    let testCases = [
        { team: 'light', oldSq: 'F2', newSq: 'F4' },
        { team: 'dark', oldSq: 'B7', newSq: 'B5' }
    ];

    //test spec 1
    testCases.forEach(tc => {
        it(`Should say pawn.isPassive2(${tc.team}, ${tc.oldSq}, ${tc.newSq}) === true`, () => {
            expect(isPassive2(tc.team, tc.oldSq, tc.newSq)).to.be.ok;
        });
    });

    //test cases for FALSE result
    testCases = [
        { team: 'light', oldSq: 'F2', newSq: 'F3' },
        { team: 'light', oldSq: 'F2', newSq: 'F1' },
        { team: 'light', oldSq: 'F2', newSq: 'G2' },
        { team: 'light', oldSq: 'F2', newSq: 'E2' },
        { team: 'dark', oldSq: 'B7', newSq: 'B6' },
        { team: 'dark', oldSq: 'B7', newSq: 'B8' },
        { team: 'dark', oldSq: 'B7', newSq: 'A7' },
        { team: 'dark', oldSq: 'B7', newSq: 'C7' }
    ];

    //test spec 2
    testCases.forEach(tc => {
        it(`Should say pawn.isPassive2(${tc.team}, ${tc.oldSq}, ${tc.newSq}) === false`, () => {
            expect(isPassive2(tc.team, tc.oldSq, tc.newSq)).to.be.not.ok;
        });
    });
});





