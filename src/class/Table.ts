/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

namespace FixedTables {
  const PIXEL_REG = /.*px/;

  export class Table {
    static CSS_BORDER_COLLAPSE_VALUE = 'collapse';
    static CSS_BORDER_SPACING_VALUE = '0';

    constructor(
      public thead: Thead,
      public tbody: Tbody,
      public width: number,
      public outerWidth: number,
      public paddingTop: string,
      public paddingRight: string,
      public paddingBottom: string,
      public paddingLeft: string,
      public borderTopWidth: string,
      public borderRightWidth: string,
      public borderBottomWidth: string,
      public borderLeftWidth: string,
      public borderCollapse: string,
      public borderSpacing: string
      ) {
    }

    static fromData(data: any): Table {
      return new Table(
        Thead.fromData({}),
        Tbody.fromData({}),
        data.width ? data.width : 0,
        data.outerWidth ? data.outerWidth : 0,
        data.paddingTop ? data.paddingTop : '',
        data.paddingRight ? data.paddingRight : '',
        data.paddingBottom ? data.paddingBottom : '',
        data.paddingLeft ? data.paddingLeft : '',
        data.borderTopWidth && PIXEL_REG.test(data.borderTopWidth) ? data.borderTopWidth : '0',
        data.borderRightWidth && PIXEL_REG.test(data.borderRightWidth) ? data.borderRightWidth : '0',
        data.borderBottomWidth && PIXEL_REG.test(data.borderBottomWidth) ? data.borderBottomWidth : '0',
        data.borderLeftWidth && PIXEL_REG.test(data.borderLeftWidth) ? data.borderLeftWidth : '0',
        data.borderCollapse ? data.borderCollapse : this.CSS_BORDER_COLLAPSE_VALUE,
        data.borderSpacing ? data.borderSpacing : this.CSS_BORDER_SPACING_VALUE
      );
    }

    public setStyles(styles) {
      this.width             = parseInt(styles["width"], 10);
      this.paddingTop        = styles["padding-top"];
      this.paddingRight      = styles["padding-right"];
      this.paddingBottom     = styles["padding-bottom"];
      this.paddingLeft       = styles["padding-left"];
      this.borderTopWidth    = styles["border-top-width"] && PIXEL_REG.test(styles["border-top-width"]) ? styles["border-top-width"] : '0';
      this.borderRightWidth  = styles["border-right-width"] && PIXEL_REG.test(styles["border-right-width"]) ? styles["border-right-width"] : '0';
      this.borderBottomWidth = styles["border-bottom-width"] && PIXEL_REG.test(styles["border-bottom-width"]) ? styles["border-bottom-width"] : '0';
      this.borderLeftWidth   = styles["border-left-width"] && PIXEL_REG.test(styles["border-left-width"]) ? styles["border-left-width"] : '0';
      this.outerWidth        = this.getOuterWidth();

      this.setTheadFixedModel();
    }

    public setTheadFixedModel() {
      this.thead.setStyles(this);
    }

    public setTbodyFixedModel() {
      this.tbody.setStyles(this);
    }

    public getOuterWidth() {
      return this.width + (parseInt(this.paddingLeft, 10) + parseInt(this.paddingRight, 10)
        + parseInt(this.borderLeftWidth, 10) + parseInt(this.borderRightWidth, 10));
    }

    public setCellStyle(data: any): void {
      let cell: Cell;

      if(data.parent !== void 0 && data.parent === 'thead') {
        cell = this.thead.getCell(data.x, data.y);
      } else {
        cell = this.tbody.getCell(data.x, data.y);
      }
      cell.changeStyles(data);
    }
  }
}

