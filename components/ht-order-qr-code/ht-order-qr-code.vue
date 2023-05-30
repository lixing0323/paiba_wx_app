<template>
  <view class="landscape">
    <tui-landscape :show="show" :position="2" @close="close">
      <view class="land-container">
        <view class="logo-container">
          <view class="logo-view">
            <image class="logo" :src="logoSrc" :data-src="logoSrc" mode="widthFix"></image>
          </view>
          <view class="title">拍吧</view>
          <view class="note">让 我 们 一 起 成 长</view>
        </view>

        <view class="qr-code-view">
          <image class="qr-code" :src="qrCodeSrc" :data-src="qrCodeSrc" mode="widthFix"></image>
        </view>

        <view class="note">保存到手机，通过扫一扫查看订单详情</view>

        <view class="tui-share__list">
          <view class="tui-share__item">
            <button open-type="share" @tap="onShare" class="tui-btn__opentype"></button>
            <tui-icon size="30" class="tui-share__ic" name="share"></tui-icon>
            <text class="tui-share_text">分享给好友</text>
          </view>
          <view class="tui-share__item" @tap="onSave">
            <tui-icon size="28" class="tui-share__ic" name="pic"></tui-icon>
            <text class="tui-share_text">保存到手机</text>
          </view>
        </view>
      </view>
    </tui-landscape>
  </view>
</template>

<script>
  import poster from '@/common/poster.js'

  export default {
    components: {},
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        logoSrc: '',
        qrCodeSrc: require('@/static/icon/qrCode.png')
      }
    },
    created() {

    },
    methods: {
      close() {
        this.$emit("update:show", false)
      },
      onSave() {
        poster.saveImage(this.qrCodeSrc)
      },
      onShare() {

      }
    }
  };
</script>

<style lang="scss" scoped>
  .land-container {
    background-color: #fff;
    width: calc(100% - 100rpx);
    border-radius: 20rpx;
  }

  .logo-container {
    width: 100%;
    margin-top: 40rpx;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo-view {
      display: flex;
      align-items: center;

      .logo {
        width: 100rpx;
        height: 100rpx;
        border: 1px solid #bbb;
      }
    }

    .title {
      font-size: 40rpx;
      font-weight: bold;
      margin-top: 40rpx
    }
  }

  .note {
    margin-top: 20rpx;
    text-align: center;
    font-size: 28rpx;
    color: #999;
  }

  .qr-code-view {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40rpx;

    .qr-code {
      width: 400rpx;
      height: 400rpx;
      border: 1px solid #bbb;
    }
  }

  .tui-share__list {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tui-share__item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40rpx 60rpx;
    position: relative;
  }

  .tui-share__ic {
    width: 80rpx;
    height: 80rpx;
    line-height: 80rpx;
    border: 1px solid #999;
    border-radius: 50%;
    margin-bottom: 12rpx;
    opacity: 0.85;
    text-align: center;
  }

  .tui-share_text {
    margin-top: 10rpx;
  }
</style>