var app = angular.module('frontlineEdit', ['toastr']);
app.controller('frontlineEditCtrl', function($scope, frontlineSer,$stateParams,$state,toastr){
    frontlineSer.allFrontLineProjects().then(function(response){
        if(response.data.code == 0){
            $scope.proData = response.data.data;
        }
    });
    var frontData ={id: $stateParams.id};
    //获取ID
    frontlineSer.findFrontLineId(frontData).then(function(response){
        if(response.data.code=='0'){
            $scope.editInfo = response.data.data;
        }else if (response.data.code==403){
            toastr.error( "请登录用户", '温馨提示');
        }
    });
    //编辑点击提交
    $scope.frontLineEditFun = function(){
        var vm = $scope;
        frontlineSer.editFrontLine(vm.editInfo).then(function(response){
            if(response.data.code == 0){
                $state.go('root.assessment.frontline.list');
                toastr.success( "编辑成功", '温馨提示');
            }else if(response.data.code == 403){
                toastr.error( "请登录用户", '温馨提示');
            }
        });
    };
    //可手填的下拉框
   /* $scope.changeSelect=function(){
        $scope.editInfo.area = $scope.editInfo.area2;
    };*/
});





