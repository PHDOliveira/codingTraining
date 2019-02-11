(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {


       $stateProvider.state({
        name: 'app.cadastroManual',
        url: '/cadastroManual',
        templateUrl: 'app/views/cadastroManual/cadastroManual.html',
        controller: 'CadastroManualCtrl',
        resolve: {
            carregar: ['LoadDynamicService', function (LoadDynamicService) {
                return LoadDynamicService.load('app/views/cadastroManual/cadastroManual.controller.js');
            }]
        },
        data: {
                // css : "resources/css/cadastroManual.css",
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