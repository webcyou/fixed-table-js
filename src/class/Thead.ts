/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {

  export class Thead {
    constructor(
      public lineNum: number,
      public cells: Cell[]
      ) {
    }

    static fromData(data: any): Thead {
      return new Thead(
        0,
        []
      );
    }

    public setLineNumber(num: number): void {
      this.lineNum = num;
    }

    public setCells(cells: Cell[]) {
      this.cells = cells;
    }

    public getCells(x: number, y: number): Cell[] {
      return this.cells.filter((cell: Cell)=> {
        return (cell['x'] === x && cell['y'] === y);
      });
    }

    public getFirstCell() {
      return this.cells.filter((cell: Cell)=> {
        return (cell['x'] === 0 && cell['y'] === 0);
      });
    }

  }
}
