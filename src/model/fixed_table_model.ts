/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {
  export class FixedTableModel {
    private window: Window;
    private tableView: TableView;

    constructor(
      option?: any
      ) {
      this.tableView = TableView.fromData(option);

      console.log(option);

    }

    public getTableViewIdName(): string {
      return this.tableView.getIdName();
    }

    public setTbodyCells(data) {
      this.tableView.table.tbody.setCells(data);
    }

    public getTheadCell(x: number, y: number) {
      return this.tableView.table.thead.getCells(x, y);
    }

    public getTbodyCell(x: number, y: number) {
      return this.tableView.table.tbody.getCells(x, y);
    }

    public getFirstCell() {
      return this.tableView.table.thead.getFirstCell();
    }

    /*
    * Getter Model
    */
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

  }
}
