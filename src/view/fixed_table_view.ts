/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {

  interface ViewSize {
    width: number;
    height: number;
  }


  export class FixedTableView {
    private model: FixedTableModel;

    private tableView: HTMLElement;
    private table: Element;
    private thead: Element;
    private tbody: Element;

    constructor(
      model: FixedTableModel
      ) {
      this.model = model;

      this.setElements();
      this.setTableViewModel();
      this.setTableViewStyle();

      this.setTableModel();

      this.setTheadStyle();
      this.setTheadModel();

      this.setTbodyStyle();
      this.setTbodyModel();

      this.setFixedStyle();
      this.setEventHandler();
    }

    /**
     * Elements
     *
    **/
    private setElements(): void {
      var tableViewModel: TableView = this.model.getTableViewModel();

      this.tableView = document.getElementById(tableViewModel.getIdName());
      this.table = this.tableView.querySelector('table');
      this.thead = this.table.querySelector('thead');
      this.tbody = this.table.querySelector('tbody');
    }

    /**
     * TableView
     *
    **/
    private setTableViewModel() {
      var tableViewModel: TableView = this.model.getTableViewModel();

      tableViewModel.setOffset(this.tableView.getBoundingClientRect());
    }

    private setTableViewStyle(): void {
      var tableViewModel: TableView = this.model.getTableViewModel();

      this.tableView.style.position = tableViewModel.position;
      this.tableView.style.overflow = tableViewModel.overflow;

      if(tableViewModel.fullMode) {
        this.setTableViewFullModeStyle();
      }
    }

    private setTableViewFullModeStyle(): void {
      var tableViewModel: TableView = this.model.getTableViewModel(),
          viewSize: Object = tableViewModel.getFullModeSize(document.body.clientWidth, document.body.clientHeight);

      this.tableView.style.width = (<ViewSize>viewSize).width + 'px';
      this.tableView.style.height = (<ViewSize>viewSize).height + 'px';

      viewSize = tableViewModel.getFullModeSize(document.body.clientWidth, document.body.clientHeight);

      this.tableView.style.width = (<ViewSize>viewSize).width + 'px';
      this.tableView.style.height = (<ViewSize>viewSize).height + 'px';
    }

    /**
     * Table
     *
    **/
    private setTableModel(): void {
      var tableStyles = (<any>this.table).currentStyle || (<any>document.defaultView).getComputedStyle(this.table, ''),
          tableModel: Table = this.model.getTableModel();

      tableModel.setStyles(tableStyles);
    }

    /**
     * Thead
     *
    **/
    private setTheadStyle(): void {
      var theadModel: Thead = this.model.getTheadModel();

      (<HTMLElement>this.thead).style.position = theadModel.position;
      (<HTMLElement>this.thead).style.top = theadModel.top;
      (<HTMLElement>this.thead).style.width =  theadModel.getCSSWidth();
      (<HTMLElement>this.thead).style.zIndex = theadModel.zIndex;
    }

    private setTheadModel(): void {
      var theadModel: Thead = this.model.getTheadModel();
      theadModel.setLineNumber(this.table.querySelectorAll('thead tr').length);
      theadModel.setCells(this.createTheadCellsModel());
    }

    private createTheadCellsModel(): Cell[] {
      var tr: NodeList = this.thead.querySelectorAll('tr'),
          th: NodeList = this.thead.querySelectorAll('tr > *'),
          styles,
          cells: Cell[] = [];

      for (var i = 0; i < th.length; i++) {
        styles = (<any>th[i]).currentStyle || (<any>document.defaultView).getComputedStyle(th[i], '');
        cells.push(this.getCreateCellModel('thead', th, styles, i, 0));
      }
      return cells;
    }

    /**
     * Tbody
     *
    **/
    private setTbodyStyle(): void {
      var tableModel: Table = this.model.getTableModel(),
          tbodyModel: Tbody = this.model.getTbodyModel();

      tableModel.setTbodyStyles();

      (<HTMLElement>this.tbody).style.display = tbodyModel.display;
      (<HTMLElement>this.tbody).style.width = tbodyModel.getCSSWidth();
      (<HTMLElement>this.tbody).style.paddingLeft = tbodyModel.getCSSPaddingLeft();
      (<HTMLElement>this.tbody).style.marginTop = tbodyModel.getCSSMarginTop();
    }

    private setTbodyModel() {
      var tbodyModel: Tbody = this.model.getTbodyModel();
      tbodyModel.setCells(this.createTbodyCellsModel());
    }

    private createTbodyCellsModel(): Cell[] {
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
      return cells;
    }

    /**
     * Fixed Style
     *
    **/
    private setFixedStyle(): void {
      this.setTheadFixedStyle();
      this.setTbodyFixedStyle();
    }

    private getCreateCellModel(parent: string, elements, styles, i: number, n: number) {
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

    private setTheadFixedStyle(): void {
      var theadModel: Thead = this.model.getTheadModel(),
          tr: NodeList = this.thead.querySelectorAll('tr'),
          td: NodeList,
          cell: Cell;

      for (var i: number = 0; i < tr.length; i++) {
        td = (<Element>tr[i]).querySelectorAll('tr > *');

        for (var n: number = 0; n < td.length; n++) {
          if(i == 0) {
            cell = theadModel.getCell(n, i);
            (<HTMLElement>td[n]).style.width = cell.getCSSWidth();
          }
        }
      }
    }

    private setTbodyFixedStyle(): void {
      var theadModel: Thead = this.model.getTheadModel(),
          tbodyModel: Tbody = this.model.getTbodyModel(),
          tr: NodeList = this.tbody.querySelectorAll('tr'),
          td: NodeList,
          angleCell = theadModel.getFirstCell();

      for (var i: number = 0; i < tr.length; i++) {
        td = (<Element>tr[i]).querySelectorAll('tr > *');

        for (var n: number = 0; n < td.length; n++) {
          if(n == 0) {
            (<HTMLElement>td[n]).style.width = angleCell.getCSSWidth();
            (<HTMLElement>td[n]).style.position = tbodyModel.fixedPositon;
            (<HTMLElement>td[n]).style.left = tbodyModel.fixedLeft;
          } else {
            var cell = theadModel.getCell(n, 0);
            (<HTMLElement>td[n]).style.width = cell.getCSSWidth();
          }
        }
      }
    }

    /**
     * Event Handler
     *
     **/
    private setEventHandler(): void {
      this.setScrollEvent();
      this.setWindowResizeEvent();
    }

    private setScrollEvent(): void {
      this.tableView.addEventListener('scroll', () => {
        this.boxScroll();
      }, false);
    }

    private setWindowResizeEvent(): void {
      window.addEventListener('resize', () => {
        this.windowResize();
      }, false);
    }

    private setTbodyScrollStyle(left: number): void {
      var tr: NodeList = this.tbody.querySelectorAll('tr'),
          td: NodeList;

      for (var i: number = 0; i < tr.length; i++) {
        td = (<Element>tr[i]).querySelectorAll('tr > *');

        for (var n: number = 0; n < td.length; n++) {
          if(n == 0) {
            (<HTMLElement>td[n]).style.left = left + 'px';
          }
        }
      }
    }

    private setTheadScrollStyle(top: number): void {
      (<HTMLElement>this.thead).style.top = top + 'px';
    }

    public boxScroll(): void {
      this.setTbodyScrollStyle(this.tableView.scrollLeft);
      this.setTheadScrollStyle(this.tableView.scrollTop);
    }

    public windowResize(): void {
      var tableViewModel: TableView = this.model.getTableViewModel();

      if(tableViewModel.fullMode) {
        this.setTableViewFullModeStyle();
      }
    }

  }
}