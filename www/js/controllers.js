var reloadpage = false;
var configreload = {};
angular.module('starter.controllers', [])

starter.controller('introScreenCtrl', function ($scope, $state, $ionicSlideBoxDelegate, $ionicHistory) {
  // Called to navigate to the main app
  //   alert("IntroScreen Inside under Controller " + localStorage.getItem("introscreens"));
  $scope.startApp = function () {
    localStorage.setItem("introscreens", true);
    //  alert("IntrosCREN sTATUS " + JSON.stringify(localStorage.getItem("introscreens")));
    /* $ionicHistory.nextViewOptions({
       disableBack: true
     });*/
    $state.go('login');

  };
  $scope.next = function () {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function () {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function (index) {
    $scope.slideIndex = index;
  };

})

starter.controller('advertiseScreenCtrl', function ($scope, $state, MyServices, $ionicSlideBoxDelegate, $ionicLoading, $ionicPlatform, $ionicHistory, $ionicModal) {

  /*$scope.startApp = function() {
    //  localStorage.setItem("introscreens", true);
    //  alert("IntrosCREN sTATUS " + JSON.stringify(localStorage.getItem("introscreens")));
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('menuslider.menu');
  
    };
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };
  
    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
  */

  $ionicHistory.nextViewOptions({
    historyRoot: true,
    disableAnimate: true,
    expire: 300
  });


  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }



  $ionicLoading.show();

  $scope.images = [];
  MyServices.getAdvertise("advertisement.php").
    then(function (response, status, headers) {

      $ionicLoading.hide();

      /* var checkforuserdata = localStorage.getItem("userFirstname");
       alert("checkforuserdata " + checkforuserdata);
 
if(checkforuserdata == ""){
      $location.url('/registerProfile'); 
}*/
      // else{
      //    alert("else menuuuu");
      $scope.images = response.data.data;
      setTimeout(function () {
        $ionicSlideBoxDelegate.slide(0);
        $ionicSlideBoxDelegate.update();
        $scope.$apply();
      });

      //    }     

      /*if($localStorage.getItem("userFirstname") == null && $localStorage.getItem("userLastname") == null && $localStorage("userCity") == null){
    
         $state.go('registerProfile');
         
      }*/
      /*  else{
          
         $scope.images=response.data.data;

        setTimeout(function() {
         $ionicSlideBoxDelegate.slide(0);
         $ionicSlideBoxDelegate.update();
         $scope.$apply();
         });
        //Check Whether Profile is Filled Or Not123

         localStorage.setItem("userId", JSON.stringify(data.user.id));
         localStorage.setItem("userName", data.user.username);
         localStorage.setItem("userAvatar", data.user.avatar);
         localStorage.setItem("userEmail", data.user.email);
         localStorage.setItem("userFirstname", data.user.firstname);
         localStorage.setItem("userLastname", data.user.lastname);
         localStorage.setItem("userCity", data.user.city);
        }*/
    },
      function (data, status, header, config) {
        $scope.errorData = data;
        //   alert("error " + JSON.stringify(data));                          
      });


})
starter.controller('loginCtrl', function ($scope, MyServices, $ionicPopup, $ionicPlatform, $ionicModal, $ionicSlideBoxDelegate, $interval, $rootScope, $location, $window, $ionicLoading, $timeout, $q, $state, $http, $cordovaOauth, $cordovaOauthUtility, $cordovaNetwork, $ionicHistory, $filter, $translate) {

  //	$scope.logindata = {};
  //	$.jStorage.flush();  

  var language = localStorage.getItem("language");
  // alert("Language:--- " + language);
  if (language == null || language == "null") {
    //     alert("INSIDELanguage:--- " + language);
  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  document.addEventListener("deviceready", function () {

    var type = $cordovaNetwork.getNetwork()
    console.log("Type var Meuctrl :  " + type);

    var isOnline = $cordovaNetwork.isOnline()
    console.log("isOnline var Meuctrl :  " + isOnline);

    var isOffline = $cordovaNetwork.isOffline()
    console.log("isOffline var Meuctrl :  " + isOffline);


    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
      var onlineState = networkState;
      $state.go('login');
    })

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
      var offlineState = networkState;
      $state.go('offline');
    })

  }, false);

  var backbutton = 0;
  $ionicPlatform.registerBackButtonAction(function (e) {
    $window.plugins.toast.showShortCenter($filter('translate')('presagaintexit'));
    //alert("Current State Outside " +  $state.current.name);

    if ($rootScope.backButtonPressedOnceToExit || $state.current.name == 'login') {
      if (backbutton == 0) {
        // alert("Button Count in Condition " +  backbutton);
        backbutton++;
        //   alert("Button Count in Condition++ " +  backbutton);
        $window.plugins.toast.showShortCenter($filter('translate')('presagaintexit'));
        $timeout(function () {
          backbutton = 0;
        }, 2000);
      } else {
        //  alert("Button Count in Else " +  backbutton);
        ionic.Platform.exitApp();
        navigator.app.exitApp();
      }
      //ionic.Platform.exitApp();
    }
    else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    }
    else {
      $rootScope.backButtonPressedOnceToExit = true;
      window.plugins.toast.showShortCenter(
        $filter('translate')('pressbacktoexit'), function (a) { }, function (b) { }
      );
      setTimeout(function () {
        $rootScope.backButtonPressedOnceToExit = false;
      }, 2000);
    }
    e.preventDefault();
    return false;
  }, 101);



  var backbutton = 0;
  $ionicPlatform.registerBackButtonAction(function (e) {
    // alert("Current State Outside " +  $state.current.name);

    if ($rootScope.backButtonPressedOnceToExit || $state.current.name == 'login') {

      navigator.app.exitApp();
      //ionic.Platform.exitApp();
    }
    e.preventDefault();
    return false;
  }, 101);





  $scope.forgotpass = function () {
    //	$location.url("/access/forgotpassword");
  }

  /*	if (loginstatus == true && !MyServices.getconfigdata()) {
  
        $location.url("/login");
      }
  */
  /*	if ($.jStorage.get("user")) {
  
    //	MyServices.getsingleuserdetail(function (data) {
    //		$scope.userdetails = data;
    //		$scope.userdetails.myimage = {
    //			'background-image': "url('" + $filter("profileimg")(data.image) + "')"
        };
      }, function (err) {
        $location.url("/access/offline");
      });
  
    }
  */


  //var loginstatus = false;

  function internetaccess(toState) {
    if (navigator) {
      if (navigator.onLine != true) {
        onoffline = false;
        //	$location.url("/offline");
      } else {
        onoffline = true;
      }
    }
  }
  $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    internetaccess(toState);
  });
  window.addEventListener("offline", function (e) {
    internetaccess();
  })
  window.addEventListener("online", function (e) {
    internetaccess();
  })

	/*$scope.menudata = [];
	var loginstatus = false;

	$scope.setup = function () {
		localStorage.getItem("userId")
		window.localStorage.setItem("userId", JSON.stringify(data.user.id));
		$scope.config = MyServices.getconfigdata();
		_.each(JSON.parse($scope.config.config[0].text), function (n) {
			if (n.name.toLowerCase() == "email" && n.value == true) {
				$scope.logindata.email = true;
				loginstatus = true;
			} else if (n.name.toLowerCase() == "twitter" && n.value == true) {
				$scope.logindata.twitter = true;
				loginstatus = true;
			} else if (n.name.toLowerCase() == "facebook" && n.value == true) {
				$scope.logindata.facebook = true;
				loginstatus = true;
			} else {}
		})
		if (loginstatus == false) {
			$location.url("/menu");
		}
	}*/

	/*	configreload.onallpage = function () {
		var loginstatus = false;
		if (MyServices.getconfigdata()) {
			_.each(MyServices.getconfigdata().config[0], function (n) {
				if (n.value == true) {
					loginstatus = true;
				}
			});
		}
		if (loginstatus == true && !MyServices.getuser()) {

			$location.url("/login");
		}
	}  */

  /*
    MyServices.getallfrontmenu(function (data) {
      MyServices.setconfigdata(data);
      $scope.setup();
    }, function (err) {
      $location.url("/offline");
    })
  */

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };


	/*configreload.onallpage = function ({
	//	$ionicLoading.hide();
	//	localStorage.getItem("userId")
		if ($rootScope.loggedIn == false) {
	//		window.localStorage.setItem("userId", JSON.stringify(data.user.id));
		//	 localStorage.setItem("userid", $scope.user.id);
	//		user = data.user;
			reloadpage = true;
			$location.url("/login");
		//	$scope.signin = {};
		}
		else{
			$location.url("/menu");
		}
	});*/

  // **** City Check *** //

  //$scope.signup.citydata = null;
  //$scope.cityCheck = [];
  var checkCityFn = function () {
    var data = { "currentUserID": localStorage.getItem("userId") };
    //		alert("Data For City  " + localStorage.getItem("userId"));
    //	alert("Fav Club data " + data);
    var parameter = JSON.stringify(data);
    //	alert("Parameter City " + parameter);

    MyServices.getCityCheck(parameter).
      then(function (response, status, headers) {
        //	alert("Resp CityEntry "+ JSON.stringify(response));
        //	console.log('Resp CityEntry ', JSON.stringify(response));
        if (response.data.success == 0) {
          if (localStorage.getItem("userId") == null) {
            //	alert("INside User Null  " + localStorage.getItem("userId"));
            $state.go('login');
          }
          else {
            $state.go('plsentercity');
          }

        }
        else {
          $state.go('menuslider.menu');
        }

        /* $scope.citycategories=response.data.data.data;*/
        //   alert("succ " + JSON.stringify(response));
      },
        function (data, status, header, config) {
          $scope.errorData = data;
          //   alert("error " + JSON.stringify(data));


        });
  };

  // **** City Check *** //


  // **** Facebook Login *** //


  $scope.facebooklogin = function () {
    $ionicLoading.show({
      template: '<p class="text-center">{{"logintofb" | translate}}</p>'
    });
    $cordovaOauth.facebook("115517485539861", ["email", "public_profile", "user_friends"]).then(function (result) {
      //$state.go('userProfileGmailScreen', {}, {reload: true});
      $ionicLoading.hide();
      $scope.access_token = result.access_token;
      console.log($scope.access_token);
      //  alert($scope.access_token);
      $ionicLoading.show({
        template: '<p class="text-center">{{"loading" | translate}}</p>'
      });

      $http({ method: "GET", url: "https://graph.facebook.com/v2.2/me?access_token=" + $scope.access_token }).
        success(function (response) {
          console.log(JSON.stringify(response));

          /*
                      UserService.setUser({
                     userID: response.id,
                     name: response.name,
                     email: response.id,
                     
                     
                     type:"Facebook"
                   });
         */
          var data12 = { "access_token": $scope.access_token }
          var parameter = JSON.stringify(data12);
          MyServices.facebookLatestLogin(parameter).then(function (data, status, headers) {
            $ionicLoading.hide();
            console.log("Profile  Response " + JSON.stringify(data.data));
            console.log("Profile  Messsage " + JSON.stringify(data.data.msg));
            console.log("Profile  Messsagedatsta " + JSON.stringify(data.data.status));
            console.log("Profile  Messsagestat " + JSON.stringify(data.status));

            if (data.data.msg == "user registered.") {

              var alertPopup = $ionicPopup.alert({
                title: $filter('translate')('congrats'),
                template: '<p class="text-center">{{"sucessregwithfb" | translate}}</p>'
              });//100


              localStorage.loggedIn = true;
              localStorage.setItem("userId", JSON.stringify(data.data.wp_user_id));
              console.log("data.data.wp_user_id user registered :--- " + localStorage.getItem("userId"));
              var data = { "currentUserID": JSON.stringify(data.data.wp_user_id) }
              var parameter = JSON.stringify(data);
              console.log("Checking.............................................");
              console.log("Para " + parameter);
              MyServices.registerProfileall(parameter).
                then(function (response, status, headers) {
                  $scope.posts = response.data.data[0];
                  //  localStorage.setItem("userName", $scope.posts.user_login);
                  localStorage.setItem("userName", $scope.posts.user_login);
                  localStorage.setItem("userEmail", $scope.posts.user_email);
                  localStorage.setItem("userFirstname", $scope.posts.first_name);
                  localStorage.setItem("userLastname", $scope.posts.last_name);
                  localStorage.setItem("userCity", $scope.posts.City);
                  localStorage.setItem("userAvatar", $scope.posts.avatar);

                  if (localStorage.getItem("userCity") == "undefined" || localStorage.getItem("userCity") == null || localStorage.getItem("userCity") == "") {
                    localStorage.loggedIn = false;
                    var msgdata = { 'currentUserID': localStorage.getItem("userId") };
                    var parameter = JSON.stringify(msgdata);
                    console.log("Checking.............................................");
                    console.log("Para " + parameter);
                    MyServices.checkCity(parameter).
                      then(function (data, status, headers) {
                        $ionicLoading.hide();
                        if (data.data.message == "City Exist") {
                          //   alert("City FBBB : --  " + data.data.city);
                          localStorage.setItem("userCity", data.data.city);
                          $state.go('advertisescreen');
                        }
                        else {
                          console.log("Response For City Check Inside Else........ " + JSON.stringify(data.data));
                          $state.go('fbcityinput');

                        }

                      }, function (data, status, header, config) {
                        $ionicLoading.hide();
                        $scope.ResponseDetails = "Data: " + data +
                          "<hr />status: " + status +
                          "<hr />headers: " + header +
                          "<hr />config: " + config;
                        var alertPopup = $ionicPopup.alert({
                          title: $filter('translate')('sorry'),
                          template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>'
                        });//100

                      });
                  }
                  else {
                    $state.go('advertisescreen');
                  }

                }, function (data, status, header, config) {
                  $ionicLoading.hide();
                  $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
                  var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('sorry'),
                    template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>'
                  });//100

                });

            }
            else {

              localStorage.loggedIn = true;
              localStorage.setItem("userId", JSON.stringify(data.data.wp_user_id));
              console.log("data.data.wp_user_id user LogedIN :--- " + localStorage.getItem("userId"));
              var data = { "currentUserID": JSON.stringify(data.data.wp_user_id) }
              var parameter = JSON.stringify(data);
              console.log("Checking.............................................");
              console.log("localStorage.getItem undefined===-====---======----===: " + localStorage.getItem("userMember_favourite_team"));
              console.log("Para " + parameter);
              MyServices.registerProfileall(parameter).
                then(function (response, status, headers) {
                  $scope.posts = response.data.data[0];
                  localStorage.setItem("userName", $scope.posts.user_login);
                  localStorage.setItem("userEmail", $scope.posts.user_email);
                  localStorage.setItem("userFirstname", $scope.posts.first_name);
                  localStorage.setItem("userLastname", $scope.posts.last_name);
                  localStorage.setItem("userCity", $scope.posts.City);
                  localStorage.setItem("userAvatar", $scope.posts.avatar);
                  localStorage.setItem("userMember_favourite_team", $scope.posts.Member_favourite_team);
                  if (localStorage.getItem("userCity") == "undefined" || localStorage.getItem("userCity") == null || localStorage.getItem("userCity") == "") {
                    localStorage.loggedIn = false;
                    var msgdata = { 'currentUserID': localStorage.getItem("userId") };
                    var parameter = JSON.stringify(msgdata);
                    console.log("Checking.............................................");
                    console.log("Para " + parameter);
                    MyServices.checkCity(parameter).
                      then(function (data, status, headers) {
                        $ionicLoading.hide();
                        if (data.data.message == "City Exist") {
                          //   alert("City FBBB : --  " + data.data.city);
                          localStorage.setItem("userCity", data.data.city);
                          $state.go('advertisescreen');
                        }
                        else {
                          console.log("Response For City Check Inside Else........ " + JSON.stringify(data.data));
                          $state.go('fbcityinput');

                        }

                      }, function (data, status, header, config) {
                        $ionicLoading.hide();
                        $scope.ResponseDetails = "Data: " + data +
                          "<hr />status: " + status +
                          "<hr />headers: " + header +
                          "<hr />config: " + config;
                        var alertPopup = $ionicPopup.alert({
                          title: $filter('translate')('sorry'),
                          template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
                          buttons: [{
                            text: $translate.instant('ok')
                          }]
                        });//100

                      });
                  }
                  /* else if(localStorage.getItem("userMember_favourite_team") == null)
                   {
                      $state.go('registerProfile');
                   }*/
                  else {
                    $state.go('advertisescreen');
                  }


                }, function (data, status, header, config) {
                  $ionicLoading.hide();
                  $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
                  var alertPopup = $ionicPopup.alert({
                    title: $filter('translate')('sorry'),
                    template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
                    buttons: [{
                      text: $translate.instant('ok')
                    }]
                  });//100

                });
            }
          },
            function (data, status, header, config) {
              // $scope.loadingIndicator.hide();
              $ionicLoading.hide();
              var httpStatus = JSON.stringify(data.status);
              if (httpStatus == 0) {
                //alert("No Network" );  
                var alertPopup = $ionicPopup.alert({
                  title: $filter('translate')('neterr'),
                  template: '<p class="text-center">{{"nonetavorseruna" | translate}}</p>',
                  buttons: [{
                    text: $translate.instant('ok')
                  }]
                });
              }
              else if (httpStatus == 404) {
                //alert("Invalid Email Address or password" );

                /*  localStorage.setItem("auth",true);
                  localStorage.setItem("role",'EndUser');   
                    $state.go('userProfileGmailScreen');     */
              }

            });
        }, function (error) {
          $ionicLoading.hide();
          console.log(error);
        });
      //$scope.setCurrentUsername(data.username);
    }, function (error) {
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('loginfailed'),
        template: '<p class="text-center">{{"therwasaprobsigin" | translate}}</p>',
        buttons: [{
          text: $translate.instant('ok')
        }]
      });
    });
  }



  // **** Facebook Login *** //



  // ADV SAMPLE
  $scope.aImages = [{
    'src': 'img/Au2bBYuSAuOP60tI41un_khaliji-logo.png',
    'msg': 'Swipe me to the left. Tap/click to close'
  }, {
    'src': 'img/AMA8O4rJQi61vaEuHAcg_creatematch-menu-img.png',
    'msg': ''
  }, {
    'src': 'img/4e9ipaBFRACfx93xnvPE_newsfeed-menu-img.png',
    'msg': ''
  }];

  $ionicModal.fromTemplateUrl('templates/adv-image-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });


  $scope.popupadvs = function () {
    $ionicSlideBoxDelegate.slide(0);
    $scope.modal.show();
    $ionicSlideBoxDelegate.update();
  };

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hide', function () {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function () {
    // Execute action
  });
  $scope.$on('modal.shown', function () {
    console.log('Modal is shown!');
  });

  // Call this functions if you need to manually control the slides
  $scope.next = function () {
    $ionicSlideBoxDelegate.next();
  };

  $scope.previous = function () {
    $ionicSlideBoxDelegate.previous();
  };

  $scope.goToSlide = function (index) {
    $scope.modal.show();
    $ionicSlideBoxDelegate.slide(index);
  }

  // Called each time the slide changes
  $scope.slideChanged = function (index) {
    $scope.slideIndex = index;
  };




  // ADV SAMPLE

  // TWITTER SAMPLE
  $scope.twitterlogin = function () {
    console.log("twitterLogin function got called");
    $ionicLoading.show({
      template: '<p class="text-center">{{"logintotwitter" | translate}}</p>'
    });
    $cordovaOauth.twitter("2LvAYt40Dxxq5tbypRymr29KT", "EInrdt6lrMDUNfrQ9lYMCwo0PM4kboVxw8wIFNN5q42x06Lkzh").then(function (result) {
      console.log("Here Is Response " + JSON.stringify(result));

      if (!result) {
        $ionicLoading.hide();
        twitterLoginError("Cannot find the OauthResponse");
        return;
      }
      console.log(JSON.stringify(result));
      var oauth_token = result.oauth_token;
      var oauth_token_secret = result.oauth_token_secret;
      var user_id = result.user_id;
      var screen_name = result.screen_name;

      window.localStorage.setItem("twitter_user_Id", user_id);
      window.localStorage.setItem("twitter_screen_name", screen_name);


      //alert("user_id-----> " + user_id);

      $ionicLoading.hide();
      var msgdata = { 'user_id': user_id };
      var parameter = JSON.stringify(msgdata);
      // alert("Para twitter-- "+ parameter);
      console.log("Para " + parameter);
      MyServices.checkTwitterUser(parameter).
        then(function (data, status, headers) {
          $ionicLoading.hide();

          //  alert("Response Success : " + JSON.stringify(data.success))
          // alert(data.data.success);

          if (data.data.success == 0) {

            $state.go('twitteremailandcity');
          }
          else {
            //    alert("twitter Respone data==1 " + JSON.stringify(result));
            localStorage.setItem("userId", data.data.data.user_login_id);
            console.log("USERIDDD :-  " + localStorage.getItem("userId"));
            localStorage.setItem("userAvatar", data.data.data.avatar);
            localStorage.setItem("userFirstname", data.data.data.fname);
            //  localStorage.setItem("userLastname", data.user.lastname);
            localStorage.setItem("userCity", data.data.data.city);
            localStorage.loggedIn = true;
            //    alert("user_login_id IS : " + JSON.stringify(data.data.data.user_login_id));
            //   console.log("user_login_id IS " + JSON.stringify(data.data.data.user_login_id));
            //  alert("user_login_id IS Stringwithout : " + data.data.data.user_login_id);
            //  console.log("user_login_id IS Stringwithout " + data.data.data.user_login_id);

            /*       var checkforUserFirstName = localStorage.getItem("userFirstname");
                 var checkforUserLastName = localStorage.getItem("userLastname");
                   var checkforUserCity = localStorage.getItem("userCity");
            */
            //    alert("checkforUserFirstName : " + checkforUserFirstName);
            //    alert("checkforUserLastName : " + checkforUserLastName);
            //    alert("checkforUserCity : " + checkforUserCity);

            /*if(checkforUserFirstName == null || checkforUserLastName == null || checkforUserCity == null){

                     $state.go('registerProfile'); 
              }
              else
              {*/
            $state.go('advertisescreen');

            /*}
             */
            //    $state.go('registerProfile');
          }
        }, function (data, status, header, config) {
          $ionicLoading.hide();

          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('sorry'),
            template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });//100

        });





      /* MyServices.setTwitterUser(result.user_id).
               then(function (data, status, headers) {
               	
                 alert(JSON.stringify(data))
                 var response=data.data;
                 alert(response.success);
                 if(response.success == 0){
             $state.go('twitteremailandcity');
           }else{
         //		alert("twitter Respone data==1 " + JSON.stringify(result));
             localStorage.loggedIn = true;
           //	alert("user_login_id IS : " + JSON.stringify(response.data.user_login_id));
             console.log("user_login_id IS " + JSON.stringify(response.data.user_login_id));
             window.localStorage.setItem("userId", response.data.user_login_id);
             $state.go('menuslider.menu');
           }
               	
          },
                   function(data, status, header, config) {
                    $scope.ResponseDetails = "Data: " + data +
                                           "<hr />status: " + status +
                                           "<hr />headers: " + header +
                                           "<hr />config: " + config;
                    alert("eroror"+$scope.ResponseDetails);
                                            
                     });*/

      //	localStorage.loggedIn = true;
      //	alert("twitter Respone " + JSON.stringify(result));

			/* .success(function(response) {
                console.log(response);
                alert("Respone From twitter " + response);
             //   $scope.tweets = response;
			      })
			     .error(function(error) {
			              alert(error);
			      });*/


      /* var user = MyServices.getUser('twitter');
       alert("USerEmail & screen_name  " + JSON.stringify(user_id + screen_name));
       alert("twitter Respone result data " + JSON.stringify(response));
        alert("twitter Respone result data " + JSON.stringify(result));
      if(response == 0){
        alert("twitter Respone data==0 " + JSON.stringify(result.success));
        state.go('twitteremailandcity');
      }else{
        alert("twitter Respone data==1 " + JSON.stringify(result.success));
        localStorage.loggedIn = true;
        state.go('menu');
      }
	
*/
      //Accessing profile info from twitter
      /*  var oauthObject = {
               oauth_consumer_key: "7UTsfTklX5IG54Y6X5JkeMLv4",
               oauth_nonce: $cordovaOauthUtility.createNonce(10),
               oauth_signature_method: "HMAC-SHA1",
               oauth_token: result.oauth_token,
               oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
               oauth_version: "1.0"
           };*/
      /* var signatureObj = $cordovaOauthUtility.createSignature("GET", "https://api.twitter.com/1.1/statuses/home_timeline.json", oauthObject, {screen_name:result.screen_name}, "npphqlhzltNOLcD7VZpFThm1f7JTGsqbz5FcFBdePKyywRjSkQ", result.oauth_token_secret);
      console.log("Generating signature");
      console.log(signatureObj);
      console.log(signatureObj.signature);
      $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
      $http.get("https://api.twitter.com/1.1/statuses/home_timeline.json",
             {params: { screen_name: result.screen_name}})*/
      /* .success(function(result) {
                 console.log(result);
              //   $scope.tweets = response;
 
             
 
 
                 alert("Response " + $scope.tweets)
       })
      .error(function(error) {
         alert("Error " + JSON.stringify(error));
               alert(error);
       });*/
      /*  //$location.url('/scan');
       function(error) {
        console.log(error);
      });*/

    }, function (error) {
      $ionicLoading.hide();
      //fail get profile info
      console.log('profile info fail', error);
      /*alert("Error ", + error);*/
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('sorry'),
        template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
        buttons: [{
          text: $translate.instant('ok')
        }]
      });//100
    });

  };

  //This is the fail callback from the login method
  var twitterLoginError = function (error) {
    console.log('twitterLoginError', error);
    $ionicLoading.hide();
  }


  // TWITTER SAMPLE



  // **** For SIGN IN *** //

  $scope.signin = {};
  var signinsuccess = function (data, status) {
    $ionicLoading.hide();
    //	alert(data.user.role);
    //   alert(data.user.role[0]);
    if (data.user != undefined) {
      window.localStorage.setItem("userId", JSON.stringify(data.user.id));
      $window.localStorage.setItem("userName", data.user.username);
      $window.localStorage.setItem("userAvatar", data.user.avatar);
      $window.localStorage.setItem("userEmail", data.user.email);
      $window.localStorage.setItem("userFirstname", data.user.firstname);
      $window.localStorage.setItem("userLastname", data.user.lastname);
      $window.localStorage.setItem("userCity", data.user.city);
      user = data.user;

      /* if(data.user.role == 'supervisor'){
         localStorage.setItem("role","supervisor");
         $state.go('supervisormenuslider.supervisormenu');
       }
       else if(data.user.role == 'organizer'){
         localStorage.setItem("role","organizer");
         $state.go('organizermenuslider.organizermenu');
       }
       else{
         localStorage.setItem("role","player");
           $state.go('advertisescreen');
       }*/

      var checkforUserFirstName = localStorage.getItem("userFirstname");
      var checkforUserLastName = localStorage.getItem("userLastname");
      var checkforUserCity = localStorage.getItem("userCity");
      /*if(checkforUserFirstName == "" || checkforUserLastName == "" || checkforUserCity == ""){

               $state.go('registerProfile'); 
        }*/
      /*  else
        {*/
      $state.go('advertisescreen');
      /* }*/





      //	   alert("succ " + JSON.stringify(data.user));
      //		$state.go('advertisescreen');
      // $state.go('menuslider.menu');
      localStorage.loggedIn = true;

    } else {
      //	alert(JSON.stringify(data.user));
      //	alert(JSON.stringify(data.user));
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('loginfailed'),
        template: '<p class="text-center">{{"wrouserorpass" | translate}}</p>',
        buttons: [{
          text: $translate.instant('ok')
        }]
      });
    }
    return $scope.signin;
  }
  $scope.signinsubmit = function (signin) {
    $ionicLoading.show();

    $scope.allvalidation = [{
      field: $scope.signin.username,
      validation: ""
    }, {
      field: $scope.signin.password,
      validation: ""
    }];
    var check = formvalidation($scope.allvalidation);
    if (check) {
      MyServices.signin($scope.signin, signinsuccess, function (err) {
        //	$location.url('offline');
      });
    } else {
      msgforall('{{"plsflldata" | translate}}');
      $ionicLoading.hide();
    }
  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: $filter('translate')('loginn'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }

})

// TwEmialCity

starter.controller('twitterEmailAndCityCtrl', function ($scope, MyServices, $ionicActionSheet, $state, $ionicLoading, $ionicPopup, $timeout, $ionicPlatform, $ionicHistory, $filter, $translate) {
  $scope.gobackcheck = function () {
    //alert("Login");
    localStorage.loggedIn = false;
    window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    localStorage.loggedIn = undefined;
    localStorage.setItem("introscreens", true);
    $state.go('login');

  }

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    localStorage.loggedIn = false;
    window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    localStorage.loggedIn = undefined;
    localStorage.setItem("introscreens", true);
    $state.go('login');
    e.preventDefault();
  }, 101);


  function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

      if (arraytosearch[i][key] == valuetosearch) {
        return i;
      }
    }
    return null;
  }

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.item = {};
  $scope.twitter = {};
  $scope.citycategories = [];
  MyServices.getCities("getCity.php/").
    then(function (response, status, headers) {
      $scope.citycategories = response.data.data.data;

      console.log("$scope.citycategoriesAll Response : " + JSON.stringify($scope.citycategories));
      $scope.citycategories_duplicate = [];
      for (var i = 0; i < $scope.citycategories.length; i++) {
        var objcity = $scope.citycategories[i].city_name;
        $scope.citycategories_duplicate.push(objcity);

      }
    },
      function (data, status, header, config) {
        $scope.errorData = data;
      });


  $scope.selectedvalue_citydup = function (selected) {
    console.log('Select Countery Arrya ' + $scope.selectedItem_country);
    console.log('Select Countery Selected ' + selected);

    if (selected == null || selected == undefined) {
      $scope.item.citycategories = "";
      $scope.citycategories_duplicate = [];

      MyServices.getCities("getCity.php/").
        then(function (response, status, headers) {
          $scope.citycategories = response.data.data.data;

          console.log("$scope.citycategoriesAll Response : " + JSON.stringify($scope.citycategories));
          $scope.citycategories_duplicate = [];
          for (var i = 0; i < $scope.citycategories.length; i++) {
            var objcity = $scope.citycategories[i].city_name;
            $scope.citycategories_duplicate.push(objcity);

          }
        },
          function (data, status, header, config) {
            $scope.errorData = data;
          });


      return false;
    }
    console.log('Pass City ID For City:::--> ' + $scope.item.cityId);
    $scope.item.citycategories = $scope.citycategories[selected].city_name;
    $scope.item.cityId = $scope.citycategories[selected].city_id;
  }


  //hool123

  $scope.twitteremailandcity = function (twitter) {
    var showAlert = function (alertTitle) {
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('alert'),
        template: alertTitle,
        buttons: [{
          text: $translate.instant('ok')
        }]
      });
      alertPopup.then(function (res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };


    var validationfun = function () {

      console.log("City Selected  " + $scope.twitter.email);
      console.log("City Used Selected  " + $scope.item.citycategories);
      if ($scope.twitter.email == "" || !$scope.twitter.email) {
        showAlert('<p class="text-center">{{"plsentvalemailadd" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if ($scope.item.citycategories == "" || $scope.item.citycategories == undefined || !$scope.item.citycategories) {
        showAlert('<p class="text-center">{{"plsselectcity" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      return true;
    }

    if (validationfun()) {
      $ionicLoading.show();

      var indexcity = functiontofindIndexByKeyValue($scope.citycategories, "city_name", $scope.item.citycategories);
      console.log("index indexcity Value : " + indexcity);
      console.log("City---Cat : " + $scope.citycategories);
      console.log("City---CatItem : " + $scope.item.citycategories);


      var cityid = $scope.citycategories[indexcity].city_id;

      var data = {
        'user_id': localStorage.getItem("twitter_user_Id"),
        'screen_name': localStorage.getItem("twitter_screen_name"),
        'email': twitter.email,
        'txtCity': cityid
      }

      var parameter = JSON.stringify(data);
      // alert("Para "+ parameter);
      console.log("Para " + parameter);
      MyServices.twitterforregister(parameter).
        then(function (data, status, headers) {
          $ionicLoading.hide();
          if (data.data.success == 1) {
            console.log("Profile  Response ::---  " + JSON.stringify(data.data));


            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('congrats'),
              template: '<p class="text-center">{{"successreg" | translate}}!<p>',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });
            //  localStorage.setItem("userId", JSON.stringify(data.data.wp_user_id));
            //      $state.go('login');

            localStorage.setItem("userId", data.data.data.user_login_id);
            console.log("Twitter USERIDDD :-  " + localStorage.getItem("userId"));
            localStorage.setItem("userFirstname", data.data.data.fname);
            console.log("Twitter userFirstname :-  " + localStorage.getItem("userFirstname"));
            //       localStorage.setItem("userLastname",data.data.lname);
            localStorage.setItem("userCity", data.data.data.city);
            localStorage.setItem("userAvatar", data.data.data.avatar);
            console.log("Twitter userCity :-  " + localStorage.getItem("userCity"));
            localStorage.loggedIn = true;



            /*       $window.localStorage.setItem("userFirstname", data.user.firstname);
          $window.localStorage.setItem("userLastname", data.user.lastname);
          $window.localStorage.setItem("userCity", data.user.city);
    */

            $state.go('advertisescreen');



          }
          else {
            console.log("Profile  Response " + JSON.stringify(data.data));
            $scope.edit = !$scope.edit;
            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"emailaddalrexist" | translate}}<p>',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });


          }

        }, function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('sorry'),
            template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });//100

        });
    }

  }

})

starter.controller('fbcityInputCtrl', function ($scope, MyServices, $ionicActionSheet, $ionicHistory, $state, $ionicLoading, $ionicPopup, $timeout, $ionicPlatform, $window) {

  $scope.gobackcheck = function () {
    //alert("Login");
    localStorage.loggedIn = false;
    window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    localStorage.loggedIn = undefined;
    localStorage.setItem("introscreens", true);
    $state.go('login');

  }

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }


  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    localStorage.loggedIn = false;
    window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    localStorage.loggedIn = undefined;
    localStorage.setItem("introscreens", true);
    $state.go('login');
    e.preventDefault();
  }, 101);

  function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

      if (arraytosearch[i][key] == valuetosearch) {
        return i;
      }
    }
    return null;
  }

  $scope.item = {};
  $scope.twitter = {};
  $scope.citycategories = [];
  MyServices.getCities("getCity.php/").
    then(function (response, status, headers) {
      $scope.citycategories = response.data.data.data;

      console.log("$scope.citycategoriesAll Response : " + JSON.stringify($scope.citycategories));
      $scope.citycategories_duplicate = [];
      for (var i = 0; i < $scope.citycategories.length; i++) {
        var objcity = $scope.citycategories[i].city_name;
        $scope.citycategories_duplicate.push(objcity);

      }
    },
      function (data, status, header, config) {
        $scope.errorData = data;
      });


  $scope.selectedvalue_citydup = function (selected) {
    console.log('Select Countery Arrya ' + $scope.selectedItem_country);
    console.log('Select Countery Selected ' + selected);

    if (selected == null || selected == undefined) {
      $scope.item.citycategories = "";
      $scope.citycategories_duplicate = [];


      MyServices.getCities("getCity.php/").
        then(function (response, status, headers) {
          $scope.citycategories = response.data.data.data;

          console.log("$scope.citycategoriesAll Response : " + JSON.stringify($scope.citycategories));
          $scope.citycategories_duplicate = [];
          for (var i = 0; i < $scope.citycategories.length; i++) {
            var objcity = $scope.citycategories[i].city_name;
            $scope.citycategories_duplicate.push(objcity);

          }
        },
          function (data, status, header, config) {
            $scope.errorData = data;
          });



      return false;



    }
    console.log('Pass City ID For City:::--> ' + $scope.item.cityId);
    $scope.item.citycategories = $scope.citycategories[selected].city_name;
    $scope.item.cityId = $scope.citycategories[selected].city_id;

  }


  //hoool

  $scope.fbEnterCity = function (fb) {
    var showAlert = function (alertTitle) {
      var alertPopup = $ionicPopup.alert({
        title: 'Alert',
        template: alertTitle
      });
      alertPopup.then(function (res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };


    var validationfun = function () {

      console.log("City Selected  " + $scope.twitter.email);
      console.log("City Used Selected  " + $scope.item.citycategories);
      /*if ($scope.twitter.email == "" || !$scope.twitter.email)
          {
               showAlert('<p class="text-center">Please Enter Valid Email Address!</p>')
               $ionicLoading.hide();
               return false;
          }*/
      if ($scope.item.citycategories == "" || $scope.item.citycategories == undefined || !$scope.item.citycategories) {
        showAlert('<p class="text-center">Please Select Your City</p>')
        $ionicLoading.hide();
        return false;
      }
      return true;
    }

    if (validationfun()) {
      $ionicLoading.show();

      var indexcity = functiontofindIndexByKeyValue($scope.citycategories, "city_name", $scope.item.citycategories);
      console.log("index indexcity Value : " + indexcity);
      console.log("City---Cat : " + $scope.citycategories);
      console.log("City---CatItem : " + $scope.item.citycategories);


      var cityid = $scope.citycategories[indexcity].city_id;

      var data = {
        'user_id': localStorage.getItem("userId"),//3210.
        'txtCity': cityid
      }

      var parameter = JSON.stringify(data);
      // alert("Para "+ parameter);
      console.log("Para " + parameter);
      MyServices.fbcityforregister(parameter).
        then(function (data, status, headers) {
          $ionicLoading.hide();
          if (data.data.success == 1) {
            console.log("Profile  Response " + JSON.stringify(data.data));


            var alertPopup = $ionicPopup.alert({
              title: 'Congrats!',
              template: '<p class="text-center">Successfully Entered City!<p>'
            });
            localStorage.setItem("userCity", data.data.city);
            console.log("CITY ENTEREDDD : ---- " + localStorage.getItem("userCity"));
            $state.go('menuslider.menu');
          }
          else {
            console.log("Profile  Response " + JSON.stringify(data.data));
            var alertPopup = $ionicPopup.alert({
              title: 'Sorry!',
              template: '<p class="text-center">Something Went Wrong!<p>'
            });


          }

        }, function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
          var alertPopup = $ionicPopup.alert({
            title: 'Sorry!',
            template: '<p class="text-center">Something Went Wrong Try Again!<p>'
          });//100

        });
    }

  }

})

starter.controller('termsAndConditionCtrl', function ($scope, MyServices, $ionicHistory, $ionicPopup, $ionicModal, $interval, $rootScope, $location, $window, $ionicLoading, $timeout, $q, $state, $http, $cordovaOauth, $cordovaOauthUtility, $cordovaNetwork, $ionicPlatform, $filter, $translate) {

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }


  $scope.myGoBack = function () {
    $ionicHistory.goBack();
  };


  /*$ionicPlatform.registerBackButtonAction(function(e) {
          //do your stuff
          $state.go('signUp');
          e.preventDefault();
        }, 101);*/
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.item = {};
  var data = { "page_id": "365" }
  var parameter = JSON.stringify(data);
  //  alert("Para : - " + parameter);
  $ionicLoading.show();
  // alert("hello");
  MyServices.termsandconditon(parameter).
    then(function (response, status, headers) {

      // alert("success " + JSON.stringify(response.data.data));
      //   alert("Details " + response.data.data);
      $scope.posts = response.data.data.page.content;
      //    alert("$scope.posts" + JSON.stringify($scope.posts));
      $scope.item.content = $scope.posts;
      //   $scope.items = response.data.data;
      $ionicLoading.hide();

      //   alert("Details " + JSON.stringify($scope.items));
      //  $scope.description = $sce.trustAsHtml($scope.posts.khalijiPROName);
      //  $scope.content.content = $sce.trustAsHtml($scope.content.content);
    },
      function (data, status, header, config) {
        //   $scope.errorData=data;
        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('sorry'),
          template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });//100
        //     alert("error " + JSON.stringify(data));


      })

})




starter.controller('signUpCtrl', function ($scope, MyServices, $ionicPopup, $ionicModal, $interval, $rootScope, $location, $window, $ionicLoading, $timeout, $q, $state, $http, $cordovaOauth, $cordovaOauthUtility, $cordovaNetwork, $filter, $translate) {



  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  // **** For SIGN UP FORM *** //

  $scope.signup = {};
  var signupsuccess = function (data, status) {

    //	alert("Data " + JSON.stringify(data));
    if (data != "false" && data.success != "username_exists" && data.success != "email_exists" && data.success != "username_email_exists") {
      //	$.jStorage.set("user", data);
      window.localStorage.setItem("userdataa", JSON.stringify(data));
      //window.localStorage.setItem("userId", JSON.stringify(data.user.id));
      localStorage.loggedIn = true;
      //	alert("Data " + JSON.stringify(data));
      //	alert("loggedIn " + JSON.stringify(localStorage.loggedIn));
      //	user = data.user;
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('congrats'),
        template: '<p class="text-center">{{"sigupsuccess" | translate}}</p>',
        buttons: [{
          text: $translate.instant('ok')
        }]
      });
      alertPopup.then(function (res) {
        $state.go('login');
        console.log('Thank you for not eating my delicious ice cream cone');
      });


      /*	var myPopup = $ionicPopup.show({
          template: '<p class="text-center">Signed up Successfully!</p>',
          title: 'Congrats!',
          scope: $scope,
  
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
          localStorage.loggedIn = true;
          $state.go('login');
        }, 2000);*/

    }
    else if (data.success == "username_exists") {
      //	alert("Data " + JSON.stringify(data)); //limit000
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('sorry'),
        template: '<p class="text-center">{{"usealrexist" | translate}}</p>',
        buttons: [{
          text: $translate.instant('ok')
        }]
      });
      /*   alertPopup.then(function(res) {
           $state.go('menuslider.menu');
           console.log('Thank you for not eating my delicious ice cream cone');
         });
*/

      //	$scope.showPopupsignupfailure();
    }
    else if (data.success == "email_exists") {
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('sorry'),
        template: '<p class="text-center">{{"emailaddalrexist" | translate}}</p>',
        buttons: [{
          text: $translate.instant('ok')
        }]
      });

    }
    else if (data.success == "username_email_exists") {
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('sorry'),
        template: '<p class="text-center">{{"useandemailalrexist" | translate}}</p>',
        buttons: [{
          text: $translate.instant('ok')
        }]
      });

    }
    $ionicLoading.hide();
    $scope.signup = {};
  }

  // **** For SIGN UP FORM *** //

  // **** For Drop Down List *** //

  //$scope.signup.citydata = null;
  $scope.citycategories = [];
  MyServices.getCities("getCity.php/").
    then(function (response, status, headers) {
      $scope.citycategories = response.data.data.data;
      //   alert("succ " + JSON.stringify(response));
    },
      function (data, status, header, config) {
        $scope.errorData = data;
        //   alert("error " + JSON.stringify(data));


      });

  // **** For Drop Down List *** //
  $scope.signupsubmit = function (signup) {


    $ionicLoading.show();

    var cityId = $scope.signup.citydata;
    var cityName = $.grep($scope.citycategories, function (catcity) {
      return catcity.city_id == cityId;
    });
    //   alert("City Is " + JSON.stringify(cityName) + " : " + "City ID Is " + cityId)
    /*
        $scope.allvalidation = [{
          field: $scope.signup.username,
          validation: ""
            },
            {
          field: $scope.signup.password,
          validation: ""
            },
            {
          field: $scope.signup.password,
          validation: ""
            },
             {
          field: $scope.signup.roletypedata,
          validation: ""
            },
            {
          field: $scope.signup.phonenumber,
          validation: ""
            }, {
          field: $scope.signup.email,
          validation: ""
            },{
          field: cityName,
          validation: ""
            }
            ];*/
    //	var check = formvalidation($scope.allvalidation);

    var showAlert = function (alertTitle) {
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('alert'),
        template: alertTitle,
        buttons: [{
          text: $translate.instant('ok')
        }]
      });

      alertPopup.then(function (res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };

    var validateCaseSensitiveEmail = function (email) {

      var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (reg.test(email)) {
        return true;
      }
      else {
        return false;
      }


    };
    var validatePassword = function (password) {
      // var passwrd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/
      // var passwrd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
      //  var passwrd = /^(?![0-9]{6})[0-9a-zA-Z]{6}$/

      var passwrd = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/
      if (passwrd.test(password)) {
        return true;
      }
      else {
        return false;
      }


    };
    var validationfun = function () {

      //     var usernameLen = $scope.signup.username;
      //   var userpasswordLen = $scope.signup.password;
      //   var userphoneLen = $scope.signup.phonenumber
      //  console.log("UsernameLenth : --  " + usernameLen);
      //   console.log("LenthUsername -- " + usernameLen.length);

      var agree = $("#policy").is(':checked');
      //  var agree= $scope.signup.policy;
      console.log("CheckBox ::---- " + $scope.signup.policy);
      console.log("Agree::------" + agree);
      //  if (usernameLen <= 6 || usernameLen==undefined )
      // console.log("UsernameLenth : --  " + $scope.signup.username.length);
      if (!$scope.signup.username) {
        showAlert('<p class="text-center">{{"plsentusernm" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (parseInt($scope.signup.username.length) < 6) {
        console.log("UsernameLenth : --  " + $scope.signup.username.length);
        showAlert('<p class="text-center">{{"usermustconleasixch" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (!$scope.signup.password) {
        showAlert('<p class="text-center">{{"plsentpass" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (parseInt($scope.signup.password.length) < 6) {
        showAlert('<p class="text-center">{{"passmusbesixch" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if ($scope.signup.password !== $scope.signup.confirmpassword) {
        showAlert('<p class="text-center">{{"passdosnotmatch" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (!$scope.signup.firstname) {
        showAlert('<p class="text-center">{{"plsentfirstname" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (!$scope.signup.lastname) {
        showAlert('<p class="text-center">{{"plsentlastname" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (!$scope.signup.phonenumber) {
        showAlert('<p class="text-center">{{"plsentphonenum" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (parseInt($scope.signup.phonenumber.length) < 10) {
        showAlert('<p class="text-center">{{"plsentvalidphone" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (!validateCaseSensitiveEmail($scope.signup.email)) {
        showAlert('<p class="text-center">{{"plsentvalemail" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (cityName == "") {
        showAlert('<p class="text-center">{{"plsselectcity" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (agree == false) {
        showAlert('<p class="text-center">{{"yomusaccptterancontion" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      return true;
    }



    if (validationfun()) {
      //  alert("PAss Value " + JSON.stringify($scope.signup));
      MyServices.signup($scope.signup, signupsuccess, function (err) {
        //	$location.url('offline');
        //$ionicLoading.hide();
      });
    } /*else {
			msgforall("Fill all data");
			$ionicLoading.hide();
		}*/

  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: $filter('translate')('loginn'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }
  // popup
  $scope.showPopupsignupsuccess = function () {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">{{"successreg" | translate}}</p>',
      title: $filter('translate')('congrats'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };
  $scope.showPopupsignupfailure = function () {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">{{"usralreexist" | translate}}</p>',
      title: $filter('translate')('oops'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };



})
starter.controller('forgetPasswordCtrl', function ($scope, MyServices, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $ionicPlatform) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('login');
    e.preventDefault();
  }, 101);

  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: $filter('translate')('forgotpass'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.pass = {};
  var passsuccess = function (data, status) {

    console.log(data);

    $ionicLoading.hide();
    //	alert("status PassSuccess " + JSON.stringify(status));
    //	alert(status);
    if (data.status == "ok") {
      //	alert("status Inside " + data);
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('mailsent'),
        template: '<p class="text-center">{{"linkpassrestemail" | translate}}</p>'
      });
      $location.url("/login");
      $scope.pass = {};
    } else {
      //	alert("status Else " + status);
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('sorry'),
        template: '<p class="text-center">{{"youentwronuseremail" | translate}}</p>'
      });
    }
  }
  $scope.forgetpassword = function (pass) {
    $ionicLoading.show();
    $scope.allvalidation = [{
      field: $scope.pass.username,
      validation: ""
    }];
    var check = formvalidation($scope.allvalidation);
    if (check) {
      MyServices.pass(pass, passsuccess, function (err) {
        //		$location.url('offline');
      });
    } else {
      msgforall('<p class="text-center">{{"plsentusremail" | translate}}</p>');
      $ionicLoading.hide();
    }

  }

})
// **** For SIGN IN *** //
starter.controller('offlineCtrl', function ($scope, $ionicLoading, $state, $window, $timeout, $ionicPlatform, $rootScope, $cordovaNetwork, $filter) {

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }



  var backbutton = 0;
  $ionicPlatform.registerBackButtonAction(function (e) {
    $window.plugins.toast.showShortCenter($filter('translate')('presagaintexit'));
    //alert("Current State Outside " +  $state.current.name);

    if ($rootScope.backButtonPressedOnceToExit || $state.current.name == 'offline') {
      if (backbutton == 0) {
        // alert("Button Count in Condition " +  backbutton);
        backbutton++;
        //   alert("Button Count in Condition++ " +  backbutton);
        $window.plugins.toast.showShortCenter($filter('translate')('presagaintexit'));
        $timeout(function () {
          backbutton = 0;
        }, 2000);
      } else {
        //  alert("Button Count in Else " +  backbutton);
        ionic.Platform.exitApp();
        navigator.app.exitApp();
      }
      //ionic.Platform.exitApp();
    }
    else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    }
    else {
      $rootScope.backButtonPressedOnceToExit = true;
      window.plugins.toast.showShortCenter(
        $filter('translate')('pressbacktoexit'), function (a) { }, function (b) { }
      );
      setTimeout(function () {
        $rootScope.backButtonPressedOnceToExit = false;
      }, 2000);
    }
    e.preventDefault();
    return false;
  }, 101);

  $ionicLoading.hide();
  $scope.gobackcheck = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 1000);
    console.log("Try Again Clicked");

    document.addEventListener("deviceready", function () {

      var type = $cordovaNetwork.getNetwork()
      console.log("Type var :  " + type);

      var isOnline = $cordovaNetwork.isOnline()
      console.log("isOnline var :  " + isOnline);

      var isOffline = $cordovaNetwork.isOffline()
      console.log("isOffline var :  " + isOffline);


      // listen for Online event
      $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
        var onlineState = networkState;
        console.log("Online State Here");
        if (localStorage.getItem("userId") == null || localStorage.loggedIn == undefined) {
          $ionicLoading.hide();
          $state.go('login');
        } else {
          $ionicLoading.hide();
          $state.go('menuslider.menu');
        }

      })

      // listen for Offline event
      $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
        var offlineState = networkState;
        console.log("Offline State Here");
        $ionicLoading.hide();
        //  alert("Sorry No Internet")
        $state.go('offline');
      })

    }, false);

  };

})

starter.controller('menuSliderCtrl', function ($scope, $filter, MyServices, $rootScope, $state, $location, $ionicPlatform, $ionicLoading, $window, $ionicActionSheet, $ionicHistory, $translate, $ionicSideMenuDelegate) {


  $scope.isMenuOpen = function () {
    // alert("open")
    return $ionicSideMenuDelegate.isOpen();
  };

  /*localStorage.removeItem("userAvatar");*/
  /*$ionicHistory.clearCache().then(function() {
    $state.reload();
  });*/

  /* $scope.doRefresh = function() {
      $state.reload();
    };*/
  /* $ionicPlatform.registerBackButtonAction(function (event) {
   if($state.current.name=="menu"){
     navigator.app.exitApp(); //<-- remove this line to disable the exit
   }
   else {
     navigator.app.backHistory();
   }
 }, 100);
 */

  $scope.item = {};
  var language = localStorage.getItem("language");
  // alert("Lang "+language);
  if (language == null || language == "null") {
    $scope.item.language = 'en';
    $translate.use("en");
  }
  else {
    if (language == "en") {
      $scope.item.language = 'en';
      $translate.use("en");
    }
    else {
      $scope.item.language = 'ar';
      $translate.use("ar");
      $scope.myClass = "rtlcontent";
    }
  }



  //LogOut Menu
  $scope.logout = function () {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: $filter('translate')('logout'),
      titleText: $filter('translate')('areyousurelogout'),
      cancelText: $filter('translate')('cancel'),
      cancel: function () {

      },
      buttonClicked: function (index) {
        return true;

      },
      destructiveButtonClicked: function () {
        $ionicLoading.show({
          template: '<p class="text-center">{{"loggingout" | translate}}</p>'
        });

        var languageToStore = localStorage.getItem("language");
        console.log("LogOut Setted Value 1 " + localStorage.getItem("language"));
        window.localStorage.clear();
        //  $localStorage.$reset();
        console.log("LogOut Setted Value 2 " + localStorage.getItem("language"));
        //   localstorage.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        localStorage.loggedIn = undefined;
        localStorage.setItem("introscreens", true);
        localStorage.setItem("language", languageToStore);
        console.log("LogOut Setted Value 3 " + localStorage.getItem("language"));
        $ionicLoading.hide();
        $state.go("login");
      }
    });
  };
  //  configreload.onallpage();
  //  alert("ID Is " + localStorage.getItem("userId"));
  $scope.item = {};
  var username = localStorage.getItem("userName");
  var avatar = localStorage.getItem("userAvatar");//
  // alert("Avatar Value "+ avatar);
  var firtname = localStorage.getItem("userFirstname");
  var lastname = localStorage.getItem("userLastname");
  var city = localStorage.getItem("userCity");
  //  alert("City " + localStorage.getItem("userCity"));
  /*var data={"currentUserID": localStorage.getItem("userId")}
  var parameter=JSON.stringify(data);
  MyServices.registerProfileall(parameter).
                 then(function (response, status, headers) {
                          $scope.posts=response.data.data[0];
                          $scope.item.avatar=$scope.posts.avatar
                          $scope.item.user_login=$scope.posts.user_login
                          $scope.item.first_name=$scope.posts.first_name
                          $scope.item.last_name=$scope.posts.last_name
                          $scope.item.Country=$scope.posts.Country      
                          $scope.item.citycategories=$scope.posts.City
                         
                          $ionicLoading.hide();  
                    },function(data, status, header, config) {

                    });*/
  $scope.item.username = username;
  $scope.item.avatar = avatar;
  $scope.item.first_name = firtname;
  $scope.item.last_name = lastname;
  $scope.item.citycategories = city;


  // Ranking API CALL

  var data = { "currentUserID": localStorage.getItem("userId") };
  var parameter = JSON.stringify(data);
  //  alert("parameter--- " +parameter);
  MyServices.getRankingApi(parameter).
    then(function (response, status, headers) {
      //     alert("response.data--- " + JSON.stringify(response.data.ranking));
      if (response.data == null) {
        /*  $scope.item.Member_favourite_team = null;*/
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">{{"noclubselecity" | translate}}</p>',
          title: $filter('translate')('oops'),
          scope: $scope,
        });
        $timeout(function () {
          myPopup.close();
        }, 2000);
        $scope.item.ranking = "0%";

      }
      else {
        $scope.item.ranking = response.data.ranking;
      }
    }, function (data, status, header, config) {

    });


  // Ranking Api Call


})


starter.controller('menuCtrl', function ($scope, MyServices, $ionicPlatform, $timeout, $cordovaNetwork, $ionicHistory, $rootScope, $location, $state, $window, $filter, $translate) {

  /*console.log("First Name Check " + localStorage.getItem("userFirstname") );*/
  /*if(localStorage.getItem("userFirstname") == "" || localStorage.getItem("userLastname") == "" || localStorage("userCity") == ""){
                   // alert("gone In Consition");
                    $state.go('registerProfile');
                    
   }*/
  document.addEventListener("deviceready", function () {

    var type = $cordovaNetwork.getNetwork()
    console.log("Type var Meuctrl :  " + type);

    var isOnline = $cordovaNetwork.isOnline()
    console.log("isOnline var Meuctrl :  " + isOnline);

    var isOffline = $cordovaNetwork.isOffline()
    console.log("isOffline var Meuctrl :  " + isOffline);


    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
      var onlineState = networkState;
      $state.go('menuslider.menu');
    })

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
      var offlineState = networkState;
      $state.go('offline');
    })

  }, false);

  var backbutton = 0;
  $ionicPlatform.registerBackButtonAction(function (e) {
    $window.plugins.toast.showShortCenter($filter('translate')('presagaintexit'));
    //  alert("Current State Outside " +  $state.current.name);

    if ($rootScope.backButtonPressedOnceToExit || $state.current.name == 'menuslider.menu') {
      if (backbutton == 0) {
        // alert("Button Count in Condition " +  backbutton);
        backbutton++;
        //   alert("Button Count in Condition++ " +  backbutton);
        $window.plugins.toast.showShortCenter($filter('translate')('presagaintexit'));
        $timeout(function () {
          backbutton = 0;
        }, 2000);
      } else {
        //  alert("Button Count in Else " +  backbutton);
        ionic.Platform.exitApp();
        navigator.app.exitApp();
      }
      //ionic.Platform.exitApp();
    }
    else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    }
    else {
      $rootScope.backButtonPressedOnceToExit = true;
      window.plugins.toast.showShortCenter(
        $filter('translate')('pressbacktoexit'), function (a) { }, function (b) { }
      );
      setTimeout(function () {
        $rootScope.backButtonPressedOnceToExit = false;
      }, 2000);
    }
    e.preventDefault();
    return false;
  }, 101);


  $scope.item = {};
  var language = localStorage.getItem("language");
  // alert("Lang "+language);
  if (language == null || language == "null") {
    $scope.item.language = 'en';
    $translate.use("en");
  }
  else {
    if (language == "en") {
      $scope.item.language = 'en';
      $translate.use("en");
    }
    else {
      $scope.item.language = 'ar';
      $translate.use("ar");
      $scope.myClass = "rtlcontent";
    }
  }



  //	configreload.onallpage();
  //	alert("ID Is " + localStorage.getItem("userId"));
  /*$scope.item = {};
  var username = localStorage.getItem("userName");
  $scope.item.username = username;*/
  //	alert("UserName " + $scope.item.username);
  //	alert("UserName VAr " + username);

})

starter.controller('clubMenuCtrl', function ($scope, MyServices, $ionicPlatform, $timeout, $ionicHistory, $rootScope, $location, $state, $window, $translate) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);

  $scope.item = {};
  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    $scope.item.language = 'en';
    $translate.use("en");
  }
  else {
    if (language == "en") {
      $scope.item.language = 'en';
      $translate.use("en");
    }
    else {
      $scope.item.language = 'ar';
      $translate.use("ar");
      $scope.myClass = "rtlcontent";
    }
  }
})

starter.controller('matchMenuCtrl', function ($scope, MyServices, $ionicPlatform, $timeout, $ionicHistory, $rootScope, $location, $state, $window, $translate) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);

  $scope.item = {};
  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    $scope.item.language = 'en';
    $translate.use("en");
  }
  else {
    if (language == "en") {
      $scope.item.language = 'en';
      $translate.use("en");
    }
    else {
      $scope.item.language = 'ar';
      $translate.use("ar");
      $scope.myClass = "rtlcontent";
    }
  }


})

starter.controller('registerProfilesCtrl', function ($scope, MyServices, $stateParams, $filter, $translate, $ionicHistory, $rootScope, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $ionicActionSheet, $cordovaCamera, $cordovaFile, $ionicPlatform, $window) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    // $state.go('menuslider.menu');

    var checkforUserFirstName = localStorage.getItem("userFirstname");
    var checkforUserLastName = localStorage.getItem("userLastname");
    var checkforUserCity = localStorage.getItem("userCity");
    //    alert("checkforUserFirstName ---> " + JSON.stringify(checkforUserFirstName));

    if (checkforUserFirstName == "" || checkforUserLastName == "" || checkforUserCity == "" || localStorage.getItem("userCity") == "") {
      //  $state.go('login');
      //  alert("IFFFF");
      //$scope.saveProfile();
      var backbutton = 0;
      $ionicPlatform.registerBackButtonAction(function (e) {
        $window.plugins.toast.showShortCenter($filter('translate')('presagaintexit'));
        //alert("Current State Outside " +  $state.current.name);

        if ($rootScope.backButtonPressedOnceToExit || $state.current.name == 'registerProfile') {
          if (backbutton == 0) {
            // alert("Button Count in Condition " +  backbutton);
            backbutton++;
            //   alert("Button Count in Condition++ " +  backbutton);
            $window.plugins.toast.showShortCenter($filter('translate')('presagaintexit'));
            $timeout(function () {
              backbutton = 0;
            }, 2000);
          } else {
            //  alert("Button Count in Else " +  backbutton);

            window.localStorage.clear();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            localStorage.loggedIn = undefined;
            localStorage.setItem("introscreens", true);
            $ionicLoading.hide();
            ionic.Platform.exitApp();
            navigator.app.exitApp();
          }
          //ionic.Platform.exitApp();
        }
        else if ($ionicHistory.backView()) {
          $ionicHistory.goBack();
        }
        else {
          $rootScope.backButtonPressedOnceToExit = true;
          window.plugins.toast.showShortCenter(
            "Press back button again to exit", function (a) { }, function (b) { }
          );
          setTimeout(function () {
            $rootScope.backButtonPressedOnceToExit = false;
          }, 2000);
        }
        e.preventDefault();
        return false;
      }, 101);











    }
    else {
      $state.go('menuslider.menu');
      // alert("ELSEEEE");

    }

    e.preventDefault();
  }, 101);

  $scope.countrycategories_duplicate = [];
  $scope.citycategories_duplicate = [];
  $scope.clubcategories_duplicate = [];
  //$scope.citycategories=[];
  $scope.Member_favourite_team = [];
  //$scope.countrycategories=[];

  /*  var jsonObj12 = JSON.parse($stateParams.Filterinfo);
             
          
                     if(jsonObj12.Date_of_Birth != "")
                     {
                     $scope.item.Date_of_Birth = $filter("date")(jsonObj12.Date_of_Birth, 'yyyy-MM-dd');
                     console.log($scope.data.Date_of_Birth);
                     
                     }*/

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }



  function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

      if (arraytosearch[i][key] == valuetosearch) {
        return i;
      }
    }
    return null;
  }
  $scope.edit = false;

  /* var checkforUserFirstName = localStorage.getItem("userFirstname");
   var checkforUserLastName = localStorage.getItem("userLastname");*/
  //  alert("userFirstname :-- " + localStorage.getItem("userFirstname"));
  //   alert("Cityy :-- " + localStorage.getItem("userCity"));
  if (localStorage.getItem("userFirstname") == "" || localStorage.getItem("userLastname") == "" || localStorage.getItem("userCity") == "" || localStorage.getItem("userCity") == undefined) {

    $scope.edit = true;
  }
  else {
    $ionicPlatform.registerBackButtonAction(function (e) {
      //do your stuff
      $state.go('login');
      e.preventDefault();
    }, 101);

  }

  $scope.gobackcheck = function () {
    var checkforUserFirstName = localStorage.getItem("userFirstname");
    var checkforUserLastName = localStorage.getItem("userLastname");
    var checkforUserCity = localStorage.getItem("userCity");
    //    alert("checkforUserFirstName ---> " + JSON.stringify(checkforUserFirstName));

    if (checkforUserFirstName == "" || checkforUserLastName == "" || checkforUserCity == "" || localStorage.getItem("userCity") == "")
    //  if(saveProfile())
    {
      //  $state.go('login');
      //  alert("IFFFF");
      $scope.saveProfile();
      //  $state.go('menuslider.menu');

    }
    else {
      $state.go('menuslider.menu');
      // alert("ELSEEEE");

    }
  };


  /*if(localStorage.getItem("userLastname") == ""){
    $scope.edit = true;
  }*/

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.changeedit = function (val) {
    $scope.edit = val;
  }



  $ionicLoading.show();

  /**** Fetch Country *****/
  $scope.item = {};
  MyServices.getCountries("getCountry.php/").
    then(function (response, status, headers) {
      //  alert("Countries " +JSON.stringify(response.data.data.data));
      $scope.countrycategories = response.data.data.data;
      console.log("$scope.countrycategoriesAll Response : " + JSON.stringify($scope.countrycategories));
      $scope.countrycategories_duplicate = [];
      for (var i = 0; i < $scope.countrycategories.length; i++) {
        var objcountry = $scope.countrycategories[i].countryName;
        $scope.countrycategories_duplicate.push(objcountry);

      }

      /**** Fetch City *****/
      $scope.item = {};
      MyServices.getCities("getCity.php/").
        then(function (response, status, headers) {

          $scope.citycategories = response.data.data.data;
          console.log("$scope.citycategoriesAll Response : " + JSON.stringify($scope.citycategories));




          /**** Fetch Favuorite Position *****/
          MyServices.getFavPosition("getFavouritePosition.php/").
            then(function (response, status, headers) {
              $scope.Member_favourite_position = response.data.data;
              //07-09-2016---bakiii
              //   alert("Countries " +JSON.stringify(response.data.data.data));
              //    $scope.countrycategories=response.data.data.data;
              console.log("$scope.Member_favourite_position-All Response : " + JSON.stringify($scope.Member_favourite_position));
              $scope.positioncategories_duplicate = [];
              for (var i = 0; i < $scope.Member_favourite_position.length; i++) {
                var objposition = $scope.Member_favourite_position[i].Member_favourite_position;
                $scope.positioncategories_duplicate.push(objposition);
              }

              /**** Post All Data For Profile *****/
              $scope.item = [];
              $scope.updateProfile = {};
              var data = { "currentUserID": localStorage.getItem("userId") }
              var parameter = JSON.stringify(data);
              //alert("Para Register---> " + parameter);
              $ionicLoading.show();
              MyServices.registerProfileall(parameter).
                then(function (response, status, headers) {
                  $scope.posts = response.data.data[0];
                  // alert("All responsesssss :- " + JSON.stringify($scope.posts));
                  console.log("Respones For " + JSON.stringify(response.data.data[0]));
                  console.log("Respones For " + JSON.stringify($scope.posts));
                  // alert("Respones For ==== " + JSON.stringify($scope.posts));


                  localStorage.setItem("userName", $scope.posts.user_login);
                  localStorage.setItem("userEmail", $scope.posts.user_email);
                  localStorage.setItem("userFirstname", $scope.posts.first_name);
                  localStorage.setItem("userLastname", $scope.posts.last_name);
                  localStorage.setItem("userAvatar", $scope.posts.avatar);
                  localStorage.setItem("userCity", $scope.posts.City);



                  $scope.item.avatar = $scope.posts.avatar
                  $scope.item.user_login = $scope.posts.user_login
                  $scope.item.first_name = $scope.posts.first_name
                  $scope.item.last_name = $scope.posts.last_name

                  //   alert("$scope.item.JC--- " + JSON.stringify($scope.posts.JC));
                  $scope.item.JM = $scope.posts.JM
                  if ($scope.item.JM == null) {
                    $scope.item.JM = false;
                    //   alert("FAAAlsJC--- " + JSON.stringify($scope.item.JC));
                  } else {
                    $scope.item.JM = true;
                    //   alert("trueeJC--- " + JSON.stringify($scope.item.JC));
                  }

                  //   alert("$scope.item.JC--- " + JSON.stringify($scope.posts.JC));
                  $scope.item.AM = $scope.posts.AM
                  if ($scope.item.AM == null) {
                    $scope.item.AM = false;
                    //   alert("FAAAlsJC--- " + JSON.stringify($scope.item.JC));
                  } else {
                    $scope.item.AM = true;
                    //   alert("trueeJC--- " + JSON.stringify($scope.item.JC));
                  }

                  //   alert("$scope.item.JC--- " + JSON.stringify($scope.posts.JC));
                  $scope.item.EC = $scope.posts.EC
                  if ($scope.item.EC == null) {
                    $scope.item.EC = false;
                    //   alert("FAAAlsJC--- " + JSON.stringify($scope.item.JC));
                  } else {
                    $scope.item.EC = true;
                    //   alert("trueeJC--- " + JSON.stringify($scope.item.JC));
                  }

                  // alert("$scope.item.EM--- " + JSON.stringify($scope.posts.EM));
                  $scope.item.EM = $scope.posts.EM
                  if ($scope.item.EM == null) {
                    $scope.item.EM = false;
                    //   alert("FAAAlsEM--- " + JSON.stringify($scope.item.EM));
                  } else {
                    $scope.item.EM = true;
                    //     alert("trueeEM--- " + JSON.stringify($scope.item.EM));
                  }

                  //  alert("$scope.item.JC--- " + JSON.stringify($scope.posts.JC));
                  $scope.item.JC = $scope.posts.JC
                  if ($scope.item.JC == null) {
                    $scope.item.JC = false;
                    //  alert("FAAAlsJC--- " + JSON.stringify($scope.item.JC));
                  } else {
                    $scope.item.JC = true;
                    //   alert("trueeJC--- " + JSON.stringify($scope.item.JC));
                  }

                  //  alert("$scope.item.JC--- " + JSON.stringify($scope.posts.JC));
                  $scope.item.AC = $scope.posts.AC
                  if ($scope.item.AC == null) {
                    $scope.item.AC = false;
                    //  alert("FAAAlsJC--- " + JSON.stringify($scope.item.JC));
                  } else {
                    $scope.item.AC = true;
                    //   alert("trueeJC--- " + JSON.stringify($scope.item.JC));
                  }




                  if ($scope.posts.Country === undefined) {
                    $scope.item.countrycategories = "";
                  }
                  else {
                    $scope.item.countrycategories = $scope.posts.Country

                  }


                  console.log("Country Selected : " + $scope.item.countrycategories);
                  if ($scope.item.countrycategories == "") {

                  }
                  else {
                    var index = functiontofindIndexByKeyValue($scope.countrycategories, "countryName", $scope.item.countrycategories);
                    console.log("index : " + index);

                    $scope.selectedItem_country = index;


                  }

                  console.log("IF " + $scope.posts.City);
                  if ($scope.posts.City === undefined) {
                    console.log("IF ")
                    $scope.item.citycategories = "";
                  }
                  else {
                    console.log("Else ")
                    $scope.item.citycategories = $scope.posts.City;

                  }

                  console.log("Fetch City From Api : " + $scope.item.citycategories);
                  if ($scope.item.citycategories == "") {

                  }
                  else {
                    if ($scope.item.countrycategories == "") {

                    }
                    else {
                      var index = functiontofindIndexByKeyValue($scope.countrycategories, "countryName", $scope.item.countrycategories);
                      console.log("index : " + index);
                      var fetchIdfromCountry = $scope.countrycategories[index].countryID;

                      console.log("$scope.citycategories" + $scope.citycategories);
                      console.log("fetchIdfromCountry" + fetchIdfromCountry);
                      var data = { "countryID": fetchIdfromCountry };
                      var parameter = JSON.stringify(data);
                      //  alert("Param Based On Country" + parameter);
                      MyServices.getCityByCountry(parameter).
                        then(function (response, status, headers) {
                          //  alert("Response Citry " + JSON.stringify(response.data.data));
                          if (response.data.data == null) {
                            $scope.item.citycategories = null;
                            var myPopup = $ionicPopup.show({
                              template: '<p class="text-center">{{"nocityavaiselecountry" | translate}}</p>',
                              title: $filter('translate')('oops'),
                              scope: $scope,
                            });
                            $timeout(function () {
                              myPopup.close();
                            }, 2000);

                          }
                          else {
                            $scope.citycategories = response.data.data;
                            console.log("$scope.citycategoriesAll Response : " + JSON.stringify($scope.citycategories));
                            $scope.citycategories_duplicate = [];
                            for (var i = 0; i < $scope.citycategories.length; i++) {
                              var objcity = $scope.citycategories[i].city_name;
                              $scope.citycategories_duplicate.push(objcity);
                            }
                          }
                        }, function (data, status, header, config) {
                          $scope.errorData = data;
                        });

                      var index = functiontofindIndexByKeyValue($scope.citycategories, "city_name", $scope.item.citycategories);
                      console.log("index : " + index);

                      $scope.selectedItem_city = index;
                    }
                  }




                  console.log("FAv Club : -- " + $scope.posts.Member_favourite_team);
                  if ($scope.posts.Member_favourite_team === undefined) {
                    $scope.item.Member_favourite_team = "";
                    console.log("IFFF FAv Club : -- " + $scope.posts.Member_favourite_team);

                  }
                  else {
                    $scope.item.Member_favourite_team = $scope.posts.Member_favourite_team;
                    console.log("Elsee FAv Club : -- " + $scope.posts.Member_favourite_team);

                  }




                  // $scope.item.Member_favourite_team=$scope.posts.Member_favourite_team; 

                  if ($scope.item.Member_favourite_team == "") {
                    if ($scope.item.citycategories == "") {

                    }
                    else {
                      var indexofcity = functiontofindIndexByKeyValue($scope.citycategories, "city_name", $scope.item.citycategories);
                      var getcityid = $scope.citycategories[indexofcity].city_id;
                      var selectedcity = getcityid;



                      var data = { "currentUserCity": selectedcity };
                      var parameter = JSON.stringify(data);
                      MyServices.getFavClubbyCity(parameter).
                        then(function (response, status, headers) {
                          if (response.data.data == null) {
                            /*  $scope.item.Member_favourite_team = null;*/
                            var myPopup = $ionicPopup.show({
                              template: '<p class="text-center">No clubs available for selected city!</p>',
                              title: 'Oops!',
                              scope: $scope,
                            });
                            $timeout(function () {
                              myPopup.close();
                            }, 2000);
                            $scope.clubcategories_duplicate = null;

                          }
                          else {
                            $scope.Member_favourite_team = response.data.data;
                            $scope.clubcategories_duplicate = [];
                            for (var i = 0; i < $scope.Member_favourite_team.length; i++) {
                              var objclub = $scope.Member_favourite_team[i].clubName;
                              $scope.clubcategories_duplicate.push(objclub);
                            }
                            console.log("Club Response : " + JSON.stringify($scope.clubcategories_duplicate));
                            console.log("Club Response All : " + JSON.stringify($scope.Member_favourite_team));


                          }
                        }, function (data, status, header, config) {
                          $scope.errorData = data;
                        });
                    }
                  }
                  else {
                    if ($scope.item.citycategories == "") {

                    }
                    else {
                      var indexofcity = functiontofindIndexByKeyValue($scope.citycategories, "city_name", $scope.item.citycategories);
                      var getcityid = $scope.citycategories[indexofcity].city_id;
                      var selectedcity = getcityid;



                      var data = { "currentUserCity": selectedcity };
                      var parameter = JSON.stringify(data);
                      MyServices.getFavClubbyCity(parameter).
                        then(function (response, status, headers) {
                          if (response.data.data == null) {
                            /*  $scope.item.Member_favourite_team = null;*/
                            var myPopup = $ionicPopup.show({
                              template: '<p class="text-center">{{"noclubselecity" | translate}}</p>',
                              title: $filter('translate')('oops'),
                              scope: $scope,
                            });
                            $timeout(function () {
                              myPopup.close();
                            }, 2000);
                            $scope.clubcategories_duplicate = null;

                          }
                          else {
                            $scope.Member_favourite_team = response.data.data;
                            $scope.clubcategories_duplicate = [];
                            for (var i = 0; i < $scope.Member_favourite_team.length; i++) {
                              var objclub = $scope.Member_favourite_team[i].clubName;
                              $scope.clubcategories_duplicate.push(objclub);
                            }
                            console.log("Club Response : " + JSON.stringify($scope.clubcategories_duplicate));
                            console.log("Club Response All : " + JSON.stringify($scope.Member_favourite_team));

                            var index = functiontofindIndexByKeyValue($scope.Member_favourite_team, "clubName", $scope.item.Member_favourite_team);
                            console.log("index : " + index);

                            $scope.selectedItem_club = index;
                          }
                        }, function (data, status, header, config) {
                          $scope.errorData = data;
                        });
                    }
                  }

















                  //   window.localStorage.setItem("userCity", $scope.item.citycategories);
                  $scope.item.Nationality = $scope.posts.Nationality
                  console.log("Dateeeeeeeeeeee: ---  " + $scope.posts.Date_of_Birth);
                  if ($scope.posts.Date_of_Birth == "" || $scope.posts.Date_of_Birth == null) {
                    //  $scope.item.Date_of_Birth = " ";
                    $scope.item.Date_of_Birth_display = "";
                  }
                  else {
                    $scope.item.Date_of_Birth = $filter("date")($scope.posts.Date_of_Birth, 'yyyy-MM-dd');
                    $scope.item.Date_of_Birth_display = $filter("date")($scope.posts.Date_of_Birth, 'yyyy-MM-dd');
                  }

                  /* if(jsonObj12.datefrom != "")
                     {
                     $scope.data.fromdate = $filter("date")(jsonObj12.datefrom, 'yyyy-MM-dd');
                     console.log($scope.data.datefrom);
                     
                     }*/






                  $scope.item.Member_favourite_position = $scope.posts.Member_favourite_position;
                  $scope.item.Member_mobile_no = $scope.posts.Member_mobile_no;
                  $scope.item.user_email = $scope.posts.user_email;
                  if ($scope.item.Member_favourite_position == "") {

                  }
                  else {

                    var indexoffavpos = functiontofindIndexByKeyValue($scope.Member_favourite_position, "Member_favourite_position", $scope.item.Member_favourite_position);
                    $scope.selectedItem_position = indexoffavpos;

                  }




                  $scope.item.user_email = $scope.posts.user_email
                  $scope.item.user_mobile = $scope.posts.Member_mobile_no
                  $scope.item.Member_description = $scope.posts.Member_description
                  $scope.item.Member_condition = $scope.posts.Member_condition
                  $ionicLoading.hide();
                }, function (data, status, header, config) {

                });
              /**** Post All Data For Profile *****/






            }, function (data, status, header, config) {
              $scope.errorData = data;
            });
          /**** Fetch Favuorite Position *****/






        }, function (data, status, header, config) {
          $scope.errorData = data;
        });
      /**** Fetch City *****/


    }, function (data, status, header, config) {
      $scope.errorData = data;
    });

  /**** Fetch Country *****/







  /**** Fetch City On Bases Of Country *****/
  $scope.selectedvalue_countrydup = function (selected) {
    console.log('Select Countery Arrya ' + $scope.selectedItem_country);
    console.log('Select Countery Selected ' + selected);

    if (selected == null) {
      $scope.item.countrycategories = "";
      $scope.item.citycategories = "";

      $scope.item.Member_favourite_team = "";
      $scope.citycategories_duplicate = [];
      $scope.clubcategories_duplicate = [];

      return false;

    }
    console.log('Pass Country ID For City:::--> ' + $scope.item.countryId);
    $scope.item.countrycategories = $scope.countrycategories[selected].countryName;
    $scope.item.countryId = $scope.countrycategories[selected].countryID;


    var data = { "countryID": $scope.item.countryId };
    var parameter = JSON.stringify(data);
    // alert("Param Based On Country" + parameter);
    MyServices.getCityByCountry(parameter).
      then(function (response, status, headers) {
        //   alert("Response Citry " + JSON.stringify(response.data.data));
        if (response.data.data == null) {
          $scope.item.citycategories = null;
          var myPopup = $ionicPopup.show({
            template: '<p class="text-center">{{"nocityavaiselecountry" | translate}}</p>',
            title: $filter('translate')('oops'),
            scope: $scope,
          });
          $timeout(function () {
            myPopup.close();
          }, 2000);

        }
        else {
          $scope.citycategories = response.data.data;
          console.log("$scope.citycategoriesAll Response : " + JSON.stringify($scope.citycategories));
          $scope.citycategories_duplicate = [];
          for (var i = 0; i < $scope.citycategories.length; i++) {
            var objcity = $scope.citycategories[i].city_name;
            $scope.citycategories_duplicate.push(objcity);
          }

          /* $scope.selectedItem_city=0;
           $scope.selectedItem_club=0;*/
        }
      }, function (data, status, header, config) {
        $scope.errorData = data;
      });
  }
  $scope.selectedvalue_clubdup = function (selected) {

    if (selected == null) {
      $scope.item.Member_favourite_team = "";

      return false;

    }
    $scope.item.Member_favourite_team = $scope.Member_favourite_team[selected].clubName;
  }


  $scope.selectedvalue_positiondup = function (selected) {

    if (selected == null) {
      $scope.item.Member_favourite_position = "";

      return false;

    }
    $scope.item.Member_favourite_position = $scope.Member_favourite_position[selected].Member_favourite_position;

  }



  /**** Fetch City On Bases Of Country *****/

  /**** Fetch Fav club On Bases Of City *****/
  $scope.selectedvalue_citydup = function (selected) {
    if (selected == null) {
      $scope.clubcategories_duplicate = [];
      $scope.item.Member_favourite_team = "";
      $scope.item.citycategories = "";

      return false;

    }

    var selectedcity = $scope.citycategories[selected].city_id;

    $scope.item.citycategories = $scope.citycategories[selected].city_name;

    var data = { "currentUserCity": selectedcity };
    var parameter = JSON.stringify(data);
    MyServices.getFavClubbyCity(parameter).
      then(function (response, status, headers) {
        if (response.data.data == null) {
          /*  $scope.item.Member_favourite_team = null;*/
          var myPopup = $ionicPopup.show({
            template: '<p class="text-center">{{"noclubselecity" | translate}}</p>',
            title: $filter('translate')('oops'),
            scope: $scope,
          });
          $timeout(function () {
            myPopup.close();
          }, 2000);
          $scope.clubcategories_duplicate = null;

        }
        else {
          $scope.Member_favourite_team = response.data.data;
          $scope.clubcategories_duplicate = [];
          for (var i = 0; i < $scope.Member_favourite_team.length; i++) {
            var objclub = $scope.Member_favourite_team[i].clubName;
            $scope.clubcategories_duplicate.push(objclub);
          }
          console.log("Club Response : " + JSON.stringify($scope.clubcategories_duplicate));
          console.log("Club Response All : " + JSON.stringify($scope.Member_favourite_team));
        }
      }, function (data, status, header, config) {
        $scope.errorData = data;
      });




  }

  /**** Fetch Fav club On Bases Of City *****/


  /**** Fetch City on Selected Country *****/
  /* 
   $scope.GetselectedCountry = function(catcountry){ 
     var countryid = $scope.item.countrycategories;
     var data={"countryID": countryid};
     var parameter=JSON.stringify(data); 
     MyServices.getCityByCountry(parameter).
                then(function (response, status, headers) {
              //   alert("Response " + JSON.stringify(response.data.data));
         if(response.data.data == null){
            $scope.item.citycategories = null;
             var myPopup = $ionicPopup.show({
             template: '<p class="text-center">No city available for selected country!</p>',
             title: 'Oops!',
             scope: $scope,
             });
             $timeout(function () {
               myPopup.close(); //close the popup after 3 seconds for some reason
               }, 2000);
 
         } 
         else{
             $scope.citycategories=response.data.data;
         }       
         },function(data, status, header, config) {
           $scope.errorData=data;
         });
     };
     */
  /**** Fetch City on Selected Country *****/



  /**** Fetch Club On Bases Of City *****/
  /* $scope.selectedvalue_citydup = function (selected)
   {
      console.log('Select Countery Arrya '+$scope.selectedvalue_citydup );
      console.log('Select Countery Selected '+ selected );
      $scope.item.citycategories=$scope.countrycategories[selected].city_name;
      $scope.item.cityId=$scope.countrycategories[selected].city_id;
 
 
     var data={"currentUserCity": $scope.item.cityId};
     var parameter=JSON.stringify(data); 
     MyServices.getFavClubbyCity(parameter).
                then(function (response, status, headers) {
         if(response.data.data == null){
            $scope.item.Member_favourite_team = null;
             var myPopup = $ionicPopup.show({
             template: '<p class="text-center">No clubs available for selected city!</p>',
             title: 'Oops!',
             scope: $scope,
             });
             $timeout(function () {
               myPopup.close(); 
               }, 2000);
 
         } 
         else{
             $scope.Member_favourite_team=response.data.data;
         }       
         },function(data, status, header, config) {
           $scope.errorData=data;
         });
   }          */
  /**** Fetch Club On Bases Of City *****/

  /**** Fetch Fav Position *****/
  // $scope.item = {};
  /* MyServices.getFavPosition("getFavouritePosition.php/").
           then(function (response, status, headers) {
               $scope.Member_favourite_position=response.data.data;
             //07-09-2016---bakiii
            //   alert("Countries " +JSON.stringify(response.data.data.data));
           //    $scope.countrycategories=response.data.data.data;
               console.log("$scope.countrycategoriesAll Response : " + JSON.stringify($scope.Member_favourite_position));
               $scope.positioncategories_duplicate = [];
               for (var i=0; i<$scope.Member_favourite_position.length; i++){
                 var objposition = $scope.Member_favourite_position[i].Member_favourite_position;
                 $scope.positioncategories_duplicate.push(objposition);

               }




             },function(data, status, header, config) {
                   $scope.errorData=data;
             }); *///baki
  /**** Fetch Fav Position *****/

  /**** Fetch Fav Club on Selected City *****/
  /* $scope.GetselectedCity = function(catcity){ 
   var cityid = $scope.item.citycategories;
 
   var data={"currentUserCity": cityid};
   var parameter=JSON.stringify(data); 
   MyServices.getFavClubbyCity(parameter).
              then(function (response, status, headers) {
       if(response.data.data == null){
          $scope.item.Member_favourite_team = null;
           var myPopup = $ionicPopup.show({
           template: '<p class="text-center">No clubs available for selected city!</p>',
           title: 'Oops!',
           scope: $scope,
           });
           $timeout(function () {
             myPopup.close();
             }, 2000);

       } 
       else{
           $scope.Member_favourite_team=response.data.data;
       }       
       },function(data, status, header, config) {
         $scope.errorData=data;
       });
   };*/
  /**** Fetch Fav Club on Selected City *****/

  /**** Fetch Fav Club *****/
  $scope.item = {};
  //   $scope.updateProfile = {};
  var data = { "currentUserCity": localStorage.getItem("userCity") };
  var parameter = JSON.stringify(data);
  MyServices.getFavClub(parameter).
    then(function (response, status, headers) {
      $scope.Member_favourite_team = response.data.data;
    }, function (data, status, header, config) {
      $scope.errorData = data;
    });
  /**** Fetch Fav Club *****/



  /**** Save data - Post Button For Storing Profile *****/
  $scope.saveProfile = function () {
    var showAlert = function (alertTitle) {
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('alert'),
        template: alertTitle,
        buttons: [{
          text: $translate.instant('ok')
        }]
      });
      alertPopup.then(function (res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
    var validateCaseSensitiveEmail = function (email) {
      var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (reg.test(email)) {
        return true;
      }
      else {
        return false;
      }
    };
    var validateTenDigitNumber = function (number) {
      var reg = /^[1-9]{1}[0-9]{9}$/
      if (reg.test(number)) {
        return true;
      }
      else {
        return false;
      }
    };


    var validationfun = function () {
      //bakki
      console.log("Countey Selected  " + $scope.item.countrycategories);
      console.log("Ciiityyy Selected  " + $scope.item.citycategories);
      console.log("FavCLUBBB Selected  " + $scope.item.Member_favourite_team);
      //  alert("Date_of_Birth  " +  $scope.item.Date_of_Birth);

      if ($scope.item.first_name == "") {
        showAlert('<p class="text-center">{{"plsentfirstname" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if ($scope.item.last_name == "") {
        showAlert('<p class="text-center">{{"plsentlastname" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if ($scope.item.countrycategories == "") {
        showAlert('<p class="text-center">{{"plsseleyoucount" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if ($scope.item.citycategories == "") {
        showAlert('<p class="text-center">{{"plsselectcity" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if ($scope.item.Nationality == "" || !$scope.item.Nationality) {
        showAlert('<p class="text-center">{{"plsselenationality" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if ($scope.item.Date_of_Birth == null || !$scope.item.Date_of_Birth || $scope.item.Date_of_Birth == "" || $scope.item.Date_of_Birth == "Invalid Date") {
        showAlert('<p class="text-center">{{"plsentdob" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if ($scope.item.Member_favourite_team == "" || !$scope.item.Member_favourite_team) {
        showAlert('<p class="text-center">{{"plsselecfavclub" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if ($scope.item.Member_favourite_position == "" || !$scope.item.Member_favourite_position) {
        showAlert('<p class="text-center">{{"plsselecfavposition" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (!validateCaseSensitiveEmail($scope.item.user_email)) {
        showAlert('<p class="text-center">{{"plsentvalemailadd" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (!validateTenDigitNumber($scope.item.user_mobile)) {
        showAlert('<p class="text-center">{{"plsenttendigmobnum" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if ($scope.item.Member_description == "" || !$scope.item.Member_favourite_team) {
        showAlert('<p class="text-center">{{"plsentdesc" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if ($scope.item.Member_condition == "" || !$scope.item.Member_favourite_team) {
        showAlert('<p class="text-center">{{"plsentcondition" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }

      return true;
    }

    if (validationfun()) {
      $ionicLoading.show();

      /* alert("$scope.item.JM  --" +  $scope.item.JM);
       alert("$scope.item.AM  --" +  $scope.item.AM);
       alert("$scope.item.EC  --" +  $scope.item.EC);
       alert("$scope.item.EM  --" +  $scope.item.EM);
       alert("$scope.item.JC  --" +  $scope.item.JC);
       alert("$scope.item.AC  --" +  $scope.item.AC);*/

      if ($scope.item.JM == true) {
        $scope.item.JM = "JM";
      } else {
        $scope.item.JM = "";
      }

      if ($scope.item.AM == true) {
        $scope.item.AM = "AM";
      } else {
        $scope.item.AM = "";
      }

      if ($scope.item.EC == true) {
        $scope.item.EC = "EC";
      } else {
        $scope.item.EC = "";
      }

      if ($scope.item.EM == true) {
        $scope.item.EM = "EM";
      } else {
        $scope.item.EM = "";
      }
      // alert("$scope.item.JC -- "+$scope.item.JC);
      if ($scope.item.JC == true) {
        $scope.item.JC = "JC";
      } else {
        $scope.item.JC = "";
      }
      //   alert("$scope.item.AC -- "+$scope.item.AC);
      if ($scope.item.AC == true) {
        $scope.item.AC = "AC";
      } else {
        $scope.item.AC = "";
      }

      var multiNotifications = [{ "notification": $scope.item.JM },
      { "notification": $scope.item.AM },
      { "notification": $scope.item.EC },
      { "notification": $scope.item.EM },
      { "notification": $scope.item.JC },
      { "notification": $scope.item.AC }]

      //  var multiNotificationsJSON = JSON.stringify(multiNotifications);

      //      alert("multiNotificationss:-----  " + JSON.stringify(multiNotifications));
      //
      var indexcity = functiontofindIndexByKeyValue($scope.citycategories, "city_name", $scope.item.citycategories);
      console.log("index Cityyy Value : " + indexcity);

      var cityId = $scope.citycategories[indexcity].city_id;
      /* var cityName = $.grep($scope.citycategories, function (catcity) {
            return catcity.city_id == cityId;          
       })[0].city_name;*/

      var indexcountry = functiontofindIndexByKeyValue($scope.countrycategories, "countryName", $scope.item.countrycategories);
      console.log("index country Value : " + indexcountry);
      console.log("Country---Cat : " + $scope.countrycategories);
      console.log("Country---CatItem : " + $scope.item.countrycategories);


      var countryid = $scope.countrycategories[indexcountry].countryID;
      /*  var countryName = $.grep($scope.countrycategories, function (catcountry) {
             return catcountry.countryID == countryid;
            
        })[0].countryName;*/
      var dateofBirth = $filter('date')($scope.item.Date_of_Birth, "yyyy-MM-dd");
      // alert("DOB VAR "+ dateofBirth);


      /*alert("CityName : "+ cityName);*/
      //     alert("CityID : "+ cityId);
      /* alert("Country : "+ countryName);*/
      //   alert("CountryID : "+ countryid);

      var indexfavclub = functiontofindIndexByKeyValue($scope.Member_favourite_team, "clubName", $scope.item.Member_favourite_team);
      //   console.log("index Cityyy Value : " + indexcity);

      var clubId = $scope.Member_favourite_team[indexfavclub].clubID;

      var indexfavpos = functiontofindIndexByKeyValue($scope.Member_favourite_position, "Member_favourite_position", $scope.item.Member_favourite_position);
      // alert("IndexFavPos--indexfavpos " + indexfavpos);
      var favpostionId = $scope.Member_favourite_position[indexfavpos].id;
      // alert("IndexFavPos favpostionId" + favpostionId);      

      var msgdata = {
        "currentUserID": localStorage.getItem("userId"),
        "txtUserFirstName": $scope.item.first_name,
        "txtUserLastName": $scope.item.last_name,
        "txtUserCountry": countryid,
        "txtUserCity": cityId,
        "txtUserNationality": $scope.item.Nationality,
        "txtUserDOB": dateofBirth,
        "txtUserFavouriteClub": clubId,
        "txtUserFavouritePosition": favpostionId,
        "txtUserEmail": $scope.item.user_email,
        "txtUsermobile": $scope.item.user_mobile,
        "txtUserDesciption": $scope.item.Member_description,
        "notificationPermission": multiNotifications,
        "txtUserCondition": $scope.item.Member_condition
      };
      var parameter = JSON.stringify(msgdata);
      //  alert("Para "+ parameter);
      console.log("Para " + parameter);
      MyServices.updateProfileAll(parameter).
        then(function (data, status, headers) {
          $ionicLoading.hide();
          //  alert("Response Of Message : " + data.data.message);
          if (data.data.message == "Profile Updated") {

            console.log("Profile  Response " + JSON.stringify(data.data));
            $scope.edit = !$scope.edit;
            //  alert("$scope.edit : " +$scope.edit);
            // alert("hiiiiii");
            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('profileupdate'),
              template: '<p class="text-center">{{"profiupdatedsuccess" | translate}}<p>',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });//100
            console.log("Nationality:::----->> " + data.data.data.Nationality);
            console.log("Firstname:::----->> " + data.data.data.first_name);
            console.log("Lastnamename:::----->> " + data.data.data.last_name);
            console.log("city " + data.data.data.City);
            //   localStorage.setItem("userName", data.data.data.);
            //  localStorage.setItem("userEmail", $scope.posts.user_email);
            localStorage.setItem("userFirstname", data.data.data.first_name);
            localStorage.setItem("userLastname", data.data.data.last_name);
            //  localStorage.setItem("userAvatar",$scope.posts.avatar);
            localStorage.setItem("userCity", data.data.data.City);

            $state.go('registerProfile', null, { reload: true });

          }
          else {
            // alert("hiiiiii");
            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });//100
          }


        }, function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('sorry'),
            template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });//100

        });
    }

  }
  /**** Save data - Post Button For Storing Profile *****/


  /*** display alert to choose where to get the image from ***/
  $scope.images = [];
  $scope.addImage = function () {
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: $translate.instant('gallery') },
        { text: $translate.instant('camera') }
      ],
      titleText: $filter('translate')('profphoto'),
      cancelText: $filter('translate')('cancel'),
      buttonClicked: function (index) {
        $scope.showImage(index);
      }
    });
  }
  $scope.showImage = function (type) {
    $scope.hideSheet();
    if (type == 1) {
      navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        quality: 100
      });

      function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
        localStorage.setItem("userAvatar", image.src);
        $scope.imageupload();
      }

      function onFail(message) {
        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('failed'),
          template: '<p class="text-center">{{"failedbecause" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
      }
    }
    else if (type == 0) {
      navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        quality: 100
      });

      function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/png;base64," + imageData;
        localStorage.setItem("userAvatar", image.src);
        $scope.imageupload();
      }

      function onFail(message) {
        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('failed'),
          template: '<p class="text-center">{{"failedbecause" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
      }
    }
    else if (type == 2)//registerbaki
    {
      var image = document.getElementById('myImage');
      image.src = "img/defaultfootball.png";
      localStorage.setItem(localStorage.getItem("userAvatar"), null);
    }

  }
  /*** display alert to choose where to get the image from ***/


  /**** Image Uploading Profile *****/

  $scope.imageupload = function () {
    var data = { "user_id": localStorage.getItem("userId"), "data": localStorage.getItem("userAvatar"), "imagename": " " };
    var parameter = JSON.stringify(data);
    $ionicLoading.show();
    MyServices.updateProfileImage(parameter).
      then(function (data, status, headers) {
        $ionicLoading.hide();
        $scope.edit = true;
        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('profileimgupdate'),
          template: '<p class="text-center">{{"proimgupdsuccess" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
      }, function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + JSON.stringify(data) +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;
        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('sorry'),
          template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });//100

      });
  }

  /**** Image Uploading Profile *****/




})



starter.controller('profileCtrl', function ($scope, MyServices, $ionicActionSheet, $state, $ionicLoading) {

  $scope.user = MyServices.getUser();

  $scope.showLogOutMenu = function () {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Logout',
      titleText: 'Are you sure you want to logout?',
      cancelText: 'Cancel',
      cancel: function () { },
      buttonClicked: function (index) {
        return true;
      },
      destructiveButtonClicked: function () {
        $ionicLoading.show({
          template: 'Logging out...'
        });

        //facebook logout
        /*facebookConnectPlugin.logout(function(){
          $ionicLoading.hide();
          $state.go('login');
        },
        function(fail){
          $ionicLoading.hide();
        });*/
      }
    });
  };
})



starter.controller('clubSliderCtrl', function ($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  /* $scope.loginData = {};
 
   // Create the login modal that we will use later
   $ionicModal.fromTemplateUrl('templates/log.html', {
     scope: $scope
   }).then(function(modal) {
     $scope.modal = modal;
   });
 
   // Triggered in the login modal to close it
   $scope.closeLogin = function() {
     $scope.modal.hide();
   };
 
   // Open the login modal
   $scope.login = function() {
     $scope.modal.show();
   };
 
   // Perform the login action when the user submits the login form
   $scope.doLogin = function() {
     console.log('Doing login', $scope.loginData);
 
     // Simulate a login delay. Remove this and replace with your login
     // code if using a login system
     $timeout(function() {
       $scope.closeLogin();
     }, 1000);
   };*/
})

starter.controller('supervisorClubSliderCtrl', function ($scope, $ionicModal, $timeout) {

})

starter.controller('joinedClubCtrl', function ($scope, MyServices, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup) {

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $ionicLoading.show();
  $scope.items = [];
  var data = { "getClubCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //	alert("parameter " + parameter);
  MyServices.joinedCluball(parameter).
    then(function (response, status, headers) {
      //alert("service user id " +  localStorage.getItem("userId"));
      //    $scope.items = JSON.stringify(response.data.data);
      /*alert("Res " + response.data);
      alert("Res " + response.data.data);
      alert("Res JSON " + JSON.stringify(response.data.success));
      alert("Res JSON data.data " + JSON.stringify(response.data.data));
      alert("Res JSON data" + JSON.stringify(response.data));*/
      if (response.data.data == null) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">You Have Not Join Any Club Yet!</p>',
          title: 'Sorry!'
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        $ionicLoading.hide();
        $scope.items = response.data.data;

      }
      console.log(parameter);

    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  $scope.getmemberdetails = function (clubID) {
    //	alert("Task Id is "+ clubID);
    //	$location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("memberlists", { "clubID": clubID });
    console.log($scope.getmemberdetails);
    //$state.go('sentmessagedetails' + id);
  }
})

starter.controller('clubInYourAreaSliderCtrl', function ($scope, $translate, MyServices, $ionicModal, $ionicPlatform, $filter, $window, $location, $ionicLoading, $ionicPopup, $ionicFilterBar, $timeout, $state, $ionicHistory, $stateParams, $ionicConfig) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('clubmenu');
    e.preventDefault();
  }, 101);

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };


  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }



  $scope.numberOfItemsToDisplay = 5; // number of item to load each time
  $scope.items = [];
  var data = { "getClubCreatedBy": localStorage.getItem("userId"), "lang_term": language }
  var parameter = JSON.stringify(data);
  //  alert("Parameter LAng :-- " + parameter);
  $ionicLoading.show();
  MyServices.clubInYourAreaall(parameter).
    then(function (response, status, headers) {
      //alert("items : " + JSON.stringify(response.data.data.club));
      // alert("Items Data.Club ClubArea " + response.data.data.club[0]);
      $ionicLoading.hide();
      $scope.addMoreItem = function (done) {
        // alert("call");
        console.log("add more " + $scope.items.length + " : " + $scope.numberOfItemsToDisplay)
        if ($scope.items.length > $scope.numberOfItemsToDisplay) {
          $scope.numberOfItemsToDisplay += 2; // load 20 more items
          // done(); // need to call this when finish loading more data
        }
        else {

          $scope.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }

      $scope.items = response.data.data.club;
      // alert("Parameter LAng :-- " + JSON.stringify($scope.items));
      $ionicLoading.hide();

      // alert("items : " + JSON.stringify($scope.items));
      // alert("Items Data.Club ClubArea " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      })

  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };


  $scope.getjoinclub = function (clubID) {
    // alert("Task Id is "+ clubID);
    // $scope.items = [];	
    //	var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
    var data = { "getClubCreatedBy": localStorage.getItem("userId"), "clubID": clubID }
    //	alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
    var parameter = JSON.stringify(data);
    //	alert("Items " + JSON.stringify(response.data.data));
    //	$ionicLoading.show();
    $ionicLoading.show();
    MyServices.clickToJoinClub(parameter).
      then(function (response, status, headers) {
        if (response.data.success != 1) {
          $ionicLoading.hide();
					/*var myPopup = $ionicPopup.show({
					template: '<p class="text-center">You are Already Applied on This Club!</p>',
					title: 'Sorry!'
					//scope: $scope,
				});*/
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('sorry'),
            template: '<p class="text-center">{{"youralreaapponthiclub" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });
          //    $state.go($state.current, {}, {reload: true}); 
          //	            $state.reload();
          //    $window.location.reload(true);
          //   $state.go('clubslidermenu.clubinyourarea',null,{reload:true});
        }
        else {
          $ionicLoading.hide();
          function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

            for (var i = 0; i < arraytosearch.length; i++) {

              if (arraytosearch[i][key] == valuetosearch) {
                return i;
              }
            }
            return null;
          }
          var index = functiontofindIndexByKeyValue($scope.items, "clubID", clubID);
          var clubjoinobj = $scope.items[index];
          clubjoinobj.status = "Pending";
          $scope.items.splice(index, 1, clubjoinobj);
          var alertPopup = $ionicPopup.alert({
            template: '<p class="text-center">{{"succeappclubgetmessapp" | translate}}</p>',
            title: $filter('translate')('congrats'),
            buttons: [{
              text: $translate.instant('ok')
            }]
            //scope: $scope,
          });

          //	$state.go('clubinyourarea',null,{reload:true});	
        }
        /*$timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);*/
        //    alert("items : " + JSON.stringify($scope.items));
        // alert("Items Data.Club ClubArea " + $scope.items);
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });
  }
  //777
  $scope.getmemberdetails = function (clubID) {
    //	alert("Task Id is "+ clubID);
    //	$location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("clubinyourareamemberlists", { "clubID": clubID });
    console.log($scope.getmemberdetails);
    //$state.go('sentmessagedetails' + id);
  }

  $scope.getclubdetails = function (clubID) {
    //  alert("Task Id is "+ clubID);
    //  $location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("clubinyourareadetails", { "clubID": clubID });
    console.log($scope.getclubdetails);
    //$state.go('sentmessagedetails' + id);
  }

})
starter.controller('clubinYourAreaMemberListsDetailsCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams, $ionicPlatform) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('clubinyourarea');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };


  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.getmemberdetails

  $scope.clubID = $stateParams.clubID;
  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "txtHiddenClubID": $scope.clubID }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.membersDetailAll(parameter).
    then(function (response, status, headers) {
      //  alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  $scope.getplayerdetails = function (playerID) {
    //   alert("playerID----- "+ playerID);
    $state.go("playerdetails", { "playerID": playerID });
    console.log($scope.getplayerdetails);
  }

})




starter.controller('memberListsDetailsCtrl', function ($scope, MyServices, $ionicModal, $ionicPlatform, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {


  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('spclublist');
    e.preventDefault();
  }, 101);

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };



  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.getmemberdetails

  $scope.clubID = $stateParams.clubID;
  $scope.items = [];
  //	var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "txtHiddenClubID": $scope.clubID }
  var parameter = JSON.stringify(data);
  //	alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.membersDetailAll(parameter).
    then(function (response, status, headers) {
      //   alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //	$scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //	 alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  $scope.getplayerdetails = function (playerID) {
    $state.go("playerdetails", { "playerID": playerID });
    console.log($scope.getplayerdetails);
  }

})

starter.controller('playerDetailsCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.getplayerdetails

  $scope.playerID = $stateParams.playerID;
  //   alert("PLayer Id " + $scope.playerID);
  $scope.items = [];
  //  $scope.posts = [];  
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")
  var data = { "currentUserID": localStorage.getItem("userId"), "playerID": $scope.playerID }
  var parameter = JSON.stringify(data);
  alert(parameter);
  //  alert("Items " + JSON.stringify(response.data));
  $ionicLoading.show();
  //888
  MyServices.payerDetails(parameter).
    then(function (response, status, headers) {
      //    alert("ResponJsonStr " + JSON.stringify(response.data.data));
      /// alert("ResponJsonStr[0] " + JSON.stringify(response.data.data[0]));
      //   alert("Respfirst " + $scope.posts);
      $scope.posts = response.data.data;
      $scope.getAvtar = $scope.posts.getAvtar
      $scope.status = $scope.posts.status
      $scope.first_name = $scope.posts.first_name
      $scope.last_name = $scope.posts.last_name
      $scope.Country = $scope.posts.Country
      $scope.City = $scope.posts.City
      $scope.Nationality = $scope.posts.Nationality
      $scope.Date_of_Birth = $scope.posts.Date_of_Birth
      $scope.favouriteClubName = $scope.posts.favouriteClubName
      $scope.Member_favourite_position = $scope.posts.Member_favourite_position
      $scope.Member_description = $scope.posts.Member_description
      $scope.Member_condition = $scope.posts.Member_condition
      $scope.totalRating = $scope.posts.totalRating
      $scope.finalRate = $scope.posts.finalRate
      //   alert("$scope.finalRate Pheluu "+ $scope.finalRate);

      if ($scope.finalRate == null) {
        //        alert("INSIDELOOPNUllllllllll:-- " +  $scope.items[i].final_rating);
        $scope.finalRate = 0;
      } else {
        //         alert("INSIDELOOPDONECAL:-- " +  $scope.items[i].final_rating);
        $scope.finalRate = ((($scope.finalRate / $scope.totalRating) / 10) / 2) * 16;
      }
      //     alert("$scope.finalRate Bijuuu "+ $scope.finalRate);
      //    $scope.finalRate=$scope.posts.finalRate

      $ionicLoading.hide();
    },
      function (data, status, header, config) {
        //   alert("Invalid Email Address or password");  

      });

  //Follow Click

  $scope.followclick = function (playerID) {
    // alert("Task Id is "+ clubID);
    // $scope.items = []; 
    //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
    var data = { "currentUserID": localStorage.getItem("userId"), "playerID": playerID }
    //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
    var parameter = JSON.stringify(data);
    //  alert("Items " + JSON.stringify(response.data.data));
    //  $ionicLoading.show();
    $ionicLoading.show();
    MyServices.followclickforfollow(parameter).
      then(function (response, status, headers) {
        //       alert("Status " + response.data.data.status);
        if (response.data.data.status != "Follow") {
          $ionicLoading.hide();
          /*var myPopup = $ionicPopup.show({
          template: '<p class="text-center">You are Already Applied on This Club!</p>',
          title: 'Sorry!'
          //scope: $scope,
        });*/
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('congrats'),
            template: '<p class="text-center">{{"successunfollow" | translate}}</p>'
          });
          //    $state.go($state.current, {}, {reload: true}); 
          //              $state.reload();
          //    $window.location.reload(true);
          //   $state.go('clubslidermenu.clubinyourarea',null,{reload:true});
        }
        else {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            template: '<p class="text-center">{{"successfollowed" | translate}}</p>',
            title: $filter('translate')('congrats')
            //scope: $scope,
          });

          $state.go('playerdetails', null, { reload: true });
        }
        /*$timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);*/
        //    alert("items : " + JSON.stringify($scope.items));
        // alert("Items Data.Club ClubArea " + $scope.items);
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });
  }

  //Follow Click


})



starter.controller('clubInYourAreaDetailsCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.clubID = $stateParams.clubID;
  $scope.items = [];
  //	var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  //{"currentUserID":"102","clubID":"50"}
  var data = { "currentUserID": localStorage.getItem("userId"), "clubID": $scope.clubID }
  //	alert("Club ID Is" + data);
  var parameter = JSON.stringify(data);
  //	alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.clubInYourAreaDetail(parameter).
    then(function (response, status, headers) {
      //   alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //	$scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //	 alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
})

starter.controller('mostActiveClubCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state) {
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $ionicLoading.show();
  $scope.items = [];
  var mostactive = "";
  var data = { "getClubCreatedBy": localStorage.getItem("userId"), "orderByClub": mostactive }
  var parameter = JSON.stringify(data);

  //alert("data passed " + parameter);	

  MyServices.mostMembersCluball(parameter).
    then(function (response, status, headers) {
      //alert("service user id " +  localStorage.getItem("userId"));
      //alert("Most members " + JSON.stringify(response.data.data.club));
      //    $scope.items = JSON.stringify(response.data.data);
      $scope.items = response.data.data.club;
      $ionicLoading.hide();
      console.log(parameter);

    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

})

starter.controller('mostFollowersInClubCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state) {
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $ionicLoading.show();
  $scope.items = [];
  var mostfollower = "most followers";
  var data = { "getClubCreatedBy": localStorage.getItem("userId"), "orderByClub": mostfollower }
  var parameter = JSON.stringify(data);

  //	alert("data passed " + parameter);	

  MyServices.mostMembersCluball(parameter).
    then(function (response, status, headers) {
      //alert("service user id " +  localStorage.getItem("userId"));
      //	alert("Most members " + JSON.stringify(response.data.data.club));
      //    $scope.items = JSON.stringify(response.data.data);
      $scope.items = response.data.data.club;
      $ionicLoading.hide();
      console.log(parameter);

    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

})

starter.controller('mostMembersInClubCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state) {
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $ionicLoading.show();
  $scope.items = [];
  var mostmember = "most members";
  var data = { "getClubCreatedBy": localStorage.getItem("userId"), "orderByClub": mostmember }
  var parameter = JSON.stringify(data);

  //	alert("data passed " + data);	

  MyServices.mostMembersCluball(parameter).
    then(function (response, status, headers) {
      //alert("service user id " +  localStorage.getItem("userId"));
      //	alert("Most members " + JSON.stringify(response.data.data.club));
      //    $scope.items = JSON.stringify(response.data.data);
      $scope.items = response.data.data.club;
      $ionicLoading.hide();
      console.log(parameter);

    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

})

starter.controller('matchSlideCtrl', function ($scope, $ionicModal, $timeout, $rootScope) {

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

})

/*starter.controller('matchinyourSlideCtrl', function($scope, $ionicModal, $timeout) {

  
})

starter.controller('yourmatchMemberSlideCtrl', function($scope, $ionicModal, $timeout) {

  
})*/

starter.controller('matchlistMatchCtrl', function ($scope, $translate, $cordovaDatePicker, MyServices, $ionicPlatform, $ionicFilterBar, $ionicLoading, $ionicModal, $ionicPopup, $timeout, $rootScope, $state, $filter, $ionicConfig) {

  //$scope.dt = "opendate";

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('matchmenu');
    e.preventDefault();
  }, 101);


  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }

  $ionicLoading.show();
  $scope.numberOfItemsToDisplay = 5; // number of item to load each time
  var data = { "matchCreatedBy": localStorage.getItem("userId"), "lang_term": language }
  var parameter = JSON.stringify(data);
  //alert("Para ::- " +parameter);
  MyServices.matchListall(parameter).
    then(function (response, status, headers) {

      /*for(var i = 0; i < response.data.data.match_detail.length;i++){
          for(var j = 0; j < response.data.data.match_detail[i].length;j++){
               $scope.itemdaydate.items.push(response.data.data.match_detail[i][j]);
          }
      }
      */
      // alert("Response "+ JSON.stringify(response.data.data));
      if (response.data.success == 0) {
        //   alert("inside Null Values");
        $ionicLoading.hide();
				/*var myPopup = $ionicPopup.show({
				template: '<p class="text-center">There Is No Match Near By You!</p>',
				title: 'Sorry!'
				});
				$timeout(function () {
				myPopup.close(); //close the popup after 3 seconds for some reason
			}, 3000);*/


        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('sorry'),
          template: '<p class="text-center">{{"nomatchavail" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
        alertPopup.then(function (res) {
          $state.go('matchmenu');
          console.log('Thank you for not eating my delicious ice cream cone');
        });

      }
      else {
        $ionicLoading.hide();
        //   alert("Response-- " + JSON.stringify(response.data.data));	

        $scope.addMoreItem = function (done) {
          // alert("call");
          console.log("add more " + $scope.matchBy.length + " : " + $scope.numberOfItemsToDisplay)
          if ($scope.matchBy.length > $scope.numberOfItemsToDisplay) {
            $scope.numberOfItemsToDisplay += 2; // load 20 more items
            // done(); // need to call this when finish loading more data
          }
          else {

            $scope.noMoreItemsAvailable = true;
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
        $ionicLoading.hide();

        $scope.matchBy = response.data.data;
				/*$rootScope.countnearby = {
							  itemCount: $scope.matchBy.length
							}*/


      }
      $ionicLoading.hide();
      console.log(parameter);

    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  // Filter Nearby Match

  // $scope.showFilterBar = function () {
  //  alert("Search Clicked ");
  /* filterBarInstance = $ionicFilterBar.show({
      items: $scope.matchBy,
      update: function (filteredItems, filterText) {
      $scope.matchBy = filteredItems;
      if (filterText) {
        console.log(filterText);
      }
      }
    });*/

  /*  $scope.search = function (row) {
 return (angular.lowercase(row.matchName).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
         angular.lowercase(row.matchLocation).indexOf(angular.lowercase($scope.query) || '') !== -1);
    };*/
  //        };

  //Filter Nearby Match


  //Join Click For Match

  $scope.getjoinmatch = function (matchID, clubID1, clubID2) {

    // alert("Task Id is "+ clubID);
    // $scope.items = [];	{"clubCreatedBy":"11","matchID":"8","clubID1":"17","clubID2":"22"}
    //	var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
    var data = { "clubCreatedBy": localStorage.getItem("userId"), "matchID": matchID, "clubID1": clubID1, "clubID2": clubID2 }
    //		alert("currentUserID And ClubID " + data);
    var parameter = JSON.stringify(data);
    //	alert("currentUserID And ClubID " + parameter);
    //	alert("Items " + JSON.stringify(response.data.data));
    //	$ionicLoading.show();
    $ionicLoading.show();
    MyServices.clickToJoinMatch(parameter).
      then(function (response, status, headers) {
        if (response.data.success != 1) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('success'),
            template: '<p class="text-center">{{"youralreaapponthiclub" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });
        }
        else {
          $ionicLoading.hide();
          //	alert("Response " + JSON.stringify(response.data.success));
          var myPopup = $ionicPopup.alert({
            template: '<p class="text-center">{{"succeappclubgetmessapp" | translate}}</p>',
            title: $filter('translate')('success'),
            buttons: [{
              text: $translate.instant('ok')
            }]
            //scope: $scope,
          });
          $state.go('matchlist', null, { reload: true });
        }
        /*$timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);*/
        //    alert("items : " + JSON.stringify($scope.items));
        // alert("Items Data.Club ClubArea " + $scope.items);
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });
  }

  $scope.getmatchdetails = function (matchID) {

    $state.go("matchlistdetails", { "matchID": matchID });
    console.log($scope.getmatchdetails);

  }



  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.matchBy,
      update: function (filteredItems, filterText) {
        $scope.matchBy = filteredItems;
        //     $scope.itemdaydate.match_detail = filteredItems;
        if (filterText) {
          console.log("FilterText is :-- " + filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };


  $scope.calenderfordatesearch = function () {
    //789*

    //Fill Array
    //  $ionicLoading.show();
    $scope.numberOfItemsToDisplay = 5; // number of item to load each time
    var data = { "matchCreatedBy": localStorage.getItem("userId"), "lang_term": language }
    var parameter = JSON.stringify(data);
    //alert("Para ::- " +parameter);
    MyServices.matchListall(parameter).
      then(function (response, status, headers) {

        /*for(var i = 0; i < response.data.data.match_detail.length;i++){
            for(var j = 0; j < response.data.data.match_detail[i].length;j++){
                 $scope.itemdaydate.items.push(response.data.data.match_detail[i][j]);
            }
        }
        */
        // alert("Response "+ JSON.stringify(response.data.data));
        if (response.data.success == 0) {
          //   alert("inside Null Values");
          $ionicLoading.hide();
          /*var myPopup = $ionicPopup.show({
          template: '<p class="text-center">There Is No Match Near By You!</p>',
          title: 'Sorry!'
          });
          $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);*/


          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('sorry'),
            template: '<p class="text-center">{{"nomatchavail" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });
          alertPopup.then(function (res) {
            $state.go('matchmenu');
            console.log('Thank you for not eating my delicious ice cream cone');
          });

        }
        else {
          $ionicLoading.hide();
          //   alert("Response-- " + JSON.stringify(response.data.data));  

          $scope.addMoreItem = function (done) {
            // alert("call");
            console.log("add more " + $scope.matchBy.length + " : " + $scope.numberOfItemsToDisplay)
            if ($scope.matchBy.length > $scope.numberOfItemsToDisplay) {
              $scope.numberOfItemsToDisplay += 2; // load 20 more items
              // done(); // need to call this when finish loading more data
            }
            else {

              $scope.noMoreItemsAvailable = true;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }
          $ionicLoading.hide();

          $scope.matchBy = response.data.data;
          /*$rootScope.countnearby = {
                  itemCount: $scope.matchBy.length
                }*/


        }
        $ionicLoading.hide();
        console.log(parameter);

      },
        function (data, status, header, config) {
          $scope.loadingIndicator.hide();
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });


    //Fill Array


    var options = {
      date: new Date(),
      mode: 'date', // or 'time'
      //  minDate: new Date() - 10000,
      allowOldDates: false,
      allowFutureDates: false,
      doneButtonLabel: 'DONE',
      doneButtonColor: '#F2F3F4',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    };
    document.addEventListener("deviceready", function () {

      $cordovaDatePicker.show(options).then(function (date) {
        //  alert(date);
        var dateofMatch = $filter('date')(date, "yyyy-MM-dd");
        //   alert(dateofMatch);

        var filter = [];

        for (var i = 0; i < $scope.matchBy.length; i++) {

          var D1 = dateofMatch;
          var D2 = $scope.matchBy[i].matchDate;
          if ((new Date(D1).getTime()) == (new Date(D2).getTime())) {
            filter.push($scope.matchBy[i]);
          }

        }
        // alert("FilterEdArray==== " +JSON.stringify(filter));
        if (filter != "") {
          $scope.matchBy = filter;
        }
        else {
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('sorry'),
            template: '<p class="text-center">{{"nomatchavail" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });

          //Fill Array
          //  $ionicLoading.show();
          $scope.numberOfItemsToDisplay = 5; // number of item to load each time
          var data = { "matchCreatedBy": localStorage.getItem("userId"), "lang_term": language }
          var parameter = JSON.stringify(data);
          //alert("Para ::- " +parameter);
          MyServices.matchListall(parameter).
            then(function (response, status, headers) {

              /*for(var i = 0; i < response.data.data.match_detail.length;i++){
                  for(var j = 0; j < response.data.data.match_detail[i].length;j++){
                       $scope.itemdaydate.items.push(response.data.data.match_detail[i][j]);
                  }
              }
              */
              // alert("Response "+ JSON.stringify(response.data.data));
              if (response.data.success == 0) {
                //   alert("inside Null Values");
                $ionicLoading.hide();
                /*var myPopup = $ionicPopup.show({
                template: '<p class="text-center">There Is No Match Near By You!</p>',
                title: 'Sorry!'
                });
                $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
              }, 3000);*/


                var alertPopup = $ionicPopup.alert({
                  title: $filter('translate')('sorry'),
                  template: '<p class="text-center">{{"nomatchavail" | translate}}</p>',
                  buttons: [{
                    text: $translate.instant('ok')
                  }]
                });
                alertPopup.then(function (res) {
                  $state.go('matchmenu');
                  console.log('Thank you for not eating my delicious ice cream cone');
                });

              }
              else {
                $ionicLoading.hide();
                //   alert("Response-- " + JSON.stringify(response.data.data));  

                $scope.addMoreItem = function (done) {
                  // alert("call");
                  console.log("add more " + $scope.matchBy.length + " : " + $scope.numberOfItemsToDisplay)
                  if ($scope.matchBy.length > $scope.numberOfItemsToDisplay) {
                    $scope.numberOfItemsToDisplay += 2; // load 20 more items
                    // done(); // need to call this when finish loading more data
                  }
                  else {

                    $scope.noMoreItemsAvailable = true;
                  }
                  $scope.$broadcast('scroll.infiniteScrollComplete');
                }
                $ionicLoading.hide();

                $scope.matchBy = response.data.data;
                /*$rootScope.countnearby = {
                        itemCount: $scope.matchBy.length
                      }*/


              }
              $ionicLoading.hide();
              console.log(parameter);

            },
              function (data, status, header, config) {
                $scope.loadingIndicator.hide();
                $scope.ResponseDetails = "Data: " + data +
                  "<hr />status: " + status +
                  "<hr />headers: " + header +
                  "<hr />config: " + config;

              });


          //Fill Array



        }

      });

    }, false);
  };

})

starter.controller('matchlistdetailsMatchCtrl', function ($scope, MyServices, $stateParams, $ionicPlatform, $ionicFilterBar, $ionicLoading, $ionicModal, $ionicPopup, $timeout, $rootScope, $state, $filter, $translate) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('matchlist');
    e.preventDefault();
  }, 101);

  // loader

  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.matchID = $stateParams.matchID;

  $ionicLoading.show();
  var data = { "matchID": $scope.matchID }
  var parameter = JSON.stringify(data);
  console.log("Match ID Para : " + parameter);
  $scope.item = {};
  $scope.posts = {};
  $scope.comment = [];

  MyServices.matchdetailsall(parameter).
    then(function (response, status, headers) {

      /*for(var i = 0; i < response.data.data.match_detail.length;i++){
          for(var j = 0; j < response.data.data.match_detail[i].length;j++){
               $scope.itemdaydate.items.push(response.data.data.match_detail[i][j]);
          }
      }
      */
      //  alert("Response "+ JSON.stringify(response.data.data));
      if (response.data.success == 0) {
        //   alert("inside Null Values");
        $ionicLoading.hide();
        /*var myPopup = $ionicPopup.show({
        template: '<p class="text-center">There Is No Match Near By You!</p>',
        title: 'Sorry!'
        });
        $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 3000);*/


        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('sorry'),
          template: '<p class="text-center">{{"nomatchdetailsavail" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
        alertPopup.then(function (res) {
          $state.go('matchlist');
          console.log('Thank you for not eating my delicious ice cream cone');
        });

      }
      else {
        $ionicLoading.hide();
        // alert("Response-- " + JSON.stringify(response.data.data[0]));  
        $scope.posts = response.data.data[0];
        //  alert("Resp " + JSON.stringify($scope.posts));
        //  alert("MatchName " + $scope.item.matchName);
        $scope.item.matchName = $scope.posts.matchName
        $scope.item.sportcenterName = $scope.posts.sportcenterName
        $scope.item.matchCreatedByname = $scope.posts.matchCreatedByname
        $scope.item.clubImageUrl1 = $scope.posts.clubImageUrl1
        $scope.item.clubName1 = $scope.posts.clubName1
                         // $scope.item.club1result=$scope.posts.club1result

                          /*alert("first_name " + $scope.item.first_name);
                          alert("POstsfirst_name " + $scope.posts.first_name);
*/                        $scope.item.clubImageUrl2 = $scope.posts.clubImageUrl2
        //  $scope.item.club2result=$scope.posts.club2result
        $scope.item.clubName2 = $scope.posts.clubName2
        $scope.item.matchTime = $scope.posts.matchTime
        $scope.item.matchDate = $scope.posts.matchDate
        $scope.item.dayofDate = $scope.posts.dayofDate
        $scope.item.matchLocation = $scope.posts.matchLocation
        $scope.item.matchOverview = $scope.posts.matchOverview
        $scope.commentarray = $scope.posts.matchComment;
        $scope.item.display_name = $scope.posts.display_name
        $scope.item.matchID = $scope.posts.matchID
        //     $scope.item.matchclassshow=$scope.posts.matchclassshow
        //    $scope.item.matchclasshide=$scope.posts.matchclasshide
        $scope.item.clubID1 = $scope.posts.clubID1
        $scope.item.clubID2 = $scope.posts.clubID2


      }
      $ionicLoading.hide();
      console.log(parameter);

    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });



})

starter.controller('myMatchScheduledMatchCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $rootScope, $ionicPlatform) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('matchmenu');
    e.preventDefault();
  }, 101);
  $scope.item = {};

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  var data = { "matchCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  $ionicLoading.show();
  MyServices.myScheduledaMatchll(parameter).
    then(function (response, status, headers) {
      //                alert("Res " + JSON.stringify(response.data.data));

      if (response.data.data == null) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">{{"thernomatchavail" | translate}}</p>',
          title: $filter('translate')('sorry')
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        $ionicLoading.hide();
        //  alert("Response []  " + JSON.stringify(response.data.count));
        $scope.matchBy = response.data.data;
        $rootScope.countScheduledMatch = {
          itemCount: response.data.count
        }

      }
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      })

  $scope.getPlayedMatchDetails = function (matchID) {
    //    alert("Match Id is "+ matchID);
    //  $location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("overviewslidermenu.matchoverview", { "matchID": matchID });
    console.log($scope.getPlayedMatchDetails);
    //$state.go('sentmessagedetails' + id);
  }

})

starter.controller('myMatchPendingMatchCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $rootScope, $ionicPlatform) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('matchmenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.items = [];
  var data = { "matchCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  $ionicLoading.show();
  MyServices.myPendingMatchall(parameter).
    then(function (response, status, headers) {
      //  alert("Respos " + JSON.stringify(response));
      if (response.data.success == 0) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">{{"thernopendmatchyet" | translate}}</p>',
          title: $filter('translate')('sorry')
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        $ionicLoading.hide();
        $scope.matchBy = response.data.data;
        $rootScope.countPendingMatch = {
          itemCount: response.data.count
        }

      }

      $ionicLoading.hide();
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      })

  $scope.getPlayedMatchDetails = function (matchID) {
    //    alert("Match Id is "+ matchID);
    //  $location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("overviewslidermenu.matchoverview", { "matchID": matchID });
    console.log($scope.getPlayedMatchDetails);
    //$state.go('sentmessagedetails' + id);
  }

})
starter.controller('myMatchPlayeddddMatchCtrl', function ($scope, MyServices, $ionicModal, $rootScope, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $ionicPlatform) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('matchmenu');
    e.preventDefault();
  }, 101);
  $scope.item = {};
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }

  /*  $scope.items = [];  */
  var data = { "matchCreatedBy": localStorage.getItem("userId"), "lang_term": language }
  var parameter = JSON.stringify(data);
  //  alert("PAra::::--- " + parameter);
  $ionicLoading.show();
  MyServices.myPlayedMatchall(parameter).
    then(function (response, status, headers) {
      //   alert("items : " + JSON.stringify(response.data.data[0]));
      //    alert("items : " + JSON.stringify(response.data.data));
      //     alert("items : " + JSON.stringify(response.data.data.match_detail));
      // alert("Items Data.Club ClubArea " + response.data.data);
      if (response.data.data == null) {
        $ionicLoading.hide();
        //  alert("Response " + JSON.stringify(response.data.success));
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">No matches are available</p>',
          title: 'Sorry!'
          //scope: $scope,
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
          $state.go('matchmenu');
        }, 3000);
      }
      else {
        $ionicLoading.hide();
        $scope.matchBy = response.data.data;
        $rootScope.countPlayeddddMatch = {
          itemCount: response.data.count
        }
        // alert("Count MatchDetails " + $scope.itemdaydate.match_detail.length);
      }
      /*$timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);*/
      console.log(parameter);
    }, function (data, status, header, config) {
      $scope.loadingIndicator.hide();
      $scope.ResponseDetails = "Data: " + data +
        "<hr />status: " + status +
        "<hr />headers: " + header +
        "<hr />config: " + config;
    });

  $scope.getPlayedMatchDetails = function (matchID) {
    //    alert("Match Id is "+ matchID);
    //  $location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("overviewslidermenu.matchoverview", { "matchID": matchID });
    console.log($scope.getPlayedMatchDetails);
    //$state.go('sentmessagedetails' + id);
  }
})
starter.controller('createMatchSliderMenuCtrl', function ($scope, MyServices, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $ionicActionSheet, $cordovaCamera, $cordovaFile, $ionicPlatform) {
  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

})

starter.controller('orgMatchCreateMatchesCtrl', function ($scope, $translate, MyServices, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $ionicActionSheet, $cordovaCamera, $cordovaFile, $ionicPlatform) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('matchmenu');
    e.preventDefault();
  }, 101);
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.item = {};
  $scope.updateProfile = {};
  //*******************************************************//
  //Club1 Fetch
  var data = { "currentUserID": localStorage.getItem("userId") };
  var parameter = JSON.stringify(data);
  MyServices.getCurrrentClub1(parameter).
    then(function (response, status, headers) {
      //   alert("Club1 Response " + JSON.stringify(response.data.data));
      $scope.clubses1 = response.data.data;
    },
      function (data, status, header, config) {
        $scope.errorData = data;
      });
  //Club1 Fetch
  //*******************************************************//
  //OnChange Event DropDown //Club2 Fetch
  $scope.Getselectedclub2 = function (clubs) {
    var clubid1 = $scope.item.matchclubs1;
    var clubname = $.grep($scope.clubses1, function (clubs) {
      return clubs.clubID == clubid1;
    })[0].clubName;

    var data = { "currentUserID": localStorage.getItem("userId"), "clubID1": clubid1 };
    var parameter = JSON.stringify(data);
    MyServices.getCurrrentClub2(parameter).
      then(function (response, status, headers) {
        $scope.clubses2 = response.data.data;
      },
        function (data, status, header, config) {
          $scope.errorData = data;
        });

  };
  //OnChange Event DropDown //Club2 Fetch
  //*******************************************************//
  // Fetch Sportcenter
  var data = { "currentUserID": localStorage.getItem("userId") };
  var parameter = JSON.stringify(data);
  MyServices.getSportsCenter(parameter).
    then(function (response, status, headers) {
      $scope.matchSportCenters = response.data.data;
    },
      function (data, status, header, config) {
        $scope.errorData = data;
      });
  // Fetch Sportcenter
  //*******************************************************//
  // Fetch Default City
  $scope.item = [];
  $scope.updateProfile = {};
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  $ionicLoading.show();

  MyServices.getSpclubdeafaultvalue(parameter).
    then(function (response, status, headers) {
      $scope.posts = response.data.data;
      $scope.countries = $scope.posts.country
      $scope.item.club_city_area = $scope.posts.club_city_area[0]
      $ionicLoading.hide();
    },
      function (data, status, header, config) {

      });

  // Submit Match Details 
  //*******************************************************//


  $scope.createMatchsubmit = function (createMatch) {

    $ionicLoading.show();


    var clubId1 = $scope.item.matchclubs1;
    //   alert("Club1 " + clubId1);

    var clubId2 = $scope.item.matchclubs2;
    //  alert("Club1 " + clubId2);

    var sportcntr = $scope.item.matchSportCenter;
    //  alert("SportCenter " + sportcntr);

    //   var dateofMatch = $scope.item.date_of_Match;
    var dateofMatch = $filter('date')($scope.item.date_of_Match, "yyyy-MM-dd");
    //  alert("date  " + dateofMatch);

    //   var timeofMatch = $scope.item.time_of_Match;
    var timeofMatch = $filter('date')($scope.item.time_of_Match, "HH:mm");
    //  alert("Time " + timeofMatch);

    var defaultclubcity = $scope.item.club_city_area;
    //  alert("City defat " + defaultclubcity);

    var matchOverview = $scope.item.overviewMatch;
    //   alert("City defat " + matchOverview);

    var matchName = $scope.item.matchname;
    //  alert("City defat " + matchName);

    $scope.allvalidation = [{
      field: matchName,
      validation: ""
    },
    {
      field: defaultclubcity,
      validation: ""
    },
    {
      field: clubId1,
      validation: ""
    },
    {
      field: clubId2,
      validation: ""
    },
    {
      field: dateofMatch,
      validation: ""
    },
    {
      field: timeofMatch,
      validation: ""
    },
    {
      field: sportcntr,
      validation: ""
    },
    {
      field: matchOverview,
      validation: ""
    }
    ];
    var check = formvalidation($scope.allvalidation);
    //  alert(check);
    if (check) {
      var msgdata = {
        'currentUserID': localStorage.getItem("userId"),
        'matchName': matchName,
        'matchLocation': defaultclubcity,
        'clubID1': clubId1,
        'clubID2': clubId2,
        'matchDate': dateofMatch,
        'matchTime': timeofMatch,
        'matchSportCenter': sportcntr,
        'matchOverview': matchOverview

      };
      var parameter = JSON.stringify(msgdata);
      //   alert(parameter);
      MyServices.orgCreateMatch(parameter).
        then(function (data, status, headers) {
          $ionicLoading.hide();
          //    alert("Final Resonse " + JSON.stringify(data));
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('congrats'),
            template: '<p class="text-center">{{"youmatchcretsuccess" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });
          $state.go('matchmenu');
        },
          function (data, status, header, config) {
            /* $scope.ResponseDetails = "Data: " + data +
                                    "<hr />status: " + status +
                                    "<hr />headers: " + header +
                                    "<hr />config: " + config;
                                     alert("eroror"+$scope.ResponseDetails);*/
            var myPopup = $ionicPopup.show({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
              scope: $scope,

            });
            $timeout(function () {
              myPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);

          });

    } else {
      msgforall('{{"plsflldata" | translate}}');
      $ionicLoading.hide();
    }
  }

  // Submit Match Details 
  //*******************************************************//
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: $filter('translate')('creatematch'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }
})

starter.controller('orgMatchEditMatchesCtrl', function ($scope, MyServices, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $ionicActionSheet, $cordovaCamera, $cordovaFile, $ionicPlatform) {
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }

  $ionicLoading.show();
  var data = { "matchCreatedBy": localStorage.getItem("userId"), "lang_term": language }
  var parameter = JSON.stringify(data);
  //   alert("Para::--- " + parameter);
  MyServices.matcheditmatches(parameter).
    then(function (response, status, headers) {
      //   alert("Response Edit " + JSON.stringify(response.data.data));
      /*for(var i = 0; i < response.data.data.match_detail.length;i++){
          for(var j = 0; j < response.data.data.match_detail[i].length;j++){
               $scope.itemdaydate.items.push(response.data.data.match_detail[i][j]);
          }
      }
      */
      //  alert("Response "+ response.data.data);
      if (response.data.data == "null") {
        //   alert("inside Null Values");
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">{{"therisnomatch" | translate}}</p>',
          title: $filter('translate')('sorry')
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        $ionicLoading.hide();
        //   alert("Response-- " + JSON.stringify(response.data.data));  
        $scope.matchBy = response.data.data;
        /*$rootScope.countnearby = {
                itemCount: $scope.matchBy.length
              }*/


      }
      $ionicLoading.hide();
      console.log(parameter);

    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  // editmatch(item.matchName, item.matchLocation, item.matchTimeHours, item.matchTimeMin, itemdaydate.matchDate, itemdaydate.dayofDate, itemdaydate.sportcenter, item.matchOverview, item.matchID, item.clubID1, item.clubID2, )
  $scope.editmatch = function (matchID) {
    //  alert(matchID);
    // alert("Pass Value:  " + matchName, matchLocation, matchTimeHours, matchTimeMin, matchDate, dayofDate, sportcenterName, matchOverview, matchID, clubID1, clubID2);
    /* $state.go("orgmatchtoedited", {"matchName":matchName,"matchLocation":matchLocation,
      "matchTimeHours":matchTimeHours,"matchTimeMin":matchTimeMin,"matchTime":matchTime,
      "matchDate":matchDate,"dayofDate":dayofDate,
      "sportcenterName":sportcenterName,"matchOverview":matchOverview,
      "matchID":matchID,"clubID1":clubID1,"clubID2":clubID2});*/
    $state.go("orgmatchtoedited", { "matchID": matchID });
    console.log("Ediiiteeeddd Clicke :----- ", $scope.editmatch);
  }

})

starter.controller('orgMatchtoEditedCtrl', function ($scope, $translate, MyServices, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $stateParams, $ionicActionSheet, $cordovaCamera, $cordovaFile, $ionicPlatform) {

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }


  $scope.item = [];
  $scope.comment = [];
  $scope.posts = {};
  $ionicLoading.show();
  $scope.matchID = $stateParams.matchID;
  //  alert("$scope.matchID  === "+ $scope.matchID);
  var data = { "matchID": $scope.matchID, "matchCreatedBy": localStorage.getItem("userId"), "lang_term": language };
  var parameter = JSON.stringify(data);
  //   alert("parameter "+ parameter);
  MyServices.matcheditmatches(parameter).
    then(function (response, status, headers) {
      /* alert("reeeee::--- "  JSON.stringify(response.data.data));
       */
      console.log("reeeeeee " + JSON.stringify(response.data.data))
      $ionicLoading.hide();
      $scope.posts = response.data.data;
      //    console.log($scope.posts);
      //     alert("RESSSSS " + JSON.stringify($scope.posts));
      //  alert("COOMMMET " + $scope.posts[0].match_detail[0].sportcenterName);

      $scope.item.matchname = $scope.posts[0].match_detail[0].matchName;
      $scope.item.club_city_area = $scope.posts[0].match_detail[0].matchLocation;
      $scope.item.matchclubs1 = $scope.posts[0].match_detail[0].clubID1;
      $scope.item.matchclubs2 = $scope.posts[0].match_detail[0].clubID2;
      $scope.item.date_of_Match = $scope.posts[0].matchDate;
      $scope.item.time_of_Match = $scope.posts[0].match_detail[0].matchTime;
      $scope.item.matchSportCenter = $scope.posts[0].match_detail[0].sportcenterID;
      $scope.item.overviewMatch = $scope.posts[0].match_detail[0].matchOverview;
      $scope.commentarray = $scope.posts[0].match_detail[0].matchComment;

      //Club1 Fetch
      var data = { "currentUserID": localStorage.getItem("userId") };
      var parameter = JSON.stringify(data);
      MyServices.getCurrrentClub1(parameter).
        then(function (response, status, headers) {
          //    alert("Club1 Response " + JSON.stringify(response.data.data));
          $scope.clubses1 = response.data.data;
        },
          function (data, status, header, config) {
            $scope.errorData = data;
          });
      //Club1 Fetch


      var data = { "currentUserID": localStorage.getItem("userId"), "clubID1": $scope.item.matchclubs1 };
      var parameter = JSON.stringify(data);
      MyServices.getCurrrentClub2(parameter).
        then(function (response, status, headers) {

          $scope.clubses2 = response.data.data;
        },
          function (data, status, header, config) {
            $scope.errorData = data;
          });

      // Fetch Sportcenter
      var data = { "currentUserID": localStorage.getItem("userId") };
      var parameter = JSON.stringify(data);
      //   alert("SPOR----- " +parameter)  ;
      MyServices.getSportsCenter(parameter).
        then(function (response, status, headers) {
          $scope.matchSportCenters = response.data.data;
          //      alert("RESPOT---- " + JSON.stringify($scope.sportCenters));
        },
          function (data, status, header, config) {
            $scope.errorData = data;
          });
      // Fetch Sportcenter 

    },
      function (data, status, header, config) {
        $scope.errorData = data;
      });


  /* $scope.matchName = $stateParams.matchName;
   $scope.matchLocation = $stateParams.matchLocation;
   $scope.matchTimeHours = $stateParams.matchTimeHours;
   $scope.matchTimeMin = $stateParams.matchTimeMin;
   $scope.matchTime = $stateParams.matchTime;
   $scope.matchDate = $stateParams.matchDate;
   $scope.dayofDate = $stateParams.dayofDate;
   $scope.sportcenterName = $stateParams.sportcenterName;
   $scope.matchOverview = $stateParams.matchOverview;
   $scope.matchID = $stateParams.matchID;
   $scope.clubID1 = $stateParams.clubID1;
   $scope.clubID2 = $stateParams.clubID2;
   $scope.matchComment = $stateParams.clubID2;*/
  /* alert("Match Name : " +
     $scope.matchName, $scope.matchLocation, $scope.matchTimeHours, $scope.matchTimeMin, 
     $scope.matchDate, $scope.dayofDate, $scope.sportcenterName, $scope.matchOverview,
     $scope.matchID, $scope.clubID1, $scope.clubID2);*/
  //  alert("Club1: " + $scope.clubID1);
  //   alert("Club2: " + $scope.clubID2);




  /*  var clubid1 = $scope.item.matchclubs1;
   var clubname = $.grep($scope.clubses1, function (clubs) {
     return clubs.clubID == clubid1;
 })[0].clubName;
 var data={"currentUserID": localStorage.getItem("userId"), "clubID1":clubid1};
 var parameter=JSON.stringify(data);   
   MyServices.getCurrrentClub2(parameter).
       then(function (response, status, headers) {
      //   alert("Club1 Response " + JSON.stringify(response.data.data));
           $scope.clubses1=response.data.data;
           },
           function(data, status, header, config) {
               $scope.errorData=data;
             });
*/
  //Club1 Fetch   
  //    alert("afterClub1: " + $scope.clubID1);
  //     alert("afterClub2: " + $scope.clubID2);
  //OnChange Event DropDown //Club2 Fetch

  $scope.Getselectedclub2 = function (clubs) {
    var clubid1 = $scope.item.matchclubs1;
    var clubname = $.grep($scope.clubses1, function (clubs) {
      return clubs.clubID == clubid1;
    })[0].clubName;

    var data = { "currentUserID": localStorage.getItem("userId"), "clubID1": clubid1 };
    var parameter = JSON.stringify(data);
    MyServices.getCurrrentClub2(parameter).
      then(function (response, status, headers) {
        $scope.clubses2 = response.data.data;
      },
        function (data, status, header, config) {
          $scope.errorData = data;
        });

  };
  //OnChange Event DropDown //Club2 Fetch



  //    alert("getSelectedclubafterClub1: " + $scope.clubID1);
  //     alert("getSelectedclubafterClub2: " + $scope.clubID2);





  var dateofMatch = $filter('date')($scope.matchDate, "MM/dd/yyyy");
  // alert("matchOverview  " + $scope.matchOverview);

  /* var clubid2 = $scope.item.matchclubs2;
   var clubname = $.grep($scope.clubID2, function (clubs) {
     return clubs.clubID == clubid2;
     })[0].clubName;*/

  /* var data={"currentUserID": localStorage.getItem("userId"), "clubID1":clubid2};
   var parameter=JSON.stringify(data); 
     MyServices.getCurrrentClub2(parameter).
         then(function (response, status, headers) {
             $scope.clubses2=response.data.data;
             },
             function(data, status, header, config) {
                 $scope.errorData=data;
   });*/

  /* alert("ClubId 2  " + clubid2);
   alert("ClubName  " + clubname);
*/
  /*alert("Date " + dateofMatch);
  alert("Time " + $scope.matchTimeHours);*/


  /*$scope.item.matchname = $scope.matchName;
  $scope.item.club_city_area = $scope.matchLocation;
  $scope.item.matchclubs1 = $scope.clubID1;
  $scope.item.matchclubs2 = $scope.clubID2;
  $scope.item.date_of_Match = dateofMatch;
  $scope.item.time_of_Match = $scope.matchTime;
  $scope.item.matchSportCenter = $scope.sportcenterName;
  $scope.item.overviewMatch = $scope.matchOverview;
  $scope.item.commentMatch = $scope.matchComment;*/


  $scope.editMatchsubmit = function (editMatch) {
    $ionicLoading.show();
    $scope.comment.commentDetail = [];
    var matchID = $scope.matchID;
    //  alert("Match ID "+ matchID);  
    var clubId1 = $scope.item.matchclubs1;
    // alert("Club1 " + clubId1);

    var clubId2 = $scope.item.matchclubs2;
    // alert("Club1 " + clubId2);

    var sportcntr = $scope.item.matchSportCenter;
    // alert("SportCenter " + sportcntr);

    //   var dateofMatch = $scope.item.date_of_Match;
    var dateofMatch = $filter('date')($scope.item.date_of_Match, "yyyy-MM-dd");
    // alert("date  " + dateofMatch);

    //   var timeofMatch = $scope.item.time_of_Match;
    var timeofMatch = $filter('date')($scope.item.time_of_Match, "HH:mm");
    //  alert("Time " + timeofMatch);

    var defaultclubcity = $scope.item.club_city_area;
    //  alert("City defat " + defaultclubcity);

    var matchOverview = $scope.item.overviewMatch;
    //   alert("City defat " + matchOverview);

    var matchName = $scope.item.matchname;
    //  alert("City defat " + matchName);
    //  alert("$scope.commentarray.length----> " + $scope.commentarray.length);
    for (var j = 0; j < $scope.commentarray.length; j++) {
      $scope.comment.commentDetail.push($scope.commentarray[j]);
      //     alert("$scope.comment.commentDetail"+$scope.comment.commentDetail)
    }
    var multicomment = $scope.comment.commentDetail;
    //   alert("multicomment --- " + $scope.comment.commentDetail);

    var matchComment = $scope.item.commentMatch;
    //      alert("matchComment defat " + matchComment);

    $scope.allvalidation = [{
      field: matchName,
      validation: ""
    },
    {
      field: defaultclubcity,
      validation: ""
    },
    {
      field: clubId1,
      validation: ""
    },
    {
      field: clubId2,
      validation: ""
    },
    {
      field: dateofMatch,
      validation: ""
    },
    {
      field: timeofMatch,
      validation: ""
    },
    {
      field: sportcntr,
      validation: ""
    },
    {
      field: matchOverview,
      validation: ""
    },
    {
      field: multicomment,
      validation: ""
    },
    {
      field: matchComment,
      validation: ""
    }
    ];
    var check = formvalidation($scope.allvalidation);
    //  alert(check);
    if (check) {
      var msgdata = {
        'currentUserID': localStorage.getItem("userId"),
        'matchID': matchID,
        'matchName': matchName,
        'matchLocation': defaultclubcity,
        'clubID1': clubId1,
        'clubID2': clubId2,
        'matchDate': dateofMatch,
        'matchTime': timeofMatch,
        'matchSportCenter': sportcntr,
        'matchOverview': matchOverview,
        'matchComment': $scope.comment.commentDetail,
        'matchCommentnew': matchComment

      };
      var parameter = JSON.stringify(msgdata);
      //   alert(parameter);
      console.log("PAAARARATATA---- " + parameter);
      MyServices.orgCreateMatch(parameter).
        then(function (data, status, headers) {
          $ionicLoading.hide();
          //    alert("Final Resonse " + JSON.stringify(data));
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('congrats'),
            template: '<p class="text-center">{{"youmatcheditsuccess" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });
          $state.go('matchmenu');
        },
          function (data, status, header, config) {
            /* $scope.ResponseDetails = "Data: " + data +
                                    "<hr />status: " + status +
                                    "<hr />headers: " + header +
                                    "<hr />config: " + config;
                                     alert("eroror"+$scope.ResponseDetails);*/
            var myPopup = $ionicPopup.show({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
              scope: $scope,

            });
            $timeout(function () {
              myPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);

          });

    } else {
      msgforall("Fill all data");
      $ionicLoading.hide();
    }
  }

  // Submit Match Details 
  //*******************************************************//
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: 'Create Club',
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }

})

//START CREATE TEAM & MY TEAM

starter.controller('sppMatchSlideMenuCtrl', function ($scope, $ionicModal, $timeout, $rootScope) {

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

})


starter.controller('sppMatchMyTeamCtrl', function ($scope, MyServices, $state, $ionicPlatform, $ionicLoading, $ionicModal, $ionicPopup, $timeout, $rootScope, $translate, $filter) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('matchmenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };


  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $ionicLoading.show();
  var data = { "matchCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //   alert("Para " + parameter);
  MyServices.spMatchListForMyTeam(parameter).
    then(function (response, status, headers) {
      //       alert("Data.Data " + JSON.stringify(response.data.data[0].match_detail));
      if (response.data.data[0].match_detail == null) {
        $ionicLoading.hide();
        /*var myPopup = $ionicPopup.show({
        template: '<p class="text-center">There Is No Team !</p>',
        title: 'Sorry!'
        });
        $timeout(function () {
        $state.go('matchmenu');
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 3000);*/

        /*var confirmPopup = $ionicPopup.confirm({
             title: 'Sorry',
             template: '<p class="text-center">There Is No Team !</p>'
           });

           confirmPopup.then(function(res) {
             if(res) {
                $state.go('matchmenu');
              }
            });*/
        //nakii

        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('sorry'),
          template: '<p class="text-center">{{"therinoteam" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
        alertPopup.then(function (res) {
          $state.go('matchmenu');
          console.log('Thank you for not eating my delicious ice cream cone');
        });


      }
      else {
        //  alert("Data.Data " + JSON.stringify(response.data.data));
        $ionicLoading.hide();
        $scope.matchBy = response.data.data;
        $rootScope.countnearby = {
          itemCount: $scope.matchBy[0].length
        }
      }
      $ionicLoading.hide();
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  //Click For Create Team 

  $scope.createteam = function (matchID, matchClubID) {


    $state.go("sppmatchmyteamlist", { "matchID": matchID, "matchClubID": matchClubID });
    console.log($scope.createteam);
  }

  // var data={"currentUserID": localStorage.getItem("userId"), "matchID":matchID, "clubID":matchClubID}


})

starter.controller('sppMatchMyTeamListCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams, $ionicPlatform, $translate) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('sppmatchmyteam');
    e.preventDefault();
  }, 101);
  $scope.team = {};
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }
  $scope.createteam

  $scope.matchID = $stateParams.matchID;
  $scope.matchClubID = $stateParams.matchClubID;
  // alert("MatchClubId " + $scope.matchClubID);
  //  alert("matchID Id is "+ $scope.matchID);
  //  alert("matchClubID Id is "+  $scope.matchClubID);

  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId"), "matchID": $scope.matchID, "clubID": $scope.matchClubID, "lang_term": language }
  var parameter = JSON.stringify(data);
  //  alert("Parameter " + parameter);
  $ionicLoading.show();

  MyServices.clickToCreateTeam(parameter).
    then(function (response, status, headers) {
      //    alert("Data.Data-------- " + JSON.stringify(response.data.data));
      //    alert("Data.Data " + response.data.data[0].teamName);
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      //   $scope.spmatchBy = response.data.data.length;
      $scope.spmatchBy = response.data.data;
      //  alert($scope.spmatchBy.player_list);
      /* if(response.data.data.player_list == "Approve"){*/
      /*  $scope.addButton = function() {
         alert("button clicked");
         var btnhtml = '<button type="button" ng-click="addButton()">{{inneritem.Approve}}</button>';
         angular.element(document.getElementById('foo')).append((btnhtml));
       }
*/
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      /*}else{
        $ionicLoading.hide();
      }*/
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  /*
                $scope.getApproveButton = function (playerID, clubID, matchID) {
                $state.go("spplayerdetails", {"playerID":playerID, "clubID":clubID, "matchID":matchID});
                console.log($scope.getplayerdetails);
              }*/

  //Approve, Approved, Reject Click


  $scope.getApproveButton = function (getUserID, clubID, matchID) {
    // alert("Task Id is "+ clubID);
    // $scope.items = []; 
    //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
    var data = { "playerID": getUserID, "clubID": clubID, "matchID": matchID }
    //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
    var parameter = JSON.stringify(data);
    //   alert(parameter);
    //  $ionicLoading.show();
    $ionicLoading.show();
    MyServices.spplayerapproverejectclick(parameter).
      then(function (response, status, headers) {
        //       alert("Status " + response.data.data.status);
        if (response.data.status != "Approved") {
          $ionicLoading.hide();
          /*var myPopup = $ionicPopup.show({
          template: '<p class="text-center">You are Already Applied on This Club!</p>',
          title: 'Sorry!'
          //scope: $scope,
        });*/
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('sorry'),
            template: '<p class="text-center">{{"yourrejected" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });
          $state.go('sppmatchmyteamlist', null, { reload: true });
          //    $state.go($state.current, {}, {reload: true}); 
          //              $state.reload();
          //    $window.location.reload(true);
          //   $state.go('clubslidermenu.clubinyourarea',null,{reload:true});
        }
        else {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            template: '<p class="text-center">{{"successapproved" | translate}}</p>',
            title: $filter('translate')('congrats'),
            buttons: [{
              text: $translate.instant('ok')
            }]
            //scope: $scope,
          });

          $state.go('sppmatchmyteamlist', null, { reload: true });
        }
        /*$timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);*/
        //    alert("items : " + JSON.stringify($scope.items));
        // alert("Items Data.Club ClubArea " + $scope.items);
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });
  }

  //Approve, Approved, Reject Click

  //159 Submit Team Name 

  $scope.createTeamNamesubmit = function (matchID, clubID) {

    // alert("team nm " + $scope.team.teamname);
    $ionicLoading.show();


    $scope.allvalidation = [{
      field: $scope.team.teamname,
      validation: ""
    }];
    var check = formvalidation($scope.allvalidation);
    //  alert(check);
    // alert("Country " + $scope.countries[0]);
    //  alert("Country " + $scope.createClub.clubCountry);
    //  alert("Image Path " + JSON.stringify(localStorage.getItem("mobiledp")));
    if (check) {
      var msgdata = {
        'currentUserID': localStorage.getItem("userId"),
        'teamCreatedBy': localStorage.getItem("userId"),
        'matchID': matchID,
        'clubID': clubID,
        'teamName': $scope.team.teamname
      };
      var parameter = JSON.stringify(msgdata);
      //   alert(parameter);
      MyServices.spCreateTeamBTN(parameter).
        then(function (data, status, headers) {
          //   alert(data.data.status);
          if (data.data.status == "ApprovalPending") {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"youteamminoneorelevplgetappr" | translate}}</p>',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });
            //    $state.go('spmatchcreateteamlist',null,{reload:true});  
          }
          else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('teamcreated'),
              template: '<p class="text-center">{{"youteamcreasuccess" | translate}}</p>',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });
            $state.go('sppmatchmyteamlist', null, { reload: true });


          }
        },
          function (data, status, header, config) {
            /* $scope.ResponseDetails = "Data: " + data +
                                    "<hr />status: " + status +
                                    "<hr />headers: " + header +
                                    "<hr />config: " + config;
                                     alert("eroror"+$scope.ResponseDetails);*/
            var myPopup = $ionicPopup.show({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
              scope: $scope,

            });
            $timeout(function () {
              myPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);

          });

    } else {
      msgforall('{{"plsflldata" | translate}}');
      $ionicLoading.hide();
    }
  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: $filter('translate')('creatteaam'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }


  // Submit Team Name 


})



starter.controller('sppMatchCreateTeamCtrl', function ($scope, $filter, MyServices, $state, $ionicLoading, $ionicModal, $ionicPlatform, $ionicPopup, $timeout, $rootScope) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('matchmenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $ionicLoading.show();
  var data = { "matchCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);

  MyServices.spMatchListForCreateTeam(parameter).
    then(function (response, status, headers) {
      if (response.data.data == null) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">{{"therinomatchcreteam" | translate}}</p>',
          title: $filter('translate')('sorry')
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        //  alert("Data.Data " + JSON.stringify(response.data.data));
        $ionicLoading.hide();
        $scope.matchBy = response.data.data;
        $rootScope.countnearby = {
          itemCount: $scope.matchBy[0].length
        }
      }
      $ionicLoading.hide();
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  //Click For Create Team 

  $scope.createteam = function (matchID, matchClubID) {
    //       alert("matchID Id is "+ matchID);
    //       alert("matchClubID Id is "+ matchClubID);

    $state.go("sppmatchcreateteamlist", { "matchID": matchID, "matchClubID": matchClubID });
    console.log($scope.createteam);
  }

  // var data={"currentUserID": localStorage.getItem("userId"), "matchID":matchID, "clubID":matchClubID}


})




starter.controller('sppMatchCreateTeamListCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $ionicPlatform, $timeout, $state, $stateParams, $translate) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('sppmatchcreateteam');
    e.preventDefault();
  }, 101);
  $scope.team = {};
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }


  $scope.createteam

  $scope.matchID = $stateParams.matchID;
  $scope.matchClubID = $stateParams.matchClubID;
  // alert("MatchClubId " + $scope.matchClubID);

  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId"), "matchID": $scope.matchID, "clubID": $scope.matchClubID, "lang_term": language }
  var parameter = JSON.stringify(data);
  //   alert("Parameter " + parameter);
  $ionicLoading.show();

  MyServices.clickToCreateTeam(parameter).
    then(function (response, status, headers) {
      //  alert("Data.Data::----::-- " + JSON.stringify(response.data.data));
      //    alert("Data.Data " + response.data.data[0].teamName);
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      //   $scope.spmatchBy = response.data.data.length;
      $scope.spmatchBy = response.data.data;
      //  alert($scope.spmatchBy.player_list);
      /* if(response.data.data.player_list == "Approve"){*/
      /*  $scope.addButton = function() {
         alert("button clicked");
         var btnhtml = '<button type="button" ng-click="addButton()">{{inneritem.Approve}}</button>';
         angular.element(document.getElementById('foo')).append((btnhtml));
       }
*/
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      /*}else{
        $ionicLoading.hide();
      }*/
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  /*
                $scope.getApproveButton = function (playerID, clubID, matchID) {
                $state.go("spplayerdetails", {"playerID":playerID, "clubID":clubID, "matchID":matchID});
                console.log($scope.getplayerdetails);
              }*/

  //Approve, Approved, Reject Click


  $scope.getApproveButton = function (getUserID, clubID, matchID) {
    // alert("Task Id is "+ clubID);
    // $scope.items = []; 
    //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
    var data = { "playerID": getUserID, "clubID": clubID, "matchID": matchID }
    //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
    var parameter = JSON.stringify(data);
    //   alert(parameter);
    //  $ionicLoading.show();
    $ionicLoading.show();
    MyServices.spplayerapproverejectclick(parameter).
      then(function (response, status, headers) {
        //       alert("Status " + response.data.data.status);
        if (response.data.status != "Approved") {
          $ionicLoading.hide();
          /*var myPopup = $ionicPopup.show({
          template: '<p class="text-center">You are Already Applied on This Club!</p>',
          title: 'Sorry!'
          //scope: $scope,
        });*/
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('sorry'),
            template: '<p class="text-center">{{"rejected" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });
          $state.go('sppmatchcreateteamlist', null, { reload: true });
          //    $state.go($state.current, {}, {reload: true}); 
          //              $state.reload();
          //    $window.location.reload(true);
          //   $state.go('clubslidermenu.clubinyourarea',null,{reload:true});
        }
        else {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            template: '<p class="text-center">{{"successapproved" | translate}}</p>',
            title: $filter('translate')('congrats'),
            buttons: [{
              text: $translate.instant('ok')
            }]
            //scope: $scope,
          });

          $state.go('sppmatchcreateteamlist', null, { reload: true });
        }
        /*$timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);*/
        //    alert("items : " + JSON.stringify($scope.items));
        // alert("Items Data.Club ClubArea " + $scope.items);
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });
  }

  //Approve Click




  //159 Submit Team Name 

  $scope.createTeamNamesubmit = function (matchID, clubID) {

    // alert("team nm " + $scope.team.teamname);
    $ionicLoading.show();


    $scope.allvalidation = [{
      field: $scope.team.teamname,
      validation: ""
    }];
    var check = formvalidation($scope.allvalidation);
    //  alert(check);
    // alert("Country " + $scope.countries[0]);
    //  alert("Country " + $scope.createClub.clubCountry);
    //  alert("Image Path " + JSON.stringify(localStorage.getItem("mobiledp")));
    if (check) {
      var msgdata = {
        'currentUserID': localStorage.getItem("userId"),
        'teamCreatedBy': localStorage.getItem("userId"),
        'matchID': matchID,
        'clubID': clubID,
        'teamName': $scope.team.teamname
      };
      var parameter = JSON.stringify(msgdata);
      //   alert("Parameter Pass : " + parameter);
      MyServices.spCreateTeamBTN(parameter).
        then(function (data, status, headers) {
          //    alert("Response " + JSON.stringify(data.data.status));
          if (data.data.status == "ApprovalPending") {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"youteamminoneorelevplgetappr" | translate}}',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });
            //    $state.go('spmatchcreateteamlist',null,{reload:true});  
          }
          else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('teamcreated'),
              template: '<p class="text-center">{{"youteamcreasuccess" | translate}}</p>',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });
            $state.go('sppmatchcreateteamlist', null, { reload: true });


          }
        },
          function (data, status, header, config) {
            /* $scope.ResponseDetails = "Data: " + data +
                                    "<hr />status: " + status +
                                    "<hr />headers: " + header +
                                    "<hr />config: " + config;
                                     alert("eroror"+$scope.ResponseDetails);*/
            var myPopup = $ionicPopup.show({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
              scope: $scope,

            });
            $timeout(function () {
              myPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);

          });

    } else {
      msgforall('{{"plsflldata" | translate}}');
      $ionicLoading.hide();
    }
  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: $filter('translate')('creatteaam'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }


  // Submit Team Name 


})




//END CREATE TEAM & MY TEAM


//Start Add Result Of Players
starter.controller('spAddResultlistMatchStatisticsCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPlatform, $ionicPopup, $timeout, $state, $stateParams, $translate) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('matchmenu');
    e.preventDefault();
  }, 101);
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }


  /*  $scope.items = [];  */
  var data = { "matchCreatedBy": localStorage.getItem("userId"), "lang_term": language }
  var parameter = JSON.stringify(data);
  //  alert("Param :-- " + parameter); 
  $ionicLoading.show();
  MyServices.spaddresultmatchstats(parameter).
    then(function (response, status, headers) {
      //       alert("items : " + JSON.stringify(response.data.data[0]));
      //      alert("items : " + JSON.stringify(response.data.data));
      //     alert("items : " + JSON.stringify(response.data.data.match_detail));
      // alert("Items Data.Club ClubArea " + response.data.data);
      if (response.data.data == null) {
        $ionicLoading.hide();
        //  alert("Response " + JSON.stringify(response.data.success));
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">{{"nomatchavail" | translate}}</p>',
          title: $filter('translate')('sorry')
          //scope: $scope,
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
          $state.go('matchmenu');
        }, 3000);
      }
      else {
        $ionicLoading.hide();
        $scope.matchBy = response.data.data;
      }
      /*$timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);*/
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      })

  $scope.getPlayedMatchDetailss = function (matchID) {
    //  alert("Match Id is "+ matchID);
    // $scope.title = $filter('translate')('sorry');
    //  $location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    var data = { "currentUserID": localStorage.getItem("userId"), "matchID": matchID, "lang_term": language }
    var parameter = JSON.stringify(data);
    //  alert("para:-- " + parameter);
    MyServices.addResultMatchOverview(parameter).
      then(function (response, status, headers) {
        //   alert("Response =====" + JSON.stringify(response.data.data));
        if (response.data.data == "null") {
          var myPopup = $ionicPopup.show({
            template: '<p class="text-center">{{"youcantaccess" | translate}}</p>',
            title: $filter('translate')('sorry')
          });
          $timeout(function () {
            myPopup.close();
          }, 2000);
        }
        else {

          $state.go("sppoverviewslidermenu.sppmatchoverview", { "matchID": matchID });
          //   console.log($scope.getPlayedMatchDetails);
          //$state.go('sentmessagedetails' + id);
        }
      },
        function (data, status, header, config) {
          //alert("Invalid Email Address or password");  

        });

  }




})


starter.controller('sppOverviewMenuSlideCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state) {

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

})

starter.controller('sppMatchOverviewCtrl', function ($scope, MyServices, $ionicModal, $ionicPlatform, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams, $translate) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('spaddresultlistmatchstatistics');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }

  $scope.getPlayedMatchDetails
  $scope.matchID = $stateParams.matchID;
  //  alert("Match ID " + $scope.matchID);
  window.localStorage.setItem("matchidforresult", $scope.matchID);
  //    alert("localStorage MatchID Value:  " +localStorage.getItem("matchidforresult"));
  $scope.item = {};
  $scope.posts = {};
  //  {"matchID":"9","currentUserID":"11"}
  var data = { "currentUserID": localStorage.getItem("userId"), "matchID": $scope.matchID, "lang_term": language }
  var parameter = JSON.stringify(data);
  //  alert("parameter " + parameter);  
  $ionicLoading.show();
  /*var cityId = $scope.item.citydata;
      var cityName = $.grep($scope.citycategories, function (catcity) {
                return catcity.city_id == cityId;
             })[0].city_name;*/

  MyServices.addResultMatchOverview(parameter).
    then(function (response, status, headers) {
      //  alert("ResponJsonStr " + JSON.stringify(response.data.data));
      /* alert("ResponJsonStr[0] " + JSON.stringify(response.data.data[0]));
       alert("Respfirst " + $scope.posts);*/
      $scope.posts = response.data.data;
      //  alert("Resp " + $scope.posts);
      $scope.item.matchName = $scope.posts.matchName
      $scope.item.sportcenterName = $scope.posts.sportcenterName
      $scope.item.matchCreatedByname = $scope.posts.matchCreatedByname
      $scope.item.clubImageUrl1 = $scope.posts.clubImageUrl1
      $scope.item.clubName1 = $scope.posts.clubName1
      $scope.item.club1result = $scope.posts.club1result

                          /*alert("first_name " + $scope.item.first_name);
                          alert("POstsfirst_name " + $scope.posts.first_name);
*/                        $scope.item.clubImageUrl2 = $scope.posts.clubImageUrl2
      $scope.item.club2result = $scope.posts.club2result
      $scope.item.clubName2 = $scope.posts.clubName2
      $scope.item.matchTime = $scope.posts.matchTime
      $scope.item.newMatchDate = $scope.posts.newMatchDate
      $scope.item.dayofDate = $scope.posts.dayofDate
      $scope.item.matchLocation = $scope.posts.matchLocation
      $scope.item.matchOverview = $scope.posts.matchOverview
      $scope.item.matchStatus = $scope.posts.matchStatus
      $scope.item.matchID = $scope.posts.matchID
      $scope.item.matchclassshow = $scope.posts.matchclassshow
      $scope.item.matchclasshide = $scope.posts.matchclasshide
      $scope.item.clubID1 = $scope.posts.clubID1
      $scope.item.clubID2 = $scope.posts.clubID2
      /*  
          if($scope.item.matchStatus == "Add result"){
              $scope.item.matchclassmatchplayed = "matchclassaddresult"
          }

          if($scope.item.matchStatus == "Match Played"){
              $scope.item.matchclassaddresult = "display:none !important;"
          }
          $scope.item.matchclassmatchplayed = $scope.posts.matchclassmatchplayed
          $scope.item.matchclassaddresult = $scope.posts.matchclassaddresult
*/
      $ionicLoading.hide();

      //alert("succ " + $scope.posts.isActive);
    },
      function (data, status, header, config) {
        //alert("Invalid Email Address or password");  

      });

  /*{"currentUserID":"81","matchID":"59","matchTie":"Tie",
  "matchResult":"Add Result","rdMatchResultClubID1":"clubID"}*/

  $scope.resultTie = function (matchID) {
    //     alert("Tie Match Id is "+ matchID);

    $scope.tieresult_bind = 'Tie';

    var data = {
      "currentUserID": localStorage.getItem("userId"), "matchID": matchID,
      "matchTie": $scope.tieresult_bind
    }
    var parameter = JSON.stringify(data);
    //    alert("PARAMETER PASS: " + parameter);

    var confirmPopup = $ionicPopup.confirm({
      title: $filter('translate')('tie'),
      template: '<p class="text-center">{{"areusuretiematch" | translate}}</p>',
      buttons: [
        {
          text: $translate.instant('cancel')
          , onTap: function (e) {
            return false;
          }
        },
        {
          text: $translate.instant('ok')
          , onTap: function (e) {
            return true;
          }
        }
      ]
    });
    confirmPopup.then(function (res) {
      // alert("RESSSVALUE :-- " + res);
      if (res) {

        $ionicLoading.show();
        MyServices.resultTieClick(parameter).
          then(function (response, status, headers) {
            //   alert("Response : " + JSON.stringify(response.data.status));
            if (response.data.status == "Tied") {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                title: $filter('translate')('congrats'),
                template: '<p class="text-center">{{"successupdthresult" | translate}}</p>',
                buttons: [{
                  text: $translate.instant('ok')
                }]
              });
              $state.go('sppoverviewslidermenu.sppmatchoverview', null, { reload: true });
            }
            else {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                template: '<p class="text-center">{{"plsfircrteabothclub" | translate}}</p>',
                title: $filter('translate')('sorry'),
                buttons: [{
                  text: $translate.instant('ok')
                }]
                //scope: $scope,
              });
              //   $state.go('sppoverviewslidermenu.sppmatchoverview',null,{reload:true}); 
            }
            console.log(parameter);
          },
            function (data, status, header, config) {
              $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            });


        console.log('You are sure For Tie');
      }
      else {
        console.log('You are not sure For Tie');
      }
    });
  }

  /*$scope.getVal=function(){
    $scope.item = {};
    alert("Won Club Clicked -- " + $scope.valueforresult);
    console.log($scope.valueforresult);
    $scope.change=$scope.valueforresult;
  }*/

  $scope.resultAdd = function (matchID, valueforresult) {
    //   alert("Match ID -- " + matchID);
    //    alert("item  -- " + JSON.stringify(item));
    var valForConfirm = 11;
    //    alert("Won Club Clicked -- " + valueforresult);
    $scope.checkingvalueforresult = valueforresult;
    if ($scope.checkingvalueforresult == null || $scope.checkingvalueforresult == undefined) {
      valForConfirm = 12;
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('please'),
        template: '<p class="text-center">{{"selewinteam" | translate}}</p>',
        buttons: [{
          text: $translate.instant('ok')
        }]
      });

    }

    //   alert("rest val "+ $scope.item.restpass);
    //  console.log($scope.valueforresult);
    /*{"currentUserID":"81","matchID":"59","matchTie":"Tie",
      "matchResult":"Add Result","rdMatchResultClubID1":"clubID"}*/
    if (valForConfirm == 11) {
      var data = {
        "currentUserID": localStorage.getItem("userId"), "matchID": matchID,
        "matchTie": "", "matchResult": "Add Result", "rdMatchResultClubID1": valueforresult
      }
      var parameter = JSON.stringify(data);
      // alert("PARAMETER PASS: " + parameter);

      var confirmPopup = $ionicPopup.confirm({
        title: $filter('translate')('addresult'),
        template: '<p class="text-center">{{"areusurewantaddresult" | translate}}</p>',
        buttons: [
          {
            text: $translate.instant('cancel')
            , onTap: function (e) {
              return false;
            }
          },
          {
            text: $translate.instant('ok')
            , onTap: function (e) {
              return true;
            }
          }
        ]
      });

      confirmPopup.then(function (res) {
        //  alert(res);
        if (res) {

          $ionicLoading.show();
          MyServices.resultTieClick(parameter).
            then(function (response, status, headers) {
              //  alert("Response : " + JSON.stringify(response.data.status));
              //Condition For Tied Must Be Changed 17-08-2016
              if (response.data.status == "Result Added") {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: $filter('translate')('congrats'),
                  template: '<p class="text-center">{{"successupdthresult" | translate}}</p>',
                  buttons: [{
                    text: $translate.instant('ok')
                  }]
                });
                $state.go('sppoverviewslidermenu.sppmatchoverview', null, { reload: true });
              }
              else {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  template: '<p class="text-center">{{"plsfircrteabothclub" | translate}}</p>',
                  title: $filter('translate')('sorry'),
                  buttons: [{
                    text: $translate.instant('ok')
                  }]
                  //scope: $scope,
                });
                //   $state.go('sppoverviewslidermenu.sppmatchoverview',null,{reload:true}); 
              }
              console.log(parameter);
            },
              function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                  "<hr />status: " + status +
                  "<hr />headers: " + header +
                  "<hr />config: " + config;
              });


          console.log('You are sure For Tie');
        }
        else {
          console.log('You are not sure For Tie');
        }
      });

    }

  }

  $scope.resultrReset = function (matchID) {
    //  alert("MatchjID "+ matchID);
    $scope.item.valueforresult = undefined;
    //  alert("Match IDDD BVal " +$scope.item.valueforresult );

  }



})


starter.controller('sppMatchPlayersCtrl', function ($scope, MyServices, $translate, $ionicModal, $filter, $location, $ionicLoading, $ionicPlatform, $ionicPopup, $timeout, $state, $stateParams) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('spaddresultlistmatchstatistics');
    e.preventDefault();
  }, 101);

  $scope.group = {};
  $scope.group2 = {};
  /*for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: [],
      show: false
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
  */
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }

  //  $scope.getPlayedMatchDetails
  $scope.matchID = window.localStorage.getItem("matchidforresult");
  //alert("matchidforresult Match ID " + $scope.matchID);
  //  $scope.item = {};
  $scope.items = {};
  $scope.group2.items = {};
  //  {"matchID":"9","currentUserID":"11"}
  var data = { "currentUserID": localStorage.getItem("userId"), "matchID": $scope.matchID }
  var parameter = JSON.stringify(data);
  //   alert("parameter " + parameter);  
  $ionicLoading.show();
  /*var cityId = $scope.item.citydata;
      var cityName = $.grep($scope.citycategories, function (catcity) {
                return catcity.city_id == cityId;
             })[0].city_name;*/
  //!@#
  MyServices.addawardoverview(parameter).
    then(function (response, status, headers) {

      //    alert("Statust " + JSON.stringify(response.data.status));
      //   alert("ResponJsonStr " + JSON.stringify(response.data.data.match_details[0]));

      //    alert("Respfirst Club1 : -- " + JSON.stringify(response.data.data.club1players));
      //    alert("Respfirst Club2 : --  " + JSON.stringify(response.data.data.club2players));

      if (response.data.status == "notplayed") {
        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('sorry'),
          template: '<p class="text-center">{{"matchntplayed" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });//!@#$
        alertPopup.then(function (res) {
          $state.go('spaddresultlistmatchstatistics');
          console.log('Thank you for not eating my delicious ice cream cone');
        });

      }
      else {
        $scope.posts = response.data.data.match_details[0];
        //       alert("Resp " + $scope.posts);
        $scope.group.clubImageUrl1 = $scope.posts.clubImageUrl1
        $scope.group.clubName1 = $scope.posts.clubName1
        $scope.items = response.data.data.club1players;
                       //   alert("Club1 PLayers " + $scope.items);
                        //  alert("Club1 Players JSOnStr " + JSON.stringify(response.data.data.club1Players));
                         /* $scope.item.avatar=$scope.post.avatar
                          $scope.item.Name=$scope.post.Name*/
                          /*alert("first_name " + $scope.item.first_name);
                          alert("POstsfirst_name " + $scope.posts.first_name);
*/              $scope.group2.clubImageUrl2 = $scope.posts.clubImageUrl2
        $scope.group2.clubName2 = $scope.posts.clubName2
        $scope.group2.items = response.data.data.club2players;
        //   alert("Club222 PLayers " + $scope.items);
        //    alert("Club222 Players JSOnStr " + JSON.stringify(response.data.data.club2Players));
        /* $scope.item.avatar=$scope.post.avatar
         /*$scope.item.avatar=$scope.post.avatar
         $scope.item.Name=$scope.post.Name*/
      }



      $ionicLoading.hide();

      //alert("succ " + $scope.posts.isActive);
    },
      function (data, status, header, config) {
        //alert("Invalid Email Address or password");  

      });



  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function (group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function (group) {
    return group.show;
  };

  $scope.toggleGroup = function (group2) {
    group2.show = !group2.show;
  };
  $scope.isGroupShown = function (group2) {
    return group2.show;
  };




  $scope.assignAward = function (getUserID, getMatchID, getClubID, $index) {

    $scope.selectedIndex = $index;
    //    {"userID":"81","clubID":"132","matchID":"70"}
    var data = { "userID": getUserID, "matchID": getMatchID, "clubID": getClubID }
    var parameter = JSON.stringify(data);
    //   alert("PARAMETER PASS: " + parameter);

    var confirmPopup = $ionicPopup.confirm({
      title: 'Award',
      template: '<p class="text-center">Are you sure you want to proceed for this player?</p>'
    });

    confirmPopup.then(function (res) {
      if (res) {

        $ionicLoading.show();
        MyServices.assignAwardtoplayer(parameter).
          then(function (response, status, headers) {
            //  alert("Response Success : " + JSON.stringify(response.data.success));
            //  alert("Respones Full : " + JSON.stringify(response.data.data));
            if (response.data.success == 1) {
              //     alert("Respones sTATUS : " + JSON.stringify(response.data.status));
              if (response.data.status == "Assigned") {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Congrats!',
                  template: '<p class="text-center">Successfully Assign Award To Player</p>'
                });
                $state.go('sppoverviewslidermenu.sppmatchplayers', null, { reload: true });
              }
              else if (response.data.status == "NotAssigned") {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Sorry!',
                  template: '<p class="text-center">You Cannot Assign Award To Losser Team Player</p>'
                });

              }
              else if (response.data.status == "Tied") {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Sorry!',
                  template: '<p class="text-center">You Cannot Assign Award To Tied Team Player</p>'
                });

              }
              else {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Congrats!',
                  template: '<p class="text-center">Successfully UnAssigned Award To Player</p>'
                });
                $state.go('sppoverviewslidermenu.sppmatchplayers', null, { reload: true });
              }

            }
            else {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                template: '<p class="text-center">Something Went Wrong!</p>',
                title: 'Sorry!'
                //scope: $scope,
              });
              //   $state.go('sppoverviewslidermenu.sppmatchoverview',null,{reload:true}); 
            }
            console.log(parameter);
          },
            function (data, status, header, config) {
              $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            });


        console.log('You are sure For Tie');
      }
      else {
        console.log('You are not sure For Tie');
      }
    });



  }


})


starter.controller('sppMatchRatingsCtrl', function ($scope, MyServices, $translate, $ionicModal, $filter, $location, $ionicLoading, $ionicPlatform, $ionicPopup, $timeout, $state, $stateParams) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('spaddresultlistmatchstatistics');
    e.preventDefault();
  }, 101);

  $scope.group = {};
  $scope.group2 = {};
  /*for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: [],
      show: false
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
  */
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }

  //  $scope.getPlayedMatchDetails
  $scope.matchID = window.localStorage.getItem("matchidforresult");
  //alert("matchidforresult Match ID " + $scope.matchID);
  //  $scope.item = {};
  $scope.items = [];
  $scope.item = {};
  $scope.group2.items = {};
  //  {"matchID":"9","currentUserID":"11"}
  var data = { "currentUserID": localStorage.getItem("userId"), "matchID": $scope.matchID }
  var parameter = JSON.stringify(data);
  //   alert("parameter " + parameter);  
  $ionicLoading.show();
  /*var cityId = $scope.item.citydata;
      var cityName = $.grep($scope.citycategories, function (catcity) {
                return catcity.city_id == cityId;
             })[0].city_name;*/
  //!@#
  MyServices.addratingoverview(parameter).
    then(function (response, status, headers) {

      //    alert("Statust " + JSON.stringify(response.data.status));
      //   alert("ResponJsonStr " + JSON.stringify(response.data.data.match_details[0]));

      //    alert("Respfirst Club1 : -- " + JSON.stringify(response.data.data.club1players));
      //    alert("Respfirst Club2 : --  " + JSON.stringify(response.data.data.club2players));

      if (response.data.status == "notplayed") {
        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('sorry'),
          template: '<p class="text-center">{{"matchntplayed" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });//!@#$
        alertPopup.then(function (res) {
          $state.go('spaddresultlistmatchstatistics');
          console.log('Thank you for not eating my delicious ice cream cone');
        });

      }
      else {
        $scope.posts = response.data.data.match_details[0];
        //   alert("Resp---------- " + JSON.stringify(response.data.data));
        $scope.group.clubImageUrl1 = $scope.posts.clubImageUrl1
        $scope.group.clubName1 = $scope.posts.clubName1
        $scope.items = response.data.data.club1players;
        for (var i = 0; i < $scope.items.length; i++) {
          /* $scope.item.final_rating = $scope.items[i].final_rating;*/
          //       alert("final_ratingLOOPBeFore:-- " +  $scope.items[i].final_rating);
          if ($scope.items[i].final_rating == null) {
            //        alert("INSIDELOOPNUllllllllll:-- " +  $scope.items[i].final_rating);
            $scope.items[i].final_rating = 0;
          } else {
            //         alert("INSIDELOOPDONECAL:-- " +  $scope.items[i].final_rating);
            $scope.items[i].final_rating = (($scope.items[i].final_rating / 10) / 2) * 16;
          }
          //       alert("final_ratingLOOPAfter:-- " +  $scope.items[i].final_rating);
        }


                         // alert("$scope.item--- "+ JSON.stringify($scope.items[0].final_rating));


                           //$scope.item.final_rating=$scope.items.final_rating;
                          /* $scope.item.final_rating = (($scope.items.final_rating)/10/2) * 16;
                           alert("$scope.item.final_rating--- "+ JSON.stringify($scope.item.final_rating));*/

                       //   alert("Club1 PLayers " + $scope.items);
                        //  alert("Club1 Players JSOnStr " + JSON.stringify(response.data.data.club1Players));
                         /* $scope.item.avatar=$scope.post.avatar
                          $scope.item.Name=$scope.post.Name*/
                          /*alert("first_name " + $scope.item.first_name);
                          alert("POstsfirst_name " + $scope.posts.first_name);
*/              $scope.group2.clubImageUrl2 = $scope.posts.clubImageUrl2
        $scope.group2.clubName2 = $scope.posts.clubName2
        $scope.group2.items = response.data.data.club2players;
        //   alert("Lent:---- " + $scope.group2.items.length );
        // alert("final_rating :-- " +JSON.stringify($scope.group2.items[0].final_rating));
        for (var i = 0; i < $scope.group2.items.length; i++) {
          /* $scope.item.final_rating = $scope.items[i].final_rating;*/
          //  alert("final_ratingLOOP:-- " +(($scope.group2.items[i].final_rating/10)/2)*16 );
          if ($scope.group2.items[i].final_rating == null) {
            $scope.group2.items[i].final_rating = 0;
          } else {
            $scope.group2.items[i].final_rating = (($scope.group2.items[i].final_rating / 10) / 2) * 16;
          }


        }
        //     alert("$scope.itemgroup2.items--- "+ JSON.stringify($scope.group2.items[0].final_rating));
        // $scope.group2.final_rating = ($scope.items.final_rating)/10/2;
        //alert("$scope.item.final_rating--- "+ JSON.stringify($scope.group2.final_rating));

        //   alert("Club222 PLayers " + $scope.items);
        //    alert("Club222 Players JSOnStr " + JSON.stringify(response.data.data.club2Players));
        /* $scope.item.avatar=$scope.post.avatar
         /*$scope.item.avatar=$scope.post.avatar
         $scope.item.Name=$scope.post.Name*/
      }



      $ionicLoading.hide();

      //alert("succ " + $scope.posts.isActive);
    },
      function (data, status, header, config) {
        //alert("Invalid Email Address or password");  

      });

  /*
      $scope.ratingsObject = {
      iconOn: 'ion-ios-star', //Optional
      iconOff: 'ion-ios-star-outline', //Optional
      iconOnColor: 'rgb(200, 200, 100)', //Optional
      iconOffColor: 'rgb(200, 100, 100)', //Optional
      rating: 0, //Optional
      minRating: 0, //Optional
      readOnly: false, //Optional
      callback: function(rating,index) { //Mandatory    
        $scope.ratingsCallback(rating,index);
      }
    };
  */
  /*$scope.ratingsCallback = function(rating, index) {
    if(rating == 1){
      rating = 20;
    }else if(rating == 2){
      rating = 40;
    }
    else if(rating == 3){
      rating = 60;
    }
    else if(rating == 4){
      rating = 80;
    }
    else if(rating == 5){
      rating = 100;
    }

    console.log('Selected rating is : ', rating, ' and index is ', index);
    


  };*/



  $scope.assignRating = function (getUserID, getMatchID, getClubID, $index) {

    //  alert("HII") ;
    //   alert("$scope.group2.items[i].final_rating "+ $scope.group2.items[0].final_rating);
    $state.go("assignRatingFile", { "getUserID": getUserID, "getMatchID": getMatchID, "getClubID": getClubID, "index": $index });
  }


  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function (group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function (group) {
    return group.show;
  };

  $scope.toggleGroup = function (group2) {
    group2.show = !group2.show;
  };
  $scope.isGroupShown = function (group2) {
    return group2.show;
  };




  $scope.assignAward = function (getUserID, getMatchID, getClubID, $index) {

    $scope.selectedIndex = $index;
    //    {"userID":"81","clubID":"132","matchID":"70"}
    var data = { "userID": getUserID, "matchID": getMatchID, "clubID": getClubID }
    var parameter = JSON.stringify(data);
    //   alert("PARAMETER PASS: " + parameter);

    var confirmPopup = $ionicPopup.confirm({
      title: 'Award',
      template: '<p class="text-center">Are you sure you want to proceed for this player?</p>'
    });

    confirmPopup.then(function (res) {
      if (res) {

        $ionicLoading.show();
        MyServices.assignAwardtoplayer(parameter).
          then(function (response, status, headers) {
            //  alert("Response Success : " + JSON.stringify(response.data.success));
            //  alert("Respones Full : " + JSON.stringify(response.data.data));
            if (response.data.success == 1) {
              //     alert("Respones sTATUS : " + JSON.stringify(response.data.status));
              if (response.data.status == "Assigned") {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Congrats!',
                  template: '<p class="text-center">Successfully Assign Award To Player</p>'
                });
                $state.go('sppoverviewslidermenu.sppmatchplayers', null, { reload: true });
              }
              else if (response.data.status == "NotAssigned") {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Sorry!',
                  template: '<p class="text-center">You Cannot Assign Award To Losser Team Player</p>'
                });

              }
              else if (response.data.status == "Tied") {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Sorry!',
                  template: '<p class="text-center">You Cannot Assign Award To Tied Team Player</p>'
                });

              }
              else {
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                  title: 'Congrats!',
                  template: '<p class="text-center">Successfully UnAssigned Award To Player</p>'
                });
                $state.go('sppoverviewslidermenu.sppmatchplayers', null, { reload: true });
              }

            }
            else {
              $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
                template: '<p class="text-center">Something Went Wrong!</p>',
                title: 'Sorry!'
                //scope: $scope,
              });
              //   $state.go('sppoverviewslidermenu.sppmatchoverview',null,{reload:true}); 
            }
            console.log(parameter);
          },
            function (data, status, header, config) {
              $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            });


        console.log('You are sure For Tie');
      }
      else {
        console.log('You are not sure For Tie');
      }
    });



  }


})



starter.controller('spSportsCenterCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $timeout, $location, $ionicLoading, $state) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('supervisormenuslider.supervisormenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.items = [];
  $ionicLoading.show();
  MyServices.scportcenter().
    then(function (response, status, headers) {

      //   alert("success " + JSON.stringify(response.data.data));
      //   alert("Details " + response.data.data);
      $scope.items = response.data.data;
      //   $scope.items = response.data.data;
      $ionicLoading.hide();

      //   alert("Details " + JSON.stringify($scope.items));
      //  $scope.description = $sce.trustAsHtml($scope.posts.khalijiPROName);
      //  $scope.content.content = $sce.trustAsHtml($scope.content.content);
    },
      function (data, status, header, config) {
        $scope.errorData = response.data.data;
        //     alert("error " + JSON.stringify(response.data.data));


      })

})








//End Add Result Of Players


starter.controller('myMatchPlayedMatchCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $ionicPlatform) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('matchslidermenu.mymatchplayedddd');
    e.preventDefault();
  }, 101);

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  /*	$scope.items = [];	*/
  var data = { "matchCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  $ionicLoading.show();
  MyServices.myPlayedMatchall(parameter).
    then(function (response, status, headers) {
      //    	 alert("items : " + JSON.stringify(response.data.data[0]));
      //  	  alert("items : " + JSON.stringify(response.data.data));
      //  	 alert("items : " + JSON.stringify(response.data.data.match_detail));
      // alert("Items Data.Club ClubArea " + response.data.data);
      if (response.data.data == null) {
        $ionicLoading.hide();
        //	alert("Response " + JSON.stringify(response.data.success));
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">No matches are available</p>',
          title: 'Sorry!'
          //scope: $scope,
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
          $state.go('menuslider.menu');
        }, 3000);
      }
      else {
        $ionicLoading.hide();
        $scope.matchBy = response.data.data;
      }
			/*$timeout(function () {
					myPopup.close(); //close the popup after 3 seconds for some reason
				}, 3000);*/
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      })

  $scope.getPlayedMatchDetails = function (matchID) {
    //  	alert("Match Id is "+ matchID);
    //	$location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("overviewslidermenu.matchoverview", { "matchID": matchID });
    console.log($scope.getPlayedMatchDetails);
    //$state.go('sentmessagedetails' + id);
  }
})
starter.controller('overviewmenuSlideCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state) {
  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }
})

starter.controller('matchOverviewCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams, $ionicPlatform) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('matchslidermenu.mymatchplayedddd');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }


  $scope.getPlayedMatchDetails
  $scope.matchID = $stateParams.matchID;
  //	alert("Match ID " + $scope.matchID);
  window.localStorage.setItem("matchid", $scope.matchID);
  $scope.item = {};
  //	{"matchID":"9","currentUserID":"11"}
  var data = { "matchID": $scope.matchID, "lang_term": language }
  var parameter = JSON.stringify(data);
  //alert("parameter " + parameter);	
  $ionicLoading.show();
  /*var cityId = $scope.item.citydata;
        var cityName = $.grep($scope.citycategories, function (catcity) {
                return catcity.city_id == cityId;
               })[0].city_name;*/

  MyServices.playedMatchOverview(parameter).
    then(function (response, status, headers) {
      /*alert("ResponJsonStr " + JSON.stringify(response.data.data));
      alert("ResponJsonStr[0] " + JSON.stringify(response.data.data[0]));
      alert("Respfirst " + $scope.posts);*/
      $scope.posts = response.data.data.matchdetail[0];
      //  alert("Resp " + JSON.stringify($scope.posts));
      $scope.item.matchName = $scope.posts.matchName
      $scope.item.sportcenterName = $scope.posts.sportcenterName
      $scope.item.display_name = $scope.posts.display_name
      $scope.item.clubImageUrl1 = $scope.posts.clubImageUrl1
      $scope.item.clubName1 = $scope.posts.clubName1
      $scope.item.clubID1status = $scope.posts.clubID1status
                          /*alert("first_name " + $scope.item.first_name);
                          alert("POstsfirst_name " + $scope.posts.first_name);
*/                        $scope.item.clubImageUrl2 = $scope.posts.clubImageUrl2
      $scope.item.clubName2 = $scope.posts.clubName2
      $scope.item.clubID2status = $scope.posts.clubID2status
      $scope.item.matchOverview = $scope.posts.matchOverview
      $scope.item.matchTime = $scope.posts.matchTime
      $scope.item.matchDate = $scope.posts.matchDate
      $scope.item.dayofDate = $scope.posts.dayofDate
      $scope.item.matchLocation = $scope.posts.matchLocation
      $scope.commentarray = $scope.posts.matchComment;
      $ionicLoading.hide();

      //alert("succ " + $scope.posts.isActive);
    },
      function (data, status, header, config) {
        //alert("Invalid Email Address or password");  

      });

})


starter.controller('matchPlayersCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {
  //alert("Match " + );

  $scope.group = {};
  $scope.group2 = {};
  /*for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: [],
      show: false
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
  */
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }

  //	$scope.getPlayedMatchDetails
  $scope.matchID = window.localStorage.getItem("matchid");
  //		alert("Match ID " + $scope.matchID);
  //  $scope.item = {};
  $scope.items = {};
  $scope.group2.items = {};
  //	{"matchID":"9","currentUserID":"11"}
  var data = { "matchID": $scope.matchID, "lang_term": language }
  var parameter = JSON.stringify(data);
  //	alert("parameter " + parameter);	
  $ionicLoading.show();
  /*var cityId = $scope.item.citydata;
        var cityName = $.grep($scope.citycategories, function (catcity) {
                return catcity.city_id == cityId;
               })[0].city_name;*/

  MyServices.playedMatchOverview(parameter).
    then(function (response, status, headers) {
      //	alert("ResponJsonStr " + JSON.stringify(response.data.data));
      // 		alert("ResponJsonStr CLub Player1::-- " + JSON.stringify(response.data.data.club1Players));
      // 		alert("Respfirst " + $scope.posts);
      $scope.posts = response.data.data.matchdetail[0];
      //       alert("Resp " + $scope.posts);
      $scope.group.clubImageUrl1 = $scope.posts.clubImageUrl1
      $scope.group.clubName1 = $scope.posts.clubName1
      $scope.items = response.data.data.club1Players;
                       //   alert("Club1 PLayers " + $scope.items);
                        //  alert("Club1 Players JSOnStr " + JSON.stringify(response.data.data.club1Players));
                         /* $scope.item.avatar=$scope.post.avatar
                          $scope.item.Name=$scope.post.Name*/
                          /*alert("first_name " + $scope.item.first_name);
                          alert("POstsfirst_name " + $scope.posts.first_name);
*/						  $scope.group2.clubImageUrl2 = $scope.posts.clubImageUrl2
      $scope.group2.clubName2 = $scope.posts.clubName2
      $scope.group2.items = response.data.data.club2Players;
      //   alert("Club222 PLayers " + $scope.items);
      //    alert("Club222 Players JSOnStr " + JSON.stringify(response.data.data.club2Players));
      /* $scope.item.avatar=$scope.post.avatar
       /*$scope.item.avatar=$scope.post.avatar
       $scope.item.Name=$scope.post.Name*/



      $ionicLoading.hide();

      //alert("succ " + $scope.posts.isActive);
    },
      function (data, status, header, config) {
        //alert("Invalid Email Address or password");  

      });



  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function (group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function (group) {
    return group.show;
  };

  $scope.toggleGroup = function (group2) {
    group2.show = !group2.show;
  };
  $scope.isGroupShown = function (group2) {
    return group2.show;
  };
})


starter.controller('messageSlideCtrl', function ($scope, $ionicModal, $timeout) {
  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

})

starter.controller('inboxmessageSlideCtrl', function ($scope, MyServices, $ionicPlatform, $location, $ionicModal, $ionicPopup, $ionicLoading, $state, $timeout, $filter, $translate) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }


  $scope.items = [];
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //	alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.inboxmessageListall(parameter).
    then(function (response, status, headers) {
      //    alert("Items " + JSON.stringify(response.data.data));
      //    alert("Items " + JSON.stringify(response.data.data[0]));
      //	$scope.items = JSON.stringify(response.data.data.match_detail);
      if (response.data.success != 1) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">{{"youhavnomessge" | translate}}</p>',
          title: $filter('translate')('sorry')
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        $ionicLoading.hide();
        $scope.items = response.data.data[0];
        //	window.localStorage.setItem("UserMessageId", JSON.stringify(response.data.data.messageID));
      }


      //  alert("items : " + JSON.stringify($scope.items));
      //	alert("Items Data.Club ClubArea " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  $scope.getinboxmessagedetails = function (messageChatID) {
    //      	alert("Chat ID is "+ messageChatID);
    //	$location.url("messageslidermenu.inboxmessagedetails" + messageID);
    $state.go("inboxmessagedetails", { "messageChatID": messageChatID });
    console.log($scope.getinboxmessagedetails);
    //$state.go('sentmessagedetails' + id);
  }

})
starter.controller('inboxMessageDetailsCtrl', function ($scope, MyServices, $stateParams, $ionicPlatform, $ionicLoading, $state, $ionicModal, $timeout) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('messageslidermenu.inboxmessage');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };


  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  // MyServices.find($stateParams.movieid, function(movie)
  $scope.messageChatID = $stateParams.messageChatID;
  $scope.items = [];
  //	var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId"), "messageChatID": $scope.messageChatID }
  //	alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
  var parameter = JSON.stringify(data);
  //	alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.inboxmessageDetail(parameter).
    then(function (response, status, headers) {
      //      alert("Data.Data " + JSON.stringify(response.data.data));
      //           alert("Data " + JSON.stringify(response.data));
      //           alert("Data[0] " + JSON.stringify(response.data[0]));
      // 	$scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      $ionicLoading.hide();
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      //    alert("items : " + JSON.stringify($scope.items));
      // alert("Items Data.Club ClubArea " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  $scope.getinboxmessagechtid = function (messageChatID) {
    //      alert("getinboxmessagechtid ID is "+ messageChatID);
    //  $location.url("messageslidermenu.inboxmessagedetails" + messageID);
    $state.go("messagereplay", { "messageChatID": messageChatID });
    console.log($scope.getinboxmessagechtid);
    //$state.go('sentmessagedetails' + id);
  }

})
// Message Replay
starter.controller('messageReplayCtrl', function ($scope, MyServices, $stateParams, $ionicPopup, $ionicPlatform, $ionicLoading, $state, $ionicModal, $timeout, $location, $filter, $translate) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('messageslidermenu.inboxmessage');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };


  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }
  // MyServices.find($stateParams.movieid, function(movie)
  //  $scope.getinboxmessagechtid

  //  alert("getinbox " + JSON.stringify($scope.getinboxmessagechtid));
  $scope.messageChatID = $stateParams.messageChatID;
  //   alert("MEssagae StatePAram ChatID " + $stateParams.messageChatID);
  //  alert("MEssagaeChatID " + $scope.messageChatID);
  localStorage.setItem("messagechatid", $scope.messageChatID);
  //  alert("Messagechatid MessachatScope " + $scope.messageChatID);
  // alert("Messagechatid emnem " + $stateParams.messageChatID);
  //  alert("Messagechatid " + window.localStorage.getItem("messagechatid"));
  //123abcd
  //$scope.items = [];  
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  //  var data={"currentUserID": localStorage.getItem("userId"), "messageChatID":$scope.messageChatID}
  //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
  //  var parameter=JSON.stringify(data);   
  //  alert("Items " + JSON.stringify(response.data.data));

  $scope.message = {};
  var messagesuccess = function (data, status) {


    if (data != "false") {
      //  $.jStorage.set("user", data);
      //  window.localStorage.setItem("userdataa", JSON.stringify(data));
      //  alert("Data Replay " + JSON.stringify(data));
      //  user = data.user;
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">{{"replymailsentsuccess" | translate}}</p>',
        title: $filter('translate')('congrats'),
        scope: $scope,

      });
      $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
        $state.go('messageslidermenu.inboxmessage');
      }, 3000);

    } else {
      $scope.showPopupsignupfailure();
    }
    $ionicLoading.hide();
    $scope.message = {};
  }

  // **** For SIGN UP FORM *** //



  $scope.messageReplaysubmit = function (message) {

    $ionicLoading.show();


    $scope.allvalidation = [{
      field: $scope.message.description,
      validation: ""
    }
    ];
    var check = formvalidation($scope.allvalidation);
    if (check) {
      MyServices.messagefn($scope.message, messagesuccess, function (err) {
        //    $location.url('offline');
      });
    } else {
      msgforall('{{"plsflldata" | translate}}');
      $ionicLoading.hide();
    }

  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: $filter('translate')('messagereplay'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }
  // popup
  $scope.showPopupsignupsuccess = function () {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">{{"successreg" | translate}}</p>',
      title: $filter('translate')('congrats'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };
  $scope.showPopupsignupfailure = function () {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">{{"therwassomprobsendmail" | translate}}</p>',
      title: $filter('translate')('oops'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };









})
// Message Replay

starter.controller('sentmessageSlideCtrl', function ($scope, MyServices, $location, $state, $ionicLoading, $ionicPopup, $timeout) {

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }



  $scope.items = [];
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //	alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.sentmessageListall(parameter).
    then(function (response, status, headers) {

      //    alert("Items " + JSON.stringify(response.data.data));
      //    alert("Items " + JSON.stringify(response.data.data[0]));
      //	$scope.items = JSON.stringify(response.data.data.match_detail);
      if (response.data.success != 1) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">{{"youhavnomessge" | translate}}</p>',
          title: $filter('translate')('sorry')
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
      }
      else {
        $ionicLoading.hide();
        $scope.items = response.data.data[0];
      }

      //   window.localStorage.setItem("UserMessageId", JSON.stringify(response.data.data.messageID));
      $ionicLoading.hide();
      //  alert("items : " + JSON.stringify($scope.items));
      //	alert("Items Data.Club ClubArea " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  $scope.getsentmessagedetails = function (messageID) {
    //    	alert("Task Id is "+ messageID);
    //	$location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("sentmessagedetails", { "messageID": messageID });
    console.log($scope.getsentmessagedetails);
    //$state.go('sentmessagedetails' + id);
  }

})
starter.controller('sentMessageDetailsCtrl', function ($scope, MyServices, $stateParams, $ionicLoading, $ionicModal, $timeout) {
  // MyServices.find($stateParams.movieid, function(movie)
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.messageID = $stateParams.messageID;
  $scope.items = [];
  //	var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId"), "messageID": $scope.messageID }
  //	alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
  var parameter = JSON.stringify(data);
  //	alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.sentmessageDetail(parameter).
    then(function (response, status, headers) {
      // alert("Data.Data " + JSON.stringify(response.data.data));
      // alert("Data " + JSON.stringify(response.data));
      // alert("Data[0] " + JSON.stringify(response.data[0]));
      //	$scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      // alert("Items Data.Club ClubArea " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

})
starter.controller('settingsCtrl', function ($scope, $rootScope, $cordovaSocialSharing, MyServices, $ionicActionSheet, $state, $ionicLoading, $window, $ionicHistory, $ionicModal, $ionicPlatform, $translate, $cordovaAppRate) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);

  $scope.shareArticle = function () {
    $cordovaSocialSharing.share("KhalijiPro Message", "This is your subject", null, "http://www.khalijipro.com/");
  }

  /*$scope.ChangeLanguage = function(lang){
     console.log("language:::--- " + lang);
     $translate.use(lang);
     }*/



  $scope.langauges = [{
    langID: "en",
    langName: 'English'
  }, {
    langID: "ar",
    langName: 'العربية'
  }];

  $scope.item = {};
  var langchecker = 0;
  console.log("$scope.item.language ::--  " + $scope.item.language);
  console.log("DEFAllsjdflds-asdas----language : -- " + localStorage.getItem("language"));
  // alert("First time Enter ---------:::---"+localStorage.getItem("language"));
  if (localStorage.getItem("language") == null || localStorage.getItem("language") == "null") {
    // alert("IFFFF SEELCTED VALUES ---------:::---"+localStorage.getItem("language"));
    $scope.item.language = $scope.langauges[0].langID;
    $translate.use('en');
    console.log("IFFFF Default Lang :--- " + $scope.item.language);
  }
  else {
    // var english = "en";
    // alert("In Else First Time Enter ---------:::---"+localStorage.getItem("language"));
    //   alert("ELSE SEELCTED VALUES ---------:::---"+localStorage.getItem("language"));
    console.log("SEELCTED VALUES ---------:::---" + localStorage.getItem("language"))
    if (localStorage.getItem("language") == "en") {
      //     alert("ELSE ---IF--EN SEELCTED VALUES ---------:::---"+localStorage.getItem("language"));
      console.log("-----EN-------" + localStorage.getItem("language"));
      $scope.item.language = $scope.langauges[0].langID;
      $translate.use('en');
      /*$translate.use(JSON.stringify(localStorage.getItem("language")));*/
    }
    else {
      //    alert("ELSE ---ELSE--AR SEELCTED VALUES ---------:::---"+localStorage.getItem("language"));
      console.log("-----AR-------" + localStorage.getItem("language"));
      $scope.item.language = $scope.langauges[1].langID;
      $translate.use('ar');
      $scope.myClass = "rtlcontent";
      $scope.settingClass = "settingClass"
      /*$translate.use(JSON.stringify(localStorage.getItem("language")));*/
    }
  }

  // console.log("DEfLang " + deflang);
  console.log("getLangBySelected ID : -- " + $scope.item.language);
  console.log("DEFAllsjdflds---language : -- " + localStorage.getItem("language"));

  $scope.getLangBySelected = function (lang) {
    //   alert("Clicked  === "+JSON.stringify(lang));
    console.log("LangClicked   " + lang);
    var langid = $scope.item.language;
    var langname = $.grep($scope.langauges, function (lang) {
      return lang.langID == langid;
    })[0].langName;
    //       alert("Selected Value: " + orderid + "\nSelected Text: " + ordername);
    //      {"getClubCreatedBy":"1","orderByClub":""}
    console.log("******langid******" + langid);
    if (langid == "en") {
      console.log("language:::--- " + lang);
      localStorage.setItem("language", lang);
      console.log("localStorage Valu EN" + localStorage.getItem("language"));
      langchecker = 1;
      $translate.use(lang);
      $state.go('settings', null, { reload: true });
    }
    else if (langid == "ar") {
      console.log("language:::--- " + lang);
      localStorage.setItem("language", lang);
      console.log("localStorage Valu ARA" + localStorage.getItem("language"));
      langchecker = 1;
      $translate.use(lang);
      $scope.myClass = "rtlcontent";
      $scope.settingClass = "settingClass"
      $state.go('settings', null, { reload: true });
    }
  }



  //123789

  $scope.rateUs = function () {
    document.addEventListener("deviceready", function () {

      $cordovaAppRate.promptForRating(true).then(function (result) {
        // success
      });
    }, false);
  }


  $scope.logout = function () {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Logout',
      titleText: 'Are you sure you want to logout?',
      cancelText: 'Cancel',
      cancel: function () {

      },
      buttonClicked: function (index) {
        return true;

      },
      destructiveButtonClicked: function () {
        $ionicLoading.show({
          template: 'Logging out...'
        });
        //facebook logout
        /*  facebookConnectPlugin.logout(function(){
            $ionicLoading.hide();
          },
          function(fail){
            $ionicLoading.hide();
          });*/
        // ionic.Platform.exitApp();
        delete $window.localStorage.getItem("userId");
        window.localStorage.clear();
        localStorage.loggedIn = undefined;
        localStorage.setItem("introscreens", true);
        //	alert("introscreens Is = " + localStorage.getItem("introscreens"));
        //	alert("UserID Logged = " + localStorage.loggedIn);
        //   navigator.app.exitApp();
        $state.go("login");
      }
    });
  };
})

starter.controller('aboutusslidermenuSlideCtrl', function ($scope, MyServices, $filter, $timeout, $location, $ionicLoading, $state) {

})

starter.controller('aboutCtrl', function ($scope, MyServices, $filter, $timeout, $location, $ionicPlatform, $ionicLoading, $state) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.items = [];
  $ionicLoading.show();
  MyServices.aboutall().
    then(function (response, status, headers) {

      //   alert("success " + JSON.stringify(response.data.data));
      //   alert("Details " + response.data.data);
      $scope.items = response.data.data;
      //   $scope.items = response.data.data;
      $ionicLoading.hide();

      //   alert("Details " + JSON.stringify($scope.items));
      //  $scope.description = $sce.trustAsHtml($scope.posts.khalijiPROName);
      //  $scope.content.content = $sce.trustAsHtml($scope.content.content);
    },
      function (data, status, header, config) {
        $scope.errorData = response.data.data;
        //     alert("error " + JSON.stringify(response.data.data));


      })
})
starter.controller('sportsCentersCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $timeout, $location, $ionicLoading, $state, $translate, $ionicConfig, $ionicFilterBar) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.items = [];
  $ionicLoading.show();
  MyServices.scportcenter().
    then(function (response, status, headers) {

      //  alert("success " + JSON.stringify(response.data.data));
      //  alert("Details " + response.data.data);
      $scope.items = response.data.data;
      //   $scope.items = response.data.data;
      $ionicLoading.hide();

      //   alert("Details " + JSON.stringify($scope.items));
      //  $scope.description = $sce.trustAsHtml($scope.posts.khalijiPROName);
      //  $scope.content.content = $sce.trustAsHtml($scope.content.content);
    },
      function (data, status, header, config) {
        $scope.errorData = response.data.data;
        //     alert("error " + JSON.stringify(response.data.data));


      })
  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        /* console.log("filteredItems:--- "+ JSON.stringify(filteredItems));
         console.log( "$scope.items:---- "+JSON.stringify($scope.items));*/
        if (filterText) {
          /*console.log(filterText);*/
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };

})

starter.controller('topPlayersCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $ionicPopup, $timeout, $location, $ionicLoading, $state, $ionicSideMenuDelegate, $ionicFilterBar, $translate, $ionicConfig) {
  var start = 0;
  var ending = start + 10;
  var lastdata;
  var reachLast = false;


  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.numberOfItemsToDisplay = 5; // number of item to load each time
  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.topPlayersDetials(parameter).
    then(function (response, status, headers) {
      //   alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      if (response.data.data == null) {
        $ionicLoading.hide();

        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('sorry'),
          template: '<p class="text-center">{{"notopplayyeers" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
        alertPopup.then(function (res) {
          $state.go('menuslider.menu');
          console.log('Thank you for not eating my delicious ice cream cone');
        });

      }
      else {
        $ionicLoading.hide();
        $scope.addMoreItem = function (done) {
          //  alert("call");
          console.log("add more " + $scope.items.length + " : " + $scope.numberOfItemsToDisplay)
          if ($scope.items.length > $scope.numberOfItemsToDisplay) {
            $scope.numberOfItemsToDisplay += 2; // load 20 more items
            // done(); // need to call this when finish loading more data
            // $ionicLoading.show();
          }
          else {

            $scope.noMoreItemsAvailable = true;
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }

        $scope.items = response.data.data;
        //   $scope.ngModel.txt = response.data.data;
      }

      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };

})

starter.controller('topClubsCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $timeout, $location, $ionicFilterBar, $ionicLoading, $state, $translate, $ionicConfig) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }


  $scope.numberOfItemsToDisplay = 5; // number of item to load each time
  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.topClubsDetials(parameter).
    then(function (response, status, headers) {
      //   alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      if (response.data.data == null) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Sorry!',
          template: '<p class="text-center">No Top Clubs!</p>'
        });
        alertPopup.then(function (res) {
          $state.go('menuslider.menu');
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      }
      else {
        $ionicLoading.hide();
        $scope.addMoreItem = function (done) {
          // alert("call");
          console.log("add more " + $scope.items.length + " : " + $scope.numberOfItemsToDisplay)
          if ($scope.items.length > $scope.numberOfItemsToDisplay) {
            $scope.numberOfItemsToDisplay += 2; // load 20 more items
            // done(); // need to call this when finish loading more data
          }
          else {

            $scope.noMoreItemsAvailable = true;
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }

        $scope.items = response.data.data;
        //   $scope.ngModel.txt = response.data.data;
      }

      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };

})
starter.controller('rankingCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $ionicPopup, $timeout, $location, $ionicLoading, $state) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.item = {};
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.rankingDetails(parameter).
    then(function (response, status, headers) {
      //   alert("Ranking Response:--  " + JSON.stringify(response.data.data));
      // $scope.posts = response.data.data;
      $scope.posts = response.data.data;
      //  $scope.item.avatar=$scope.posts.avatar
      $scope.item.countedSupervisor = $scope.posts.countedSupervisor
      $scope.item.countedPlayedTotalMatch = $scope.posts.countedPlayedTotalMatch
      $scope.item.currentPlayerPersonalRanking = $scope.posts.currentPlayerPersonalRanking
      $scope.item.countedPlayer = $scope.posts.countedPlayer
      $scope.item.countedPlayedMatchOrganise = $scope.posts.countedPlayedMatchOrganise
      $scope.item.countedPlayedTotalMatch = $scope.posts.countedPlayedTotalMatch
      $scope.item.countedMyClubCreated = $scope.posts.countedMyClubCreated
      $scope.item.countedMyTotalClub = $scope.posts.countedMyTotalClub



      /* if(response.data.data == null){
       $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
           template: '<p class="text-center">You Have Achieved No Awards Keep Playing Hard!</p>',
           title: 'Sorry!'
         });
     }
     else{
       $ionicLoading.hide();
       $scope.items = response.data.data;
     }*/
      $ionicLoading.hide();
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });




})

starter.controller('awardsCtrl', function ($scope, MyServices, $translate, $filter, $ionicPlatform, $ionicPopup, $timeout, $location, $ionicLoading, $state) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }


  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.awardsDetails(parameter).
    then(function (response, status, headers) {
      //    alert("Data.Data " + JSON.stringify(response.data.data));
      //  alert("Data [0] " + JSON.stringify(response.data.data[0]));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);

      if (response.data.data == null) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          template: '<p class="text-center">{{"youhaacinoawarplyhard" | translate}}</p>',
          title: $filter('translate')('sorry'),
          buttons: [{
            text: $translate.instant('ok')
          }]
          //scope: $scope,
        });
        alertPopup.then(function (res) {
          $state.go('menuslider.menu');
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      }
      else {
        $ionicLoading.hide();
        $scope.items = response.data.data;
      }
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

})



starter.controller('topOrganizerCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $ionicFilterBar, $timeout, $location, $ionicLoading, $state, $translate, $ionicConfig) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }


  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.topOrganizerDetials(parameter).
    then(function (response, status, headers) {
      // alert("Data.Data " + JSON.stringify(response.data.data));
      // alert("Data [0] " + JSON.stringify(response.data.data[0]));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };
})
starter.controller('myFollowersCtrl', function ($scope, MyServices, $translate, $filter, $ionicFilterBar, $ionicPlatform, $timeout, $location, $ionicLoading, $state, $ionicPopup, $translate, $ionicConfig) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.myFollowers(parameter).
    then(function (response, status, headers) {
      //  alert("Data.Data " + JSON.stringify(response.data.data));
      // alert("Data [0] " + JSON.stringify(response.data.data[0]));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      //    $scope.items = response.data.data;
      if (response.data.data == null) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          template: '<p class="text-center">{{"nofollowers" | translate}}</p>',
          title: $filter('translate')('sorry'),
          buttons: [{
            text: $translate.instant('ok')
          }]
          //scope: $scope,
        });
        alertPopup.then(function (res) {
          $state.go('menuslider.menu');
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      }
      else {
        $ionicLoading.hide();
        $scope.items = response.data.data;
      }
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  $scope.getplayerdetails = function (playerID) {
    $state.go("playerdetails", { "playerID": playerID });
    //     alert("player ID " + playerID);
    console.log($scope.getplayerdetails);
  }

  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };

})

starter.controller('myFollowingCtrl', function ($scope, MyServices, $translate, $filter, $ionicFilterBar, $ionicPlatform, $timeout, $location, $ionicLoading, $state, $ionicPopup, $translate, $ionicConfig) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  /* alert("parameter " + parameter);*/
  $ionicLoading.show();
  MyServices.myFollowing(parameter).
    then(function (response, status, headers) {
      //  alert("Data.Data " + JSON.stringify(response.data.data));
      // alert("Data [0] " + JSON.stringify(response.data.data[0]));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      //    $scope.items = response.data.data;
      if (response.data.data == null) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          template: '<p class="text-center">{{"nofollowing" | translate}}</p>',
          title: $filter('translate')('sorry'),
          buttons: [{
            text: $translate.instant('ok')
          }]
          //scope: $scope,
        });
        alertPopup.then(function (res) {
          $state.go('menuslider.menu');
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      }
      else {
        $ionicLoading.hide();
        $scope.items = response.data.data;
      }
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  $scope.getplayerdetails = function (playerID) {
    $state.go("playerdetails", { "playerID": playerID });
    //     alert("player ID " + playerID);
    console.log($scope.getplayerdetails);
  }

  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };

})

starter.controller('clubSearchByCtrl', function ($scope, MyServices, $ionicFilterBar, $filter, $ionicPlatform, $timeout, $location, $ionicLoading, $state, $translate, $ionicConfig) {
  $scope.item = {};
  //alert("This Is OrderBy");
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {
    $scope.orderses = [{
      orderID: "",
      orderName: 'Most Active'
    }, {
      orderID: 'most followers',
      orderName: 'Most Followers'
    }, {
      orderID: 'most members',
      orderName: 'Most Members'
    }, {
      orderID: 'name',
      orderName: 'Sort By Name'
    }];
  }
  else {
    if (language == "en") {

      $scope.orderses = [{
        orderID: "",
        orderName: 'Most Active'
      }, {
        orderID: 'most followers',
        orderName: 'Most Followers'
      }, {
        orderID: 'most members',
        orderName: 'Most Members'
      }, {
        orderID: 'name',
        orderName: 'Sort By Name'
      }];
    }
    else {

      $scope.orderses = [{
        orderID: "",
        orderName: 'الاكثر نشاطاً'
      }, {
        orderID: 'most followers',
        orderName: 'الاكثر متابعة'
      }, {
        orderID: 'most members',
        orderName: 'الاكثر لاعبين'
      }, {
        orderID: 'name',
        orderName: 'ترتيب بالاسم'
      }];
    }
  }



  $scope.item.orderby = $scope.orderses[0].orderID;
  console.log("ORderSelected ID : -- " + $scope.item.orderby);
  //xoo
  $scope.getOrderBySelected = function (orders) {
    var orderid = $scope.item.orderby;
    var ordername = $.grep($scope.orderses, function (orders) {
      return orders.orderID == orderid;
    })[0].orderName;
    //       alert("Selected Value: " + orderid + "\nSelected Text: " + ordername);
    //      {"getClubCreatedBy":"1","orderByClub":""}
    if (orderid == "") {
      var data = { "getClubCreatedBy": localStorage.getItem("userId"), "orderByClub": orderid };
      var parameter = JSON.stringify(data);
      MyServices.clubSearchBy(parameter).
        then(function (response, status, headers) {

          $scope.items = response.data.data.club;
        },
          function (data, status, header, config) {
            $scope.errorData = data;
          });
    }
    else if (orderid == "most followers") {
      var data = { "getClubCreatedBy": localStorage.getItem("userId"), "orderByClub": orderid };
      var parameter = JSON.stringify(data);
      MyServices.clubSearchBy(parameter).
        then(function (response, status, headers) {
          $scope.items = response.data.data.club;
        },
          function (data, status, header, config) {
            $scope.errorData = data;
          });
    }
    else if (orderid == "most members") {
      var data = { "getClubCreatedBy": localStorage.getItem("userId"), "orderByClub": orderid };
      var parameter = JSON.stringify(data);
      MyServices.clubSearchBy(parameter).
        then(function (response, status, headers) {
          $scope.items = response.data.data.club;
        },
          function (data, status, header, config) {
            $scope.errorData = data;
          });
    }
    else if (orderid == "name") {
      var data = { "getClubCreatedBy": localStorage.getItem("userId"), "orderByClub": orderid };
      var parameter = JSON.stringify(data);
      MyServices.clubSearchBy(parameter).
        then(function (response, status, headers) {
          $scope.items = response.data.data.club;
        },
          function (data, status, header, config) {
            $scope.errorData = data;
          });
    }
  }
  $scope.items = [];

  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "getClubCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.clubSearchBy(parameter).
    then(function (response, status, headers) {
      //  alert("Data.Data " + JSON.stringify(response.data.data.club));
      //   alert("Data.Data [0] " + JSON.stringify(response.data.data.club[0]));
      // alert("Data [0] " + JSON.stringify(response.data.data[0]));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      //  alert("City: " + JSON.stringify(response.data.data.city));
      // $scope.item=response.data.data.city;
      $scope.posts = response.data.data.city;
      //       alert("Resp " + $scope.posts);
      $scope.item.city = $scope.posts;
      //      alert("City "+$scope.item.city);
      $scope.items = response.data.data.club;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  /*     $scope.getplayerdetails = function (playerID) {
       $state.go("playerdetails", {"playerID":playerID});
       console.log($scope.getplayerdetails);
      }*/

  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };


})



starter.controller('partnersAdvCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $timeout, $location, $ionicLoading, $state) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.items = [];
  $ionicLoading.show();
  MyServices.partnersadv().
    then(function (response, status, headers) {

      //  alert("success " + JSON.stringify(response.data.data));
      //  alert("Details " + response.data.data);
      $scope.items = response.data.data;
      //   $scope.items = response.data.data;
      $ionicLoading.hide();

      //   alert("Details " + JSON.stringify($scope.items));
      //  $scope.description = $sce.trustAsHtml($scope.posts.khalijiPROName);
      //  $scope.content.content = $sce.trustAsHtml($scope.content.content);
    },
      function (data, status, header, config) {
        $scope.errorData = response.data.data;
        //     alert("error " + JSON.stringify(response.data.data));


      })

})

starter.controller('contactToAdminCtrl', function ($scope, MyServices, $ionicPlatform, $filter, $timeout, $location, $ionicLoading, $state, $ionicPopup) {


  /*  $ionicHistory.clearCache();
    $window.location.href= "#menuslider.menu";
*/
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);


  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }


  // **** For SIGN UP FORM *** //

  $scope.contacttoadmin = {};
  var contacttoadminsuccess = function (data, status) {


    if (data != "false") {
      //	$.jStorage.set("user", data);
      //	window.localStorage.setItem("userdataa", JSON.stringify(data));
      //	alert("Data " + JSON.stringify(data));
      //	user = data.user;
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">{{"mailsentsuccess" | translate}}</p>',
        title: $filter('translate')('congrats'),
        scope: $scope,

      });
      $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
        $state.go('menuslider.menu');
      }, 3000);

    } else {
      $scope.showPopupsignupfailure();
    }
    $ionicLoading.hide();
    $scope.contacttoadmin = {};
  }

  // **** For SIGN UP FORM *** //



  $scope.sendmailsubmit = function (contacttoadmin) {
    $ionicLoading.show();


    $scope.allvalidation = [{
      field: $scope.contacttoadmin.name,
      validation: ""
    }, {
      field: $scope.contacttoadmin.subject,
      validation: ""
    }, {
      field: $scope.contacttoadmin.email,
      validation: ""
    }, {
      field: $scope.contacttoadmin.description,
      validation: ""
    }
    ];
    var check = formvalidation($scope.allvalidation);
    if (check) {
      MyServices.contacttoadmin($scope.contacttoadmin, contacttoadminsuccess, function (err) {
        //		$location.url('offline');
      });
    } else {
      msgforall('{{"plsflldata" | translate}}');
      $ionicLoading.hide();
    }

  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: $filter('translate')('contoadmin'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }
  // popup
  $scope.showPopupsignupsuccess = function () {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">{{"successreg" | translate}}</p>',
      title: $filter('translate')('congrats'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };
  $scope.showPopupsignupfailure = function () {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">{{"therwassomprobsendmail" | translate}}</p>',
      title: $filter('translate')('oops'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };



})

starter.controller('contactToSupervisorCtrl', function ($scope, MyServices, $filter, $timeout, $location, $ionicLoading, $state, $ionicPopup) {

  MyServices.getSpervisorList("supervisorlist.php/").
    then(function (response, status, headers) {
      $scope.supervisorlists = response.data.data[0];
      /* alert("City[0] " + JSON.stringify(response.data.data[0]));
       alert("City[[0]] " + JSON.stringify(response.data.data[[0]]));
       alert("City Diret " + $scope.citycategories);
*/

      //   alert("succ " + JSON.stringify(response));
    },
      function (data, status, header, config) {
        $scope.errorData = data;
        //   alert("error " + JSON.stringify(data));                        
      });

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  // **** For SIGN UP FORM *** //

  $scope.contacttosupervisor = {};
  var contacttosupervisorsuccess = function (data, status) {


    if (data != "false") {
      //	$.jStorage.set("user", data);
      //	window.localStorage.setItem("userdataa", JSON.stringify(data));
      //	alert("Data " + JSON.stringify(data));
      //	user = data.user;
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">{{"mailsentsuccess" | translate}}</p>',
        title: $filter('translate')('congrats'),
        scope: $scope,

      });
      $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
        $location.url("/menuslider.menu");
      }, 3000);

    } else {
      $scope.showPopupsignupfailure();
    }
    $ionicLoading.hide();
    $scope.contacttosupervisor = {};
  }

  // **** For SIGN UP FORM *** //



  $scope.sendmailtosupervisorsubmit = function (contacttosupervisor) {
    var supervisorId = $scope.supervisorlists;
    //   	alert("$scope.item.citycategories " + $scope.item.citycategories);
    //   	alert("cityId  " + cityId);

    var supervisorName = $.grep($scope.supervisorlists, function (supervisor) {
      return supervisor.ID == supervisorId;
    });

    $ionicLoading.show();


    $scope.allvalidation = [{
      field: supervisorId,
      validation: ""
    }, {
      field: $scope.contacttosupervisor.subject,
      validation: ""
    }, {
      field: $scope.contacttosupervisor.description,
      validation: ""
    }
    ];
    var check = formvalidation($scope.allvalidation);
    if (check) {
      MyServices.contacttosupervisor($scope.contacttosupervisor, contacttosupervisorsuccess, function (err) {
        //		$location.url('offline');
      });
    } else {
      msgforall('{{"plsflldata" | translate}}');
      $ionicLoading.hide();
    }

  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: $filter('translate')('congrats'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }
  // popup
  $scope.showPopupsignupsuccess = function () {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">{{"successreg" | translate}}</p>',
      title: $filter('translate')('congrats'),
      scope: $scope,


    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };
  $scope.showPopupsignupfailure = function () {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">{{"therwassomprobsendmail" | translate}}</p>',
      title: $filter('translate')('oops'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

})

//Organizer Start

starter.controller('organizerMenuCtrl', function ($scope, MyServices, $ionicPlatform, $timeout, $ionicHistory, $rootScope, $location, $state, $window) {

  /*$ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="menu"){
      navigator.app.exitApp(); //<-- remove this line to disable the exit
    }
    else {
      navigator.app.backHistory();
    }
  }, 100);*/
  var backbutton = 0;
  $ionicPlatform.registerBackButtonAction(function (e) {
    // alert("Current State Outside " +  $state.current.name);

    if ($rootScope.backButtonPressedOnceToExit || $state.current.name == 'organizermenuslider.organizermenu') {

      //   alert("Current State " +  $state.current.name);
      // alert("Button Count in Oustdie " +  backbutton);
      if (backbutton == 0) {
        // alert("Button Count in Condition " +  backbutton);
        backbutton++;
        //    alert("Button Count in Condition++ " +  backbutton);
        window.plugins.toast.showShortCenter('Press again to exit');
        $timeout(function () {
          backbutton = 0;
        }, 2000);
      } else {
        //  alert("Button Count in Else " +  backbutton);
        //  ionic.Platform.exitApp();
        navigator.app.exitApp();
      }
      //ionic.Platform.exitApp();
    }
    else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    }
    else {
      $rootScope.backButtonPressedOnceToExit = true;
      window.plugins.toast.showShortCenter(
        "Press back button again to exit", function (a) { }, function (b) { }
      );
      setTimeout(function () {
        $rootScope.backButtonPressedOnceToExit = false;
      }, 2000);
    }
    e.preventDefault();
    return false;
  }, 101);


  //  configreload.onallpage();
  //  alert("ID Is " + localStorage.getItem("userId"));
  $scope.item = {};
  var username = localStorage.getItem("userName");
  $scope.item.username = username;
  //  alert("UserName " + $scope.item.username);
  //  alert("UserName VAr " + username);


})

starter.controller('organizerMenuSliderCtrl', function ($scope, MyServices, $state, $location, $ionicPlatform, $ionicLoading, $window, $ionicActionSheet) {

  /* $ionicPlatform.registerBackButtonAction(function (event) {
   if($state.current.name=="menu"){
     navigator.app.exitApp(); //<-- remove this line to disable the exit
   }
   else {
     navigator.app.backHistory();
   }
 }, 100);
 */

  //LogOut Menu
  $scope.logout = function () {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Logout And Exit',
      titleText: 'Are you sure you want to logout and exit? This app is awsome so I recommend you to stay.',
      cancelText: 'Cancel',
      cancel: function () { },
      buttonClicked: function (index) {
        return true;

      },
      destructiveButtonClicked: function () {
        $ionicLoading.show({
          template: 'Logging out...'
        });
        //facebook logout
        /*  facebookConnectPlugin.logout(function(){
            $ionicLoading.hide();
          },
          function(fail){
            $ionicLoading.hide();
          });*/
        // ionic.Platform.exitApp();
        delete $window.localStorage.getItem("userId");
        window.localStorage.clear();
        localStorage.loggedIn = undefined;
        localStorage.setItem("introscreens", true);
        //  alert("introscreens Is = " + localStorage.getItem("introscreens"));
        //  alert("UserID Logged = " + localStorage.loggedIn);
        navigator.app.exitApp();
      }
    });
  };
  //  configreload.onallpage();
  //  alert("ID Is " + localStorage.getItem("userId"));
  $scope.item = {};
  var username = localStorage.getItem("userName");
  var avatar = localStorage.getItem("userAvatar");
  var firtname = localStorage.getItem("userFirstname");
  var lastname = localStorage.getItem("userLastname");
  var city = localStorage.getItem("userCity");
  //  alert("City " + localStorage.getItem("userCity"));

  // alert("FirstName " + localStorage.getItem("userFirstname"));
  $scope.item.username = username;
  $scope.item.avatar = avatar;
  $scope.item.first_name = firtname;
  $scope.item.last_name = lastname;
  $scope.item.citycategories = city;
  // alert("Avtar " + $scope.item.avatar);
  //  alert("UserName VAr " + username);


})



//Organizer Start






starter.controller('supervisorMenuCtrl', function ($scope, MyServices, $ionicPlatform, $timeout, $ionicHistory, $rootScope, $location, $state, $window) {

  /*$ionicPlatform.registerBackButtonAction(function (event) {
    if($state.current.name=="menu"){
      navigator.app.exitApp(); //<-- remove this line to disable the exit
    }
    else {
      navigator.app.backHistory();
    }
  }, 100);*/
  var backbutton = 0;
  $ionicPlatform.registerBackButtonAction(function (e) {
    // alert("Current State Outside " +  $state.current.name);

    if ($rootScope.backButtonPressedOnceToExit || $state.current.name == 'supervisormenuslider.supervisormenu') {

      //   alert("Current State " +  $state.current.name);
      // alert("Button Count in Oustdie " +  backbutton);
      if (backbutton == 0) {
        // alert("Button Count in Condition " +  backbutton);
        backbutton++;
        //    alert("Button Count in Condition++ " +  backbutton);
        window.plugins.toast.showShortCenter('Press again to exit');
        $timeout(function () {
          backbutton = 0;
        }, 2000);
      } else {
        //  alert("Button Count in Else " +  backbutton);
        //  ionic.Platform.exitApp();
        navigator.app.exitApp();
      }
      //ionic.Platform.exitApp();
    }
    else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    }
    else {
      $rootScope.backButtonPressedOnceToExit = true;
      window.plugins.toast.showShortCenter(
        "Press back button again to exit", function (a) { }, function (b) { }
      );
      setTimeout(function () {
        $rootScope.backButtonPressedOnceToExit = false;
      }, 2000);
    }
    e.preventDefault();
    return false;
  }, 101);


  //  configreload.onallpage();
  //  alert("ID Is " + localStorage.getItem("userId"));
  $scope.item = {};
  var username = localStorage.getItem("userName");
  $scope.item.username = username;
  //  alert("UserName " + $scope.item.username);
  //  alert("UserName VAr " + username);


})

starter.controller('supervisorMenuSliderCtrl', function ($scope, MyServices, $state, $location, $ionicPlatform, $ionicLoading, $window, $ionicActionSheet) {

  /* $ionicPlatform.registerBackButtonAction(function (event) {
   if($state.current.name=="menu"){
     navigator.app.exitApp(); //<-- remove this line to disable the exit
   }
   else {
     navigator.app.backHistory();
   }
 }, 100);
 */

  //LogOut Menu
  $scope.logout = function () {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Logout And Exit',
      titleText: 'Are you sure you want to logout and exit? This app is awsome so I recommend you to stay.',
      cancelText: 'Cancel',
      cancel: function () { },
      buttonClicked: function (index) {
        return true;

      },
      destructiveButtonClicked: function () {
        $ionicLoading.show({
          template: 'Logging out...'
        });
        //facebook logout
        /*  facebookConnectPlugin.logout(function(){
            $ionicLoading.hide();
          },
          function(fail){
            $ionicLoading.hide();
          });*/
        // ionic.Platform.exitApp();
        delete $window.localStorage.getItem("userId");
        window.localStorage.clear();
        localStorage.loggedIn = undefined;
        localStorage.setItem("introscreens", true);
        //  alert("introscreens Is = " + localStorage.getItem("introscreens"));
        //  alert("UserID Logged = " + localStorage.loggedIn);
        navigator.app.exitApp();
      }
    });
  };
  //  configreload.onallpage();
  //  alert("ID Is " + localStorage.getItem("userId"));
  $scope.item = {};
  var username = localStorage.getItem("userName");
  var avatar = localStorage.getItem("userAvatar");
  var firtname = localStorage.getItem("userFirstname");
  var lastname = localStorage.getItem("userLastname");
  var city = localStorage.getItem("userCity");
  //  alert("City " + localStorage.getItem("userCity"));

  // alert("FirstName " + localStorage.getItem("userFirstname"));
  $scope.item.username = username;
  $scope.item.avatar = avatar;
  $scope.item.first_name = firtname;
  $scope.item.last_name = lastname;
  $scope.item.citycategories = city;
  // alert("Avtar " + $scope.item.avatar);
  //  alert("UserName VAr " + username);


})

starter.controller('supervisorClubSliderCtrl', function ($scope, $ionicModal, $timeout) {

})

starter.controller('createEditClubSliderMenuCtrl', function ($scope, MyServices, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $ionicPlatform, $ionicActionSheet, $cordovaCamera, $cordovaFile) {

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

})

starter.controller('spCreateClubCtrl', function ($scope, MyServices, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $ionicPlatform, $ionicActionSheet, $cordovaCamera, $cordovaFile, $filter, $translate) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('clubmenu');
    e.preventDefault();
  }, 101);
  //  configreload.onallpage();
  // alert("USer Email " + localStorage.getItem("userEmail"));
  localStorage.removeItem("mobiledp");
  //alert("Image Path " + JSON.stringify(localStorage.getItem("mobiledp")));
  $scope.edit = false;
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };


  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  /* $scope.item = {};
   MyServices.getSpclubdeafaultvalue("club-create-default-value.php").
             then(function (response, status, headers) {
                 $scope.citycategories=response.data.data.data;
                 },
                 function(data, status, header, config) {
                     $scope.errorData=data;                    
                   });*/
  $scope.item = {};
  MyServices.getFavPosition("getFavouritePosition.php/").
    then(function (response, status, headers) {
      $scope.Member_favourite_position = response.data.data;
    },
      function (data, status, header, config) {
        $scope.errorData = data;
      });


  $scope.item = {};
  $scope.updateProfile = {};
  var data = { "currentUserCity": localStorage.getItem("userCity") };
  var parameter = JSON.stringify(data);
  MyServices.getFavClub(parameter).
    then(function (response, status, headers) {
      $scope.Member_favourite_team_name = response.data.data;
    },
      function (data, status, header, config) {
        $scope.errorData = data;
      });

  //qaz
  $scope.item = [];
  $scope.updateProfile = {};
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  $ionicLoading.show();

  MyServices.getSpclubdeafaultvalue(parameter).
    then(function (response, status, headers) {
      //       alert("Response " + JSON.stringify(response));
      $scope.posts = response.data.data;
      //  $scope.item.avatar=$scope.posts.avatar
      $scope.item.country = $scope.posts.country[0]
      $scope.item.club_city_area = $scope.posts.club_city_area[0]
      $scope.item.club_founder = $scope.posts.club_founder[0]
      $ionicLoading.hide();
    },
      function (data, status, header, config) {

      });




  $scope.createClubsubmit = function (createClub) {

    $ionicLoading.show();
    /*if(localStorage.getItem("mobiledp")==null)
    {
      $scope.createClub.picFile = null;
    //  alert("Image Is Null");
       var alertPopup = $ionicPopup.alert({
            title: 'Image!',
            template: '<p class="text-center">Please Upload Image!</p>'
            });
    }else{
      $scope.createClub.picFile = localStorage.getItem("mobiledp");
    }*/

    //  alert("Pic file " + $scope.createClub.picFile);
    /*  var cityId = $scope.item.citycategories;

      var cityName = $.grep($scope.citycategories, function (catcity) {
              return catcity.city_id == cityId;
           });
  
      var clubId = $scope.item.Member_favourite_team_name;
      var clubName = $.grep($scope.Member_favourite_team_name, function (catclub) {
              return catclub.clubID == clubId;
           });
      var favpostionId = $scope.item.Member_favourite_position;
      var favpostionName = $.grep($scope.Member_favourite_position, function (favpos) {
              return favpos.id == favpostionId;
           })[0].Member_favourite_position;*/

    var showAlert = function (alertTitle) {
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('alert'),
        template: alertTitle,
        buttons: [{
          text: $translate.instant('ok')
        }]
      });

      alertPopup.then(function (res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };



    var validationfun = function () {
      if (localStorage.getItem("mobiledp") == null) {
        $scope.createClub.picFile = null;
        showAlert('<p class="text-center">{{"plsuploadimg" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (!$scope.createClub.clubname) {
        showAlert('<p class="text-center">{{"plsentclunname" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (!$scope.createClub.overviewClub) {
        showAlert('<p class="text-center">{{"plsenterclubovervw" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }

      return true;
    }




    /*  $scope.allvalidation = [{
 field: $scope.createClub.picFile,
 validation: "null"
   },{
 field: $scope.createClub.clubname,
 validation: ""
   },
   {
 field: $scope.item.club_city_area,
 validation: ""
   },
   {
 field: $scope.item.country,
 validation: ""
   },
    {
 field: $scope.item.club_founder,
 validation: ""
   },
   {
 field: $scope.createClub.overviewClub,
 validation: ""
   }
   ];
var check = formvalidation($scope.allvalidation);*/
    //  alert("Valid " + validationfun());
    // alert("Country " + $scope.countries[0]);
    //  alert("Country " + $scope.createClub.clubCountry);
    //  alert("Image Path " + JSON.stringify(localStorage.getItem("mobiledp")));
    if (validationfun()) {
      var msgdata = {
        'userID': localStorage.getItem("userId"),
        'clubName': createClub.clubname,
        'clubCityArea': $scope.item.club_city_area,
        'clubCountry': $scope.item.country,
        'clubFounder': $scope.item.club_founder,
        'clubStatus': "1",
        'clubOverview': createClub.overviewClub,
        'user_email': localStorage.getItem("userEmail"),
        'data': localStorage.getItem("mobiledp"),
        'imagename': ""

      };
      var parameter = JSON.stringify(msgdata);
      //  alert("Para " + parameter);
      MyServices.supervisorCreateClub(parameter).
        then(function (data, status, headers) {
          //    alert(JSON.stringify(data.data));
          if (data.data.nameexists == 'YES') {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"clubnamalreexist" | translate}}</p>',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });

          }
          else if (data.data.nameexists == 'NO') {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('clubcreatedd'),
              template: '<p class="text-center">{{"youclubcresuccesss" | translate}}</p>',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });
            $state.go('clubmenu');

          }
          else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });
          }

        },
          function (data, status, header, config) {
            /* $scope.ResponseDetails = "Data: " + data +
                                    "<hr />status: " + status +
                                    "<hr />headers: " + header +
                                    "<hr />config: " + config;
                                     alert("eroror"+$scope.ResponseDetails);*/
            var myPopup = $ionicPopup.show({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
              scope: $scope,

            });
            $timeout(function () {
              myPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);

          });

    } /*else {
      msgforall("Fill all data");
      $ionicLoading.hide();
    }*/
  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: $filter('translate')('createclub'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }

  $scope.createClub = {};
  var createClubsuccess = function (data, status) {

    //   alert("Data CLub:  " + JSON.stringify(data));
    if (data != "false" || data.success != 0) {
      //  $.jStorage.set("user", data);
      //window.localStorage.setItem("userdataa", JSON.stringify(data));
      //window.localStorage.setItem("userId", JSON.stringify(data.user.id));
      // localStorage.loggedIn = true;
      //  alert("Data " + JSON.stringify(data));
      //  alert("loggedIn " + JSON.stringify(localStorage.loggedIn));
      //  user = data.user;
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">{{"youclubcresuccesss" | translate}}</p>',
        title: $filter('translate')('congrats'),
        scope: $scope,

      });
      $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
        //   localStorage.loggedIn = true;
        $state.go('clubmenu');
      }, 2000);

    } else {
      var myPopup = $ionicPopup.show({
        title: $filter('translate')('sorry'),
        template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
        scope: $scope,

      });
      $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 2000);
    }
    $ionicLoading.hide();
    $scope.createClub = {};
  }




  /** ---------------------------------------------------------------------
         *
         * display alert to choose where to get the image from
         *
         --------------------------------------------------------------------- */
  $scope.images = [];
  $scope.addImage = function () {

    /* var options = {
                  'buttonLabels': ['Take Picture', 'Select From Gallery'],
                  'addCancelButtonWithLabel': 'Cancel'
              };
              window.plugins.actionsheet.show(options, callback);*/
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: $translate.instant('gallery') },
        { text: $translate.instant('camera') }
      ],
      titleText: $filter('translate')('clubicon'),
      cancelText: $filter('translate')('cancel'),
      buttonClicked: function (index) {
        $scope.showImage(index);
      }
    });
  }
  $scope.showImage = function (type) {
    $scope.hideSheet();
    if (type == 1) {
      navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        quality: 100
      });

      function onSuccess(imageData) {
        //   alert("ImageData" + imageData);
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
        //    alert("imageSrc " + image.src);
        //  localStorage.setItem(localStorage.getItem("userId")+"_mobiledp",imageData);
        localStorage.setItem("mobiledp", image.src);

        //    alert(imageData);
        //    $scope.imageupload(); 

      }

      function onFail(message) {
        //alert('Failed because: ' + message);
        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('failed'),
          template: '<p class="text-center">{{"failedbecause" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
      }
    }
    else if (type == 0) {
      navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        quality: 100
      });

      function onSuccess(imageData) {
        //   alert("ImageData" + imageData);
        var image = document.getElementById('myImage');
        image.src = "data:image/png;base64," + imageData;
        //   alert("imageSrc " + image.src);
        //  localStorage.setItem(localStorage.getItem("userId")+"_mobiledp",imageData);
        localStorage.setItem("mobiledp", image.src);
        //    alert(imageData);
        //  $scope.imageupload();
      }

      function onFail(message) {
        //alert('Failed because: ' + message);
        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('failed'),
          template: '<p class="text-center">{{"failedbecause" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
      }
    }

  }
  /// Image Uploading
  /*var imagedata = {
          "user_id":localStorage.getItem("userId"),
          "data":localStorage.getItem(localStorage.getItem("userId")+"_mobiledp"),
          "imagename": $scope
      }*/
  /*   $scope.imageupload = function(){
     var data={"user_id": localStorage.getItem("userId"),"data":localStorage.getItem("mobiledp"), "imagename": " "};
     var parameter = JSON.stringify(data);

  //   alert("ImageUplaoaddata " + data);
   //  alert("Imageupload " + parameter);

     $ionicLoading.show();
    MyServices.updateProfileImage(parameter).
         then(function (data, status, headers) {
            // $scope.status = 'Inserted Data.';
             //$scope.customers.push(parameter);
             $ionicLoading.hide();
             $scope.edit = true;
              var alertPopup = $ionicPopup.alert({
             title: 'Profile Image Update!',
             template: 'Profile Image Update Successfully!'
             });
             // $state.go('welcomeHome');

             },
             function(data, status, header, config) {
              $scope.ResponseDetails = "Data: " + JSON.stringify(data) +
                                     "<hr />status: " + status +
                                     "<hr />headers: " + header +
                                     "<hr />config: " + config;
               //alert("eroror"+$scope.ResponseDetails);
                var alertPopup = $ionicPopup.alert({
                   title: 'Error',
                   template: ''+JSON.stringify(data)
               });
                                      
               });
}*/
  /// Image Upload ////
})

// SpClubCreatedList//

starter.controller('spCreatedClubListCtrl', function ($scope, MyServices, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $ionicActionSheet, $cordovaCamera, $cordovaFile, $ionicPlatform, $filter) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('clubmenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $ionicLoading.show();

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.items = [];
  var data = { "getClubCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("parameter " + parameter);
  MyServices.clubeditlists(parameter).
    then(function (response, status, headers) {
      //alert("service user id " +  localStorage.getItem("userId"));
      //    $scope.items = JSON.stringify(response.data.data);
      /*alert("Res " + response.data);
      alert("Res " + response.data.data);
      alert("Res JSON " + JSON.stringify(response.data.success));
      alert("Res JSON data.data " + JSON.stringify(response.data.data));
      alert("Res JSON data" + JSON.stringify(response.data));*/
      if (response.data.data == null) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">{{"younotcreateclub" | translate}}</p>',
          title: $filter('translate')('sorry')
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        $ionicLoading.hide();
        $scope.items = response.data.data;

      }
      console.log(parameter);

    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  $scope.getspmemberdetails = function (clubID) {
    $state.go("memberlists", { "clubID": clubID });
    console.log($scope.getspmemberdetails);
  }
  $scope.getspclubdetails = function (clubID) {
    $state.go("spclubdetailss", { "clubID": clubID });
    console.log($scope.getspclubdetails);
  }



  // editmatch(item.matchName, item.matchLocation, item.matchTimeHours, item.matchTimeMin, itemdaydate.matchDate, itemdaydate.dayofDate, itemdaydate.sportcenter, item.matchOverview, item.matchID, item.clubID1, item.clubID2, )
  $scope.editClub = function (clubID) {

    $state.go("spEditClub", { "clubID": clubID });
    console.log($scope.editClub);
  }

})

// SpClubCreatedList//

//SPEditClub

starter.controller('spEditClubCtrl', function ($scope, $stateParams, MyServices, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $ionicPlatform, $ionicActionSheet, $cordovaCamera, $cordovaFile, $translate, $filter) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('createeditclubslidermenu.spCreatedClubList');
    e.preventDefault();
  }, 101);
  //  configreload.onallpage();;
  // alert("USer Email " + localStorage.getItem("userEmail"));
  localStorage.setItem("clubeditimage", "");
  //alert("Image Path " + JSON.stringify(localStorage.getItem("mobiledp")));
  $scope.edit = false;
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.clubID = $stateParams.clubID;
  $scope.item = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "id": $scope.clubID }
  var parameter = JSON.stringify(data);
  // alert("Param : ---- " + parameter);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.editclubvalues(parameter).
    then(function (response, status, headers) {
      //    alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.posts = response.data.data;

      $scope.item.clubname = $scope.posts.clubName
      $scope.item.overviewClub = $scope.posts.clubOverview
      $scope.item.clubCountry = $scope.posts.clubCountry
      $scope.item.clubCityArea = $scope.posts.clubCityArea
      $scope.item.clubFounder = $scope.posts.clubFounder
      $scope.item.clubImageUrl = $scope.posts.clubImageUrl
      //  localStorage.setItem("clubeditimage", $scope.posts.clubImageUrl)



      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  //alert("Image Name : " + localStorage.getItem("clubeditimage")); 


  $scope.editClubsubmit = function (editClub) {

    //  alert("Image Name : " + localStorage.getItem("clubeditimage")); 

    $ionicLoading.show();

    var showAlert = function (alertTitle) {
      var alertPopup = $ionicPopup.alert({
        title: $filter('translate')('alert'),
        template: alertTitle,
        buttons: [{
          text: $translate.instant('ok')
        }]
      });

      alertPopup.then(function (res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };



    var validationfun = function () {
      if (localStorage.getItem("clubeditimage") == null) {
        $scope.item.picFile = null;
        showAlert('<p class="text-center">{{"plsuploadimg" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (!$scope.item.clubname) {
        showAlert('<p class="text-center">{{"plsentclunname" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }
      else if (!$scope.item.overviewClub) {
        showAlert('<p class="text-center">{{"plsenterclubovervw" | translate}}</p>')
        $ionicLoading.hide();
        return false;
      }

      return true;
    }

    if (validationfun()) {
      var msgdata = {
        'clubCreatedBy': localStorage.getItem("userId"),
        'clubName': $scope.item.clubname,
        'clubCityArea': $scope.item.clubCityArea,
        'clubCountry': $scope.item.clubCountry,
        'clubFounder': $scope.item.clubFounder,
        'clubStatus': "1",
        'clubOverview': $scope.item.overviewClub,
        'clubID': $scope.clubID,
        'clubImageUrl': localStorage.getItem("clubeditimage"),
        'imagename': ""

      };

      var parameter = JSON.stringify(msgdata);
      //   alert("Para " + parameter);
      console.log("Para " + parameter);
      MyServices.editclubvaluessubmit(parameter).
        then(function (data, status, headers) {
          //    alert(JSON.stringify(data.data));
          if (data.data.nameexists == 'YES') {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"clubnamalreexist" | translate}}</p>',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });

          }
          else if (data.data.nameexists == 'NO') {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('clubeditedd'),
              template: '<p class="text-center">{{"youclubeditedsuccesss" | translate}}</p>',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });
            $state.go('createeditclubslidermenu.spCreatedClubList');

          }
          else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
              buttons: [{
                text: $translate.instant('ok')
              }]
            });
          }

        },
          function (data, status, header, config) {
            var myPopup = $ionicPopup.show({
              title: $filter('translate')('sorry'),
              template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
              scope: $scope,

            });
            $timeout(function () {
              myPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);

          });

    }
  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: $filter('translate')('createclub'),
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }

  $scope.createClub = {};
  var createClubsuccess = function (data, status) {

    //   alert("Data CLub:  " + JSON.stringify(data));
    if (data != "false" || data.success != 0) {
      //  $.jStorage.set("user", data);
      //window.localStorage.setItem("userdataa", JSON.stringify(data));
      //window.localStorage.setItem("userId", JSON.stringify(data.user.id));
      // localStorage.loggedIn = true;
      //  alert("Data " + JSON.stringify(data));
      //  alert("loggedIn " + JSON.stringify(localStorage.loggedIn));
      //  user = data.user;
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">{{"youclubeditedsuccesss" | translate}}</p>',
        title: $filter('translate')('congrats'),
        scope: $scope,

      });
      $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
        //   localStorage.loggedIn = true;
        $state.go('createeditclubslidermenu.spCreatedClubList');
      }, 2000);

    } else {
      var myPopup = $ionicPopup.show({
        title: $filter('translate')('sorry'),
        template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>',
        scope: $scope,

      });
      $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 2000);
    }
    $ionicLoading.hide();
    $scope.createClub = {};
  }




  /** ---------------------------------------------------------------------
         *
         * display alert to choose where to get the image from
         *
         --------------------------------------------------------------------- */
  $scope.images = [];
  $scope.addImage = function () {

    /* var options = {
                  'buttonLabels': ['Take Picture', 'Select From Gallery'],
                  'addCancelButtonWithLabel': 'Cancel'
              };
              window.plugins.actionsheet.show(options, callback);*/
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: $translate.instant('gallery') },
        { text: $translate.instant('camera') }/*,
                 
                   { text: '<img src="img/delete.png">  Remove photo' }*/
      ],
      titleText: $filter('translate')('clubicon'),
      cancelText: $filter('translate')('cancel'),
      buttonClicked: function (index) {
        $scope.showImage(index);
      }
    });
  }
  $scope.showImage = function (type) {
    $scope.hideSheet();
    if (type == 1) {
      navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        quality: 100
      });

      function onSuccess(imageData) {
        //   alert("ImageData" + imageData);
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
        //    alert("imageSrc " + image.src);
        //  localStorage.setItem(localStorage.getItem("userId")+"_mobiledp",imageData);
        localStorage.setItem("clubeditimage", image.src);

        //    alert(imageData);
        //    $scope.imageupload(); 

      }

      function onFail(message) {
        //alert('Failed because: ' + message);
        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('failed'),
          template: '<p class="text-center">{{"failedbecause" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
      }
    }
    else if (type == 0) {
      navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        quality: 100
      });

      function onSuccess(imageData) {
        //   alert("ImageData" + imageData);
        var image = document.getElementById('myImage');
        image.src = "data:image/png;base64," + imageData;
        //   alert("imageSrc " + image.src);
        //  localStorage.setItem(localStorage.getItem("userId")+"_mobiledp",imageData);
        localStorage.setItem("clubeditimage", image.src);
        //    alert(imageData);
        //  $scope.imageupload();
      }

      function onFail(message) {
        //alert('Failed because: ' + message);
        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('failed'),
          template: '<p class="text-center">{{"failedbecause" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
      }
    }

  }
})


//SPEditClub













starter.controller('spClubListCtrl', function ($scope, MyServices, $ionicLoading, $ionicPlatform, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $ionicFilterBar, $filter, $translate, $ionicConfig) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('clubmenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }



  $ionicLoading.show();
  $scope.numberOfItemsToDisplay = 5; // number of item to load each time
  $scope.items = [];
  var data = { "getClubCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("parameter " + parameter);
  MyServices.joinedCluball(parameter).
    then(function (response, status, headers) {
      //alert("service user id " +  localStorage.getItem("userId"));
      //    $scope.items = JSON.stringify(response.data.data);
      /*alert("Res " + response.data);
      alert("Res " + response.data.data);
      alert("Res JSON " + JSON.stringify(response.data.success));
      alert("Res JSON data.data " + JSON.stringify(response.data.data));
      alert("Res JSON data" + JSON.stringify(response.data));*/
      if (response.data.data == null) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">{{"youhavnojoinclubyet" | translate}}</p>',
          title: $filter('translate')('sorry')
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        $ionicLoading.hide();

        $scope.addMoreItem = function (done) {
          // alert("call");
          console.log("add more " + $scope.items.length + " : " + $scope.numberOfItemsToDisplay)
          if ($scope.items.length > $scope.numberOfItemsToDisplay) {
            $scope.numberOfItemsToDisplay += 2; // load 20 more items
            // done(); // need to call this when finish loading more data
          }
          else {

            $scope.noMoreItemsAvailable = true;
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }

        $scope.items = response.data.data;
        $ionicLoading.hide();

      }
      console.log(parameter);

    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  //Filter For MY CLUB

  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };


  //Filter For MY CLUB


  $scope.getspmemberdetails = function (clubID) {
    //   alert("Task Id is "+ clubID);
    //  $location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("memberlists", { "clubID": clubID });
    console.log($scope.getspmemberdetails);
    //$state.go('sentmessagedetails' + id);
  }
  $scope.getspclubdetails = function (clubID) {
    //  alert("Task Id is "+ clubID);
    //  $location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("spclubdetailss", { "clubID": clubID });
    console.log($scope.getspclubdetails);
    //$state.go('sentmessagedetails' + id);
  }
})

starter.controller('spmemberListsDetailsCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.getspmemberdetails

  $scope.clubID = $stateParams.clubID;
  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}

  var data = { "txtHiddenClubID": $scope.clubID }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.membersDetailAll(parameter).
    then(function (response, status, headers) {
      //   alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  $scope.getplayerdetails = function (playerID) {
    $state.go("spplayerdetails", { "playerID": playerID });
    console.log($scope.getplayerdetails);
  }
})

starter.controller('spClubDetailssCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams, $translate) {

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }

  $scope.clubID = $stateParams.clubID;
  $scope.items = {};
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  //{"currentUserID":"102","clubID":"50"}
  var data = { "currentUserID": localStorage.getItem("userId"), "clubID": $scope.clubID, "lang_term": language };
  //   alert("Club ID Is" + data);
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  // alert("Club Detilsss : " + parameter);
  $ionicLoading.show();
  MyServices.clubInYourAreaDetail(parameter).
    then(function (response, status, headers) {
      //      alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.clubBy = response.data.data;
      //   alert("Club Response :::--- : " + JSON.stringify($scope.clubBy));
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      // alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  //Club Follow Click

  $scope.followclubclick = function (clubID) {
    //   alert("Task Id is "+ clubID);
    // $scope.items = []; {"playerID":"81","clubID":"44"}
    //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
    var data = { "playerID": localStorage.getItem("userId"), "clubID": clubID }
    //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
    var parameter = JSON.stringify(data);
    //  alert("Items " + JSON.stringify(response.data.data));
    //  alert(parameter);
    //  $ionicLoading.show();
    $ionicLoading.show();
    MyServices.clubfollowclick(parameter).
      then(function (response, status, headers) {
        //    alert("Status :: " + response.data.data.status);
        if (response.data.data.status != "Follow") {
          $ionicLoading.hide();
          /*var myPopup = $ionicPopup.show({
          template: '<p class="text-center">You are Already Applied on This Club!</p>',
          title: 'Sorry!'
          //scope: $scope,
        });*/
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('congrats'),
            template: '<p class="text-center">{{"successunfollow" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });
          //    $state.go($state.current, {}, {reload: true}); 
          //              $state.reload();
          //    $window.location.reload(true);
          $state.go('spclubdetailss', null, { reload: true });
        }
        else {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            template: '<p class="text-center">{{"successfollowed" | translate}}</p>',
            title: $filter('translate')('congrats'),
            buttons: [{
              text: $translate.instant('ok')
            }]
            //scope: $scope,
          });

          $state.go('spclubdetailss', null, { reload: true });
        }
        /*$timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);*/
        //    alert("items : " + JSON.stringify($scope.items));
        // alert("Items Data.Club ClubArea " + $scope.items);
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });
  }

  //Club Follow Click
})

starter.controller('spMemberApprovalListCtrl', function ($scope, MyServices, $ionicModal, $ionicPlatform, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams, $ionicFilterBar, $translate, $ionicConfig) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('clubmenu');
    e.preventDefault();
  }, 101);


  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }

  /*   $scope.getspmemberdetails

    $scope.clubID = $stateParams.clubID;
    $scope.items = [];  */
  $scope.numberOfItemsToDisplay = 5; // number of item to load each time
  var data = { "getUserID2": localStorage.getItem("userId"), "lang_term": language }
  var parameter = JSON.stringify(data);
  //  alert("Parameter :"+ parameter);
  $ionicLoading.show();
  MyServices.spMembersApprovalDetail(parameter).
    then(function (response, status, headers) {
      //    alert("Items players: " + JSON.stringify(response.data.data.players));
      //  alert("Data.Data " + JSON.stringify(response.data.data.players));
      //  alert("Data " + JSON.stringify(response.data.data.player));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      if (response.data.data.players == null) {
        $ionicLoading.hide();
        /*var myPopup = $ionicPopup.show({
        template: '<p class="text-center">You Don\'t Have Any Player To Approve!</p>',
        title: 'Sorry!'
        });
        $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 3000);*/

        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('sorry'),
          template: '<p class="text-center">{{"youdonplyerapp" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
        alertPopup.then(function (res) {
          $state.go('clubmenu');
          console.log('Thank you for not eating my delicious ice cream cone');
        });

      }
      else {

        $scope.addMoreItem = function (done) {
          // alert("call");
          console.log("add more " + $scope.items.length + " : " + $scope.numberOfItemsToDisplay)
          if ($scope.items.length > $scope.numberOfItemsToDisplay) {
            $scope.numberOfItemsToDisplay += 2; // load 20 more items
            // done(); // need to call this when finish loading more data
          }
          else {

            $scope.noMoreItemsAvailable = true;
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
        $ionicLoading.hide();
        $scope.items = response.data.data.players;


      }

      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  // Filter player List

  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };

  //Filter player List

  // Click For Approve Players

  $scope.getApproveButton = function (getPlayerUserID, getPlayerClubID) {
    // alert("Task Id is "+ clubID);
    // $scope.items = []; 
    //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
    var data = { "getUserID": getPlayerUserID, "clubID": getPlayerClubID }
    //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
    var parameter = JSON.stringify(data);
    //  alert("Items " + JSON.stringify(response.data.data));
    //  $ionicLoading.show();
    $ionicLoading.show();
    //  alert("parameter " + parameter);
    MyServices.clickToApprovePlayer(parameter).
      then(function (response, status, headers) {
        if (response.data.success != 1) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('sorry'),
            template: '<p class="text-center">{{"youralreaapponthiclub" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });
        }
        else {
          $ionicLoading.hide();
          var approvedplayername = response.data.message;
          //     alert("approve msg " + approvedplayername);
          var alertPopup = $ionicPopup.alert({
            template: '<p class="text-center">{{"successapproved" | translate}}</p>',
            title: $filter('translate')('congrats'),
            buttons: [{
              text: $translate.instant('ok')
            }]
          });
          $state.go('spmemberapprovallist', null, { reload: true });
          //     $state.go('spmemberapprovallist',null,{reload:true});  
        }
        /*$timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);*/
        //    alert("items : " + JSON.stringify($scope.items));
        // alert("Items Data.Club ClubArea " + $scope.items);
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });
  }


  // Click For Approve Players

  // Reject click
  //getRejectButton(item.getUserID, item.getClubID);


  $scope.getRejectButton = function (getPlayerUserID, getPlayerClubID) {
    // alert("Task Id is "+ clubID);
    // $scope.items = []; 
    //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
    var data = { "getUserID": getPlayerUserID, "clubID": getPlayerClubID }
    //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
    var parameter = JSON.stringify(data);
    //  alert("Items " + JSON.stringify(response.data.data));
    //  $ionicLoading.show();
    $ionicLoading.show();
    //  alert("parameter " + parameter);
    MyServices.spplayerrejectedclick(parameter).
      then(function (response, status, headers) {
        if (response.data.success != 1) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('sorry'),
            template: '<p class="text-center">{{"youralreaapponthiclub" | translate}}</p>',
            buttons: [{
              text: $translate.instant('ok')
            }]
          });
        }
        else {
          $ionicLoading.hide();
          var approvedplayername = response.data.message;
          //     alert("approve msg " + approvedplayername);
          var alertPopup = $ionicPopup.alert({
            template: '<p class="text-center">{{"rejected" | translate}}</p>',
            title: $filter('translate')('congrats'),
            buttons: [{
              text: $translate.instant('ok')
            }]
          });
          $state.go('spmemberapprovallist', null, { reload: true });
          //     $state.go('spmemberapprovallist',null,{reload:true});  
        }
        /*$timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);*/
        //    alert("items : " + JSON.stringify($scope.items));
        // alert("Items Data.Club ClubArea " + $scope.items);
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });
  }

  // Reject click

})
starter.controller('spMatchSlideMenuCtrl', function ($scope, $ionicModal, $timeout, $rootScope) {

})

starter.controller('spMatchlistMatchCtrl', function ($scope, MyServices, $ionicLoading, $ionicModal, $ionicPopup, $timeout, $rootScope) {
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $ionicLoading.show();
  var data = { "matchCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);

  MyServices.spmatchListall(parameter).
    then(function (response, status, headers) {
      if (response.data.data == null) {
        //   alert("inside Null Values");
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">There Is No Match Near By You!</p>',
          title: 'Sorry!'
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        $ionicLoading.hide();
        $scope.spmatchBy = response.data.data;
        $rootScope.spcountnearby = {
          itemCount: $scope.spmatchBy.length
        }
        //   alert("LEn " + $scope.spmatchBy.itemdaydate.match_detail.length);


      }
      $ionicLoading.hide();
      console.log(parameter);

    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

})

starter.controller('spMatchMyTeamCtrl', function ($scope, MyServices, $state, $ionicLoading, $ionicModal, $ionicPopup, $timeout, $rootScope) {
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $ionicLoading.show();
  var data = { "matchCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);

  MyServices.spMatchListForMyTeam(parameter).
    then(function (response, status, headers) {
      if (response.data.data == null) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">There Is No Team !</p>',
          title: 'Sorry!'
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        //  alert("Data.Data " + JSON.stringify(response.data.data));
        $ionicLoading.hide();
        $scope.matchBy = response.data.data;
        $rootScope.countnearby = {
          itemCount: $scope.matchBy[0].length
        }
      }
      $ionicLoading.hide();
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  //Click For Create Team 

  $scope.createteam = function (matchID, matchClubID) {
    //       alert("matchID Id is "+ matchID);
    //       alert("matchClubID Id is "+ matchClubID);

    $state.go("spmatchmyteamlist", { "matchID": matchID, "matchClubID": matchClubID });
    console.log($scope.createteam);
  }

  // var data={"currentUserID": localStorage.getItem("userId"), "matchID":matchID, "clubID":matchClubID}


})

starter.controller('spMatchMyTeamListCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {
  $scope.team = {};
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
    }
  }
  $scope.createteam

  $scope.matchID = $stateParams.matchID;
  $scope.matchClubID = $stateParams.matchClubID;
  // alert("MatchClubId " + $scope.matchClubID);

  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId"), "matchID": $scope.matchID, "clubID": $scope.matchClubID, "lang_term": language }
  var parameter = JSON.stringify(data);
  //  alert("Parameter " + parameter);
  $ionicLoading.show();

  MyServices.clickToCreateTeam(parameter).
    then(function (response, status, headers) {
      //      alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data.Data " + response.data.data[0].teamName);
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      //   $scope.spmatchBy = response.data.data.length;
      $scope.spmatchBy = response.data.data;
      //  alert($scope.spmatchBy.player_list);
      /* if(response.data.data.player_list == "Approve"){*/
      /*  $scope.addButton = function() {
         alert("button clicked");
         var btnhtml = '<button type="button" ng-click="addButton()">{{inneritem.Approve}}</button>';
         angular.element(document.getElementById('foo')).append((btnhtml));
       }
*/
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      /*}else{
        $ionicLoading.hide();
      }*/
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  /*
                $scope.getApproveButton = function (playerID, clubID, matchID) {
                $state.go("spplayerdetails", {"playerID":playerID, "clubID":clubID, "matchID":matchID});
                console.log($scope.getplayerdetails);
              }*/

  //Approve, Approved, Reject Click


  $scope.getApproveButton = function (getUserID, clubID, matchID) {
    // alert("Task Id is "+ clubID);
    // $scope.items = []; 
    //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
    var data = { "playerID": getUserID, "clubID": clubID, "matchID": matchID }
    //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
    var parameter = JSON.stringify(data);
    //   alert(parameter);
    //  $ionicLoading.show();
    $ionicLoading.show();
    MyServices.spplayerapproverejectclick(parameter).
      then(function (response, status, headers) {
        //       alert("Status " + response.data.data.status);
        if (response.data.status != "Approved") {
          $ionicLoading.hide();
          /*var myPopup = $ionicPopup.show({
          template: '<p class="text-center">You are Already Applied on This Club!</p>',
          title: 'Sorry!'
          //scope: $scope,
        });*/
          var alertPopup = $ionicPopup.alert({
            title: 'Sorry!',
            template: 'You are Rejected'
          });
          $state.go('spmatchmyteamlist', null, { reload: true });
          //    $state.go($state.current, {}, {reload: true}); 
          //              $state.reload();
          //    $window.location.reload(true);
          //   $state.go('clubslidermenu.clubinyourarea',null,{reload:true});
        }
        else {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            template: '<p class="text-center">You are Successfully Approved</p>',
            title: 'Congrats!'
            //scope: $scope,
          });

          $state.go('spmatchmyteamlist', null, { reload: true });
        }
        /*$timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);*/
        //    alert("items : " + JSON.stringify($scope.items));
        // alert("Items Data.Club ClubArea " + $scope.items);
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });
  }

  //Approve, Approved, Reject Click

  //159 Submit Team Name 

  $scope.createTeamNamesubmit = function (matchID, clubID) {

    // alert("team nm " + $scope.team.teamname);
    $ionicLoading.show();


    $scope.allvalidation = [{
      field: $scope.team.teamname,
      validation: ""
    }];
    var check = formvalidation($scope.allvalidation);
    //  alert(check);
    // alert("Country " + $scope.countries[0]);
    //  alert("Country " + $scope.createClub.clubCountry);
    //  alert("Image Path " + JSON.stringify(localStorage.getItem("mobiledp")));
    if (check) {
      var msgdata = {
        'currentUserID': localStorage.getItem("userId"),
        'teamCreatedBy': localStorage.getItem("userId"),
        'matchID': matchID,
        'clubID': clubID,
        'teamName': $scope.team.teamname
      };
      var parameter = JSON.stringify(msgdata);
      //   alert(parameter);
      MyServices.spCreateTeamBTN(parameter).
        then(function (data, status, headers) {
          //   alert(data.data.status);
          if (data.data.status == "ApprovalPending") {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Sorry',
              template: 'Your Team Must Have Minimum 1 Or Maximum 11 Players To Get Approved !'
            });
            //    $state.go('spmatchcreateteamlist',null,{reload:true});  
          }
          else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Team Created!',
              template: 'Your Team Created Successfully!'
            });
            $state.go('spmatchmyteamlist', null, { reload: true });


          }
        },
          function (data, status, header, config) {
            /* $scope.ResponseDetails = "Data: " + data +
                                    "<hr />status: " + status +
                                    "<hr />headers: " + header +
                                    "<hr />config: " + config;
                                     alert("eroror"+$scope.ResponseDetails);*/
            var myPopup = $ionicPopup.show({
              template: '<p class="text-center">Something Went Worng</p>',
              title: 'Oops!',
              scope: $scope,

            });
            $timeout(function () {
              myPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);

          });

    } else {
      msgforall("Fill all data");
      $ionicLoading.hide();
    }
  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: 'Create Team',
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }


  // Submit Team Name 


})



starter.controller('spMatchCreateTeamCtrl', function ($scope, MyServices, $state, $ionicLoading, $ionicModal, $ionicPopup, $timeout, $rootScope) {
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $ionicLoading.show();
  var data = { "matchCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);

  MyServices.spMatchListForCreateTeam(parameter).
    then(function (response, status, headers) {
      if (response.data.data == null) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">There Is No Match!</p>',
          title: 'Sorry!'
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        //  alert("Data.Data " + JSON.stringify(response.data.data));
        $ionicLoading.hide();
        $scope.matchBy = response.data.data;
        $rootScope.countnearby = {
          itemCount: $scope.matchBy[0].length
        }
      }
      $ionicLoading.hide();
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  //Click For Create Team 

  $scope.createteam = function (matchID, matchClubID) {
    //       alert("matchID Id is "+ matchID);
    //       alert("matchClubID Id is "+ matchClubID);

    $state.go("spmatchcreateteamlist", { "matchID": matchID, "matchClubID": matchClubID });
    console.log($scope.createteam);
  }

  // var data={"currentUserID": localStorage.getItem("userId"), "matchID":matchID, "clubID":matchClubID}


})




starter.controller('spMatchCreateTeamListCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {
  $scope.team = {};
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.createteam

  $scope.matchID = $stateParams.matchID;
  $scope.matchClubID = $stateParams.matchClubID;
  // alert("MatchClubId " + $scope.matchClubID);

  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId"), "matchID": $scope.matchID, "clubID": $scope.matchClubID }
  var parameter = JSON.stringify(data);
  //  alert("Parameter " + parameter);
  $ionicLoading.show();

  MyServices.clickToCreateTeam(parameter).
    then(function (response, status, headers) {
      //      alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data.Data " + response.data.data[0].teamName);
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      //   $scope.spmatchBy = response.data.data.length;
      $scope.spmatchBy = response.data.data;
      //  alert($scope.spmatchBy.player_list);
      /* if(response.data.data.player_list == "Approve"){*/
      /*  $scope.addButton = function() {
         alert("button clicked");
         var btnhtml = '<button type="button" ng-click="addButton()">{{inneritem.Approve}}</button>';
         angular.element(document.getElementById('foo')).append((btnhtml));
       }
*/
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      /*}else{
        $ionicLoading.hide();
      }*/
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  /*
                $scope.getApproveButton = function (playerID, clubID, matchID) {
                $state.go("spplayerdetails", {"playerID":playerID, "clubID":clubID, "matchID":matchID});
                console.log($scope.getplayerdetails);
              }*/

  //Approve, Approved, Reject Click


  $scope.getApproveButton = function (getUserID, clubID, matchID) {
    // alert("Task Id is "+ clubID);
    // $scope.items = []; 
    //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
    var data = { "playerID": getUserID, "clubID": clubID, "matchID": matchID }
    //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
    var parameter = JSON.stringify(data);
    //   alert(parameter);
    //  $ionicLoading.show();
    $ionicLoading.show();
    MyServices.spplayerapproverejectclick(parameter).
      then(function (response, status, headers) {
        //       alert("Status " + response.data.data.status);
        if (response.data.status != "Approved") {
          $ionicLoading.hide();
          /*var myPopup = $ionicPopup.show({
          template: '<p class="text-center">You are Already Applied on This Club!</p>',
          title: 'Sorry!'
          //scope: $scope,
        });*/
          var alertPopup = $ionicPopup.alert({
            title: 'Sorry!',
            template: 'You are Rejected'
          });
          $state.go('spmatchcreateteamlist', null, { reload: true });
          //    $state.go($state.current, {}, {reload: true}); 
          //              $state.reload();
          //    $window.location.reload(true);
          //   $state.go('clubslidermenu.clubinyourarea',null,{reload:true});
        }
        else {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            template: '<p class="text-center">You are Successfully Approved</p>',
            title: 'Congrats!'
            //scope: $scope,
          });

          $state.go('spmatchcreateteamlist', null, { reload: true });
        }
        /*$timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);*/
        //    alert("items : " + JSON.stringify($scope.items));
        // alert("Items Data.Club ClubArea " + $scope.items);
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });
  }

  //Approve, Approved, Reject Click

  //159 Submit Team Name 

  $scope.createTeamNamesubmit = function (matchID, clubID) {

    // alert("team nm " + $scope.team.teamname);
    $ionicLoading.show();


    $scope.allvalidation = [{
      field: $scope.team.teamname,
      validation: ""
    }];
    var check = formvalidation($scope.allvalidation);
    //  alert(check);
    // alert("Country " + $scope.countries[0]);
    //  alert("Country " + $scope.createClub.clubCountry);
    //  alert("Image Path " + JSON.stringify(localStorage.getItem("mobiledp")));
    if (check) {
      var msgdata = {
        'currentUserID': localStorage.getItem("userId"),
        'teamCreatedBy': localStorage.getItem("userId"),
        'matchID': matchID,
        'clubID': clubID,
        'teamName': $scope.team.teamname
      };
      var parameter = JSON.stringify(msgdata);
      //   alert(parameter);
      MyServices.spCreateTeamBTN(parameter).
        then(function (data, status, headers) {
          //   alert(data.data.status);
          if (data.data.status == "ApprovalPending") {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Sorry',
              template: 'Your Team Must Have Minimum 1 Or Maximum 11 Players To Get Approved !'
            });
            //    $state.go('spmatchcreateteamlist',null,{reload:true});  
          }
          else {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
              title: 'Team Created!',
              template: 'Your Team Created Successfully!'
            });
            $state.go('spmatchcreateteamlist', null, { reload: true });


          }
        },
          function (data, status, header, config) {
            /* $scope.ResponseDetails = "Data: " + data +
                                    "<hr />status: " + status +
                                    "<hr />headers: " + header +
                                    "<hr />config: " + config;
                                     alert("eroror"+$scope.ResponseDetails);*/
            var myPopup = $ionicPopup.show({
              template: '<p class="text-center">Something Went Worng</p>',
              title: 'Oops!',
              scope: $scope,

            });
            $timeout(function () {
              myPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);

          });

    } else {
      msgforall("Fill all data");
      $ionicLoading.hide();
    }
  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: 'Create Team',
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }


  // Submit Team Name 


})


starter.controller('spMyFollowersCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $timeout, $location, $ionicLoading, $state) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('supervisormenuslider.supervisormenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.myFollowers(parameter).
    then(function (response, status, headers) {
      //    alert("Data.Data " + JSON.stringify(response.data.data));
      // alert("Data [0] " + JSON.stringify(response.data.data[0]));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  $scope.getplayerdetails = function (playerID) {
    $state.go("spplayerdetails", { "playerID": playerID });
    //     alert("player ID " + playerID);
    console.log($scope.getspplayerdetails);
  }

})


starter.controller('spPlayerDetailsCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.getplayerdetails

  $scope.playerID = $stateParams.playerID;
  //  alert("PLayer Id " + $scope.playerID);
  $scope.items = [];
  $scope.posts = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")
  var data = { "currentUserID": localStorage.getItem("userId"), "playerID": $scope.playerID }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  //888
  MyServices.payerDetails(parameter).
    then(function (response, status, headers) {
      //  alert("ResponJsonStr " + JSON.stringify(response.data.data));
      /// alert("ResponJsonStr[0] " + JSON.stringify(response.data.data[0]));
      //   alert("Respfirst " + $scope.posts);
      $scope.posts = response.data.data;
      $scope.getAvtar = $scope.posts.getAvtar
      $scope.status = $scope.posts.status
      $scope.first_name = $scope.posts.first_name
      $scope.last_name = $scope.posts.last_name
      $scope.Country = $scope.posts.Country
      $scope.City = $scope.posts.City
      $scope.Nationality = $scope.posts.Nationality
      $scope.Date_of_Birth = $scope.posts.Date_of_Birth
      $scope.favouriteClubName = $scope.posts.favouriteClubName
      $scope.Member_favourite_position = $scope.posts.Member_favourite_position
      $scope.Member_description = $scope.posts.Member_description
      $scope.Member_condition = $scope.posts.Member_condition
      $ionicLoading.hide();
    },
      function (data, status, header, config) {
        //   alert("Invalid Email Address or password");  

      });

  //Follow Click

  $scope.followclick = function (playerID) {
    // alert("Task Id is "+ clubID);
    // $scope.items = []; 
    //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
    var data = { "currentUserID": localStorage.getItem("userId"), "playerID": playerID }
    //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
    var parameter = JSON.stringify(data);
    //  alert("Items " + JSON.stringify(response.data.data));
    //  $ionicLoading.show();
    $ionicLoading.show();
    MyServices.followclickforfollow(parameter).
      then(function (response, status, headers) {
        //     alert("Status " + response.data.data.status);
        if (response.data.data.status != "Follow") {
          $ionicLoading.hide();
          /*var myPopup = $ionicPopup.show({
          template: '<p class="text-center">You are Already Applied on This Club!</p>',
          title: 'Sorry!'
          //scope: $scope,
        });*/
          var alertPopup = $ionicPopup.alert({
            title: 'Congrats!',
            template: 'Successfully Unfollowed'
          });
          //    $state.go($state.current, {}, {reload: true}); 
          //              $state.reload();
          //    $window.location.reload(true);
          $state.go('spplayerdetails', null, { reload: true });
        }
        else {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            template: '<p class="text-center">Successfully Followed</p>',
            title: 'Congrats!'
            //scope: $scope,
          });

          $state.go('spplayerdetails', null, { reload: true });
        }
        /*$timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);*/
        //    alert("items : " + JSON.stringify($scope.items));
        // alert("Items Data.Club ClubArea " + $scope.items);
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });
  }

  //Follow Click

})

starter.controller('spMatchStatisticsCtrl', function ($scope, MyServices, $translate, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $ionicPlatform) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }

  $scope.items = [];
  $scope.numberOfItemsToDisplay = 5; // number of item to load each time
  var data = { "matchCreatedBy": localStorage.getItem("userId"), "lang_term": language }
  var parameter = JSON.stringify(data);
  // alert("Param:::--- " + parameter);

  $ionicLoading.show();
  MyServices.spmatchstats(parameter).
    then(function (response, status, headers) {
      //       alert("items : " + JSON.stringify(response.data.data[0]));
      //      alert("items : " + JSON.stringify(response.data.data));
      //     alert("items : " + JSON.stringify(response.data.data.match_detail));
      //  alert("Items Data.Club ClubArea " + response.data.data);
      if (response.data.data == null) {
        $ionicLoading.hide();
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('sorry'),
          template: '<p class="text-center">{{"nomatchavail" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
        alertPopup.then(function (res) {
          $state.go('menuslider.menu');
          console.log('Thank you for not eating my delicious ice cream cone');
        });

      }
      else {
        $ionicLoading.hide();

        $scope.addMoreItem = function (done) {
          // alert("call");
          console.log("add more " + $scope.matchBy.length + " : " + $scope.numberOfItemsToDisplay)
          if ($scope.matchBy.length > $scope.numberOfItemsToDisplay) {
            $scope.numberOfItemsToDisplay += 2; // load 20 more items
            // done(); // need to call this when finish loading more data
          }
          else {

            $scope.noMoreItemsAvailable = true;
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }

        $scope.matchBy = response.data.data;
        $ionicLoading.hide();
      }
      /*$timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);*/
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      })

  $scope.getPlayedMatchDetails = function (matchID) {
    //        alert("Match Id is "+ matchID);
    //  $location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("spoverviewslidermenu.spmatchoverview", { "matchID": matchID });
    console.log($scope.getPlayedMatchDetails);
    //$state.go('sentmessagedetails' + id);
  }
})

starter.controller('spOverviewMenuSlideCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state) {

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }
})

starter.controller('spMatchOverviewCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    /* $scope.item.language='en';
      $translate.use("en");*/
    language = "en";
  }
  else {
    if (language == "en") {
      /*$scope.item.language='en';
       $translate.use("en");*/
      language = "en";
    }
    else {
      /*$scope.item.language='ar';
       $translate.use("ar");*/
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }

  $scope.getPlayedMatchDetails
  $scope.matchID = $stateParams.matchID;
  //  alert("Match ID " + $scope.matchID);
  window.localStorage.setItem("matchid", $scope.matchID);
  $scope.item = {};
  //  {"matchID":"9","currentUserID":"11"}
  var data = { "matchID": $scope.matchID, "lang_term": language }
  var parameter = JSON.stringify(data);
  //  alert("parameter " + parameter);  
  $ionicLoading.show();
  /*var cityId = $scope.item.citydata;
      var cityName = $.grep($scope.citycategories, function (catcity) {
                return catcity.city_id == cityId;
             })[0].city_name;*/

  MyServices.playedMatchOverview(parameter).
    then(function (response, status, headers) {
      //   alert("ResponJsonStr " + JSON.stringify(response.data.data));
      //   alert("ResponJsonStr[0] " + JSON.stringify(response.data.data.matchdetail[0]));
      //  alert("Respfirst " + $scope.posts);
      $scope.posts = response.data.data.matchdetail[0];
      //       alert("Resp " + $scope.posts);
      $scope.item.matchName = $scope.posts.matchName
      $scope.item.sportcenterName = $scope.posts.sportcenterName
      $scope.item.display_name = $scope.posts.display_name
      $scope.item.clubImageUrl1 = $scope.posts.clubImageUrl1
      $scope.item.clubName1 = $scope.posts.clubName1
      $scope.item.clubID1status = $scope.posts.clubID1status
                          /*alert("first_name " + $scope.item.first_name);
                          alert("POstsfirst_name " + $scope.posts.first_name);
*/                        $scope.item.clubImageUrl2 = $scope.posts.clubImageUrl2
      $scope.item.clubName2 = $scope.posts.clubName2
      $scope.item.clubID2status = $scope.posts.clubID2status
      $scope.item.matchOverview = $scope.posts.matchOverview
      $scope.item.matchTime = $scope.posts.matchTime
      $scope.item.matchDate = $scope.posts.matchDate
      $scope.item.dayofDate = $scope.posts.dayofDate
      $scope.item.matchLocation = $scope.posts.matchLocation
      $ionicLoading.hide();

      //alert("succ " + $scope.posts.isActive);
    },
      function (data, status, header, config) {
        //alert("Invalid Email Address or password");  

      });

})


starter.controller('spMatchPlayersCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {
  //alert("Match " + );

  $scope.group = {};
  $scope.group2 = {};
  /*for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: [],
      show: false
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
  */
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {
    language = "en";
  }
  else {
    if (language == "en") {
      language = "en";
    }
    else {
      language = "ar";
      $scope.myClass = "rtlcontent";
    }
  }
  //  $scope.getPlayedMatchDetails
  $scope.matchID = window.localStorage.getItem("matchid");
  //    alert("Match ID " + $scope.matchID);
  //  $scope.item = {};
  $scope.items = {};
  $scope.group2.items = {};
  //  {"matchID":"9","currentUserID":"11"}
  var data = { "matchID": $scope.matchID, "lang_term": language }
  var parameter = JSON.stringify(data);
  //  alert("parameter " + parameter);  
  $ionicLoading.show();
  /*var cityId = $scope.item.citydata;
      var cityName = $.grep($scope.citycategories, function (catcity) {
                return catcity.city_id == cityId;
             })[0].city_name;*/

  MyServices.playedMatchOverview(parameter).
    then(function (response, status, headers) {
      //   alert("ResponJsonStr " + JSON.stringify(response.data.data));
      //  alert("ResponJsonStr[0] Club1 Player:-- " + JSON.stringify(response.data.data.club1Players));
      //   alert("Respfirst " + $scope.posts);
      $scope.posts = response.data.data.matchdetail[0];
      //       alert("Resp " + $scope.posts);
      $scope.group.clubImageUrl1 = $scope.posts.clubImageUrl1
      $scope.group.clubName1 = $scope.posts.clubName1
      $scope.items = response.data.data.club1Players;
                       //   alert("Club1 PLayers " + $scope.items);
                        //  alert("Club1 Players JSOnStr " + JSON.stringify(response.data.data.club1Players));
                         /* $scope.item.avatar=$scope.post.avatar
                          $scope.item.Name=$scope.post.Name*/
                          /*alert("first_name " + $scope.item.first_name);
                          alert("POstsfirst_name " + $scope.posts.first_name);
*/              $scope.group2.clubImageUrl2 = $scope.posts.clubImageUrl2
      $scope.group2.clubName2 = $scope.posts.clubName2
      $scope.group2.items = response.data.data.club2Players;
      //   alert("Club222 PLayers " + $scope.items);
      //    alert("Club222 Players JSOnStr " + JSON.stringify(response.data.data.club2Players));
      /* $scope.item.avatar=$scope.post.avatar
       /*$scope.item.avatar=$scope.post.avatar
       $scope.item.Name=$scope.post.Name*/



      $ionicLoading.hide();

      //alert("succ " + $scope.posts.isActive);
    },
      function (data, status, header, config) {
        //alert("Invalid Email Address or password");  

      });



  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function (group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function (group) {
    return group.show;
  };

  $scope.toggleGroup = function (group2) {
    group2.show = !group2.show;
  };
  $scope.isGroupShown = function (group2) {
    return group2.show;
  };
})

starter.controller('spSportsCenterCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $timeout, $location, $ionicLoading, $state) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('supervisormenuslider.supervisormenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };



  $scope.items = [];
  $ionicLoading.show();
  MyServices.scportcenter().
    then(function (response, status, headers) {

      //   alert("success " + JSON.stringify(response.data.data));
      //   alert("Details " + response.data.data);
      $scope.items = response.data.data;
      //   $scope.items = response.data.data;
      $ionicLoading.hide();

      //   alert("Details " + JSON.stringify($scope.items));
      //  $scope.description = $sce.trustAsHtml($scope.posts.khalijiPROName);
      //  $scope.content.content = $sce.trustAsHtml($scope.content.content);
    },
      function (data, status, header, config) {
        $scope.errorData = response.data.data;
        //     alert("error " + JSON.stringify(response.data.data));


      })

})


starter.controller('spSettingsCtrl', function ($scope, $rootScope, $cordovaSocialSharing, MyServices, $ionicActionSheet, $state, $ionicLoading, $window, $ionicHistory, $ionicModal, $ionicPlatform) {


  $scope.shareArticle = function () {
    $cordovaSocialSharing.share("KhalijiPro Message", "This is your subject", null, "http://www.khalijipro.com/");
  }

  $scope.logout = function () {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Logout And Exit',
      titleText: 'Are you sure you want to logout and exit? This app is awsome so I recommend you to stay.',
      cancelText: 'Cancel',
      cancel: function () { },
      buttonClicked: function (index) {
        return true;

      },
      destructiveButtonClicked: function () {
        $ionicLoading.show({
          template: 'Logging out...'
        });
        //facebook logout
        /* facebookConnectPlugin.logout(function(){
           $ionicLoading.hide();
         },
         function(fail){
           $ionicLoading.hide();
         });*/
        // ionic.Platform.exitApp();
        delete $window.localStorage.getItem("userId");
        window.localStorage.clear();
        localStorage.loggedIn = undefined;
        localStorage.setItem("introscreens", true);
        //  alert("introscreens Is = " + localStorage.getItem("introscreens"));
        //  alert("UserID Logged = " + localStorage.loggedIn);
        navigator.app.exitApp();
      }
    });
  };
})

starter.controller('spMessageSlideCtrl', function ($scope, $ionicModal, $timeout) {


})

starter.controller('spInboxmessageSlideCtrl', function ($scope, MyServices, $ionicPlatform, $location, $ionicModal, $ionicPopup, $ionicLoading, $state, $timeout) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('supervisormenuslider.supervisormenu');
    e.preventDefault();
  }, 101);

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.items = [];
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.inboxmessageListall(parameter).
    then(function (response, status, headers) {
      //    alert("Items " + JSON.stringify(response.data.data));
      //    alert("Items " + JSON.stringify(response.data.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      if (response.data.success != 1) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">You Have No Message!</p>',
          title: 'Sorry!'
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        $ionicLoading.hide();
        $scope.items = response.data.data[0];
        //  window.localStorage.setItem("UserMessageId", JSON.stringify(response.data.data.messageID));
      }


      //  alert("items : " + JSON.stringify($scope.items));
      //  alert("Items Data.Club ClubArea " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  $scope.getinboxmessagedetails = function (messageChatID) {
    //        alert("Chat ID is "+ messageChatID);
    //  $location.url("messageslidermenu.inboxmessagedetails" + messageID);
    $state.go("spinboxmessagedetails", { "messageChatID": messageChatID });
    console.log($scope.getinboxmessagedetails);
    //$state.go('sentmessagedetails' + id);
  }

})

starter.controller('spInboxMessageDetailsCtrl', function ($scope, MyServices, $stateParams, $ionicPlatform, $ionicLoading, $state, $ionicModal, $timeout) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('spmessageslidermenu.spinboxmessage');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  // MyServices.find($stateParams.movieid, function(movie)
  $scope.messageChatID = $stateParams.messageChatID;
  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId"), "messageChatID": $scope.messageChatID }
  //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.inboxmessageDetail(parameter).
    then(function (response, status, headers) {
      //      alert("Data.Data " + JSON.stringify(response.data.data));
      //           alert("Data " + JSON.stringify(response.data));
      //           alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      $ionicLoading.hide();
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      //    alert("items : " + JSON.stringify($scope.items));
      // alert("Items Data.Club ClubArea " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  $scope.getinboxmessagechtid = function (messageChatID) {
    //      alert("getinboxmessagechtid ID is "+ messageChatID);
    //  $location.url("messageslidermenu.inboxmessagedetails" + messageID);
    $state.go("spmessagereplay", { "messageChatID": messageChatID });
    console.log($scope.getinboxmessagechtid);
    //$state.go('sentmessagedetails' + id);
  }

})

// Message Replay
starter.controller('spMessageReplayCtrl', function ($scope, MyServices, $stateParams, $ionicPopup, $ionicPlatform, $ionicLoading, $state, $ionicModal, $timeout, $location) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('spmessageslidermenu.spinboxmessage');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  // MyServices.find($stateParams.movieid, function(movie)
  //  $scope.getinboxmessagechtid

  //  alert("getinbox " + JSON.stringify($scope.getinboxmessagechtid));
  $scope.messageChatID = $stateParams.messageChatID;
  //   alert("MEssagae StatePAram ChatID " + $stateParams.messageChatID);
  //  alert("MEssagaeChatID " + $scope.messageChatID);
  localStorage.setItem("messagechatid", $scope.messageChatID);
  //  alert("Messagechatid MessachatScope " + $scope.messageChatID);
  // alert("Messagechatid emnem " + $stateParams.messageChatID);
  //  alert("Messagechatid " + window.localStorage.getItem("messagechatid"));
  //123abcd
  //$scope.items = [];  
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  //  var data={"currentUserID": localStorage.getItem("userId"), "messageChatID":$scope.messageChatID}
  //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
  //  var parameter=JSON.stringify(data);   
  //  alert("Items " + JSON.stringify(response.data.data));

  $scope.message = {};
  var messagesuccess = function (data, status) {


    if (data != "false") {
      //  $.jStorage.set("user", data);
      //  window.localStorage.setItem("userdataa", JSON.stringify(data));
      //  alert("Data Replay " + JSON.stringify(data));
      //  user = data.user;
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">Replay To Mail Sent Successfully!</p>',
        title: 'Congrats!',
        scope: $scope,

      });
      $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
        $state.go('spmessageslidermenu.spinboxmessage');
      }, 3000);

    } else {
      $scope.showPopupsignupfailure();
    }
    $ionicLoading.hide();
    $scope.message = {};
  }

  // **** For SIGN UP FORM *** //



  $scope.messageReplaysubmit = function (message) {

    $ionicLoading.show();


    $scope.allvalidation = [{
      field: $scope.message.description,
      validation: ""
    }
    ];
    var check = formvalidation($scope.allvalidation);
    if (check) {
      MyServices.messagefn($scope.message, messagesuccess, function (err) {
        //    $location.url('offline');
      });
    } else {
      msgforall("Please Fill All Data");
      $ionicLoading.hide();
    }

  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: 'Message Replay',
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }
  // popup
  $scope.showPopupsignupsuccess = function () {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Successfully registered!</p>',
      title: 'Congrats!',
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };
  $scope.showPopupsignupfailure = function () {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">There Was Some Problem While Sending Mail</p>',
      title: 'Oops!',
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };

})
// Message Replay

starter.controller('spSentmessageSlideCtrl', function ($scope, MyServices, $location, $state, $ionicLoading, $ionicPopup, $timeout) {

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.items = [];
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.sentmessageListall(parameter).
    then(function (response, status, headers) {

      //    alert("Items " + JSON.stringify(response.data.data));
      //    alert("Items " + JSON.stringify(response.data.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      if (response.data.success != 1) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">You Have No Message!</p>',
          title: 'Sorry!'
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
      }
      else {
        $ionicLoading.hide();
        $scope.items = response.data.data[0];
      }

      //   window.localStorage.setItem("UserMessageId", JSON.stringify(response.data.data.messageID));
      $ionicLoading.hide();
      //  alert("items : " + JSON.stringify($scope.items));
      //  alert("Items Data.Club ClubArea " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  $scope.getsentmessagedetails = function (messageID) {
    //      alert("Task Id is "+ messageID);
    //  $location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("spsentmessagedetails", { "messageID": messageID });
    console.log($scope.getsentmessagedetails);
    //$state.go('sentmessagedetails' + id);
  }

})

starter.controller('spSentMessageDetailsCtrl', function ($scope, MyServices, $stateParams, $ionicLoading, $ionicModal, $timeout) {
  // MyServices.find($stateParams.movieid, function(movie)
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.messageID = $stateParams.messageID;
  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId"), "messageID": $scope.messageID }
  //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.sentmessageDetail(parameter).
    then(function (response, status, headers) {
      // alert("Data.Data " + JSON.stringify(response.data.data));
      // alert("Data " + JSON.stringify(response.data));
      // alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      // alert("Items Data.Club ClubArea " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

})

starter.controller('spTopClubsCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $timeout, $location, $ionicLoading, $state) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('supervisormenuslider.supervisormenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  //     var data={"currentUserID":localStorage.getItem("userId")} 
  //   var parameter=JSON.stringify(data);   
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.topClubsDetials().
    then(function (response, status, headers) {
      //   alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      //    console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

})

starter.controller('spTopOrganizerCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $timeout, $location, $ionicLoading, $state) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('supervisormenuslider.supervisormenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.topOrganizerDetials(parameter).
    then(function (response, status, headers) {
      // alert("Data.Data " + JSON.stringify(response.data.data));
      // alert("Data [0] " + JSON.stringify(response.data.data[0]));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

})

starter.controller('spTopPlayersCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $ionicPopup, $timeout, $location, $ionicLoading, $state) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('supervisormenuslider.supervisormenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.topPlayersDetials(parameter).
    then(function (response, status, headers) {
      //   alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      if (response.data.data == null) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">No Top Players!</p>',
          title: 'Sorry!'
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        $ionicLoading.hide();
        $scope.items = response.data.data;
      }

      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

})

starter.controller('spAwardsCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $ionicPopup, $timeout, $location, $ionicLoading, $state) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('supervisormenuslider.supervisormenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.awardsDetails(parameter).
    then(function (response, status, headers) {
      //    alert("Data.Data " + JSON.stringify(response.data.data));
      //  alert("Data [0] " + JSON.stringify(response.data.data[0]));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);

      if (response.data.data == null) {
        $ionicLoading.hide();

        var alertPopup = $ionicPopup.alert({
          template: '<p class="text-center">You Have Achieved No Awards Keep Playing Hard!</p>',
          title: 'Sorry!'
          //scope: $scope,
        });

        /* var myPopup = $ionicPopup.show({
         template: '<p class="text-center">No Awards!</p>',
         title: 'Sorry!'
         });
         $timeout(function () {
         myPopup.close(); //close the popup after 3 seconds for some reason
       }, 3000);*/

      }
      else {
        $ionicLoading.hide();
        $scope.items = response.data.data;
      }
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

})

starter.controller('spcontactToAdminCtrl', function ($scope, MyServices, $ionicPlatform, $filter, $timeout, $location, $ionicLoading, $state, $ionicPopup) {


  /*  $ionicHistory.clearCache();
    $window.location.href= "#menuslider.menu";
*/
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('supervisormenuslider.supervisormenu');
    e.preventDefault();
  }, 101);
  // **** For SIGN UP FORM *** //

  $scope.contacttoadmin = {};
  var contacttoadminsuccess = function (data, status) {


    if (data != "false") {
      //  $.jStorage.set("user", data);
      //  window.localStorage.setItem("userdataa", JSON.stringify(data));
      //  alert("Data " + JSON.stringify(data));
      //  user = data.user;
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">Mail Sent Successfully!</p>',
        title: 'Congrats!',
        scope: $scope,

      });
      $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
        $state.go('supervisormenuslider.supervisormenu');
      }, 3000);

    } else {
      $scope.showPopupsignupfailure();
    }
    $ionicLoading.hide();
    $scope.contacttoadmin = {};
  }

  // **** For SIGN UP FORM *** //



  $scope.sendmailsubmit = function (contacttoadmin) {
    $ionicLoading.show();


    $scope.allvalidation = [{
      field: $scope.contacttoadmin.name,
      validation: ""
    }, {
      field: $scope.contacttoadmin.subject,
      validation: ""
    }, {
      field: $scope.contacttoadmin.email,
      validation: ""
    }, {
      field: $scope.contacttoadmin.description,
      validation: ""
    }
    ];
    var check = formvalidation($scope.allvalidation);
    if (check) {
      MyServices.contacttoadmin($scope.contacttoadmin, contacttoadminsuccess, function (err) {
        //    $location.url('offline');
      });
    } else {
      msgforall("Please Fill All Data");
      $ionicLoading.hide();
    }

  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: 'Contact To Admin',
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }
  // popup
  $scope.showPopupsignupsuccess = function () {

    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">Successfully registered!</p>',
      title: 'Congrats!',
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };
  $scope.showPopupsignupfailure = function () {
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">There Was Some Problem While Sending Mail</p>',
      title: 'Oops!',
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);
  };



})

starter.controller('spPartnersAdvCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $timeout, $location, $ionicLoading, $state) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('supervisormenuslider.supervisormenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.items = [];
  $ionicLoading.show();
  MyServices.partnersadv().
    then(function (response, status, headers) {

      //  alert("success " + JSON.stringify(response.data.data));
      //  alert("Details " + response.data.data);
      $scope.items = response.data.data;
      //   $scope.items = response.data.data;
      $ionicLoading.hide();

      //   alert("Details " + JSON.stringify($scope.items));
      //  $scope.description = $sce.trustAsHtml($scope.posts.khalijiPROName);
      //  $scope.content.content = $sce.trustAsHtml($scope.content.content);
    },
      function (data, status, header, config) {
        $scope.errorData = response.data.data;
        //     alert("error " + JSON.stringify(response.data.data));


      })

})


starter.controller('spRegisterProfilesCtrl', function ($scope, MyServices, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $ionicActionSheet, $cordovaCamera, $cordovaFile) {
  //  configreload.onallpage();
  //  alert("ID Is " + localStorage.getItem("userId"));
  $scope.edit = false;
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  $scope.changeedit = function (val) {




    $scope.edit = val;
  }



  //$scope.signup.citydata = null;
  // $scope.citycategories = [];
  $scope.item = {};
  MyServices.getCities("getCity.php/").
    then(function (response, status, headers) {
      $scope.citycategories = response.data.data.data;
      //   alert("City Diret " + $scope.citycategories);


      //   alert("succ " + JSON.stringify(response));
    },
      function (data, status, header, config) {
        $scope.errorData = data;
        //   alert("error " + JSON.stringify(data));                        
      });
  $scope.item = {};
  MyServices.getFavPosition("getFavouritePosition.php/").
    then(function (response, status, headers) {
      //  alert("Postion " + response.data.data.Member_favourite_position[0]);
      //  alert("Postion " + response.data.data.Member_favourite_position);
      $scope.Member_favourite_position = response.data.data;
      //     alert("Fav Position " + $scope.Member_favourite_position);


      //   alert("succ " + JSON.stringify(response));
    },
      function (data, status, header, config) {
        $scope.errorData = data;
        //   alert("error " + JSON.stringify(data));                        
      });


  $scope.item = {};
  $scope.updateProfile = {};
  var data = { "currentUserCity": localStorage.getItem("userCity") };
  //  alert("Fav Club City  " + localStorage.getItem("userCity"));
  //  alert("Fav Club data " + data);
  var parameter = JSON.stringify(data);
  //  alert("Fav Club parameter " + parameter);
  MyServices.getFavClub(parameter).
    then(function (response, status, headers) {
      //  alert("Fav Club [0] " + JSON.stringify(response.data.data[0]));
      //  alert("Fav Club " + JSON.stringify(response.data.data));
      $scope.Member_favourite_team = response.data.data;
      //     alert("Fav Club Direct " + $scope.Member_favourite_team);


      //   alert("succ " + JSON.stringify(response));
    },
      function (data, status, header, config) {
        $scope.errorData = data;
        //   alert("error " + JSON.stringify(data));


      });

  //  $scope.items = [];  
  $scope.item = [];
  $scope.updateProfile = {};
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  $ionicLoading.show();
  /*var cityId = $scope.item.citydata;
      var cityName = $.grep($scope.citycategories, function (catcity) {
                return catcity.city_id == cityId;
             })[0].city_name;*/

  MyServices.registerProfileall(parameter).
    then(function (response, status, headers) {
      //    alert("ResponJsonStr " + JSON.stringify(response.data.data));
      //   alert("ResponJsonStr[0] " + JSON.stringify(response.data.data[0]));
      //   alert("Respfirst " + $scope.posts);
      $scope.posts = response.data.data[0];
      /*alert("Resp " + $scope.posts);*/
      $scope.item.avatar = $scope.posts.avatar
      $scope.item.first_name = $scope.posts.first_name
      /*alert("first_name " + $scope.item.first_name);
      alert("POstsfirst_name " + $scope.posts.first_name);
*/
      $scope.item.last_name = $scope.posts.last_name
      $scope.item.Country = $scope.posts.Country
      //  $scope.item.citydata=$scope.posts.City.citycategories.city_id
      //  alert("City " + $scope.posts.City);
      $scope.item.citycategories = $scope.posts.City
      window.localStorage.setItem("userCity", $scope.item.citycategories);
      $scope.item.Nationality = $scope.posts.Nationality
      $scope.item.Date_of_Birth = $scope.posts.Date_of_Birth
      //     $scope.item.Member_favourite_team=$scope.post.Member_favourite_team 
      $scope.item.Member_favourite_team = $scope.posts.Member_favourite_team
      $scope.item.Member_favourite_position = $scope.posts.Member_favourite_position
      $scope.item.Member_description = $scope.posts.Member_description
      $scope.item.Member_condition = $scope.posts.Member_condition


      $ionicLoading.hide();

      //alert("succ " + $scope.posts.isActive);
    },
      function (data, status, header, config) {
        //alert("Invalid Email Address or password");  

      });




  $scope.saveProfile = function () {

    $ionicLoading.show();

    //    alert("USerID " + localStorage.getItem("userId"));

    var cityId = $scope.item.citycategories;
    //    alert("$scope.item.citycategories " + $scope.item.citycategories);
    //    alert("cityId  " + cityId);

    var cityName = $.grep($scope.citycategories, function (catcity) {
      return catcity.city_id == cityId;
    });
    //  alert("City Name " + cityName);
    var clubId = $scope.item.Member_favourite_team;
    //   alert("fav ClubId  " + clubId);
    /*var clubName = $.grep($scope.Member_favourite_team_name, function (catclub) {
            return catclub.clubID == clubId;
         })[0].Member_favourite_team_name;
    alert("[0].Member_favourite_team_name " + clubName);*/
    //    alert("clubId  " + clubId);
    //    alert("clubName  " + clubName);

    var favpostionId = $scope.item.Member_favourite_position;
    //   alert("fav Postionmn " + favpostionId);
    //   alert("fav Postionmn Scope " + $scope.item.Member_favourite_position);

    /* var favpostionName = $.grep($scope.Member_favourite_position, function (favpos) {
             return favpos.id == favpostionId;
          })*//*[0].Member_favourite_position;*/
    //  alert("favpostionId  " + favpostionId);
    //  alert("favpostionNAme  " + favpostionName);
    var msgdata = {
      "currentUserID": localStorage.getItem("userId"),
      "txtUserFirstName": $scope.item.first_name,
      "txtUserLastName": $scope.item.last_name,
      "txtUserCountry": $scope.item.Country,
      //$scope.item.citydata = $scope.data.data.data[0].city_name;
      //  "txtUserCity":$scope.cityId,
      "txtUserCity": cityId,
      "txtUserNationality": $scope.item.Nationality,
      "txtUserDOB": $scope.item.Date_of_Birth,
      //"txtUserFavouriteTeam":$scope.item.Member_favourite_team,
      "txtUserFavouriteClub": clubId,
      //    "txtUserFavouritePosition":$scope.item.Member_favourite_position,
      "txtUserFavouritePosition": favpostionId,
      "txtUserDesciption": $scope.item.Member_description,
      "txtUserCondition": $scope.item.Member_condition

    };
    var parameter = JSON.stringify(msgdata);
    alert(parameter);
    MyServices.updateProfileAll(parameter).
      then(function (data, status, headers) {
        $ionicLoading.hide();
        // $scope.status = 'Inserted Data.';
        //$scope.customers.push(parameter);
        $scope.edit = !$scope.edit;
        var alertPopup = $ionicPopup.alert({
          title: 'Profile Update!',
          template: 'Profile update successfully!'
        });
        $state.go('spregisterProfile', null, { reload: true });



      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
          alert("eroror" + $scope.ResponseDetails);

        });
  }


  /** ---------------------------------------------------------------------
         *
         * display alert to choose where to get the image from
         *
         --------------------------------------------------------------------- */
  $scope.images = [];
  $scope.addImage = function () {

    /* var options = {
                  'buttonLabels': ['Take Picture', 'Select From Gallery'],
                  'addCancelButtonWithLabel': 'Cancel'
              };
              window.plugins.actionsheet.show(options, callback);*/
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: '<img src="img/gallery.png">  Gallery' },
        { text: '<img src="img/camera.png">  Camera' },

        { text: '<img src="img/delete.png">  Remove photo' }
      ],
      titleText: 'Profile Photo',
      cancelText: 'Cancel',
      buttonClicked: function (index) {
        $scope.showImage(index);
      }
    });
  }
  $scope.showImage = function (type) {
    $scope.hideSheet();
    if (type == 1) {
      navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        quality: 100
      });

      function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
        //   alert("imageSrc " + image.src);
        //  localStorage.setItem(localStorage.getItem("userId")+"_mobiledp",imageData);
        localStorage.setItem("mobiledp", image.src);

        alert(imageData);
        $scope.imageupload();

      }

      function onFail(message) {
        //alert('Failed because: ' + message);
        var alertPopup = $ionicPopup.alert({
          title: 'Failed!',
          template: 'Failed because ' + message
        });
      }
    }
    else if (type == 0) {
      navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        quality: 100
      });

      function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/png;base64," + imageData;
        //   alert("imageSrc " + image.src);
        //  localStorage.setItem(localStorage.getItem("userId")+"_mobiledp",imageData);
        localStorage.setItem("mobiledp", image.src);
        //    alert(imageData);
        $scope.imageupload();
      }

      function onFail(message) {
        //alert('Failed because: ' + message);
        var alertPopup = $ionicPopup.alert({
          title: 'Failed!',
          template: 'Failed because ' + message
        });
      }
    }

  }
  /// Image Uploading
  /*var imagedata = {
          "user_id":localStorage.getItem("userId"),
          "data":localStorage.getItem(localStorage.getItem("userId")+"_mobiledp"),
          "imagename": $scope
      }*/
  $scope.imageupload = function () {
    var data = { "user_id": localStorage.getItem("userId"), "data": localStorage.getItem("mobiledp"), "imagename": " " };
    var parameter = JSON.stringify(data);

    //   alert("ImageUplaoaddata " + data);
    //  alert("Imageupload " + parameter);

    $ionicLoading.show();
    MyServices.updateProfileImage(parameter).
      then(function (data, status, headers) {
        // $scope.status = 'Inserted Data.';
        //$scope.customers.push(parameter);
        $ionicLoading.hide();
        $scope.edit = true;
        var alertPopup = $ionicPopup.alert({
          title: 'Profile Image Update!',
          template: 'Profile Image Update Successfully!'
        });
        // $state.go('welcomeHome');

      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + JSON.stringify(data) +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;
          //alert("eroror"+$scope.ResponseDetails);
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: '' + JSON.stringify(data)
          });

        });
  }
  /// Image Upload ////
})

starter.controller('spAboutCtrl', function ($scope, MyServices, $filter, $timeout, $location, $ionicPlatform, $ionicLoading, $state) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('supervisormenuslider.supervisormenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.items = [];
  $ionicLoading.show();
  MyServices.aboutall().
    then(function (response, status, headers) {

      //   alert("success " + JSON.stringify(response.data.data));
      //   alert("Details " + response.data.data);
      $scope.items = response.data.data;
      //   $scope.items = response.data.data;
      $ionicLoading.hide();

      //   alert("Details " + JSON.stringify($scope.items));
      //  $scope.description = $sce.trustAsHtml($scope.posts.khalijiPROName);
      //  $scope.content.content = $sce.trustAsHtml($scope.content.content);
    },
      function (data, status, header, config) {
        $scope.errorData = response.data.data;
        //     alert("error " + JSON.stringify(response.data.data));


      })
})

starter.controller('orgClubSliderCtrl', function ($scope, $ionicModal, $timeout) {

})

starter.controller('orgCreateClubCtrl', function ($scope, MyServices, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $ionicActionSheet, $cordovaCamera, $cordovaFile) {
  localStorage.removeItem("mobiledp");
  //alert("Image Path " + JSON.stringify(localStorage.getItem("mobiledp")));
  $scope.edit = false;
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };


  $scope.item = {};
  MyServices.getFavPosition("getFavouritePosition.php/").
    then(function (response, status, headers) {
      $scope.Member_favourite_position = response.data.data;
    },
      function (data, status, header, config) {
        $scope.errorData = data;
      });


  $scope.item = {};
  $scope.updateProfile = {};
  var data = { "currentUserCity": localStorage.getItem("userCity") };
  var parameter = JSON.stringify(data);
  MyServices.getFavClub(parameter).
    then(function (response, status, headers) {
      $scope.Member_favourite_team_name = response.data.data;
    },
      function (data, status, header, config) {
        $scope.errorData = data;
      });

  //qaz
  $scope.item = [];
  $scope.updateProfile = {};
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  $ionicLoading.show();

  MyServices.getSpclubdeafaultvalue(parameter).
    then(function (response, status, headers) {
      //       alert("Response " + JSON.stringify(response));
      $scope.posts = response.data.data;
      //  $scope.item.avatar=$scope.posts.avatar
      $scope.countries = $scope.posts.country
      $scope.item.club_city_area = $scope.posts.club_city_area[0]
      $scope.item.club_founder = $scope.posts.club_founder[0]
      $ionicLoading.hide();
    },
      function (data, status, header, config) {

      });




  $scope.createClubsubmit = function (createClub) {

    $ionicLoading.show();


    $scope.allvalidation = [/*{
      field: $scope.createClub.picFile,
      validation: "image/*"
        },*/{
        field: $scope.createClub.clubname,
        validation: ""
      },
      {
        field: $scope.item.club_city_area,
        validation: ""
      },
      {
        field: $scope.createClub.clubCountry,
        validation: ""
      },
      {
        field: $scope.item.club_founder,
        validation: ""
      },
      {
        field: $scope.createClub.overviewClub,
        validation: ""
      }
    ];
    var check = formvalidation($scope.allvalidation);
    //  alert(check);
    // alert("Country " + $scope.countries[0]);
    //  alert("Country " + $scope.createClub.clubCountry);
    //  alert("Image Path " + JSON.stringify(localStorage.getItem("mobiledp")));
    if (check) {
      var msgdata = {
        'userID': localStorage.getItem("userId"),
        'clubName': createClub.clubname,
        'clubCityArea': $scope.item.club_city_area,
        'clubCountry': $scope.createClub.clubCountry,
        'clubFounder': $scope.item.club_founder,
        'clubStatus': "1",
        'clubOverview': createClub.overviewClub,
        'user_email': localStorage.getItem("userEmail"),
        'data': localStorage.getItem("mobiledp"),
        'imagename': ""

      };
      var parameter = JSON.stringify(msgdata);
      MyServices.supervisorCreateClub(parameter).
        then(function (data, status, headers) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Club Created!',
            template: 'Your Club Created Successfully!'
          });
          $state.go('supervisorclubslidermenu.supervisorclublist');
        },
          function (data, status, header, config) {
            /* $scope.ResponseDetails = "Data: " + data +
                                    "<hr />status: " + status +
                                    "<hr />headers: " + header +
                                    "<hr />config: " + config;
                                     alert("eroror"+$scope.ResponseDetails);*/
            var myPopup = $ionicPopup.show({
              template: '<p class="text-center">Something Went Worng</p>',
              title: 'Oops!',
              scope: $scope,

            });
            $timeout(function () {
              myPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);

          });

    } else {
      msgforall("Fill all data");
      $ionicLoading.hide();
    }
  }
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: 'Create Club',
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }

  $scope.createClub = {};
  var createClubsuccess = function (data, status) {

    //    alert("Data CLub:  " + JSON.stringify(data));
    if (data != "false" || data.success != 0) {
      //  $.jStorage.set("user", data);
      //window.localStorage.setItem("userdataa", JSON.stringify(data));
      //window.localStorage.setItem("userId", JSON.stringify(data.user.id));
      // localStorage.loggedIn = true;
      //  alert("Data " + JSON.stringify(data));
      //  alert("loggedIn " + JSON.stringify(localStorage.loggedIn));
      //  user = data.user;
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">Club Created Successfully!</p>',
        title: 'Congrats!',
        scope: $scope,

      });
      $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
        //   localStorage.loggedIn = true;
        $state.go('orgclubslidermenu.orgclublist');
      }, 2000);

    } else {
      var myPopup = $ionicPopup.show({
        template: '<p class="text-center">Something Went Worng</p>',
        title: 'Oops!',
        scope: $scope,

      });
      $timeout(function () {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 2000);
    }
    $ionicLoading.hide();
    $scope.createClub = {};
  }




  /** ---------------------------------------------------------------------
         *
         * display alert to choose where to get the image from
         *
         --------------------------------------------------------------------- */
  $scope.images = [];
  $scope.addImage = function () {

    /* var options = {
                  'buttonLabels': ['Take Picture', 'Select From Gallery'],
                  'addCancelButtonWithLabel': 'Cancel'
              };
              window.plugins.actionsheet.show(options, callback);*/
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: '<img src="img/gallery.png">  Gallery' },
        { text: '<img src="img/camera.png">  Camera' },

        { text: '<img src="img/delete.png">  Remove photo' }
      ],
      titleText: 'Club Icon',
      cancelText: 'Cancel',
      buttonClicked: function (index) {
        $scope.showImage(index);
      }
    });
  }
  $scope.showImage = function (type) {
    $scope.hideSheet();
    if (type == 1) {
      navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        quality: 100
      });

      function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
        //   alert("imageSrc " + image.src);
        //  localStorage.setItem(localStorage.getItem("userId")+"_mobiledp",imageData);
        localStorage.setItem("mobiledp", image.src);

        //    alert(imageData);
        //    $scope.imageupload(); 

      }

      function onFail(message) {
        //alert('Failed because: ' + message);
        var alertPopup = $ionicPopup.alert({
          title: 'Failed!',
          template: 'Failed because ' + message
        });
      }
    }
    else if (type == 0) {
      navigator.camera.getPicture(onSuccess, onFail, {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        quality: 100
      });

      function onSuccess(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/png;base64," + imageData;
        //    alert("imageSrc " + image.src);
        //  localStorage.setItem(localStorage.getItem("userId")+"_mobiledp",imageData);
        localStorage.setItem("mobiledp", image.src);
        //    alert(imageData);
        //  $scope.imageupload();
      }

      function onFail(message) {
        //alert('Failed because: ' + message);
        var alertPopup = $ionicPopup.alert({
          title: 'Failed!',
          template: 'Failed because ' + message
        });
      }
    }

  }
})

starter.controller('orgClubListCtrl', function ($scope, MyServices, $ionicLoading, $ionicPlatform, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('organizermenuslider.organizermenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $ionicLoading.show();
  $scope.items = [];
  var data = { "getClubCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("parameter " + parameter);
  MyServices.joinedCluball(parameter).
    then(function (response, status, headers) {
      //alert("service user id " +  localStorage.getItem("userId"));
      //    $scope.items = JSON.stringify(response.data.data);
      /*alert("Res " + response.data);
      alert("Res " + response.data.data);
      alert("Res JSON " + JSON.stringify(response.data.success));
      alert("Res JSON data.data " + JSON.stringify(response.data.data));
      alert("Res JSON data" + JSON.stringify(response.data));*/
      if (response.data.data == null) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">You Have Not Join Any Club Yet!</p>',
          title: 'Sorry!'
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        $ionicLoading.hide();
        $scope.items = response.data.data;

      }
      console.log(parameter);

    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  $scope.getspmemberdetails = function (clubID) {
    //  alert("Task Id is "+ clubID);
    //  $location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("orgmemberlists", { "clubID": clubID });
    console.log($scope.getspmemberdetails);
    //$state.go('sentmessagedetails' + id);
  }
  $scope.getspclubdetails = function (clubID) {
    //  alert("Task Id is "+ clubID);
    //  $location.path("/messageslidermenu.sentmessagedetails/" + messageID);
    $state.go("orgclubdetails", { "clubID": clubID });
    console.log($scope.getspclubdetails);
    //$state.go('sentmessagedetails' + id);
  }
})

starter.controller('orgMemberListsDetailsCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.getspmemberdetails

  $scope.clubID = $stateParams.clubID;
  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}

  var data = { "txtHiddenClubID": $scope.clubID }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.membersDetailAll(parameter).
    then(function (response, status, headers) {
      //   alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  $scope.getplayerdetails = function (playerID) {
    $state.go("orgplayerdetails", { "playerID": playerID });
    console.log($scope.getplayerdetails);
  }
})

starter.controller('orgPlayerDetailsCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.getplayerdetails

  $scope.playerID = $stateParams.playerID;
  //  alert("PLayer Id " + $scope.playerID);
  $scope.items = [];
  $scope.posts = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")
  var data = { "currentUserID": localStorage.getItem("userId"), "playerID": $scope.playerID }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  //888
  MyServices.payerDetails(parameter).
    then(function (response, status, headers) {
      //  alert("ResponJsonStr " + JSON.stringify(response.data.data));
      /// alert("ResponJsonStr[0] " + JSON.stringify(response.data.data[0]));
      //   alert("Respfirst " + $scope.posts);
      $scope.posts = response.data.data;
      $scope.getAvtar = $scope.posts.getAvtar
      $scope.status = $scope.posts.status
      $scope.first_name = $scope.posts.first_name
      $scope.last_name = $scope.posts.last_name
      $scope.Country = $scope.posts.Country
      $scope.City = $scope.posts.City
      $scope.Nationality = $scope.posts.Nationality
      $scope.Date_of_Birth = $scope.posts.Date_of_Birth
      $scope.Member_favourite_team = $scope.posts.Member_favourite_team_name
      $scope.Member_favourite_position = $scope.posts.Member_favourite_position
      $scope.Member_description = $scope.posts.Member_description
      $scope.Member_condition = $scope.posts.Member_condition
      $ionicLoading.hide();
    },
      function (data, status, header, config) {
        //   alert("Invalid Email Address or password");  

      });

  //Follow Click

  $scope.followclick = function (playerID) {
    // alert("Task Id is "+ clubID);
    // $scope.items = []; 
    //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
    var data = { "currentUserID": localStorage.getItem("userId"), "playerID": playerID }
    //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
    var parameter = JSON.stringify(data);
    //  alert("Items " + JSON.stringify(response.data.data));
    //  $ionicLoading.show();
    $ionicLoading.show();
    MyServices.followclickforfollow(parameter).
      then(function (response, status, headers) {
        //       alert("Status " + response.data.data.status);
        if (response.data.data.status != "Follow") {
          $ionicLoading.hide();
          /*var myPopup = $ionicPopup.show({
          template: '<p class="text-center">You are Already Applied on This Club!</p>',
          title: 'Sorry!'
          //scope: $scope,
        });*/
          var alertPopup = $ionicPopup.alert({
            title: 'Congrats!',
            template: 'Successfully Unfollowed'
          });
          //    $state.go($state.current, {}, {reload: true}); 
          //              $state.reload();
          //    $window.location.reload(true);
          //   $state.go('clubslidermenu.clubinyourarea',null,{reload:true});
        }
        else {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            template: '<p class="text-center">Successfully Followed</p>',
            title: 'Congrats!'
            //scope: $scope,
          });

          $state.go('orgplayerdetails', null, { reload: true });
        }
        /*$timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);*/
        //    alert("items : " + JSON.stringify($scope.items));
        // alert("Items Data.Club ClubArea " + $scope.items);
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });
  }

  //Follow Click

})

starter.controller('orgClubDetailsCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $scope.clubID = $stateParams.clubID;
  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  //{"currentUserID":"102","clubID":"50"}
  var data = { "currentUserID": localStorage.getItem("userId"), "clubID": $scope.clubID }
  //   alert("Club ID Is" + data);
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.clubInYourAreaDetail(parameter).
    then(function (response, status, headers) {
      //     alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      // alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
})

starter.controller('orgMemberApprovalListCtrl', function ($scope, MyServices, $ionicModal, $filter, $location, $ionicLoading, $ionicPopup, $timeout, $state, $stateParams) {

  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  /*   $scope.getspmemberdetails

    $scope.clubID = $stateParams.clubID;
    $scope.items = [];  */

  var data = { "getUserID2": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.spMembersApprovalDetail(parameter).
    then(function (response, status, headers) {
      //  alert("Data.Data " + JSON.stringify(response.data.data.players));
      //  alert("Data " + JSON.stringify(response.data.data.player));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data.players;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  // Click For Approve Players

  $scope.getApproveButton = function (getPlayerUserID, getPlayerClubID) {
    // alert("Task Id is "+ clubID);
    // $scope.items = []; 
    //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
    var data = { "getUserID": getPlayerUserID, "clubID": getPlayerClubID }
    //  alert("currentUserID And Messageid " + data, "UserID " + localStorage.getItem("userId"), "Messageid " + $scope.messageID);
    var parameter = JSON.stringify(data);
    //  alert("Items " + JSON.stringify(response.data.data));
    //  $ionicLoading.show();
    $ionicLoading.show();
    //  alert("parameter " + parameter);
    MyServices.clickToApprovePlayer(parameter).
      then(function (response, status, headers) {
        if (response.data.success != 1) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: 'Sorry!',
            template: 'You are Already Applied on This Club!'
          });
        }
        else {
          $ionicLoading.hide();
          var approvedplayername = response.data.message;
          //     alert("approve msg " + approvedplayername);
          var alertPopup = $ionicPopup.alert({
            template: '<p class="text-center">{{approvedplayername}}Successfully Approved Player</p>',
            title: 'Congrats!'
          });

          $state.go('orgclubslidermenu.orgmemberapprovallist', null, { reload: true });
        }

        /*$timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
          }, 3000);*/
        //    alert("items : " + JSON.stringify($scope.items));
        // alert("Items Data.Club ClubArea " + $scope.items);
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });
  }


  // Click For Approve Players

})

starter.controller('orgMatchSlideMenuCtrl', function ($scope, $ionicModal, $timeout, $rootScope) {

})

starter.controller('orgMatchlistMatchCtrl', function ($scope, MyServices, $ionicLoading, $ionicModal, $ionicPopup, $timeout, $rootScope) {
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $ionicLoading.show();
  var data = { "matchCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);

  MyServices.spmatchListall(parameter).
    then(function (response, status, headers) {
      if (response.data.data == null) {
        //   alert("inside Null Values");
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">There Is No Match Near By You!</p>',
          title: 'Sorry!'
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        $ionicLoading.hide();
        //  alert("response " + response.data.data);    
        $scope.spmatchBy = response.data.data;
        $rootScope.spcountnearby = {
          itemCount: $scope.spmatchBy.length
        }
        //        alert("LEn " + $scope.spmatchBy.itemdaydate.match_detail.length);


      }
      $ionicLoading.hide();
      console.log(parameter);

    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

})

//orgCreateMatch
starter.controller('orgMatchCreateMatchCtrl', function ($scope, MyServices, $ionicLoading, $ionicModal, $timeout, $filter, $location, $state, $ionicPopup, $ionicActionSheet, $cordovaCamera, $cordovaFile) {

  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };


  $scope.item = {};
  $scope.updateProfile = {};
  //*******************************************************//
  //Club1 Fetch
  var data = { "currentUserID": localStorage.getItem("userId") };
  var parameter = JSON.stringify(data);
  MyServices.getCurrrentClub1(parameter).
    then(function (response, status, headers) {
      //   alert("Club1 Response " + JSON.stringify(response.data.data));
      $scope.clubses1 = response.data.data;
    },
      function (data, status, header, config) {
        $scope.errorData = data;
      });
  //Club1 Fetch
  //*******************************************************//
  //OnChange Event DropDown //Club2 Fetch
  $scope.Getselectedclub2 = function (clubs) {
    var clubid1 = $scope.item.matchclubs1;
    var clubname = $.grep($scope.clubses1, function (clubs) {
      return clubs.clubID == clubid1;
    })[0].clubName;

    var data = { "currentUserID": localStorage.getItem("userId"), "clubID1": clubid1 };
    var parameter = JSON.stringify(data);
    MyServices.getCurrrentClub2(parameter).
      then(function (response, status, headers) {
        $scope.clubses2 = response.data.data;
      },
        function (data, status, header, config) {
          $scope.errorData = data;
        });

  };
  //OnChange Event DropDown //Club2 Fetch
  //*******************************************************//
  // Fetch Sportcenter
  var data = { "currentUserID": localStorage.getItem("userId") };
  var parameter = JSON.stringify(data);
  MyServices.getSportsCenter(parameter).
    then(function (response, status, headers) {
      $scope.matchSportCenters = response.data.data;
    },
      function (data, status, header, config) {
        $scope.errorData = data;
      });
  // Fetch Sportcenter
  //*******************************************************//
  // Fetch Default City
  $scope.item = [];
  $scope.updateProfile = {};
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  $ionicLoading.show();

  MyServices.getSpclubdeafaultvalue(parameter).
    then(function (response, status, headers) {
      $scope.posts = response.data.data;
      $scope.countries = $scope.posts.country
      $scope.item.club_city_area = $scope.posts.club_city_area[0]
      $ionicLoading.hide();
    },
      function (data, status, header, config) {

      });

  // Submit Match Details 
  //*******************************************************//


  $scope.createMatchsubmit = function (createMatch) {

    $ionicLoading.show();


    var clubId1 = $scope.item.matchclubs1;
    //   alert("Club1 " + clubId1);

    var clubId2 = $scope.item.matchclubs2;
    //  alert("Club1 " + clubId2);

    var sportcntr = $scope.item.matchSportCenter;
    //  alert("SportCenter " + sportcntr);

    //   var dateofMatch = $scope.item.date_of_Match;
    var dateofMatch = $filter('date')($scope.item.date_of_Match, "yyyy-MM-dd");
    //  alert("date  " + dateofMatch);

    //   var timeofMatch = $scope.item.time_of_Match;
    var timeofMatch = $filter('date')($scope.item.time_of_Match, "HH:mm");
    //  alert("Time " + timeofMatch);

    var defaultclubcity = $scope.item.club_city_area;
    //  alert("City defat " + defaultclubcity);

    var matchOverview = $scope.item.overviewMatch;
    //   alert("City defat " + matchOverview);

    var matchName = $scope.item.matchname;
    //  alert("City defat " + matchName);

    $scope.allvalidation = [{
      field: matchName,
      validation: ""
    },
    {
      field: defaultclubcity,
      validation: ""
    },
    {
      field: clubId1,
      validation: ""
    },
    {
      field: clubId2,
      validation: ""
    },
    {
      field: dateofMatch,
      validation: ""
    },
    {
      field: timeofMatch,
      validation: ""
    },
    {
      field: sportcntr,
      validation: ""
    },
    {
      field: matchOverview,
      validation: ""
    }
    ];
    var check = formvalidation($scope.allvalidation);
    //  alert(check);
    if (check) {
      var msgdata = {
        'currentUserID': localStorage.getItem("userId"),
        'matchName': matchName,
        'matchLocation': defaultclubcity,
        'clubID1': clubId1,
        'clubID2': clubId2,
        'matchDate': dateofMatch,
        'matchTime': timeofMatch,
        'matchSportCenter': sportcntr,
        'matchOverview': matchOverview

      };
      var parameter = JSON.stringify(msgdata);
      //  alert(parameter);
      MyServices.orgCreateMatch(parameter).
        then(function (data, status, headers) {
          $ionicLoading.hide();
          //   alert("Final Resonse " + JSON.stringify(data));
          var alertPopup = $ionicPopup.alert({
            title: 'Congrats!',
            template: '<p class="text-center">Your Match Created Successfully!</p>'
          });
          $state.go('organizermenuslider.organizermenu');
        },
          function (data, status, header, config) {
            /* $scope.ResponseDetails = "Data: " + data +
                                    "<hr />status: " + status +
                                    "<hr />headers: " + header +
                                    "<hr />config: " + config;
                                     alert("eroror"+$scope.ResponseDetails);*/
            var myPopup = $ionicPopup.show({
              template: '<p class="text-center">Something Went Worng</p>',
              title: 'Oops!',
              scope: $scope,

            });
            $timeout(function () {
              myPopup.close(); //close the popup after 3 seconds for some reason
            }, 2000);

          });

    } else {
      msgforall("Fill all data");
      $ionicLoading.hide();
    }
  }

  // Submit Match Details 
  //*******************************************************//
  var msgforall = function (msg) {
    $ionicLoading.hide();
    var myPopup = $ionicPopup.show({
      template: '<p class="text-center">' + msg + '</p>',
      title: 'Create Club',
      scope: $scope,

    });
    $timeout(function () {
      myPopup.close(); //close the popup after 3 seconds for some reason
    }, 2000);

  }
})

starter.controller('orgMatchMyMatchCtrl', function ($scope, MyServices, $ionicLoading, $ionicModal, $ionicPopup, $timeout, $rootScope) {
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };
  $ionicLoading.show();
  var data = { "matchCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);

  MyServices.spmatchListall(parameter).
    then(function (response, status, headers) {
      if (response.data.data == null) {
        //   alert("inside Null Values");
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center">There Is No Match Near By You!</p>',
          title: 'Sorry!'
        });
        $timeout(function () {
          myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);

      }
      else {
        $ionicLoading.hide();
        //   alert("response " + response.data.data);    
        $scope.spmatchBy = response.data.data;
        $rootScope.spcountnearby = {
          itemCount: $scope.spmatchBy.length
        }
        //        alert("LEn " + $scope.spmatchBy.itemdaydate.match_detail.length);


      }
      $ionicLoading.hide();
      console.log(parameter);

    },
      function (data, status, header, config) {
        $scope.loadingIndicator.hide();
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      })
})

starter.controller('statisticsMenuCtrl', function ($scope, MyServices, $ionicPlatform, $timeout, $ionicHistory, $rootScope, $location, $state, $window, $translate) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('menuslider.menu');
    e.preventDefault();
  }, 101);

  $scope.item = {};
  var language = localStorage.getItem("language");
  //  alert("Lang "+language);
  if (language == null || language == "null") {
    $scope.item.language = 'en';
    $translate.use("en");
  }
  else {
    if (language == "en") {
      $scope.item.language = 'en';
      $translate.use("en");
    }
    else {
      $scope.item.language = 'ar';
      $translate.use("ar");
      $scope.myClass = "rtlcontent";
    }
  }
})

starter.controller('rankingStatisticsCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $ionicPopup, $timeout, $location, $ionicLoading, $state) {
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('statisticsmenu');
    e.preventDefault();
  }, 101);
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.item = {};
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.rankingDetails(parameter).
    then(function (response, status, headers) {
      //   alert("Ranking Response:--  " + JSON.stringify(response.data.data));
      // $scope.posts = response.data.data;
      $scope.posts = response.data.data;
      //  $scope.item.avatar=$scope.posts.avatar
      $scope.item.countedSupervisor = $scope.posts.countedSupervisor
      $scope.item.countedPlayedTotalMatch = $scope.posts.countedPlayedTotalMatch
      $scope.item.currentPlayerPersonalRanking = $scope.posts.currentPlayerPersonalRanking
      $scope.item.countedPlayer = $scope.posts.countedPlayer
      $scope.item.countedPlayedMatchOrganise = $scope.posts.countedPlayedMatchOrganise
      $scope.item.countedPlayedTotalMatch = $scope.posts.countedPlayedTotalMatch
      $scope.item.countedMyClubCreated = $scope.posts.countedMyClubCreated
      $scope.item.countedMyTotalClub = $scope.posts.countedMyTotalClub



      /* if(response.data.data == null){
       $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
           template: '<p class="text-center">You Have Achieved No Awards Keep Playing Hard!</p>',
           title: 'Sorry!'
         });
     }
     else{
       $ionicLoading.hide();
       $scope.items = response.data.data;
     }*/
      $ionicLoading.hide();
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

})

starter.controller('topOrganizerStatisticsCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $ionicFilterBar, $timeout, $location, $ionicLoading, $state, $translate, $ionicConfig) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('statisticsmenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }


  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.topOrganizerDetials(parameter).
    then(function (response, status, headers) {
      // alert("Data.Data " + JSON.stringify(response.data.data));
      // alert("Data [0] " + JSON.stringify(response.data.data[0]));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      $scope.items = response.data.data;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };
})

starter.controller('topPlayerssStatisticsCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $ionicPopup, $timeout, $location, $ionicLoading, $state, $ionicSideMenuDelegate, $ionicFilterBar, $translate, $ionicConfig) {
  var start = 0;
  var ending = start + 10;
  var lastdata;
  var reachLast = false;


  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('statisticsmenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.numberOfItemsToDisplay = 5; // number of item to load each time
  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.topPlayersDetials(parameter).
    then(function (response, status, headers) {
      //   alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      if (response.data.data == null) {
        $ionicLoading.hide();

        var alertPopup = $ionicPopup.alert({
          title: $filter('translate')('sorry'),
          template: '<p class="text-center">{{"notopplayyeers" | translate}}</p>',
          buttons: [{
            text: $translate.instant('ok')
          }]
        });
        alertPopup.then(function (res) {
          $state.go('statisticsmenu');
          console.log('Thank you for not eating my delicious ice cream cone');
        });

      }
      else {
        $ionicLoading.hide();
        $scope.addMoreItem = function (done) {
          //  alert("call");
          console.log("add more " + $scope.items.length + " : " + $scope.numberOfItemsToDisplay)
          if ($scope.items.length > $scope.numberOfItemsToDisplay) {
            $scope.numberOfItemsToDisplay += 2; // load 20 more items
            // done(); // need to call this when finish loading more data
            // $ionicLoading.show();
          }
          else {

            $scope.noMoreItemsAvailable = true;
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }

        $scope.items = response.data.data;
        //   $scope.ngModel.txt = response.data.data;
      }

      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };

})

starter.controller('topClubsStatisticsCtrl', function ($scope, MyServices, $filter, $ionicPlatform, $timeout, $location, $ionicFilterBar, $ionicLoading, $state, $translate, $ionicConfig) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('statisticsmenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }


  $scope.numberOfItemsToDisplay = 5; // number of item to load each time
  $scope.items = [];
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.topClubsDetials(parameter).
    then(function (response, status, headers) {
      //   alert("Data.Data " + JSON.stringify(response.data.data));
      //    alert("Data " + JSON.stringify(response.data));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      if (response.data.data == null) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
          title: 'Sorry!',
          template: '<p class="text-center">No Top Clubs!</p>'
        });
        alertPopup.then(function (res) {
          $state.go('statisticsmenu');
          console.log('Thank you for not eating my delicious ice cream cone');
        });
      }
      else {
        $ionicLoading.hide();
        $scope.addMoreItem = function (done) {
          // alert("call");
          console.log("add more " + $scope.items.length + " : " + $scope.numberOfItemsToDisplay)
          if ($scope.items.length > $scope.numberOfItemsToDisplay) {
            $scope.numberOfItemsToDisplay += 2; // load 20 more items
            // done(); // need to call this when finish loading more data
          }
          else {

            $scope.noMoreItemsAvailable = true;
          }
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }

        $scope.items = response.data.data;
        //   $scope.ngModel.txt = response.data.data;
      }

      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });

  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };

})

starter.controller('clubSearchByClubMenuCtrl', function ($scope, MyServices, $ionicFilterBar, $filter, $ionicPlatform, $timeout, $location, $ionicLoading, $state, $translate, $ionicConfig) {
  $scope.item = {};
  //alert("This Is OrderBy");
  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('clubmenu');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {
    $scope.orderses = [{
      orderID: "",
      orderName: 'Most Active'
    }, {
      orderID: 'most followers',
      orderName: 'Most Followers'
    }, {
      orderID: 'most members',
      orderName: 'Most Members'
    }, {
      orderID: 'name',
      orderName: 'Sort By Name'
    }];
  }
  else {
    if (language == "en") {

      $scope.orderses = [{
        orderID: "",
        orderName: 'Most Active'
      }, {
        orderID: 'most followers',
        orderName: 'Most Followers'
      }, {
        orderID: 'most members',
        orderName: 'Most Members'
      }, {
        orderID: 'name',
        orderName: 'Sort By Name'
      }];
    }
    else {

      $scope.orderses = [{
        orderID: "",
        orderName: 'الاكثر نشاطاً'
      }, {
        orderID: 'most followers',
        orderName: 'الاكثر متابعة'
      }, {
        orderID: 'most members',
        orderName: 'الاكثر لاعبين'
      }, {
        orderID: 'name',
        orderName: 'ترتيب بالاسم'
      }];
    }
  }



  $scope.item.orderby = $scope.orderses[0].orderID;
  console.log("ORderSelected ID : -- " + $scope.item.orderby);
  //xoo
  $scope.getOrderBySelected = function (orders) {
    var orderid = $scope.item.orderby;
    var ordername = $.grep($scope.orderses, function (orders) {
      return orders.orderID == orderid;
    })[0].orderName;
    //       alert("Selected Value: " + orderid + "\nSelected Text: " + ordername);
    //      {"getClubCreatedBy":"1","orderByClub":""}
    if (orderid == "") {
      var data = { "getClubCreatedBy": localStorage.getItem("userId"), "orderByClub": orderid };
      var parameter = JSON.stringify(data);
      MyServices.clubSearchBy(parameter).
        then(function (response, status, headers) {

          $scope.items = response.data.data.club;
        },
          function (data, status, header, config) {
            $scope.errorData = data;
          });
    }
    else if (orderid == "most followers") {
      var data = { "getClubCreatedBy": localStorage.getItem("userId"), "orderByClub": orderid };
      var parameter = JSON.stringify(data);
      MyServices.clubSearchBy(parameter).
        then(function (response, status, headers) {
          $scope.items = response.data.data.club;
        },
          function (data, status, header, config) {
            $scope.errorData = data;
          });
    }
    else if (orderid == "most members") {
      var data = { "getClubCreatedBy": localStorage.getItem("userId"), "orderByClub": orderid };
      var parameter = JSON.stringify(data);
      MyServices.clubSearchBy(parameter).
        then(function (response, status, headers) {
          $scope.items = response.data.data.club;
        },
          function (data, status, header, config) {
            $scope.errorData = data;
          });
    }
    else if (orderid == "name") {
      var data = { "getClubCreatedBy": localStorage.getItem("userId"), "orderByClub": orderid };
      var parameter = JSON.stringify(data);
      MyServices.clubSearchBy(parameter).
        then(function (response, status, headers) {
          $scope.items = response.data.data.club;
        },
          function (data, status, header, config) {
            $scope.errorData = data;
          });
    }
  }
  $scope.items = [];

  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "getClubCreatedBy": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + JSON.stringify(response.data.data));
  $ionicLoading.show();
  MyServices.clubSearchBy(parameter).
    then(function (response, status, headers) {
      //  alert("Data.Data " + JSON.stringify(response.data.data.club));
      //   alert("Data.Data [0] " + JSON.stringify(response.data.data.club[0]));
      // alert("Data [0] " + JSON.stringify(response.data.data[0]));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      //  alert("City: " + JSON.stringify(response.data.data.city));
      // $scope.item=response.data.data.city;
      $scope.posts = response.data.data.city;
      //       alert("Resp " + $scope.posts);
      $scope.item.city = $scope.posts;
      //      alert("City "+$scope.item.city);
      $scope.items = response.data.data.club;
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  /*     $scope.getplayerdetails = function (playerID) {
       $state.go("playerdetails", {"playerID":playerID});
       console.log($scope.getplayerdetails);
      }*/

  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
    filterBarInstance = $ionicFilterBar.show({
      items: $scope.items,
      update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
      },
      config: {
        placeholder: $filter('translate')('searcch'),
        back: $ionicConfig.backButton.icon()
      },
      cancelText: $filter('translate')('cancel')
    });
  };


})

starter.controller('assignRatingFileCtrl', function ($scope, MyServices, $translate, $filter, $ionicFilterBar, $ionicPlatform, $timeout, $location, $ionicLoading, $state, $ionicPopup, $translate, $stateParams, $ionicConfig) {

  $ionicPlatform.registerBackButtonAction(function (e) {
    //do your stuff
    $state.go('sppoverviewslidermenu.sppmatchratings');
    e.preventDefault();
  }, 101);
  // loader
  $scope.showloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-positive"></ion-spinner>'
    });
    $timeout(function () {
      $ionicLoading.hide();
    }, 5000);
  };

  var language = localStorage.getItem("language");
  if (language == null || language == "null") {

  }
  else {
    if (language == "en") {

    }
    else {

      $scope.myClass = "rtlcontent";
    }
  }

  $scope.getUserID = $stateParams.getUserID;
  $scope.getMatchID = $stateParams.getMatchID;
  $scope.getClubID = $stateParams.getClubID;
  $scope.index = $stateParams.index;


  /* alert("$scope.getUserID-----:---- " + $scope.getUserID);
   alert("$scope.getMatchID----:---- " + $scope.getMatchID);
   alert(" $scope.getClubID----:---- " + $scope.getClubID);
   alert("$scope.index------:---- " + $scope.index);*/




  $scope.items = [];
  $scope.item = {};
  //  var data={"currentUserID": localStorage.getItem("userId"),"messageID":localStorage.getItem("UserMessageId")}
  var data = { "userID": $scope.getUserID, "matchID": $scope.getMatchID, "clubID": $scope.getClubID, "currentUserID": localStorage.getItem("userId") }
  var parameter = JSON.stringify(data);
  //  alert("Items " + parameter);
  //   alert("Items ------ Parameter--- " + parameter);
  $ionicLoading.show();
  MyServices.forrateplayer(parameter).
    then(function (response, status, headers) {
      //    alert("Data.Data -- " + JSON.stringify(response.data.data));
      // alert("Data [0] " + JSON.stringify(response.data.data[0]));
      //    alert("Data[0] " + JSON.stringify(response.data[0]));
      //  $scope.items = JSON.stringify(response.data.data.match_detail);
      //    $scope.items = response.data.data;
      if (response.data.data == 0) {
        $ionicLoading.hide();
        /* var alertPopup = $ionicPopup.alert({
            template: '<p class="text-center">{{"nofollowers" | translate}}</p>',
            title: $filter('translate')('sorry'),
             buttons: [{ 
                        text: $translate.instant('ok')
                          }]
            //scope: $scope,
          });
           alertPopup.then(function(res) {
           $state.go('menuslider.menu');
           console.log('Thank you for not eating my delicious ice cream cone');
         });*/
      }
      else {
        $ionicLoading.hide();
        $scope.items = response.data.data;
        $scope.item.getAvtar = $scope.items.avatar
        $scope.item.nickname = $scope.items.Name
        /* $scope.item.City = $scope.items.Name*/
        $scope.item.getPlayersPlayed = $scope.items.Played
        $scope.item.getPlayerswon = $scope.items.Won
        $scope.item.getPlayerstie = $scope.items.Tied
        $scope.item.getPlayerslost = $scope.items.Lost



        //  alert("RESSSSS:-- " + JSON.stringify($scope.items.Name));
      }
      //   window.localStorage.setItem("UserMessageId", JSON.stringify(data.data.messageID));

      $ionicLoading.hide();
      //    alert("items : " + JSON.stringify($scope.items));
      //   alert("Items Data.Club ClubAreaDetails " + $scope.items);
      console.log(parameter);
    },
      function (data, status, header, config) {
        $scope.ResponseDetails = "Data: " + data +
          "<hr />status: " + status +
          "<hr />headers: " + header +
          "<hr />config: " + config;

      });
  /*$scope.getplayerdetails = function (playerID) {
  $state.go("playerdetails", {"playerID":playerID});
//     alert("player ID " + playerID);
  console.log($scope.getplayerdetails);
 }*/

  /*  $scope.showFilterBar = function () {
    //  alert("Search Clicked ");
     filterBarInstance = $ionicFilterBar.show({
        items: $scope.items,
        update: function (filteredItems, filterText) {
        $scope.items = filteredItems;
        if (filterText) {
          console.log(filterText);
        }
        },
    config: {
      placeholder: $filter('translate')('searcch'),
      back: $ionicConfig.backButton.icon()
    },
    cancelText: $filter('translate')('cancel')
      });
};*/

  $scope.submitplayerRates = function (item) {


    //   $scope.item = {};

    //      alert("ratingvalues::--- " + item.ratingvalues); 
    var data = { "userID": $scope.getUserID, "matchID": $scope.getMatchID, "clubID": $scope.getClubID, "currentUserID": localStorage.getItem("userId"), "rate": item.ratingvalues }
    var parameter = JSON.stringify(data);
    //   alert("Items " + parameter);
    //   alert("Items ------ Parameter--- " + parameter);
    $ionicLoading.show();
    MyServices.submitrateplayer(parameter).
      then(function (response, status, headers) {

        if (response.data.success == 0) {
          $ionicLoading.hide();
          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('sorry'),
            template: '<p class="text-center">{{"somewentwrontryaga" | translate}}</p>'
          });
          alertPopup.then(function (res) {
            $state.go('sppoverviewslidermenu.sppmatchratings');
            console.log('Thank you for not eating my delicious ice cream cone');
          });

        }
        else {
          $ionicLoading.hide();
          $scope.items = response.data.data;

          var alertPopup = $ionicPopup.alert({
            title: $filter('translate')('congrats'),
            template: '<p class="text-center">{{"succaddrating" | translate}}</p>'
          });
          alertPopup.then(function (res) {
            $state.go('sppoverviewslidermenu.sppmatchratings');
            console.log('Thank you for not eating my delicious ice cream cone');
          });
        }
        $ionicLoading.hide();
        console.log(parameter);
      },
        function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
            "<hr />status: " + status +
            "<hr />headers: " + header +
            "<hr />config: " + config;

        });

  }


})


