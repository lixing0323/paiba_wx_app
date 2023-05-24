<template>
  <view class="news-container" @click="gotoDetails">
    <view class="left">
      <img :src="testSrc" class="icon" mode="aspectFill">
    </view>
    <view class="right">
      <view class="top">
        <view class="name two-lines-ellipsis">2023年中国（北京）国际摄影器材与数码影像展览会圆满闭幕，
          在此感谢各位领导，各位来宾，各位朋友的热情支持</view>
      </view>
      <view>
        <view class="time">2023年5月23日 15:31</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    components: {},
    props: {
      item: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        testSrc: require('@/static/icon/logo.png')
      };
    },
    methods: {
      gotoDetails(item) {
        this.$emit('click-item', item)
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .news-container {
    display: flex;
    padding: 10rpx 0 10rpx 0;

    .left {
      display: flex;
      align-items: center;
      margin-left: 10rpx;

      .icon {
        width: 160rpx;
        height: 100rpx;
        border-radius: 10rpx;
        background-color: #333;
        border: 1px solid #333;
      }
    }

    .right {
      width: calc(100% - 180rpx);
      margin-left: 20rpx;

      .name {
        font-size: 22rpx;
      }

      .time {
        margin-top: 18rpx;
        font-size: 16rpx;
        color: #999;
      }
    }
  }
</style>