(function (module) {

    'use strict';

    module.config(['$urlRouterProvider', function ($urlRouterProvider) {

        //Fix Angular Permission
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get("$state");
            $state.go('app.home');
        });

    }]);



})(angular.module('app.view', []));
