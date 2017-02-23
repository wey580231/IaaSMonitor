angular.module("app.instances", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showInstances', {
            templateUrl: 'app/components/servers/instances.html',
            controller: 'instanceController'
        })
        $routeProvider.when('/showInstances_en', {
            templateUrl: 'app/components/servers/instances_en.html',
            controller: 'instanceController'
        })

    }])
    .controller("instanceController", function ($scope, $http, $location, endPointCollection, $rootScope, myHttpService, serviceListService){
        myHttpService.get('mainController', endPointCollection.adminURL('compute')+ serviceListService.serviceDetail)
            .then(function (response) {
                $scope.list = response.data.servers;
            }, function (response) {
            });
    });