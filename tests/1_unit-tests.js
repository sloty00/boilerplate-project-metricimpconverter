const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('Read whole number', () => { assert.equal(convertHandler.getNum('32L'), 32); });
  test('Read decimal number', () => { assert.equal(convertHandler.getNum('3.2L'), 3.2); });
  test('Read fractional input', () => { assert.equal(convertHandler.getNum('1/2L'), 0.5); });
  test('Read fractional input with decimal', () => { assert.equal(convertHandler.getNum('5.5/2L'), 2.75); });
  test('Error on double-fraction', () => { assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number'); });
  test('Default to 1 when no numerical input', () => { assert.equal(convertHandler.getNum('L'), 1); });
  test('Read each valid unit', () => { 
    const units = ['gal','l','mi','km','lbs','kg'];
    units.forEach(u => assert.equal(convertHandler.getUnit(u), u === 'l' ? 'L' : u)); 
  });
  test('Error for invalid input unit', () => { assert.equal(convertHandler.getUnit('32g'), 'invalid unit'); });
  test('Return correct return unit', () => { 
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
  });
  test('Return spelled-out unit', () => { assert.equal(convertHandler.spellOutUnit('km'), 'kilometers'); });
  test('Convert gal to L', () => { assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1); });
  test('Convert L to gal', () => { assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1); });
  test('Convert mi to km', () => { assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1); });
  test('Convert km to mi', () => { assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1); });
  test('Convert lbs to kg', () => { assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1); });
  test('Convert kg to lbs', () => { assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1); });
});
