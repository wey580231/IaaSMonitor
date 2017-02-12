angular.module("app.serversInfo", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showServersInfo', {
            templateUrl: 'app/components/servers/serversInfo.html',
            controller: 'serversInfo'
        })
    }])

    .controller("serversInfo", function ($scope, $http, $location, endPointCollection, $rootScope, myHttpService, serviceListService) {
        if ($rootScope.isLog == undefined) {
            myHttpService.get('/login', null)
                .then(function (response) {
                    //保存token和获得token的时间，在每次请求的时候，检测token是否过期；如果过期则自动跳转至登录页面；否则需要将token加入当前的header中一并发送
                    localStorage.setItem("token", response.data.access.token.id);
                    localStorage.setItem("currTime", Date.now());
                    localStorage.setItem("lastTime", Date.now());
                    localStorage.setItem("userName", response.data.access.token.tenant.name);

                    if (!endPointCollection.isLog) {
                        //获取所有的endpoints，保存至对象中
                        var catalog = response.data.access.serviceCatalog;
                        for (var i = 0; i < catalog.length; i++) {
                            var obj = new Object;
                            obj.name = catalog[i].name;
                            obj.type = catalog[i].type;
                            obj.adminURL = catalog[i].endpoints[0].adminURL;
                            obj.region = catalog[i].endpoints[0].region;
                            obj.internalURL = catalog[i].endpoints[0].internalURL;
                            obj.id = catalog[i].endpoints[0].id;
                            obj.publicURL = catalog[i].endpoints[0].publicURL;
                            endPointCollection.add(obj);
                        }
                        endPointCollection.isLog = true;
                    }
                    $rootScope.isLog = true;
                }, function (response) {
                    alert("error");
                });
        }


        myHttpService.get('/mainController', endPointCollection.adminURL('compute') + serviceListService.serviceDetail)
            .then(function (response) {
                $scope.list = response.data.servers;
            }, function (response) {
            });
    });
