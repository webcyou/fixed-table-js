/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

namespace FixedTables {

  export class TableView {
    static CSS_POSITION_VALUE = 'relative';
    static CSS_OVERFLOW_VALUE = 'auto';

    constructor(
      public elementIdName: string,
      public table: Table,
      public isFullMode: boolean,
      public fixedLineNum: number,
      public fixedColumnNum: number,
      public offsetTop: number,
      public offsetLeft: number,
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
        0,
        0,
        this.CSS_POSITION_VALUE,
        this.CSS_OVERFLOW_VALUE
      );
    }

    public getIdName(): string {
      return this.elementIdName
    }

    public setOffset(rect: ClientRect): void {
      this.offsetTop = rect.top;
      this.offsetLeft = rect.left;
    }

    public getFullModeSize(windowWidth: number, windowHeight: number): Object {
      return {
        width: windowWidth - this.offsetLeft,
        height: windowHeight - this.offsetTop
      }
    }

    public changeMode(bool: boolean): void {
      this.isFullMode = bool;
    }
  }
}
