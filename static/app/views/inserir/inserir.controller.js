(function (module) {

  'use strict';

  module.controller('InserirCtrl', ['$scope','$http','$state','CONSTANTS', function ($scope,$http,$state,CONSTANTS) {

    $scope.enviar = function(){


      $http({
        url: CONSTANTS.API_HOST + '/create',
        method: "POST",
        data: { 'name' : $scope.name,'capital' : $scope.capital }
      })
      .then(function(response) {
        console.log("enviou");
        console.log(response);
        $state.go('app.listar');
      }, 
      function(response) { 
        console.log("enviou");
      });
    }


  }]);

})(angular.module('app.view'));