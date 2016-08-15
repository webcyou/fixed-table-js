/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {
  var created_num = 0;

  export class Cell {
    constructor(
      public id: number,
      public isFixed: boolean,
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
      public borderLeftWidth: string,
      public tHeadCell?: Cell
      ) {
      this.id = this.createId();
      this.width = this.getWidth();
      this.height = this.getHeight();
    }

    static fromData(data: any): Cell {
      return new Cell(
        data.id ? data.id : 0,
        data.isFixed ? data.isFixed : Boolean(data.parent === 'tbody' && data.x === 0),
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
        data.borderLeftWidth ? data.borderLeftWidth : '',
        data.tHeadCell ? data.tHeadCell : null

      );
    }

    private createId(): number {
      return ++created_num;
    }

    private getWidth(): number {
      if(this.parent === 'thead') {
        return this.outerWidth - (parseInt(this.paddingRight, 10) + parseInt(this.paddingLeft, 10)
          + parseInt(this.borderRightWidth, 10) + parseInt(this.borderLeftWidth, 10));
      } else {
        return this.tHeadCell.outerWidth - (parseInt(this.paddingRight, 10) + parseInt(this.paddingLeft, 10)
          + parseInt(this.borderRightWidth, 10) + parseInt(this.borderLeftWidth, 10));
      }
    }

    public getCSSWidth(): string {
      return this.width + 'px';
    }

    private getHeight(cell?: Cell): number {
      if(this.isFixed && cell) {
        return cell.outerHeight - (parseInt(this.paddingTop, 10) + parseInt(this.paddingBottom, 10)
          + parseInt(this.borderTopWidth, 10) + parseInt(this.borderBottomWidth, 10));

      } else {
        return this.outerHeight - (parseInt(this.paddingTop, 10) + parseInt(this.paddingBottom, 10)
          + parseInt(this.borderTopWidth, 10) + parseInt(this.borderBottomWidth, 10));
      }
    }

    public getCSSHeight(cell?: Cell): string {
      if(cell) {
        this.height = this.getHeight(cell);

        return this.height + 'px';
      } else {
        return this.height + 'px';
      }
    }
  }
}
