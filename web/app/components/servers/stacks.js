/**
 * Created by wey580231 on 2017/2/16.
 */
angular.module('app.stacks', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/showStacks', {
            templateUrl: 'app/components/servers/stacks.html',
            controller: 'stackController'
        });
    }])
    .controller('stackController', function ($scope, $rootScope, $location, endPointCollection, pageSwitch, myHttpService, serviceListService) {

        $scope.pageList = pageSwitch.pageList;

        var selectedCheckArray = [];    //选中的checkbox的id值集合
        var stackList = [];

        myHttpService.get('/mainController', endPointCollection.adminURL('orchestration') + serviceListService.ListStack)
            .then(function (response) {
                $scope.list = response.data.stacks;
                stackList = response.data.stacks;

                pageSwitch.initPage(stackList);
                $scope.totalPage = pageSwitch.totalPage;
                $scope.currPage = pageSwitch.currPage;
                $scope.serverList = pageSwitch.showPage(pageSwitch.currPage);
            }, function (response) {
            });

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
            return (selectedCheckArray.length == stackList.length);
        };

        //全选
        $scope.selectAll = function ($event) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            for (var i = 0; i < stackList.length; i++) {
                var entity = stackList[i];
                updateSelected(action, entity.id);
            }
        };

        //切换每页显示的条目
        $scope.changePerPage = function (perPageShow) {
            $scope.list = pageSwitch.changePerPage(perPageShow);
            $scope.totalPage = pageSwitch.totalPage;
            $scope.currPage = pageSwitch.currPage;
        };

        //上一页
        $scope.previousPage = function () {
            if (pageSwitch.pageIsCorrect($scope.currPage - 1)) {
                $scope.list = pageSwitch.showPage($scope.currPage - 1);
                $scope.totalPage = pageSwitch.totalPage;
                $scope.currPage = pageSwitch.currPage;
            }
        };

        //下一页
        $scope.nextPage = function () {
            if (pageSwitch.pageIsCorrect($scope.currPage + 1)) {
                $scope.list = pageSwitch.showPage($scope.currPage + 1);
                $scope.totalPage = pageSwitch.totalPage;
                $scope.currPage = pageSwitch.currPage;
            }
        };
    });
