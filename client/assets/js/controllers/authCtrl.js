app.controller('AuthCtrl', ['$scope', '$rootScope','$auth', '$location', function ($scope, $rootScope,$auth, $location) {
	$scope.authenticate = function (provider) {
	    $auth.authenticate(provider).then(function (res) {
	        $auth.setToken(res.data.token);
	        $rootScope.user = res.data.user;
	        if(!$rootScope.user.username){
	        	$location.path("/editprofile");
	        }
	        $('#modal-register').modal('hide');
	        $('#modal-login').modal('hide');
	    }).catch(function (error) {
	        console.log(error);
	    });
	};
	$scope.isAuthenticated = function () {
        return $auth.isAuthenticated();
    };
}])