'use strict';
var e = eval, global = e('this');
var FixedTables;
(function (FixedTables) {
    var FixedTable = (function () {
        function FixedTable(option) {
            this.model = new FixedTables.FixedTableModel(option);
            this.view = new FixedTables.FixedTableView(this.model);
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
    var FixedTableModel = (function () {
        function FixedTableModel(option) {
            this.tableView = FixedTables.TableView.fromData(option);
        }
        FixedTableModel.prototype.setTableStyles = function (styles) {
            this.tableView.table.setStyles(styles);
            this.setTheadStyles();
        };
        FixedTableModel.prototype.getTableViewIdName = function () {
            return this.tableView.getIdName();
        };
        FixedTableModel.prototype.setTheadLength = function (num) {
            this.tableView.table.thead.setLineNumber(num);
        };
        FixedTableModel.prototype.setTheadStyles = function () {
            this.tableView.table.thead.setStyles(this.tableView.table);
        };
        FixedTableModel.prototype.setTbodyStyles = function () {
            this.tableView.table.tbody.setStyles(this.tableView.table);
        };
        FixedTableModel.prototype.getTheadWidth = function () {
            return this.tableView.table.thead.getWidth();
        };
        FixedTableModel.prototype.setTheadCells = function (data) {
            this.tableView.table.thead.setCells(data);
        };
        FixedTableModel.prototype.setTbodyCells = function (data) {
            this.tableView.table.tbody.setCells(data);
        };
        FixedTableModel.prototype.getTbodyPaddingLeft = function () {
            return this.tableView.table.tbody.getPaddingLeft();
        };
        FixedTableModel.prototype.getTbodyWidth = function () {
            return this.tableView.table.tbody.getTbodyWidth();
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
        function Table(thead, tbody, width, outerWidth, paddingTop, paddingRight, paddingBottom, paddingLeft, borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth) {
            this.thead = thead;
            this.tbody = tbody;
            this.width = width;
            this.outerWidth = outerWidth;
            this.paddingTop = paddingTop;
            this.paddingRight = paddingRight;
            this.paddingBottom = paddingBottom;
            this.paddingLeft = paddingLeft;
            this.borderTopWidth = borderTopWidth;
            this.borderRightWidth = borderRightWidth;
            this.borderBottomWidth = borderBottomWidth;
            this.borderLeftWidth = borderLeftWidth;
        }
        Table.fromData = function (data) {
            return new Table(FixedTables.Thead.fromData({}), FixedTables.Tbody.fromData({}), data.width ? data.width : 0, data.outerWidth ? data.outerWidth : 0, data.paddingTop ? data.paddingTop : '', data.paddingRight ? data.paddingRight : '', data.paddingBottom ? data.paddingBottom : '', data.paddingLeft ? data.paddingLeft : '', data.borderTopWidth ? data.borderTopWidth : '', data.borderRightWidth ? data.borderRightWidth : '', data.borderBottomWidth ? data.borderBottomWidth : '', data.borderLeftWidth ? data.borderLeftWidth : '');
        };
        Table.prototype.setStyles = function (styles) {
            this.width = parseInt(styles["width"], 10);
            this.paddingTop = styles["padding-top"];
            this.paddingRight = styles["padding-right"];
            this.paddingBottom = styles["padding-bottom"];
            this.paddingLeft = styles["padding-left"];
            this.borderTopWidth = styles["border-top-width"];
            this.borderRightWidth = styles["border-right-width"];
            this.borderBottomWidth = styles["border-bottom-width"];
            this.borderLeftWidth = styles["border-left-width"];
            this.outerWidth = this.getOuterWidth();
        };
        Table.prototype.getOuterWidth = function () {
            return this.width + (parseInt(this.paddingLeft, 10) + parseInt(this.paddingRight, 10)
                + parseInt(this.borderLeftWidth, 10) + parseInt(this.borderRightWidth, 10));
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
        function Tbody(cells, width, outerWidth, borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth, paddingLeft) {
            this.cells = cells;
            this.width = width;
            this.outerWidth = outerWidth;
            this.borderTopWidth = borderTopWidth;
            this.borderRightWidth = borderRightWidth;
            this.borderBottomWidth = borderBottomWidth;
            this.borderLeftWidth = borderLeftWidth;
            this.paddingLeft = paddingLeft;
        }
        Tbody.fromData = function (data) {
            return new Tbody([], data.width ? data.width : 0, data.outerWidth ? data.outerWidth : 0, data.borderTopWidth ? data.borderTopWidth : '', data.borderRightWidth ? data.borderRightWidth : '', data.borderBottomWidth ? data.borderBottomWidth : '', data.borderLeftWidth ? data.borderLeftWidth : '', 0);
        };
        Tbody.prototype.setCells = function (cells) {
            this.cells = cells;
        };
        Tbody.prototype.getCells = function (x, y) {
            return this.cells.filter(function (cell) {
                return (cell['x'] === x && cell['y'] === y);
            });
        };
        Tbody.prototype.setStyles = function (table) {
            this.paddingLeft = table.thead.cells[0].outerWidth;
            this.width = table.outerWidth - table.thead.cells[0].outerWidth;
        };
        Tbody.prototype.getPaddingLeft = function () {
            return this.paddingLeft;
        };
        Tbody.prototype.getTbodyWidth = function () {
            return this.width;
        };
        return Tbody;
    }());
    FixedTables.Tbody = Tbody;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var Thead = (function () {
        function Thead(lineNum, cells, width, outerWidth, borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth) {
            this.lineNum = lineNum;
            this.cells = cells;
            this.width = width;
            this.outerWidth = outerWidth;
            this.borderTopWidth = borderTopWidth;
            this.borderRightWidth = borderRightWidth;
            this.borderBottomWidth = borderBottomWidth;
            this.borderLeftWidth = borderLeftWidth;
        }
        Thead.fromData = function (data) {
            return new Thead(0, [], data.width ? data.width : 0, data.outerWidth ? data.outerWidth : 0, data.borderTopWidth ? data.borderTopWidth : '', data.borderRightWidth ? data.borderRightWidth : '', data.borderBottomWidth ? data.borderBottomWidth : '', data.borderLeftWidth ? data.borderLeftWidth : '');
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
        Thead.prototype.setStyles = function (table) {
            if (this.borderLeftWidth) {
                this.width = table.outerWidth - (parseInt(this.borderLeftWidth, 10) + parseInt(this.borderRightWidth, 10));
            }
            else {
                this.width = table.outerWidth;
            }
        };
        Thead.prototype.getWidth = function () {
            return this.width;
        };
        return Thead;
    }());
    FixedTables.Thead = Thead;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var FixedTableView = (function () {
        function FixedTableView(model) {
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
        FixedTableView.prototype.setElements = function () {
            this.tableView = document.getElementById(this.model.getTableViewIdName());
            this.table = this.tableView.querySelector('table');
            this.thead = this.table.querySelector('thead');
            this.tbody = this.table.querySelector('tbody');
            var tableStyles = this.table.currentStyle || document.defaultView.getComputedStyle(this.table, '');
            this.model.setTableStyles(tableStyles);
        };
        FixedTableView.prototype.setTheadStyle = function () {
            this.thead.style.position = 'absolute';
            this.thead.style.top = '0';
            this.thead.style.width = this.model.getTheadWidth() + 'px';
            this.thead.style.zIndex = '10';
        };
        FixedTableView.prototype.setTbodyStyle = function () {
            this.model.setTbodyStyles();
            this.tbody.style.display = 'block';
            this.tbody.style.width = this.model.getTbodyWidth() + 'px';
            this.tbody.style.paddingLeft = this.model.getTbodyPaddingLeft() + 'px';
        };
        FixedTableView.prototype.setModels = function () {
            this.createTbodyModel();
        };
        FixedTableView.prototype.setStyle = function () {
            this.setTableViewStyle();
            this.setTheadFixedStyle();
            this.setTbodyFixedStyle();
        };
        FixedTableView.prototype.setEvent = function () {
            this.setScrollEvent();
        };
        FixedTableView.prototype.getCreateCellModel = function (parent, elements, styles, i, n) {
            return FixedTables.Cell.fromData({
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
        };
        FixedTableView.prototype.createTheadModel = function () {
            var tr = this.thead.querySelectorAll('tr'), th = this.thead.querySelectorAll('tr > *'), styles, cells = [];
            for (var i = 0; i < th.length; i++) {
                styles = th[i].currentStyle || document.defaultView.getComputedStyle(th[i], '');
                cells.push(this.getCreateCellModel('thead', th, styles, i, 0));
            }
            this.model.setTheadCells(cells);
        };
        FixedTableView.prototype.createTbodyModel = function () {
            var tr = this.tbody.querySelectorAll('tr'), td, styles, cells = [];
            for (var n = 0; n < tr.length; n++) {
                td = tr[n].querySelectorAll('tr > *');
                for (var i = 0; i < td.length; i++) {
                    styles = td[i].currentStyle || document.defaultView.getComputedStyle(td[i], '');
                    cells.push(this.getCreateCellModel('tbody', td, styles, i, n));
                }
            }
            this.model.setTbodyCells(cells);
        };
        FixedTableView.prototype.setTheadLines = function () {
            this.model.setTheadLength(this.table.querySelectorAll('thead tr').length);
        };
        FixedTableView.prototype.setTableViewStyle = function () {
            this.tableView.style.position = 'relative';
            this.tableView.style.overflow = 'scroll';
            this.table.style.tableLayout = 'fixed';
        };
        FixedTableView.prototype.setTheadFixedStyle = function () {
            var tr = this.thead.querySelectorAll('tr'), td, cell;
            for (var i = 0; i < tr.length; i++) {
                td = tr[i].querySelectorAll('tr > *');
                for (var n = 0; n < td.length; n++) {
                    if (i == 0) {
                        cell = this.model.getTheadCell(n, i)[0];
                        td[n].style.width = cell.width + 'px';
                    }
                }
            }
        };
        FixedTableView.prototype.setTbodyFixedStyle = function () {
            var tr = this.tbody.querySelectorAll('tr'), td, angleCell = this.model.getFirstCell()[0];
            for (var i = 0; i < tr.length; i++) {
                td = tr[i].querySelectorAll('tr > *');
                for (var n = 0; n < td.length; n++) {
                    if (n == 0) {
                        td[n].style.width = angleCell.width + 'px';
                        td[n].style.position = 'absolute';
                        td[n].style.left = '0';
                    }
                }
            }
        };
        FixedTableView.prototype.setTbodyScrollStyle = function (left) {
            var tr = this.tbody.querySelectorAll('tr'), td;
            for (var i = 0; i < tr.length; i++) {
                td = tr[i].querySelectorAll('tr > *');
                for (var n = 0; n < td.length; n++) {
                    if (n == 0) {
                        td[n].style.left = left + 'px';
                    }
                }
            }
        };
        FixedTableView.prototype.setTheadScrollStyle = function (top) {
            this.thead.style.top = top + 'px';
        };
        FixedTableView.prototype.setScrollEvent = function () {
            var that = this;
            this.tableView.addEventListener('scroll', function () {
                that.boxScroll();
            }, false);
        };
        FixedTableView.prototype.getTableView = function () {
            return this.tableView;
        };
        FixedTableView.prototype.boxScroll = function () {
            this.setTbodyScrollStyle(this.tableView.scrollLeft);
            this.setTheadScrollStyle(this.tableView.scrollTop);
        };
        return FixedTableView;
    }());
    FixedTables.FixedTableView = FixedTableView;
})(FixedTables || (FixedTables = {}));
