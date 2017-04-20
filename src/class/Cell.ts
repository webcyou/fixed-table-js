/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

namespace FixedTables {
  var created_num = 0;
  const PIXEL_REG = /.*px/;

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
      public boxSizing: string,
      public tHeadCell?: Cell
      ) {
      if(this.id === null) {
        this.id = this.createId();
      }
      this.width = this.getWidth();
      this.height = this.getHeight();
    }

    static fromData(data: any): Cell {
      return new Cell(
        data.id ? data.id : null,
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
        data.borderTopWidth && PIXEL_REG.test(data.borderTopWidth) ? data.borderTopWidth : '0px',
        data.borderRightWidth && PIXEL_REG.test(data.borderRightWidth) ? data.borderRightWidth : '0px',
        data.borderBottomWidth && PIXEL_REG.test(data.borderBottomWidth) ? data.borderBottomWidth : '0px',
        data.borderLeftWidth && PIXEL_REG.test(data.borderLeftWidth) ? data.borderLeftWidth : '0px',
        data.boxSizing ? data.boxSizing : '',
        data.tHeadCell ? data.tHeadCell : null
      );
    }

    private createId(): number {
      return ++created_num;
    }

    private getWidth(): number {
      if(this.parent === 'thead') {
        return this.calculationWidth(this.outerWidth);
      } else {
        return this.calculationWidth(this.tHeadCell.outerWidth);
      }
    }

    public calculationWidth(outerWidth: number): number {
      let setWidth = 0;

      switch (this.boxSizing) {
        case 'content-box':
          setWidth = outerWidth - (parseInt(this.paddingRight, 10) + parseInt(this.paddingLeft, 10) + parseInt(this.borderRightWidth, 10) + parseInt(this.borderLeftWidth, 10));
          break;
        case 'padding-box':
          setWidth = outerWidth - (parseInt(this.borderRightWidth, 10) + parseInt(this.borderLeftWidth, 10));
          break;
        case 'border-box':
          setWidth = outerWidth;
          break;
        default:
          setWidth = outerWidth - (parseInt(this.paddingRight, 10) + parseInt(this.paddingLeft, 10) + parseInt(this.borderRightWidth, 10) + parseInt(this.borderLeftWidth, 10));
          break;
      }
      return setWidth;
    }

    public calculationHeight(outerHeight: number): number {
      let setHeight = 0;

      switch (this.boxSizing) {
        case 'content-box':
          setHeight = outerHeight - (parseInt(this.paddingTop, 10) + parseInt(this.paddingBottom, 10) + parseInt(this.borderTopWidth, 10) + parseInt(this.borderBottomWidth, 10));
          break;
        case 'padding-box':
          setHeight = outerHeight - (parseInt(this.borderTopWidth, 10) + parseInt(this.borderBottomWidth, 10));
          break;
        case 'border-box':
          setHeight = outerHeight;
          break;
        default:
          setHeight = outerHeight - (parseInt(this.paddingTop, 10) + parseInt(this.paddingBottom, 10) + parseInt(this.borderTopWidth, 10) + parseInt(this.borderBottomWidth, 10));
          break;
      }
      return setHeight;
    }

    public getCSSWidth(): string {
      return this.width + 'px';
    }

    private getHeight(cell?: Cell): number {
      if(this.isFixed && cell) {
        return this.calculationHeight(cell.outerHeight);
      } else {
        return this.calculationHeight(this.outerHeight);
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

    public changeStyles(data) {
      this.isFixed = data.isFixed ? data.isFixed : this.isFixed;
      this.width = data.width ? data.width : this.width;
      this.height = data.height ? data.height : this.height;
      this.outerWidth = data.outerWidth ? data.outerWidth : this.outerWidth;
      this.outerHeight = data.outerHeight ? data.outerHeight : this.outerHeight;
      this.paddingTop = data.paddingTop ? data.paddingTop : this.paddingTop;
      this.paddingRight = data.paddingRight ? data.paddingRight : this.paddingRight;
      this.paddingBottom = data.paddingBottom ? data.paddingBottom : this.paddingBottom;
      this.paddingLeft = data.paddingLeft ? data.paddingLeft : this.paddingLeft;
      this.borderTopWidth = data.borderTopWidth && PIXEL_REG.test(data.borderTopWidth) ? data.borderTopWidth : this.borderTopWidth;
      this.borderRightWidth = data.borderRightWidth && PIXEL_REG.test(data.borderRightWidth) ? data.borderRightWidth : this.borderRightWidth;
      this.borderBottomWidth = data.borderBottomWidth && PIXEL_REG.test(data.borderBottomWidth) ? data.borderBottomWidth : this.borderBottomWidth;
      this.borderLeftWidth = data.borderLeftWidth && PIXEL_REG.test(data.borderLeftWidth) ? data.borderLeftWidth : this.borderLeftWidth;

      if(data.outerWidth !== void 0 || data.outerHeight !== void 0) {
        this.width = this.getWidth();
        this.height = this.getHeight();
      }
    }
  }
}
