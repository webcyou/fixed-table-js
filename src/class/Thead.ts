/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {

  export class Thead {
    static CSS_POSITION_VALUE = 'absolute';
    static CSS_TOP_VALUE = '0';
    static CSS_ZINDEX_VALUE = '10';

    constructor(
      public lineNum: number,
      public cells: Cell[],
      public width: number,
      public outerWidth: number,
      public borderTopWidth: string,
      public borderRightWidth: string,
      public borderBottomWidth: string,
      public borderLeftWidth: string,
      public position: string,
      public top: string,
      public zIndex: string
      ) {
    }

    static fromData(data: any): Thead {
      return new Thead(
        0,
        [],
        data.width ? data.width : 0,
        data.outerWidth ? data.outerWidth : 0,
        data.borderTopWidth ? data.borderTopWidth : '',
        data.borderRightWidth ? data.borderRightWidth : '',
        data.borderBottomWidth ? data.borderBottomWidth : '',
        data.borderLeftWidth ? data.borderLeftWidth : '',
        this.CSS_POSITION_VALUE,
        this.CSS_TOP_VALUE,
        this.CSS_ZINDEX_VALUE
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

    public setStyles(table) {
      if(this.borderLeftWidth) {
        this.width = table.outerWidth - (parseInt(this.borderLeftWidth, 10) + parseInt(this.borderRightWidth, 10));
      } else {
        this.width = table.outerWidth;
      }
    }

    public getWidth(): number {
      return this.width;
    }

    public getCSSWidth(): string {
      return this.width + 'px';
    }
  }
}
