<template>
  <view>
    <view class="card-container" @click="clickEvent">
      <view class="first-floor">
        <view class="first-floor-left">
          <image :src="icon" :data-src="icon" class="icon"></image>
          <slot name="title" />
        </view>
        <view v-if="status" :class="{'danger-color': isShowDangerColor,'status': true}">
          ● {{ status }}
        </view>
      </view>
      <slot name="extra" />
      <view class="second-floor" v-if="isShowLabelValue">
        <view class="label item">{{ tagLabel }}</view>
        <view class="value item">{{ tagValue }}</view>
      </view>
      <view class="third-floor" v-if="isShowThirdFloor">
        <slot name="content" />
      </view>
      <slot name="free" />
      <view class="fourth-floor">
        <slot name="time" />
      </view>
    </view>
  </view>
</template>

<script>
  // 办卡卡片组件
  export default {
    props: {
      icon: {
        type: String,
        default: require('@/static/icon/document.png')
      },
      isShowDangerColor: {
        type: Boolean,
        default: false
      },
      status: {
        type: String,
        default: undefined
      },
      tagLabel: {
        type: String,
        default: undefined
      },
      tagValue: {
        type: String,
        default: undefined
      },
      isShowLabelValue: {
        type: Boolean,
        default: true
      },
      isShowThirdFloor: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      clickEvent() {
        this.$emit('clickEvent')
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .card-container {
    padding: 30rpx 0rpx;
    // margin-bottom: 30rpx;
  }

  .first-floor {
    display: flex;
    justify-content: space-between;

    .first-floor-left {
      display: flex;
      align-items: center;

      .icon {
        width: 50rpx;
        height: 50rpx;
        margin-right: 20rpx;
      }

      text {
        font-size: 35rpx;
        color: $system-color;
        font-weight: bold;
      }
    }
  }

  .status {
    font-size: 28rpx;
    text-align: center;
    color: #999999;
  }

  .danger-color {
    font-weight: bold;
    color: #F56C6C !important;
  }

  .danger-border {
    border: 1px solid #F56C6C;
  }

  .second-floor {
    margin-top: 20rpx;
    font-size: 28rpx;
    font-weight: bold;

    .item {
      display: inline-block;
      text-align: center;
      line-height: 50rpx;
      color: #333333;
      background-color: #ffffff;
      // letter-spacing: 5rpx;
    }

    .label {
      padding: 0 30rpx;
      background-color: #B3A281;
      border-top-left-radius: 6rpx;
      border-bottom-left-radius: 6rpx;
      color: white;
      border: 1px solid #B3A281;
    }

    .value {
      padding: 0rpx 20rpx;
      border: 1px solid #B3A281;
      border-left: none;
      border-top-right-radius: 6rpx;
      border-bottom-right-radius: 6rpx;
      color: $system-color;
    }
  }

  .third-floor {
    padding: 10rpx 20rpx;
    width: 94%;
    margin: 0 auto;
    margin-top: 20rpx;
    background-color: #F6F6F6;
    border-radius: 8rpx;
    letter-spacing: 3rpx;
  }

  .content-value {
    color: black;
    font-weight: bold;
  }
  .fourth-floor {
    float: right;
    margin: 10rpx 20rpx 10rpx 0;
    font-size: 26rpx;
    color: #999999;
  }
</style>
