/**
 * Created by Fanan on 2017/2/17.
 */

angular.module('app.resourceDetail', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewResource', {
        templateUrl: 'app/components/servers/resourceDetail.html',
        controller: 'resourceDetailController'
    })
}]).controller("resourceDetailController", function ($scope, $rootScope, $routeParams, myHttpService, endPointCollection, serviceListService) {
    var id = $routeParams.id;
    var name=$routeParams.name;
    alert(id);
    alert(name);
    if (id != undefined) {
        var adminUrl = endPointCollection.adminURL("orchestration");
        if (adminUrl != undefined){
            adminUrl =adminUrl+serviceListService.stackDetail+name+"/"+ id+serviceListService.resourceDetail;
            console.log(adminUrl);
            myHttpService.get('/mainController', adminUrl)
                .then(function (response) {
                    $scope.hasResource = true;
                    $scope.hasError = false;
                    if (response.data.resource) {
                        $scope.resource = response.data.resource;
                    }
                    else if (response.data.error) {
                        $scope.hasResource = false;
                        $scope.hasError = true;
                        $scope.errorMessage = response.data.error.message;
                    }
                }, function (response) {
                });
        }
    }
});
