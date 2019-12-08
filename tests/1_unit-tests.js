/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  suite('Function convertHandler.getNum(input)', function() {
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal Input', function(done) {
      var input = '3.758L';
      assert.equal(convertHandler.getNum(input), 3.758);
      done();
    });

    test('Fractional Input', function(done) {
      var input = '1/2L';
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test('Fractional Input w/ Decimal', function(done) {
      var input = '0.565L';
      assert.equal(convertHandler.getNum(input), 0.565);
      done();
    });

    test('Invalid Input (double fraction)', function(done) {
      var input = '1/2/3L';
      assert.equal(convertHandler.getNum(input), 0.16667);
      done();
    });

    test('No Numerical Input', function(done) {
      var input = 'hjhg';
      assert.equal(convertHandler.getNum(input), null);
      done();
    });
  });

  suite('Function convertHandler.getUnit(input)', function() {
    test('For Each Valid Unit Inputs', function(done) {
      var input = [
        'gal',
        'l',
        'mi',
        'km',
        'lbs',
        'kg',
        'gal',
        'l',
        'mi',
        'km',
        'lbs',
        'kg',
      ];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit('123' + ele), ele);
      });
      done();
    });

    test('Unknown Unit Input', function(done) {
      const input = '123Gr';
      assert.equal(convertHandler.getUnit(input), null);
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      var expect = ['l', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite('Function convertHandler.spellOutUnit(unit)', function() {
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'],
        expect = [
          'gallons',
          'liters',
          'milles',
          'kilometers',
          'pounts',
          'kilograms',
        ];

      input.forEach((unit, index) => {
        assert.equal(convertHandler.spellOutUnit(unit), expect[index]);
      });
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function() {
    test('Gal to L', function(done) {
      const input = [5, 'gal'];
      const expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test('L to Gal', function(done) {
      const input = [5, 'l'];
      const expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test('Mi to Km', function(done) {
      const input = [5, 'mi'];
      const expected = 8.0467;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test('Km to Mi', function(done) {
      const input = [5, 'km'];
      const expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test('Lbs to Kg', function(done) {
      const input = [5, 'lbs'];
      const expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test('Kg to Lbs', function(done) {
      const input = [5, 'kg'];
      const expected = 11.02312;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
  });
});
