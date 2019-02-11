(function (module) {

    'use strict';

    module.service('LoadDynamicService', ['$q', '$rootScope', function ($q, $rootScope) {
        this.load = function (path) {
            var deferred = $q.defer();
            if (path)
                $script(path, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
            return deferred.promise;
        }
    }]);

})(angular.module('app.services'));