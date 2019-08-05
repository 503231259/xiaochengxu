<template>
  <div>
    <!-- 搜索 -->
    <search></search>
    <!-- 分类 -->
    <div class="category" v-if="listData.length">
      <!-- 顶级分类 -->
      <ul class="sup">
        <scroll-view scroll-y>
          <li
          :class="{active: activeStatus === listIndex}"
          @click="handleStatus(listIndex)"
          v-for="(item, listIndex) in listData"
          :key="item.cat_id"
          >
          {{item.cat_name}}
          </li>
        </scroll-view>
      </ul>
      <!-- 子级分类 -->
      <div class="sub">
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image src="/static/uploads/category.png" class="thumb"></image>
          <div
          class="children"
          v-for="item in childrenComputed"
          :key="item.cat_id"
          >
            <div class="title">{{item.cat_name}}</div>
            <!-- 品牌 -->
            <div class="brands">
              <!-- 跳转到商品列表 -->
              <navigator
              :url="'/pages/list/main?cid=' + item1.cat_id"
              v-for="(item1, index2) in item.children"
              :key="item1.cat_id"
              >
                <image :src="item1.cat_icon"></image>
                <span>{{item1.cat_name}}</span>
              </navigator>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request.js'
  import search from '@/components/search';

  export default {
    data () {
      return {
        // 频道列表
        listData: [],
        // 点击获取状态索引
        activeStatus: 0
      }
    },
    
    // 计算属性
    computed: {
      childrenComputed () {
          return this.listData.length && this.listData[this.activeStatus].children
        }
    },

    //组件 
    components: {
      search
    },

    //方法
    methods: {
      // 获取分类列表
      async requestData () {
        let canshu = {
          url: '/api/public/v1/categories'
        }
        let data = await request(canshu)
        // console.log(data)
        this.listData = data.message
        // console.log(this.listData)
      },

      // 点击获取点击状态
      handleStatus (index) {
        // console.log(index)
        this.activeStatus = index
      }
    } ,

    /**
     *  生命周期
     * 为什么不用created?
     * 答:在首页加载的时候,其他页面的created也会触发,mounted不会触发
     */
    mounted () {
      // 获取分类列表
      this.requestData()
    }
  }
</script>


<style scoped lang="less">

  scroll-view {
    height: 100%;
  }

  .category {
    display: flex;
    width: 100%;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      li {
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 27rpx;
        color: #333;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }
        
        &.active {
          background-color: #FFF;
          color: #ea4451;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            transform: translateY(-50%);
            background-color: #ea4451;

            position: absolute;
            left: 0;
            top: 50%;
          }
        }
      }
    }

    .sub {
      flex: 1;
      padding: 20rpx 18rpx;

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .children {
        text-align: center;
        color: #333;

        .title {
          display: inline-block;
          margin: 40rpx 0 20rpx;
          font-size: 30rpx;

          &::before {
            content: '/';
            margin-right: 20rpx;
            color: #666;
          }

          &::after {
            content: '/';
            margin-left: 20rpx;
            color: #666;
          }
        }
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        navigator {
          width: 33%;
          margin-bottom: 20rpx;
        }

        image {
          width: 120rpx;
          height: 120rpx;
        }

        span {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }
</style>
