var app = angular.module('paymentEdit', ['toastr']);
app.controller('paymentEditCtrl', function($scope, paymentSer,$state,toastr,$stateParams){
    var basicId={
        id:$stateParams.id
    };
    //获取值
    paymentSer.getOneById(basicId).then(function(response){
        if(response.data.code==0){
            $scope.editInfo = response.data.data;
        }else{
            toastr.error(response.data.msg, '温馨提示');
        }
    });
    $scope.basicEditFun = function(){
        var vm = $scope;
        vm.editInfo.date = angular.element('.date').val();
        paymentSer.editContent(vm.editInfo).then(function(response){
            if(response.data.code == 0){
                $state.go('root.file.payment.list[12]');
                toastr.success( "已成功编辑", '温馨提示');
            }else{
                toastr.error(response.data.msg, '温馨提示');
            }
        });
    };
});