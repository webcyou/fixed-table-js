# Fixed Table JS
FixedTableJS - Fixed Table Layout JavaScript Library


![](http://webcyou.com/fixed_table_js/img/fixed_table.png)


### これは何？
tableレイアウトでの簡単に固定表示を行える、JavaScriptライブラリです。

### demo
[デモページ](https://webcyou.github.io/fixed_table/)

###  Quick start

**Clone the repo:**
```
git clone git@github.com:webcyou/countup-timer-js.git
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


**argument**

```
new FixedTable(option, callback);
```

### Option Parameters Reference

| ParametersName | value         | DefaultValue | Detail                | 
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
