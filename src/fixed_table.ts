/*
 * Author: Daisuke Takayama
 */
/// <reference path='_all.ts' />

'use strict';
var e = eval, global: NodeJS.Global = e('this');

module FixedTables {
  export class FixedTable {
    private static _instance: FixedTable = null;

    private view: FixedTableView;
    private model: FixedTableModel;

    constructor(
      option?: any
      ) {
      if (FixedTable._instance) {
        return FixedTable._instance;

      } else {
        this.model = new FixedTables.FixedTableModel(option);
        this.view = new FixedTables.FixedTableView(this.model);

        FixedTable._instance = this;
      }
    }

    /**
     * Function
     **/
    public chengeMode(bool: boolean) {
      this.model.chengeMode(bool);
      this.view.resizeContainer();
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
