(function() {
  'use strict';

  angular
    .module('communityGardenApp')
    .factory('RoleService', RoleService);

    RoleService.$inject = ['$resource', 'baseURL']
    function RoleService ($resource, baseURL) {
      return $resource(baseURL + 'roles/:id/:property', {id: '@id', property: '@property'},{
          'save': {
              method: 'PUT'
          }});
    }

 }());
