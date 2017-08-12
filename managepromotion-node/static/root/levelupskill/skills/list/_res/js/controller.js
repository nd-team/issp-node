var app = angular.module('skilList', ['ng-pagination','toastr']);
app.controller('skilListCtrl',function($scope,skilSer,toastr,$stateParams,$state,$location){
    $scope.$emit('changeId', null);
    $scope.inClick1=function(id1){
        // //向父Ctrl传递事件
        console.log(id1)
    }
    $scope.inClick2=function(id2){
        $scope.idListd = id2;
        //向父Ctrl传递事件
        $scope.$emit('changeId', $scope.idListd);
        console.log(id2)
    }
    //删除
    //获取id
    if($stateParams.id){
        switch ($stateParams.name){
            case 'delete':
                $scope.delShow = true;
                break;
        }
    }
    $scope.cancel = function(){//取消删除
        $scope.delShow = false;
        $state.go('' +
            'root.levelupskill.skills.list[12]',{id:null,name:null});
    };
    var count=0;
    $scope.delFn = function(){//确认删除

        var data = {
            id:$stateParams.id
        };
        skilSer.skilDelete(data).then(function(response){
            if(response.data.code==0){
                count++;
                toastr.info( "信息已删除", '温馨提示');
                $scope.$emit('changeId', null);
                $scope.delShow = false;
                if(($scope.custom.itemsCount-count)%10){
                    $state.go('root.levelupskill.skills.list[12]',{id:null,name:null});
                }else{
                    $state.go('root.levelupskill.skills.list[12]',{id:null,name:null,page:$stateParams.page-1});
                }
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    };
    function activatePage(page) {
        var listData = {
            page:page || 1
        };
        skilSer.skilList(listData).then(function(response){
            if(response.data.code==0){
                $scope.firstLists = response.data.data;
                console.log($scope.firstLists)
                for(var n=0;n<$scope.firstLists.length;n++){
                    $scope.SecondLists = $scope.firstLists[n].skillGradingBBOS;                   
                }
                if($stateParams.id){
                    angular.forEach($scope.firstLists,function(obj){
                        if(obj.id == $stateParams.id){
                            obj._selectList = true;
                        }
                    });
                    //向父Ctrl传递事件
                    $scope.$emit('changeId', $stateParams.id);
                }
            }else{
                toastr.error( response.data.msg, '温馨提示');
            }
        });
    }

    $scope.selectList = function(event){
        angular.forEach($scope.firstLists,function(obj){
                obj._selectList = false
        });
        event._selectList = true;
        $scope.idListd = event.id;
        //向父Ctrl传递事件
        $scope.$emit('changeId', $scope.idListd);
        $scope.$emit('page',$location.search().page);
    };
    //点击更多详细
    $scope.moreList1 = function(event){
        angular.forEach($scope.firstLists.data,function(obj){
            if(event.id!==obj.id){
                obj._moreList1 = false
            }
        });
        event._moreList1 = !event._moreList1;
    };
    //点击更多详细
    $scope.moreList2 = function(event){
        angular.forEach($scope.firstLists.data,function(obj){
            if(event.id!==obj.id){
                obj._moreList2 = false
            }
        });
        event._moreList2 = !event._moreList2;
        
    };
    //点击更多详细
    $scope.moreList3 = function(event){
        angular.forEach($scope.firstLists.data,function(obj){
            if(event.id!==obj.id){
                obj._moreList3 = false
            }
        });
        console.log(event.id)
        event._moreList3 = !event._moreList3;
       
    };

//分页
    $scope.custom = {
        itemsCount: 2, //总条数
        take: 10, //每页显示
        activatePage: activatePage
    };

    skilSer.skilCount().then(function(response){
        if(response.data.code==0){
            $scope.custom.itemsCount = response.data.data;
            $scope.num = $stateParams.page*10>10?($stateParams.page-1)*10:null;
        }else{
            toastr.error( response.data.msg, '温馨提示');
        }
    })

});
