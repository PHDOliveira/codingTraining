(function(module) {

	'use strict';

	module.controller('MainCtrl', ['$scope', 'CONSTANTS','Local','$state','$rootScope','PermPermissionStore', function($scope, CONSTANTS,Local,$state,$rootScope,PermPermissionStore) {
		$scope.versao = CONSTANTS.VERSION;
		$scope.dataHoraBuild = CONSTANTS.DATA_BUILD;
		$scope.producao = CONSTANTS.IS_PRODUCAO;

		$rootScope.logado = Local.get('logado');
		$rootScope.usuario = Local.get('usuario');
		
		if($rootScope.usuario){

		$rootScope.controlsMenu = $rootScope.usuario.permissions.indexOf("root")>-1?true:false;
		$rootScope.isAvaliador = $rootScope.usuario.permissions.indexOf("avaliador")>-1?true:false;
		}else{
			$rootScope.controlsMenu = false;
		}

		$scope.logout = function(){
			Local.del('logado');
			Local.del('usuario');
			$state.go("app.login");
			$rootScope.logado = false;
			$rootScope.controlsMenu = false;
			$rootScope.isAvaliador = false;
			$rootScope.usuario = {};
			PermPermissionStore.clearStore();
		}

	}]);

})(angular.module('app.view'));
