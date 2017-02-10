angular.module("app.instances", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showInstances', {
            templateUrl: 'app/components/servers/instances.html',
            controller: 'instanceController'
        })
    }])
    .controller("instanceController", function ($scope, $http, $location) {
    });