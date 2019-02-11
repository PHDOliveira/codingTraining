(function (module) {

  'use strict';

  module.controller('ResponderCtrl', ['$scope','$http','$state','CONSTANTS','Local','$rootScope', function ($scope,$http,$state,CONSTANTS,Local,$rootScope) {

    var dadosExercicio = $state.params.dadosExercicio;
    if(!dadosExercicio) {
      $state.go("app.exercicios");
    }

    var idUsuario = Local.get('usuario').idUsuario;

    // var idUsuario = usuario._id; -- vai pegar do usuario logado
    var idExercicio = dadosExercicio._id;

    var dataInicial = new Date();

    var dadosIniciais = {
     "idUsuario" : idUsuario, 
     "idExercicio" : idExercicio, 
     "dataInicial": dataInicial,  
   }; 

   $http({
    url: CONSTANTS.API_HOST + '/resposta',
    method: "POST",
    data: dadosIniciais
  })
   .then(function(response) {
  

    $scope.dadosIniciaisSalvos = response.data.item._id;

   
  }, 
  function(response) { 
    console.log("erro");
  });

   var vlInicial = dadosExercicio.valorInicial || ""; 
   var editor = CodeMirror(document.getElementById('codemirror'), {
    value: vlInicial+"\n",
    mode:  "javascript",
    theme: "material",
    lineNumbers: true
  });
   $scope.avalCorreta = false;
   var totalLines = editor.lineCount();
   var totalChars = editor.getValue().length;
   editor.autoFormatRange({line:0, ch:0}, {line:totalLines, ch:totalChars});
   editor.focus();
   editor.setCursor({line:0, ch:20});
    // if($state.params)

    

   

    $scope.titulo = dadosExercicio.titulo;
    $scope.descricao = dadosExercicio.descricao;
    $scope.dicas = dadosExercicio.dicas;

    // var idUsuario = "11111";


    var tentativas=0;
    var listaErros=[];
    var t=0;
    window.setInterval(function(){
     t++; 
   },1000);

    $scope.enviar = function(){

    

      var dataFinal = new Date();
    
      var user = Local.get("usuario");
      
    
      var Ea = 1 / (1 +  Math.pow(10,  ((dadosExercicio.nivelDificuldade - user.nivel  ) /400 ) ) );  
      
      

      var Pt = tentativas/30;

      var Ps =  t/300;

      var Pm = ((Pt+Ps)/ user.nivel) *  dadosExercicio.nivelDificuldade;

      var K = 16;
      var pontuacaoFinal = K * (1 - (Pm+Ea)) 

      user.nivel += pontuacaoFinal;
     
      
      
      $http({
        url: CONSTANTS.API_HOST + '/update-habilidade-user',
        method: "PUT",
        data: user
      })
      .then(function(response) {
        Local.set("usuario",user);
        $rootScope.usuario = Local.get('usuario');

      }, 
      function(response) { 
        console.log("erro");
      });



      dadosExercicio.nivelDificuldade -= pontuacaoFinal;


      var dadosSolucao = {
        "_id": $scope.dadosIniciaisSalvos,
        "idUsuario" : idUsuario, 
        "idExercicio" : idExercicio, 
        "resposta": editor.getValue(), 
        "tempo": t, 
        "dataInicial": dataInicial,  
        "dataFinal": dataFinal, 
        "tentativas": tentativas, 
        "listaErros": String(listaErros),
        "Ea": Ea,
        "Pt": Pt,
        "Ps": Ps,
        "Pm": Pm, 
        "pontuacaoFinal": pontuacaoFinal, 
      }; 



      $http({
        url: CONSTANTS.API_HOST + '/exercicio/update',
        method: "PUT",
        data: dadosExercicio
      })
      .then(function(response) {
        console.log("atualizado");


      }, 
      function(response) { 
        console.log("pau");
      });


      $http({
        url: CONSTANTS.API_HOST + '/resposta/update',
        method: "PUT",
        data: dadosSolucao
      })
      .then(function(response) {
      

        $state.go('app.exercicios');
      }, 
      function(response) { 
        console.log("erro");
      });
    }

    $scope.avaliador = [];
    var listaTextoAvaliacao = dadosExercicio.avaliador.split(";");
   

    for(var i = 0, length1 = listaTextoAvaliacao.length; i < length1; i++){
      var obj = {};
      var b = listaTextoAvaliacao[i].split("//")[1];

      if(b){
        obj.nome = b;
        obj.valorTeste = null;
        $scope.avaliador.push(obj); 
      }
    }
    // = dadosExercicio.avaliador.split(";");


    $scope.tentar = function(){

      var dadosTentativa = {
        "idUsuario" : idUsuario, 
        "idExercicio" : idExercicio, 
        "resposta": editor.getValue(), 
        "tempo": t, 
        "dataInicial": dataInicial,  
      }; 

      $http({
        url: CONSTANTS.API_HOST + '/tentativa-intermediaria',
        method: "POST",
        data:  dadosTentativa
      })
      .then(function(response) {
        console.log(response);
      }, 
      function(response) { 
        // console.log("erro");
        console.log(response);
      });
    

      $http({
        url: CONSTANTS.API_HOST + '/tentativa-resposta',
        method: "POST",
        data: { "resposta": editor.getValue()+'\n'+dadosExercicio.avaliador } 
      })
      .then(function(response) {
        console.log(response.data.output);
        var result = response.data.output.result;
        var saidaTestes = response.data.output.console;
        $scope.formatAvaliador = true;
        var achouErroSintaxe = _.find(CONSTANTS.EXECUTOR_ERRORS, function(iten){
          if( result.indexOf(iten) > -1) return true; 

        })
        tentativas++;

        for(var i = 0, length1 = saidaTestes.length; i < length1; i++){
          $scope.avaliador[i].valor = saidaTestes[i];
        }
        if ( !achouErroSintaxe && saidaTestes.indexOf(false) === -1){
          $scope.avalCorreta = true;

        }else{
          listaErros.push(result)
          $scope.avalCorreta = false;
        }
        $scope.nTentativa = tentativas;
        $scope.resultado = result;
      }, 
      function(response) { 
        // console.log("erro");
        console.log(response);
      });
    }

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
      // $scope.dados = response.data;

    }, function errorCallback(response) {
      console.log(response);
    });
    }

    function serverTime(){
     return $http({
      method: 'GET',
      url: CONSTANTS.API_HOST + '/server-time',
    }).then(function successCallback(response) {

    
      return response.data;
    }, function errorCallback(response) {
      console.log(response);
    });  
  }

}]);



})(angular.module('app.view'));