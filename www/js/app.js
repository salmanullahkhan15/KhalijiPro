// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var starter = angular.module('starter', ['ionic', 'jett.ionic.filter.bar', 'infinite-scroll', 'ngCordova', 'ngCordovaOauth', 'starter.controllers', 'starter.services', 'starter.directives', 'pascalprecht.translate', 'ionic-ratings'])

  .run(function ($ionicPlatform, $state, $rootScope) {
    $ionicPlatform.ready(function ($ionicPlatform, $ionicPopup, $cordovaNetwork) {


      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.overlaysWebView(true);
        StatusBar.styleLightContent();
      }
      /*if (cordova.platformId == 'android') {
         StatusBar.backgroundColorByHexString("#cb3e27");
     }*/
      if (window.cordova && window.cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#cb3e27");
      }
      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          console.log("Your Are Offline ")
          $state.transitionTo('offline');
          console.log("Your Are Offline after offline state ")
        }

      }
    });

    //Check User Role

    $rootScope.$on('$stateChangeStart', function (event, toState, fromState) {

      /*var introscreen = localStorage.getItem("introscreens") == null;*/
      var introscreen = localStorage.getItem("introscreens") == null;
      var loginnotnull = localStorage.getItem("userId") == null || localStorage.loggedIn == undefined;
      var signupandtermscondition = toState.url == '/signUp';
      var shouldLogin = localStorage.getItem("userId") != null;

      if (toState.url == '/signUp' || toState.url == '/login') {
        if (introscreen) {
          if (toState.url == '/login') {
            //$location.url('introscreen');
            $state.transitionTo("introscreen");
            event.preventDefault();
          }
          return;
        }
        else if (loginnotnull) {
          console.log(toState.url)
          if (signupandtermscondition && toState.url != '/signUp') {
            console.log("signUp");
            $state.transitionTo("signUp");
            fromState.url == '/signUp';
            event.preventDefault();
          }
          return;
          console.log("login");
          $state.transitionTo("login");
          fromState.url == '/login';
          event.preventDefault();

        }
        else if (shouldLogin) {
          console.log('PLayer');
          console.log("userFirstname : " + localStorage.getItem("userFirstname"));
          console.log("userFirstname : " + localStorage.getItem("userLastname"));
          console.log("userFirstname : " + localStorage.getItem("userCity"));
          console.log("userFirstname : ELSSS");
          $state.transitionTo("menuslider.menu");
          event.preventDefault();

        }
        /*
          else if(localStorage.getItem("role")=='supervisor')
         {
                 console.log('Supervisor');
                $state.go('supervisormenuslider.supervisormenu')
                  event.preventDefault();
         }
         else if(localStorage.getItem("role")=='organizer')
         {
             console.log('Organizer');
             $state.go('organizermenuslider.organizermenu')
               event.preventDefault();
         }*/
      }

    });

    //Check User Role


  })

  /*.config(function ($cordovaAppRateProvider) {
  
   
  });*/





  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $cordovaAppRateProvider, $httpProvider, $translateProvider) {

    document.addEventListener("deviceready", function () {

      var prefs = {
        language: 'en',
        appName: 'KhalijiPro',
        //   iosURL: '<my_app_id>',
        androidURL: 'market://details?id=com.attuneww.khalijipro',
        // windowsURL: 'ms-windows-store:Review?name=<...>'
      };

      $cordovaAppRateProvider.setPreferences(prefs)

    }, false);




    for (lang in translations) {
      $translateProvider.translations(lang, translations[lang]);
    }
    //  alert("APP JS Lang" + localStorage.getItem("language"));
    if (localStorage.getItem("language") == null || localStorage.getItem("language") == "null") {
      $translateProvider.preferredLanguage('ar');
    }
    else {
      console.log("Langggggg:::---- " + localStorage.getItem("language"));
      if (localStorage.getItem("language") == "en") {
        $translateProvider.preferredLanguage('en');
      }
      else {
        $translateProvider.preferredLanguage('ar');
      }
    }
    $translateProvider.useSanitizeValueStrategy('escape');
    $ionicConfigProvider.views.maxCache(0);
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
      .state('introscreen', {
        url: '/introscreen',
        cache: false,
        templateUrl: 'templates/introscreen.html',
        controller: 'introScreenCtrl'
      })
      .state('login', {
        /*resolve:{
          "check" : function($location, $window, state){
             alert("Introscreen Value--- " + localStorage.getItem("introscreens"));
            if($window.localStorage.getItem("introscreens") == null){
               alert("Introscreen INSIDERINTRO--- " + localStorage.getItem("introscreens"));
                    $state.go('/menuslider.menu'); 
              }
            else{
               alert("Introscreen INSIDER--- " + localStorage.getItem("introscreens"));
                     if($window.localStorage.getItem("userId") == null || localStorage.loggedIn == undefined){
                         localStorage.setItem("introscreens", true);
                         alert("Introscreen INSIDERLOGIN--- " + localStorage.getItem("introscreens"));
                        $location.url('/login');
                        }
                }      
         }
        },*/
        cache: false,
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })
      .state('advertisescreen', {
        url: '/advertisescreen',
        cache: false,
        templateUrl: 'templates/advertisescreen.html',
        controller: 'advertiseScreenCtrl'
      })
      .state('signUp', {
        cache: false,
        url: '/signUp',
        templateUrl: 'templates/signUp.html',
        controller: 'signUpCtrl',
        data: { requireLogin: true }
      })
      .state('termsandcondition', {
        cache: false,
        url: '/termsandcondition',
        templateUrl: 'templates/termsandcondition.html',
        controller: 'termsAndConditionCtrl',
        data: { requireLogin: true }
      })
      .state('menuslider', {
        url: '/menuslider',
        cache: false,
        abstract: true,
        templateUrl: 'templates/menuslider.html',
        controller: 'menuSliderCtrl'
      })
      .state('menuslider.menu', {
        /* resolve:{
             "check" : function($location, $window){
               var checkforuserdata = $window.localStorage.getItem("userFirstname");
           
               if(checkforuserdata == ""){
                       $location.url('/registerProfile'); 
                 }
               else{
                       alert("else menuuuu");
                        if($window.localStorage.getItem("userId") == null || localStorage.loggedIn == undefined){
                            localStorage.setItem("introscreens", true);
                           $location.url('/login');
                           }
                   }      
            }
           },*/
        url: '/menu',
        cache: false,
        views: {
          'menusliderContent': {
            templateUrl: 'templates/menu.html',
            controller: 'menuCtrl'
          }
        }
      })
      .state('clubmenu', {
        url: '/clubmenu',
        templateUrl: 'templates/clubmenu.html',
        controller: "clubMenuCtrl"
      })

      .state('createeditclubslidermenu', {
        url: '/createeditclubslidermenu',
        abstract: true,
        templateUrl: 'templates/createeditclubslidermenu.html',
        controller: 'createEditClubSliderMenuCtrl'
      })
      .state('createeditclubslidermenu.spCreateClub', {
        url: '/spCreateClub',
        views: {
          'spCreateClub': {
            templateUrl: 'templates/spCreateClub.html',
            controller: 'spCreateClubCtrl'
          }
        }
      })
      .state('createeditclubslidermenu.spCreatedClubList', {
        url: '/spCreatedClubList',
        views: {
          'spCreatedClubList': {
            templateUrl: 'templates/spCreatedClubList.html',
            controller: 'spCreatedClubListCtrl'
          }
        }
      })
      .state('spEditClub', {
        url: '/spEditClub:clubID',
        templateUrl: 'templates/spEditClub.html',
        controller: 'spEditClubCtrl'
      })
      .state('spclublist', {
        url: '/spclublist',
        templateUrl: 'templates/spclublist.html',
        controller: 'spClubListCtrl'
      })
      .state('spclubdetailss', {
        url: '/spclubdetailss/:clubID',
        templateUrl: 'templates/spclubdetailss.html',
        controller: 'spClubDetailssCtrl'
      })
      .state('matchmenu', {
        url: '/matchmenu',
        templateUrl: 'templates/matchmenu.html',
        controller: "matchMenuCtrl"
      })
      .state('twitteremailandcity', {
        url: '/twitteremailandcity',
        templateUrl: 'templates/twitteremailandcity.html',
        controller: "twitterEmailAndCityCtrl"
      })
      .state('fbcityinput', {
        url: '/fbcityinput',
        templateUrl: 'templates/fbcityinput.html',
        controller: "fbcityInputCtrl"
      })
      .state('plsentercity', {
        url: '/plsentercity',
        templateUrl: 'templates/plsentercity.html',
        controller: "plsentercityCityCtrl"
      })
      .state('offline', {
        url: '/offline',
        templateUrl: 'templates/offline.html',
        controller: "offlineCtrl"
      })
      .state('forgetpassword', {
        url: '/forgetpassword',
        templateUrl: 'templates/forgetpassword.html',
        controller: "forgetPasswordCtrl"
      })
      /*.state('profile', {
        url: '/profile',
        templateUrl: 'templates/profile.html',
        controller: "profileCtrl"
      })*/
      .state('clubslidermenu', {
        url: '/clubslidermenu',
        abstract: true,
        templateUrl: 'templates/clubslidermenu.html',
        controller: 'clubSliderCtrl'
      })
      /*.state('clubslidermenu.joinclub', {
         url: '/joinclub',
         views: {
           'joinclub': {
             templateUrl: 'templates/joinclub.html',
             controller: 'joinedClubCtrl'
           }
         }
       })*/
      .state('clubslidermenu.clubinyourarea', {
        url: '/clubinyourarea',
        views: {
          'clubinyourarea': {
            templateUrl: 'templates/clubinyourarea.html',
            controller: 'clubInYourAreaSliderCtrl'
          }
        }
      })
      .state('clubinyourarea', {
        url: '/clubinyourarea',
        templateUrl: 'templates/clubinyourarea.html',
        controller: 'clubInYourAreaSliderCtrl'
      })
      .state('clubinyourareadetails', {
        url: '/clubinyourareadetails/:clubID',
        templateUrl: 'templates/clubinyourareadetails.html',
        controller: 'clubInYourAreaDetailsCtrl'
      })
      .state('spmemberapprovallist', {
        url: '/spmemberapprovallist',
        templateUrl: 'templates/spmemberapprovallist.html',
        controller: 'spMemberApprovalListCtrl'
      })
      .state('matchlist', {
        url: '/matchlist',
        templateUrl: 'templates/matchlist.html',
        controller: 'matchlistMatchCtrl'
      })
      .state('matchlistdetails', {
        url: '/matchlistdetails/:matchID',
        templateUrl: 'templates/matchlistdetails.html',
        controller: 'matchlistdetailsMatchCtrl'
      })

      .state('memberlists', {
        url: '/memberlists/:clubID',
        templateUrl: 'templates/memberlists.html',
        controller: 'memberListsDetailsCtrl'
      })
      .state('clubinyourareamemberlists', {
        url: '/clubinyourareamemberlists/:clubID',
        templateUrl: 'templates/clubinyourareamemberlists.html',
        controller: 'clubinYourAreaMemberListsDetailsCtrl'
      })
      .state('playerdetails', {
        url: '/playerdetails/:playerID',
        templateUrl: 'templates/playerdetails.html',
        controller: 'playerDetailsCtrl'
      })
      .state('clubslidermenu.mostactiveclub', {
        url: '/mostactiveclub',
        views: {
          'menuContent': {
            templateUrl: 'templates/mostactiveclub.html',
            controller: 'mostActiveClubCtrl'
          }
        }
      })
      .state('clubslidermenu.mostfollowerinclub', {
        url: '/mostfollowerinclub',
        views: {
          'menuContent': {
            templateUrl: 'templates/mostfollowerinclub.html',
            controller: 'mostFollowersInClubCtrl'
          }
        }
      })
      .state('clubslidermenu.mostmembersinclub', {
        url: '/mostmembersinclub',
        views: {
          'menuContent': {
            templateUrl: 'templates/mostmembersinclub.html',
            controller: 'mostMembersInClubCtrl'
          }
        }
      })
      .state('matchslidermenu', {
        url: '/matchslidermenu',
        abstract: true,
        templateUrl: 'templates/matchslidermenu.html',
        controller: 'matchSlideCtrl'
      })
      /*.state('matchslidermenu.matchinyouarea', {
      url: '/matchinyouarea',
      views: {
        'matchMenuContent': {
          templateUrl: 'templates/matchinyouarea.html',
          controller: 'matchinyourSlideCtrl'
        }
      }
    })
    .state('matchslidermenu.yourmatchmember', {
        url: '/yourmatchmember',
        views: {
          'matchMenuContent': {
            templateUrl: 'templates/yourmatchmember.html',
            controller: 'yourmatchMemberSlideCtrl'
          }
        }
      })*/
      .state('matchslidermenu.matchlist', {
        url: '/matchlist',
        views: {
          'matchlist': {
            templateUrl: 'templates/matchlist.html',
            controller: 'matchlistMatchCtrl'
          }
        }
      })
      .state('matchslidermenu.mymatchscheduled', {
        url: '/mymatchscheduled',
        views: {
          'mymatchscheduled': {
            templateUrl: 'templates/mymatchscheduled.html',
            controller: 'myMatchScheduledMatchCtrl'
          }
        }
      })
      .state('matchslidermenu.mymatchpending', {
        url: '/mymatchpending',
        views: {
          'mymatchpending': {
            templateUrl: 'templates/mymatchpending.html',
            controller: 'myMatchPendingMatchCtrl'
          }
        }
      })
      .state('matchslidermenu.mymatchplayedddd', {
        url: '/mymatchplayedddd',
        views: {
          'mymatchplayedddd': {
            templateUrl: 'templates/mymatchplayedddd.html',
            controller: 'myMatchPlayeddddMatchCtrl'
          }
        }
      })
      .state('creatematchslidermenu', {
        url: '/creatematchslidermenu',
        abstract: true,
        templateUrl: 'templates/creatematchslidermenu.html',
        controller: 'createMatchSliderMenuCtrl'
      })
      .state('creatematchslidermenu.orgmatchcreatematches', {
        url: '/orgmatchcreatematches',
        views: {
          'orgmatchcreatematches': {
            templateUrl: 'templates/orgmatchcreatematches.html',
            controller: 'orgMatchCreateMatchesCtrl'
          }
        }
      })
      .state('creatematchslidermenu.orgmatcheditmatches', {
        url: '/orgmatcheditmatches',
        views: {
          'orgmatcheditmatches': {
            templateUrl: 'templates/orgmatcheditmatches.html',
            controller: 'orgMatchEditMatchesCtrl'
          }
        }
      })
      .state('orgmatchtoedited', {
        /*url: '/orgmatchtoedited:matchName:matchLocation:matchTimeHours:matchTimeMin:matchTime:matchDate:dayofDate:sportcenterName:matchOverview:matchID:clubID1:clubID2',*/
        url: '/orgmatchtoedited/:matchID',
        templateUrl: 'templates/orgmatchtoedited.html',
        controller: 'orgMatchtoEditedCtrl'
      })

      // Create Team & My Team
      .state('sppmatchslidermenu', {
        url: '/sppmatchslidermenu',
        abstract: true,
        templateUrl: 'templates/sppmatchslidermenu.html',
        controller: 'sppMatchSlideMenuCtrl'
      })
      /*.state('sppmatchslidermenu.sppmatchmyteam', {
         url: '/sppmatchmyteam',
         views: {
           'sppmatchmyteam': {
             templateUrl: 'templates/sppmatchmyteam.html',
             controller: 'sppMatchMyTeamCtrl'
           }
         }
       })*/
      .state('sppmatchmyteam', {
        url: '/sppmatchmyteam',
        templateUrl: 'templates/sppmatchmyteam.html',
        controller: 'sppMatchMyTeamCtrl'
      })
      .state('sppmatchmyteamlist', {
        url: '/sppmatchmyteamlist/:matchID:matchClubID',
        templateUrl: 'templates/sppmatchmyteamlist.html',
        controller: 'sppMatchMyTeamListCtrl'
      })
      /*.state('sppmatchslidermenu.sppmatchcreateteam', {
         url: '/sppmatchcreateteam',
         views: {
           'sppmatchcreateteam': {
             templateUrl: 'templates/sppmatchcreateteam.html',
             controller: 'sppMatchCreateTeamCtrl'
           }
         }
       })*/
      .state('sppmatchcreateteam', {
        url: '/sppmatchcreateteam',
        templateUrl: 'templates/sppmatchcreateteam.html',
        controller: 'sppMatchCreateTeamCtrl'
      })
      .state('sppmatchcreateteamlist', {
        url: '/sppmatchcreateteamlist/:matchID:matchClubID',
        templateUrl: 'templates/sppmatchcreateteamlist.html',
        controller: 'sppMatchCreateTeamListCtrl'
      })

      // Create Team & My Team
      //Start Add Result For Match

      .state('spaddresultlistmatchstatistics', {
        url: '/spaddresultlistmatchstatistics',
        templateUrl: 'templates/spaddresultlistmatchstatistics.html',
        controller: 'spAddResultlistMatchStatisticsCtrl'
      })
      .state('sppoverviewslidermenu', {
        url: '/sppoverviewslidermenu',
        abstract: true,
        templateUrl: 'templates/sppoverviewslidermenu.html',
        controller: 'sppOverviewMenuSlideCtrl'
      })
      .state('sppoverviewslidermenu.sppmatchoverview', {
        url: '/sppmatchoverview/:matchID',
        views: {
          'sppmatchoverview': {
            templateUrl: 'templates/sppmatchoverview.html',
            controller: 'sppMatchOverviewCtrl'
          }
        }
      })
      .state('sppoverviewslidermenu.sppmatchplayers', {
        //  url: '/matchoverview/:matchID',
        url: '/sppmatchplayers',
        views: {
          'sppmatchplayers': {
            templateUrl: 'templates/sppmatchplayers.html',
            controller: 'sppMatchPlayersCtrl'
          }
        }
      })
      .state('sppoverviewslidermenu.sppmatchratings', {
        url: '/sppmatchratings',
        views: {
          'sppmatchratings': {
            templateUrl: 'templates/sppmatchratings.html',
            controller: 'sppMatchRatingsCtrl'
          }
        }
      })

      .state('assignRatingFile', {
        url: '/assignRatingFile/:getUserID:getMatchID:getClubID:index',
        templateUrl: 'templates/assignRatingFile.html',
        controller: 'assignRatingFileCtrl'
      })

      //End Add Result For Match


      .state('mymatchplayed', {
        url: '/mymatchplayed',
        templateUrl: 'templates/mymatchplayed.html',
        controller: 'myMatchPlayedMatchCtrl'
      })
      .state('overviewslidermenu', {
        url: '/overviewslidermenu',
        abstract: true,
        templateUrl: 'templates/overviewslidermenu.html',
        controller: 'overviewmenuSlideCtrl'
      })
      .state('overviewslidermenu.matchoverview', {
        url: '/matchoverview/:matchID',
        views: {
          'matchoverview': {
            templateUrl: 'templates/matchoverview.html',
            controller: 'matchOverviewCtrl'
          }
        }
      })
      .state('overviewslidermenu.matchplayers', {
        //  url: '/matchoverview/:matchID',
        url: '/matchplayers',
        views: {
          'matchplayers': {
            templateUrl: 'templates/matchplayers.html',
            controller: 'matchPlayersCtrl'
          }
        }
      })
      .state('messageslidermenu', {
        url: '/messageslidermenu',
        abstract: true,
        templateUrl: 'templates/messageslidermenu.html',
        controller: 'messageSlideCtrl'
      })
      .state('messageslidermenu.inboxmessage', {
        url: '/inboxmessage',
        views: {
          'inboxmessage': {
            templateUrl: 'templates/inboxmessage.html',
            controller: 'inboxmessageSlideCtrl'
          }
        }
      })
      .state('inboxmessagedetails', {
        url: '/inboxmessagedetails/:messageChatID',
        templateUrl: 'templates/inboxmessagedetails.html',
        controller: 'inboxMessageDetailsCtrl'
      })
      .state('messagereplay', {
        url: '/messagereplay/:messageChatID',
        templateUrl: 'templates/messagereplay.html',
        controller: 'messageReplayCtrl'
      })
      .state('messageslidermenu.sentmessage', {
        url: '/sentmessage',
        views: {
          'sentmessage': {
            templateUrl: 'templates/sentmessage.html',
            controller: 'sentmessageSlideCtrl'
          }
        }
      })
      .state('sentmessagedetails', {
        url: '/sentmessagedetails/:messageID',
        templateUrl: 'templates/sentmessagedetails.html',
        controller: 'sentMessageDetailsCtrl'
      })
      .state('contacttosupervisor', {
        url: '/contacttosupervisor',
        templateUrl: 'templates/contacttosupervisor.html',
        controller: 'contactToSupervisorCtrl'
      })
      .state('registerProfile', {
        url: '/registerProfile',
        templateUrl: 'templates/registerProfile.html',
        controller: "registerProfilesCtrl"
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller: "settingsCtrl"
      })
      .state('menuslider.top-players', {
        url: '/top-players',
        views: {
          'menusliderContent': {
            templateUrl: 'templates/top-players.html',
            controller: 'topPlayersCtrl'
          }
        }
      })
      .state('menuslider.ranking', {
        url: '/ranking',
        views: {
          'menusliderContent': {
            templateUrl: 'templates/ranking.html',
            controller: 'rankingCtrl'
          }
        }
      })
      .state('menuslider.awards', {
        url: '/awards',
        views: {
          'menusliderContent': {
            templateUrl: 'templates/awards.html',
            controller: 'awardsCtrl'
          }
        }
      })
      .state('menuslider.top-clubs', {
        url: '/top-clubs',
        views: {
          'menusliderContent': {
            templateUrl: 'templates/top-clubs.html',
            controller: 'topClubsCtrl'
          }
        }
      })
      .state('menuslider.top-organizer', {
        url: '/top-organizer',
        views: {
          'menusliderContent': {
            templateUrl: 'templates/top-organizer.html',
            controller: 'topOrganizerCtrl'
          }
        }
      })
      .state('menuslider.myfollowers', {
        url: '/myfollowers',
        views: {
          'menusliderContent': {
            templateUrl: 'templates/myfollowers.html',
            controller: 'myFollowersCtrl'
          }
        }
      })
      .state('menuslider.myfollowing', {
        url: '/myfollowing',
        views: {
          'menusliderContent': {
            templateUrl: 'templates/myfollowing.html',
            controller: 'myFollowingCtrl'
          }
        }
      })
      .state('menuslider.clubsearchby', {
        url: '/clubsearchby',
        views: {
          'menusliderContent': {
            templateUrl: 'templates/clubsearchby.html',
            controller: 'clubSearchByCtrl'
          }
        }
      })
      .state('sportscenters', {
        url: '/sportscenters',
        templateUrl: 'templates/sportscenters.html',
        controller: "sportsCentersCtrl"
      })
      /*.state('menuslider.aboutusslidermenu', {
       url: '/aboutusslidermenu',
       abstract: true,
      views: {
         'menusliderContent': {
           templateUrl: 'templates/aboutusslidermenu.html',
           controller: 'aboutusslidermenuSlideCtrl'
         }
       }
     })*/
      .state('about', {
        url: '/about',
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
      })
      .state('menuslider.partnersadv', {
        url: '/partnersadv',
        views: {
          'menusliderContent': {
            templateUrl: 'templates/partnersadv.html',
            controller: 'partnersAdvCtrl'
          }
        }
      })
      .state('contacttoadmin', {
        url: '/contacttoadmin',
        templateUrl: 'templates/contacttoadmin.html',
        controller: 'contactToAdminCtrl'
      })
      .state('supervisormenuslider', {
        url: '/supervisormenuslider',
        cache: false,
        abstract: true,
        templateUrl: 'templates/supervisor/supervisormenuslider.html',
        controller: 'supervisorMenuSliderCtrl'
      })
      .state('supervisormenuslider.supervisormenu', {
        url: '/supervisormenu',
        cache: false,
        views: {
          'supervisormenusliderContent': {
            templateUrl: 'templates/supervisor/supervisormenu.html',
            controller: 'supervisorMenuCtrl'
          }
        }
      })
      .state('supervisormenuslider.spmyfollowers', {
        url: '/spmyfollowers',
        views: {
          'supervisormenusliderContent': {
            templateUrl: 'templates/supervisor/spmyfollowers.html',
            controller: 'spMyFollowersCtrl'
          }
        }
      })
      .state('supervisormenuslider.sptop-clubs', {
        url: '/sptop-clubs',
        views: {
          'supervisormenusliderContent': {
            templateUrl: 'templates/supervisor/sptop-clubs.html',
            controller: 'spTopClubsCtrl'
          }
        }
      })
      .state('supervisormenuslider.sptop-organizer', {
        url: '/sptop-organizer',
        views: {
          'supervisormenusliderContent': {
            templateUrl: 'templates/supervisor/sptop-organizer.html',
            controller: 'spTopOrganizerCtrl'
          }
        }
      })
      .state('supervisormenuslider.sptop-players', {
        url: '/sptop-players',
        views: {
          'supervisormenusliderContent': {
            templateUrl: 'templates/supervisor/sptop-players.html',
            controller: 'spTopPlayersCtrl'
          }
        }
      })
      .state('supervisormenuslider.spawards', {
        url: '/spawards',
        views: {
          'supervisormenusliderContent': {
            templateUrl: 'templates/supervisor/spawards.html',
            controller: 'spAwardsCtrl'
          }
        }
      })
      .state('supervisormenuslider.spcontacttoadmin', {
        url: '/spcontacttoadmin',
        views: {
          'supervisormenusliderContent': {
            templateUrl: 'templates/supervisor/spcontacttoadmin.html',
            controller: 'spcontactToAdminCtrl'
          }
        }
      })
      .state('supervisormenuslider.sppartnersadv', {
        url: '/sppartnersadv',
        views: {
          'supervisormenusliderContent': {
            templateUrl: 'templates/supervisor/sppartnersadv.html',
            controller: 'spPartnersAdvCtrl'
          }
        }
      })
      .state('spregisterProfile', {
        url: '/spregisterProfile',
        templateUrl: 'templates/supervisor/spregisterProfile.html',
        controller: "spRegisterProfilesCtrl"
      })
      .state('supervisorclubslidermenu', {
        url: '/supervisorclubslidermenu',
        abstract: true,
        templateUrl: 'templates/supervisor/supervisorclubslidermenu.html',
        controller: 'supervisorClubSliderCtrl'
      })
      .state('supervisorclubslidermenu.supervisorCreateClub', {
        url: '/supervisorCreateClub',
        views: {
          'supervisorCreateClub': {
            templateUrl: 'templates/supervisor/supervisorCreateClub.html',
            controller: 'supervisorCreateClubCtrl'
          }
        }
      })
      .state('supervisorclubslidermenu.supervisorclublist', {
        url: '/supervisorclublist',
        views: {
          'supervisorclublist': {
            templateUrl: 'templates/supervisor/supervisorclublist.html',
            controller: 'supervisorClubListCtrl'
          }
        }
      })
      .state('supervisorclubslidermenu.spmemberapprovallist', {
        url: '/spmemberapprovallist',
        views: {
          'spmemberapprovallist': {
            templateUrl: 'templates/supervisor/spmemberapprovallist.html',
            controller: 'spMemberApprovalListCtrl'
          }
        }
      })
      .state('spmemberlists', {
        url: '/spmemberlists/:clubID',
        templateUrl: 'templates/supervisor/spmemberlists.html',
        controller: 'spmemberListsDetailsCtrl'
      })
      .state('spplayerdetails', {
        url: '/spplayerdetails/:playerID',
        templateUrl: 'templates/supervisor/spplayerdetails.html',
        controller: 'spPlayerDetailsCtrl'
      })
      .state('spclubdetails', {
        url: '/spclubdetails/:clubID',
        templateUrl: 'templates/supervisor/spclubdetails.html',
        controller: 'spClubDetailsCtrl'
      })
      .state('spmatchslidermenu', {
        url: '/spmatchslidermenu',
        abstract: true,
        templateUrl: 'templates/supervisor/spmatchslidermenu.html',
        controller: 'spMatchSlideMenuCtrl'
      })
      .state('spmatchslidermenu.spmatchlist', {
        url: '/spmatchlist',
        views: {
          'spmatchlist': {
            templateUrl: 'templates/supervisor/spmatchlist.html',
            controller: 'spMatchlistMatchCtrl'
          }
        }
      })
      .state('spmatchslidermenu.spmatchmyteam', {
        url: '/spmatchmyteam',
        views: {
          'spmatchmyteam': {
            templateUrl: 'templates/supervisor/spmatchmyteam.html',
            controller: 'spMatchMyTeamCtrl'
          }
        }
      })
      .state('spmatchmyteamlist', {
        url: '/spmatchmyteamlist/:matchID:matchClubID',
        templateUrl: 'templates/supervisor/spmatchmyteamlist.html',
        controller: 'spMatchMyTeamListCtrl'
      })
      .state('spmatchslidermenu.spmatchcreateteam', {
        url: '/spmatchcreateteam',
        views: {
          'spmatchcreateteam': {
            templateUrl: 'templates/supervisor/spmatchcreateteam.html',
            controller: 'spMatchCreateTeamCtrl'
          }
        }
      })
      .state('spmatchcreateteamlist', {
        url: '/spmatchcreateteamlist/:matchID:matchClubID',
        templateUrl: 'templates/supervisor/spmatchcreateteamlist.html',
        controller: 'spMatchCreateTeamListCtrl'
      })
      .state('spmatchstatistics', {
        url: '/spmatchstatistics',
        templateUrl: 'templates/spmatchstatistics.html',
        controller: 'spMatchStatisticsCtrl'
      })
      .state('spoverviewslidermenu', {
        url: '/spoverviewslidermenu',
        abstract: true,
        templateUrl: 'templates/spoverviewslidermenu.html',
        controller: 'spOverviewMenuSlideCtrl'
      })
      .state('spoverviewslidermenu.spmatchoverview', {
        url: '/spmatchoverview/:matchID',
        views: {
          'spmatchoverview': {
            templateUrl: 'templates/spmatchoverview.html',
            controller: 'spMatchOverviewCtrl'
          }
        }
      })
      .state('spoverviewslidermenu.spmatchplayers', {
        url: '/spmatchplayers',
        views: {
          'spmatchplayers': {
            templateUrl: 'templates/spmatchplayers.html',
            controller: 'spMatchPlayersCtrl'
          }
        }
      })
      .state('spsportscenter', {
        url: '/spsportscenter',
        templateUrl: 'templates/supervisor/spsportscenter.html',
        controller: "spSportsCenterCtrl"
      })
      .state('spsettings', {
        url: '/spsettings',
        templateUrl: 'templates/supervisor/spsettings.html',
        controller: "spSettingsCtrl"
      })
      .state('spabout', {
        url: '/spabout',
        templateUrl: 'templates/supervisor/spabout.html',
        controller: 'spAboutCtrl'
      })
      .state('spmessageslidermenu', {
        url: '/spmessageslidermenu',
        abstract: true,
        templateUrl: 'templates/supervisor/spmessageslidermenu.html',
        controller: 'spMessageSlideCtrl'
      })
      .state('spmessageslidermenu.spinboxmessage', {
        url: '/spinboxmessage',
        views: {
          'spinboxmessage': {
            templateUrl: 'templates/supervisor/spinboxmessage.html',
            controller: 'spInboxmessageSlideCtrl'
          }
        }
      })
      .state('spinboxmessagedetails', {
        url: '/spinboxmessagedetails/:messageChatID',
        templateUrl: 'templates/supervisor/spinboxmessagedetails.html',
        controller: 'spInboxMessageDetailsCtrl'
      })
      .state('spmessagereplay', {
        url: '/spmessagereplay/:messageChatID',
        templateUrl: 'templates/supervisor/spmessagereplay.html',
        controller: 'spMessageReplayCtrl'
      })
      .state('spmessageslidermenu.spsentmessage', {
        url: '/spsentmessage',
        views: {
          'spsentmessage': {
            templateUrl: 'templates/supervisor/spsentmessage.html',
            controller: 'spSentmessageSlideCtrl'
          }
        }
      })
      .state('spsentmessagedetails', {
        url: '/spsentmessagedetails/:messageID',
        templateUrl: 'templates/supervisor/spsentmessagedetails.html',
        controller: 'spSentMessageDetailsCtrl'
      })
      .state('organizermenuslider', {
        url: '/organizermenuslider',
        cache: false,
        abstract: true,
        templateUrl: 'templates/organizer/organizermenuslider.html',
        controller: 'organizerMenuSliderCtrl'
      })
      .state('organizermenuslider.organizermenu', {
        url: '/organizermenu',
        cache: false,
        views: {
          'organizermenusliderContent': {
            templateUrl: 'templates/organizer/organizermenu.html',
            controller: 'organizerMenuCtrl'
          }
        }

      })
      .state('orgclubslidermenu', {
        url: '/orgclubslidermenu',
        abstract: true,
        templateUrl: 'templates/organizer/orgclubslidermenu.html',
        controller: 'orgClubSliderCtrl'
      })
      .state('orgclubslidermenu.orgcreateclub', {
        url: '/orgcreateclub',
        views: {
          'orgcreateclub': {
            templateUrl: 'templates/organizer/orgcreateclub.html',
            controller: 'orgCreateClubCtrl'
          }
        }
      })
      .state('orgclubslidermenu.orgclublist', {
        url: '/orgclublist',
        views: {
          'orgclublist': {
            templateUrl: 'templates/organizer/orgclublist.html',
            controller: 'orgClubListCtrl'
          }
        }
      })
      .state('orgclubslidermenu.orgmemberapprovallist', {
        url: '/orgmemberapprovallist',
        views: {
          'orgmemberapprovallist': {
            templateUrl: 'templates/organizer/orgmemberapprovallist.html',
            controller: 'orgMemberApprovalListCtrl'
          }
        }
      })
      .state('orgmemberlists', {
        url: '/orgmemberlists/:clubID',
        templateUrl: 'templates/organizer/orgmemberlists.html',
        controller: 'orgMemberListsDetailsCtrl'
      })
      .state('orgplayerdetails', {
        url: '/orgplayerdetails/:playerID',
        templateUrl: 'templates/organizer/orgplayerdetails.html',
        controller: 'orgPlayerDetailsCtrl'
      })
      .state('orgclubdetails', {
        url: '/orgclubdetails/:clubID',
        templateUrl: 'templates/organizer/orgclubdetails.html',
        controller: 'orgClubDetailsCtrl'
      })
      .state('orgmatchslidermenu', {
        url: '/orgmatchslidermenu',
        abstract: true,
        templateUrl: 'templates/organizer/orgmatchslidermenu.html',
        controller: 'orgMatchSlideMenuCtrl'
      })
      .state('orgmatchslidermenu.orgmatchlist', {
        url: '/orgmatchlist',
        views: {
          'orgmatchlist': {
            templateUrl: 'templates/organizer/orgmatchlist.html',
            controller: 'orgMatchlistMatchCtrl'
          }
        }
      })
      .state('orgmatchslidermenu.orgmatchcreatematch', {
        url: '/orgmatchcreatematch',
        views: {
          'orgmatchcreatematch': {
            templateUrl: 'templates/organizer/orgmatchcreatematch.html',
            controller: 'orgMatchCreateMatchCtrl'
          }
        }
      })
      .state('orgmatchslidermenu.orgmatchmymatch', {
        url: '/orgmatchmymatch',
        views: {
          'orgmatchmymatch': {
            templateUrl: 'templates/organizer/orgmatchmymatch.html',
            controller: 'orgMatchMyMatchCtrl'
          }
        }
      })
      .state('statisticsmenu', {
        url: '/statisticsmenu',
        templateUrl: 'templates/statisticsmenu.html',
        controller: "statisticsMenuCtrl"
      })
      .state('rankingstatistics', {
        url: '/rankingstatistics',
        templateUrl: 'templates/rankingstatistics.html',
        controller: 'rankingStatisticsCtrl'
      })
      .state('toporganizerstatistics', {
        url: '/toporganizerstatistics',
        templateUrl: 'templates/toporganizerstatistics.html',
        controller: 'topOrganizerStatisticsCtrl'

      })
      .state('topplayersstatistics', {
        url: '/topplayersstatistics',
        templateUrl: 'templates/topplayersstatistics.html',
        controller: 'topPlayerssStatisticsCtrl'
      })
      .state('topclubsstatistics', {
        templateUrl: 'templates/topclubsstatistics.html',
        controller: 'topClubsStatisticsCtrl'
      })
      .state('clubsearchbyclubmenu', {
        templateUrl: 'templates/clubsearchbyclubmenu.html',
        controller: 'clubSearchByClubMenuCtrl'
      })

      /* .state('spmatchmyteamlist', {
          url: '/spmatchmyteamlist/:matchID:matchClubID',
          templateUrl: 'templates/supervisor/spmatchmyteamlist.html',
          controller: 'spMatchMyTeamListCtrl'
      })
       .state('spmatchslidermenu.spmatchcreateteam', {
          url: '/spmatchcreateteam',
          views: {
            'spmatchcreateteam': {
              templateUrl: 'templates/supervisor/spmatchcreateteam.html',
              controller: 'spMatchCreateTeamCtrl'
            }
          }
        })
       .state('spmatchcreateteamlist', {
          url: '/spmatchcreateteamlist/:matchID:matchClubID',
          templateUrl: 'templates/supervisor/spmatchcreateteamlist.html',
          controller: 'spMatchCreateTeamListCtrl'
      }) */

      ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
    //  $urlRouterProvider.otherwise('/menuslider.menu');
  })


  .filter('noappid', function () {
    return function (val) {
      var val = val.replace("appid", "");
      return val;
    };
  })

  .filter('url', function ($filter) {
    return function (val) {
      if (val) {
        var splitval = val.split(",");
        return splitval[0];
      }
    };
  })


  .filter('serverimage', function () {
    return function (image) {
      if (image && image != null) {
        var start = image.substr(0, 4);

        if (start == "http") {
          return image;
        }

        return adminimage + image;
      } else {
        return undefined;
      }
    };
  })
  .filter('profileimg', function () {
    return function (image) {
      if (image && image != null) {
        var start = image.substr(0, 4);

        if (start == "http") {
          return image;
        }

        return adminimage + image;
      } else {
        return "img/user.jpg";
      }
    };
  })

  .filter('htmlToPlaintext', function () {
    return function (text) {
      return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  });


var formvalidation = function (allvalidation) {
  var isvalid2 = true;
  for (var i = 0; i < allvalidation.length; i++) {
    if (allvalidation[i].field == "" || !allvalidation[i].field) {
      allvalidation[i].validation = "ng-dirty";
      isvalid2 = false;
    } else {
      allvalidation[i].validation = "";
    }
  }
  return isvalid2;
}

var translations = {
  "en": {
    "loginn": "Login",
    "khalijipro": "KhalijiPro",
    "edit_profile": "Edit Profile",
    "ranking_point": "Ranking",
    "sportcenter": "Sports Centers",
    "surface": "Surface",
    "covering": "Covering",
    "rankings": "Rankings",
    "awards": "Awards",
    "manofthematch": "Man of The Match",
    "top_organizer": "Top Organizers",
    "top_player": "Top Players",
    "top_club": "Top Clubs",
    "my_followers": "My Followers",
    "my_following": "Following",
    "search_club": "Search Clubs",
    "partners": "Partners",
    "logout": "Logout",
    "menu": "Menu",
    "lang": "Language",//Start Setting//
    "settings": "Settings",
    "shareapp": "Share App",
    "rateapp": "Rate App",
    "aboutapp": "About Khaliji PRO",
    "contactadmin": "Contact Admin",//End Setting//
    "club": "Club",//Start Club *** Create Club//
    "createclub": "Create Club",
    "clubname": "Club Name",
    "cluboverview": "Club Overview",
    "mycreatedclub": "My Created Club",
    "edit": "Edit",
    "members": "Members",
    "playedmatch": "Played",
    "won": "Won",
    "tied": "Tied",
    "lost": "Lost",
    "editclub": "Edit Club",
    "clubdetail": "Club Detail",
    "overview": "Overview",
    "comments": "Comments",
    "vs": "VS",
    "clublist": "Club List",
    "memberlist": "Member List",
    "myclub": "My Club",
    "matchnotplayed": "Match Not Played",
    "unfollow": "Unfollow",
    "follow": "Follow",
    "memberapproval": "Members Approval",//End Club *** Create Club//
    "match": "Match",//Start Match//
    "nearbymatch": "Near By Matches",
    "matchdetails": "Match Details",
    "matchcreatedby": "Match Created By",
    "scheduled": "SCHEDULED",
    "pending": "PENDING",
    "played": "PLAYED",
    "matchstatus": "Match Status",
    "creatematch": "Create Match",
    "matchname": "Match Name",
    "clubone": "Club One (My Club)",
    "clubtwo": "Club Two (Opponent Club)",
    "matchdate": "Match Date",
    "matchtime": "Match Time",
    "selectsportcenter": "Select Sport Center",
    "matchoverview": "Match Overview",
    "creatematch": "Create Match",
    "mymatch": "My Match",
    "matchresultlist": "Match Result List",
    "resultoverview": "Result Overview",
    "resultratings": "Result Rating",
    "addresulttab": "ADD RESULT",
    "addawardtab": "ADD AWARD",
    "addratingtab": "ADD RATING",
    "addresult": "Add Result",
    "tie": "Tie",
    "reset": "Reset",
    "matchplayed": "Match Played",
    "createteam": "Create Team",
    "create": "Create",
    "createteamlist": "Create Team List",
    "teamfor": "Team For",
    "createteamfor": "Create Team For",
    "teamname": "Team Name",
    "createteam": "Create Team",
    "myteam": "My Team",
    "view": "View",
    "myteamlist": "My Team List",//End Match//
    "inboxtab": "INBOX",//Start Message
    "sentboxtab": "SENTBOX",
    "message": "Message",
    "inboxdetails": "Inbox Details",
    "from": "From",
    "to": "To",
    "date": "Date",
    "sentdetails": "Sent Details",
    "tome": "to me",
    "messagereplay": "Message Replay",
    "sendreplay": "Send Reply",//End Message
    "matchstatistic": "Match Statistics",
    "statistics": "Statistics",
    "overviewtab": "OVERVIEW",
    "matchplayerstab": "MATCH PLAYERS",
    "about": "About",
    "contacttoadmin": "Contact Admin",
    "yourname": "Your Name",
    "subject": "Subject",
    "email": "Email",
    "comments": "Comments",
    "sendrequest": "Send Request",
    "ranking": "Ranking",
    "orgareorging": "Organizers are organising",
    "gamthawillbplayby": "games that will be played by",
    "playerrankingline": "players!",
    "yourperrankis": "Your personal ranking is",
    "outof": "Out Of",
    "youhaorgmatch": "You have organised matches",
    "youhacreaclubs": "You have created clubs",
    "toporg": "Top Organizer",
    "noofmatorg": "No. of Match Organized",
    "topplayerss": "Top Players",
    "topclubs": "Top Clubs",
    "myfollowers": "My Followers",
    "aasignratingfile": "Assign Rating",
    "aasignrates": "Add Rate",
    "playerdetails": "Player Details",
    "nationality": "Nationality",
    "favpostion": "Favourite Position",
    "dob": "Date of Birth",
    "favclub": "Favourite Club",
    "desc": "Description",
    "condition": "Condition",
    "searchby": "Search By",
    "clubinyoarea": "Clubs In Your Area",
    "partners": "Partners",
    "myprofile": "My Profile",
    "phonenumber": "Phone Number",
    "firstname": "First Name",
    "lastname": "Last Name",
    "selectcountry": "Select Country",
    "selectcity": "Select City",
    "selectfavclub": "Select Favourite Club",
    "selectfavpostion": "Select Favourite Position",
    "youcantaccess": "You Can\'t Access",//Controller Start
    "sorry": "Sorry!",
    "presagaintexit": "Press again to exit",
    "pressbacktoexit": "Press back button again to exit",
    "logintofb": "Logging in to Facebook",
    "loading": "Loading..",
    "congrats": "Congrats!",
    "sucessregwithfb": "Successfully Registered With Facebook!",
    "somewentwrontryaga": "Something Went Wrong Try Again!",
    "neterr": "Network Error!",
    "nonetavorseruna": "No Network available or Service unavailable",
    "loginfailed": "Login Failed!",
    "therwasaprobsigin": "There was a problem signing in!",
    "logintotwitter": "Logging in to Twitter...",
    "wrouserorpass": "Wrong Username or Password!",
    "sigupsuccess": "Signed Up Successfully!!",
    "usealrexist": "Username Already Exists!",
    "emailaddalrexist": "Email Address Already Exists!",
    "useandemailalrexist": "Username & Email Address Already Exists!",
    "plsentusernm": "Please Enter Username!",
    "alert": "Alert",
    "usermustconleasixch": "Username must contain at least 6 characters!",
    "plsentpass": "Please Enter Password!",
    "passmusbesixch": "Password must be 6 characters!",
    "passdosnotmatch": "Your Password Does Not Match",
    "plsentfirstname": "Please Enter First Name!",
    "plsentlastname": "Please Enter Last Name!",
    "plsentphonenum": "Please Enter Phone Number!",
    "plsentvalidphone": "Please Enter Valid Phonenumber",
    "plsentvalemail": "Please Enter Valid Email",
    "plsselectcity": "Please Select City",
    "plsseleyoucount": "Please Select Your Country",
    "plsselenationality": "Please Enter Nationality",
    "plsentdob": "Please Enter Date Of Birth",
    "plsselecfavclub": "Please Select Your Favourite Club",
    "plsselecfavposition": "Please Select Your Favourite Position",
    "plsentvalemailadd": "Please Enter Valid Email Address",
    "plsenttendigmobnum": "Please Enter Valid Ten Digit Mobile Number",
    "plsentdesc": "Please Enter Description",
    "plsentcondition": "Please Enter Condition",
    "successreg": "Successfully registered!",
    "oops": "Oops!",
    "usralreexist": "User Already Exist",
    "forgotpasss": "Forgot Password",
    "mailsent": "Mail Sent!",
    "linkpassrestemail": "Link for password reset has been emailed to you. Please check your email!",
    "youentwronuseremail": "You have Entered Wrong Username Or Email!",
    "plsentusremail": "Please Enter Username Or Email",
    "nointconn": "No internet connection.",
    "tryagain": "Try Again",
    "logout": "Logout",
    "areyousurelogout": "Are you sure you want to logout?",
    "cancel": "Cancel",
    "searcch": "Search",
    "loggingout": "Logging out...",
    "nocityavaiselecountry": "No city available for selected country!",
    "noclubselecity": "No clubs available for selected city!",
    "profileupdate": "Profile Update!",
    "profiupdatedsuccess": "Profile Updated Successfully!",
    "profphoto": "Profile Photo",
    "gallery": "Gallery",
    "camera": "Camera",
    "failed": "Failed!",
    "failedbecause": "Failed because",
    "profileimgupdate": "Profile Image Update!",
    "proimgupdsuccess": "Profile Image Updated Successfully!",
    "succeappclubgetmessapp": "Successfully Applied on Club",
    "ok": "OK",
    "youralreaapponthiclub": "You are Already Applied on This Club!",
    "successunfollow": "Successfully Unfollowed",
    "successfollowed": "Successfully Followed",
    "nomatchavail": "No matches available!",
    "success": "Success",
    "nomatchdetailsavail": "No Match Details Available!",
    "thernomatchavail": "There is no Match Scheduled Yet!",
    "thernopendmatchyet": "There is no Pending Match Yet!",
    "youhaacinoawarplyhard": "You Have Achieved No Awards. Keep Playing Hard!",
    "nofollowers": "No Followers!",
    "nofollowing": "No Followings!",
    "mailsentsuccess": "Mail Sent Successfully!",
    "contoadmin": "Contact To Admin",
    "plsflldata": "Please Fill All Data",
    "therwassomprobsendmail": "There Was Some Problem While Sending Mail",
    "areusuretiematch": "Are you sure you want to tie this match?",
    "successupdthresult": "Successfully Updated The Result",
    "plsfircrteabothclub": "Please First Create Team For Both Club",
    "please": "Please!",
    "selewinteam": "Select Winning Team!",
    "addresult": "Add Result",
    "areusurewantaddresult": "Are you sure you want to add result?",
    "matchntplayed": "Match yet not played!",
    "youmatchcretsuccess": "Your Match Created Successfully!",
    "editmatcch": "Edit Match",
    "therisnomatch": "There Is No Match!",
    "youmatcheditsuccess": "Your Match Is Edited Successfully!",
    "therinomatchcreteam": "There Is No Match To Create Team!",
    "rejected": "Rejected",
    "successapproved": "Successfully Approved",
    "youteamminoneorelevplgetappr": "Your Team Must Have Minimum 1 Or Maximum 11 Players To Get Approved !",
    "teamcreated": "Team Created!",
    "youteamcreasuccess": "Your Team Created Successfully!",
    "creatteaam": "Create Team",
    "therinoteam": "There Is No Team!",
    "yourrejected": "You are Rejected",
    "contactto": "Contact To",
    "selectnamee": "Select Name",
    "send": "Send",
    "youhavnomessge": "You Have No Message!",
    "replymailsentsuccess": "Reply To Mail Sent Successfully!",
    "plsuploadimg": "Please Upload Image!!",
    "plsentclunname": "Please Enter Club Name!",
    "plsenterclubovervw": "Please Enter Club Overview!",
    "clubnamalreexist": "Club Name Already Exist!",
    "clubcreatedd": "Club Created!",
    "clubeditedd": "Club Edited",
    "youclubcresuccesss": "Your Club Created Successfully!",
    "youclubeditedsuccesss": "Your Club Edited Successfully!",
    "clubicon": "Club Icon",
    "younotcreateclub": "You Have Not Created Any Club Yet!",
    "youhavnojoinclubyet": "You Have Not Join Any Club Yet!",
    "youdonplyerapp": "You Don\'t Have Any Player To Approve!",
    "termsandcond": "Terms and Condition",
    "yomusaccptterancontion": "You must have to accept terms and condition",
    "approvvved": "Approved",
    "joiin": "Join",
    "pendding": "Pending",
    "appprove": "Approve",
    "rejecct": "Reject",
    "notplayed": "Not Played",
    "tobeplayed": "Played",
    "signuup": "Sign Up",
    "usernaame": "Username",
    "paassword": "Password",
    "cnfpassword": "Confirm Password",
    "emaiaddr": "Email Address",
    "iagreewithe": "I agree with the",
    "termsancondi": "Terms and Condition",
    "createacccount": "Create Account",
    "usernamoremail": "Username or Email",
    "forgotpass": "Forgot Password?",
    "orloginwith": "Or Log In With",
    "donthavanacct": "Don't have an account?",
    "twitter": "Twitter",
    "faceboook": "Facebook",
    "getmewpasss": "Get New Password",
    "notopplayyeers": "No Top Players!",
    "skip": "Skip",
    "submitt": "Submit",
    "twitteremailcity": "Twitter Email City",
    "succaddrating": "Successfully Added Rating!"



  },
  "ar": {
    "loginn": "تسجيل الدخول",
    "khalijipro": "خليجي برو",
    "edit_profile": "تحديث الملف التعريفي",
    "ranking_point": "التقييم",
    "sportcenter": "المراكز الرياضية",
    "surface": "سطح",
    "covering": "تغطية",
    "rankings": "التقييمات",
    "awards": "الجوائز",
    "manofthematch": "جائزة احسن لاعب في المباراة",
    "top_organizer": "افضل المنظمين",
    "top_player": "افضل اللاعبين",
    "top_club": "افضل الاندية",
    "my_followers": "المتابعين",
    "my_following": "المتابعين لي",
    "search_club": "بحث عن الاندية",
    "partners": "رعاة التطبيق",
    "logout": "الخروج",
    "menu": "القائمة الرئيسية",
    "lang": "اختيار اللغة",
    "settings": "الاعدادات",
    "shareapp": "نشر التطبيق",
    "rateapp": "تقييم التطبيق",
    "aboutapp": "عن خليجي برو",
    "contactadmin": "اتصل بالمشرف",
    "club": "النادي",//Start Club *** Create Club//
    "createclub": "اضافة نادي",
    "clubname": "اسم النادي",
    "cluboverview": "معلومات حول النادي",
    "mycreatedclub": "أنديتي",
    "edit": "تحرير",
    "members": "أعضاء",
    "playedmatch": "لعب",
    "won": "فاز",
    "tied": "تعادل",
    "lost": "خسر",
    "editclub": "تحرير معلومات النادي",
    "clubdetail": "تفاصيل النادي",
    "overview": "معلومات عامة",
    "comments": "تعليقات",
    "vs": "ضد",
    "clublist": "قائمة اللاعبين",
    "memberlist": "قائمة أنديتي",
    "myclub": "انديتي",
    "matchnotplayed": "المباريات التي لم تلعب",
    "unfollow": "الغاء المتابعة",
    "follow": "متابعة",
    "memberapproval": "موافق على إضافة اللاعبين",//End Club *** Create Club//
    "match": "مباراة",//Start Match//
    "nearbymatch": "بالقرب من المباريات",
    "matchdetails": "تفاصيل المباراة",
    "matchcreatedby": "المباراة مقامة بواسطة",
    "scheduled": "تم تعيين زمنها",
    "pending": "في الانتظار",
    "played": "لعبت",
    "matchstatus": "حالة المباراة",
    "creatematch": "إنشاء مباراة",
    "matchname": "اسم المباراة",
    "clubone": "النادي الاول ( ناديك )",
    "clubtwo": "النادي الثاني ( النادي الخصم )",
    "matchdate": "تاريخ المباراة",
    "matchtime": "زمن المباراة",
    "selectsportcenter": "اختار المركز الرياضي",
    "matchoverview": "معلومات عن المباراة",
    "creatematch": "اقامة مباراة",
    "mymatch": "مباراياتي",
    "matchresultlist": "المباراة قائمة النتائج",
    "resultoverview": "نظرة عامة عن النتيجة",
    "resultratings": "نتيجة التصويت",
    "addresulttab": "اضافة نتيجة",
    "addawardtab": "أضف جائزة",
    "addratingtab": "أضف تصويت",
    "addresult": "اضافة نتيجة",
    "tie": "تعادل",
    "reset": "اعادة",
    "matchplayed": "المبارة لعبت",
    "createteam": "تشكيل فريق",
    "create": "إنشاء",
    "createteamlist": "إنشاء قائمة الفريق",
    "teamfor": "فريق ل",
    "createteamfor": "تشكيل فريق ل",
    "teamname": "اسم الفريق",
    "createteam": "تشكيل فريق",
    "myteam": "فريقي",
    "view": "مشاهدة",
    "myteamlist": "قائمة فرقي",//End Match//
    "inboxtab": "البريد الوارد",//Start Message
    "sentboxtab": "البريد المرسل",
    "message": "الرسالة",
    "inboxdetails": "تفاصيل البريد الوارد",
    "from": "من",
    "to": "إلى",
    "date": "تاريخ",
    "sentdetails": "أرسل التفاصيل",
    "tome": "إلي",
    "messagereplay": "إعادة الارسال",
    "sendreplay": "أرسل الرد",//End Message
    "matchstatistic": "إحصاءات المباراة",
    "statistics": "إحصاءات",
    "overviewtab": "معلومات عامة",
    "matchplayerstab": "لاعبي المبارة",
    "about": "حول",
    "contacttoadmin": "اتصل بالمشرف",
    "yourname": "اسمك",
    "subject": "الموضوع",
    "email": "البريد الإلكتروني",
    "comments": "تعليقات",
    "sendrequest": "ارسل طلب",
    "ranking": "التقييم",
    "orgareorging": "المنظمين الذين نظموا",
    "gamthawillbplayby": "المباريات التي لعبت بواسطة",
    "playerrankingline": "اللاعبين",
    "yourperrankis": "تقييمك الخاص هو",
    "outof": "من",
    "youhaorgmatch": "قمت بتنظيم مباريات",
    "youhacreaclubs": "قمت باضافة اندية",
    "toporg": "افضل منظم",
    "noofmatorg": "عدد المباريات المنظمة",
    "topplayerss": "إفضل اللاعبين",
    "topclubs": "افضل الاندية",
    "myfollowers": "المتابعون",
    "aasignratingfile": "تعيين تصويت",
    "aasignrates": "إضافة تقييم",
    "playerdetails": "تفاصيل عن اللاعب",
    "nationality": "الجنسية",
    "favpostion": "موقع اللعب المفضل لك",
    "dob": "تاريخ الميلاد",
    "favclub": "فريقك المفضل",
    "desc": "التفاصيل",
    "condition": "الحالة",
    "searchby": "بحث عن طريق",
    "clubinyoarea": "الأندية المتاحة في منطقتك",
    "partners": "رعاة التطبيق",
    "myprofile": "الملف التعريفي",
    "phonenumber": "رقم الجوال",
    "firstname": "الاسم الاول",
    "lastname": "اكتب اسم العائلة",
    "selectcountry": "حدد الدولة",
    "selectcity": "اختر مدينة",
    "selectfavclub": "اختر النادي المفضل لديك",
    "selectfavpostion": "تحديد موقع اللعب المفضل لديك",
    "youcantaccess": "لا يمكنك الدخول",//Controller Start
    "sorry": "نأسف !",
    "presagaintexit": "اضغط مرة أخرى للخروج",
    "pressbacktoexit": "اضغط زر العودة مرة أخرى للخروج",
    "logintofb": "تسجيل الدخول إلى الفيسبوك",
    "loading": "جار التحميل..",
    "congrats": "مبروك!",
    "sucessregwithfb": "تم التسجيل بنجاح من خلال الفيسبوك",
    "somewentwrontryaga": "حدث خطأ ما حاول مرة أخرى!",
    "neterr": "خطأ في الاتصال بالانترنت",
    "nonetavorseruna": "لا يوجد انترنت لديك",
    "loginfailed": "فشل تسجيل الدخول!",
    "therwasaprobsigin": "هناك مشكلة في الولوج الى البريد الالكتروني!",
    "logintotwitter": "تسجيل الدخول إلى تويتر ...",
    "wrouserorpass": "اسم المستخدم أو كلمة المرور خاطئة",
    "sigupsuccess": "تم التسجيل بنجاح",
    "usealrexist": "اسم المستخدم موجود بالفعل",
    "emailaddalrexist": "عنوان البريد الإلكتروني موجود بالفعل",
    "useandemailalrexist": "اسم المستخدم وعنوان البريد الإلكتروني تم ادخالهما من قبل",
    "plsentusernm": "الرجاء إدخال اسم المستخدم",
    "alert": "تحذير",
    "usermustconleasixch": "يجب أن يحتوي على اسم المستخدم 6 أحرف على الأقل",
    "plsentpass": "الرجاء إدخال كلمة المرور",
    "passmusbesixch": "يجب أن تكون كلمة المرور 6 أحرف",
    "passdosnotmatch": "كلمة المرور الخاصة بك واعادتها غير مطابقة",
    "plsentfirstname": "الرجاء إدخال الاسم الأول",
    "plsentlastname": "يرجى إدخال اسم العائلة",
    "plsentphonenum": "يرجى إدخال رقم الجوال",
    "plsentvalidphone": "الرجاء إدخال صالحة رقم الهاتف",
    "plsentvalemail": "الرجاء إدخال بريد إلكتروني صحيح",
    "plsselectcity": "الرجاء اختيار المدينة",
    "plsseleyoucount": "رجاء اختر بلدك",
    "plsselenationality": "الرجاء إدخال الجنسية",
    "plsentdob": "يرجى إدخال تاريخ الميلاد",
    "plsselecfavclub": "الرجاء اختر ناديك المفضل",
    "plsselecfavposition": "الرجاء اختيار موقع اللعب المفضل لديك",
    "plsentvalemailadd": "الرجاء إدخال عنوان بريد إلكتروني لك",
    "plsenttendigmobnum": "الرجاء إدخال رقم الجوال",
    "plsentdesc": "الرجاء إدخال الوصف",
    "plsentcondition": "الرجاء إدخال الحالة",
    "successreg": "سجلت بنجاح",
    "oops": "عفوا !",
    "usralreexist": "اسم المستخدم موجود",
    "forgotpasss": "هل نسيت كلمة المرور ؟",
    "mailsent": "تم إرسال البريد",
    "linkpassrestemail": "تم ارسال رابط استعادة كلمة المرور عير البريد الالكتروني",
    "youentwronuseremail": "لقد ادخلت اسم مستخدم أو بريد الكتروني خاطئ",
    "plsentusremail": "الرجاء إدخال اسم المستخدم أو البريد الإلكتروني",
    "nointconn": "لا يوجد اتصال بالانترنت.",
    "tryagain": "حاول ثانية",
    "logout": "الخروج",
    "areyousurelogout": "هل انت متأكد انك تريد الخروج ؟",
    "cancel": "إلغاء",
    "searcch": "البحث",
    "loggingout": "تسجيل الخروج",
    "nocityavaiselecountry": "لا توجد مدينة متاحة للدولة المحددة",
    "noclubselecity": "لا توجد نوادي متاحة للمدينة المختارة",
    "profileupdate": "الملف الشخصي محدث",
    "profiupdatedsuccess": "تم تحديث الملف الشخصي بنجاح",
    "profphoto": "صورة الملف الشخصي",
    "gallery": "معرض الصور",
    "camera": "الة تصوير",
    "failed": "فشل",
    "failedbecause": "فشل للاتي",
    "profileimgupdate": "تم تحديث صورة الملف الشخصي",
    "proimgupdsuccess": "تم رفع الصورة الشخصية بنجاح",
    "succeappclubgetmessapp": "تم الانضمام الى النادي بنجاح",
    "ok": "حسنا",
    "youralreaapponthiclub": "أنت بالفعل منضم لهذا النادي",
    "successunfollow": "تم الغاء المتابعة",
    "successfollowed": "تمت المتابعة بنجاح",
    "nomatchavail": "لا توجد مباريات متاحة",
    "success": "نجاح",
    "nomatchdetailsavail": "لا توجد تفاصيل للمبارة متاحة حالياً",
    "thernomatchavail": "لم يتم عمل جدولة لاي مبارة بعد",
    "thernopendmatchyet": "لا توجد مباريات حالياً",
    "youhaacinoawarplyhard": "لم تقم بكسب أي جوائز عليك اللعب بقوة في المباريات القادمة",
    "nofollowers": "لا يوجد لاعبين تتابعهم حالياً",
    "nofollowing": "لا يوجد متابعين لك حالياً",
    "mailsentsuccess": "تم إرسال البريد بنجاح",
    "contoadmin": "الاتصال بالمشرف",
    "plsflldata": "يرجى ملء جميع البيانات",
    "therwassomprobsendmail": "حصلت بعض المشاكل أثناء إرسال البريد",
    "areusuretiematch": "هل فعلاً تود جعل نتيجة المباراة تعادل ؟",
    "successupdthresult": "تم تحديث النتيجة بنجاح",
    "plsfircrteabothclub": "نرجو منك أولاً إنشاء فرق للناديين",
    "please": "من فضلك",
    "selewinteam": "تحديد الفريق الفائز",
    "addresult": "اضافة نتيجة",
    "areusurewantaddresult": "هل أنت متأكد أنك تريد إضافة النتيجة؟",
    "matchntplayed": "المبارة لم تلعب حتى الآن",
    "youmatchcretsuccess": "تم إنشاء مباراتك بنجاح",
    "editmatcch": "تحديث معلومات المباراة",
    "therisnomatch": "لا توجد مباريات حالياً",
    "youmatcheditsuccess": "تم تحديث معلومات المباراة الخاص بك بنجاح",
    "therinomatchcreteam": "لا توجد هنالك مباراة حتى يتم تشكيل فريق لها ",
    "rejected": "تم رفضه",
    "successapproved": "تمت الموافقة",
    "youteamminoneorelevplgetappr": "فريقك يجب أن يكون فيه لاعب واحد على الأقل و أقصى عدد 11 لاعب للحصول على الموافقة",
    "teamcreated": "تم إنشاء الفريق الآن",
    "youteamcreasuccess": "تم إنشاء فريقك بنجاح",
    "creatteaam": "إنشاء فريق",
    "therinoteam": "لا يوجد أي فريق الآن",
    "yourrejected": "تم الرفض",
    "contactto": "الاتصال ب",
    "selectnamee": "حدد اسم",
    "send": "إرسال",
    "youhavnomessge": "لا يوجد لديك رسالة الآن",
    "replymailsentsuccess": "تم الرد على البريد المرسل اليك",
    "plsuploadimg": "يرجى تحميل صورة ",
    "plsentclunname": "الرجاء إدخال اسم النادي",
    "plsenterclubovervw": "الرجاء إدخال معلومات عامة عن النادي",
    "clubnamalreexist": "موجود نادي بنفس الإسم الرجاء اختيار إسم آخر",
    "clubcreatedd": "تم إنشاء النادي",
    "clubeditedd": "تم تحديث معلومات النادي",
    "youclubcresuccesss": "تم إنشاء ناديك بنجاح",
    "youclubeditedsuccesss": "تم تحديث معلومات ناديك بنجاح",
    "clubicon": "أيقونة النادي",
    "younotcreateclub": "لم تقم بإنشاء أي نادي حتى الآن!",
    "youhavnojoinclubyet": "لم تنضم لأي نادي حتى الآن",
    "youdonplyerapp": "لا يوجد لاعبين في انتظار الموافقة الان",
    "termsandcond": "أحكام وشروط",
    "yomusaccptterancontion": "يجب عليك أن تقبل الشروط والأحكام",
    "approvvved": "تمت الموافقة",
    "joiin": "انضم",
    "pendding": "إنتظار",
    "appprove": "موافقة",
    "rejecct": "رفض",
    "notplayed": "لم تلعب",
    "tobeplayed": "لعبت",
    "signuup": "تسجيل",
    "usernaame": "اسم المستخدم",
    "paassword": "كلمه المرور",
    "cnfpassword": "كلمه المرور",
    "emaiaddr": "عنوان البريد الإلكتروني",
    "iagreewithe": "وأنا أتفق مع",
    "termsancondi": "أحكام وشروط",
    "createacccount": "إنشاء حساب",
    "usernamoremail": "اسم المستخدم أو البريد الالكتروني",
    "forgotpass": "هل نسيت كلمة المرور؟",
    "orloginwith": "أو تسجيل الدخول باستخدام",
    "donthavanacct": "ليس لديك حساب ؟",
    "twitter": "تويتر",
    "faceboook": "فيس بوك",
    "getmewpasss": "احصل على كلمة سر جديدة",
    "notopplayyeers": "لا يوجد لاعبين",
    "skip": "تخطى",
    "submitt": "تنفيذ",
    "twitteremailcity": "المدينة في حساب تويتر",
    "succaddrating": "تم إضافة التقييم بنجاح"


  }
}
