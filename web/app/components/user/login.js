angular.module('app.login', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/loginError', {
        templateUrl: 'app/components/user/login.html',
        controller: 'loginController'
    })
}])
    .controller("loginController", function ($scope, $http, $location) {
    });