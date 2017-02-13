'use strict';
angular.module("app", [
    'ngRoute',

    'app.serversInfo',
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

    'app.program',
    'app.user',
    'app.login'
])
//2017-02-12：初始化获取endpoints
    .run(function ($rootScope, $http, getEndPointService) {
        $rootScope.requestUrl = "http://172.17.203.101:5000/v2.0/tokens";
        $rootScope.MaxTokenExpireTime = 60 * 60 * 1000;
        getEndPointService.flushPoint();
    })
    .config(['$routeProvider', function ($routeProvider) {
        // $routeProvider.otherwise({redirectTo: '/showServersInfo'});
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
        }

        //servletUrl请求提交的servlet;requestUrl为restful api;body为请求的数据体
        var _post = function (servletUrl, requestUrl, body) {
            return $http({
                'method': 'post',
                'url': servletUrl,
                'data': body
            });
        }

        service.get = _get;
        service.post = _post;

        return service;
    }])
    //保存所有endpoints的集合
    .factory("endPointCollection", function () {
        var service = {};
        service.elements = new Array();
        service.isLog = false;
        service.add = function (obj) {
            this.elements.push(obj);
        }

        service.size = function () {
            return this.elements.length;
        }

        service.isEmpty = function () {
            return (this.elements.length < 1);
        }

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
        }

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
        }

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
        }

        service.values = function () {
            var arr = new Array();
            for (var i = 0; i < this.elements.length; i++) {
                arr.push(this.elements[i]);
            }
            return arr;
        }

        service.clear = function () {
            this.elements = [];
        }

        return service;
    })
    //保存所有请求的url，需要时直接在service添加对应的变量
    .factory("serviceListService", function () {
        var service = {};

        service.serviceDetail = "/servers/detail";

        service.ListUsers = "/users";
        service.ListProjects = "/v3/projects";

        service.Listnetworks = "/v2.0/networks";
        service.Listrouters = "/v2.0/routers";
        service.Listports = "/v2.0/ports";
        service.ListSecurityGroups = "/v2.0/security-groups";
        service.ListSubnets = "/v2.0/subnets";
        service.ListFloatingIPs = "/v2.0/floatingips";

        // 对象存储API-Object Storage API
        service.ListContainers = "?format=json";

        return service;
    })
    .factory("getEndPointService", ['$http', 'endPointCollection', '$rootScope', 'serviceListService', 'myHttpService', '$location', function ($http, endPointCollection, $rootScope, serviceListService, myHttpService, $location) {
        var service = {};

        var _flushEndPoint = function (directUrl) {
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
                        if (directUrl != undefined && directUrl.length > 0) {
                            $location.url(directUrl);
                        }
                    }, function (response) {
                    });
            }
        }

        service.flushPoint = _flushEndPoint;

        return service;
    }])
    //创建请求拦截器
    .factory("authService", ['$q', '$location', '$rootScope', 'endPointCollection', function ($q, $location, $rootScope, endPointCollection) {
        var authInterceptorServiceFactory = {};

        var _logOut = function () {
            $rootScope.isLog = undefined;
            endPointCollection.isLog = false;
            endPointCollection.clear();

            localStorage.removeItem("token");
            localStorage.removeItem("currTime");
            localStorage.removeItem("lastTime");
            localStorage.removeItem("userName");
        }

        //对请求头进行拦截
        var _request = function (config) {

            config.headers = config.headers || {};

            var lastTime = localStorage.getItem('lastTime');

            // 待对token过期时间的验证)若过期则向服务器端请求重定向
            if (lastTime != null) {
                var timeOut = Date.now() - lastTime;
                localStorage.setItem('lastTime', Date.now());
                //超时，需要重新登录获取token
                if (timeOut > $rootScope.MaxTokenExpireTime) {
                    _logOut();
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
        }

        var _responseError = function (rejection) {
            alert("Code:" + rejection.status);
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.response = _response;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authService');
    }]);
