(function() {
  'use strict';

  angular
    .module('communityGardenApp')
    .factory('MessageService', MessageService);

    MessageService.$inject = ['$resource', 'baseURL']
    function MessageService ($resource, baseURL) {
      return $resource(baseURL + 'messages/:id', {id: '@id'},{
          'save': {
              method: 'PUT'
          }});
    }

 }());
