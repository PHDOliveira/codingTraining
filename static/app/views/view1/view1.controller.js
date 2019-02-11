(function (module) {

  'use strict';

  module.service('view1ExclusiveService', function () {
    this.get = function () {
      return 'View1';
    };
  });

  module.controller('View1Ctrl', ['$scope', 'view1ExclusiveService', function ($scope, view1ExclusiveService) {
    $scope.testeView = view1ExclusiveService.get();

    $scope.click = function () {
    	alert('Hello, World!');
    };

  }]);

})(angular.module('app.view'));