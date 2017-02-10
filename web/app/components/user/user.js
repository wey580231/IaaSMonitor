angular.module("app.user", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showUser', {
            templateUrl: 'app/components/user/user.html',
            controller: 'userController'
        })
    }])
    .controller("userController", function ($scope, $http, $location) {
    });