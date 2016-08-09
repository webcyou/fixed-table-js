/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {

  export class FixedTableView {
    private model: FixedTableModel;

    private tableView: HTMLElement;
    private table: Element;
    private thead: Element;
    private tbody: any;

    constructor(
      model: FixedTableModel
      ) {
      this.model = model;
      this.setElements();
      this.setTheadStyle();

      this.setTheadLines();
      this.createTheadModel();

      this.setTbodyStyle();

      this.setModels();
      this.setStyle();
      this.setEvent();
    }

    private setElements(): void {
      this.tableView = document.getElementById(this.model.getTableViewIdName());
      this.table = this.tableView.querySelector('table');
      this.thead = this.table.querySelector('thead');
      this.tbody = this.table.querySelector('tbody');

      var tableStyles = (<any>this.table).currentStyle || (<any>document.defaultView).getComputedStyle(this.table, '');
      this.model.setTableStyles(tableStyles);
    }

    private setTheadStyle(): void {
      (<HTMLElement>this.thead).style.position = 'absolute';
      (<HTMLElement>this.thead).style.top = '0';
      (<HTMLElement>this.thead).style.width =  this.model.getTheadWidth() + 'px';
      (<HTMLElement>this.thead).style.zIndex = '10';
    }

    private setTbodyStyle(): void {
      this.model.setTbodyStyles();

      this.tbody.style.display = 'block';
      this.tbody.style.width = this.model.getTbodyWidth() + 'px';
      this.tbody.style.paddingLeft = this.model.getTbodyPaddingLeft() + 'px';
    }

    private setModels(): void {
      //this.setTheadLines();
      //this.createTheadModel();
      this.createTbodyModel();
    }

    private setStyle() {
      this.setTableViewStyle();
      this.setTheadFixedStyle();
      this.setTbodyFixedStyle();
    }

    private setEvent(): void {
      this.setScrollEvent();
    }

    private getCreateCellModel(parent, elements, styles, i, n) {
      return Cell.fromData({
        parent: parent,
        tagName: elements[i].tagName,
        x: i,
        y: n,
        outerWidth: elements[i].offsetWidth,
        outerHeight: elements[i].offsetHeight,
        paddingTop: styles["padding-top"],
        paddingRight: styles["padding-right"],
        paddingBottom: styles["padding-bottom"],
        paddingLeft: styles["padding-left"],
        borderTopWidth: styles["border-top-width"],
        borderRightWidth: styles["border-right-width"],
        borderBottomWidth: styles["border-bottom-width"],
        borderLeftWidth: styles["border-left-width"]
      });
    }

    private createTheadModel(): void {
      var tr: NodeList = this.thead.querySelectorAll('tr'),
          th: NodeList = this.thead.querySelectorAll('tr > *'),
          styles,
          cells: Cell[] = [];

      for (var i = 0; i < th.length; i++) {
        styles = (<any>th[i]).currentStyle || (<any>document.defaultView).getComputedStyle(th[i], '');
        cells.push(this.getCreateCellModel('thead', th, styles, i, 0));
      }

      this.model.setTheadCells(cells);
    }

    private createTbodyModel(): void {
      var tr: NodeList = this.tbody.querySelectorAll('tr'),
          td: NodeList,
          styles,
          cells: Cell[] = [];

      for (var n: number = 0; n < tr.length; n++) {
        td = (<Element>tr[n]).querySelectorAll('tr > *');

        for (var i: number = 0; i < td.length; i++) {
          styles = (<any>td[i]).currentStyle || (<any>document.defaultView).getComputedStyle(td[i], '');
          cells.push(this.getCreateCellModel('tbody', td, styles, i, n));
        }
      }

      this.model.setTbodyCells(cells);
    }

    private setTheadLines(): void {
      this.model.setTheadLength(this.table.querySelectorAll('thead tr').length);
    }

    private setTableViewStyle() {
      this.tableView.style.position = 'relative';
      this.tableView.style.overflow = 'scroll';
      (<HTMLElement>this.table).style.tableLayout = 'fixed';
    }

    private setTheadFixedStyle(): void {
      var tr: NodeList = this.thead.querySelectorAll('tr'),
          td: NodeList,
          cell: Cell;

      for (var i: number = 0; i < tr.length; i++) {
        td = (<Element>tr[i]).querySelectorAll('tr > *');

        for (var n: number = 0; n < td.length; n++) {
          if(i == 0) {
            cell = this.model.getTheadCell(n, i)[0];
            (<HTMLElement>td[n]).style.width = cell.width + 'px';
          }
        }
      }
    }

    private setTbodyFixedStyle(): void {
      var tr: NodeList = this.tbody.querySelectorAll('tr'),
          td: NodeList,
          angleCell = this.model.getFirstCell()[0];

      for (var i = 0; i < tr.length; i++) {
        td = (<Element>tr[i]).querySelectorAll('tr > *');

        for (var n: number = 0; n < td.length; n++) {
          if(n == 0) {
            (<HTMLElement>td[n]).style.width = angleCell.width + 'px';
            (<HTMLElement>td[n]).style.position = 'absolute';
            (<HTMLElement>td[n]).style.left = '0';
          }
        }
      }
    }

    private setTbodyScrollStyle(left): void {
      var tr: any[] = this.tbody.querySelectorAll('tr'),
          td: any[];

      for (var i = 0; i < tr.length; i++) {
        td = tr[i].querySelectorAll('tr > *');
        for (var n = 0; n < td.length; n++) {
          if(n == 0) {
            td[n].style.left = left + 'px';
          }
        }
      }
    }

    private setTheadScrollStyle(top): void {
      (<HTMLElement>this.thead).style.top = top + 'px';
    }

    private setScrollEvent(): void {
      var that = this;

      this.tableView.addEventListener('scroll', () => {
        that.boxScroll();
      }, false);
    }

    public getTableView() {
      return this.tableView;
    }

    public boxScroll() {
      this.setTbodyScrollStyle(this.tableView.scrollLeft);
      this.setTheadScrollStyle(this.tableView.scrollTop);
    }

  }
}