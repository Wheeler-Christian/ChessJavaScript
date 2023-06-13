import { Pawn } from '../classes/pawn.js';

// =============== Test Suite isPassive1 =======================================================================================================================================
describe('pawn.isPassive1() function', () => {
    //test cases for isPassive1 TRUE
    let testCases = [
        { team: 'light', oldSquare: 'D5', newSquare: 'D6' }, //TC 1: Forward 1
        { team: 'dark', oldSquare: 'C3', newSquare: 'C2' } //TC 2: Forward 1
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn('ID', tc.team, tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say pawn.isPassive1(${tc.newSquare}) === true`, () => {
            chai.expect(pawn.isPassive1(tc.newSquare)).to.be.ok;
        });
    });

    //test cases for isPassive1 FALSE
    testCases = [
        { team: 'light', oldSquare: 'D5', newSquare: 'D7' }, //TC 3: Forward 2
        { team: 'light', oldSquare: 'D5', newSquare: 'D4' }, //TC 4: Backward
        { team: 'light', oldSquare: 'D5', newSquare: 'E5' }, //TC 5: Right
        { team: 'light', oldSquare: 'D5', newSquare: 'C5' }, //TC 6: Left
        { team: 'dark', oldSquare: 'C3', newSquare: 'C1' }, //TC 7: Forward 2
        { team: 'dark', oldSquare: 'C3', newSquare: 'C4' }, //TC 8: Backward
        { team: 'dark', oldSquare: 'C3', newSquare: 'B3' }, //TC 9: Left
        { team: 'dark', oldSquare: 'C3', newSquare: 'D3' } //TC 10: Right
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn('ID', tc.team, tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say pawn.isPassive1(${tc.newSquare}) === false`, () => {
            chai.expect(pawn.isPassive1(tc.newSquare)).to.be.not.ok;
        });
    });
});

// =============== Test Suite isPassive2 =======================================================================================================================================
describe('pawn.isPassive2() function', () => {
    //test cases for isPassive2 TRUE
    let testCases = [
        { team: 'light', oldSquare: 'F2', newSquare: 'F4' }, //TC 1: Forward 2
        { team: 'dark', oldSquare: 'B7', newSquare: 'B5' } //TC 2: Forward 2
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn('ID', tc.team, tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say pawn.isPassive2(${tc.newSquare}) === true`, () => {
            chai.expect(pawn.isPassive2(tc.newSquare)).to.be.ok;
        });
    });

    //test cases for isPassive2 FALSE
    testCases = [
        { team: 'light', oldSquare: 'F2', newSquare: 'F3' }, //TC 3: Forward 1
        { team: 'light', oldSquare: 'F2', newSquare: 'F1' }, //TC 4: Backward
        { team: 'light', oldSquare: 'F2', newSquare: 'G2' }, //TC 5: Right
        { team: 'light', oldSquare: 'F2', newSquare: 'E2' }, //TC 6: Left
        { team: 'dark', oldSquare: 'B7', newSquare: 'B6' }, //TC 7: Forward 1
        { team: 'dark', oldSquare: 'B7', newSquare: 'B8' }, //TC 8: Backwards
        { team: 'dark', oldSquare: 'B7', newSquare: 'A7' }, //TC 9: Right
        { team: 'dark', oldSquare: 'B7', newSquare: 'C7' } //TC 10: Left
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn('ID', tc.team, tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say pawn.isPassive2(${tc.newSquare}) === true`, () => {
            chai.expect(pawn.isPassive2(tc.newSquare)).to.be.not.ok;
        });
    });
});

// =============== Test Suite isAttack =======================================================================================================================================
describe('pawn.isAttack() function', () => {
    //test cases for isAttack TRUE
    let testCases = [
        { team: 'light', oldSquare: 'A2', newSquare: 'B3' }, //TC 1: happy path right
        { team: 'light', oldSquare: 'H3', newSquare: 'G4' }, //TC 2: happy path left
        { team: 'dark', oldSquare: 'C6', newSquare: 'B5' }, //TC 3: happy path right
        { team: 'dark', oldSquare: 'D7', newSquare: 'E6' } //TC 4: happy path left
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn('ID', tc.team, tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say pawn.isAttack(${tc.newSquare}) === true`, () => {
            chai.expect(pawn.isAttack(tc.newSquare)).to.be.ok;
        });
    });

    //test cases for isAttack FALSE
    testCases = [
        { team: 'light', oldSquare: 'G7', newSquare: 'F7' }, //TC 5: sideways
        { team: 'dark', oldSquare: 'E2', newSquare: 'E2' }, //TC 6: sideways
        { team: 'light', oldSquare: 'A5', newSquare: 'B4' }, //TC 7: backwards
        { team: 'dark', oldSquare: 'F4', newSquare: 'E5' }, //TC 8: backwards
        { team: 'light', oldSquare: 'C3', newSquare: 'C4' }, //TC 9: straight forward
        { team: 'dark', oldSquare: 'B6', newSquare: 'B5' }, //TC 10: straight forward
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn('ID', tc.team, tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say pawn.isAttack(${tc.newSquare}) === false`, () => {
            chai.expect(pawn.isAttack(tc.newSquare)).to.be.not.ok;
        });
    });
});

// =============== Test Suite canMove2 =======================================================================================================================================
describe('pawn.canMove2() function', () => {
    let testCases = [
        { team: 'light', oldSquare: 'B7', newSquare: 'B8', result: 201 },
        { team: 'light', oldSquare: 'A2', newSquare: 'A4', result: 202 },
        { team: 'light', oldSquare: 'C5', newSquare: 'D6', result: 203 },
        { team: 'light', oldSquare: 'F3', newSquare: 'F5', result: 402 },
        { team: 'light', oldSquare: 'E3', newSquare: 'E6', result: 404 },
        { team: 'dark', oldSquare: 'H4', newSquare: 'H3', result: 201 },
        { team: 'dark', oldSquare: 'G7', newSquare: 'G5', result: 202 },
        { team: 'dark', oldSquare: 'F5', newSquare: 'E4', result: 203 },
        { team: 'dark', oldSquare: 'A6', newSquare: 'A4', result: 402 },
        { team: 'dark', oldSquare: 'C5', newSquare: 'B3', result: 404 }
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn('ID', tc.team, tc.oldSquare, 'IMAGE');
        it(`should say pawn.canMove2(${tc.newSquare}) === ${tc.result}`, () => {
            chai.expect(pawn.canMove2(tc.newSquare)).to.equal(tc.result);
        });
    });
});