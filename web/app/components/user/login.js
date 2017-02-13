angular.module('app.login', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/loginError', {
        templateUrl: 'app/components/user/login.html',
        controller: 'loginController'
    })
}])
    .controller("loginController", function ($scope, $rootScope, $location, endPointCollection, myHttpService, serviceListService, getEndPointService) {
        $scope.reload = function () {
            if ($scope.userName != null && $scope.passWord != null) {
                var data = {
                    "userName": $scope.userName,
                    "passWord": $scope.passWord,
                    "requestUrl": $scope.requestUrl,
                    "tenantName": $scope.tenantName,
                    "method": "Reload"
                };
                myHttpService.post('/login', $rootScope.idendityURL, data)
                    .then(function (response) {
                        if (response.data.result == "success") {
                            getEndPointService.flushPoint("/showServersInfo");
                        }
                        else {
                            alert("重新输入");
                        }
                    }, function (response) {
                        alert("登录失败");
                    })
            }
        }
    });