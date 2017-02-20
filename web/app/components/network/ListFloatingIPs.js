/**
 * Created by hanch on 2017/2/12.
 */
angular.module("app.listFloatingIPs", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showListFloatingIPs', {
            templateUrl: 'app/components/network/ListFloatingIPs.html',
            controller: 'listFloatingIPsController'
        })
    }])
    .controller("listFloatingIPsController", function ($scope, $http, $location , myHttpService , endPointCollection , serviceListService) {
        myHttpService.get('mainController', endPointCollection.adminURL('network') + serviceListService.ListFloatingIPs)
            .then(function (response) {
                $scope.list = response.data.floatingips;
            }, function (response) {
            });
    });