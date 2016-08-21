# Fixed Table JS
FixedTableJS - Fixed Table Layout JavaScript Library


![](http://webcyou.com/fixed_table_js/img/fixed_table.png)

### Support Browsers
**Mac**

| ![](./demo/img/icon/icon_chrome.png) |  ![](./demo/img/icon/icon_firefox.png)  | ![](./demo/img/icon/icon_safari.png)  | ![](./demo/img/icon/icon_ie.png)  |![](./demo/img/icon/icon_safari.png)  | 
| :---------------: | :---------------:| :---------------:| :---------------:| :---------------:|
| 52.0.2743.82 | 47.0.1 |  |  | |

**Windows**

| ![](./demo/img/icon/icon_chrome.png) |  ![](./demo/img/icon/icon_firefox.png)  | ![](./demo/img/icon/icon_safari.png)  | ![](./demo/img/icon/icon_ie.png)  |![](./demo/img/icon/icon_safari.png)  | 
| :---------------: | :---------------:| :---------------:| :---------------:| :---------------:|
|  |  |  |  | |


### これは何？
tableレイアウトで、タイトル項目のカラムを簡単に固定表示を行える、JavaScriptライブラリです。

### demo
[デモページ](https://webcyou.github.io/fixed_table/)

###  Quick start

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


### Basic Usage

```
<script src="fixed_table.js"></script>
```

HTML
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

### Option Parameters Reference

| ParametersName | type         | DefaultValue | Details                | 
| --------------- |:---------------:|:---------------:|-------------------- |
| id | string | 'fixedTable' | CSS ID Name |
| fullMode | boolean | false | window full size |


### Start develop
```
npm install
gulp 
```

```
Server started http://localhost:8088
LiveReload started on port 35729
```

### Start Test

**mocha**
```
gulp mocha
```

**mocha watch**
```
gulp mocha.watch
```


### Author
Daisuke Takayama
[Web帳](http://www.webcyou.com/)


### License
Copyright (c) 2016 Daisuke Takayama
Released under the [MIT license](http://opensource.org/licenses/mit-license.php)
