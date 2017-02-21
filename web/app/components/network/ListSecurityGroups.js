/**
 * Created by hanch on 2017/2/12.
 */
angular.module("app.securityGroups", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showSecurityGroups', {
            templateUrl: 'app/components/network/ListSecurityGroups.html',
            controller: 'securityGroups'
        })
    }])
    .controller("securityGroups", function ($scope, $http, $location, myHttpService, endPointCollection, serviceListService) {
        myHttpService.get('mainController', endPointCollection.adminURL('network') + serviceListService.ListSecurityGroups)
            .then(function (response) {
                $scope.list = response.data.security_groups;
            }, function (response) {
            });
    });