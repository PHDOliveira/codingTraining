(function (module) {

	'use strict';

  
	module.config(['$stateProvider', function ($stateProvider) {


	    $stateProvider.state({
            name: 'app.view2',
            url: '/view2',
            templateUrl: 'app/views/view2/view2.html',
            controller: 'View2Ctrl',
            resolve: {
                carregar: ['LoadDynamicService', function (LoadDynamicService) {
                    return LoadDynamicService.load('app/views/view2/view2.controller.js');
                }]
            },
            data: {
                // permissions: {
                    // only: ['ACESSAR_VIEW_2'],
                    // redirectTo: {
                    //     default: 'main.acessoNegado'
                    // }
                // }
            }
	    });
	}]);


})(angular.module('app.view'));