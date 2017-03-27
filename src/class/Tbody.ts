/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

namespace FixedTables {
  const PIXEL_REG = /.*px/;

  export class Tbody {
    static CSS_DISPLAY_VALUE = 'block';
    static FIXED_CSS_POSITION_VALUE = 'absolute';
    static FIXED_CSS_LEFT_VALUE = '0';

    constructor(
      public cells: Cell[],
      public width: number,
      public outerWidth: number,
      public borderTopWidth: string,
      public borderRightWidth: string,
      public borderBottomWidth: string,
      public borderLeftWidth: string,
      public paddingLeft: number,
      public marginTop: number,
      public display: string,
      public fixedPositon: string,
      public fixedLeft: string
      ) {
    }

    static fromData(data: any): Tbody {
      return new Tbody(
        [],
        data.width ? data.width : 0,
        data.outerWidth ? data.outerWidth : 0,
        data.borderTopWidth && PIXEL_REG.test(data.borderTopWidth) ? data.borderTopWidth : '0',
        data.borderRightWidth && PIXEL_REG.test(data.borderRightWidth) ? data.borderRightWidth : '0',
        data.borderBottomWidth && PIXEL_REG.test(data.borderBottomWidth) ? data.borderBottomWidth : '0',
        data.borderLeftWidth && PIXEL_REG.test(data.borderLeftWidth) ? data.borderLeftWidth : '0',
        0,
        0,
        this.CSS_DISPLAY_VALUE,
        this.FIXED_CSS_POSITION_VALUE,
        this.FIXED_CSS_LEFT_VALUE
      );
    }

    public setCells(cells: Cell[]): void {
      this.cells = cells;
    }

    public getCells(x: number, y: number): Cell[] {
      return this.cells.filter((cell: Cell)=> {
        return (cell['x'] === x && cell['y'] === y);
      });
    }

    public getCell(x: number, y: number): Cell {
      return this.getCells(x, y)[0];
    }

    public setStyles(table: Table): void {
      this.paddingLeft = table.thead.cells[0].outerWidth;
      this.marginTop = table.thead.outerHeight;
      this.width = table.outerWidth;
    }

    public getPaddingLeft(): number {
      return this.paddingLeft;
    }

    public getCSSPaddingLeft(): string {
      return this.paddingLeft + 'px';
    }

    public getCSSMarginTop(): string {
      return this.marginTop + 'px';
    }

    public getTbodyWidth(): number {
      return this.width;
    }

    public getCSSWidth(): string {
      return this.width + 'px';
    }

  }
}