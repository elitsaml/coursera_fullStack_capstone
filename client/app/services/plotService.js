(function() {
  'use strict';

  angular
    .module('communityGardenApp')
    .factory('PlotService', PlotService);

    PlotService.$inject = ['$resource', 'baseURL']
    function PlotService ($resource, baseURL) {
      return $resource(baseURL + 'plots/:id', {id: '@id'},{
          'save': {
              method: 'PUT'
          }});
    }

 }());
