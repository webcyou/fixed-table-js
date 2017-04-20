const assert = require('power-assert');
const Table = require('../../dist/fixed_table.js').FixedTable.Table;

describe('Table', function() {
  var table;

  beforeEach(function(done) {
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
});
