'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    // Lógica de validación cruzada
    let isNumInvalid = initNum === 'invalid number';
    let isUnitInvalid = initUnit === 'invalid unit';

    if (isNumInvalid && isUnitInvalid) return res.send('invalid number and unit');
    if (isNumInvalid) return res.send('invalid number');
    if (isUnitInvalid) return res.send('invalid unit');

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: toString
    });
  });
};
