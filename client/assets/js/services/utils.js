app.factory('Utils', ['$q',function ($q) {
	
    return {
        isImage: function(src) {
            var deferred = $q.defer();
		    var image = new Image();
		    image.onerror = function() {
		        deferred.resolve(false);
		    };
		    image.onload = function() {
		        deferred.resolve(true);
		    };
		    image.src = src;

		    return deferred.promise;
        },
        evalState: function(state, doc, user){
        	var state = state;
			if(state == "like" && doc.likers.indexOf(user._id) != "-1"){
				state = "cancelLike"
			}

			if(state == "dislike" && doc.dislikers.indexOf(user._id) != "-1"){
				state = "cancelDislike"
			}

			if(state == "like" && doc.dislikers.indexOf(user._id) != "-1"){
				state = "cancelDislikeLike"
			}

			if(state == "dislike" && doc.likers.indexOf(user._id) != "-1"){
				state = "cancelLikeDislike"
			}
			return state;
        }
	}
}]);

app.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});
app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
 