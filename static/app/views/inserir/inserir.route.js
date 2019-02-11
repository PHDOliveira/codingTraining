(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {


       $stateProvider.state({
        name: 'app.inserir',
        url: '/inserir',
        templateUrl: 'app/views/inserir/inserir.html',
        controller: 'InserirCtrl',
        resolve: {
            carregar: ['LoadDynamicService', function (LoadDynamicService) {
                return LoadDynamicService.load('app/views/inserir/inserir.controller.js');
            }]
        },
        data: {
            css : "resources/css/inserir.css",
            permissions: {
                only: ['root'],
                redirectTo: {
                    default: 'app.home'
                }
            }
        }
    });
   }]);



})(angular.module('app.view'));