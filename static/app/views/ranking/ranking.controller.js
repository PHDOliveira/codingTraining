(function (module) {

  'use strict';

  module.controller('RankingCtrl', ['$scope','$http','CONSTANTS', function ($scope,$http,CONSTANTS) {




    function listarDados(){
      $http({
        method: 'GET',
        url: CONSTANTS.API_HOST + '/list-user'
      }).then(function successCallback(response) {
        $scope.dados = response.data.reverse();

      }, function errorCallback(response) {
       console.log(response);
     });  
    }
    listarDados();

    $scope.deletar = function(idDeletar){
      $http({
        method: 'DELETE',
        url: CONSTANTS.API_HOST + '/delete-user/'+idDeletar
      }).then(function successCallback(response) {
        listarDados();

      }, function errorCallback(response) {
       console.log(response);
     });
    }





 }]);



})(angular.module('app.view'));