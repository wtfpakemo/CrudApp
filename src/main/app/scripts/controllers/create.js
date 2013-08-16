'use strict';

angular.module('CrudApp')
  .controller('CreateCtrl', function ($scope, record, $location) {

  	$scope.record = new record();

    $scope.submit = function () {
    	$scope.record.$save();
    	$location.path('/');   	
    }

  });
