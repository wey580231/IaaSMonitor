/**
 * Created by wey580231 on 2017/2/16.
 */
angular.module('app.stacksDetail', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/viewStack', {
            templateUrl: 'app/components/servers/stackDetail.html',
            controller: 'stackDetailController',
            resolve: {
                'stackDetailService': ['$q', '$route', 'myHttpService', 'endPointCollection', 'serviceListService', function ($q, $route, myHttpService, endPointCollection, serviceListService) {
                    var service = {};
                    var id = $route.current.params['id'];
                    var _getData = function () {
                        var deferred = $q.defer();
                        var promise = deferred.promise;
                        myHttpService.get('mainController', endPointCollection.adminURL('orchestration') + serviceListService.stackDetail + id).then(function (response) {
                            deferred.resolve(response.data);
                        }, function (response) {
                            deferred.reject(response.data);
                        });
                        return promise;
                    }
                    service.getData = _getData;
                    return service;
                }]
            }
        });
        $routeProvider.when('/viewStack_en', {
            templateUrl: 'app/components/servers/stackDetail_en.html',
            controller: 'stackDetailController',
            resolve: {
                'stackDetailService': ['$q', '$route', 'myHttpService', 'endPointCollection', 'serviceListService', function ($q, $route, myHttpService, endPointCollection, serviceListService) {
                    var service = {};
                    var id = $route.current.params['id'];
                    var _getData = function () {
                        var deferred = $q.defer();
                        var promise = deferred.promise;
                        myHttpService.get('mainController', endPointCollection.adminURL('orchestration') + serviceListService.stackDetail + id).then(function (response) {
                            deferred.resolve(response.data);
                        }, function (response) {
                            deferred.reject(response.data);
                        });
                        return promise;
                    }
                    service.getData = _getData;
                    return service;
                }]
            }
        });

    }])
    .controller('stackDetailController', function ($scope, $rootScope, $location, $routeParams, endPointCollection, myHttpService, serviceListService, JsonParse, stackDetailService) {
        var id = $routeParams.id;
        var hasLoadEvent = false;
        var hasLoadResources = false;
        var hasLoadTemplate = false;
        $scope.hasError = false;
        if (id) {
            var url = endPointCollection.adminURL('orchestration') + serviceListService.stackDetail + id;

            stackDetailService.getData()
                .then(function (data) {
                    $scope.hasstack = true;
                    $scope.stack = data.stack;
                    var outPuts = data.stack.outputs;
                    //先將obj用json.stringify转换成字符串，然后再将其格式化输出
                    // for (var i = 0; i < outPuts.length; i++) {
                    // outPuts[i].output_value = JsonParse.format(JSON.stringify(outPuts[i].output_value));
                    // }
                    $scope.instancesGroup = outPuts;

                }, function (data) {
                    $scope.hasError = true;
                    $scope.errorMessage = data.error.message;
                });
        }
        else {
            $scope.hasError = true;
            $scope.errorMessage = "无法找到相关信息，请重新选择!";
        }

        //加载事件
        $scope.loadEvent = function () {
            if (!hasLoadEvent) {
                var eventUrl = url + serviceListService.stackeventDetail;

                myHttpService.get('mainController', eventUrl)
                    .then(function (response) {
                        $scope.eventList = response.data.events;
                        hasLoadEvent = true;
                    }, function (response) {
                        $scope.hasError = true;
                        $scope.errorMessage = response.data.error.message;
                    });
            }
        }

        //加载资源
        $scope.loadResource = function () {
            if (!hasLoadResources) {
                var resourceUrl = url + serviceListService.stackresourceDetail;

                myHttpService.get('mainController', resourceUrl)
                    .then(function (response) {
                        $scope.resourceList = response.data.resources;
                        hasLoadResources = true;
                    }, function (response) {
                        $scope.hasError = true;
                        $scope.errorMessage = response.data.error.message;
                    });
            }
        }

        //加载模板
        $scope.loadTemplate = function () {
            if (!hasLoadTemplate) {
                var templateUrl = url + serviceListService.stacktemplateDetail;
                myHttpService.get('mainController', templateUrl)
                    .then(function (response) {
                        $scope.hastemplate = true;
                        $scope.stacktemplate = response.data;
                        hasLoadTemplate = true;
                    }, function (response) {
                        $scope.hasError = true;
                        $scope.errorMessage = response.data.error.message;
                    });
            }
        }
    });
