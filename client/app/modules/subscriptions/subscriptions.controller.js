(function(){

    'use strict';

    angular.module('communityGardenApp').controller('SubscriptionController', SubscriptionController);

    SubscriptionController.$inject = ['SubscriptionService', 'PeopleService', 'AuthService', 'subscriptions', 'toaster'];
    function SubscriptionController(SubscriptionService, PeopleService, AuthService, subscriptions, toaster) {

      var vm = this;
      vm.subscriptions = subscriptions;
      vm.deleteCurrentPersonSubscription = deleteCurrentPersonSubscription;
      vm.delete = deleteSubscription;

      console.log("DBG: SubscriptionController");

      //////// ------------------- implementation -------------- ///////////
      // ----------- all scope functions
      function deleteCurrentPersonSubscription( sub) {
        SubscriptionService.delete({
                id: sub.id
            },
            /* on success */
            function () {
                toaster.pop('success', "", "Subscription is deleted.");
                delete vm.subscriptions[ sub.id];

                PeopleService.query({
                    id: AuthService.getUserId(),
                    resource: 'subscriptions'
                }).$promise.then(function (subscriptions) {
                        vm.subscriptions = subscriptions;
                });

            },
            /* on error */
            function (err) {
                toaster.pop('success', "", "Failed deleting the Subscription.");
            }
        );
      };

      function deleteSubscription( sub) {
        SubscriptionService.delete({
                id: sub.id
            },
            /* on success */
            function () {
                toaster.pop('success', "", "Subscription is deleted.");
                delete vm.subscriptions[ sub.id];

                SubscriptionService.query({
                }).$promise.then(function (subscriptions) {
                        vm.subscriptions = subscriptions;
                });

            },
            /* on error */
            function (err) {
                toaster.pop('success', "", "Failed deleting the Subscription.");
            }
        );
      };


    }
})();
