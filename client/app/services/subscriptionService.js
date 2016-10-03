(function() {
  'use strict';

  angular
    .module('communityGardenApp')
    .factory('SubscriptionService', SubscriptionService);

    SubscriptionService.$inject = ['$resource', 'baseURL']
    function SubscriptionService ($resource, baseURL) {
      return $resource(baseURL + 'subscriptions/:id', {id: '@id'},{
          'save': {
              method: 'PUT'
          }});
    }

 }());
