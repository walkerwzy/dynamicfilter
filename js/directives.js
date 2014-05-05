angular.module('app.directives',[]).directive("zkxfiltericon",[function(){
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
.directive("zkxinput",['$compile',function($compile){
	function getstr(type,source){
		console.log(type);
		if(type=="select")
			return "<select ng-model='opv3' ng-init='opv3=source[0]' ng-options='v for v in source'></select>";
		else return "<input ng-model='opinput' />";
	}
	return {
		restrict:'EA',
		transclude:true,
		scope:{
			type:"=",
			source:"=",
			enumtype:"=",
			enumkey:"=",
			enumval:"=",
			opv3:"=myvalue"
		},
		link:function(scope,element,attrs){
			if(scope.type.name=="enum"){
				if(scope.enumtype=="str")
					element.html("<select ng-model='opv3' ng-init='opv3=source[0]' ng-options='v for v in source'></select>");
				else
					element.html("<select ng-model='opv3' ng-init='opv3=source[0][enumkey]' ng-options='v[enumkey] as v[enumval] for v in source'></select>");
			}else{
				element.html("<input ng-model='opv3' />");
			};
			$compile(element.contents())(scope);
		}
	};
}]);