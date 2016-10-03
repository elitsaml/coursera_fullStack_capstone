
(function(){

    'use strict';

    console.log("DBG: login.controller.js");

    angular.module('communityGardenApp').controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'ngDialog', '$localStorage', 'AuthService'];
    function LoginController($scope, ngDialog, $localStorage, AuthService) {

      var vm = this;
      vm.test = "----- TEST IT ----- "

      console.log("DBG: LoginController called");

      vm.loginData = $localStorage.getObject('userinfo','{}');

      vm.doLogin = function() {
          console.log("DBG: LoginController:doLogin()");

          if($scope.rememberMe)
             $localStorage.storeObject('userinfo',$scope.loginData);

          AuthService.login($scope.loginData);

          ngDialog.close();

      };

      vm.openRegister = function () {
          console.log("DBG: openRegister:doLogin()");

          ngDialog.open({
            template: './app/modules/layout/register.html',
            scope: $scope,
            className: 'ngdialog-theme-default',
            controller:"RegisterController",
            controllerAs: 'vm'
          });
      };

      return vm;

    }//HomeController

})();
