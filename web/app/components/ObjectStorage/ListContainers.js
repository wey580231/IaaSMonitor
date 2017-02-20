angular.module("app.ListContainers", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showListContainers', {
            templateUrl: 'app/components/ObjectStorage/ListContainers.html',
            controller: 'ListContainersController'
        })
    }])
    .controller("ListContainersController", function ($scope, myHttpService, endPointCollection, serviceListService) {
        myHttpService.get('mainController', endPointCollection.adminURL('object-store') + serviceListService.ListContainers)
            .then(function (response) {
                $scope.list = response.data;
            }, function (response) {
            });
        $scope.doPressed = function (event) {
            var buttonLable = event.target.outerText;
            $scope.dialogTitie = buttonLable;

            myHttpService.get('mainController', endPointCollection.adminURL('object-store') + "/" + buttonLable + serviceListService.ListContainers)
                .then(function (response) {
                    $scope.fileList = response.data;
                }, function (response) {
                });
        }
    });