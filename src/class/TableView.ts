/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {

  export class TableView {
    constructor(
      public elementIdName: string,
      public table: Table
      ) {
    }

    static fromData(data: any): TableView {
      return new TableView(
        data.id ? data.id : 'fixedTable',
        Table.fromData({})
      );
    }

    getIdName(): string {
      return this.elementIdName
    }
  }
}
