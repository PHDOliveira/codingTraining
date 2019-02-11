(function (module) {

	'use strict';



	module.controller('LoginCtrl', ['$scope','Local','$state','$rootScope','$http','CONSTANTS','PermPermissionStore', function ($scope,Local,$state,$rootScope,$http,CONSTANTS,PermPermissionStore) {
		


	$scope.logar = function(obj){
		$http({
			url: CONSTANTS.API_HOST + '/login',
			method: "POST",
			data: $scope.obj,
			headers: {
				"Content-Type": "application/json"
			}
			
		})
		.then(function(response) {
			$scope.msgError = false;
			Local.set('logado',true);
			Local.set('usuario',response.data.obj);
			
			var permissions = response.data.obj.permissions;

			PermPermissionStore.defineManyPermissions(permissions, function (permissionName) {
				return _.includes(permissions, permissionName);
			});
			$state.go("app.exercicios");
			$rootScope.logado = Local.get('logado');
			$rootScope.usuario = Local.get('usuario');

			if($rootScope.usuario){
				$rootScope.controlsMenu = $rootScope.usuario.permissions.indexOf("root")>-1?true:false;
				$rootScope.isAvaliador = $rootScope.usuario.permissions.indexOf("avaliador")>-1?true:false;
			}else{
				$rootScope.controlsMenu = false;
			}


		}, 
		function(response) { 
			
			console.log(response.data);
			$scope.msgError = response.data.errMsg;
		});
	}


}]);

})(angular.module('app.view'));