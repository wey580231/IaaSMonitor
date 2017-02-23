/**
 * Created by Fanan on 2017/2/20.
 */
angular.module('app.portDetail', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewPort', {
        templateUrl: 'app/components/servers/portDetail.html',
        controller: 'portDetailController'
    })
    $routeProvider.when('/viewPort_en', {
        templateUrl: 'app/components/servers/portDetail_en.html',
        controller: 'portDetailController'
    })
}]).controller("portDetailController", function ($scope, $rootScope, $routeParams, myHttpService, endPointCollection, serviceListService) {
    var id = $routeParams.id;
    var adminUrls;
    $scope.hasDetail = false;
    $scope.hasDetail = false;
    $scope.hasFlavors = false;
    $scope.hasIP = false;
    $scope.hasImage = false;
    $scope.haslink = false;

    var hasLoadOperateLog = false;
    var hasLoadConsoleLog = false;

    if (id != undefined) {
        var adminUrl = endPointCollection.adminURL("network");
        if (adminUrl != undefined) {
            adminUrls = adminUrl + serviceListService.portDetail + id;
            myHttpService.get('mainController', adminUrls)
                .then(function (response) {
                    if (response.data.port) {
                        $scope.hasError = false;
                        $scope.port = response.data.port;
                    }
                    else if (response.data.error) {
                        $scope.hasError = true;
                        $scope.errorMessage = response.data.error.message;
                    }
                }, function (response) {
                    $scope.hasError = true;
                    $scope.errorMessage = response.data.error.message;
                });
        }
    }
});
