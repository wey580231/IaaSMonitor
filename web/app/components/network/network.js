angular.module("app.network", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showNetwork', {
            templateUrl: 'app/components/network/network.html',
            controller: 'networkController'
        })
    }])
    .controller("networkController", function ($scope, $http, $location) {
    });