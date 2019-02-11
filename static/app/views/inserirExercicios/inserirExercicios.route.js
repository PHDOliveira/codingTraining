(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {


	    $stateProvider.state({
            name: 'app.inserirExercicios',
            url: '/inserirExercicios',
            templateUrl: 'app/views/inserirExercicios/inserirExercicios.html',
            controller: 'InserirExerciciosCtrl',
            resolve: {
                carregar: ['LoadDynamicService', function (LoadDynamicService) {
                    return LoadDynamicService.load('app/views/inserirExercicios/inserirExercicios.controller.js');
                }]
            },
             params:{
                dadoAtualizar: null,
            },
            data: {
                css : "resources/css/inserirExercicios.css",
                permissions: {
                    only: ['root'],
                    redirectTo: {
                        default: 'app.home'
                    }                }
            }
	    });
	}]);



})(angular.module('app.view'));