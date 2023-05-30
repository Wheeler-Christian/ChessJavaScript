/**
 * The methods for the Pawn class
 */

//the methods in this file will be used a lot
let sq = require('./square_methods');


function isAttack(team, src, dest) {
    if (sq.DeltaY2(team, src, dest) === 1) { //if the pawn is moving forward 1
        return sq.DeltaDiag(src, dest) === 1; //if delta diag is 1, then this is attack move
    }
    else return false; //if not moving forward 1, not an attack move
}

function isPassive1(team, src, dest) {
    if (sq.DeltaY2(team, src, dest) === 1) { //if the pawn is moving forward 1
        return sq.DeltaX(src, dest) === 0; //if delta x is 0, then this is passive move
    }
    else return false; //if not moving forward o1ne, not a Passive1 move
}

function isPassive2(team, src, dest) {
    if (sq.DeltaY2(team, src, dest) === 2) { //if the pawn is moving forward 2
        return sq.DeltaX(src, dest) === 0; //if delta x is 0, then this is passive move
    }
    else return false; //if not moving forward 2, not a Passive2 move
}

module.exports.isAttack = isAttack;
module.exports.isPassive1 = isPassive1;
module.exports.isPassive2 = isPassive2;
