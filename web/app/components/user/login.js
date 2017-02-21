angular.module('app.login', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/loginError', {
        templateUrl: 'app/components/user/login.html',
        controller: 'loginController'
    })
}])
    .controller("loginController", function ($scope, $rootScope, $location, endPointCollection, myHttpService, serviceListService, getEndPointService) {

        $scope.showWarning = false;

        $scope.reload = function () {

            if ($scope.userName == undefined || $scope.passWord == undefined || $scope.tenantName == undefined) {
                $scope.showWarning = true;
                $scope.warnInfo = "Empty Parameters!";
                return;
            }

            if ($scope.userName != null && $scope.passWord != null) {
                var data = {
                    "userName": $scope.userName,
                    "passWord": $scope.passWord,
                    "requestUrl": $scope.requestUrl,
                    "tenantName": $scope.tenantName,
                    "method": "Reload"
                };
                myHttpService.post('login', data)
                    .then(function (response) {
                        if (response.data.result == "success") {
                            getEndPointService.flushPoint();
                        }
                        else {
                            $scope.showWarning = true;
                            $scope.warnInfo = response.data.result;
                        }
                    }, function (response) {
                        $scope.showWarning = true;
                        $scope.warnInfo = response.data.result;
                    })
            }
        }
    })
