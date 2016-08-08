'use strict';
var e = eval, global = e('this');
var FixedTables;
(function (FixedTables) {
    var FixedTable = (function () {
        function FixedTable(option) {
            this.model = new FixedTables.FixedTableModel(option);
            this.view = new FixedTables.FixedTableView(this.model);
            this.controller = new FixedTables.FixedTableController(this.model, this.view);
        }
        return FixedTable;
    }());
    FixedTables.FixedTable = FixedTable;
})(FixedTables || (FixedTables = {}));
if (typeof (module) !== 'undefined') {
    if (typeof (module).exports.FixedTable === 'undefined') {
        (module).exports.FixedTable = {};
    }
    (module).exports.FixedTable = FixedTables.FixedTable;
}
if (typeof (global) !== 'undefined') {
    if (typeof global['FixedTable'] === 'undefined') {
        global['FixedTable'] = {};
    }
    global['FixedTable'] = FixedTables.FixedTable;
}
var FixedTables;
(function (FixedTables) {
    var created_num = 0;
    var Cell = (function () {
        function Cell(id, parent, tagName, x, y, width, height, outerWidth, outerHeight, paddingTop, paddingRight, paddingBottom, paddingLeft, borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth) {
            this.id = id;
            this.parent = parent;
            this.tagName = tagName;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.outerWidth = outerWidth;
            this.outerHeight = outerHeight;
            this.paddingTop = paddingTop;
            this.paddingRight = paddingRight;
            this.paddingBottom = paddingBottom;
            this.paddingLeft = paddingLeft;
            this.borderTopWidth = borderTopWidth;
            this.borderRightWidth = borderRightWidth;
            this.borderBottomWidth = borderBottomWidth;
            this.borderLeftWidth = borderLeftWidth;
            this.id = this.createId();
            this.width = this.getWidth();
            this.height = this.getHeight();
        }
        Cell.fromData = function (data) {
            return new Cell(data.id ? data.id : 0, data.parent ? data.parent : '', data.tagName ? data.tagName : '', data.x ? data.x : 0, data.y ? data.y : 0, data.width ? data.width : 0, data.height ? data.height : 0, data.outerWidth ? data.outerWidth : 0, data.outerHeight ? data.outerHeight : 0, data.paddingTop ? data.paddingTop : '', data.paddingRight ? data.paddingRight : '', data.paddingBottom ? data.paddingBottom : '', data.paddingLeft ? data.paddingLeft : '', data.borderTopWidth ? data.borderTopWidth : '', data.borderRightWidth ? data.borderRightWidth : '', data.borderBottomWidth ? data.borderBottomWidth : '', data.borderLeftWidth ? data.borderLeftWidth : '');
        };
        Cell.prototype.createId = function () {
            return ++created_num;
        };
        Cell.prototype.getWidth = function () {
            return this.outerWidth - (parseInt(this.paddingRight, 10) + parseInt(this.paddingLeft, 10)
                + parseInt(this.borderRightWidth, 10) + parseInt(this.borderLeftWidth, 10));
        };
        Cell.prototype.getHeight = function () {
            return this.outerHeight - (parseInt(this.paddingTop, 10) + parseInt(this.paddingBottom, 10)
                + parseInt(this.borderTopWidth, 10) + parseInt(this.borderBottomWidth, 10));
        };
        return Cell;
    }());
    FixedTables.Cell = Cell;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var Table = (function () {
        function Table(thead, tbody) {
            this.thead = thead;
            this.tbody = tbody;
        }
        Table.fromData = function (data) {
            return new Table(FixedTables.Thead.fromData({}), FixedTables.Tbody.fromData({}));
        };
        return Table;
    }());
    FixedTables.Table = Table;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var TableView = (function () {
        function TableView(elementIdName, table) {
            this.elementIdName = elementIdName;
            this.table = table;
        }
        TableView.fromData = function (data) {
            return new TableView(data.id ? data.id : 'fixedTable', FixedTables.Table.fromData({}));
        };
        TableView.prototype.getIdName = function () {
            return this.elementIdName;
        };
        return TableView;
    }());
    FixedTables.TableView = TableView;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var Tbody = (function () {
        function Tbody(cells) {
            this.cells = cells;
        }
        Tbody.fromData = function (data) {
            return new Tbody([]);
        };
        Tbody.prototype.setCells = function (cells) {
            this.cells = cells;
        };
        Tbody.prototype.getCells = function (x, y) {
            return this.cells.filter(function (cell) {
                return (cell['x'] === x && cell['y'] === y);
            });
        };
        return Tbody;
    }());
    FixedTables.Tbody = Tbody;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var Thead = (function () {
        function Thead(lineNum, cells) {
            this.lineNum = lineNum;
            this.cells = cells;
        }
        Thead.fromData = function (data) {
            return new Thead(0, []);
        };
        Thead.prototype.setLineNumber = function (num) {
            this.lineNum = num;
        };
        Thead.prototype.setCells = function (cells) {
            this.cells = cells;
        };
        Thead.prototype.getCells = function (x, y) {
            return this.cells.filter(function (cell) {
                return (cell['x'] === x && cell['y'] === y);
            });
        };
        Thead.prototype.getFirstCell = function () {
            return this.cells.filter(function (cell) {
                return (cell['x'] === 0 && cell['y'] === 0);
            });
        };
        return Thead;
    }());
    FixedTables.Thead = Thead;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var FixedTableController = (function () {
        function FixedTableController(model, view) {
            this.model = model;
            this.view = view;
        }
        FixedTableController.prototype.setScrollEvent = function () {
            var tableView = this.view.getTableView();
            try {
                tableView.addEventListener('scroll', this.view.boxScroll, false);
            }
            catch (e) {
                tableView.attachEvent('onscroll', this.view.boxScroll());
            }
            console.log(tableView);
        };
        return FixedTableController;
    }());
    FixedTables.FixedTableController = FixedTableController;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var FixedTableModel = (function () {
        function FixedTableModel(option) {
            this.tableView = FixedTables.TableView.fromData(option);
        }
        FixedTableModel.prototype.getTableViewIdName = function () {
            return this.tableView.getIdName();
        };
        FixedTableModel.prototype.setTheadLength = function (num) {
            this.tableView.table.thead.setLineNumber(num);
        };
        FixedTableModel.prototype.setTheadCells = function (data) {
            this.tableView.table.thead.setCells(data);
        };
        FixedTableModel.prototype.setTbodyCells = function (data) {
            this.tableView.table.tbody.setCells(data);
        };
        FixedTableModel.prototype.getTheadCell = function (x, y) {
            return this.tableView.table.thead.getCells(x, y);
        };
        FixedTableModel.prototype.getTbodyCell = function (x, y) {
            return this.tableView.table.tbody.getCells(x, y);
        };
        FixedTableModel.prototype.getFirstCell = function () {
            return this.tableView.table.thead.getFirstCell();
        };
        return FixedTableModel;
    }());
    FixedTables.FixedTableModel = FixedTableModel;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var FixedTableView = (function () {
        function FixedTableView(model) {
            this.model = model;
            this.setElements();
            this.setModels();
            this.setStyle();
        }
        FixedTableView.prototype.setElements = function () {
            this.setTableView();
            this.setTable();
            this.setThead();
            this.setTbody();
        };
        FixedTableView.prototype.setModels = function () {
            this.setTheadLines();
            this.createTheadModel();
            this.createTbodyModel();
        };
        FixedTableView.prototype.setStyle = function () {
            this.setTheadFixedStyle();
            this.setTbodyFixedStyle();
            this.setScrollEvent();
        };
        FixedTableView.prototype.createTheadModel = function () {
            var tr = this.thead.querySelectorAll('tr'), th = this.thead.querySelectorAll('tr > *'), styles, cells = [];
            for (var i = 0; i < th.length; i++) {
                styles = th[i].currentStyle || document.defaultView.getComputedStyle(th[i], '');
                cells.push(FixedTables.Cell.fromData({
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
        };
        FixedTableView.prototype.createTbodyModel = function () {
            var tr = this.tbody.querySelectorAll('tr'), td, styles, cells = [];
            for (var i = 0; i < tr.length; i++) {
                td = tr[i].querySelectorAll('tr > *');
                for (var n = 0; n < td.length; n++) {
                    styles = td[n].currentStyle || document.defaultView.getComputedStyle(td[n], '');
                    cells.push(FixedTables.Cell.fromData({
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
        };
        FixedTableView.prototype.setTable = function () {
            this.table = this.tableView.querySelector('table');
        };
        FixedTableView.prototype.setThead = function () {
            this.thead = this.table.querySelector('thead');
        };
        FixedTableView.prototype.setTbody = function () {
            this.tbody = this.table.querySelector('tbody');
        };
        FixedTableView.prototype.setTableView = function () {
            this.tableView = document.getElementById(this.model.getTableViewIdName());
        };
        FixedTableView.prototype.setTheadLines = function () {
            this.model.setTheadLength(this.table.querySelectorAll('thead tr').length);
        };
        FixedTableView.prototype.setTheadFixedStyle = function () {
            var tr = this.thead.querySelectorAll('tr'), td, cell, cells = [];
            for (var i = 0; i < tr.length; i++) {
                td = tr[i].querySelectorAll('tr > *');
                for (var n = 0; n < td.length; n++) {
                    if (i == 0) {
                        cell = this.model.getTheadCell(n, i)[0];
                        td[n].style.width = cell.width + 'px';
                        console.log(cell);
                    }
                }
            }
        };
        FixedTableView.prototype.setTbodyFixedStyle = function () {
            var tr = this.tbody.querySelectorAll('tr'), td, angleCell = this.model.getFirstCell()[0], cell, cells = [];
            for (var i = 0; i < tr.length; i++) {
                td = tr[i].querySelectorAll('tr > *');
                for (var n = 0; n < td.length; n++) {
                    if (n == 0) {
                        td[n].style.width = angleCell.width + 'px';
                        td[n].style.position = 'absolute';
                        td[n].style.left = 0;
                    }
                }
            }
        };
        FixedTableView.prototype.setTbodyScrollStyle = function (left) {
            var tr = this.tbody.querySelectorAll('tr'), td, cell, cells = [];
            for (var i = 0; i < tr.length; i++) {
                td = tr[i].querySelectorAll('tr > *');
                for (var n = 0; n < td.length; n++) {
                    if (n == 0) {
                        td[n].style.left = left + 'px';
                    }
                }
            }
        };
        FixedTableView.prototype.setScrollEvent = function () {
            var that = this;
            try {
                this.tableView.addEventListener('scroll', function () {
                    that.boxScroll();
                }, false);
            }
            catch (e) {
            }
        };
        FixedTableView.prototype.getTableView = function () {
            return this.tableView;
        };
        FixedTableView.prototype.boxScroll = function () {
            this.setTbodyScrollStyle(this.tableView.scrollLeft);
            console.log(this.tableView.scrollLeft);
        };
        return FixedTableView;
    }());
    FixedTables.FixedTableView = FixedTableView;
})(FixedTables || (FixedTables = {}));
