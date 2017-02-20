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
    .controller('totalSummaryController', function ($q, $scope, $rootScope, endPointCollection, myHttpService, serviceListService, pageSwitch) {

        $scope.pageList = pageSwitch.pageList;

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
        });

        //切换每页显示的条目
        $scope.changePerPage = function (perPageShow) {
            $scope.serverList = pageSwitch.changePerPage(perPageShow);
            $scope.totalPage = pageSwitch.totalPage;
            $scope.currPage = pageSwitch.currPage;
        };

        //上一页
        $scope.previousPage = function () {
            if (pageSwitch.pageIsCorrect($scope.currPage - 1)) {
                $scope.serverList = pageSwitch.showPage($scope.currPage - 1);
                $scope.totalPage = pageSwitch.totalPage;
                $scope.currPage = pageSwitch.currPage;
            }
        };

        //下一页
        $scope.nextPage = function () {
            if (pageSwitch.pageIsCorrect($scope.currPage + 1)) {
                $scope.serverList = pageSwitch.showPage($scope.currPage + 1);
                $scope.totalPage = pageSwitch.totalPage;
                $scope.currPage = pageSwitch.currPage;
            }
        };
    });
