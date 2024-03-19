import { Pawn } from '../classes/pawn.js';

// =============== Test Suite isPassive1 =======================================================================================================================================
describe('pawn.isPassive1() function', () => {
    //test cases for isPassive1 TRUE
    let testCases = [
        { pieceID: 'LP_', oldSquare: 'D5', newSquare: 'D6' }, //TC 1: Forward 1
        { pieceID: 'DP_', oldSquare: 'C3', newSquare: 'C2' } //TC 2: Forward 1
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn(tc.pieceID, tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say pawn.isPassive1(${tc.newSquare}) === true`, () => {
            chai.expect(pawn.isPassive1(tc.newSquare)).to.be.ok;
        });
    });

    //test cases for isPassive1 FALSE
    testCases = [
        { pieceID: 'LP_', oldSquare: 'D5', newSquare: 'D7' }, //TC 3: Forward 2
        { pieceID: 'LP_', oldSquare: 'D5', newSquare: 'D4' }, //TC 4: Backward
        { pieceID: 'LP_', oldSquare: 'D5', newSquare: 'E5' }, //TC 5: Right
        { pieceID: 'LP_', oldSquare: 'D5', newSquare: 'C5' }, //TC 6: Left
        { pieceID: 'DP_', oldSquare: 'C3', newSquare: 'C1' }, //TC 7: Forward 2
        { pieceID: 'DP_', oldSquare: 'C3', newSquare: 'C4' }, //TC 8: Backward
        { pieceID: 'DP_', oldSquare: 'C3', newSquare: 'B3' }, //TC 9: Left
        { pieceID: 'DP_', oldSquare: 'C3', newSquare: 'D3' } //TC 10: Right
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn(tc.pieceID, tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say pawn.isPassive1(${tc.newSquare}) === false`, () => {
            chai.expect(pawn.isPassive1(tc.newSquare)).to.be.not.ok;
        });
    });
});

// =============== Test Suite isPassive2 =======================================================================================================================================
describe('pawn.isPassive2() function', () => {
    //test cases for isPassive2 TRUE
    let testCases = [
        { pieceID: 'LP_', oldSquare: 'F2', newSquare: 'F4' }, //TC 1: Forward 2
        { pieceID: 'DP_', oldSquare: 'B7', newSquare: 'B5' } //TC 2: Forward 2
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn(tc.pieceID, tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say pawn.isPassive2(${tc.newSquare}) === true`, () => {
            chai.expect(pawn.isPassive2(tc.newSquare)).to.be.ok;
        });
    });

    //test cases for isPassive2 FALSE
    testCases = [
        { pieceID: 'LP_', oldSquare: 'F2', newSquare: 'F3' }, //TC 3: Forward 1
        { pieceID: 'LP_', oldSquare: 'F2', newSquare: 'F1' }, //TC 4: Backward
        { pieceID: 'LP_', oldSquare: 'F2', newSquare: 'G2' }, //TC 5: Right
        { pieceID: 'LP_', oldSquare: 'F2', newSquare: 'E2' }, //TC 6: Left
        { pieceID: 'DP_', oldSquare: 'B7', newSquare: 'B6' }, //TC 7: Forward 1
        { pieceID: 'DP_', oldSquare: 'B7', newSquare: 'B8' }, //TC 8: Backwards
        { pieceID: 'DP_', oldSquare: 'B7', newSquare: 'A7' }, //TC 9: Right
        { pieceID: 'DP_', oldSquare: 'B7', newSquare: 'C7' } //TC 10: Left
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn(tc.pieceID, tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say pawn.isPassive2(${tc.newSquare}) === true`, () => {
            chai.expect(pawn.isPassive2(tc.newSquare)).to.be.not.ok;
        });
    });
});

// =============== Test Suite isAttack =======================================================================================================================================
describe('pawn.isAttack() function', () => {
    //test cases for isAttack TRUE
    let testCases = [
        { pieceID: 'LP_', oldSquare: 'A2', newSquare: 'B3' }, //TC 1: happy path right
        { pieceID: 'LP_', oldSquare: 'H3', newSquare: 'G4' }, //TC 2: happy path left
        { pieceID: 'DP_', oldSquare: 'C6', newSquare: 'B5' }, //TC 3: happy path right
        { pieceID: 'DP_', oldSquare: 'D7', newSquare: 'E6' } //TC 4: happy path left
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn(tc.pieceID, tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say pawn.isAttack(${tc.newSquare}) === true`, () => {
            chai.expect(pawn.isAttack(tc.newSquare)).to.be.ok;
        });
    });

    //test cases for isAttack FALSE
    testCases = [
        { pieceID: 'LP_', oldSquare: 'G7', newSquare: 'F7' }, //TC 5: sideways
        { pieceID: 'DP_', oldSquare: 'E2', newSquare: 'E2' }, //TC 6: sideways
        { pieceID: 'LP_', oldSquare: 'A5', newSquare: 'B4' }, //TC 7: backwards
        { pieceID: 'DP_', oldSquare: 'F4', newSquare: 'E5' }, //TC 8: backwards
        { pieceID: 'LP_', oldSquare: 'C3', newSquare: 'C4' }, //TC 9: straight forward
        { pieceID: 'DP_', oldSquare: 'B6', newSquare: 'B5' }, //TC 10: straight forward
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn(tc.pieceID, tc.oldSquare, 'IMAGE'); //only the team and location are needed to test this function, so the other fields are left blank
        it(`should say pawn.isAttack(${tc.newSquare}) === false`, () => {
            chai.expect(pawn.isAttack(tc.newSquare)).to.be.not.ok;
        });
    });
});

// =============== Test Suite canMove2 =======================================================================================================================================
describe('pawn.canMove2() function', () => {
    //test cases for TRUE
    let testCases = [
        { pieceID: 'LP_', oldSquare: 'B7', newSquare: 'B8', occArr: ['B7'] }, //passive1 move successful
        { pieceID: 'LP_', oldSquare: 'A2', newSquare: 'A4', occArr: ['A1', 'H1'] }, //passive 2 successful
        { pieceID: 'LP_', oldSquare: 'C5', newSquare: 'D6', occArr: ['D6', 'A1'] }, //attack successful
        { pieceID: 'DP_', oldSquare: 'H4', newSquare: 'H3', occArr: ['G3', 'H2', 'H4'] }, //passive1 successful
        { pieceID: 'DP_', oldSquare: 'G7', newSquare: 'G5', occArr: ['G7'] }, //passsive2 successful
        { pieceID: 'DP_', oldSquare: 'F5', newSquare: 'E4', occArr: ['E4'] }, //attack successful

    ];

    testCases.forEach(tc => {
        let pawn = new Pawn(tc.pieceID, tc.oldSquare, 'IMAGE');
        let occSet = new Set(tc.occArr);
        it(`should say pawn.canMove2(${tc.newSquare}) === true`, () => {
            chai.expect(pawn.canMove2(tc.newSquare, occSet)).to.be.ok;
        });
    });

    //test cases for FALSE
    testCases = [
        { pieceID: 'LP_', oldSquare: 'C2', newSquare: 'D2', occArr: [] }, //cannot move horizontally
        { pieceID: 'LP_', oldSquare: 'C2', newSquare: 'D1', occArr: ['D1'] }, //cannot move backward
        { pieceID: 'LP_', oldSquare: 'C2', newSquare: 'C1', occArr: [] }, //cannot move backward
        { pieceID: 'LP_', oldSquare: 'C2', newSquare: 'B1', occArr: ['B1'] }, //cannot move backward
        { pieceID: 'LP_', oldSquare: 'C2', newSquare: 'B2', occArr: [] }, //cannot move horizontally
        { pieceID: 'LP_', oldSquare: 'C2', newSquare: 'B3', occArr: [] }, //cannot attack an empty square
        { pieceID: 'LP_', oldSquare: 'C2', newSquare: 'C3', occArr: ['C3'] }, //cannot do passive1 move to occupied square
        { pieceID: 'LP_', oldSquare: 'C2', newSquare: 'D3', occArr: [] }, //cannot attack an empty square
        { pieceID: 'LP_', oldSquare: 'C2', newSquare: 'C4', occArr: ['C4'] }, //cannot do passive2 move to occupied square
        { pieceID: 'LP_', oldSquare: 'D3', newSquare: 'D5', occArr: [] }, //cannot do passive2, not first turn
        { pieceID: 'LP_', oldSquare: 'C2', newSquare: 'C4', occArr: ['C3'] }, //path obstructed, cannot do passive2
        { pieceID: 'LP_', oldSquare: 'C2', newSquare: 'C5', occArr: [] }, //too far passive distance = 3
        { pieceID: 'LP_', oldSquare: 'D3', newSquare: 'B5', occArr: ['B5'] }, //too far attack distance = 2
        { pieceID: 'DP_', oldSquare: 'E7', newSquare: 'D7', occArr: [] }, //cannot move horizontally
        { pieceID: 'DP_', oldSquare: 'E7', newSquare: 'D8', occArr: ['D8'] }, //cannot move backward
        { pieceID: 'DP_', oldSquare: 'E7', newSquare: 'E8', occArr: [] }, //cannot move backward
        { pieceID: 'DP_', oldSquare: 'E7', newSquare: 'F8', occArr: ['F8'] }, //cannot move backward
        { pieceID: 'DP_', oldSquare: 'E7', newSquare: 'F7', occArr: [] }, //cannot move horizontally
        { pieceID: 'DP_', oldSquare: 'E7', newSquare: 'F6', occArr: [] }, //cannot attack an empty square
        { pieceID: 'DP_', oldSquare: 'E7', newSquare: 'E6', occArr: ['E6'] }, //cannot do passive1 move to occupied square
        { pieceID: 'DP_', oldSquare: 'E7', newSquare: 'D6', occArr: [] }, //cannot attack an empty square
        { pieceID: 'DP_', oldSquare: 'E7', newSquare: 'E5', occArr: ['E5'] }, //cannot do passive2 move to occupied square
        { pieceID: 'DP_', oldSquare: 'H6', newSquare: 'H4', occArr: [] }, //cannot do passive2, not first turn
        { pieceID: 'DP_', oldSquare: 'E7', newSquare: 'E5', occArr: ['E6'] }, //path obstructed, cannot do passive2
        { pieceID: 'DP_', oldSquare: 'E7', newSquare: 'E3', occArr: [] }, //too far passive distance = 3
        { pieceID: 'DP_', oldSquare: 'E7', newSquare: 'G5', occArr: ['G5'] }, //too far attack distance = 2
    ];

    testCases.forEach(tc => {
        let pawn = new Pawn(tc.pieceID, tc.oldSquare, 'IMAGE');
        let occSet = new Set(tc.occArr);
        it(`should say pawn.canMove2(${tc.newSquare}) === false`, () => {
            chai.expect(pawn.canMove2(tc.newSquare, occSet)).to.be.not.ok;
        });
    });
});