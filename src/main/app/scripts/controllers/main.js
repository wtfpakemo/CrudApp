'use strict';

angular.module('CrudApp')
  .controller('MainCtrl', function ($scope, record) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.records = record.query();
   
  });
