angular.module("app.user", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showUser', {
            templateUrl: 'app/components/user/user.html',
            controller: 'userController'
        })
    }])
    .controller("userController", function ($scope, $http, $location, $route, $rootScope, endPointCollection, myHttpService, serviceListService) {
        myHttpService.get('/mainController', endPointCollection.adminURL('identity') + serviceListService.ListUsers)
            .then(function (response) {
                $scope.list = response.data.users;
            }, function (response) {
            });

        $scope.submitForm = function () {
            var name = $scope.userName;
            var email = $scope.email;
            var password = $scope.password;
            var confimPassword = $scope.confimPassword;
            var mainProgram = $scope.mainProgram;
            var role = $scope.role;
            var active = $scope.active;
            $scope.showWarning = false;
            if (name == undefined || email == undefined || password == undefined || confimPassword == undefined || mainProgram == undefined || role == undefined) {
                $scope.showWarning = true;
                $scope.errorMessage = "输入信息不完整,请重新输入！";
                return;
            }
            if (password != confimPassword) {
                $scope.showWarning = true;
                $scope.errorMessage = "两次密码不一致，请重新输入!";
                return;
            }

            $scope.showWarning = false;
            $scope.showSuccess = false;

            var adminUrl = endPointCollection.adminURL("identity");
            if (adminUrl != undefined) {
                adminUrl = adminUrl.substr(0, adminUrl.length - 5) + serviceListService.CreateUserV3;
                var body = {
                    "userName": name,
                    "email": email,
                    "password": password,
                    "mainProgram": mainProgram,
                    "role": role,
                    "active": active,
                    "requestUrl": adminUrl
                };
                myHttpService.post("/userController", body).then(function (response) {
                    if (response.data.user) {
                        $scope.showSuccess = true;
                        $scope.successMessage = "用户创建成功!";

                        // $("#addUser").hide();
                        //强制刷新页面
                        $route.reload();
                    }
                    else if (response.data.error) {
                        $scope.showWarning = true;
                        $scope.errorMessage = response.data.error.message;
                    }
                }, function (response) {
                    $scope.showWarning = true;
                    $scope.errorMessage = response.data.error.message;
                });
            }
            else {
                $scope.showWarning = true;
                $scope.errorMessage = "无法解析请求路径，请重新登录!";
            }
        }

        $scope.cancelForm = function () {
            $scope.userName = "";
            $scope.email = "";
            $scope.password = "";
            $scope.confimPassword = "";
            $scope.mainProgram = "";
            $scope.role = "";
            $scope.showWarning = false;
            $scope.showSuccess = true;
        }
    });