'use strict';
angular.module("app", [
    'ngRoute',

    'app.images',
    'app.instances',
    'app.safety',

    'app.network',
    'app.route',
    'app.port',
    'app.securityGroups',
    'app.listSubnets',
    'app.listFloatingIPs',

    // 对象存储-Object Storage
    'app.ListContainers',

    //user
    'app.program',
    'app.user',
    'app.login',
    'app.userDetail',

    'app.programDetail',
    'app.keypairDetail',

    'app.loginOut',

    //summary
    'app.totalSummary'

])
//2017-02-12：初始化获取endpoints
    .run(function ($rootScope, $http, $location, getEndPointService) {
        $rootScope.orginUrl = "";           //保存上一次点击的链接，当再次登录后，进行页面自动的跳转
        $rootScope.requestUrl = "http://172.17.203.101:5000/v2.0/tokens";
        $rootScope.MaxTokenExpireTime = 60 * 60 * 1000;
        $rootScope.firstRequest = true;    //在第一次请求时，因此时token还未获取，所以不要让拦截器拦截请求，以至于跳转至登录页面
        $location.replace();               //禁止浏览器返回
        getEndPointService.flushPoint();
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/showSummary'});
    }])
    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        //解决AngularJS post请求后台无法接收参数问题
        $httpProvider.defaults.transformRequest = [function (data) {

            var param = function (obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                    }
                }
                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
        }];
    })
    .factory("myHttpService", ['$http', function ($http) {
        var service = {};

        //servletUrl请求提交的servlet;requestUrl为restful api
        var _get = function (servletUrl, requestUrl) {
            return $http({
                'method': 'get',
                'url': servletUrl,
                'headers': {
                    'url': requestUrl
                }
            });
        };

        //servletUrl请求提交的servlet;requestUrl为restful api;body为请求的数据体
        var _post = function (servletUrl, body) {
            return $http({
                'method': 'post',
                'url': servletUrl,
                'data': body
            });
        };

        var _delete = function (servletUrl, requestUrl) {
            return $http({
                'method': 'delete',
                'url': servletUrl,
                'headers': {
                    'url': requestUrl
                }
            });
        }

        service.get = _get;
        service.post = _post;
        service.delete = _delete;

        return service;
    }])
    //保存所有endpoints的集合
    .factory("endPointCollection", function () {
        var service = {};
        service.elements = [];
        service.isLog = false;
        service.add = function (obj) {
            this.elements.push(obj);
        };

        service.size = function () {
            return this.elements.length;
        };

        service.isEmpty = function () {
            return (this.elements.length < 1);
        };

        //根据type返回对应的adminURL
        service.adminURL = function (type) {
            if (!service.isEmpty()) {
                for (var i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].type == type) {
                        return this.elements[i].adminURL;
                    }
                }
            }
            return null;
        };

        //根据type返回对应的internalURL
        service.internalURL = function (type) {
            if (!service.isEmpty()) {
                for (var i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].type == type) {
                        return this.elements[i].internalURL;
                    }
                }
            }
            return null;
        };

        //根据type返回对应的publicURL
        service.publicURL = function (type) {
            if (!service.isEmpty()) {
                for (var i = 0; i < this.elements.length; i++) {
                    if (this.elements[i].type == type) {
                        return this.elements[i].publicURL;
                    }
                }
            }
            return null;
        };

        service.values = function () {
            var arr = [];
            for (var i = 0; i < this.elements.length; i++) {
                arr.push(this.elements[i]);
            }
            return arr;
        };

        service.clear = function () {
            this.elements = [];
        };

        return service;
    })
    //保存所有请求的url，需要时直接在service添加对应的变量
    .factory("serviceListService", function () {
        var service = {};

        service.ListFloatingIpAddresses = "/os-floating-ips";
        service.ListFloatingIps = "/v2.0/floatingips";
        service.ListKeypairs = "/os-keypairs";
        service.ListsecurityGroups = "/os-security-groups";
        service.ShowImages = "/v2/images";
        service.serviceDetail = "/servers/detail";
        service.ListUsers = "/users";
        service.ListProjects = "/v3/projects";
        service.Listnetworks = "/v2.0/networks";
        service.Listrouters = "/v2.0/routers";
        service.Listports = "/v2.0/ports";
        service.ListSecurityGroups = "/v2.0/security-groups";
        service.ListSubnets = "/v2.0/subnets";
        service.ListFloatingIPs = "/v2.0/floatingips";

        //flavor
        service.FlavorsDetail = "/flavors/detail";

        // 对象存储API-Object Storage API
        service.ListContainers = "?format=json";

        //user
        service.CreateUserV3 = "/v3/users";
        service.UserDetail = "/v3/users/";

        //detail
        service.ProgramDetail="/v3/projects/";
        service.KeypairDetail="/os-keypairs/";
        service.DeleteUser = "/v3/users/";


        return service;
    })
    .factory("getEndPointService", ['$http', 'endPointCollection', '$rootScope', 'serviceListService', 'myHttpService', '$location', function ($http, endPointCollection, $rootScope, serviceListService, myHttpService, $location) {
        var service = {};

        var _flushEndPoint = function () {
            if ($rootScope.isLog == undefined) {
                myHttpService.get('/login', "getEndPoint")
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
                                var obj = {};
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
                        if ($rootScope.orginUrl.length > 0) {
                            $location.url($rootScope.orginUrl);
                        }
                    }, function (response) {
                    });
            }
        };

        service.flushPoint = _flushEndPoint;

        return service;
    }])
    .factory("logService", ['$rootScope', 'endPointCollection', function ($rootScope, endPointCollection) {
        var service = {};
        var _logOut = function () {
            $rootScope.isLog = undefined;
            endPointCollection.isLog = false;
            endPointCollection.clear();

            localStorage.removeItem("token");
            localStorage.removeItem("currTime");
            localStorage.removeItem("lastTime");
            localStorage.removeItem("userName");
        };

        service.logOut = _logOut;

        return service;
    }])
    //创建请求拦截器
    .factory("authService", ['$q', '$location', '$rootScope', 'endPointCollection', 'logService', function ($q, $location, $rootScope, endPointCollection, logService) {
        var authInterceptorServiceFactory = {};

        //对请求头进行拦截
        var _request = function (config) {

            config.headers = config.headers || {};

            var lastTime = localStorage.getItem('lastTime');

            //对非错误链接的记录
            if ($location.url() != "/loginError") {
                $rootScope.orginUrl = $location.url();
            }

            if ($rootScope.firstRequest) {
                $rootScope.firstRequest = false;
                return config;
            }

            // 待对token过期时间的验证)若过期则向服务器端请求重定向
            if (lastTime != null) {
                var timeOut = Date.now() - lastTime;
                localStorage.setItem('lastTime', Date.now());
                //超时，需要重新登录获取token
                if (timeOut > $rootScope.MaxTokenExpireTime) {
                    logService.logOut();
                }
                else {
                    var accessToken = localStorage.getItem('token');
                    var userName = localStorage.getItem('userName');
                    if (accessToken != null && userName != null) {
                        config.headers['X-Auth-Token'] = accessToken;
                    }
                }
            }
            else {
                $location.path('/loginError');
            }

            return config;
        };

        //对响应头进行拦截
        var _response = function (response) {
            if (response.data.error) {
                alert(response.data.error.message);
            }
            return response;
        };

        var _responseError = function (rejection) {
            alert("Code:" + rejection.status);
            return $q.reject(rejection);
        };

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.response = _response;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }])
    .factory('pageSwitch', function () {
        var service = {};

        service.pageList = [20, 30, 50];

        var _reset = function () {
            service.totalNum = 0;
            service.totalPage = 0;
            service.currPage = 0;
            service.perpage = service.pageList[0];
            service.arry = [];
        };

        //初始化信息
        var _initPage = function (array) {
            service.reset();
            if (array.length > 0) {
                service.arry = array;
                service.totalNum = service.arry.length;
                service.totalPage = Math.ceil(service.arry.length / service.perpage);
                service.currPage = 0;
                service.showPage(service.currPage);
            }
        };

        //切换每页显示的条目
        var _changePerPage = function (perPageShow) {
            service.currPage = 0;
            service.perpage = perPageShow;
            service.totalPage = Math.ceil(service.arry.length / service.perpage);
            return service.showPage(service.currPage);
        };

        var _pageIsCorrect = function (pageId) {
            if (pageId < 0 || pageId >= service.totalPage) {
                return false;
            }
            return true;
        };

        //实现某页信息
        var _showPage = function (pageId) {
            if (service.pageIsCorrect(pageId)) {
                service.currPage = pageId;
                var start = service.currPage * service.perpage;
                var end = (service.totalNum - start) > service.perpage ? service.perpage : (service.totalNum - start);
                console.log("start:" + start + "__" + end);
                return service.arry.slice(start, start + end);
            }
            return [];
        };

        //上一页
        var _previousPage = function () {
            service.showPage(service.currPage - 1);
        };

        //下一页
        var _nextPage = function () {
            service.showPage(service.currPage + 1);
        };

        service.reset = _reset;
        service.showPage = _showPage;
        service.previousPage = _previousPage;
        service.nextPage = _nextPage;
        service.initPage = _initPage;
        service.changePerPage = _changePerPage;
        service.pageIsCorrect = _pageIsCorrect;

        return service;
    })
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authService');
    }])
    //自定义指令，添加强制刷新当前页面
    .directive('forceHref', ['$location', '$route',
        function ($location, $route) {
            return function (scope, element, attrs) {
                scope.$watch('forceHref', function () {
                    if (attrs.forceHref) {
                        element.attr('href', attrs.forceHref);
                        element.bind('click', function (event) {
                            scope.$apply(function () {
                                if ($location.path().substr(1, $location.path().length - 1) == attrs.forceHref.substr(1, attrs.forceHref.length - 1)) {
                                    $route.reload();
                                }
                            });
                        });
                    }
                });
            }
        }]);
