(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {


	    $stateProvider.state({
            name: 'app.login',
            url: '/login',
            templateUrl: 'app/views/login/login.html',
            controller: 'LoginCtrl',
            resolve: {
                carregar: ['LoadDynamicService', function (LoadDynamicService) {
                    return LoadDynamicService.load('app/views/login/login.controller.js');
                }]
            },
            data: {
                css : "resources/css/login.css",
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