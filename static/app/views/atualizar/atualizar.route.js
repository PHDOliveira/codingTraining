(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {


       $stateProvider.state({
        name: 'app.atualizar',
        url: '/atualizar',
        templateUrl: 'app/views/atualizar/atualizar.html',
        controller: 'AtualizarCtrl',
        resolve: {
            carregar: ['LoadDynamicService', function (LoadDynamicService) {
                return LoadDynamicService.load('app/views/atualizar/atualizar.controller.js');
            }]
        },
        params:{
            dadoAtualizar: null,
        },
        data: {
            css : "resources/css/atualizar.css",
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