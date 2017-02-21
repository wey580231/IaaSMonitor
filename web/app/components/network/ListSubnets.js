/**
 * Created by hanch on 2017/2/12.
 */
angular.module("app.listSubnets", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showListSubnets', {
            templateUrl: 'app/components/network/ListSubnets.html',
            controller: 'listSubnetsController'
        })
    }])
    .controller("listSubnetsController", function ($scope, $http, $location, myHttpService, endPointCollection, serviceListService) {
        myHttpService.get('mainController', endPointCollection.adminURL('network') + serviceListService.ListSubnets)
            .then(function (response) {
                $scope.list = response.data.subnets;
            }, function (response) {
            });
    });