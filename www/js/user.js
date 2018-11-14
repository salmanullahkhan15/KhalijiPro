angular.module('starter.User', [])

.factory('User', function($http, $window) {

	var User = {

		checkToken: function() {

			if (window.localStorage.getItem("userId") != undefined) {
				return window.localStorage.getItem("userId"), {
					user_id:  window.localStorage.getItem("userId");
					//token: $localStorage.token 
				}).then(function(result) {
					return true;
				}).catch(function onError(sailsResponse) {
					delete window.localStorage.getItem("userId");
				//	delete $localStorage.token;
					return false;
				});
			}
			else {
				return false;
			}
		}
	};

	return User;

});