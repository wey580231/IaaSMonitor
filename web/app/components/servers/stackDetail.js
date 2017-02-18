/**
 * Created by wey580231 on 2017/2/16.
 */
angular.module('app.stacksDetail', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/viewStack', {
            templateUrl: 'app/components/servers/stackDetail.html',
            controller: 'stackDetailController'
        });
    }])
    .controller('stackDetailController', function ($scope, $rootScope, $location, $routeParams, endPointCollection, $rootScope, myHttpService, serviceListService) {
        var id = $routeParams.id;
        alert(id);
        var stackName = $routeParams.stackName;
        $scope.hasError = false;
        if (id && stackName) {
            var url = endPointCollection.adminURL('orchestration') + serviceListService.stackDetail+ id;
            var templateUrl=url+serviceListService.stacktemplateDetail;
            var eventUrl=url+serviceListService.stackeventDetail;
            var resourceUrl=url+serviceListService.stackresourceDetail;
            console.log("url:" + url);
            myHttpService.get('/mainController', url)
                .then(function (response) {
                    $scope.hasstack=true;
                    $scope.stack = response.data.stack;
                }, function (response) {
                    $scope.hasError = true;
                    $scope.errorMessage = response.data.error.message;
                });

            console.log("templateurl:" + templateUrl);
            myHttpService.get('/mainController', templateUrl)
                .then(function (response) {
                    $scope.hastemplate=true;
                    $scope.stacktemplate = response.data;
                }, function (response) {
                    $scope.hasError = true;
                    $scope.errorMessage = response.data.error.message;
                });

            console.log("eventUrl:" + eventUrl);
            myHttpService.get('/mainController', eventUrl)
                .then(function (response) {
                    $scope.list= response.data.events;
                }, function (response) {
                    $scope.hasError = true;
                    $scope.errorMessage = response.data.error.message;
                });

            console.log("eventUrl:" + resourceUrl);
            myHttpService.get('/mainController', resourceUrl)
                .then(function (response) {
                    $scope.list1= response.data.resources;
                }, function (response) {
                    $scope.hasError = true;
                    $scope.errorMessage = response.data.error.message;
                });
        }
        else {
            $scope.hasError = true;
            $scope.errorMessage = "无法找到相关信息，请重新选择!";
        }
    });
