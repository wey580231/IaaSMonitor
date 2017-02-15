/**
 * Created by wey580231 on 2017/2/15.
 */
angular.module('app.totalSummary', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showSummary', {
            templateUrl: 'app/components/summary/totalSummary.html',
            controller: 'totalSummaryController'
        })
    }])
    .controller('totalSummaryController', function ($scope, $rootScope, endPointCollection, myHttpService, serviceListService) {
        $scope.totalPage = 0;
        $scope.currPage = 0;
        var count = 0;
        var serverList = [];
        $scope.pageList = [20, 30, 50];
        var perpage = $scope.pageList[0];

        var serverUrl = endPointCollection.adminURL('compute') + serviceListService.serviceDetail;
        myHttpService.get('/mainController', serverUrl).then(function (response) {
            if (response.data.servers) {
                var servers = response.data.servers;
                var flavorUrl = endPointCollection.adminURL('compute') + serviceListService.FlavorsDetail;
                console.log(serverUrl + "___flavorUrl")
                myHttpService.get('/mainController', flavorUrl).then(function (response) {
                    if (response.data.flavors) {
                        var flavors = response.data.flavors;

                        for (var i = 0; i < servers.length; i++) {
                            var server = servers[i];
                            var obj = {};
                            obj.name = server.name;
                            obj.id = server.id;
                            obj.created = server.created;
                            var hasFindFlavor = false;
                            for (var j = 0; j < flavors.length; j++) {
                                var flavor = flavors[j];
                                if (server.flavor.id == flavor.id) {
                                    hasFindFlavor = true;
                                    obj.ram = flavor.ram;               //内存
                                    obj.disk = flavor.disk + "GB";      //磁盘
                                    obj.vcpus = flavor.vcpus;           //cpu

                                    if (obj.ram < 1024) {
                                        obj.ram += "bytes";
                                    }
                                    else {
                                        obj.ram = obj.ram / 1024 + "GB";
                                    }
                                }
                            }
                            if (!hasFindFlavor) {
                                obj.ram = "0GB";
                                obj.disk = "0GB";
                                obj.vcpus = 0;
                            }
                            serverList.push(obj);
                        }
                        initPage();
                    }
                    else if (response.data.error) {

                    }
                }, function (response) {

                });

            }
            else if (response.data.error) {

            }
        }, function (response) {

        });

        //初始化信息
        var initPage = function () {
            if (serverList.length > 0) {
                count = serverList.length;
                $scope.totalPage = Math.ceil(count / perpage);
                console.log(count + "_totalPage:" + $scope.totalPage)
                $scope.currPage = 0;
                showPage($scope.currPage);
            }
        };

        //切换每页显示的条目
        $scope.changePerPage = function (perPageShow) {

            perpage = perPageShow;
            console.log("perpage:" + perpage)
            initPage();
        }

        //实现某页信息
        var showPage = function (pageId) {
            if (pageId < 0 || pageId >= $scope.totalPage) {
                return;
            }
            $scope.currPage = pageId;
            var start = $scope.currPage * perpage;
            var end = (count - start) > perpage ? perpage : (count - start);
            $scope.serverList = serverList.slice(start, start + end);
        };

        //上一页
        $scope.previousPage = function () {
            showPage($scope.currPage - 1);
        };

        //下一页
        $scope.nextPage = function () {
            showPage($scope.currPage + 1);
        };

    });
