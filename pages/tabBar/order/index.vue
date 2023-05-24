<template>
  <view v-if="hasLogin()">
    <staff-order />
    <user-order v-if="false" />
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import UserOrder from './staff'
  import StaffOrder from './staff'

  export default {
    components: {
      UserOrder,
      StaffOrder
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    onLoad: function(options) {
      if (!this.hasLogin()) {
        uni.reLaunch({
          url: `/packageA/pages/login/index`
        });
      }
    },
    methods: {
      hasLogin() {
        // return this.token && this.userInfo
        return true
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .business-search-container {
    padding: 0 15px !important;
    position: fixed;
    width: 100%;
    height: 100rpx;
    top: 0;
    z-index: 9999;

    .search-box {
      padding: 10px 0 15px 0 !important;
    }
  }

  .tab-view {
    /* height: 100%; */
    width: 200rpx;
    position: fixed;
    left: 0;
    z-index: 10;
  }

  .tab-bar-item {
    width: 200rpx;
    height: 110rpx;
    background: #f6f6f6;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    color: #444;
    font-weight: 400;
  }

  .active {
    position: relative;
    color: $system-color;
    font-size: 30rpx;
    font-weight: 600;
    background: #fff;
  }

  .active::before {
    content: '';
    position: absolute;
    border-left: 12rpx solid $system-color;
    height: 110rpx;
    left: 0;
  }

  /* 左侧导航布局 end*/

  .right-box {
    width: 100%;
    padding-left: 200rpx;
    box-sizing: border-box;
  }

  .page-view {
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding-bottom: env(safe-area-inset-bottom);
  }

  .search-sort {
    color: #333;
    font-size: 28rpx;
    padding-left: 30rpx;
    width: 100rpx;
    flex-shrink: 0;
  }

  .active-price {
    color: $system-color;
  }

  .sort-icon {
    width: 28rpx;
    height: 28rpx;
    vertical-align: middle;
    margin-left: 5rpx;
    margin-bottom: 6rpx;
  }

  .hot-image {
    width: 28rpx;
    height: 28rpx;
    margin-left: 14rpx;
  }

  .template-image {
    width: 100%;
  }
</style>