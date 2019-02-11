(function (module) {

  'use strict';

  module.controller('ExerciciosCtrl', ['$scope','$http','CONSTANTS','Local','$state', function ($scope,$http,CONSTANTS,Local,$state) {


    var user = Local.get("usuario");

    if(user.permissions.indexOf("root") > -1){

      $scope.controls = true; 
    }else{
      $scope.controls = false; 
      
    }



    function listarDados(){
      $http({
        method: 'GET',
        url: CONSTANTS.API_HOST + '/exercicio/read'
      }).then(function successCallback(response) {
        $scope.dados = _.orderBy(response.data, "nivelDificuldade","desc");
        

        for(var i=0;i<$scope.dados.length;i++){
          
            var c = calcularProb(user.nivel,$scope.dados[i].nivelDificuldade);
            $scope.dados[i].prob = c.prob;
            $scope.dados[i].classeProb  = c.classeProb;
            $scope.dados[i].posicao  = c.posicao;
          }
          $scope.dados = _.sortBy($scope.dados, "posicao");


        }, function errorCallback(response) {
          console.log(response);


        });  
    }

      listarDados();


    $http({
      method: 'GET',
      url: CONSTANTS.API_HOST + '/ver-respostas'
    }).then(function successCallback(response) {
      var listaExerUser = _.filter(response.data,function(o){
        if( o.idUsuario == user.idUsuario && o.dataFinal != null){
          return o;
        }
      });
      var exerciciosRespondidos = _.uniq(_.map(listaExerUser,"idExercicio"));

      for(var i = 0, length1 = $scope.dados.length; i < length1; i++){
        if( exerciciosRespondidos.indexOf($scope.dados[i]._id) > -1){
          $scope.dados[i].respondido = true;
          // $scope.dados[i].posicao = 0;
         }else{
         $scope.dados[i].respondido = false;
          
         }
      }
      
    }, function errorCallback(response) {
      console.log(response);
    }); 
    
    function calcularProb(userNivel, exercicioNivel){
      var prob = 1 / (1 +  Math.pow(2.718, -0.0051 * (userNivel - exercicioNivel) ) ); 
     
      var classeProb = "";
      var posicao = 0;
      if(prob < 0.35){
        classeProb = "dificil";
        posicao = 2;

      }else if(prob>=0.35 && prob <0.65){
        classeProb = "adequado";
        posicao = 1;
      }else{
        classeProb = "facil";
        posicao = 3;
      } 

      return {"prob": prob,"classeProb": classeProb, "posicao": posicao};      
    }
    $scope.deletar = function(idDeletar){
      $http({
        method: 'DELETE',
        url: CONSTANTS.API_HOST + '/exercicio/delete/'+idDeletar
      }).then(function successCallback(response) {
        
        listarDados();
    

    }, function errorCallback(response) {
      console.log(response);
    });
    }

  }]);



})(angular.module('app.view'));