const assert = require('power-assert');
const Cell = require('../../dist/fixed_table.js').FixedTable.Cell;

describe('Cell', function() {
  var cell;

  beforeEach(function(done) {
    const CELL_DATA = {
      isFixed: true,
      parent: "thead",
      tagName: "TH",
      x: 0,
      y: 1,
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
    };

    cell = Cell.fromData(CELL_DATA);

    done();
  });


  describe('static Function fromData', function() {
    it('Properties are generated in FromData', function() {
      assert.equal(typeof cell.id, "number");
      assert(cell.isFixed === true);
      assert(cell.parent === 'thead');
      assert(cell.tagName === 'TH');
      assert(cell.x === 0);
      assert(cell.y === 1);
      assert(cell.width === 233);
      assert(cell.height === 29);
      assert(cell.outerWidth === 250);
      assert(cell.outerHeight === 55);
      assert(cell.paddingTop === '5px');
      assert(cell.paddingRight === '10px');
      assert(cell.paddingBottom === '20px');
      assert(cell.paddingLeft === '5px');
      assert(cell.borderTopWidth === '1px');
      assert(cell.borderRightWidth === '2px');
      assert(cell.borderBottomWidth === '0px');
      assert(cell.borderLeftWidth === '0px');
      assert(cell.boxSizing === '');
      assert(cell.tHeadCell === null);
    });
  });

  describe('public Function calculationWidth', function() {
    it('Get different width size by boxSizing', function() {
      assert.equal(cell.calculationWidth(220), 203);
      assert.equal(cell.calculationWidth(16), -1);
    });
  });

  describe('public Function calculationHeight', function() {
    it('Get different height size by boxSizing', function() {
      assert.equal(cell.calculationHeight(194), 168);
      assert.equal(cell.calculationHeight(25), -1);
    });
  });

  describe('public Function getCSSWidth', function() {
    it('The value to be set in the css property will return', function() {
      assert.equal(cell.getCSSWidth(), "233px");
    });
  });

  describe('public Function getHeight', function() {
    it('A value of number type will be returned.', function() {
      assert.equal(cell.getHeight(), 29);
    });
  });

  describe('public Function getCSSHeight', function() {
    it('The value to be set in the css property will returned', function() {
      assert.equal(cell.getCSSHeight(), "29px");
    });
  });

  describe('public Function changeStyles', function() {
    beforeEach(function(done) {
      cell.changeStyles({
        isFixed: true,
        outerWidth: 400,
        outerHeight: 300,
        paddingTop:  10,
        paddingRight: 20,
        paddingBottom: 30,
        paddingLeft: 40,
        borderTopWidth: "10px",
        borderRightWidth: "10px",
        borderBottomWidth: "10px",
        borderLeftWidth: "10px"
      });

      done();
    });

    it('The expected property is set', function() {
      assert.equal(cell.width, 320);
      assert.equal(cell.height, 240);
      assert.equal(cell.borderTopWidth, "10px");
      assert.equal(cell.borderRightWidth, "10px");
      assert.equal(cell.borderBottomWidth, "10px");
      assert.equal(cell.borderLeftWidth, "10px");
    });
  });
});
