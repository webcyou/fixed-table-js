/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

namespace FixedTables {
  export class FixedTableModel {
    private tableView: TableView;

    constructor(
      option?: any
      ) {
      if(option !== void 0) {
        this.tableView = TableView.fromData(option);
      } else {
        this.tableView = TableView.fromData({});
      }
    }

    /**
     * Getter Model
    **/
    public getTableViewModel(): TableView {
      return this.tableView;
    }

    public getTableModel(): Table {
      return this.tableView.table;
    }

    public getTheadModel(): Thead {
      return this.tableView.table.thead;
    }

    public getTbodyModel(): Tbody {
      return this.tableView.table.tbody;
    }

    /**
     * Public Function
    **/
    public changeMode(bool: boolean): void {
      this.tableView.changeMode(bool);
    }

    public setCellStyle(data: any): void {
      this.tableView.table.setCellStyle(data);
    }
  }
}
