angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('ShopCartCtrl', function($scope, $cordovaDialogs, $http, $filter) {
    $scope.isShowGoodsDetail = false; //显示打开商品页
    $scope.selectGoods = {};
    $scope.isSelectHave = false; //是否有选中商品
    $scope.selectItems = [];  //选中商品列表
    $scope.selectAllState = true; //全选状态
    $scope.selectAllState_Del = false; //删除全选状态
    $scope.isEdit = false; //是否编辑
    $scope.isCount = true; //是否能用结算按钮,true为可用，false为不可用
    $scope.selecttype = "";

    $http.get('http://localhost:3000/goods/list')
    //$http.get('/json/goods.json')
    .success(function(resq){
        console.log(resq);
        $scope.items = resq.data;
    })
    $http.get('http://localhost:3000/goodstype/list')
    //$http.get('/json/goodstype.json')
    .success(function(resq){
        console.log(resq);
        $scope.types = resq.data;
    })

    //打开购物页
    $scope.openGoods = function(id){
      for(var i=0;i<$scope.items.length;i++){
          if ($scope.items[i].id==id){
              $scope.oneGoods = $scope.items[i];
          }
      }
      $scope.selectGoods = {
          pic: $scope.oneGoods.pic,
          name: $scope.oneGoods.name,
          color: '',
          price: $scope.oneGoods.price,
          bugNum: 1,
          selected: true, //是否选中
          isDel: false,  //是否选中要删除
      }
      //添加类名
      for (var i=0; i<$scope.types.length; i++){
          if ($scope.types[i].id == $scope.oneGoods.typeid){
              $scope.selectGoods.typename = $scope.types[i].type;
          }
      }
      $scope.oneGoodsColors = $scope.oneGoods.color.split('|:|');
      $scope.chooseColor('');
      $scope.isShowGoodsDetail = true;
    }
    //关闭购物页
    $scope.closeGoods = function(){
      $scope.isShowGoodsDetail = false;
    }
    //选择颜色
    $scope.chooseColor = function(color){
        $scope.selectGoods.color = color;
        if (!$scope.selectGoods.color){
          $scope.selectGoods.color = $scope.oneGoodsColors[0];
        }
    }
    $scope.chooseState = function(color){
        var ret = false;
        if (color == $scope.selectGoods.color){
          ret = true;
        }
        return ret;
    }

    //======数量
    $scope.verifyNum = function(){
      $scope.selectGoods.bugNum = parseInt($scope.selectGoods.bugNum);
      if (!$scope.selectGoods.bugNum){
        $scope.selectGoods.bugNum = 1;
      }
    }
    //详情页中加减
    $scope.minusNum = function(){
      if ($scope.selectGoods.bugNum >1){
        $scope.selectGoods.bugNum--;
      }
    }
    $scope.plusNum = function(){
      $scope.selectGoods.bugNum++;
    }
    //列表中加减
    $scope.minus = function(item){
      if (item.bugNum >1){
        item.bugNum--;
      }
      $scope.countTotal();
    }
    $scope.plus = function(item){
      item.bugNum++;
      $scope.countTotal();
    }
    $scope.verify = function(item){
      item.bugNum = parseInt(item.bugNum);
      if (!item.bugNum){
        item.bugNum = 1;
      }
    }

    //=========加入购物车
    $scope.joinCart = function(){
      $scope.selectItems.push($scope.selectGoods);
      $scope.isSelectHave = true;

      $scope.closeGoods(); //关闭详细页
      $scope.countTotal();
      //console.log($scope.selectGoods);
    }
    //自动统计
    $scope.countTotal = function(){
      $scope.total = {
        money: 0,
        num: 0
      }
      for (var i=0; i<$scope.selectItems.length;i++){
        if ($scope.selectItems[i].selected){
          $scope.total.money += parseInt($scope.selectItems[i].price) * parseInt($scope.selectItems[i].bugNum);
          $scope.total.num += parseInt($scope.selectItems[i].bugNum);
        }
      }
    }
    //选中状态
    $scope.selectState = function(){
        var selectNum = 0;  //选择个数
        for (var i=0; i<$scope.selectItems.length;i++){
          if ($scope.selectItems[i].selected){
            selectNum ++;
          }
        }
        if (selectNum == $scope.selectItems.length){
          $scope.selectAllState = true;
        }else{
          $scope.selectAllState = false;
        }
        //设置“结算”按钮是否可用
        if (selectNum == 0){
            $scope.isCount = false;
        }else{
            $scope.isCount = true;
        }
        $scope.countTotal();
    }
    //点击全选事件
    $scope.selectAllEvent = function(){
        if ($scope.selectAllState){
          for (var i=0; i<$scope.selectItems.length;i++){
            $scope.selectItems[i].selected = true;
          }
        }else{
          for (var i=0; i<$scope.selectItems.length;i++){
            $scope.selectItems[i].selected = false;
          }
        }

        var selectNum = 0;  //选择个数
        for (var i=0; i<$scope.selectItems.length;i++){
          if ($scope.selectItems[i].selected){
            selectNum ++;
          }
        }
        //设置“结算”按钮是否可用
        if (selectNum == 0){
            $scope.isCount = false;
        }else{
            $scope.isCount = true;
        }
        $scope.countTotal();
    }

    //选中状态--删除
    $scope.selectState_Del = function(){
        var selectNum = 0;
        for (var i=0; i<$scope.selectItems.length;i++){
          if ($scope.selectItems[i].isDel){
            selectNum ++;
          }
        }
        if (selectNum == $scope.selectItems.length){
          $scope.selectAllState_Del = true;
        }else{
          $scope.selectAllState_Del = false;
        }
        $scope.countTotal();
    }
    //点击全选事件--删除
    $scope.selectAllEvent_Del = function(){
      if ($scope.selectAllState_Del){
        for (var i=0; i<$scope.selectItems.length;i++){
          $scope.selectItems[i].isDel = true;
        }
      }else{
        for (var i=0; i<$scope.selectItems.length;i++){
          $scope.selectItems[i].isDel = false;
        }
      }
    }
    


    //结算
    $scope.countGoods = function(){
      console.log('结算如下：');
      console.log($scope.selectItems);
      alert('返回打印console.log，没有做提交到数据库');
    }

    //========编辑删除====start
    $scope.openEdit = function(){
        $scope.isEdit =true;
        for (var i=0; i<$scope.selectItems.length;i++){
          $scope.selectItems[i].isDel = false;
        }
        $scope.selectAllState_Del = false;
    }
    $scope.closeEdit = function(){
        $scope.isEdit =false;
    }
    $scope.del = function(){
        var selectNum = 0;  //选择删除个数
        var delNum = 0;
        for (var i=0; i<$scope.selectItems.length;i++){
          if ($scope.selectItems[i].isDel){
            selectNum ++;
            delNum += $scope.selectItems[i].bugNum;
          }
        }

        if (selectNum>0){
          $cordovaDialogs.confirm('是否确认已选中的'+delNum+'件商品删除？', '删除', ['确认1','取消1'])
          .then(function(buttonIndex) {
            // no button = 0, 'OK' = 1, 'Cancel' = 2
            var btnIndex = buttonIndex;
            if (btnIndex == 1){
              $scope.deleteItem();
            }
          });
        }else{
          $cordovaDialogs.alert('请选择要删除的商品', '删除', 'button name')
          .then(function() {
            // callback success
          });
        }
    }
    $scope.deleteItem = function(){
      var i=0;
      var num = $scope.selectItems.length;
      while( i < num ){
        for (var j=0; j<$scope.selectItems.length;j++){
          if ($scope.selectItems[j].isDel){
            $scope.selectItems.splice(j,1);
          }
        }
        i++;
      }
      //如果为全部删除完，返回
      if ($scope.selectItems.length == 0){
          $scope.closeEdit();
          $scope.isSelectHave = false;
      }
    }
    //========编辑删除====end

    //========筛选条件
    $scope.changeType = function(type){
      $scope.selecttype = type;
    }
    //返回是否有商品列表长度
    $scope.isGoodsLen = function(){
      var len = 0;
      for (var i=0; i<$scope.selectItems.length; i++){
        if ($scope.selectItems[i].typename == $scope.selecttype){
          len++;
        }
      }
      if (len>0 || $scope.selecttype==""){
        return true;
      }else{
        return false;
      }
    }
});









