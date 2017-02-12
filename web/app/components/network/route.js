angular.module("app.route", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showRoute', {
            templateUrl: 'app/components/network/route.html',
            controller: 'routeController'
        })
    }])
    .controller("routeController", function ($scope, $http, $location) {
    });