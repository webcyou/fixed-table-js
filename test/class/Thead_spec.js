const assert = require('power-assert');
const Table  = require('../../dist/fixed_table.js').FixedTable.Table;
const Thead  = require('../../dist/fixed_table.js').FixedTable.Thead;
const Cell   = require('../../dist/fixed_table.js').FixedTable.Cell;

describe('Thead', function() {
  var table,
      thead,
      cells;

  beforeEach(function(done) {
    cells = [];

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

    const TABLE_DATA = {
      outerWidth: 1300,
      borderLeftWidth: '4px'
    };

    thead = Thead.fromData(THEAD_DATA);
    table = Table.fromData(TABLE_DATA);

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
    it('The value is set for lineNum', function() {
      thead.setLineNumber(5);
      assert.equal(thead.lineNum, 5);
    });
  });

  describe('public Function setCells', function() {
    it('Set the cell array', function() {
      thead.setCells(cells);
      assert(thead.cells.length === 10);
    });
  });

  describe('public Function getCells', function() {
    it('Acquire the array of the corresponding cell', function() {
      thead.setCells(cells);
      assert(thead.getCells(1, 0).length === 1);
    });
  });

  describe('public Function getCell', function() {
    it('Acquire the corresponding cell', function() {
      thead.setCells(cells);
      assert(thead.getCell(1, 0).id === 1);
    });
  });

  describe('public Function setStyles', function() {
    it('Set table and set the width of thead', function() {
      thead.setCells(cells);
      thead.setStyles(table);

      assert(thead.width === 1298);
      assert(thead.outerWidth === 1250);
    });
  });

  describe('public Function setSelfStyles', function() {
    it('The width is set to thead', function() {
      thead.setCells(cells);
      thead.setSelfStyles(thead);

      assert(thead.width === 983);
      assert(thead.outerWidth === 1250);
      assert(thead.outerHeight === 50);
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
