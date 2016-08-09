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
      this.setTbodyStyle();

      this.setModels();
      this.setStyle();
      this.setEvent();
    }

    private setElements(): void {
      this.setTableView();
      this.setTable();
      this.setThead();
      this.setTbody();
    }

    private setModels(): void {
      this.setTheadLines();
      this.createTheadModel();
      this.createTbodyModel();
    }

    private setStyle() {
      this.setTableViewStyle();
      this.setTheadFixedStyle();
      this.setTbodyFixedStyle();
    }

    private setTheadStyle(): void {
      (<HTMLElement>this.thead).style.position = 'absolute';
      (<HTMLElement>this.thead).style.top = '0';
      (<HTMLElement>this.thead).style.width = '1617px';
      (<HTMLElement>this.thead).style.zIndex = '10';
    }

    private setTbodyStyle(): void {
      this.tbody.style.display = 'block';
      this.tbody.style.width = '1470px';
      this.tbody.style.paddingLeft = '147px';
    }

    private setEvent(): void {
      this.setScrollEvent();
    }

    private createTheadModel(): void {
      var tr: NodeList = this.thead.querySelectorAll('tr'),
          th: NodeList = this.thead.querySelectorAll('tr > *'),
          styles,
          cells = [];

      for (var i = 0; i < th.length; i++) {
        styles = (<any>th[i]).currentStyle || (<any>document.defaultView).getComputedStyle(th[i], '');

        cells.push(Cell.fromData({
          parent: 'thead',
          tagName: (<HTMLElement>th[i]).tagName,
          x: i,
          y: 0,
          outerWidth: (<HTMLElement>th[i]).offsetWidth,
          outerHeight: (<HTMLElement>th[i]).offsetHeight,
          paddingTop: styles["padding-top"],
          paddingRight: styles["padding-right"],
          paddingBottom: styles["padding-bottom"],
          paddingLeft: styles["padding-left"],
          borderTopWidth: styles["border-top-width"],
          borderRightWidth: styles["border-right-width"],
          borderBottomWidth: styles["border-bottom-width"],
          borderLeftWidth: styles["border-left-width"]
        }));
      }

      this.model.setTheadCells(cells);
    }

    private createTbodyModel(): void {
      var tr: any = this.tbody.querySelectorAll('tr'),
          td: any,
          styles,
          cells = [];

      for (var i = 0; i < tr.length; i++) {
        td = tr[i].querySelectorAll('tr > *');

        for (var n = 0; n < td.length; n++) {
          styles = td[n].currentStyle || document.defaultView.getComputedStyle(td[n], '');

          cells.push(Cell.fromData({
            parent: 'tbody',
            tagName: td[n].tagName,
            x: n,
            y: i,
            outerWidth: td[n].offsetWidth,
            outerHeight: td[n].offsetHeight,
            paddingTop: styles["padding-top"],
            paddingRight: styles["padding-right"],
            paddingBottom: styles["padding-bottom"],
            paddingLeft: styles["padding-left"],
            borderTopWidth: styles["border-top-width"],
            borderRightWidth: styles["border-right-width"],
            borderBottomWidth: styles["border-bottom-width"],
            borderLeftWidth: styles["border-left-width"]
          }));
        }
      }

      this.model.setTbodyCells(cells);
    }

    private setTable(): void {
      this.table = this.tableView.querySelector('table');
    }

    private setThead(): void {
      this.thead = this.table.querySelector('thead');
    }

    private setTbody(): void {
      this.tbody = this.table.querySelector('tbody');
    }

    private setTableView(): void {
      this.tableView = document.getElementById(this.model.getTableViewIdName());
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

      for (var i = 0; i < tr.length; i++) {
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