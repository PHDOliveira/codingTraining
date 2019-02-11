(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {


	    $stateProvider.state({
            name: 'app.listar',
            url: '/listar',
            templateUrl: 'app/views/listar/listar.html',
            controller: 'ListarCtrl',
            resolve: {
                carregar: ['LoadDynamicService', function (LoadDynamicService) {
                    return LoadDynamicService.load('app/views/listar/listar.controller.js');
                }]
            },
            data: {
                css : "resources/css/listar.css",
                permissions: {
                    // only: ['ACESSAR_VIEW_1'],
                    // redirectTo: {
                    //     default: 'main.acessoNegado'
                    // }
                }
            }
	    });
	}]);



})(angular.module('app.view'));