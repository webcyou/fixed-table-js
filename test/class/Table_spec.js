const assert = require('power-assert');
const Table = require('../../dist/fixed_table.js').FixedTable.Table;
const Cell   = require('../../dist/fixed_table.js').FixedTable.Cell;

describe('Table', function() {
  var table, cells;

  beforeEach(function(done) {
    cells = [];

    const TABLE_DATA = {
      width: 1233,
      outerWidth: 1250,
      paddingTop: '5px',
      paddingRight: '10px',
      paddingBottom: '20px',
      paddingLeft: '5px',
      borderTopWidth: '1px',
      borderRightWidth: '2px',
      borderBottomWidth: '0px',
      borderLeftWidth: '0px'
    };

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

    table = Table.fromData(TABLE_DATA);

    done();
  });

  describe('static Function fromData', function() {
    it('Properties are generated in FromData', function() {
      assert.equal(typeof table.thead, "object");
      assert.equal(typeof table.tbody, "object");
      assert(table.width === 1233);
      assert(table.outerWidth === 1250);
      assert(table.paddingTop === '5px');
      assert(table.paddingRight === '10px');
      assert(table.paddingBottom === '20px');
      assert(table.paddingLeft === '5px');
      assert(table.borderTopWidth === '1px');
      assert(table.borderRightWidth === '2px');
      assert(table.borderBottomWidth === '0px');
      assert(table.borderLeftWidth === '0px');
      assert(table.borderCollapse === 'collapse');
      assert(table.borderSpacing === '0');
    });
  });

  describe('public Function setStyles', function() {
    it('The style of table is properly set', function() {
      table.setStyles({
        "width": 1500,
        "padding-top": "5px",
        "padding-right": "10px",
        "padding-bottom": "20px",
        "padding-left": "5px",
        "border-top-width": "1px",
        "border-right-width": "2px",
        "border-bottom-width": "0",
        "border-left-width": "0"
      });

      assert(table.width === 1500);
      assert(table.outerWidth === 1517);
      assert(table.paddingTop === '5px');
      assert(table.paddingRight === '10px');
      assert(table.paddingBottom === '20px');
      assert(table.paddingLeft === '5px');
      assert(table.borderTopWidth === '1px');
      assert(table.borderRightWidth === '2px');
      assert(table.borderBottomWidth === '0');
      assert(table.borderLeftWidth === '0');
    });
  });

  describe('public Function setTheadFixedModel', function() {
    it('An object of Thead is created and style is properly set', function() {
      table.setTheadFixedModel();

      assert(table.thead.width === 1250);
      assert(table.thead.outerWidth === 0);
      assert(table.thead.position === 'absolute');
      assert(table.thead.top === '0');
      assert(table.thead.left === '0');
      assert(table.thead.zIndex === '10');
    });
  });

  describe('public Function setTbodyFixedModel', function() {
    it('An object of Tbody is created and style is properly set', function() {
      table.setTheadFixedModel();
      table.thead.setCells(cells);
      table.setTbodyFixedModel();

      assert(table.tbody.width === 1250);
      assert(table.tbody.outerWidth === 0);
      assert(table.tbody.paddingLeft === 250);
      assert(table.tbody.display === 'block');
      assert(table.tbody.fixedPositon === 'absolute');
      assert(table.tbody.marginTop === 0);
      assert(table.tbody.fixedLeft === '0');
    });
  });

  describe('public Function getOuterWidth', function() {
    it('Get the value of OuterWidth of table', function() {
      assert(table.getOuterWidth() === 1250);
    });
  });

  describe('public Function setCellStyle', function() {
    it('Width and height are changed by changing cell style', function() {
      table.thead.setCells(cells);
      table.setCellStyle({
        "parent": "thead",
        "x": 0,
        "y": 0,
        "isFixed": true,
        "outerWidth": 300,
        "outerHeight": 70,
        "paddingTop": '3px',
        "paddingRight": '5px',
        "paddingBottom": '3px',
        "paddingLeft": '5px',
        "borderTopWidth": '1px',
        "borderRightWidth": '1px',
        "borderBottomWidth": '1px',
        "borderLeftWidth": '1px'
      });

      assert(table.thead.getCell(0, 0).width === 288);
      assert(table.thead.getCell(0, 0).height === 62);
      assert(table.thead.getCell(0, 0).isFixed === true);
    });
  });
});
