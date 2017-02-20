/**
 * Created by hanch on 2017/2/12.
 */
angular.module("app.port", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showPort', {
            templateUrl: 'app/components/network/ListPorts.html',
            controller: 'portController'
        })
    }])
    .controller("portController", function ($scope, $http, $location , myHttpService , endPointCollection , serviceListService) {
        myHttpService.get('mainController', endPointCollection.adminURL('network') + serviceListService.Listports)
            .then(function (response) {
                $scope.list = response.data.ports;
            }, function (response) {
            });
    });