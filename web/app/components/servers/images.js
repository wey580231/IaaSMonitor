angular.module("app.images", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showImages', {
            templateUrl: 'app/components/servers/images.html',
            controller: 'imageController'
        })
    }])
    .controller("imageController", function ($scope, $http, $location, endPointCollection, $rootScope, myHttpService, serviceListService){
        myHttpService.get('mainController', endPointCollection.adminURL('image')+ serviceListService.ShowImages)
            .then(function (response) {
                $scope.list = response.data.images;
            }, function (response) {
            });
    });