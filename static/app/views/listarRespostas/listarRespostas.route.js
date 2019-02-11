(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {


	    $stateProvider.state({
            name: 'app.listarRespostas',
            url: '/listar-respostas',
            templateUrl: 'app/views/listarRespostas/listarRespostas.html',
            controller: 'ListarRespostasCtrl',
            resolve: {
                carregar: ['LoadDynamicService', function (LoadDynamicService) {
                    return LoadDynamicService.load('app/views/listarRespostas/listarRespostas.controller.js');
                }]
            },
            data: {
                css : "resources/css/listarRespostas.css",
                permissions: {
                    only: ['root','avaliador'],
                    redirectTo: {
                        default: 'app.home'
                    }
                }
            }
	    });
	}]);



})(angular.module('app.view'));