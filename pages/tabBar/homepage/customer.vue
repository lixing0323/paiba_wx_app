<template>
  <view class="homepage-container">
    <view class="search-bar-container">
      <uni-search-bar v-model="listQuery.search" ref="searchBar" placeholder="请输入搜索内容" border="none" @input="search"
        @clear="clear" cancelButton="none" rightSearchButton="none" bg-color="#F5F5F5">
      </uni-search-bar>
    </view>

    <view v-if="false" class="company">
      *** 有限公司
    </view>

    <view class="contain-spacing">
      <swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000">
        <swiper-item v-for="(i, index) in banners" :key="i.id">
          <view class="swiper-item">
            <image :src="i.imageUrl" class="image" mode="aspectFill" />
          </view>
        </swiper-item>
      </swiper>
    </view>

    <view class="order-scan">
      <button>扫一扫关联订单</button>
    </view>

    <view class="invite-view">
      <view class="left">
        <image :src="inviteImgSrc" class="image" mode="aspectFill" />
        <view class="name">邀请我的</view>
      </view>
      <view class="right">
        <image :src="inviteImgSrc" class="image" mode="aspectFill" />
        <view class="name">我邀请的</view>
      </view>
    </view>

    <view class="video-button">
      <button>视频教程/视频号</button>
    </view>

    <view class="hot-view">
      <view class="label">聚焦热点</view>
      <view class="list">
        <view class="one-lines-ellipsis text" v-for="(n, index) in news" :key="index">{{ n.content }}</view>
      </view>
    </view>

    <view class="tab-view">
      <tui-tabs :tabs="tabs" :currentTab="currentTab" @change="changeTab"></tui-tabs>
      <news-card v-for="(item, index) in 5" :key="item" />
    </view>


    <view class="go-login" v-if="!userInfo">
      <view>立即登录</view>
      <button type="primary" @click="goLogin"
        style="width: 54px;height: 50rpx;line-height: 50rpx;font-size: 24rpx;margin: 0;">登录</button>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import NewsCard from './news-card.vue'


  export default {
    components: {
      NewsCard
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    data() {
      return {
        listQuery: {
          search: ''
        },
        inviteImgSrc: require('@/static/temp/empty.png'),
        currentTab: 0,
        banners: [{
            id: 1,
            imageUrl: require('@/static/temp/1.png')
          },
          {
            id: 2,
            imageUrl: require('@/static/temp/2.png')
          },
          {
            id: 3,
            imageUrl: require('@/static/temp/3.png')
          }
        ],
        news: [{
            content: '2023年摄影行业现状及前景分析！'
          },
          {
            content: '2022十大热门专业相机排行榜（精选10款专业高清摄像机品牌产品）'
          },
          {
            content: '7月23日，“时代光影•致敬母亲”影像巡展（北京展）在民族文化宫展览馆开幕'
          }
        ],
        customerInfo: undefined,
        tabs: [{
          name: '资讯'
        }, {
          name: '直播'
        }],
      };
    },
    created() {},
    methods: {
      goLogin() {
        if (!this.userInfo) {
          uni.navigateTo({
            url: `/packageA/pages/login/index`
          });
        }
      },
      changeTab(e) {
        this.currentTab = e.index
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '@/common/business.scss';

  .homepage-container {
    padding: 0 20rpx;
  }

  .contain-spacing {
    padding: 10px 0;
  }

  .order-scan {
    margin-bottom: 20rpx;
  }

  .swiper {
    height: 220rpx;
    width: 100%;
    margin-bottom: 20rpx;
    border-radius: 2%;
  }

  .swiper-item {
    width: 100%;
    margin: 0 auto;
    display: block;
    height: 220rpx;

    .image {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }

  .go-login {
    position: fixed;
    bottom: 15rpx;
    left: 3%;
    width: 89%;
    background-color: #FFFFFF;
    padding: 0 10px;
    justify-content: space-between;
    display: flex;
    height: 50px;
    border-radius: 10rpx;
    box-shadow: 0 2px 12px 0 #e5e5e5;
    align-items: center;
  }

  .search-bar-container {
    text-align: center;
  }

  .invite-view {
    display: flex;
    justify-content: center;
    justify-items: center;
    text-align: center;

    .left {
      flex: 1;
    }

    .right {
      flex: 1;
    }

    .image {
      width: 100rpx;
      height: 100rpx;
    }

    .name {
      margin-top: 10rpx;
    }
  }

  .video-button {
    margin: 20rpx 0;
  }

  .hot-view {
    display: flex;
    margin-top: 30rpx;

    .label {
      width: 130rpx;
      font-size: 40rpx;
      font-weight: bold;
    }

    .list {
      margin-left: 1rpx;
    }

    .text {
      font-size: 20rpx;
      margin-top: 8rpx;
    }
  }

  .tab-view {
    margin: 20rpx 0;
  }
</style>