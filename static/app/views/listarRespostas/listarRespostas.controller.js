(function (module) {

  'use strict';

  module.controller('ListarRespostasCtrl', ['$scope','$http','CONSTANTS', function ($scope,$http,CONSTANTS) {


    Highcharts.chart('container', {

      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },

      series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      }]
    });

    function listarTentativas(){
      $http({
        method: 'GET',
        url: CONSTANTS.API_HOST + '/ver-tentativas'
      }).then(function successCallback(response) {

        // listarDados();  
        $scope.tentativas = response.data;
        console.log($scope.tentativas)

      }, function errorCallback(response) {
        console.log(response);
      });
    }

    function listarDados(){
      $http({
        method: 'GET',
        url: CONSTANTS.API_HOST + '/ver-respostas'
      }).then(function successCallback(response) {
        $scope.dados = response.data.reverse();

        var exerciciosRespondidos = _.uniq(_.map($scope.dados,"idExercicio"));
        var usuariosRespondentes = _.uniq(_.map($scope.dados,"idUsuario"));


        $http({
          method: 'GET',
          url: CONSTANTS.API_HOST + '/exercicio/read'
        }).then(function successCallback(response) {

          var valorPorExercicio = [];
          $scope.dadosGerais = {};
          $scope.dadosGerais.qtdRespostas = 0;
          $scope.dadosGerais.qtdTentativas = 0;
          // dadosGerais.qtdUsuarios = 0;
          // dadosGerais.qtdRespostas = 0;
          for (var i = 0; i < exerciciosRespondidos.length; i++) {
            var obj = {};
            var exer = _.find(response.data,{'_id': exerciciosRespondidos[i]});
            if(exer){

              obj.titulo = exer.titulo;
              obj.nivel = exer.nivelDificuldade;
            }else{
              obj.titulo = "Questão "+exerciciosRespondidos[i]
            }

            var listaI = _.filter($scope.dados,{"idExercicio": exerciciosRespondidos[i]});


            listaI = _.orderBy(listaI,"dataFinal","acs");
            var tempo = 0;
            var tentativas = 0;
            var Pm = 0;
            var Ea = 0;
            var ciclosIncompletos = 0;
            var pontuacaoFinal = 0;
            var pontosAcumulados = [1500];
            
            for(var j=0;j<listaI.length;j++){
              tempo+= listaI[j].tempo || 0;
              tentativas+= listaI[j].tentativas || 0;
              $scope.dadosGerais.qtdTentativas += listaI[j].tentativas || 0;
              Pm+= listaI[j].Pm || 0;
              Ea+= listaI[j].Ea || 0;
              pontuacaoFinal+= listaI[j].pontuacaoFinal || 0;
              if(listaI[j].pontuacaoFinal && listaI[j].pontuacaoFinal != 0){
                
                var indexAcc = pontosAcumulados.length -1; 
                var n = pontosAcumulados[indexAcc] + (listaI[j].pontuacaoFinal *-1);
                n = n.toFixed(2);
                n = parseFloat(n);
                pontosAcumulados.push( n );  
              }
              
              if(!listaI[j].dataFinal){
                ciclosIncompletos++;    
              }
            }


            if (!(pontosAcumulados[pontosAcumulados.length] <  obj.nivel+1) && !(pontosAcumulados[pontosAcumulados.length] >  obj.nivel-1) ){
              pontosAcumulados.pop();
              var p = obj.nivel.toFixed(2)
              pontosAcumulados.push( parseFloat(p));

            }

            $scope.dadosGerais.qtdRespostas += listaI.length-ciclosIncompletos || 0;

            obj.Mediatentativas = tentativas/(listaI.length-ciclosIncompletos) || 0;

            
            obj.mediaTempo = tempo/(listaI.length-ciclosIncompletos) || 0;
            obj.mediaEa = Ea/(listaI.length-ciclosIncompletos) || 0;
            obj.mediaPm = Pm/(listaI.length-ciclosIncompletos) || 0;
            obj.mediaPontuacaoFinal = pontuacaoFinal/(listaI.length-ciclosIncompletos) || 0;
            obj.ciclosIncompletos = ciclosIncompletos || 0;
            obj.respostas = listaI.length-ciclosIncompletos || 0;
            obj.pontosAcumulados = pontosAcumulados;
            obj.dpTent = desvioPadrao(listaI,"tentativas",obj.Mediatentativas); 
            obj.dpTempo = desvioPadrao(listaI,"tempo",obj.Mediatentativas); 
            obj.dpEa = desvioPadrao(listaI,"Ea",obj.Mediatentativas); 
            obj.dpPm = desvioPadrao(listaI,"Pm",obj.Mediatentativas); 
            obj.dpPf = desvioPadrao(listaI,"pontuacaoFinal",obj.Mediatentativas); 

            valorPorExercicio.push(obj);

          }



          // $scope.dadosQuestoes = valorPorExercicio; 
          $scope.dadosQuestoes =  _.sortBy(valorPorExercicio, "nivel");
          console.log($scope.dadosGerais);
          var serieGraphQuestoes = [];
          for(var i = 0, length1 =  $scope.dadosQuestoes.length; i < length1; i++){
           var obj = {};

           obj.data = $scope.dadosQuestoes[i].pontosAcumulados;
           obj.name = $scope.dadosQuestoes[i].titulo;
           serieGraphQuestoes.push(obj);
         }

         Highcharts.chart('container', {
           title : {

            text: "Nível dificuldade das questões"
          },
          xAxis: {
           // visible: false
           allowDecimals : false,
           title : {

            text: "Resposta"
          } 
        },

        yAxis: {
               // ceilling: 1800,
               // min: 1300,
               title : {

                text: "Nível dificuldade"
              } 
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b><br/>',

              shared: true
            },


            series: serieGraphQuestoes
          });


       }, function errorCallback(response) {
        console.log(response);
      });  


        $http({
          method: 'GET',
          url: CONSTANTS.API_HOST + '/list-user'
        }).then(function successCallback(response) {

          var valorPorUsuario = [];
          for (var i = 0; i < usuariosRespondentes.length; i++) {
            var obj = {};
            obj.idUsuario = usuariosRespondentes[i];


            var listaI = _.filter($scope.dados,{"idUsuario": usuariosRespondentes[i]});
            listaI = _.orderBy(listaI,"dataFinal","acs");
            var u = _.find(response.data,{"idUsuario": usuariosRespondentes[i]});
            var nivelUser = 0;
            if(u){
              nivelUser = u.nivel;
            } 

            var tempo = 0;
            var tentativas = 0;
            var Pm = 0;
            var Ea = 0;
            var ciclosIncompletos = 0;
            var pontuacaoFinal = 0;
            var pontosAcumulados = [1500];



            for(var j=0;j<listaI.length;j++){
              tempo+= listaI[j].tempo || 0;
              tentativas+= listaI[j].tentativas || 0;
              Pm+= listaI[j].Pm || 0;
              Ea+= listaI[j].Ea || 0;
              pontuacaoFinal+= listaI[j].pontuacaoFinal || 0;
              if(!listaI[j].dataFinal){
                ciclosIncompletos++;    
              }

              pontuacaoFinal+= listaI[j].pontuacaoFinal || 0;
              if(listaI[j].pontuacaoFinal && listaI[j].pontuacaoFinal != 0){
                var indexAcc = pontosAcumulados.length -1; 
                var n = pontosAcumulados[indexAcc] + listaI[j].pontuacaoFinal;
                n = n.toFixed(2);
                n = parseFloat(n);
                pontosAcumulados.push( n );  
              }

            }

            if (!(pontosAcumulados[pontosAcumulados.length] <  nivelUser+1) && !(pontosAcumulados[pontosAcumulados.length] >  nivelUser-1) ){
              pontosAcumulados.pop();
              var p = nivelUser.toFixed(2)
              pontosAcumulados.push( parseFloat(p));

            }

            obj.nivelUser = nivelUser; 
            obj.Mediatentativas = tentativas/(listaI.length-ciclosIncompletos) || 0; 
            obj.mediaTempo = tempo/(listaI.length-ciclosIncompletos) || 0;
            obj.mediaEa = Ea/(listaI.length-ciclosIncompletos) || 0;
            obj.mediaPm = Pm/(listaI.length-ciclosIncompletos) || 0;
            obj.mediaPontuacaoFinal = pontuacaoFinal/(listaI.length-ciclosIncompletos) || 0;
            obj.ciclosIncompletos = ciclosIncompletos || 0;
            obj.respostas = listaI.length-ciclosIncompletos || 0;
            obj.pontosAcumulados = pontosAcumulados;
            obj.dpTent = desvioPadrao(listaI,"tentativas",obj.Mediatentativas); 
            obj.dpTempo = desvioPadrao(listaI,"tempo",obj.Mediatentativas); 
            obj.dpEa = desvioPadrao(listaI,"Ea",obj.Mediatentativas); 
            obj.dpPm = desvioPadrao(listaI,"Pm",obj.Mediatentativas); 
            obj.dpPf = desvioPadrao(listaI,"pontuacaoFinal",obj.Mediatentativas); 

            valorPorUsuario.push(obj); 
          }

          $scope.dadosUsuarios = _.sortBy(valorPorUsuario, "nivelUser"); 

          var serieGraphUsuarios = [];
          for(var i = 0, length1 =  $scope.dadosUsuarios.length; i < length1; i++){
           var obj = {};

           obj.data = $scope.dadosUsuarios[i].pontosAcumulados;
           obj.name = $scope.dadosUsuarios[i].idUsuario;
           serieGraphUsuarios.push(obj);
         }

         Highcharts.chart('container2', {
           title : {

            text: "Nível Habilidade dos usuários"
          },
          xAxis: {
           // visible: false
           allowDecimals : false,
           title : {

            text: "Resposta"
          } 
        },

        yAxis: {
               // ceilling: 1800,
               // min: 1300,
               title : {

                text: "Nível de Habilidade"
              } 
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b><br/>',

              shared: true
            },


            series: serieGraphUsuarios
          });


       }, function errorCallback(response) {
         console.log(response);
       });  







      }, function errorCallback(response) {
        console.log(response);
      });  
}
listarDados();
listarTentativas();

function desvioPadrao(listaObj,prop,media){
  var lista = _.filter(_.map(listaObj,prop), function (o){ if (o!=undefined) return o;});

  // var variancia = lista.reduce((total, valor) => total + Math.pow(media - (valor || 0), 2)/lista.length, 0);
  // var desvioPadrao = Math.sqrt(variancia); 
  var varianca = 0;
  for (var i = 0;i < lista.length; i++) {
    if(lista[i]) {
      varianca += (media - lista[i]) * (media - lista[i]);
    }
  }
  varianca = varianca/lista.length ;

  // return desvioPadrao;
  return Math.sqrt(varianca) || 0;
}
function valorUsuarioQuestao(dados,idUsuario,idExercicio){


  var obj = {};


  var listaI = _.filter($scope.dados,{"idUsuario": idUsuario, "idExercicio": idExercicio});
  var tempo = 0;
  var tentativas = 0;

  for(var j=0;j<listaI.length;j++){
    tempo+= listaI[j].tempo;
    tentativas+= listaI[j].tentativas;
  }

  obj.tempo = tempo; 
  obj.tentativas = tentativas; 
  obj.quantidade = listaI.length;
  return obj; 

}

$scope.formatarData = function(d){
  if(!d) return '-';
  var date = new Date(d);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ':' + seconds;
  return   date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " às " + strTime;

}

$scope.graficoUsuario = true;
$scope.graficoQuestao = true;
$scope.toggleRespostas = function(){
  $scope.mostrarRespostas = !$scope.mostrarRespostas;
}
$scope.toggleTentativas = function(){
  $scope.mostrarTentativas = !$scope.mostrarTentativas;
}

$scope.toggleGraficoUsuario = function(){
  $scope.graficoUsuario = !$scope.graficoUsuario;
}

$scope.toggleGraficoQuestao = function(){
  $scope.graficoQuestao = !$scope.graficoQuestao;
}

$scope.abrirGraficoUnitario = function(item){
  // console.log(item);

   Highcharts.chart('container3', {
           title : {

            text: "Nível X Respostas"
          },
          xAxis: {
           // visible: false
           allowDecimals : false,
           title : {

            text: "Resposta"
          } 
        },

        yAxis: {
               // ceilling: 1800,
               // min: 1300,
               title : {

                text: "Nível"
              } 
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.y}</b><br/>',

              shared: true
            },

            series:  [{
                  data: item.pontosAcumulados,
                  name: item.titulo || item.idUsuario

            }]
          });

}

$scope.deletar = function(idDeletar){
  $http({
    method: 'DELETE',
    url: CONSTANTS.API_HOST + '/resposta/delete/'+idDeletar
  }).then(function successCallback(response) {

    listarDados();  


  }, function errorCallback(response) {
    console.log(response);
  });
}


}]);



})(angular.module('app.view'));