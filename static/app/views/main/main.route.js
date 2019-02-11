(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state({
            name: 'app',
            controller: 'MainCtrl',
            templateUrl: 'app/views/main/main.html',
            resolve: {
                carregar: ['LoadDynamicService', function (LoadDynamicService) {
                    return LoadDynamicService.load('app/views/main/main.controller.js');
                }]
            },
            abstract: true
        });

	}]);



})(angular.module('app.view'));