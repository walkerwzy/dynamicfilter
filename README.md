dynamicfilter
=============

![demo](demo.gif)

可以动态生成查询条件的angular组件, 比如"年龄=22, 爱好 不是 篮球"等, 数据源支持本地数组和远程数组.

a angular directive that can dynamic add/remove filter conditions. 

---
- define some modles that participate in construct a search query
- include `fieldid`, `fieldname`, `fieldtype`, `operator` and `datasource`
- different fieldtype can have different input element, e.g. enum type have a select element
- some element can have remote datasource 
- every condition has 3 properities which stored in 3 hidden elements, backend request the form data to group these properities, then compose them as query to database

---
## How to Use
### set query models
    //your query models
    $scope.fall = [
        {
            fieldname:'enum field with obj array',
            field:'fdenum2',
            fieldtype:fieldType.enum,
            enumtype:'obj',
            enumkey:'key',
            enumval:'val',
            datasource:[{key:'key1',val:'val1'},{key:'key2',val:'val2'},{key:'key3',val:'val3'}] // or remote url
        }
    ]
    //chosed query models
    $scope.fuse = []
### gen a button
    <zkxfiltericon data="fall" out="fuse"></zkxfiltericon>
### gen result fields
    <zkxfilterbox data="fall" out="fuse"></zkxfilterbox>
### run a web server
because the demo use absolutely url `/root/to/file`, so deploy a web server to run.

---
###License
© 2014 GPL license