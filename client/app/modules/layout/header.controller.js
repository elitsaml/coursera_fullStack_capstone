(function(){

    'use strict';

    console.log("DBG: header.controller.js");

    angular.module('communityGardenApp').controller('HeaderController', HeaderController);

    HeaderController.$inject = ['AuthService', '$scope', '$state', '$rootScope', 'ngDialog' /* , '$location'*/];
    function HeaderController(AuthService, $scope, $state, $rootScope, ngDialog /*, $location*/) {

      var vm = this;

      vm.loggedIn = false;
      vm.username = '';

      console.log("DBG: HeaderController called");
      //console.log(AuthService);

      if(AuthService.isAuthenticated()) {
            console.log("User has been already authenticated.");
            vm.loggedIn = true;
            vm.username = AuthService.getUsername();
      }

      vm.openLogin = function () {
          console.log("DBG: openLogin()");
          ngDialog.open({
            template: './app/modules/layout/login.html',
            scope: $scope,
            className: 'ngdialog-theme-default',
            controller:"LoginController",
            controllerAs: 'vm' });
      };

      vm.logOut = function() {
           AuthService.logout();
            vm.loggedIn = false;
            vm.username = '';
        };

      vm.stateis = function(curstate) {
         return $state.is(curstate);
      };

      $rootScope.$on('login:Successful', function () {
          vm.loggedIn = AuthService.isAuthenticated();
          vm.username = AuthService.getUsername();
      });

      $rootScope.$on('registration:Successful', function () {
          vm.loggedIn = AuthService.isAuthenticated();
          vm.username = AuthService.getUsername();
      });

      return vm;
    }
})();
