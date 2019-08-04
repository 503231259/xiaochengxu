<template>
  <div>
    <!-- <lianxi/> -->
    <search></search>
    <!-- 轮播图 -->
    <swiper
    class="banner"
    indicator-dots
    indicator-color="rgba(255, 255, 255, 0.6)"
    indicator-active-color="#fff">
      <swiper-item v-for="item in RotaryPlantingMap" :key="item.goods_id">
        <a :href="'/pages/goods/main?id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </a>
      </swiper-item>
    </swiper>
    <!-- 导航条 -->
    <div class="navs">
      <a
      :href="item.navigator_url || '/pages/goods/main?query=' + item.name"
      :key="item.name"
      v-for="item in NavigationBardata"
      :open-type="item.open_type || 'navigate'">
        <span>{{item.open_type}}</span>
        <image :src="item.image_src"></image>
      </a>
    </div>
    
    <!-- 楼层 -->
    <div class="floors">
      <div class="floor" v-for="(item, bbb) in floordata" :key="bbb">
        <div class="title">
          <image :src="item.floor_title.image_src"></image>
        </div>
        <div class="items" >
          <a
          :href="'/pages/list/main?query=' + kkk.name"
          v-for="(kkk, nnn) in item.product_list"
          :key="nnn"
          :open-type="kkk.open_type">
            <image :src="kkk.image_src"></image>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 发请求
  import request from '@/utils/request'
  // 搜索模块
  import search from '@/components/search'
  // 练习css
  import lianxi from '@/components/lianxi'

  export default {
    data () {
      return {
        // 轮播图数据
        RotaryPlantingMap: [],
        // 导航条数据
        NavigationBardata: [],
        // 楼层数据
        floordata: []
      }
    },
    components: {
      // 搜索组件
      search,
      // 练习
      lianxi
    },
    methods: {
      // 轮播图
      async getBannerList () {
        let canshu = {
          url: '/api/public/v1/home/swiperdata'
        }
        const { message } = await request(canshu)
        // console.log(message)
        this.RotaryPlantingMap = message
      },

      // 导航条
      async NavigationBarImage () {
        let canshu = {
          url: '/api/public/v1/home/catitems'
        }
        const { message } = await request(canshu)
        // console.log(message)
        this.NavigationBardata = message
      },

      // 楼层
      async floorMethod () {
        let canshu = {
          url: '/api/public/v1/home/floordata'
        }
        const { message } = await request(canshu)
        console.log(message)
        this.floordata = message
      }
    },
    created () {
      // 轮播图
      this.getBannerList()
      // 导航条
      this.NavigationBarImage()
      // 楼层
      this.floorMethod()
    },

    async onPullDownRefresh () {
      // 请求是异步操作,改成同步操作
      // 轮播图
      await this.getBannerList()
      // 导航条
      await this.NavigationBarImage()
      // 楼层
      await this.floorMethod()
      // 停止下拉刷新
      mpvue.stopPullDownRefresh()
    }
  }
</script>

<style scoped lang="less">

  .banner {
    width: 100%;
    height: 340rpx;

    image {
      width: 100%;
      height: 340rpx;
    }
  }

  .navs {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 44rpx;

    a {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floors {

    .title {
      width: 750rpx;
      height: 60rpx;
      padding-top: 20rpx;
      background-color: #f4f4f4;
    }

    .items {
      padding: 20rpx 16rpx;
      overflow: hidden;

      a {
        width: 232rpx;
        height: 188rpx;
        margin-right: 10rpx;
        margin-bottom: 10rpx;
        float: left;
      }

      a:nth-child(2n+1) {
        margin-right: 0;
      }

      a:first-child {
        height: 386rpx;
        margin-right: 10rpx;
      }
    }
  }

</style>
