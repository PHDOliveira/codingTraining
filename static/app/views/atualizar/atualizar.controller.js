(function (module) {

  'use strict';

  module.controller('AtualizarCtrl', ['$scope','$http','$state','CONSTANTS', function ($scope,$http,$state,CONSTANTS) {

    console.log($state.params.dadoAtualizar);

    if(!$state.params.dadoAtualizar) $state.go('app.listar');

     $scope.capital = $state.params.dadoAtualizar.capital;
     $scope.name = $state.params.dadoAtualizar.name;
    $scope.enviar = function(){


      $http({
        url: CONSTANTS.API_HOST + '/update',
        method: "PUT",
        data: { 'name' : $scope.name,'capital' : $scope.capital, '_id': $state.params.dadoAtualizar._id }
      })
      .then(function(response) {
        console.log("enviou");
        console.log(response);
        $state.go("app.listar");
      }, 
      function(response) { 
        console.log("enviou");
      });
    }


  }]);

})(angular.module('app.view'));