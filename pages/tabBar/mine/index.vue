<template>
  <view>
    <customer v-if="isCustomer()" ref="customer" :button-height="buttonHeight" :scroll-top="scrollTop"
      @onExit="onExit()" @getWxQRCodeFun="getWxQRCodeFun()" @onLogin="onLogin()" />
    <staff v-if="isStaff() || isUnLoginUser()" ref="staff" :button-height="buttonHeight" @onExit="onExit()"
      @onLogin="onLogin()" @getWxQRCodeFun="getWxQRCodeFun()" />

    <!-- <view class="qr-code-container" v-if="false">
      <view class="qr-code">
        <view style="width: 60%;margin: 0 auto;">
          <image v-if="qrCodeImg" :src="qrCodeImg" mode="widthFix" style="width: 100%;" />
          <view class="info">
            <view class="name">{{ userInfo.fullName || '-'}}</view>
            <view>{{ userInfo.starMaskMobile || userInfo.mobile || '-' }}</view>
          </view>
        </view>
      </view>
      <text>（个人二维码可分享给新用户扫描注册）</text>
      <view class="qr-button" @click="isShowQRCode = false">
        关闭
      </view>
    </view>
    <view :class="{'cover': isShowQRCode}" /> -->
  </view>
</template>

<script>
  // 我的、
  import {
    mapGetters
  } from 'vuex';
  import {
    isCustomer,
    isStaff,
    isUnLoginUser,
    isFormalVersion
  } from '@/common/roles.js'
  import {
    moneyFilter
  } from '@/common/filter'
  import {
    resetMobile,
    getUserInfo,
    getWxQRCode,
    getVersionControl
  } from '@/apis/user.js';
  import {
    setMessageCount
  } from "@/common/utils";
  import uploadImg from '@/components/ht-upload-files/upload-image.vue'
  import {
    getLoanStatistic
  } from '@/apis/my-loan.js';
  import customer from './customer.vue'
  import staff from './staff.vue'

  export default {
    components: {
      uploadImg,
      customer,
      staff
    },
    data() {
      return {
        qrCodeImg: undefined,
        isShowQRCode: false,
        viewImage: false,
        buttonHeight: 0,
        scrollTop: 0
      };
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    onPageScroll(e) {
      this.scrollTop = e.scrollTop
    },
    onLoad() {
      if (isUnLoginUser()) {
        this.onLogin()
      }
    },
    onShow(params) {
      this.init()
    },
    methods: {
      isCustomer,
      isStaff,
      isUnLoginUser,
      isFormalVersion,
      moneyFilter,
      init() {
        this.getSystem()
        if (!this.viewImage) {
          if (this.token && this.userInfo) {
            this.getInfo()
            setMessageCount()
          }
          this.getVersion()
        }
        this.viewImage = false
        if (this.isCustomer()) {
          this.$refs.customer.initGrid()
          this.$refs.customer.loanStatistic()
          this.$refs.customer.resetList()
        }
        if (this.isStaff()) {
          this.$refs.staff.initGrid()
        }
      },
      getVersion() {
        getVersionControl().then((resp) => {
          if (this.isCustomer()) {
            this.$refs.customer.initGrid(resp)
          }
        })
      },
      getSystem() {
        const _this = this
        wx.getSystemInfo({
          success: function(res) {
            _this.safeAreaHeight = res.statusBarHeight
          }
        })

        this.buttonHeight = wx.getMenuButtonBoundingClientRect().height
      },
      getInfo() {
        getUserInfo().then((resp) => {
          if (this.isCustomer()) {
            this.$refs.customer.customerInfo = resp
          } else if (this.isStaff()) {
            this.$refs.staff.staffInfo = resp
          }
          this.$store.dispatch('user/saveUserInfo', resp)
        })
      },
      getWxQRCodeFun() {
        // uni.showLoading()
        // getWxQRCode().then((resp) => {
        //   this.qrCodeImg = resp.wxaCodeUrl
        //   setTimeout(() => {
        //     uni.hideLoading()
        //     this.isShowQRCode = true
        //   }, 500)
        // })
        uni.navigateTo({
          url: `/packageC/pages/poster/index`
        });
      },
      previewImage(img, index) {
        this.viewImage = true
        if (Number(this.limit) === 1 && this.disablePreview && !this.disabled) {
          this.$emit("choose")
        }
        if (this.disablePreview) return

        uni.previewImage({
          urls: [img],
          current: index
        });
      },
      onLogin() {
        if (!this.userInfo) {
          uni.reLaunch({
            url: `/packageA/pages/login/index`
          });
        }
      },
      onExit() {
        const that = this;
        uni.showModal({
          content: '你是否要退出登录？',
          confirmText: '确定',
          cancelText: '取消',
          success: function(res) {
            if (res.confirm) {
              uni.showToast({
                title: '退出成功！'
              });
              that.$store.dispatch('user/logout');
              uni.reLaunch({
                url: `/pages/tabBar/homepage/index`
              });
            }
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/uni-nvue.css';
  @import '@/common/business.scss';

  .cover {
    position: absolute;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity .3s;
  }

  .qr-code-container {
    position: absolute;
    top: 20%;
    left: 7%;
    z-index: 9999;
    background-color: white;
    width: 86%;
    margin: 0 auto;
    border-radius: 20rpx;
    text-align: center;

    //padding-bottom: 0rpx;
    .qr-code {
      width: calc(100% - 40rpx);
      padding: 50rpx 20rpx 30rpx 20rpx;
    }

    .info {
      font-size: 36rpx;
      text-align: center;
      font-weight: bold;
      color: $system-color;
    }

    .qr-button {
      border-top: 1px solid lightgray;
      text-align: center;
      margin-top: 40rpx;
      padding: 20rpx;
      font-size: 30rpx;
    }
  }

  .manger-card {
    position: fixed;
    bottom: 10px;
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

  .feature-image {
    width: 20%;
    height: 20%;
    margin: 15rpx auto;
  }
</style>
