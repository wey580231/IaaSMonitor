angular.module("app.safety", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showSafety', {
            templateUrl: 'app/components/servers/safety.html',
            controller: 'safetyController'
        })
    }])
    .controller("safetyController", function ($scope, $http, $location) {
    });