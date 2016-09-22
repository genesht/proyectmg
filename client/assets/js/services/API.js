app.factory('API', ['$http', '$q',function ($http, $q) {
	var user;
	var init = $q.defer();
    var service = {
    	defer: init,
    	promise: init.promise,
	    getProfile: function(){
	    	return $http.get('/api/auth/profile');
	    },
	    addPost: function(data){
	    	return $http.post("/api/post", data)
	    },
	    posts: function(state){
	    	return $http.get("/api/posts", {params:{state: state}});
	    },
	    vote: function(data){
	    	return $http.post("/api/like",data)
	    },
	}
	return service;
}]);
