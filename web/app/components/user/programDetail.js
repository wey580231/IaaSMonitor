angular.module('app.programDetail', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewProgram', {
        templateUrl: 'app/components/user/programDetail.html',
        controller: 'programDetailController'
    })
}]).controller("programDetailController", function ($scope, $rootScope, $routeParams, myHttpService, endPointCollection, serviceListService) {
    var id = $routeParams.id;
    if (id != undefined) {
        var adminUrl = endPointCollection.adminURL("identity");
        if (adminUrl != undefined) {
            adminUrl = adminUrl.substr(0, adminUrl.length - 5) + serviceListService.ProgramDetail + id;
            myHttpService.get('mainController', adminUrl)
                .then(function (response) {
                    $scope.hasDetail = true;
                    $scope.hasError = false;
                    if (response.data.project) {
                        $scope.project = response.data.project;
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
