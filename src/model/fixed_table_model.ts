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

    }

    public getTableViewIdName(): string {
      return this.tableView.getIdName();
    }

    public setTheadLength(num: number): void {
      this.tableView.table.thead.setLineNumber(num);
    }

    public setTheadCells(data) {
      this.tableView.table.thead.setCells(data);
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

  }
}
