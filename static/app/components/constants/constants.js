(function (module) {
    'use strict';

    module.constant('CONSTANTS', {
        API_HOST: 'http://localhost:3000/server',
        EXECUTOR_ERRORS: ["SyntaxError","SyntaxError: Unexpected token true","TimeoutError","ReferenceError","TypeError"],
    });

})(angular.module('app.components', []));