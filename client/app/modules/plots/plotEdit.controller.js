(function () {

    'use strict';

    angular.module('communityGardenApp').controller('PlotEditController', PlotEditController);

    PlotEditController.$inject = ['$state', '$filter', "plot", "toaster"];
    function PlotEditController($state, $filter, plot, toaster) {

        var vm = this;
        vm.plot = plot;
        vm.save = createOrSavePlot;
        vm.cancel = cancel;

        console.log("PlotEditController");

        //////////////////// --------- implementation -------- //////////////

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //                create or save a plot
        function createOrSavePlot() {
            if (vm.pForm.$invalid) {
                vm.formSubmitted = true;
                return false;
            }

          // do save request
          vm.plot.$save({
                //  pId: vm.plot.id
              },
              // on success
              function (savedData) {
                  console.log("Trying to save the data for: " + vm.plot.id);
                  $state.go('app.plots');
              },
              // on error
              function (err) {
                  toaster.pop('error', "", 'Failed saving the plot.');
                  console.dir(err);
              }
          );

        };

        function cancel() {
            $state.go('app.plots');
        }


    }
})();
