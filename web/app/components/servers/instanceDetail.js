/**
 * Created by Fanan on 2017/2/15.
 */

angular.module('app.instanceDetail', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewInstance', {
        templateUrl: 'app/components/servers/instanceDetail.html',
        controller: 'instanceDetailController'
    })
    $routeProvider.when('/viewInstance_en', {
        templateUrl: 'app/components/servers/instanceDetail_en.html',
        controller: 'instanceDetailController'
    })
}]).controller("instanceDetailController", function ($scope, $rootScope, $routeParams, myHttpService, endPointCollection, serviceListService) {
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
        var adminUrl = endPointCollection.adminURL("compute");
        if (adminUrl != undefined) {
            adminUrls = adminUrl + serviceListService.instancDeatail + id;
            myHttpService.get('mainController', adminUrls)
                .then(function (response) {
                    if (response.data.server) {
                        $scope.hasDetail = true;
                        $scope.hasIP = true;
                        $scope.haslink = true;
                        $scope.hasError = false;
                        $scope.hasRequest = true;

                        $scope.server = response.data.server;

                        var flavorUrl = adminUrl + serviceListService.Flavors + $scope.server.flavor.id;
                        var SecurityGroupsUrl = adminUrl + serviceListService.instancDeatail + id + serviceListService.securitygroupDetail;
                        var imageUrl = adminUrl + serviceListService.imageDetail + $scope.server.image.id;

                        //flavor
                        myHttpService.get('mainController', flavorUrl)
                            .then(function (response) {
                                if (response.data.flavor) {
                                    $scope.hasFlavors = true;
                                    $scope.flavor = response.data.flavor;

                                    $scope.flavor.ram = $scope.flavor.ram / 1024;
                                }
                            });

                        //SecurityGroup
                        myHttpService.get('mainController', SecurityGroupsUrl)
                            .then(function (response) {
                                if (response.data.security_groups.length > 0) {
                                    $scope.hasSafegroup = true;
                                    $scope.safeGroup = response.data.security_groups[0].rules;
                                }
                            });

                        //image
                        myHttpService.get('mainController', imageUrl)
                            .then(function (response) {
                                $scope.hasImage = true;
                                $scope.image = response.data.image;
                            });
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

    //显示操作日志
    $scope.showOperateLog = function () {
        if (!hasLoadOperateLog) {
            var requestUrl = adminUrls + serviceListService.InstanceOperateLog;
            myHttpService.get('mainController', requestUrl)
                .then(function (response) {
                    hasLoadOperateLog = true;
                    $scope.request = response.data.instanceActions;
                });
        }
    }

    //显示控制台信息
    $scope.showConsoleLog = function () {
        if (!hasLoadConsoleLog) {
            var requestUrl = adminUrls + serviceListService.ConsoleOutput;
            var body = {'length': 50, 'url': requestUrl};
            myHttpService.post('console', body).then(function (response) {
                $scope.consoleData = response.data.output;
                hasLoadConsoleLog = true;
            }, function (response) {
                $scope.consoleData = response.data.error;
            });
        }
    }
});
