/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {

  export class FixedTableView {
    private model: FixedTableModel;

    private tableView: any;
    private table: any;
    private thead: any;
    private tbody: any;

    constructor(
      model: FixedTableModel
      ) {
      this.model = model;
      this.setElements();
      this.setModels();
      this.setStyle();
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
      this.setTheadFixedStyle();
      this.setTbodyFixedStyle();

      this.setScrollEvent();
    }

    private createTheadModel() {
      var tr: any[] = this.thead.querySelectorAll('tr'),
          th: any[] = this.thead.querySelectorAll('tr > *'),
          styles,
          cells = [];
      for (var i = 0; i < th.length; i++) {
        styles = th[i].currentStyle || document.defaultView.getComputedStyle(th[i], '');

        cells.push(Cell.fromData({
          parent: 'thead',
          tagName: th[i].tagName,
          x: i,
          y: 0,
          outerWidth: th[i].offsetWidth,
          outerHeight: th[i].offsetHeight,
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

    private createTbodyModel() {
      var tr: any[] = this.tbody.querySelectorAll('tr'),
          td: any[],
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

    private setTheadFixedStyle() {
      var tr: NodeList = this.thead.querySelectorAll('tr'),
          td: NodeList,
          cell: Cell,
          cells = [];

      for (var i = 0; i < tr.length; i++) {
        td = (<Element>tr[i]).querySelectorAll('tr > *');

        for (var n = 0; n < td.length; n++) {
          if(i == 0) {
            cell = this.model.getTheadCell(n, i)[0];

            //td[n].style.position = 'fixed';
            (<HTMLElement>td[n]).style.width = cell.width + 'px';
          }
        }
      }
    }

    private setTbodyFixedStyle() {
      var tr: any[] = this.tbody.querySelectorAll('tr'),
          td: any[],
          angleCell = this.model.getFirstCell()[0],
          cell,
          cells = [];

      for (var i = 0; i < tr.length; i++) {
        td = tr[i].querySelectorAll('tr > *');
        for (var n = 0; n < td.length; n++) {
          if(n == 0) {

            //cell = this.model.getTbodyCell(n, i)[0];
            //td[n].style.width = cell.width + 'px';

            td[n].style.width = angleCell.width + 'px';

            td[n].style.position = 'absolute';
            td[n].style.left = 0;

            //console.log(cell);
          }
          //td[n].style.width = cell.width + 'px';
        }
      }
    }

    private setTbodyScrollStyle(left) {
      var tr: any[] = this.tbody.querySelectorAll('tr'),
        td: any[],
        cell,
        cells = [];
      for (var i = 0; i < tr.length; i++) {
        td = tr[i].querySelectorAll('tr > *');
        for (var n = 0; n < td.length; n++) {
          if(n == 0) {
            td[n].style.left = left + 'px';
          }
        }
      }
    }

    private setTheadScrollStyle(top) {
      this.thead.style.top = top + 'px';
    }

    private setScrollEvent() {
      var that = this;

      try { //IE9+, Other Browsers
        this.tableView.addEventListener('scroll', () => {
          that.boxScroll();
        }, false);
      } catch (e) { //for IE8-
        //tableView.attachEvent('onscroll', this.view.boxScroll());
      }
    }

    public getTableView() {
      return this.tableView;
    }

    public boxScroll() {
      this.setTbodyScrollStyle(this.tableView.scrollLeft);
      this.setTheadScrollStyle(this.tableView.scrollTop);

      //console.log(this.tableView.scrollLeft);
      console.log(this.tableView.scrollLeft);
    }

  }
}