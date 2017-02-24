/**
 * Created by wey580231 on 2017/2/15.
 */
angular.module('app.totalSummary', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showSummary_zh', {
            templateUrl: 'app/components/summary/totalSummary.html',
            controller: 'totalSummaryController'
        });
        $routeProvider.when('/showSummary_en', {
            templateUrl: 'app/components/summary/totalSummary_en.html',
            controller: 'totalSummaryController'
        })
    }])
    .controller('totalSummaryController', function ($q, $scope, $rootScope, endPointCollection, myHttpService, serviceListService, pageSwitch, endpointService, tableSortService) {
        $scope.pageList = pageSwitch.pageList;

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
            var adminUrl = endPointCollection.adminURL("compute");
            var volume = adminUrl + serviceListService.volume;
            var SecurityGroups = adminUrl + serviceListService.securitygroupDetail;
            var FloatingIP = adminUrl + serviceListService.ListFloatingIpAddresses;

            var serverUrl = endPointCollection.adminURL('compute') + serviceListService.serviceDetail;
            var flavorUrl = endPointCollection.adminURL('compute') + serviceListService.FlavorsDetail;
            var promise1 = myHttpService.get('mainController', serverUrl);
            var promise2 = myHttpService.get('mainController', flavorUrl);

            $q.all([promise1, promise2]).then(function (response) {
                var servers = response[0].data.servers;
                var flavors = response[1].data.flavors;
                var serverList = [];

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

                pageSwitch.initPage(serverList);
                $scope.totalPage = pageSwitch.totalPage;
                $scope.currPage = pageSwitch.currPage;
                $scope.serverList = pageSwitch.showPage(pageSwitch.currPage);
                $scope.totalCount = pageSwitch.count();
                tableSortService.sortTable($('#mainTable'));
            });

            //云硬盘和卷存储
            myHttpService.get('mainController', volume)
                .then(function (response) {
                    $scope.volume = response.data.volumes;
                    var volumes = $scope.volume.length;
                    var volumeStorage = 0;
                    for (var i = 0; i < volumes; i++) {
                        volumeStorage = volumeStorage + $scope.volume[i].size;
                    }
                    tt = Math.floor((volumes / 100) * 100);
                    $('#volumes').attr("data-percent", tt);
                    $('#volumes').attr('data-text', volumes + "/100");
                    $('#volumes').circliful();

                    tt = Math.floor((volumeStorage / 1000) * 100);
                    $('#volumeStorage').attr("data-percent", tt);
                    $('#volumeStorage').attr('data-text', volumeStorage + "/1000");
                    $('#volumeStorage').circliful();
                }, function (response) {
                });

            //安全组
            myHttpService.get('mainController', SecurityGroups)
                .then(function (response) {
                    $scope.security_groups = response.data.security_groups;
                    var Securitygroups = $scope.security_groups.length;
                    tt = Math.floor((Securitygroups / 15) * 100);
                    $('#securityGroups').attr("data-percent", tt);
                    $('#securityGroups').attr('data-text', Securitygroups + "/15");
                    $('#securityGroups').circliful();
                }, function (response) {
                });

            //浮动ip
            myHttpService.get('mainController', FloatingIP)
                .then(function (response) {
                    $scope.FloatingIP = response.data.floating_ips;
                    var FloatingIPs = $scope.FloatingIP.length;
                    tt = Math.floor((FloatingIPs / 50) * 100);
                    $('#floatingip').attr("data-percent", tt);
                    $('#floatingip').attr('data-text', FloatingIPs + "/50");
                    $('#floatingip').circliful();
                }, function (response) {
                });
        }

        //切换每页显示的条目
        $scope.changePerPage = function (perPageShow) {
            $scope.serverList = pageSwitch.changePerPage(perPageShow);
            $scope.totalPage = pageSwitch.totalPage;
            $scope.currPage = pageSwitch.currPage;
            tableSortService.clearClass($('#mainTable'));
        };

        //上一页
        $scope.previousPage = function () {
            if (pageSwitch.pageIsCorrect($scope.currPage - 1)) {
                $scope.serverList = pageSwitch.showPage($scope.currPage - 1);
                $scope.totalPage = pageSwitch.totalPage;
                $scope.currPage = pageSwitch.currPage;
                tableSortService.clearClass($('#mainTable'));
            }
        };
        //下一页
        $scope.nextPage = function () {
            if (pageSwitch.pageIsCorrect($scope.currPage + 1)) {
                $scope.serverList = pageSwitch.showPage($scope.currPage + 1);
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

        //导出文件
        $scope.exportData = function(){
            tableSortService.exportCSV("test.csv",$scope.serverList);
        }
    });
