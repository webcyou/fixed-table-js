/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {

  export class Tbody {
    constructor(
      public cells: Cell[]
      ) {
    }

    static fromData(data: any): Tbody {
      return new Tbody(
        []
      );
    }

    public setCells(cells: Cell[]) {
      this.cells = cells;
    }

    public getCells(x: number, y: number): Cell[] {
      return this.cells.filter((cell: Cell)=> {
        return (cell['x'] === x && cell['y'] === y);
      });
    }


  }
}