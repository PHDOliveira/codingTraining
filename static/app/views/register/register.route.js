(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {


	    $stateProvider.state({
            name: 'app.register',
            url: '/register',
            templateUrl: 'app/views/register/register.html',
            controller: 'RegisterCtrl',
            resolve: {
                carregar: ['LoadDynamicService', function (LoadDynamicService) {
                    return LoadDynamicService.load('app/views/register/register.controller.js');
                }]
            },
            data: {
                css : "resources/css/register.css",
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