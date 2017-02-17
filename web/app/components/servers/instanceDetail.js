/**
 * Created by Fanan on 2017/2/15.
 */

angular.module('app.instanceDetail', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewInstance', {
        templateUrl: 'app/components/servers/instanceDetail.html',
        controller: 'instanceDetailController'
    })
}]).controller("instanceDetailController", function ($scope, $rootScope, $routeParams, myHttpService, endPointCollection, serviceListService) {
    var id = $routeParams.id;
    if (id != undefined) {
        var adminUrl = endPointCollection.adminURL("compute");
        if (adminUrl != undefined) {
           var  adminUrls = adminUrl+ serviceListService.instancDeatail+ id;
            console.log(adminUrls);
            myHttpService.get('/mainController', adminUrls)
                .then(function (response) {
                    $scope.hasDetail = true;
                    $scope.hasSpecifications = true;
                    $scope.hasSafegroup = true;
                    $scope.hasIP = true;
                    $scope.hasdata = true;
                    $scope.haslink = true;
                    $scope.hasError = false;
                    $scope.hasRequest=true;

                    if (response.data.server) {
                        $scope.server = response.data.server;
                        var flavorid = $scope.server.flavor.id;
                        var imageid=$scope.server.image.id;
                        var flavorUrl = adminUrl + serviceListService.Flavors + flavorid;
                        var  SecurityGroupsUrl = adminUrl+serviceListService.instancDeatail+id+serviceListService.securitygroupDetail;
                        var  imageUrl  = adminUrl+serviceListService.imageDetail+imageid;
                        var  requestUrl =adminUrls+serviceListService.requestDetail;

                            myHttpService.get('/mainController', flavorUrl)
                                .then(function (response) {
                                    $scope.flavor = response.data.flavor;
                                });

                            myHttpService.get('/mainController', SecurityGroupsUrl)
                                .then(function (response) {
                                    $scope.list = response.data.security_groups[0].rules;
                                });

                            console.log(imageUrl);
                                myHttpService.get('/mainController', imageUrl)
                                    .then(function (response) {
                                        $scope.image = response.data.image;
                                    });

                        myHttpService.get('/mainController', requestUrl)
                            .then(function (response) {
                                $scope.request = response.data.instanceActions;
                            });
                        }



                    else if (response.data.error) {
                        $scope.hasDetail = false;
                        $scope.hasDetail = false;
                        $scope.hasSpecifications = false;
                        $scope.hasIP = false;
                        $scope.hasdata = false;
                        $scope.haslink = false;
                        $scope.hasError = true;
                        $scope.errorMessage = response.data.error.message;
                    }
                }, function (response) {
                });
        }
    }
});
