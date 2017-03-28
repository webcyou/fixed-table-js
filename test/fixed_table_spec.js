const assert = require('power-assert');
const FixedTable = require('../dist/fixed_table.js').FixedTable;

describe('FixedTable', function() {
  var fixedTable = new global.FixedTable();

  it('Create Instance', function() {
    assert(fixedTable instanceof Object);
  });

  it('Singleton Object', function() {
    assert(fixedTable === new global.FixedTable());
  });

  // describe('Public Function', function() {
  //
  // });
});
