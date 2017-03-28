/*
 * Author: Daisuke Takayama
 */
/// <reference path='_all.ts' />

'use strict';
var e = eval, global: NodeJS.Global = e('this');

namespace FixedTables {
  export class FixedTable {
    private static _instance: FixedTable = null;

    private view: FixedTableView;
    private model: FixedTableModel;

    constructor(
      option?: any
      ) {
      if (FixedTable._instance) {
        if (option !== void 0) {
          FixedTable._instance.model = new FixedTables.FixedTableModel(option);
          FixedTable._instance.view = new FixedTables.FixedTableView(FixedTable._instance.model, option);
        }

        return FixedTable._instance;
      } else {
        this.model = new FixedTables.FixedTableModel(option);
        this.view = new FixedTables.FixedTableView(this.model, option);

        FixedTable._instance = this;
      }
    }

    /**
     * Public Function
     **/
    public changeMode(bool: boolean): void {
      this.model.changeMode(bool);
      this.view.resizeContainer();
    }

    public setCellStyle(data: any): void {
      this.model.setCellStyle(data);
      this.view.setCellStyles();
    }

    public click(fn: Function): void {
      this.view.click((cell: Cell) => {
        fn(cell);
      });
    }

  }
}

if (typeof (module) !== 'undefined') {
  if (typeof (module).exports.FixedTable === 'undefined') {
    (module).exports.FixedTable = {};
  }
  (module).exports.FixedTable = FixedTables;
}

if (typeof (global) !== 'undefined') {
  if (typeof global['FixedTable'] === 'undefined') {
    global['FixedTable'] = {};
  }
  global['FixedTable'] = FixedTables.FixedTable;
}
