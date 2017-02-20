angular.module("app.safety", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showSafety', {
            templateUrl: 'app/components/servers/safety.html',
            controller: 'safetyController'
        })
    }])
     .controller("safetyController", function ($scope, $http, $location, endPointCollection, $rootScope, myHttpService, serviceListService){
        myHttpService.get('mainController', endPointCollection.adminURL('compute')+ serviceListService.ListsecurityGroups)
            .then(function (response) {
                $scope.list = response.data.security_groups;
            }, function (response) {
            });

        myHttpService.get('mainController', endPointCollection.adminURL('compute')+ serviceListService.ListKeypairs)
            .then(function (response) {
                $scope.list1 = response.data.keypairs;
            }, function (response) {
            });


         myHttpService.get('mainController', endPointCollection.adminURL('network')+ serviceListService.ListFloatingIps)
             .then(function (response) {
                 $scope.list2 = response.data.floatingips;
             }, function (response) {
             });

         myHttpService.get('mainController', endPointCollection.adminURL('compute')+ serviceListService.ListFloatingIpAddresses)
             .then(function (response) {
                 $scope.list3 = response.data.floating_ips;
             }, function (response) {
             });
     });