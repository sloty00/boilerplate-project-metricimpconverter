'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      // Gestión de errores: el test runner de FCC espera texto plano 
      // para los casos de error, no JSON.
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.send('invalid number and unit');
      }
      if (initNum === 'invalid number') {
        return res.send('invalid number');
      }
      if (initUnit === 'invalid unit') {
        return res.send('invalid unit');
      }

      // Procesamiento de conversión
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      // Respuesta JSON estricta
      res.json({
        initNum: Number(initNum),
        initUnit: initUnit,
        returnNum: Number(returnNum),
        returnUnit: returnUnit,
        string: toString
      });
    });
    
};
