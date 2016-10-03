(function(){

    'use strict';

    console.log("DBG: people.controller.js");

    angular.module('communityGardenApp').controller('PeopleController', PeopleController);

    PeopleController.$inject = ['PeopleService', 'people', '$state', 'toaster'];
    function PeopleController(PeopleService, people, $state, toaster) {

      var vm = this;
      vm.people = people;
      vm.deletePerson = deletePerson;

      console.log("DBG: PeopleController called");

      /********************
      *   implementation of the controller related to the people
      */

      function deletePerson( person) {
        PeopleService.delete({
                id: person.id
            },
            /* on success */
            function () {
                toaster.pop('success', "", "Person is deleted.");
                delete vm.people[ person.id];
                PeopleService.query().$promise.then(function (people) {
                        vm.people = people; // _.indexBy(plots, '_id');
                    });

            },
            /* on error */
            function (err) {
                toaster.pop('success', "", "Failed deleting the person.");
            }
        );
      };


    }
})();
