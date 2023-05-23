<template>
  <ht-card marginTop="20rpx" class="container">
    <view>
      <template>
        <view class="title-view" @click="isCollapse = !isCollapse">
          <image class="image" :src="img" v-if="!subTitle"></image>
          <text class="sub-title">{{ subTitle }}</text>
          <text class="title">{{ title }}</text>
          <uni-icons v-if="isShowCollapse" class="icon" :type="isCollapse ? 'top' : 'bottom'"></uni-icons>
          <view class="right"><slot name="right"></slot></view>
        </view>
      </template>
      <view v-if="isCollapse || !isShowCollapse"><slot></slot></view>
    </view>
  </ht-card>
</template>

<script>
// 可伸缩的卡片

export default {
  components: {},
  props: {
    isShowCollapse: {
      type: Boolean,
      default: false
    },
    showSubTitle: {
      type: Boolean,
      default: false
    },
    subTitle: {
      type: String,
      default: undefined
    },
    img: {
      default: require('@/static/icon/document.png')
    },
    title: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  .title-view {
    font-size: 35rpx;
    line-height: 70rpx;
    height: 70rpx;
    padding: 10rpx 0;
    vertical-align: middle;

    .image {
      width: 50rpx;
      height: 50rpx;
      vertical-align: middle;
      margin-left: 10px;
      color: $system-color;
    }

    .title {
      font-weight: bold;
      vertical-align: middle;
      color: $system-color;
      letter-spacing: 3rpx;
    }

    .sub-title {
      margin-left: 16rpx;
      vertical-align: middle;
      color: $system-color;
      letter-spacing: 3rpx;
      font-size: 28rpx;
    }

    .icon {
      float: right;
      margin-right: 30rpx;
      color: $system-color;
    }

    .right {
      float: right;
    }
  }
}
</style>
