var app = angular.module('userjopAdd', ['toastr','angularjs-dropdown-multiselect','ipCookie']);
app.controller('userjopAddCtrl', function($scope,$state,toastr,userjopSer,ipCookie,$location){


    //获取用户
    userjopSer.getUser().then(function(response){
        if(response.data.code==0){
            $scope.userList = response.data.data;
        }
    });

    $scope.positions = [];
    $scope.stringSettings = {displayProp: 'position'};
    userjopSer.getPosition().then(function(response){
        if(response.data.code==0){
            $scope.workOptions= response.data.data;
        }
    });


    $scope.userjopAddFun = function(){
        var posiId = [];
        angular.forEach($scope.positions,function(item){
            posiId.push(item.id)
        });
        var data={
            userId:$scope.userId,
            positionIds:posiId
        };
        userjopSer.addUserjop(data).then(function(response){
            if(response.data.code == 0){
                $state.go('root.organize.management.userjop.list');
                toastr.success( "已成功添加", '温馨提示');
            }else if(response.data.code==403||response.data.code==401){
                toastr.error( "请登录用户,2秒后跳至登陆页面", '温馨提示');
                var absurl = $location.absUrl();
                ipCookie('absurl', absurl,{ expires:3,expirationUnit: 'minutes' });
                setTimeout(function(){
                    window.location.href='http://localhost/login'
                },2000)
            }
        });
    };
});





