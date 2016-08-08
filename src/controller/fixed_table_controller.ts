/*
 * Author: Daisuke Takayama
 */
/// <reference path='../_all.ts' />

module FixedTables {
  export class FixedTableController {
    private model: FixedTableModel;
    private view: FixedTableView;

    constructor(
      model: FixedTableModel,
      view: FixedTableView
      ) {
      this.model = model;
      this.view = view;

      //this.setScrollEvent();

    }

    private setScrollEvent() {
      var tableView = this.view.getTableView();

      try { //IE9+, Other Browsers
        tableView.addEventListener('scroll', this.view.boxScroll, false);
      } catch (e) { //for IE8-
        tableView.attachEvent('onscroll', this.view.boxScroll());
      }

      //tableView.addEventListener('click', this.view.boxScroll, false);

      console.log(tableView);



    }

  }
}
