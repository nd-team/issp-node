var app = angular.module('chargeAdd', ['toastr']);
app.controller('chargeAddCtrl', function ($scope, chargeSer, $state, toastr) {
    chargeSer.allChargeProjects().then(function(response){
        if(response.data.code == 0){
            $scope.proData = response.data.data;
        }
    });
    //添加
    $scope.chargeAddFun = function () {
        var vm = $scope;
        chargeSer.addCharge(vm.add).then(function (response) {
            if (response.data.code == 0) {
                $state.go('root.assessment.charge.list');
                toastr.success("已成功添加", '温馨提示');
            } else if (response.data.code == 403) {
                toastr.error("请登录用户", '温馨提示');
            }
        });
    };
    //可手填的下拉框
 /*   $scope.changeSelect=function(){
        $scope.add.area = $scope.add.area2;
    };*/
});




