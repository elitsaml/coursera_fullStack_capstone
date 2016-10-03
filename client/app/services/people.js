(function() {
  'use strict';

  angular
    .module('communityGardenApp')
    .factory('PeopleService', PeopleService);

    PeopleService.$inject = ['$resource', 'baseURL']
    function PeopleService ($resource, baseURL) {
      return $resource(baseURL + 'people/:id/:resource/:fk', {
                id: '@id', resource: '@resource', fk: '@fk'
            },{
              'save': {
                  method: 'PUT'
          }});
    }

 }());
