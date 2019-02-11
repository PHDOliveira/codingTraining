(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {


	    $stateProvider.state({
            name: 'app.view1',
            url: '/view1',
            templateUrl: 'app/views/view1/view1.html',
            controller: 'View1Ctrl',
            resolve: {
                carregar: ['LoadDynamicService', function (LoadDynamicService) {
                    return LoadDynamicService.load('app/views/view1/view1.controller.js');
                }]
            },
            data: {
                css : "resources/css/view1.css",
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