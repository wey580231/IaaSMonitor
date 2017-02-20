
angular.module('app.keypairDetail', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewKeypair', {
        templateUrl: 'app/components/servers/keypairDetail.html',
        controller: 'keypairDetailController'
    })
}]).controller("keypairDetailController", function ($scope, $rootScope, $routeParams, myHttpService, endPointCollection, serviceListService) {

    var name = $routeParams.name;
    if (name != undefined) {
        var adminUrl = endPointCollection.adminURL("compute");
        if (adminUrl != undefined) {
            adminUrl = adminUrl+serviceListService.KeypairDetail + name;
            myHttpService.get('mainController', adminUrl)
                .then(function (response) {
                    $scope.hasDetail = true;
                    $scope.hasError = false;
                    if (response.data.keypair) {
                        $scope.keypair = response.data.keypair;
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
