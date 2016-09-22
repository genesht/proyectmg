app.controller('PostCtrl', ['$scope', 'API', 'Utils', function ($scope, API, Utils) {
	$scope.newComment = {text: ""}
	$scope.setContent = function(content){
		$scope.post = content;
		console.log($scope.post.comments)	
	}
	$scope.vote = function(state, doc, type){
		var formData = {
			state: state,
			id: doc._id,
			type: type
		}
		formData.state = Utils.evalState(state, doc, $scope.user)
		API.vote(formData).then(function(res){
			switch(formData.state){
				case "like":
					doc.likers.push($scope.user._id);
					doc.likes += 1;
				break;

				case "dislike":
					doc.dislikers.push($scope.user._id);
					doc.dislikes += 1;
				break;

				case "cancelLike":
					doc.likers.splice(doc.likers.indexOf($scope.user._id));
					doc.likes -= 1;
				break;

				case "cancelDislike":
					doc.dislikers.splice(doc.dislikers.indexOf($scope.user._id));
					doc.dislikes -= 1;
				break;

				case "cancelLikeDislike":
					doc.likers.splice(doc.likers.indexOf($scope.user._id));
					doc.dislikers.push($scope.user._id);
					doc.likes -= 1;
					doc.dislikes += 1;
				break;

				case "cancelDislikeLike":
					doc.dislikers.splice(doc.dislikers.indexOf($scope.user._id));
					doc.likers.push($scope.user._id);
					doc.dislikes -= 1;
					doc.likes += 1;
				break;
			}
		})
	}

	$scope.sendComment = function () {
		if($scope.newComment.text != ""){
			$scope.newComment.author = $scope.user._id
			$scope.newComment.idPost = $scope.post._id
			API.comment($scope.newComment).then(function (res) {
				if(res.data.text){
					var comment = {
						text: res.data.text,
						author: {
							username: $scope.user.username,
							picture: $scope.user.picture
						}, 
						likes: 0,
						dislikes: 0,
						likers: [],
						dislikers: []
					}
					$scope.post.comments.push(comment);
					$scope.newComment = {};
				}
			})
		}
	}
}]);