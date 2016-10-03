(function(){

    'use strict';

    angular.module('communityGardenApp').controller('PlotController', PlotController);

    PlotController.$inject = ['PlotService', 'plots', 'toaster'];
    function PlotController(PlotService, plots, toaster) {

      var vm = this;
      vm.plots = plots;
      vm.delete = deletePlot;

      console.log("DBG: PlotController");

      //////// ------------------- implementation -------------- ///////////
      // ----------- all scope functions
      function deletePlot( plot) {
        PlotService.delete({
                id: plot.id
            },
            /* on success */
            function () {
                toaster.pop('success', "", "Plot is deleted.");
                delete vm.plots[ plot.id];
                PlotService.query().$promise.then(function (plots) {
                        vm.plots = plots; // _.indexBy(plots, '_id');
                    });

            },
            /* on error */
            function (err) {
                toaster.pop('success', "", "Failed deleting the plot.");
            }
        );
      };

/*
      PeopleService.query().$promise.then(function (data) {
                              vm.people = data;//_.indexBy(data, '_id');

                          });
*/
/*
      vm.people =  PeopleService.query(
          function () {
               console.log(vm.people);
          }
          );
*/

          /*,
          function (response) {
              vm.message = "Error: " + response.status + " " + response.statusText;
          }*/




    }
})();
