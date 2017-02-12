angular.module("app.user", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showUser', {
            templateUrl: 'app/components/user/user.html',
            controller: 'userController'
        })
    }])
    .controller("userController", function ($scope, $http, $location, endPointCollection, $rootScope, myHttpService, serviceListService){
        myHttpService.get('/mainController', endPointCollection.adminURL('identity') + serviceListService.ListUsers)
            .then(function (response) {
                $scope.list = response.data.users;
            }, function (response) {
            });
    });