'use strict';
angular.module("app", [
    'ngRoute',

    'app.serversInfo',
    'app.images',
    'app.instances',
    'app.safety',

    'app.network',
    'app.route',

    'app.program',
    'app.user'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/showServersInfo'});
    }]).config(function ($httpProvider) {
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

        return service;
    })
    //保存所有请求的url，需要时直接在service添加对应的变量
    .factory("serviceListService", function () {
        var service = {};

        service.serviceDetail = "/servers/detail";
        service.ListUsers="/users";
        service.ListProjects="/v3/projects";
        return service;
    })

    //创建请求拦截器'
    .factory("authService", ['$q', '$location', '$rootScope', function ($q, $location, $rootScope) {
        var authInterceptorServiceFactory = {};
        var _request = function (config) {

            config.headers = config.headers || {};

            var accessToken = localStorage.getItem('token');
            var userName = localStorage.getItem('userName');

            if (accessToken != null && userName != null) {
                config.headers['X-Auth-Token'] = accessToken;
            }

            var lastTime = localStorage.getItem('lastTime');

            // TODO(待对token过期时间的验证)若过期则向服务器端请求重定向
            if (lastTime != null) {
                var timeOut = Date.now() - lastTime;
                localStorage.setItem('lastTime', Date.now());
            }
            return config;
        };

        authInterceptorServiceFactory.request = _request;

        return authInterceptorServiceFactory;
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authService');
    }]);
