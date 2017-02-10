angular.module("app.images", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showImages', {
            templateUrl: 'app/components/servers/images.html',
            controller: 'imageController'
        })
    }])
    .controller("imageController", function ($scope, $http, $location) {
    });