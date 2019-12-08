/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = (app) => {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function(req, res) {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    let response = {};
    console.log(input);
    
    if (!initNum && !initUnit){
      response.toString = 'invalid number and unit';
    }else if (initNum && !initUnit){
      response.toString = 'invalid unit'
    }else if (!initNum){
      response.toString = 'invalid number'
    }else{
      response = {
          input: input,
          initNum: initNum,
          initUnit: initUnit,
          returnNum: returnNum,
          returnUnit: returnUnit,
          toString: toString,
        }
    }

        res.json(response);
  });
};
