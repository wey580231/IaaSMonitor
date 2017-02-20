angular.module("app.user", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showUser', {
            templateUrl: 'app/components/user/user.html',
            controller: 'userController'
        })
    }])
    .controller("userController", function ($scope, $http, $location, $route, $rootScope, endPointCollection, myHttpService, serviceListService) {

        var userList = [];
        var selectedCheckArray = [];    //选中的checkbox的id值集合
        var operateId;                  //单条删除的id值
        $scope.deleteEnabled = true;    //初始设置删除不可用

        myHttpService.get('mainController', endPointCollection.adminURL('identity') + serviceListService.ListUsers)
            .then(function (response) {
                $scope.list = response.data.users;
                userList = response.data.users;
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

                        $('#addUser').modal('hide');
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
        };

        $scope.cancelForm = function () {
            $scope.userName = "";
            $scope.email = "";
            $scope.password = "";
            $scope.confimPassword = "";
            $scope.mainProgram = "";
            $scope.role = "";
            $scope.showWarning = false;
            $scope.showSuccess = true;
        };

        //确认删除选中的用户
        $scope.confirmDeleteSelectedUser = function () {
            $('#deleteSelectedUser').modal('hide');
        };

        //禁用当前用户
        $scope.confirmForbiddenUser = function () {
            $('#forbiddenUser').modal('hide');
        };

        //删除当前用户
        $scope.confirmDeleteUser = function () {

            var adminUrl = endPointCollection.adminURL("identity");
            if (adminUrl != undefined) {
                adminUrl = adminUrl.substr(0, adminUrl.length - 5) + serviceListService.DeleteUser + "/" + operateId;
                myHttpService.delete('mainController', adminUrl)
                    .then(function (response) {
                        $('#deleteUser').modal('hide');
                        $route.reload();
                    }, function (response) {

                    });
            }
        };

        $scope.getForbbidenId = function (name, id) {
            $scope.forbiddenUser = name;
            operateId = id;
        };

        $scope.getDeleteId = function (name, id) {
            $scope.deleteUser = name;
            operateId = id;
        };

        var updateSelected = function (action, id) {
            if (action == 'add' & selectedCheckArray.indexOf(id) == -1) {
                selectedCheckArray.push(id);
            }

            if (action == 'remove' && selectedCheckArray.indexOf(id) != -1) {
                selectedCheckArray.splice(selectedCheckArray.indexOf(id), 1);
            }

            $scope.deleteEnabled = (selectedCheckArray.length == 0);
        };

        //点击某个checkbox按钮，更新当前的状态
        $scope.updateSelection = function ($event, id) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            updateSelected(action, id);
        };

        //checkbox是否选中?
        $scope.isSelected = function (id) {
            return selectedCheckArray.indexOf(id) >= 0;
        };

        //checked状态由全选来设置
        $scope.isSelectedAll = function () {
            return (selectedCheckArray.length == userList.length);
        };

        //全选
        $scope.selectAll = function ($event) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            for (var i = 0; i < userList.length; i++) {
                var entity = userList[i];
                updateSelected(action, entity.id);
            }
        };
    });