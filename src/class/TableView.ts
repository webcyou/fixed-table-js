/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {

  export class TableView {
    static CSS_POSITION_VALUE = 'relative';
    static CSS_OVERFLOW_VALUE = 'scroll';

    constructor(
      public elementIdName: string,
      public table: Table,
      public fullMode: boolean,
      public fixedLineNum: number,
      public fixedColumnNum: number,
      public position: string,
      public overflow: string
      ) {
    }

    static fromData(data: any): TableView {
      return new TableView(
        data.id ? data.id : 'fixedTable',
        Table.fromData({}),
        data.fullMode ? data.fullMode : false,
        data.fixedLineNum ? data.fixedLineNum : 1,
        data.fixedColumnNum ? data.fixedColumnNum : 1,
        this.CSS_POSITION_VALUE,
        this.CSS_OVERFLOW_VALUE
      );
    }

    public getIdName(): string {
      return this.elementIdName
    }
  }
}
