angular.module('app.directives',[])
.directive("zkxfiltericon",[function(){
	return {
		restrict:'EA',
		scope:{
			data:"=",
			out:"="
		},
		controller:function($scope){
		    $scope.add=function(){
		    	var el=$scope.data.splice($scope.filterItem,1);
		    	$scope.out = $scope.out.concat(el);
		    	$scope.filterItem="";
		    };
		},
		templateUrl:'/js/templates/zkxfiltericon.html'
	};
}])
.directive("zkxfilterbox",[function(){
	return {
		restrict:'EA',
		transclude:true,
		scope:{
			data:"=",
			out:"="
		},
		controller:function($scope){
		    $scope.remove=function(i){
		    	var el = $scope.out.splice(i,1);
		    	$scope.data = $scope.data.concat(el);
		    };
		},
		templateUrl:'/js/templates/zkxfilterbox.html'
	};
}])
.directive("zkxinput",['$compile','$http','$filter','$timeout',function($compile,$http,$filter,$timeout){
	return {
		restrict:'EA',
		transclude:false,
		scope:{
			type:"=",
			source:"=",
			enumtype:"=",
			enumkey:"=", // if enum is object array, tell me which field to be the label
			enumval:"=", // and which field is the selected value
			opv3:"=myvalue",
			opsource:"=actionsource",
			opaction:"=action",
		},
		link:{
			pre:function(scope,element,attrs){
				var str_op="<input class='ftbox-op' />",
					str_val="<input class='ftbox-opv' ng-model='opv3' />";
				element.html(str_op+str_val);
				$compile(element.contents())(scope);

				var inputs=angular.element(element).find("input"),
					target=inputs.eq(0);
				//action combobox
				scope.opaction=scope.opsource[0].val;
				target.combobox({
					editable:false,
					data:scope.opsource,
					textField:'key',
					valueField:'val',
					onSelect:function(rec){
						scope.$apply(function(){
							scope.opaction=rec.val;
						});
					}
				}).combobox('setValue',scope.opsource[0].val);
				//action value field
				target=inputs.eq(1);
				if(scope.type.name=="date"){
					var datefmt='yyyy-MM-dd',
						now=new Date();
					scope.opv3=$filter('date')(now,datefmt);
					target.datebox({
						onSelect:function(date){
							scope.$apply(function(){
								scope.opv3=$filter('date')(date,datefmt);
							});
						}
					}).datebox('setValue',new Date());
				}else if(scope.type.name=='enum'){
					// convert str array to a obj array
					var cvt = function(data){
						var jsonsource=[];
						angular.forEach(data,function(el){
							this.push({text:el,value:el});
						},jsonsource);
						scope.source=jsonsource;
					},
					setdefault = function(){
						scope.source[0]['selected']=true;
						scope.opv3=scope.source[0][scope.enumval];
					};
					if(scope.enumtype=="str"){
						scope.enumkey="text";
						scope.enumval="value";
						if(angular.isArray(scope.source)) cvt(scope.source);
					};
					var option={
						editable:false,
						textField:scope.enumkey,
						valueField:scope.enumval,
						onSelect:function(rec){
							scope.$apply(function(){
								scope.opv3=rec[scope.enumval];
							})
						}
					};
					if(angular.isArray(scope.source)){
						angular.extend(option,{data:scope.source});
						setdefault();
						target.combobox(option);
					}else{
						// angular.extend(option,{url:scope.source});
						// use cache
						$http.get(scope.source)
							.success(function(data){
								if(scope.enumtype=="str") cvt(data);
								else scope.source=data;
								setdefault();
								angular.extend(option,{data:scope.source});
								target.combobox(option);
							});
					}
				}
			},
			post:function(scope,element){
				// the same as prev, we can't get real select value unless we use angular framework
				// $timeout(function(){
				// 	var el = angular.element(element).prev();
				// 	el.combobox();
				// });
			}
		}
	}
}]);