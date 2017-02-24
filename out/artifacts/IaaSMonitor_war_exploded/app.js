'use strict';
angular.module("app", [
    'ngRoute',

    'app.images',
    'app.instances',
    'app.safety',
    'app.stacks',
    'app.stacksDetail',

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
    'app.totalSummary',

    'app.instanceDetail',
    'app.resourceDetail',
    'app.portDetail'
])
//2017-02-12：初始化获取endpoints
    .run(function ($rootScope, $http, $location, getEndPointService) {
        $rootScope.showContent = false;     //默认不显示遮罩
        $rootScope.orginUrl = "";           //保存上一次点击的链接，当再次登录后，进行页面自动的跳转
        $rootScope.requestUrl = "http://172.17.203.101:5000/v2.0/tokens";
        $rootScope.MaxTokenExpireTime = 60 * 60 * 1000;
        $rootScope.firstRequest = true;    //在第一次请求时，因此时token还未获取，所以不要让拦截器拦截请求，以至于跳转至登录页面
        $location.replace();               //禁止浏览器返回
        getEndPointService.flushPoint();
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/showSummary_zh'});
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
        service.volume = "/os-volumes";

        //flavor
        service.FlavorsDetail = "/flavors/detail";
        service.Flavors = "/flavors/";

        // 对象存储API-Object Storage API
        service.ListContainers = "?format=json";

        //user
        service.CreateUserV3 = "/v3/users";
        service.UserDetail = "/v3/users/";

        //detail
        service.ProgramDetail = "/v3/projects/";
        service.KeypairDetail = "/os-keypairs/";
        service.DeleteUser = "/v3/users/";
        service.instancDeatail = "/servers/";
        service.securitygroupDetail = "/os-security-groups";
        service.imageDetail = "/images/";
        service.InstanceOperateLog = "/os-instance-actions";
        service.ConsoleOutput = "/action"
        service.requestDetail = "/os-instance-actions";
        service.stackDetail = "/stacks/";
        service.stacktemplateDetail = "/template";
        service.stackeventDetail = "/events";
        service.stackresourceDetail = "/resources";
        service.resourceDetail = "/resources/";
        service.portDetail = "/v2.0/ports/";

        //stack
        service.ListStack = '/stacks';

        return service;
    })
    .factory("getEndPointService", ['$http', 'endPointCollection', '$rootScope', 'serviceListService', 'myHttpService', '$location', function ($http, endPointCollection, $rootScope, serviceListService, myHttpService, $location) {
        var service = {};
        var _flushEndPoint = function () {
            if ($rootScope.isLog == undefined) {
                myHttpService.get('login', "getEndPoint")
                    .then(function (response) {
                        //保存token和获得token的时间，在每次请求的时候，检测token是否过期；如果过期则自动跳转至登录页面；否则需要将token加入当前的header中一并发送
                        localStorage.setItem("iaasToken", response.data.access.token.id);
                        localStorage.setItem("iaasCurrTime", Date.now());
                        localStorage.setItem("iaasLastTime", Date.now());
                        localStorage.setItem("iaasUserName", response.data.access.token.tenant.name);
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
                            if ($rootScope.orginUrl.indexOf('loginError') > 0) {
                                $location.url('/showSummary_zh');
                            } else {
                                $location.url($rootScope.orginUrl);
                            }
                        }
                    }, function (response) {
                    });
            }
        };

        service.flushPoint = _flushEndPoint;
        return service;
    }])
    .factory('endpointService', ['$q', '$rootScope', 'endPointCollection', 'myHttpService', function ($q, $rootScope, endPointCollection, myHttpService) {
        var service = {};
        var _getEndPoints = function () {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if ($rootScope.isLog == undefined) {
                myHttpService.get('login', "getEndPoint")
                    .then(function (response) {
                        //保存token和获得token的时间，在每次请求的时候，检测token是否过期；如果过期则自动跳转至登录页面；否则需要将token加入当前的header中一并发送
                        localStorage.setItem("iaasToken", response.data.access.token.id);
                        localStorage.setItem("iaasCurrTime", Date.now());
                        localStorage.setItem("iaasLastTime", Date.now());
                        localStorage.setItem("iaasUserName", response.data.access.token.tenant.name);
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

                        deferred.resolve(response.data);
                    }, function (response) {
                        deferred.reject(response.data);
                    });
            }
            return promise;
        }
        service.getEndPoints = _getEndPoints;
        return service;
    }])
    .factory("logService", ['$rootScope', 'endPointCollection', function ($rootScope, endPointCollection) {
        var service = {};
        var _logOut = function () {
            $rootScope.isLog = undefined;
            endPointCollection.isLog = false;
            $rootScope.firstRequest = true;
            endPointCollection.clear();

            localStorage.removeItem("iaasToken");
            localStorage.removeItem("iaasCurrTime");
            localStorage.removeItem("iaasLastTime");
            localStorage.removeItem("iaasUserName");
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

            $rootScope.showContent = true;

            var lastTime = localStorage.getItem('iaasLastTime');

            //对非错误链接的记录
            if ($location.url().indexOf('loginError') == -1) {
                $rootScope.orginUrl = $location.url();
            }

            if ($rootScope.firstRequest) {
                $rootScope.firstRequest = false;
                return config;
            }

            // 待对token过期时间的验证)若过期则向服务器端请求重定向
            if (lastTime != null) {
                var timeOut = Date.now() - lastTime;
                localStorage.setItem('iaasLastTime', Date.now());
                //超时，需要重新登录获取token
                if (timeOut > $rootScope.MaxTokenExpireTime) {
                    logService.logOut();
                    $location.path('/loginError');
                }
                else {
                    var accessToken = localStorage.getItem('iaasToken');
                    var userName = localStorage.getItem('iaasUserName');
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
                // alert(response.data.error.message);
            }
            var d = new Date();
            $rootScope.showContent = false;
            return response;
        };

        var _responseError = function (rejection) {
            // alert("Code:" + rejection.status);
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

        //条目
        var _count = function () {
            return service.arry.length;
        }

        service.reset = _reset;
        service.showPage = _showPage;
        service.previousPage = _previousPage;
        service.nextPage = _nextPage;
        service.initPage = _initPage;
        service.changePerPage = _changePerPage;
        service.pageIsCorrect = _pageIsCorrect;
        service.count = _count;

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
        }])
    .factory('httpService', ['$q', 'myHttpService', function ($q, myHttpService) {
        var service = {};
        var _get = function (servletUrl, requestUrl) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            myHttpService.get(servletUrl, requestUrl).then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
                deferred.reject(response.data);
            });
            return promise;
        }
        service.get = _get;
        return service;
    }])
    .factory('JsonParse', function () {
        var service = {};

        var _format = function format(txt, compress/*是否为压缩模式*/) {/* 格式化JSON源码(对象转换为JSON文本) */
            var indentChar = '    ';
            if (/^\s*$/.test(txt)) {
                // alert('数据为空,无法格式化! ');
                return;
            }
            try {
                var data = eval('(' + txt + ')');
            }
            catch (e) {
                // alert('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
                return;
            }
            ;
            var draw = [], last = false, This = this, line = compress ? '' : '\n', nodeCount = 0, maxDepth = 0;

            var notify = function (name, value, isLast, indent/*缩进*/, formObj) {
                nodeCount++;
                /*节点计数*/
                for (var i = 0, tab = ''; i < indent; i++)tab += indentChar;
                /* 缩进HTML */
                tab = compress ? '' : tab;
                /*压缩模式忽略缩进*/
                maxDepth = ++indent;
                /*缩进递增并记录*/
                if (value && value.constructor == Array) {/*处理数组*/
                    draw.push(tab + (formObj ? ('"' + name + '":') : '') + '[' + line);
                    /*缩进'[' 然后换行*/
                    for (var i = 0; i < value.length; i++)
                        notify(i, value[i], i == value.length - 1, indent, false);
                    draw.push(tab + ']' + (isLast ? line : (',' + line)));
                    /*缩进']'换行,若非尾元素则添加逗号*/
                } else if (value && typeof value == 'object') {/*处理对象*/
                    draw.push(tab + (formObj ? ('"' + name + '":') : '') + '{' + line);
                    /*缩进'{' 然后换行*/
                    var len = 0, i = 0;
                    for (var key in value)len++;
                    for (var key in value)notify(key, value[key], ++i == len, indent, true);
                    draw.push(tab + '}' + (isLast ? line : (',' + line)));
                    /*缩进'}'换行,若非尾元素则添加逗号*/
                } else {
                    if (typeof value == 'string') value = '"' + value + '"';
                    draw.push(tab + (formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ',') + line);
                }
                ;
            };
            var isLast = true, indent = 0;
            notify('', data, isLast, indent, false);
            return draw.join('');
        }

        service.format = _format;

        return service;
    })
    //表格排序
    .service("tableSortService", function () {

        this.clearClass = function (table) {
            table.find('thead th').removeClass('current');
            table.find('thead th').removeClass('headDesc');
            table.find('thead th').removeClass('headAsc');
        }

        this.sortTable = function (table) {
            table.find('thead th').click(
                function () {
                    var currTh = $(this);
                    var dataType = $(this).attr('dataType');
                    var tableObj = $(this).closest('table');
                    var index = tableObj.find('thead th').index(this) + 1;
                    var arr = [];
                    var row = tableObj.find('tbody tr');

                    console.log("index:" + index);

                    $.each(row, function (i) {
                        arr[i] = row[i]
                    });

                    //默认升序
                    if ($(this).hasClass('current')) {
                        arr.reverse();

                        if ($(this).hasClass('headDesc')) {
                            $(this).removeClass('headDesc');
                            $(this).addClass('headAsc');

                            tableObj.find('thead th').each(function () {
                                if (currTh.text() != $(this).text()) {
                                    $(this).removeClass('headDesc');
                                    $(this).removeClass('headAsc');
                                }
                            });
                        } else if ($(this).hasClass('headAsc')) {
                            $(this).removeClass('headAsc');
                            $(this).addClass('headDesc');

                            tableObj.find('thead th').each(function () {
                                if (currTh.text() != $(this).text()) {
                                    $(this).removeClass('headDesc');
                                    $(this).removeClass('headAsc');
                                }
                            });
                        }
                    } else {
                        arr.sort(Utils.sortStr(index, dataType))
                        tableObj.find('thead th').removeClass('current');
                        tableObj.find('thead th').removeClass('headAsc');
                        tableObj.find('thead th').removeClass('headDesc');

                        $(this).addClass('current');
                        $(this).addClass('headAsc');
                    }

                    var fragment = document.createDocumentFragment();

                    $.each(arr, function (i) {
                        fragment.appendChild(arr[i]);
                    });

                    tableObj.find('tbody').append(fragment);
                }
            );

            var Utils = (function () {
                function sortStr(index, dataType) {
                    return function (a, b) {
                        var aText = $(a).find('td:nth-child(' + index + ')').attr('_order') || $(a).find('td:nth-child(' + index + ')').text();
                        var bText = $(b).find('td:nth-child(' + index + ')').attr('_order') || $(b).find('td:nth-child(' + index + ')').text();

                        if (dataType != 'text') {
                            aText = parseNonText(aText, dataType);
                            bText = parseNonText(bText, dataType);

                            return aText > bText ? 1 : bText > aText ? -1 : 0;
                        } else {
                            return aText.localeCompare(bText)
                        }
                    }
                }

                function parseNonText(data, dataType) {
                    switch (dataType) {
                        case 'int':
                            return parseInt(data) || 0
                        case 'float':
                            return parseFloat(data) || 0
                        case 'date':
                            return new Date(Date.parse(data));
                        default :
                            return filterStr(data)
                    }
                }

                //过滤中文字符和$
                function filterStr(data) {
                    if (!data) {
                        return 0;
                    }
                    return parseFloat(data.replace(/^[\$a-zA-z\u4e00-\u9fa5 ]*(.*?)[a-zA-z\u4e00-\u9fa5 ]*$/, '$1'));
                }

                return {'sortStr': sortStr};
            })();
        }

        this.filterData = function (obj, pageSwitch) {
            var searchText = obj.searchText;
            if (searchText.length > 0) {
                var soureData = pageSwitch.showPage(obj.currPage);
                var arry = [];
                for (var i = 0; i < soureData.length; i++) {
                    if (soureData[i].name.indexOf(obj.searchText) >= 0) {
                        arry.push(soureData[i]);
                    }
                }
                obj.hasFilter = true;
                obj.serverList = arry;
                obj.totalCount = arry.length;
            }
            else if (searchText == null || searchText.length == 0) {
                obj.hasFilter = false;
                obj.totalPage = pageSwitch.totalPage;
                obj.currPage = pageSwitch.currPage;
                obj.serverList = pageSwitch.showPage(pageSwitch.currPage);
                obj.totalCount = pageSwitch.count();
            }
        }
        //csv文件导出
        this.exportCSV = function exportToCsv(filename, rows) {
            var processRow = function (row) {
                var finalVal = '';

                finalVal += row.name;
                finalVal += ",";
                finalVal += row.vcpus;
                finalVal += ",";
                finalVal += row.disk;
                finalVal += ",";
                finalVal += row.ram;
                finalVal += ",";
                finalVal += row.created;
                finalVal += ",";

                // for (var j = 0; j < row.length; j++) {
                //     var innerValue = row[j] === null ? '' : row[j].toString();
                //     if (row[j] instanceof Date) {
                //         innerValue = row[j].toLocaleString();
                //     }
                //     ;
                //     var result = innerValue.replace(/"/g, '""');
                //     if (result.search(/("|,|\n)/g) >= 0)
                //         result = '"' + result + '"';
                //     if (j > 0)
                //         finalVal += ',';
                //     finalVal += result;
                // }
                return finalVal + '\n';
            };

            var csvFile = 'Name,VCpu,Disk,Ram,Created Time\n';
            for (var i = 0; i < rows.length; i++) {
                csvFile += processRow(rows[i]);
            }

            var blob = new Blob([csvFile], {type: 'text/csv;charset=utf-8;'});
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(blob, filename);
            } else {
                var link = document.createElement("a");
                if (link.download !== undefined) { // feature detection
                    // Browsers that support HTML5 download attribute
                    var url = URL.createObjectURL(blob);
                    link.setAttribute("href", url);
                    link.setAttribute("download", filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        }
    });
