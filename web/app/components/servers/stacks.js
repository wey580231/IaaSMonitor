/**
 * Created by wey580231 on 2017/2/16.
 */
angular.module('app.stacks', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showStacks_zh', {
            templateUrl: 'app/components/servers/stacks.html',
            controller: 'stackController',
            resolve: {
                'stackService': ['$q', 'myHttpService', 'endPointCollection', 'serviceListService', function ($q, myHttpService, endPointCollection, serviceListService) {
                    var service = {};
                    var _getData = function () {
                        var deferred = $q.defer();
                        var promise = deferred.promise;
                        var url = endPointCollection.adminURL('orchestration') + serviceListService.ListStack;
                        myHttpService.get('mainController', url)
                            .then(function (response) {
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
        $routeProvider.when('/showStacks_en', {
            templateUrl: 'app/components/servers/stacks_en.html',
            controller: 'stackController',
            resolve: {
                'stackService': ['$q', 'myHttpService', 'endPointCollection', 'serviceListService', function ($q, myHttpService, endPointCollection, serviceListService) {
                    var service = {};
                    var _getData = function () {
                        var deferred = $q.defer();
                        var promise = deferred.promise;
                        var url = endPointCollection.adminURL('orchestration') + serviceListService.ListStack;
                        myHttpService.get('mainController', url)
                            .then(function (response) {
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
    .controller('stackController', function ($scope, $rootScope, $location, endPointCollection, pageSwitch, myHttpService, serviceListService, stackService, endpointService, tableSortService) {

        $scope.pageList = pageSwitch.pageList;

        var selectedCheckArray = [];    //选中的checkbox的id值集合
        var stackList = [];

        if ($rootScope.isLog == undefined) {
            endpointService.getEndPoints().then(function (data) {
                initPage();
            }, function (data) {

            });
        }
        else {
            initPage();
        }

        function initPage() {
            stackService.getData()
                .then(function (data) {
                    $scope.list = data.stacks;
                    stackList = data.stacks;
                    pageSwitch.initPage(stackList);
                    $scope.totalPage = pageSwitch.totalPage;
                    $scope.currPage = pageSwitch.currPage;
                    $scope.serverList = pageSwitch.showPage(pageSwitch.currPage);
                    $scope.totalCount = pageSwitch.count();
                    tableSortService.sortTable($('#mainTable'));
                }, function (data) {
                });
        }


        var updateSelected = function (action, id) {
            if (action == 'add' & selectedCheckArray.indexOf(id) == -1) {
                selectedCheckArray.push(id);
            }

            if (action == 'remove' && selectedCheckArray.indexOf(id) != -1) {
                selectedCheckArray.splice(selectedCheckArray.indexOf(id), 1);
            }

            $scope.deleteEnabled = (selectedCheckArray.length == 0);
        };

        //点击某个checkbox按钮，更新当前的状态
        $scope.updateSelection = function ($event, id) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            updateSelected(action, id);
        };

        //checkbox是否选中?
        $scope.isSelected = function (id) {
            return selectedCheckArray.indexOf(id) >= 0;
        };

        //checked状态由全选来设置
        $scope.isSelectedAll = function () {
            return (selectedCheckArray.length == stackList.length);
        };

        //全选
        $scope.selectAll = function ($event) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            for (var i = 0; i < stackList.length; i++) {
                var entity = stackList[i];
                updateSelected(action, entity.id);
            }
        };

        //切换每页显示的条目
        $scope.changePerPage = function (perPageShow) {
            $scope.list = pageSwitch.changePerPage(perPageShow);
            $scope.totalPage = pageSwitch.totalPage;
            $scope.currPage = pageSwitch.currPage;
            tableSortService.clearClass($('#mainTable'));
        };

        //上一页
        $scope.previousPage = function () {
            if (pageSwitch.pageIsCorrect($scope.currPage - 1)) {
                $scope.list = pageSwitch.showPage($scope.currPage - 1);
                $scope.totalPage = pageSwitch.totalPage;
                $scope.currPage = pageSwitch.currPage;
                tableSortService.clearClass($('#mainTable'));
            }
        };

        //下一页
        $scope.nextPage = function () {
            if (pageSwitch.pageIsCorrect($scope.currPage + 1)) {
                $scope.list = pageSwitch.showPage($scope.currPage + 1);
                $scope.totalPage = pageSwitch.totalPage;
                $scope.currPage = pageSwitch.currPage;
                tableSortService.clearClass($('#mainTable'));
            }
        };

        //条件过滤
        $scope.search = function () {
            tableSortService.filterData($scope,pageSwitch);
            tableSortService.clearClass($('#mainTable'));
        }
    });
