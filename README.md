# Fixed Table JS
FixedTableJS - Fixed Table Layout JavaScript Library

[![GitHub version](https://badge.fury.io/gh/webcyou%2Ffixed-table-js.svg)](https://badge.fury.io/gh/webcyou%2Ffixed-table-js)
[![npm version](https://badge.fury.io/js/fixed-table-js.svg)](https://badge.fury.io/js/fixed-table-js)


![](http://webcyou.com/fixed_table_js/img/fixed_table.png)

## これは何？
tableレイアウトで、タイトル項目のカラムを簡単に固定表示を行える、JavaScriptライブラリです。

## demo
[デモページ](https://webcyou.github.io/fixed-table-js/)


## Support Browsers
**Mac**

| ![](./docs/img/icon/icon_chrome.png) | ![](./docs/img/icon/icon_firefox.png) | ![](./docs/img/icon/icon_safari.png) | ![](./docs/img/icon/icon_opera.png)  | 
| :---------------: | :---------------:| :---------------:| :---------------:|
| 52.0.2743.82 ~ | 47.0.1 ~ | 9.1.2 ~ | 39.0 ~ |

**Windows**

| ![](./docs/img/icon/icon_chrome.png) | ![](./docs/img/icon/icon_firefox.png) | ![](./docs/img/icon/icon_ie.png) | ![](./docs/img/icon/icon_edge01.png) | ![](./docs/img/icon/icon_opera.png) | 
| :---------------: | :---------------:| :---------------:| :---------------:|:---------------:|
| 52.0.2743.116 m ~ | 48.0.1 ~ | 11 | 25.10586.0.0 | 39.0 ~ |


##  Quick start

**Clone the repo:**
```
git clone git@github.com:webcyou/fixed-table-js.git
```

**Install with [Bower](http://bower.io):**
```
bower install fixed-table.js
```

**Install with [npm](https://www.npmjs.com):**

```
npm install fixed-table-js
```


## Basic Usage

```
<script src="fixed_table.js"></script>
```

it's a standard table layout.

**HTML**
```
<div id="fixedTable">
    <table>
        <thead>....</thead>
        <tbody>
            <tr>
                <th>...</th> or <td>...</td>
                ....
            </tr>
        </tbody>
    </table>
</div>
```
`<thead></thead>`と、`<tbody><tr></tr></tbody>`の最初の子要素が固定されます。


Singleton Object

```
new FixedTable();
```

![](http://webcyou.com/fixed_table_js/img/f_t_01.png)


**argument**

```
new FixedTable(option);
```

### Table Box Full Mode

```
new FixedTable({ fullMode: true; });
```

![](http://webcyou.com/fixed_table_js/img/f_t_02.png)

## Option Parameters Reference

| ParametersName | type         | DefaultValue | Details           | 
| -------------- |:------------:|:------------:|------------------ |
| id             | string       | 'fixedTable' |    CSS ID Name    |
| fullMode       | boolean      | false        | window full size |
| click          | boolean      | false        | click event callBack Function |


## Public Function
| Function Name  | Argument           | Argument Type      | Details           | 
| -------------- |:------------------:|:------------------:|------------------ |
| changeMode     | true, false        | boolean            | テーブル表示モード切り替え |
| setCellStyle   | cell style data    | object             | cellのstyleを切り替え |
| click          | callback           | Function           | click event callBack Function |



## CallBack Function

```
fixedTable.click(function(cell: Cell) {
  ...
});
```

## CallBack Parameters Reference
**Cell example**

```
Cell {
  id: 14,
  x: 2,
  y: 0,
  width: 228,
  height: 40,
  outerHeight: 57,
  outerWidth: 245,
  borderBottomWidth: "0px",
  borderLeftWidth: "1px",
  borderRightWidth: "0px",
  borderTopWidth: "1px",
  paddingBottom: "8px",
  paddingLeft: "8px",
  paddingRight: "8px",
  paddingTop: "8px",
  parent: "tbody",
  tHeadCell: Cell,
  tagName: "TD",
  isFixed: false,
  boxSizing: "content-box"
}
```

| Parameters Name    | Type               | Details                      | 
| ------------------ |:------------------:|:----------------------------:|
| id                 | number             | cell ID Number               |
| x                  | number             | x-coordinate                 |
| y                  | number             | y-coordinate                 |
| width              | number             | contents inner width         |
| height             | number             | contents inner height        |
| outerWidth         | number             | contents inner outerWidth    |
| outerHeight        | number             | contents inner outerHeight   |
| borderTopWidth     | string             | contents border top width    |
| borderRightWidth   | string             | contents border right width  |
| borderBottomWidth  | string             | contents border bottom width |
| borderLeftWidth    | string             | contents border left width   |
| paddingTop         | string             | contents padding top         |
| paddingRight       | string             | contents padding right       |
| paddingBottom      | string             | contents padding bottom      |
| paddingLeft        | string             | contents padding left        |
| parent             | string             | contents parent node(tbody or thead)|
| tHeadCell          | Cell               | contents thead cell node     |
| tagName            | string             | self tagName                 |
| isFixed            | boolean            | self fixed style             |
| boxSizing          | string             | boxSizing style             |

## Start develop
```
npm install
gulp 
```

```
Server started http://localhost:8088
LiveReload started on port 35729
```

## Start Test

**mocha**
```
npm run test
```

**mocha watch**
```
npm run test:watch
```


## Author
Daisuke Takayama
[Web帳](http://www.webcyou.com/)


## License
Copyright (c) 2016 Daisuke Takayama
Released under the [MIT license](http://opensource.org/licenses/mit-license.php)
