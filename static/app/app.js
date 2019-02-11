//'use strict';
//
//// Declare app level module which depends on views, and components
//angular.module('myApp', [
//  'ngRoute',
//  'myApp.view1',
//  'myApp.view2',
//  'myApp.version'
//]).
//config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
//  $locationProvider.hashPrefix('!');
//
//  $routeProvider.otherwise({redirectTo: '/view1'});
//}]);
(function (module) {

    'use strict';

    module.config(['$compileProvider', '$controllerProvider', '$provide', function ($compileProvider, $controllerProvider, $provide) {
        $compileProvider.debugInfoEnabled(false);
        angular.module('app.view').controller = $controllerProvider.register;
        angular.module('app.view').service = $provide.service;
        angular.module('app.view').factory = $provide.factory;
    }]);

    module.config(['$permissionProvider', function ($permissionProvider) {
        $permissionProvider.setDefaultOnAuthorizedMethod('attachElement');
        $permissionProvider.setDefaultOnUnauthorizedMethod('detachElement');
    }]);

    module.run(['PermPermissionStrategies', 'PermPermissionStore','Local', function (PermPermissionStrategies, PermPermissionStore,Local) {
        PermPermissionStrategies.attachElement = function ($element) {
            $element.removeAttr('disabled');
        };

        PermPermissionStrategies.detachElement = function ($element) {
            $element.attr('disabled', 'disabled');
        };

       
        if(Local.get('usuario')){
            var permissions = Local.get('usuario').permissions;
            PermPermissionStore.defineManyPermissions(permissions, function (permissionName) {
                return _.includes(permissions, permissionName);
            });    
        }
        
    }]);

})(angular.module('app', [
    'permission',
    'permission.ui',
    'LocalStorageModule',
    'uiRouterStyles',
    'app.view',
    'app.services',
    'app.components',

    ])
);

