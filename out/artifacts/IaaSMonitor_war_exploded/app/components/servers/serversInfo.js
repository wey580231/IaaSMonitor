angular.module("app.serversInfo", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showServersInfo', {
            templateUrl: 'app/components/servers/serversInfo.html',
            controller: 'serversInfo'
        })
    }])
    .controller("serversInfo", function ($scope, endPointCollection, myHttpService, serviceListService) {
        myHttpService.get('/mainController', endPointCollection.adminURL('compute') + serviceListService.serviceDetail)
            .then(function (response) {
                $scope.list = response.data.servers;
            }, function (response) {
            });
    });
