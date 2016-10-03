(function () {

    'use strict';

    angular.module('communityGardenApp').controller('SubscriptionEditController', SubscriptionEditController);

    SubscriptionEditController.$inject = ['AuthService', '$state', '$filter', "subscription", "toaster"];
    function SubscriptionEditController(AuthService, $state, $filter, subscription, toaster) {

        var vm = this;
        vm.subscription = subscription;
        if ( ! vm.subscription.fee ) {
          vm.subscription.fee = 150;
        }
        if ( ! vm.subscription.from ) {
          vm.subscription.from =$filter('date')( Date.now(), 'dd, mm, yyyy');
        }
        vm.createOrSaveSubscription = createOrSaveSubscription;
        vm.save = saveSubscription;
        vm.cancel = cancel;

        console.log("SubscriptionEditController");

        //////////////////// --------- implementation -------- //////////////

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        //                create or save a subscription
        function createOrSaveSubscription() {
            console.log("Saving the subscription...");

            if (vm.sForm.$invalid) {
                vm.formSubmitted = true;
                console.log("invalid data");
                return false;
            }

            vm.subscription.from = new Date( vm.subscription.from);
            //console.log(" after : " + $filter('date')( vm.subscription.from, 'yyyy-MM-dd HH:mm:ss Z'));
            vm.subscription.personId = AuthService.getUserId();

            // do save request
            vm.subscription.$save({
                  //  pId: vm.plot.id
                },
                // on success
                function (savedData) {
                    console.log("Trying to save the data for: " + vm.subscription.id);
                    $state.go('app.people.currentpersonsubscription');
                },
                // on error
                function (err) {
                    toaster.pop('error', "", 'Failed saving the subscription.');
                    console.dir(err);
                }
            );

        };

        function saveSubscription() {
            console.log("Saving the subscription...");

            if (vm.sForm.$invalid) {
                vm.formSubmitted = true;
                console.log("invalid data");
                return false;
            }

            // do save request
            vm.subscription.$save({
                  //  pId: vm.plot.id
                },
                // on success
                function (savedData) {
                    console.log("Trying to save the data for: " + vm.subscription.id);
                    $state.go('app.people.currentpersonsubscription');
                },
                // on error
                function (err) {
                    toaster.pop('error', "", 'Failed saving the subscription.');
                    console.dir(err);
                }
            );

        };

        function cancel() {
            $state.go('app.people.currentpersonsubscription');
        }

  }


})();
