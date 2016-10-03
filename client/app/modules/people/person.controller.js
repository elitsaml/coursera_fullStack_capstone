(function(){

    'use strict';

    console.log("DBG: person.controller.js");

    angular.module('communityGardenApp').controller('PersonController', PersonController);

    PersonController.$inject = ['PeopleService', 'person', '$state', 'toaster'];
    function PersonController(PeopleService, person, $state, toaster) {

      var vm = this;
      vm.person = person;
      vm.savePersonProfile = savePersonProfile;

      console.log("DBG: PersonController called");

      /********************
      *   implementation of the controller related to the person
      */

      function savePersonProfile() {

        // patch the properties in the person which can be changed
        vm.person.name = vm.person.firstname + ' ' + vm.person.lastname;

        // do save request
        vm.person.$save({},
            // on success
            function (savedData) {
                console.log("Trying to save the data for the person: " + vm.person.id + "   Current state: " + $state.current.name);
                $state.go(
                  $state.is('app.person') ? 'app.people' : 'app'
                );
            },
            // on error
            function (err) {
                toaster.pop('error', "", 'Failed saving the person.');
                console.dir(err);
            }
        );
        //PeopleService.put( vm.person);
      }


      console.log(person);

    }
})();
