var app = angular.module('opinion', [{
    files:[
        "root/rotation/opinion/_res/js/service.js",
    ]
}]);
app.controller('opinCtrl',function ($scope,$state) {
    if ($state.current.url == '/opinion') {//默认加载列表
        $state.go('root.rotation.opinion.list[12]')
    }
    $scope.$emit('isVi',false);//判断是否出现搜索按钮
}).controller('opinMenuCtrl',function($scope,$state,$rootScope,$location,opinSer){
    var urlName = $state.current.url.split('/')[1].split('[')[0];
    $scope.menuClass=urlName+"Menu";
    $rootScope.$on('$locationChangeSuccess', function () {//url地扯改变或者刷新
        if($location.path().split('/').slice(-1)=='list[12]' && window.location.href.indexOf('id=') == -1){
            $scope.menuClass = 'listMenu';
        }
    });
    if (window.location.href.split('id=')[1]) {//如果是刷新进来的页面，没有经过list
        $scope.idListd = window.location.href.split('id=')[1];
        if($location.search().name){
            $scope.menuClass = $location.search().name + 'Menu';
        }

    }
    $scope.menuCheck = function (name) {
        var buttonName = name;
        $scope.buttonShow = true;
        opinSer.opinPermission(buttonName).then(function(response){
            if(response.data.code == 0 && response.data.data){
                $scope[buttonName] = true;
            }else{
                $scope[buttonName] = false;
            }
        });
        $scope.menuAdd = false;
    };
    //监听到父Ctrl后改变事件
    $scope.$on("getId", function(event, msg){
       $scope.idListd = msg;
    });
    $scope.$on('pageId',function(event,flag){
        $scope.page = flag;
    });
    if(!$scope.page){
        $scope.page = $location.search().page;
    }
   
    $scope.list = function(){
        $scope.menuClass = 'listMenu'
    };
    
});

//自定义过滤
app.filter('cover', function(){
    return function (val) {
        var result;
        switch(val){
            case "NOACTIVE":
                result = "未激活";
                break;
            case "UNREVIEW":
                result = "未审核";
                break;
        }
        return result;
    }
});
