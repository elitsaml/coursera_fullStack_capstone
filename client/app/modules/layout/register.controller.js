
(function(){

    'use strict';

    console.log("DBG: register.controller.js");

    angular.module('communityGardenApp').controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', 'ngDialog', '$localStorage', 'AuthService'];
    function RegisterController ($scope, ngDialog, $localStorage, AuthService) {

        var vm = this;

        console.log("DBG: RegisterController called");

        vm.registration={};

        vm.doRegister = function() {
            console.log('Doing registration', vm.registration);
            vm.registration.name = vm.registration.firstname + ' ' + vm.registration.lastname;

            AuthService.register(vm.registration);

            ngDialog.close();

        };
    }
})();
