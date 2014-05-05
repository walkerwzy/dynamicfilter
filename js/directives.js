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
.directive("zkxinput",['$compile','$http',function($compile,$http){
	return {
		restrict:'EA',
		transclude:true,
		scope:{
			type:"=",
			source:"=",
			enumtype:"=",
			enumkey:"=", // if enum is object array, tell me which field to be the label
			enumval:"=", // and which field is the selected value
			opv3:"=myvalue"
		},
		link:function(scope,element,attrs){
			var genhtml = function(){
				if(scope.enumtype=="str")
					element.html("<select ng-model='opv3' ng-init='opv3=source[0]' " + 
						"ng-options='v for v in source'></select>");
				else
					element.html("<select ng-model='opv3' ng-init='opv3=source[0][enumval]' " + 
						"ng-options='v[enumval] as v[enumkey] for v in source'></select>");
			};
			if(scope.type.name=="enum"){
				if(typeof scope.source === 'object') genhtml();
				else{
					$http.get('/data.json')
						.success(function(data){
							scope.source=data;
							genhtml();
							$compile(element.contents())(scope);
							return;
						});
				};
			}else{
				element.html("<input ng-model='opv3' />");
			};
			$compile(element.contents())(scope);
		}
	};
}]);