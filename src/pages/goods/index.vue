<template>
  <div class="wrapper">
    <!-- 商品图片 -->
    <!-- 轮播图 -->
    <swiper class="pics"
    indicator-dots
    indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item
      v-for="item in dataData.pics"
      :key="item.pics_id"
      >
        <image :src="item.pics_big"></image>
      </swiper-item>
    </swiper>
    <!-- /轮播图 -->

    <!-- 基本信息 -->
    <div class="meta">
      <p class="price">{{dataData.goods_price}}</p>
      <p class="name">{{dataData.goods_name}}</p>
      <p class="shipment">快递: 免运费</p>
      <span class="collect">收藏</span>
    </div>
    <!-- /基本信息 -->

    <!-- 商品详情 -->
    <div class="detail">
      <rich-text :nodes="dataData.goods_introduce">
      </rich-text>
      <!-- <div v-html="ataData.goods_introduce"></div> -->
    </div>
    <!-- /商品详情 -->

    <!-- 操作 -->
    <div class="action">
      <button open-type="contact">联系客服</button>
      <span class="cart" @click="shoppingCar">购物车</span>
      <span class="add">加入购物车</span>
      <span class="buy">立即购买</span>
    </div>
    <!-- /操作 -->

  </div>
</template>

<style scoped lang="less">

  .wrapper {
    margin-bottom: 100rpx;
    background-color: #f4f4f4;
  }

  .pics {
    height: 720rpx;
  }
  
  .meta {
    height: 270rpx;
    line-height: 1;
    padding: 30rpx 180rpx 30rpx 20rpx;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;

    .price {
      font-size: 36rpx;
      color: #ea4451;
      margin-bottom: 30rpx;
    }

    .name {
      color: #333;
      line-height: 1.4;
      font-size: 33rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .shipment {
      font-size: 27rpx;
      color: #999;
      position: absolute;
      bottom: 30rpx;
    }

    .collect {
      width: 140rpx;
      height: 88rpx;
      text-align: center;
      padding-top: 50rpx;
      box-sizing: border-box;
      border-left: 1rpx solid #ddd;
      font-size: 22rpx;
      color: #999;

      position: absolute;
      right: 20rpx;
      top: 91rpx;
    }
  }

  .detail image {
    width: 100%;
    height: 480rpx;
    margin-top: 20rpx;
  }

  .action {
    width: 100%;
    height: 98rpx;
    background-color: #fff;

    position: fixed;
    left: 0;
    bottom: 0;

    display: flex;

    span {
      display: block;
    }

    .add, .buy {
      width: 210rpx;
      text-align: center;
      line-height: 98rpx;
      font-size: 27rpx;
      color: #fff;
    }

    .add {
      background-color: #f4b73f;
    }

    .buy {
      background-color: #ea4451;
    }

    button {
      padding: 0;
      border-radius: 0;
      background-color: #fff;

      &::after {
        border: none;
      }
    }

    button, .cart {
      flex: 1;
      line-height: 1;
      color: #989898;
      font-size: 24rpx;
      box-sizing: border-box;
      padding-top: 56rpx;                         
    }
  }

</style>

<script>
  // 引入请求
  import request from '@/utils/request.js'

  export default {
    data () {
      return {
        // url传的数据
        parameterId: 0,
        dataData: {}
      }
    },
    
    methods: {
      async requestData () {
        let data1 = await request({
          url: '/api/public/v1/goods/detail',
          method: 'get',
          data: {
              goods_id: this.parameterId
          }
        })
        // console.log(data1)
        this.dataData = data1.message
      },

      // 点击购物车跳转到购物车
      shoppingCar () {
        mpvue.switchTab({
          url: '/pages/cart/main'
        })
      }
    },

    // 生命周期
    // onLoad 可以获取url携带的数据
    async onLoad (data) {
      console.log(data.id)
      // url传的数据赋值
      this.parameterId = +data.id
      await this.requestData()
    }
  }
</script>