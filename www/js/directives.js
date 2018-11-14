angular.module('starter.directives', [])



.directive('tabsSwipable','focusMe', ['$ionicGesture', function($ionicGesture,$timeout) {
    return {

      //Club Swipe
      restrict: 'A',
      require: 'ionTabs',
      link: function(scope, elm, attrs, clubSliderCtrl) {
        var onSwipeLeft = function() {
          var target = clubSliderCtrl.selectedIndex() + 1;
          if (target < clubSliderCtrl.tabs.length) {
            scope.$apply(clubSliderCtrl.select(target));
          }
        };
        var onSwipeRight = function() {
          var target = clubSliderCtrl.selectedIndex() - 1;
          if (target >= 0) {
            scope.$apply(clubSliderCtrl.select(target));
          }
        };

        var swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm)
          .on('swiperight', onSwipeRight);
        scope.$on('$destroy', function() {
          $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
          $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
        });
      },

      //Match Swipe
      restrict: 'A',
      require: 'ionTabs',
      link: function(scope, elm, attrs, matchSlideCtrl) {
        var onSwipeLeft = function() {
          var target = matchSlideCtrl.selectedIndex() + 1;
          if (target < matchSlideCtrl.tabs.length) {
            scope.$apply(matchSlideCtrl.select(target));
          }
        };
        var onSwipeRight = function() {
          var target = matchSlideCtrl.selectedIndex() - 1;
          if (target >= 0) {
            scope.$apply(matchSlideCtrl.select(target));
          }
        };

        var swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm)
          .on('swiperight', onSwipeRight);
        scope.$on('$destroy', function() {
          $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
          $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
        });
      },

      //Message Swipe
      restrict: 'A',
      require: 'ionTabs',
      link: function(scope, elm, attrs, messageSlideCtrl) {
        var onSwipeLeft = function() {
          var target = messageSlideCtrl.selectedIndex() + 1;
          if (target < messageSlideCtrl.tabs.length) {
            scope.$apply(messageSlideCtrl.select(target));
          }
        };
        var onSwipeRight = function() {
          var target = messageSlideCtrl.selectedIndex() - 1;
          if (target >= 0) {
            scope.$apply(messageSlideCtrl.select(target));
          }
        };

        var swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm)
          .on('swiperight', onSwipeRight);
        scope.$on('$destroy', function() {
          $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
          $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
        });
      },

      //ABOUT US Swipe
       restrict: 'A',
      require: 'ionTabs',
      link: function(scope, elm, attrs, aboutusslidermenuSlideCtrl) {
        var onSwipeLeft = function() {
          var target = aboutusslidermenuSlideCtrl.selectedIndex() + 1;
          if (target < aboutusslidermenuSlideCtrl.tabs.length) {
            scope.$apply(aboutusslidermenuSlideCtrl.select(target));
          }
        };
        var onSwipeRight = function() {
          var target = aboutusslidermenuSlideCtrl.selectedIndex() - 1;
          if (target >= 0) {
            scope.$apply(aboutusslidermenuSlideCtrl.select(target));
          }
        };

        var swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm)
          .on('swiperight', onSwipeRight);
        scope.$on('$destroy', function() {
          $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
          $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
        });
      },

      //Match OverView Swipe
       restrict: 'A',
      require: 'ionTabs',
      link: function(scope, elm, attrs, overviewmenuSlideCtrl) {
        var onSwipeLeft = function() {
          var target = overviewmenuSlideCtrl.selectedIndex() + 1;
          if (target < overviewmenuSlideCtrl.tabs.length) {
            scope.$apply(overviewmenuSlideCtrl.select(target));
          }
        };
        var onSwipeRight = function() {
          var target = overviewmenuSlideCtrl.selectedIndex() - 1;
          if (target >= 0) {
            scope.$apply(overviewmenuSlideCtrl.select(target));
          }
        };

        var swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm)
          .on('swiperight', onSwipeRight);
        scope.$on('$destroy', function() {
          $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
          $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
        });
      },

      //SuperVisor ClubSlider
      restrict: 'A',
      require: 'ionTabs',
      link: function(scope, elm, attrs, supervisorClubSliderCtrl) {
        var onSwipeLeft = function() {
          var target = supervisorClubSliderCtrl.selectedIndex() + 1;
          if (target < supervisorClubSliderCtrl.tabs.length) {
            scope.$apply(supervisorClubSliderCtrl.select(target));
          }
        };
        var onSwipeRight = function() {
          var target = supervisorClubSliderCtrl.selectedIndex() - 1;
          if (target >= 0) {
            scope.$apply(supervisorClubSliderCtrl.select(target));
          }
        };

        var swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm)
          .on('swiperight', onSwipeRight);
        scope.$on('$destroy', function() {
          $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
          $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
        });
      },
        //SuperVisor ClubSlider

      //Supervisor Match Swipe
      restrict: 'A',
      require: 'ionTabs',
      link: function(scope, elm, attrs, spMatchSlideMenuCtrl) {
        var onSwipeLeft = function() {
          var target = spMatchSlideMenuCtrl.selectedIndex() + 1;
          if (target < spMatchSlideMenuCtrl.tabs.length) {
            scope.$apply(spMatchSlideMenuCtrl.select(target));
          }
        };
        var onSwipeRight = function() {
          var target = spMatchSlideMenuCtrl.selectedIndex() - 1;
          if (target >= 0) {
            scope.$apply(spMatchSlideMenuCtrl.select(target));
          }
        };

        var swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm)
          .on('swiperight', onSwipeRight);
        scope.$on('$destroy', function() {
          $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
          $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
        });
      },

      //Supervisor Match Swipe

      //Supervisor Match OverView Swipe
       restrict: 'A',
      require: 'ionTabs',
      link: function(scope, elm, attrs, spOverviewMenuSlideCtrl) {
        var onSwipeLeft = function() {
          var target = spOverviewMenuSlideCtrl.selectedIndex() + 1;
          if (target < spOverviewMenuSlideCtrl.tabs.length) {
            scope.$apply(spOverviewMenuSlideCtrl.select(target));
          }
        };
        var onSwipeRight = function() {
          var target = spOverviewMenuSlideCtrl.selectedIndex() - 1;
          if (target >= 0) {
            scope.$apply(spOverviewMenuSlideCtrl.select(target));
          }
        };

        var swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm)
          .on('swiperight', onSwipeRight);
        scope.$on('$destroy', function() {
          $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
          $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
        });
      },

       //Organizer ClubSlider
      restrict: 'A',
      require: 'ionTabs',
      link: function(scope, elm, attrs, orgClubSliderCtrl) {
        var onSwipeLeft = function() {
          var target = orgClubSliderCtrl.selectedIndex() + 1;
          if (target < orgClubSliderCtrl.tabs.length) {
            scope.$apply(orgClubSliderCtrl.select(target));
          }
        };
        var onSwipeRight = function() {
          var target = orgClubSliderCtrl.selectedIndex() - 1;
          if (target >= 0) {
            scope.$apply(orgClubSliderCtrl.select(target));
          }
        };

        var swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm)
          .on('swiperight', onSwipeRight);
        scope.$on('$destroy', function() {
          $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
          $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
        });
      },
        //Organizer ClubSlider
         //Focus ME
      scope: { trigger: '@focusMe' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === "true") { 
          // console.log('trigger',value);
          $timeout(function() {
            element[0].focus(); 
          });
        }
      });
    }
     //Focus ME

    };
  }]);
/*.directive('focusMe', function($timeout) {
  return {
    scope: { trigger: '@focusMe' },
    link: function(scope, element) {
      scope.$watch('trigger', function(value) {
        if(value === "true") { 
          // console.log('trigger',value);
          $timeout(function() {
            element[0].focus(); 
          });
        }
      });
    }
  };
});*/


/*
starter.directive("compareTo", compareTo);
//Comapare To PAssword//
var compareTo = function() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  };*/