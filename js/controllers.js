angular.module("app.controllers",[]).controller('ctrls',['$scope',function($scope){
	var filterOP={
		lt:{key:'lt',val:'<'},
		gt:{key:'gt',val:'>'},
		eq:{key:'eq',val:'='},
		neq:{key:'neq',val:'!='},
		lte:{key:'lte',val:'<='},
		gte:{key:'gte',val:'>='},
		in:{key:'in',val:'in'},
		notin:{key:'notin',val:'notin'},
		contains:{key:'contains',val:'contains'},
		notcontains:{key:'notcontains',val:'notcontains'},
		before:{key:'before',val:'<'},
		after:{key:'after',val:'>'}
	};
	var fieldType = {
		text:{name:'text',op:[filterOP.eq,filterOP.contains,filterOP.notcontains]},
		enum:{name:'enum',op:[filterOP.eq,filterOP.in,filterOP.notin]},
		date:{name:'date',op:[filterOP.before,filterOP.after,filterOP.eq]},
		number:{name:'number',op:[filterOP.lt,filterOP.gt,filterOP.eq,filterOP.lte,filterOP.gte]},
		bool:{name:'bool',op:[filterOP.eq,filterOP.neq]}
	};
    $scope.fall=[
		{
			fieldname:"text field",
			field:"fdtxt",
			fieldtype:fieldType.text
		},
		{
			fieldname:'enum field width string array',
			field:'fdenum1',
			fieldtype:fieldType.enum,
			enumtype:'str',
			datasource:['pass','invalid','suspense']
		},
		{
			fieldname:'enum field with obj array',
			field:'fdenum2',
			fieldtype:fieldType.enum,
			enumtype:'obj',
			enumkey:'key',
			enumval:'val',
			datasource:[{key:'key1',val:'val1'},{key:'key2',val:'val2'},{key:'key3',val:'val3'}]
		}
    ];
    $scope.fuse=[];
}]);