angular.module('starter.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
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
           alert("Introscreen INSIDER--- " + localStorage.getItem("introscreens"));
                $state.go('/menuslider.menu'); 
          }
        else{
                 if($window.localStorage.getItem("userId") == null || localStorage.loggedIn == undefined){
                     localStorage.setItem("introscreens", true);
                    $location.url('/login');
                    }
            }      
     }
    },*/
    url: '/login',
    cache: false,
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
    url: '/signUp',
    templateUrl: 'templates/signUp.html',
    controller: 'signUpCtrl'
  })
   .state('menuslider.menu', {
 /* resolve:{
      "check" : function($location, $window){
        if($window.localStorage.getItem("introscreens") == null){
                $location.url('/introscreen'); 
          }
        else{
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
  .state('twitteremailandcity', {
    url: '/twitteremailandcity',
    templateUrl: 'templates/twitteremailandcity.html',
    controller: "twitterEmailAndCityCtrl" 
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
  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: "profileCtrl"
  })
   .state('clubslidermenu', {
    url: '/clubslidermenu',
    abstract: true,
    templateUrl: 'templates/clubslidermenu.html',
    controller: 'clubSliderCtrl'
  })
   .state('clubslidermenu.joinclub', {
      url: '/joinclub',
      views: {
        'joinclub': {
          templateUrl: 'templates/joinclub.html',
          controller: 'joinedClubCtrl'
        }
      }
    })
    .state('clubslidermenu.clubinyourarea', {
    url: '/clubinyourarea',
    views: {
      'clubinyourarea': {
        templateUrl: 'templates/clubinyourarea.html',
        controller: 'clubInYourAreaSliderCtrl'
      }
    }
  })
 .state('clubinyourareadetails', {
      url: '/clubinyourareadetails/:clubID',
      templateUrl: 'templates/clubinyourareadetails.html',
      controller: 'clubInYourAreaDetailsCtrl'
    })
  .state('memberlists', {
      url: '/memberlists/:clubID',
      templateUrl: 'templates/memberlists.html',
      controller: 'memberListsDetailsCtrl'
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
          controller: 'mostFollowerInClubCtrl'
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
   /* .state('matchslidermenu.matchinyouarea', {
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
      views:{
        'matchplayers':{
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
 .state('menuslider.top-players', {
      url: '/top-players',
      views: {
        'menusliderContent': {
          templateUrl: 'templates/top-players.html',
          controller: 'topPlayersCtrl'
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
  .state('playerdetails', {
      url: '/playerdetails/:currentUserID:playerID',
      templateUrl: 'templates/playerdetails.html',
      controller: 'playerDetailsCtrl'
   })
   .state('sportscenter', {
    url: '/sportscenter',
    templateUrl: 'templates/sportscenter.html',
    controller: "sportsCenterCtrl"
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
    .state('menuslider.contacttoadmin', {
      url: '/contacttoadmin',
      views: {
        'menusliderContent': {
          templateUrl: 'templates/contacttoadmin.html',
          controller: 'contactToAdminCtrl'
        }
      }
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
 
    ;
$urlRouterProvider.otherwise('/login');
}) 