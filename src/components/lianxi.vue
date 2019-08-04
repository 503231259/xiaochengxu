<template>
  <div class="outBox aaa">
    <div class="inputBox focus">
      <input type="text">
      <span>取消</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  .outBox {
    height: 100rpx;
    box-sizing: border-box;
    padding: 20rpx;
    background-color: #ea4451;

    .inputBox {
      display: flex;
      position: relative;
      // border-radius: 10rpx;
      overflow: hidden;
      // padding: 5rpx;
      // background-color: aliceblue;
      box-sizing: border-box;

      input {
        flex: 1;
        background-color: aliceblue;
        height: 100%;
        padding-left: 10rpx;
        border-radius: 10rpx;
      }

      span {
        display: none;
      }
    }

    .inputBox::after {
      position: absolute;
      padding-left: 50rpx;
      content: '搜索';
      color: #666;
      // background-color: #ea4451;
      display: block;
      background-image: url('https://ugo2.oss-cn-hangzhou.aliyuncs.com/images/icon_search%402x.png');
      background-size: 35rpx;
      background-repeat: no-repeat;
      background-position: left center;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .inputBox::after {
      position: absolute;
      padding-left: 50rpx;
      content: '搜索';
      color: #666;
      // background-color: #ea4451;
      display: block;
      background-image: url('https://ugo2.oss-cn-hangzhou.aliyuncs.com/images/icon_search%402x.png');
      background-size: 35rpx;
      background-repeat: no-repeat;
      background-position: left center;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    // 第二种状态
    .inputBox.focus span {
      display: block;
      width: 100rpx;
      text-align: center;
    }

    
    
  }
  .outBox.aaa {
    background-color: #eee;
  }
  
</style>
