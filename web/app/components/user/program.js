angular.module("app.program", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showProgram', {
            templateUrl: 'app/components/user/program.html',
            controller: 'programController'
        })
    }])
    .controller("programController", function ($scope, $http, $location) {
    });