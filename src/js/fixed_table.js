'use strict';
var e = eval, global = e('this');
var FixedTables;
(function (FixedTables) {
    var FixedTable = (function () {
        function FixedTable(option) {
            if (FixedTable._instance) {
                if (option !== void 0) {
                    FixedTable._instance.model = new FixedTables.FixedTableModel(option);
                    FixedTable._instance.view = new FixedTables.FixedTableView(FixedTable._instance.model);
                }
                return FixedTable._instance;
            }
            else {
                this.model = new FixedTables.FixedTableModel(option);
                this.view = new FixedTables.FixedTableView(this.model);
                FixedTable._instance = this;
            }
        }
        FixedTable.prototype.chengeMode = function (bool) {
            this.model.chengeMode(bool);
            this.view.resizeContainer();
        };
        FixedTable._instance = null;
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
    var PIXEL_REG = /.*px/;
    var Cell = (function () {
        function Cell(id, isFixed, parent, tagName, x, y, width, height, outerWidth, outerHeight, paddingTop, paddingRight, paddingBottom, paddingLeft, borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth, tHeadCell) {
            this.id = id;
            this.isFixed = isFixed;
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
            this.tHeadCell = tHeadCell;
            this.id = this.createId();
            this.width = this.getWidth();
            this.height = this.getHeight();
        }
        Cell.fromData = function (data) {
            return new Cell(data.id ? data.id : 0, data.isFixed ? data.isFixed : Boolean(data.parent === 'tbody' && data.x === 0), data.parent ? data.parent : '', data.tagName ? data.tagName : '', data.x ? data.x : 0, data.y ? data.y : 0, data.width ? data.width : 0, data.height ? data.height : 0, data.outerWidth ? data.outerWidth : 0, data.outerHeight ? data.outerHeight : 0, data.paddingTop ? data.paddingTop : '', data.paddingRight ? data.paddingRight : '', data.paddingBottom ? data.paddingBottom : '', data.paddingLeft ? data.paddingLeft : '', data.borderTopWidth && PIXEL_REG.test(data.borderTopWidth) ? data.borderTopWidth : '0px', data.borderRightWidth && PIXEL_REG.test(data.borderRightWidth) ? data.borderRightWidth : '0px', data.borderBottomWidth && PIXEL_REG.test(data.borderBottomWidth) ? data.borderBottomWidth : '0px', data.borderLeftWidth && PIXEL_REG.test(data.borderLeftWidth) ? data.borderLeftWidth : '0px', data.tHeadCell ? data.tHeadCell : null);
        };
        Cell.prototype.createId = function () {
            return ++created_num;
        };
        Cell.prototype.getWidth = function () {
            if (this.parent === 'thead') {
                return this.outerWidth - (parseInt(this.paddingRight, 10) + parseInt(this.paddingLeft, 10)
                    + parseInt(this.borderRightWidth, 10) + parseInt(this.borderLeftWidth, 10));
            }
            else {
                return this.tHeadCell.outerWidth - (parseInt(this.paddingRight, 10) + parseInt(this.paddingLeft, 10)
                    + parseInt(this.borderRightWidth, 10) + parseInt(this.borderLeftWidth, 10));
            }
        };
        Cell.prototype.getCSSWidth = function () {
            return this.width + 'px';
        };
        Cell.prototype.getHeight = function (cell) {
            if (this.isFixed && cell) {
                return cell.outerHeight - (parseInt(this.paddingTop, 10) + parseInt(this.paddingBottom, 10)
                    + parseInt(this.borderTopWidth, 10) + parseInt(this.borderBottomWidth, 10));
            }
            else {
                return this.outerHeight - (parseInt(this.paddingTop, 10) + parseInt(this.paddingBottom, 10)
                    + parseInt(this.borderTopWidth, 10) + parseInt(this.borderBottomWidth, 10));
            }
        };
        Cell.prototype.getCSSHeight = function (cell) {
            if (cell) {
                this.height = this.getHeight(cell);
                return this.height + 'px';
            }
            else {
                return this.height + 'px';
            }
        };
        return Cell;
    }());
    FixedTables.Cell = Cell;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var PIXEL_REG = /.*px/;
    var Table = (function () {
        function Table(thead, tbody, width, outerWidth, paddingTop, paddingRight, paddingBottom, paddingLeft, borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth, borderCollapse, borderSpacing) {
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
            this.borderCollapse = borderCollapse;
            this.borderSpacing = borderSpacing;
        }
        Table.fromData = function (data) {
            return new Table(FixedTables.Thead.fromData({}), FixedTables.Tbody.fromData({}), data.width ? data.width : 0, data.outerWidth ? data.outerWidth : 0, data.paddingTop ? data.paddingTop : '', data.paddingRight ? data.paddingRight : '', data.paddingBottom ? data.paddingBottom : '', data.paddingLeft ? data.paddingLeft : '', data.borderTopWidth && PIXEL_REG.test(data.borderTopWidth) ? data.borderTopWidth : '0', data.borderRightWidth && PIXEL_REG.test(data.borderRightWidth) ? data.borderRightWidth : '0', data.borderBottomWidth && PIXEL_REG.test(data.borderBottomWidth) ? data.borderBottomWidth : '0', data.borderLeftWidth && PIXEL_REG.test(data.borderLeftWidth) ? data.borderLeftWidth : '0', data.borderCollapse ? data.borderCollapse : this.CSS_BORDER_COLLAPSE_VALUE, data.borderSpacing ? data.borderSpacing : this.CSS_BORDER_SPACING_VALUE);
        };
        Table.prototype.setStyles = function (styles) {
            this.width = parseInt(styles["width"], 10);
            this.paddingTop = styles["padding-top"];
            this.paddingRight = styles["padding-right"];
            this.paddingBottom = styles["padding-bottom"];
            this.paddingLeft = styles["padding-left"];
            this.borderTopWidth = styles["border-top-width"] && PIXEL_REG.test(styles["border-top-width"]) ? styles["border-top-width"] : '0';
            this.borderRightWidth = styles["border-right-width"] && PIXEL_REG.test(styles["border-right-width"]) ? styles["border-right-width"] : '0';
            this.borderBottomWidth = styles["border-bottom-width"] && PIXEL_REG.test(styles["border-bottom-width"]) ? styles["border-bottom-width"] : '0';
            this.borderLeftWidth = styles["border-left-width"] && PIXEL_REG.test(styles["border-left-width"]) ? styles["border-left-width"] : '0';
            this.outerWidth = this.getOuterWidth();
            this.setTheadFixedModel();
        };
        Table.prototype.setTheadFixedModel = function () {
            this.thead.setStyles(this);
        };
        Table.prototype.setTbodyFixedModel = function () {
            this.tbody.setStyles(this);
        };
        Table.prototype.getOuterWidth = function () {
            return this.width + (parseInt(this.paddingLeft, 10) + parseInt(this.paddingRight, 10)
                + parseInt(this.borderLeftWidth, 10) + parseInt(this.borderRightWidth, 10));
        };
        Table.CSS_BORDER_COLLAPSE_VALUE = 'collapse';
        Table.CSS_BORDER_SPACING_VALUE = '0';
        return Table;
    }());
    FixedTables.Table = Table;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var TableView = (function () {
        function TableView(elementIdName, table, isFullMode, fixedLineNum, fixedColumnNum, offsetTop, offsetLeft, position, overflow) {
            this.elementIdName = elementIdName;
            this.table = table;
            this.isFullMode = isFullMode;
            this.fixedLineNum = fixedLineNum;
            this.fixedColumnNum = fixedColumnNum;
            this.offsetTop = offsetTop;
            this.offsetLeft = offsetLeft;
            this.position = position;
            this.overflow = overflow;
        }
        TableView.fromData = function (data) {
            return new TableView(data.id ? data.id : 'fixedTable', FixedTables.Table.fromData({}), data.fullMode ? data.fullMode : false, data.fixedLineNum ? data.fixedLineNum : 1, data.fixedColumnNum ? data.fixedColumnNum : 1, 0, 0, this.CSS_POSITION_VALUE, this.CSS_OVERFLOW_VALUE);
        };
        TableView.prototype.getIdName = function () {
            return this.elementIdName;
        };
        TableView.prototype.setOffset = function (rect) {
            this.offsetTop = rect.top;
            this.offsetLeft = rect.left;
        };
        TableView.prototype.getFullModeSize = function (windowWidth, windowHeight) {
            return {
                width: windowWidth - this.offsetLeft,
                height: windowHeight - this.offsetTop
            };
        };
        TableView.prototype.chengeMode = function (bool) {
            this.isFullMode = bool;
        };
        TableView.CSS_POSITION_VALUE = 'relative';
        TableView.CSS_OVERFLOW_VALUE = 'auto';
        return TableView;
    }());
    FixedTables.TableView = TableView;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var PIXEL_REG = /.*px/;
    var Tbody = (function () {
        function Tbody(cells, width, outerWidth, borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth, paddingLeft, marginTop, display, fixedPositon, fixedLeft) {
            this.cells = cells;
            this.width = width;
            this.outerWidth = outerWidth;
            this.borderTopWidth = borderTopWidth;
            this.borderRightWidth = borderRightWidth;
            this.borderBottomWidth = borderBottomWidth;
            this.borderLeftWidth = borderLeftWidth;
            this.paddingLeft = paddingLeft;
            this.marginTop = marginTop;
            this.display = display;
            this.fixedPositon = fixedPositon;
            this.fixedLeft = fixedLeft;
        }
        Tbody.fromData = function (data) {
            return new Tbody([], data.width ? data.width : 0, data.outerWidth ? data.outerWidth : 0, data.borderTopWidth && PIXEL_REG.test(data.borderTopWidth) ? data.borderTopWidth : '0', data.borderRightWidth && PIXEL_REG.test(data.borderRightWidth) ? data.borderRightWidth : '0', data.borderBottomWidth && PIXEL_REG.test(data.borderBottomWidth) ? data.borderBottomWidth : '0', data.borderLeftWidth && PIXEL_REG.test(data.borderLeftWidth) ? data.borderLeftWidth : '0', 0, 0, this.CSS_DISPLAY_VALUE, this.FIXED_CSS_POSITION_VALUE, this.FIXED_CSS_LEFT_VALUE);
        };
        Tbody.prototype.setCells = function (cells) {
            this.cells = cells;
        };
        Tbody.prototype.getCells = function (x, y) {
            return this.cells.filter(function (cell) {
                return (cell['x'] === x && cell['y'] === y);
            });
        };
        Tbody.prototype.getCell = function (x, y) {
            return this.getCells(x, y)[0];
        };
        Tbody.prototype.setStyles = function (table) {
            this.paddingLeft = table.thead.cells[0].outerWidth;
            this.marginTop = table.thead.outerHeight;
            this.width = table.outerWidth;
        };
        Tbody.prototype.getPaddingLeft = function () {
            return this.paddingLeft;
        };
        Tbody.prototype.getCSSPaddingLeft = function () {
            return this.paddingLeft + 'px';
        };
        Tbody.prototype.getCSSMarginTop = function () {
            return this.marginTop + 'px';
        };
        Tbody.prototype.getTbodyWidth = function () {
            return this.width;
        };
        Tbody.prototype.getCSSWidth = function () {
            return this.width + 'px';
        };
        Tbody.CSS_DISPLAY_VALUE = 'block';
        Tbody.FIXED_CSS_POSITION_VALUE = 'absolute';
        Tbody.FIXED_CSS_LEFT_VALUE = '0';
        return Tbody;
    }());
    FixedTables.Tbody = Tbody;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var PIXEL_REG = /.*px/;
    var Thead = (function () {
        function Thead(lineNum, cells, width, outerWidth, outerHeight, borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth, position, top, zIndex) {
            this.lineNum = lineNum;
            this.cells = cells;
            this.width = width;
            this.outerWidth = outerWidth;
            this.outerHeight = outerHeight;
            this.borderTopWidth = borderTopWidth;
            this.borderRightWidth = borderRightWidth;
            this.borderBottomWidth = borderBottomWidth;
            this.borderLeftWidth = borderLeftWidth;
            this.position = position;
            this.top = top;
            this.zIndex = zIndex;
        }
        Thead.fromData = function (data) {
            return new Thead(0, [], data.width ? data.width : 0, data.outerWidth ? data.outerWidth : 0, data.outerHeight ? data.outerHeight : 0, data.borderTopWidth && PIXEL_REG.test(data.borderTopWidth) ? data.borderTopWidth : '0', data.borderRightWidth && PIXEL_REG.test(data.borderRightWidth) ? data.borderRightWidth : '0', data.borderBottomWidth && PIXEL_REG.test(data.borderBottomWidth) ? data.borderBottomWidth : '0', data.borderLeftWidth && PIXEL_REG.test(data.borderLeftWidth) ? data.borderLeftWidth : '0', this.CSS_POSITION_VALUE, this.CSS_TOP_VALUE, this.CSS_ZINDEX_VALUE);
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
        Thead.prototype.getCell = function (x, y) {
            return this.getCells(x, y)[0];
        };
        Thead.prototype.setStyles = function (table) {
            if (this.borderLeftWidth) {
                this.width = table.outerWidth - (parseInt(this.borderLeftWidth, 10) + parseInt(this.borderRightWidth, 10));
            }
            else {
                this.width = table.outerWidth;
            }
        };
        Thead.prototype.setSelfStyles = function (thead) {
            this.borderBottomWidth = thead.borderBottomWidth;
            this.borderLeftWidth = thead.borderLeftWidth;
            this.borderRightWidth = thead.borderRightWidth;
            this.borderTopWidth = thead.borderTopWidth;
            this.outerWidth = thead.outerWidth;
            this.outerHeight = thead.outerHeight;
        };
        Thead.prototype.getWidth = function () {
            return this.width;
        };
        Thead.prototype.getCSSWidth = function () {
            return this.width + 'px';
        };
        Thead.CSS_POSITION_VALUE = 'absolute';
        Thead.CSS_TOP_VALUE = '0';
        Thead.CSS_ZINDEX_VALUE = '10';
        return Thead;
    }());
    FixedTables.Thead = Thead;
})(FixedTables || (FixedTables = {}));
var FixedTables;
(function (FixedTables) {
    var FixedTableModel = (function () {
        function FixedTableModel(option) {
            if (option !== void 0) {
                this.tableView = FixedTables.TableView.fromData(option);
            }
            else {
                this.tableView = FixedTables.TableView.fromData({});
            }
        }
        FixedTableModel.prototype.getTableViewModel = function () {
            return this.tableView;
        };
        FixedTableModel.prototype.getTableModel = function () {
            return this.tableView.table;
        };
        FixedTableModel.prototype.getTheadModel = function () {
            return this.tableView.table.thead;
        };
        FixedTableModel.prototype.getTbodyModel = function () {
            return this.tableView.table.tbody;
        };
        FixedTableModel.prototype.chengeMode = function (bool) {
            this.tableView.chengeMode(bool);
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
            this.tableViewModel = this.model.getTableViewModel();
            this.tableModel = this.model.getTableModel();
            this.theadModel = this.model.getTheadModel();
            this.tbodyModel = this.model.getTbodyModel();
            this.setElements();
            if (!this.tableView)
                return;
            this.init();
        }
        FixedTableView.prototype.init = function () {
            this.setTableViewModel();
            this.setTableViewStyle();
            this.setTableStyle();
            this.setTableModel();
            this.setTheadModel();
            this.setTbodyModel();
            this.setTheadFixedStyle();
            this.setTheadStyle();
            this.setTbodyStyle();
            this.setTbodyFixedStyle();
            this.setEventHandler();
        };
        FixedTableView.prototype.setElements = function () {
            this.tableView = document.getElementById(this.tableViewModel.getIdName());
            if (!this.tableView)
                return;
            this.table = this.tableView.querySelector('table');
            this.thead = this.table.querySelector('thead');
            this.tbody = this.table.querySelector('tbody');
        };
        FixedTableView.prototype.setTableViewModel = function () {
            this.tableViewModel.setOffset(this.tableView.getBoundingClientRect());
        };
        FixedTableView.prototype.setTableViewStyle = function () {
            this.tableView.style.position = this.tableViewModel.position;
            this.tableView.style.overflow = this.tableViewModel.overflow;
            if (this.tableViewModel.isFullMode) {
                this.setTableViewFullModeStyle();
            }
        };
        FixedTableView.prototype.setTableViewFullModeStyle = function () {
            for (var i = 0; i < 2; i++) {
                var viewSize = this.tableViewModel.getFullModeSize(document.body.clientWidth, document.body.clientHeight);
                this.tableView.style.width = viewSize.width + 'px';
                this.tableView.style.height = viewSize.height + 'px';
            }
        };
        FixedTableView.prototype.setTableStyle = function () {
            this.table.style.borderCollapse = this.tableModel.borderCollapse;
            this.table.style.borderSpacing = this.tableModel.borderSpacing;
        };
        FixedTableView.prototype.setTableModel = function () {
            var tableStyles = this.table.currentStyle || document.defaultView.getComputedStyle(this.table, '');
            this.tableModel.setStyles(tableStyles);
        };
        FixedTableView.prototype.setTheadStyle = function () {
            this.thead.style.position = this.theadModel.position;
            this.thead.style.top = this.theadModel.top;
            this.thead.style.width = this.theadModel.getCSSWidth();
            this.thead.style.zIndex = this.theadModel.zIndex;
            this.theadModel.setSelfStyles(this.getCreateTheadModel(this.thead, this.thead.currentStyle || document.defaultView.getComputedStyle(this.thead, '')));
        };
        FixedTableView.prototype.setTheadModel = function () {
            this.theadModel.setLineNumber(this.table.querySelectorAll('thead tr').length);
            this.theadModel.setCells(this.createTheadCellsModel());
        };
        FixedTableView.prototype.createTheadCellsModel = function () {
            var tr = this.thead.querySelectorAll('tr'), th = this.thead.querySelectorAll('tr > *'), styles, cells = [];
            for (var i = 0; i < th.length; i++) {
                styles = th[i].currentStyle || document.defaultView.getComputedStyle(th[i], '');
                cells.push(this.getCreateCellModel('thead', th, styles, i, 0));
            }
            return cells;
        };
        FixedTableView.prototype.getCreateTheadModel = function (elements, styles) {
            return FixedTables.Thead.fromData({
                outerWidth: elements.offsetWidth,
                outerHeight: elements.offsetHeight,
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
        FixedTableView.prototype.setTbodyStyle = function () {
            this.tableModel.setTbodyFixedModel();
            this.tbody.style.display = this.tbodyModel.display;
            this.tbody.style.width = this.tbodyModel.width + 'px';
            this.tbody.style.marginTop = this.tbodyModel.getCSSMarginTop();
        };
        FixedTableView.prototype.setTbodyModel = function () {
            this.tbodyModel.setCells(this.createTbodyCellsModel());
        };
        FixedTableView.prototype.createTbodyCellsModel = function () {
            var tr = this.tbody.querySelectorAll('tr'), td, styles, cells = [];
            for (var y = 0; y < tr.length; y++) {
                td = this.filterElementTdTh(tr[y].querySelectorAll('tr > *'));
                for (var x = 0; x < td.length; x++) {
                    styles = td[x].currentStyle || document.defaultView.getComputedStyle(td[x], '');
                    cells.push(this.getCreateCellModel('tbody', td, styles, x, y));
                }
            }
            return cells;
        };
        FixedTableView.prototype.getCreateCellModel = function (parent, elements, styles, x, y) {
            return FixedTables.Cell.fromData({
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
                borderLeftWidth: styles["border-left-width"],
                tHeadCell: parent === 'tbody' ? this.theadModel.getCell(x, 0) : null
            });
        };
        FixedTableView.prototype.setTheadFixedStyle = function () {
            var tr = this.thead.querySelectorAll('tr'), td, cell;
            for (var y = 0; y < tr.length; y++) {
                td = tr[y].querySelectorAll('tr > *');
                for (var x = 0; x < td.length; x++) {
                    if (y == 0) {
                        cell = this.theadModel.getCell(x, y);
                        td[x].style.width = cell.getCSSWidth();
                    }
                }
            }
        };
        FixedTableView.prototype.setTbodyFixedStyle = function () {
            var tr = this.tbody.querySelectorAll('tr'), td;
            for (var y = 0; y < tr.length; y++) {
                td = this.filterElementTdTh(tr[y].querySelectorAll('tr > *'));
                tr[y].style.display = this.tbodyModel.display;
                tr[y].style.paddingLeft = this.tbodyModel.getCSSPaddingLeft();
                for (var x = 0; x < td.length; x++) {
                    var cell = this.tbodyModel.getCell(x, y);
                    if (x == 0) {
                        var secondCell = this.tbodyModel.getCell(1, y);
                        td[x].style.width = cell.getCSSWidth();
                        td[x].style.height = cell.getCSSHeight(secondCell);
                        td[x].style.position = this.tbodyModel.fixedPositon;
                        td[x].style.left = this.tbodyModel.fixedLeft;
                    }
                    else {
                        td[x].style.width = cell.getCSSWidth();
                    }
                }
            }
        };
        FixedTableView.prototype.filterElementTdTh = function (elements) {
            var nodeList = [];
            for (var i = 0; i < elements.length; i++) {
                if (elements[i]['tagName'] === 'TH' || elements[i]['tagName'] === 'TD') {
                    nodeList.push(elements[i]);
                }
            }
            return nodeList;
        };
        FixedTableView.prototype.setEventHandler = function () {
            this.setScrollEvent();
            this.setWindowResizeEvent();
        };
        FixedTableView.prototype.setScrollEvent = function () {
            var _this = this;
            this.tableView.addEventListener('scroll', function () {
                _this.boxScroll();
            }, false);
        };
        FixedTableView.prototype.setWindowResizeEvent = function () {
            var _this = this;
            window.addEventListener('resize', function () {
                _this.windowResize();
            }, false);
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
        FixedTableView.prototype.boxScroll = function () {
            this.setTbodyScrollStyle(this.tableView.scrollLeft);
            this.setTheadScrollStyle(this.tableView.scrollTop);
        };
        FixedTableView.prototype.windowResize = function () {
            if (this.tableViewModel.isFullMode) {
                this.setTableViewFullModeStyle();
            }
        };
        FixedTableView.prototype.resizeContainer = function () {
            this.setTableViewModel();
            this.setTableViewStyle();
        };
        return FixedTableView;
    }());
    FixedTables.FixedTableView = FixedTableView;
})(FixedTables || (FixedTables = {}));
