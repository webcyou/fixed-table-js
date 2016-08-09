/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {

  export class Table {
    constructor(
      public thead: Thead,
      public tbody: Tbody,
      public width: number
      ) {
    }

    static fromData(data: any): Table {
      return new Table(
        Thead.fromData({}),
        Tbody.fromData({}),
        0
      );
    }
  }
}

