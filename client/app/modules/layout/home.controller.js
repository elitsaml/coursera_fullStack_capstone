(function(){

    'use strict';

    console.log("DBG: home.controller.js");

    angular.module('communityGardenApp').controller('HomeController', HomeController);

    HomeController.$inject = ['AuthService', '$scope' /* , '$location'*/];
    function HomeController(AuthService, $scope /*, $location*/) {

      var vm = this;

      console.log("DBG: HomeController init started...");

      /*
    	$scope.currentUser = {};
    	$scope.openedMenu = false;
    	$scope.openedLogin = false;
        $scope.hRoles = {};
        $scope.isLogged = false;
        $scope.canChange = true;
        $scope.defaultCurrency = 'CHF';
        */
    	$scope.init = initialization;

      //$scope.$on("$destroy", function handler() {
            //userService.unSubscribeForCurrentUserChange( onCurrentUserChange);
      //});

      console.log("DBG: HomeController inited");

      //*****
      //  Implementation
      //*****

      function initialization() {
    		// ToDo : load the data for the current person from json file
    		//peopleService.getCurrentUser($scope.setCurUser);
            console.log( "home controller local path : " + $location.path());
    	};



    }
})();
