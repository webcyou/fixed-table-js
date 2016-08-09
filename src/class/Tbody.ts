/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {

  export class Tbody {
    static CSS_DISPLAY_VALUE = 'block';

    constructor(
      public cells: Cell[],
      public width: number,
      public outerWidth: number,
      public borderTopWidth: string,
      public borderRightWidth: string,
      public borderBottomWidth: string,
      public borderLeftWidth: string,
      public paddingLeft: number,
      public display: string
      ) {
    }

    static fromData(data: any): Tbody {
      return new Tbody(
        [],
        data.width ? data.width : 0,
        data.outerWidth ? data.outerWidth : 0,
        data.borderTopWidth ? data.borderTopWidth : '',
        data.borderRightWidth ? data.borderRightWidth : '',
        data.borderBottomWidth ? data.borderBottomWidth : '',
        data.borderLeftWidth ? data.borderLeftWidth : '',
        0,
        this.CSS_DISPLAY_VALUE
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

    public setStyles(table) {
      this.paddingLeft = table.thead.cells[0].outerWidth;
      this.width = table.outerWidth - table.thead.cells[0].outerWidth;
    }

    public getPaddingLeft() {
      return this.paddingLeft;
    }

    public getCSSPaddingLeft(): string {
      return this.paddingLeft + 'px';
    }

    public getTbodyWidth() {
      return this.width;
    }

    public getCSSWidth(): string {
      return this.width + 'px';
    }

  }
}