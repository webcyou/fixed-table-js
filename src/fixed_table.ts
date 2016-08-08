/*
 * Author: Daisuke Takayama
 */
/// <reference path='_all.ts' />

'use strict';
var e = eval, global: NodeJS.Global = e('this');

module FixedTables {
  export class FixedTable {
    private view: FixedTableView;
    private model: FixedTableModel;
    private controller: FixedTableController;

    constructor(
      option?: any
      ) {
      this.model = new FixedTables.FixedTableModel(option);
      this.view = new FixedTables.FixedTableView(this.model);
      this.controller = new FixedTables.FixedTableController();

    }

  }
}


if (typeof (module) !== 'undefined') {
  if (typeof (module).exports.FixedTable === 'undefined') {
    (module).exports.FixedTable = {};
  }
  (module).exports.FixedTable = FixedTables.FixedTable;
}

if (typeof (global) !== 'undefined') {
  if (typeof global['FixedTable'] === 'undefined') {
    global['FixedTable'] = {};
  }
  global['FixedTable'] = FixedTables.FixedTable;
}
