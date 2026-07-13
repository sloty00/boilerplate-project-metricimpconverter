'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      // Gestión de errores: Los tests de FCC fallan si envías un JSON 
      // cuando ellos esperan una respuesta de texto plano.
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

      // Respuesta JSON estricta: 
      // Nos aseguramos de enviar números puros (no strings) para que los
      // assert.equal de los tests no fallen por tipo de dato.
      res.json({
        initNum: Number(initNum),
        initUnit: initUnit,
        returnNum: Number(returnNum),
        returnUnit: returnUnit,
        string: toString
      });
    });
    
};
