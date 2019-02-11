(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {


	    $stateProvider.state({
            name: 'app.exercicios',
            url: '/exercicios',
            templateUrl: 'app/views/exercicios/exercicios.html',
            controller: 'ExerciciosCtrl',
            resolve: {
                carregar: ['LoadDynamicService', function (LoadDynamicService) {
                    return LoadDynamicService.load('app/views/exercicios/exercicios.controller.js');
                }]
            },
            data: {
                css : "resources/css/exercicios.css",
                permissions: {
                    only: ['aluno'],
                    redirectTo: {
                        default: 'app.home'
                    }
                }
            }
	    });
	}]);



})(angular.module('app.view'));