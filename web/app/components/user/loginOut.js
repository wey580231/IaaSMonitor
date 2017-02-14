/**
 * Created by wey580231 on 2017/2/14.
 */
angular.module('app.loginOut', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/loginOut', {
        templateUrl: 'app/components/user/login.html',
        controller: 'loginOutContoller'
    })
}])
    .controller('loginOutContoller', function ($scope, $location, logService) {
        logService.logOut();
        location.href = '/index.jsp';
    });
