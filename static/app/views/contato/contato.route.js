(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {


	    $stateProvider.state({
            name: 'app.contato',
            url: '/contato',
            templateUrl: 'app/views/contato/contato.html',
            controller: 'ContatoCtrl',
            resolve: {
                carregar: ['LoadDynamicService', function (LoadDynamicService) {
                    return LoadDynamicService.load('app/views/contato/contato.controller.js');
                }]
            },
            data: {
                // css : "resources/css/home.css",
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