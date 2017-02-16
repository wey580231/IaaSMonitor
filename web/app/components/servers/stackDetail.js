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
        var stackName = $routeParams.stackName;
        $scope.hasError = false;
        if (id && stackName) {
            var url = endPointCollection.adminURL('orchestration') + serviceListService.ListStack + "/" + stackName + "/" + id;
            console.log("url:" + url);
            myHttpService.get('/mainController', url)
                .then(function (response) {
                    $scope.stack = response.data.stack;
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
