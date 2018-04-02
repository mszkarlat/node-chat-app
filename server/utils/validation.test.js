let expect = require('chai').expect;
const {isRealString} = require('./validation');

describe('isRealString', () => {

    it('should reject non string values', () => {
        expect(isRealString(3)).to.be.false;
    });

    it('should reject string with only spaces', () => {
        expect(isRealString('      ')).to.be.false;
    });

    it('should allow string with non-space characters', () => {
        expect(isRealString('  Martin  ')).to.be.true;
    });

})