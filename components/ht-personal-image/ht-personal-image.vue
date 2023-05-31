<template>
  <view class="landscape">
    <tui-landscape :show="show" :position="2" @close="close">
      <view class="land-container">
        <view class="logo-container">
          <view class="logo-view">
            <image class="logo" :src="logoSrc" :data-src="logoSrc" mode="widthFix"></image>
          </view>
          <view class="title">拍吧</view>
        </view>

        <view class="avatar-container">
          <view class="avatar-view">
            <image class="avatar" :src="avatarUrl" :data-src="avatarUrl" mode="widthFix"></image>
          </view>
          <view class="name">李四</view>
          <view class="role">摄影组</view>
        </view>

        <view class="qr-code-view">
          <image class="qr-code" :src="qrCodeSrc" :data-src="qrCodeSrc" mode="widthFix"></image>
        </view>

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
  import {
    mapGetters
  } from 'vuex';
  import poster from '@/common/poster.js'

  export default {
    components: {},
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    data() {
      return {
        logoSrc: '',
        avatarUrl: '',
        qrCodeSrc: require('@/static/icon/qrCode.png')
      }
    },
    created() {
      this.avatarUrl = this.userInfo.avatarUrl || require('@/static/icon/avatar.png')
    },
    methods: {
      close() {
        this.$emit("update:show", false)
      },
      onSave() {
        poster.saveImage(this.qrCodeSrc)
      },
      onShare() {
        uni.share({
          provider: "weixin",
          scene: "WXSceneSession",
          type: 0,
          href: "http://uniapp.dcloud.io/",
          summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
          imageUrl: "https://web-assets.dcloud.net.cn/unidoc/zh/uni@2x.png",
          success: function(res) {
            console.log("success:" + JSON.stringify(res));
          },
          fail: function(err) {
            console.log("fail:" + JSON.stringify(err));
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .land-container {
    background-color: #fff;
    width: calc(100% - 100rpx);
    border-radius: 20rpx;
  }

  .logo-container {
    width: 100%;
    text-align: left;
    margin: 40rpx 0 0 40rpx;
    display: flex;
    align-items: center;

    .logo-view {
      display: flex;
      align-items: center;

      .logo {
        width: 80rpx;
        height: 80rpx;
        border: 1px solid #bbb;
      }
    }

    .title {
      font-size: 30rpx;
      margin-left: 10rpx;
    }
  }

  .avatar-container {
    width: 100%;
    margin-top: -40rpx;

    .avatar-view {
      display: flex;
      align-items: center;
      justify-content: center;

      .avatar {
        height: 160rpx;
        width: 160rpx;
        border-radius: 50%;
      }
    }

    .name {
      text-align: center;
      font-size: 40rpx;
      font-weight: bold;
      margin-top: 30rpx
    }
  }

  .role {
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

  .tui-btn__opentype {
    background: transparent !important;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    border: 0;
    z-index: 1;
  }

  .tui-btn__opentype::after {
    border: 0;
  }
</style>