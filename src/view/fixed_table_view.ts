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
    private table    : Element;
    private thead    : Element;
    private tbody    : Element;

    private tableViewModel: TableView;
    private tableModel    : Table;
    private theadModel    : Thead;
    private tbodyModel    : Tbody;

    constructor(
      model: FixedTableModel
      ) {
      this.model = model;
      this.tableViewModel = this.model.getTableViewModel();
      this.tableModel = this.model.getTableModel();
      this.theadModel = this.model.getTheadModel();
      this.tbodyModel = this.model.getTbodyModel();

      this.setElements();

      if(!this.tableView) return;

      this.init();
    }

    /**
     * Initialization
     **/
    private init(): void {
      this.setTableViewModel();
      this.setTableViewStyle();

      this.setTableStyle();
      this.setTableModel();

      this.setTheadModel();
      this.setTbodyModel();

      this.setTheadStyle();
      this.setTbodyStyle();

      this.setFixedStyle();
      this.setEventHandler();
    }

    /**
     * Elements
    **/
    private setElements(): void {
      this.tableView = document.getElementById(this.tableViewModel.getIdName());

      if(!this.tableView) return;

      this.table = this.tableView.querySelector('table');
      this.thead = this.table.querySelector('thead');
      this.tbody = this.table.querySelector('tbody');
    }

    /**
     * TableView
    **/
    private setTableViewModel(): void {
      this.tableViewModel.setOffset(this.tableView.getBoundingClientRect());
    }

    private setTableViewStyle(): void {
      this.tableView.style.position = this.tableViewModel.position;
      this.tableView.style.overflow = this.tableViewModel.overflow;

      if(this.tableViewModel.isFullMode) {
        this.setTableViewFullModeStyle();
      }
    }

    private setTableViewFullModeStyle(): void {
      var viewSize: Object = this.tableViewModel.getFullModeSize(document.body.clientWidth, document.body.clientHeight);

      this.tableView.style.width = (<ViewSize>viewSize).width + 'px';
      this.tableView.style.height = (<ViewSize>viewSize).height + 'px';

      viewSize = this.tableViewModel.getFullModeSize(document.body.clientWidth, document.body.clientHeight);

      this.tableView.style.width = (<ViewSize>viewSize).width + 'px';
      this.tableView.style.height = (<ViewSize>viewSize).height + 'px';
    }

    /**
     * Table
    **/
    private setTableStyle(): void {
      (<HTMLElement>this.table).style.borderCollapse = this.tableModel.borderCollapse;
      (<HTMLElement>this.table).style.borderSpacing = this.tableModel.borderSpacing;
    }

    private setTableModel(): void {
      var tableStyles = (<any>this.table).currentStyle || (<any>document.defaultView).getComputedStyle(this.table, '');
      this.tableModel.setStyles(tableStyles);
    }

    /**
     * Thead
     *
    **/
    private setTheadStyle(): void {
      (<HTMLElement>this.thead).style.position = this.theadModel.position;
      (<HTMLElement>this.thead).style.top = this.theadModel.top;
      (<HTMLElement>this.thead).style.width =  this.theadModel.getCSSWidth();
      (<HTMLElement>this.thead).style.zIndex = this.theadModel.zIndex;
    }

    private setTheadModel(): void {
      this.theadModel.setLineNumber(this.table.querySelectorAll('thead tr').length);
      this.theadModel.setCells(this.createTheadCellsModel());
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
    **/
    private setTbodyStyle(): void {
      this.tableModel.setTbodyFixedModel();
      (<HTMLElement>this.tbody).style.display = this.tbodyModel.display;
      (<HTMLElement>this.tbody).style.width = this.tbodyModel.getCSSWidth();
      (<HTMLElement>this.tbody).style.paddingLeft = this.tbodyModel.getCSSPaddingLeft();
      (<HTMLElement>this.tbody).style.marginTop = this.tbodyModel.getCSSMarginTop();
    }

    private setTbodyModel(): void {
      this.tbodyModel.setCells(this.createTbodyCellsModel());
    }

    private createTbodyCellsModel(): Cell[] {
      var tr: NodeList = this.tbody.querySelectorAll('tr'),
          td: NodeList,
          styles,
          cells: Cell[] = [];

      for (var y: number = 0; y < tr.length; y++) {
        td = (<Element>tr[y]).querySelectorAll('tr > *');

        for (var x: number = 0; x < td.length; x++) {
          styles = (<any>td[x]).currentStyle || (<any>document.defaultView).getComputedStyle(td[x], '');
          cells.push(this.getCreateCellModel('tbody', td, styles, x, y));
        }
      }
      return cells;
    }

    /**
     * Fixed Style
    **/
    private setFixedStyle(): void {
      this.setTheadFixedStyle();
      this.setTbodyFixedStyle();
    }

    private getCreateCellModel(parent: string, elements, styles, x: number, y: number): Cell {
      return Cell.fromData({
        parent: parent,
        tagName: elements[x].tagName,
        x: x,
        y: y,
        outerWidth: elements[x].offsetWidth,
        outerHeight: elements[x].offsetHeight,
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
      var tr: NodeList = this.thead.querySelectorAll('tr'),
          td: NodeList,
          cell: Cell;

      for (var y: number = 0; y < tr.length; y++) {
        td = (<Element>tr[y]).querySelectorAll('tr > *');

        for (var x: number = 0; x < td.length; x++) {
          if(y == 0) {
            cell = this.theadModel.getCell(x, y);
            (<HTMLElement>td[x]).style.width = cell.getCSSWidth();
          }
        }
      }
    }

    private setTbodyFixedStyle(): void {
      var tr: NodeList = this.tbody.querySelectorAll('tr'),
          td: NodeList,
          angleCell = this.theadModel.getFirstCell();

      for (var i: number = 0; i < tr.length; i++) {
        td = (<Element>tr[i]).querySelectorAll('tr > *');

        for (var n: number = 0; n < td.length; n++) {
          if(n == 0) {
            var secondCell = this.tbodyModel.getCell(1, i);

            (<HTMLElement>td[n]).style.width = angleCell.getCSSWidth();
            (<HTMLElement>td[n]).style.height = secondCell.getCSSHeight();
            (<HTMLElement>td[n]).style.position = this.tbodyModel.fixedPositon;
            (<HTMLElement>td[n]).style.left = this.tbodyModel.fixedLeft;
          } else {
            var cell = this.theadModel.getCell(n, 0);
            (<HTMLElement>td[n]).style.width = cell.getCSSWidth();
          }
        }
      }
    }

    /**
     * Event Handler
     **/
    private setEventHandler(): void {
      this.setScrollEvent();
      this.setWindowResizeEvent();
    }

    private setScrollEvent(): void {
      this.tableView.addEventListener('scroll', (): void => {
        this.boxScroll();
      }, false);
    }

    private setWindowResizeEvent(): void {
      window.addEventListener('resize', (): void => {
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
      if(this.tableViewModel.isFullMode) {
        this.setTableViewFullModeStyle();
      }
    }

    public resizeContainer(): void {
      this.setTableViewModel();
      this.setTableViewStyle();
    }

  }
}