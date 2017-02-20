
angular.module('app.userDetail', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewUser', {
        templateUrl: 'app/components/user/userDetail.html',
        controller: 'userDetailController'
    })
}]).controller("userDetailController", function ($scope, $rootScope, $routeParams, myHttpService, endPointCollection, serviceListService) {
    var id = $routeParams.id;
    if (id != undefined) {
        var adminUrl = endPointCollection.adminURL("identity");
        if (adminUrl != undefined) {
            adminUrl = adminUrl.substr(0, adminUrl.length - 5) + serviceListService.UserDetail + id;
            myHttpService.get('mainController', adminUrl)
                .then(function (response) {
                    $scope.hasDetail = true;
                    $scope.hasError = false;
                    if (response.data.user) {
                        $scope.user = response.data.user;
                    }
                    else if (response.data.error) {
                        $scope.hasDetail = false;
                        $scope.hasError = true;
                        $scope.errorMessage = response.data.error.message;
                    }
                }, function (response) {
                });
        }
    }
});