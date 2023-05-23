<template>
  <view class="poster">
    <image class="background-image" src="https://financing-platform-1253330314.cos.ap-shanghai.myqcloud.com/wxapp-img/poster.jpg" />

    <view class="content">
      <view class="info">
        <view class="top">
          <view class="avatar">
            <image class="avatar-icon" :src="avatarUrl" />
          </view>
          <view class="text" v-if="isStaff()">
            <view class="job">客户经理：</view>
            <view class="fullname">
              <span class="name">{{ userInfo.fullName }}</span>
              <span class="phone">{{ userInfo.mobile }}</span>
            </view>
          </view>
          <view class="text" v-if="isCustomer()">
            <view class="job">{{ userInfo.fullname || '-' }}</view>
            <view class="fullname">
              <span class="name">{{ userInfo.mobile }}</span>
            </view>
          </view>
        </view>
        <view class="address">
          <image class="address-icon" src="/static/icon/address.png" />
          <span class="address-text">沈河区北站路57号财富中心D座2203-2204</span>
        </view>
      </view>
      <view class="qr-code">
        <image class="qr-code-icon" v-if="qrCodeImgUrl" :src="qrCodeImgUrl" />
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getWxQRCode,
    getUserInfo
  } from '@/apis/user.js';
  import {
    isStaff,
    isCustomer
  } from '@/common/roles.js'

  export default {
    data() {
      return {
        qrCodeImgUrl: '',
        userInfo: {}
      }
    },
    computed: {
      avatarUrl() {
        let url = require('@/static/img/user-profile.png')
        if (this.userInfo && this.userInfo.avatarUrl) {
          url = this.userInfo.avatarUrl
        }
        return url
      }
    },
    created() {
      this.getQRCodeImageUrl()
      this.getSelfUserInfo()
    },
    methods: {
      isStaff,
      isCustomer,
      getQRCodeImageUrl() {
        uni.showLoading()
        getWxQRCode().then((resp) => {
          this.qrCodeImgUrl = resp.wxaCodeUrl
          uni.hideLoading()
        })
      },
      getSelfUserInfo() {
        getUserInfo().then((resp) => {
          this.userInfo = resp
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .poster {
    width: 100%;
    height: 100%;

    .background-image {
      position: absolute;
      z-index: -1;
      left: 0;
      right: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }

    .content {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      bottom: 0;
      height: 300rpx;
      display: flex;
    }

    .info {
      width: 100%;
      margin: 50rpx 0 0 30rpx
    }

    .top {
      display: flex;
      width: 100%;
      height: 150rpx;
      font-size: 17px;
      border-bottom: 1px solid $system-color;

      .avatar {}

      .avatar-icon {
        width: 120rpx;
        height: 120rpx;
        vertical-align: middle;
        border-radius: 50%;
      }

      .text {
        margin-left: 30rpx;
      }

      .job {
        height: 60rpx;
        line-height: 60rpx;
      }

      .fullname {
        height: 60rpx;
        line-height: 60rpx;
        color: $system-color;
      }

      .name {}

      .phone {
        margin-left: 10rpx;
      }
    }

    .address {
      display: flex;
      margin-top: 20rpx;

      .address-icon {
        width: 18rpx;
        height: 20rpx;
        margin-top: 12rpx;
      }

      .address-text {
        color: #999;
        font-size: 12px;
        margin-left: 10rpx;
        line-height: 24px;
        height: 24px;
        vertical-align: middle;
      }
    }

    .qr-code {
      text-align: center;
      width: 180rpx;
      margin: 50rpx 30rpx 0 0;

      .qr-code-icon {
        width: 180rpx;
        height: 180rpx;
      }
    }

  }
</style>
