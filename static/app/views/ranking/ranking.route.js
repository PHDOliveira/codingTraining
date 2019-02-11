(function (module) {

	'use strict';


	module.config(['$stateProvider', function ($stateProvider) {


       $stateProvider.state({
        name: 'app.ranking',
        url: '/rankingTesting',
        templateUrl: 'app/views/ranking/ranking.html',
        controller: 'RankingCtrl',
        resolve: {
            carregar: ['LoadDynamicService', function (LoadDynamicService) {
                return LoadDynamicService.load('app/views/ranking/ranking.controller.js');
            }]
        },
        data: {
            css : "resources/css/ranking.css",
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