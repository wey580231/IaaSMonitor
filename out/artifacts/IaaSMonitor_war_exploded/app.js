'use strict';
angular.module("app", [
    'ngRoute',
    'app.serversInfo'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/showServersInfo'});
    }]);
