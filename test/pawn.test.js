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
    //test cases for TRUE
    let testCases = [
        { team: 'light', oldSquare: 'B7', newSquare: 'B8', occArr: ['B7'] }, //passive1 move successful
        { team: 'light', oldSquare: 'A2', newSquare: 'A4', occArr: ['A1', 'H1'] }, //passive 2 successful
        { team: 'light', oldSquare: 'C5', newSquare: 'D6', occArr: ['D6', 'A1'] }, //attack successful
        { team: 'dark', oldSquare: 'H4', newSquare: 'H3', occArr: ['G3', 'H2', 'H4'] }, //passive1 successful
        { team: 'dark', oldSquare: 'G7', newSquare: 'G5', occArr: ['G7'] }, //passsive2 successful
        { team: 'dark', oldSquare: 'F5', newSquare: 'E4', occArr: ['E4'] }, //attack successful

    ];

    testCases.forEach(tc => {
        let pawn = new Pawn('ID', tc.team, tc.oldSquare, 'IMAGE');
        let occSet = new Set(tc.occArr);
        it(`should say pawn.canMove2(${tc.newSquare}) === true`, () => {
            chai.expect(pawn.canMove2(tc.newSquare, occSet)).to.be.ok;
        });
    });

    //test cases for FALSE
    testCases = [
        { team: 'light', oldSquare: 'C2', newSquare: 'D2', occArr: [] }, //cannot move horizontally
        { team: 'light', oldSquare: 'C2', newSquare: 'D1', occArr: ['D1'] }, //cannot move backward
        { team: 'light', oldSquare: 'C2', newSquare: 'C1', occArr: [] }, //cannot move backward
        { team: 'light', oldSquare: 'C2', newSquare: 'B1', occArr: ['B1'] }, //cannot move backward
        { team: 'light', oldSquare: 'C2', newSquare: 'B2', occArr: [] }, //cannot move horizontally
        { team: 'light', oldSquare: 'C2', newSquare: 'B3', occArr: [] }, //cannot attack an empty square
        { team: 'light', oldSquare: 'C2', newSquare: 'C3', occArr: ['C3'] }, //cannot do passive1 move to occupied square
        { team: 'light', oldSquare: 'C2', newSquare: 'D3', occArr: [] }, //cannot attack an empty square
        { team: 'light', oldSquare: 'C2', newSquare: 'C4', occArr: ['C4'] }, //cannot do passive2 move to occupied square
        { team: 'light', oldSquare: 'D3', newSquare: 'D5', occArr: [] }, //cannot do passive2, not first turn
        { team: 'light', oldSquare: 'C2', newSquare: 'C4', occArr: ['C3'] }, //path obstructed, cannot do passive2
        { team: 'light', oldSquare: 'C2', newSquare: 'C5', occArr: [] }, //too far passive distance = 3
        { team: 'light', oldSquare: 'D3', newSquare: 'B5', occArr: ['B5'] }, //too far attack distance = 2
        { team: 'dark', oldSquare: 'E7', newSquare: 'D7', occArr: [] }, //cannot move horizontally
        { team: 'dark', oldSquare: 'E7', newSquare: 'D8', occArr: ['D8'] }, //cannot move backward
        { team: 'dark', oldSquare: 'E7', newSquare: 'E8', occArr: [] }, //cannot move backward
        { team: 'dark', oldSquare: 'E7', newSquare: 'F8', occArr: ['F8'] }, //cannot move backward
        { team: 'dark', oldSquare: 'E7', newSquare: 'F7', occArr: [] }, //cannot move horizontally
        { team: 'dark', oldSquare: 'E7', newSquare: 'F6', occArr: [] }, //cannot attack an empty square
        { team: 'dark', oldSquare: 'E7', newSquare: 'E6', occArr: ['E6'] }, //cannot do passive1 move to occupied square
        { team: 'dark', oldSquare: 'E7', newSquare: 'D6', occArr: [] }, //cannot attack an empty square
        { team: 'dark', oldSquare: 'E7', newSquare: 'E5', occArr: ['E5'] }, //cannot do passive2 move to occupied square
        { team: 'dark', oldSquare: 'H6', newSquare: 'H4', occArr: [] }, //cannot do passive2, not first turn
        { team: 'dark', oldSquare: 'E7', newSquare: 'E5', occArr: ['E6'] }, //path obstructed, cannot do passive2
        { team: 'dark', oldSquare: 'E7', newSquare: 'E3', occArr: [] }, //too far passive distance = 3
        { team: 'dark', oldSquare: 'E7', newSquare: 'G5', occArr: ['G5'] }, //too far attack distance = 2
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn('ID', tc.team, tc.oldSquare, 'IMAGE');
        let occSet = new Set(tc.occArr);
        it(`should say pawn.canMove2(${tc.newSquare}) === false`, () => {
            chai.expect(pawn.canMove2(tc.newSquare, occSet)).to.be.not.ok;
        });
    });
});