const assert = require('power-assert');
const Thead  = require('../../dist/fixed_table.js').FixedTable.Thead;
const Cell = require('../../dist/fixed_table.js').FixedTable.Cell;

describe('Thead', function() {
  var thead,
      cells = [];

  beforeEach(function(done) {
    const THEAD_DATA = {
      lineNum: 0,
      width: 1233,
      outerWidth: 1250,
      outerHeight: 50,
      borderTopWidth: '1px',
      borderRightWidth: '2px',
      borderBottomWidth: '0px',
      borderLeftWidth: '0px',
      boxSizing: 'border-box'
    };

    thead = Thead.fromData(THEAD_DATA);

    for (var i = 0; i < 10; i++) {
      cells.push(Cell.fromData({
        id: i,
        isFixed: true,
        parent: "thead",
        tagName: "TH",
        x: i,
        y: 0,
        outerWidth: 250,
        outerHeight: 55,
        paddingTop: '5px',
        paddingRight: '10px',
        paddingBottom: '20px',
        paddingLeft: '5px',
        borderTopWidth: '1px',
        borderRightWidth: '2px',
        borderBottomWidth: '0px',
        borderLeftWidth: '0px'
      }));
    }

    done();
  });

  describe('static Function fromData', function() {
    it('Properties are generated in FromData', function() {
      assert(thead.cells.length === 0);
      assert(thead.position === 'absolute');
      assert(thead.top === '0');
      assert(thead.left === '0');
      assert(thead.zIndex === '10');
      assert(thead.lineNum === 0);
      assert(thead.width === 1233);
      assert(thead.outerWidth === 1250);
      assert(thead.borderTopWidth === '1px');
      assert(thead.borderRightWidth === '2px');
      assert(thead.borderBottomWidth === '0px');
      assert(thead.borderLeftWidth === '0px');
      assert(thead.boxSizing === 'border-box');
    });
  });

  describe('public Function setLineNumber', function() {
    it('The value is set for lineNum.', function() {
      thead.setLineNumber(5);
      assert.equal(thead.lineNum, 5);
    });
  });

  describe('public Function getWidth', function() {
    it('A value of number type will be returned.', function() {
      assert.equal(thead.getWidth(), 1233);
    });
  });

  describe('public Function getCSSWidth', function() {
    it('The value to be set in the css property will return', function() {
      assert.equal(thead.getCSSWidth(), '1233px');
    });
  });
});
