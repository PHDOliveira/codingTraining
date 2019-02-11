(function (module) {

  'use strict';

  module.controller('ListarCtrl', ['$scope','$http','CONSTANTS', function ($scope,$http,CONSTANTS) {

    function listarDados(){
      $http({
        method: 'GET',
        url: CONSTANTS.API_HOST + '/read',
      }).then(function successCallback(response) {
        $scope.dados = response.data;

      }, function errorCallback(response) {
        console.log(response);
      });  
    }
    listarDados();

    $scope.deletar = function(idDeletar){
      $http({
        method: 'DELETE',
        url: CONSTANTS.API_HOST + '/delete/'+idDeletar
      }).then(function successCallback(response) {
        listarDados();
      
    }, function errorCallback(response) {
      console.log(response);
    });
    }

  }]);



})(angular.module('app.view'));