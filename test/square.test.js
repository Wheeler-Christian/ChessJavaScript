import * as SQUARE_METHODS from '../classes/square_methods.js';

// ===== test suite isValidSquare() ===============
describe('isValidSquare()', function () {
    it('should say isValidSquare(A1) === true', function () {
        chai.expect(SQUARE_METHODS.IsValidSquare('A8')).to.be.ok;
    });
});

// ===== test suite DeltaX() ===============
describe('DeltaX()', function () {
    it('should say DeltaX(A1, A2) === 1', function () {
        chai.expect(SQUARE_METHODS.DeltaX('A1', 'B1')).to.equal(1);
    });
});

// ===== test suite DeltaY() ===============
describe('DeltaY()', function () {
    it('should say DeltaY(A1, A2) === 1', function () {
        chai.expect(SQUARE_METHODS.DeltaY('A1', 'A2')).to.equal(1);
    });
});

// ===== test suite DeltaY2() ===============
describe('DeltaY2()', function () {
    it('should say DeltaY2(dark, A1, A2) === -1', function () {
        chai.expect(SQUARE_METHODS.DeltaY2('dark', 'A1', 'A2')).to.equal(-1);
    });
});

// ===== test suite DeltaDiag() ===============
describe('DeltaDiag()', function () {
    it('should say DeltaDiag(A1, B2) === 1', function () {
        chai.expect(SQUARE_METHODS.DeltaDiag('A1', 'B2')).to.equal(1);
    });
});