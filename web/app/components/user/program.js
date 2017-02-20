angular.module("app.program", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showProgram', {
            templateUrl: 'app/components/user/program.html',
            controller: 'programController'
        })
    }])
    .controller("programController", function ($scope, $http, $location, endPointCollection, $rootScope, myHttpService, serviceListService) {
        if (endPointCollection.adminURL('identity') && endPointCollection.adminURL('identity').length > 28) {
            myHttpService.get('mainController', endPointCollection.adminURL('identity').substring(0, 27) + serviceListService.ListProjects)
                .then(function (response) {
                    $scope.list = response.data.projects;
                }, function (response) {
                });
        }
    });