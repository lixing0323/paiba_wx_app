<template>
  <view>
    <view class="container">
      <view>
        <image class="image" :style="{height:`${imageHeight}rpx`, width:`${imageWidth}rpx`}" :src="src"></image>
      </view>
      <view class="title">
        {{ title }}
      </view>
      <view class="sub-title">
        {{ subTitle }}
      </view>
    </view>
  </view>

</template>
<script>
  // 消息新界面
  export default {
    components: {},
    props: {
      title: {
        type: String,
        default: ''
      },
      subTitle: {
        type: String,
        default: ''
      },
      src: {
        type: String,
        default: require('@/static/img/empty.png')
      },
      imageWidth: {
        type: Number,
        default: 300
      },
      imageHeight: {
        type: Number,
        default: 300
      }
    },
    data() {
      return {};
    },
    methods: {}
  };
</script>

<style lang="scss" scoped>
  .container {
    text-align: center;

    .image {
      margin-top: 200rpx;
    }

    .title {
      width: 280rpx;
      margin: 0 auto;
      text-align: center;
      margin-top: 50rpx;
      font-size: 46rpx;
      font-weight: bold;
    }

    .sub-title {
      margin-top: 40rpx;
      font-size: 34rpx;
      color: #888888;
      margin-bottom: 40rpx;
    }
  }
</style>
