/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {

  export class TableView {
    constructor(
      public elementIdName: string,
      public table: Table,
      public fullMode: boolean,
      public fixedLineNum: number,
      public fixedColumnNum: number
      ) {
    }

    static fromData(data: any): TableView {
      return new TableView(
        data.id ? data.id : 'fixedTable',
        Table.fromData({}),
        data.fullMode ? data.fullMode : false,
        data.fixedLineNum ? data.fixedLineNum : 1,
        data.fixedColumnNum ? data.fixedColumnNum : 1
      );
    }

    public getIdName(): string {
      return this.elementIdName
    }
  }
}
