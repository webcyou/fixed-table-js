/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {
  var created_num = 0;

  export class Cell {
    constructor(
      public id: number,
      public parent: string,
      public tagName: string,
      public x: number,
      public y: number,
      public width: number,
      public height: number,
      public outerWidth: number,
      public outerHeight: number,
      public paddingTop: string,
      public paddingRight: string,
      public paddingBottom: string,
      public paddingLeft: string,
      public borderTopWidth: string,
      public borderRightWidth: string,
      public borderBottomWidth: string,
      public borderLeftWidth: string
      ) {
      this.id = this.createId();
      this.width = this.getWidth();
      this.height = this.getHeight();
    }

    static fromData(data: any): Cell {
      return new Cell(
        data.id ? data.id : 0,
        data.parent ? data.parent : '',
        data.tagName ? data.tagName : '',
        data.x ? data.x : 0,
        data.y ? data.y : 0,
        data.width ? data.width : 0,
        data.height ? data.height : 0,
        data.outerWidth ? data.outerWidth : 0,
        data.outerHeight ? data.outerHeight : 0,
        data.paddingTop ? data.paddingTop : '',
        data.paddingRight ? data.paddingRight : '',
        data.paddingBottom ? data.paddingBottom : '',
        data.paddingLeft ? data.paddingLeft : '',
        data.borderTopWidth ? data.borderTopWidth : '',
        data.borderRightWidth ? data.borderRightWidth : '',
        data.borderBottomWidth ? data.borderBottomWidth : '',
        data.borderLeftWidth ? data.borderLeftWidth : ''
      );
    }

    private createId(): number {
      return ++created_num;
    }

    private getWidth(): number {
      return this.outerWidth - (parseInt(this.paddingRight, 10) + parseInt(this.paddingLeft, 10)
        + parseInt(this.borderRightWidth, 10) + parseInt(this.borderLeftWidth, 10));
    }

    private getHeight(): number {
      return this.outerHeight - (parseInt(this.paddingTop, 10) + parseInt(this.paddingBottom, 10)
        + parseInt(this.borderTopWidth, 10) + parseInt(this.borderBottomWidth, 10));
    }
  }
}
