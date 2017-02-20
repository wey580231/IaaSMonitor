angular.module("app.route", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showRoute', {
            templateUrl: 'app/components/network/route.html',
            controller: 'routeController'
        })
    }])
    .controller("routeController", function ($scope, myHttpService, endPointCollection, serviceListService) {
        myHttpService.get('mainController', endPointCollection.adminURL('network') + serviceListService.Listrouters)
            .then(function (response) {
                $scope.list = response.data.routers;
            }, function (response) {
            });
    });