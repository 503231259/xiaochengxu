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
      <span class="add" @click="addToCart">加入购物车</span>
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
      },

      // 加入购物车
      addToCart () {
        // 创建变量,区别是否操作过相同的id+1的情况
        let isId = false
        // 1    读取本地存储看有没有值  ||  本地存储没有值就创建数组
        let getStorageData = mpvue.getStorageSync('commodityInformation') || []
        // console.log(getStorageData.length)
        
        if(getStorageData.length) {
          getStorageData.forEach((item) => {
            // 如果添加的ID是相同的id,那么数量+1
            if(item.id === this.dataData.goods_id) {
              // 添加过相同的商品,那么isId为true
              isId = true
              // 相同的商品数量 +1
              return item.count += 1
            }
          })
        }
        // console.log(getStorageData)
        
          // 2    添加点击的商品信息
          // 如果没有添加相同的商品
          if(!isId){
            getStorageData.push({
              // 商品ID
              id: this.dataData.goods_id,
              // 商品name
              name: this.dataData.goods_name,
              // 商品价格
              price: this.dataData.goods_price,
              // 商品图片
              pic: this.dataData.pics[0].pics_sma,
              // 商品数量
              count: 1
            })
          }
        // console.log(getStorageData)
        // 3    把修改后的数据存放到本地存储里
        mpvue.setStorageSync('commodityInformation', getStorageData)

        // 提示用户信息添加成功
        mpvue.showToast({
          title: '添加成功'
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