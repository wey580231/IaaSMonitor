/**
 * Created by wey580231 on 2017/1/12.
 */
angular.module("app.serversInfo", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showServersInfo', {
            templateUrl: 'app/components/servers/serversInfo.html',
            controller: 'serversInfo'
        })
    }])
    .controller("serversInfo", function ($scope, $http, $location) {
        $http({
            method: 'get',
            url: '/mainController'
        })
        .then(function (response)
        {
            $scope.list = response.data.servers;
        }, function (response)
        {
        });
    });
