app.controller('ProfileCtrl', ['$scope', '$location', '$stateParams', 'API', 'Utils', 
	function ($scope, $location, $stateParams, API, Utils) {
		$scope.username = $stateParams.username;
	}
])
app.controller('NavCtrl', ['$scope', '$rootScope', '$auth', '$location', 
	function ($scope, $rootScope, $auth, $location) {
	    $scope.logout = function () {
	        $auth.logout();
	        $rootScope.user = null;
	        $location.path("/")
	    }
	}
])