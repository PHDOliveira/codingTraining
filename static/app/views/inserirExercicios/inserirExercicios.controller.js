(function (module) {

  'use strict';

  module.controller('InserirExerciciosCtrl', ['$scope','$http','$state','CONSTANTS', function ($scope,$http,$state,CONSTANTS) {

    if($state.params.dadoAtualizar){
          $scope.obj = $state.params.dadoAtualizar;
          $scope.operacao = "Atualizar";
    }else{
          $scope.operacao = "Inserir novo";
    }
      

   $scope.atualizar = function(){


     $http({
      url: CONSTANTS.API_HOST + '/exercicio/update',
      method: "PUT",
      data: $scope.obj
    })
     .then(function(response) {
      console.log("enviou");
      console.log(response);
      $state.go("app.exercicios");
    }, 
    function(response) { 
      console.log("enviou");
    });
   }


   $scope.salvar = function(){


    $http({
      url: CONSTANTS.API_HOST + '/exercicio/create',
      method: "POST",
      data: $scope.obj 
    })
    .then(function(response) {
      console.log("enviou");
      console.log(response);
      $state.go('app.exercicios');
    }, 
    function(response) { 
      console.log("enviou");
    });
  }


  $scope.enviar = function(){
    if($state.params.dadoAtualizar){
      $scope.atualizar();

    }else {
      $scope.salvar();      
    }
  }


}]);

})(angular.module('app.view'));