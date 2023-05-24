<template>
  <view class="login-container">
    <view class="logo-container" style="padding-top: 100px">
      <view class="logo-view">
        <image class="logo" :src="logoSrc" :data-src="logoSrc" mode="widthFix"></image>
        <view class="title">拍吧</view>
      </view>
      <view class="note">让 我 们 一 起 成 长</view>
    </view>
    <view class="common-padding">
      <view class="login-form-container wx-login-view">
        <template v-if="isWxLogin">
          <button type="primary" class="wx-login-bt" open-type="getPhoneNumber" @getphonenumber="userBindPhone">
            <image :src="wechatLogo" :data-src="wechatLogo" class="wechat-logo" mode="widthFix"></image>
            <text class="wx-login-text">一键授权微信登录</text>
          </button>
        </template>
        <template v-else>
          <view>
            <uni-easyinput height="80rpx" contentHeight="80rpx" prefixIcon="person" v-model="loginForm.username"
              placeholder="请输入用户名" :inputBorder="false" class="input">
            </uni-easyinput>
          </view>
          <view style="margin-top: 15px;">
            <uni-easyinput height="80rpx" contentHeight="80rpx" prefixIcon="locked" v-model="loginForm.password"
              placeholder="请输入验证码" :inputBorder="false" class="input">
              <template v-slot:right>
                <view class="sms-code-bt">{{ code }}</view>
              </template>
            </uni-easyinput>
          </view>
          <button type="primary" class="wx-login-bt normal-login-bt"
            :class="{'wx-login-bt-disabled': !loginForm.username || !loginForm.password}" @click="onPasswordLogin()"
            :disabled="!loginForm.username || !loginForm.password">
            <text class="wx-login-text" style="font-weight: bold">登 录</text>
          </button>
        </template>
      </view>
      <view class="switch-role-login">
        <view class="info">
          <view class="line" />
          <text class="title">其他登录</text>
          <view class="line" />
        </view>
        <view class="button" @click="switchLoginType()">
          <image :src="managerLogo" class="switch-img" mode="widthFix" />
          <text class="text">手机号登录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    wxBindPhone,
    login,
    calcLoginCount
  } from '@/apis/user.js';
  import {
    mapGetters
  } from 'vuex';

  export default {
    components: {},
    data() {
      return {
        logoSrc: '',
        wechatLogo: require('@/static/img/wechat.png'),
        managerLogo: require('@/static/img/manager-login.png'),
        isWxLogin: true,
        loginForm: {
          username: undefined
        },
        msgType: 'success',
        messageText: undefined,
        code: '获取验证码'
      };
    },
    onLoad(params) {
      this.getWxCode()
    },
    onShow() {},
    created() {},
    methods: {
      getWxCode(type) {
        // uni.showLoading({
        //   mask: true
        // });
        uni.login({
          provider: 'weixin',
          success: uniRes => {
            uni.hideLoading();
            console.log('wx-code', uniRes.code)
          },
          fail: () => {
            uni.hideLoading();
          }
        })
      },
      switchLoginType() {
        this.isWxLogin = !this.isWxLogin
        this.boxChecked = false
      },
      onPasswordLogin() {

      },
      userBindPhone(e) {
        if (e.detail.code) {
          uni.showLoading();
          uni.login({
            provider: 'weixin',
            success: uniRes => {
              getWxAppCode(uniRes.code).then((resp) => {
                this.$store.dispatch('user/saveUserInfoWithToken', resp);
                const data = this.codeQuery && this.codeQuery.scene ? {
                  wxPhoneCode: e.detail.code,
                  scene: this.codeQuery.scene
                } : {
                  wxPhoneCode: e.detail.code
                }
                wxBindPhone(data)
                  .then(info => {
                    uni.hideLoading();
                    // 如果无数据，如果有token，则是注册用户
                    this.$store.dispatch('user/saveUserInfoWithToken', info);
                    // 登录首页
                    this.$refs.alertDialog.open()
                  })
                  .catch(() => uni.hideLoading());
              })
            }
          })
        }
      },
      goToHomepage(isFirstReg = false) {
        uni.reLaunch({
          url: `/pages/tabBar/homepage/index`
        })
      }
    }
  };
</script>

<style scoped lang="scss">
  .login-container {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }

  .input {
    ::v-deep .uni-easyinput__content {
      height: 100rpx !important;
      background-color: #FAF8F7 !important;
    }

    ::v-deep .content-clear-icon {
      padding: 0 10px;
    }
  }

  .logo-container {
    width: 100%;
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

      .title {
        font-size: 50rpx;
        font-weight: bold;
        margin-left: 30rpx;
      }
    }

    .note {
      margin-top: 20rpx;
      font-size: 28rpx;
    }
  }

  .common-padding {
    padding: 0rpx 6%;
  }

  .login-form-container {
    .wechat-logo {
      width: 40rpx;
      height: 40rpx;
      vertical-align: middle;
      margin-right: 5px;
    }
  }

  .input {
    width: 100%;
    height: 100rpx;
    background-color: #fff;
    border-radius: 20rpx;
    text-align: left;
    color: grey;
  }

  .switch-role-login {
    position: absolute;
    width: 98%;
    right: 0;
    bottom: 60rpx;
    text-align: center;

    .info {
      width: 100%;
      display: flex;
      color: #999999;

      .line {
        height: 1rpx;
        width: 40%;
        background-color: #999999;
        margin-top: 20rpx;
      }

      .title {
        display: inline-block;
        padding: 0 30rpx;
        width: 18%;
        height: 15rpx;
      }
    }

    .switch-img {
      width: 80rpx;
      height: 80rpx;
      margin-top: 30rpx;
    }

    .button {
      margin-top: 20rpx;

      .text {
        display: block;
        color: $system-color;
      }
    }
  }

  .wx-login-view {
    padding: 0 40rpx;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 200px;
    margin: 0 auto;

    .wx-login-bt {
      height: 90rpx;
      line-height: 90rpx;
    }

    .normal-login-bt {
      margin-top: 40rpx;
    }

    .wx-login-bt-disabled {
      background-color: #C9BDA5 !important;
    }
  }

  .wx-login-text {
    line-height: 35rpx;
    font-size: 35rpx;
    color: #ffffff;
  }

  .sms-code-bt {
    padding: 10rpx 20rpx;
    border-radius: 20rpx;
    border: 1px solid #333;
  }
</style>