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

    public setTableStyles(styles): void {
      this.tableView.table.setStyles(styles);
      this.setTheadStyles();
    }

    public getTableViewIdName(): string {
      return this.tableView.getIdName();
    }

    public setTheadLength(num: number): void {
      this.tableView.table.thead.setLineNumber(num);
    }

    public setTheadStyles(): void {
      this.tableView.table.thead.setStyles(this.tableView.table);
    }

    public setTbodyStyles(): void {
      this.tableView.table.tbody.setStyles(this.tableView.table);
    }

    public getTheadWidth() {
      return this.tableView.table.thead.getWidth();
    }

    public setTheadCells(data) {
      this.tableView.table.thead.setCells(data);
    }

    public setTbodyCells(data) {
      this.tableView.table.tbody.setCells(data);
    }

    public getTbodyPaddingLeft() {
      return this.tableView.table.tbody.getPaddingLeft();
    }

    public getTbodyWidth() {
      return this.tableView.table.tbody.getTbodyWidth();
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
