(function (module) {

	'use strict';



	module.controller('CadastroManualCtrl', ['$scope','Local','$state','$rootScope','$http','CONSTANTS', function ($scope,Local,$state,$rootScope,$http,CONSTANTS) {
		
		
		$scope.mostrarTermos = false;
		$scope.cadastrarse = function(obj){
			obj.permissoes = obj.permissoes.split(",");
			if(obj.senha !== obj.senha2){
				$scope.msgSenha = "As senhas devem ser iguais";
				
			}else{
				$scope.msgSenha = false;

			}
			if($scope.registro.$valid && obj.senha === obj.senha2){

				$http({
					url: CONSTANTS.API_HOST + '/create-user-manual',
					method: "POST",
					data: obj 
				})
				.then(function(response) {
					$scope.msgSucces = true;
					$scope.msgError = false;
					setTimeout(function(){
						$state.go("app.login")
					},1000);
				}, 
				function(response) { 
					$scope.msgError = response.data.errMsg;
					$scope.msgSucces = false;
				});
			}
		}

		$scope.toogleTermos = function(){
			$scope.mostrarTermos = !$scope.mostrarTermos;
		}

	}]);

})(angular.module('app.view'));