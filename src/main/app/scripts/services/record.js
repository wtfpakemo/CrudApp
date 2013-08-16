'use strict';

angular.module('CrudApp')
  .factory('record', function ($resource) { 

    // Public API here
    return $resource('/CrudApp/records.json/:id', { id : '@id'});
  });
