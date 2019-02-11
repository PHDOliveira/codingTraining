(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {


       $stateProvider.state({
        name: 'app.responder',
        url: '/responder',
        templateUrl: 'app/views/responder/responder.html',
        controller: 'ResponderCtrl',
        resolve: {
            carregar: ['LoadDynamicService', function (LoadDynamicService) {
                return LoadDynamicService.load('app/views/responder/responder.controller.js');
            }]
        },
        params: {
            dadosExercicio: null
        },
        data: {
            css : "resources/css/responder.css",
            permissions: {
                only: ['aluno'],
                redirectTo: {
                    default: 'app.home'
                }
            }
        }
    });
   }]);



})(angular.module('app.view'));