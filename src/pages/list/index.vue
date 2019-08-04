
<template>
  <div>
    <!-- 筛选 -->
    <div class="filter">
      <span class="active">综合</span>
      <span>销量</span>
      <span>价格</span>
    </div>
    <!-- 商品列表 -->
    <scroll-view class="goods" scroll-y>
      <div
      class="item"
      
      >
        <!-- 商品图片 -->
        <image class="pic" src="/static/uploads/goods_1.jpg"></image>
        <!-- 商品信息 -->
        <div class="meta">
          <p class="name">【海外购自营】黎珐(ReFa) MTG日本 CARAT铂金微电流瘦脸瘦身提拉紧致V脸美容仪 【保税仓发货】</p>
          <p class="price"><span>￥</span>1399<span>.00</span></p>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<style scoped lang="less">

  .filter {
    display: flex;
    height: 96rpx;
    line-height: 96rpx;
    border-bottom: 1rpx solid #ddd;

    span {
      flex: 1;
      text-align: center;
      font-size: 30rpx;
      color: #333;

      &.active {
        color: #ea4451;
      }
    }
  }
  
  .goods {
    position: absolute;
    width: 100%;
    top: 97rpx;
    bottom: 0;
  }

  .item {
    display: flex;
    padding: 30rpx 20rpx 30rpx 0;
    margin-left: 20rpx;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .pic {
      width: 200rpx;
      height: 200rpx;
      margin-right: 30rpx;
    }

    .meta {
      flex: 1;
      font-size: 27rpx;
      color: #333;
      position: relative;
    }

    .name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      position: absolute;
      bottom: 0;

      color: #ea4451;
      font-size: 33rpx;

      span {
        font-size: 22rpx;
      }
    }
  }

</style>

<script>
import request from '@/utils/request.js'
  export default {
    data () {
      return {
        urlData: null
      }
    },

    methods: {
      // 发请求
      async dataRequest () {
        // 1  拿到参数
        console.log(this.urlData)
        // 2  发请求
        let data = await request({
          url: '/api/public/v1/goods/search',
          query: {
            cid: this.urlData
          }
        })
        // 3  数据存放data
        console.log(data)
        // 4  放到生命周期中,页面出来就发起请求
      }
      

    },

    // 生命周期

    // 页面加载完成时
    onLoad (dataUrl) {
      console.log(dataUrl)
      this.urlData = dataUrl.cid
      this.dataRequest()
    }
  }
</script>