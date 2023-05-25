<template>
  <view class="login-container">
    <tui-banner-arc height="500" percent="140" background="-webkit-linear-gradient(#5490F5,#ADD8E6)">
      <view class="logo-container">
        <view class="logo-view">
          <image class="logo" :src="logoSrc" :data-src="logoSrc" mode="widthFix"></image>
          <view class="title">拍吧</view>
        </view>
        <view class="note">让 我 们 一 起 成 长</view>
      </view>
    </tui-banner-arc>
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
            <uni-easyinput height="80rpx" contentHeight="80rpx" prefixIcon="phone" v-model="loginForm.username"
              placeholder="请输入手机号" :inputBorder="false" :styles="inputStyle" class="input">
            </uni-easyinput>
          </view>
          <view style="margin-top: 15px;">
            <uni-easyinput height="80rpx" contentHeight="80rpx" prefixIcon="chat-filled" v-model="loginForm.password"
              placeholder="请输入验证码" :inputBorder="false" :styles="inputStyle" class="input">
              <template v-slot:right>
                <view :class="{'disable-code-bt': countdownTimer}" class="sms-code-bt" @click="sendCode()">
                  {{ countDownButton }}
                </view>
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
          <template v-if="isWxLogin">
            <uni-icons class="switch-img" type="phone-filled" color="#5490F5" size="30"></uni-icons>
            <view class="text">手机号登录</view>
          </template>
          <template v-else>
            <uni-icons class="switch-img" type="weixin" color="#58BE6B" size="30"></uni-icons>
            <view class="text" style="color: #58BE6B;">微信一键登录</view>
          </template>
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
        countDownButton: '获取验证码',
        countdownTimer: null,
        countdownText: 's后获取'
      };
    },
    computed: {
      inputStyle() {
        return {
          color: '#333',
          backgroundColor: '#FAF8F7',
          borderColor: '#e5e5e5'
        }
      }
    },
    onLoad(params) {
      this.getWxCode()
    },
    beforeDestroy() {
      this.clearTimer();
    },
    onShow() {},
    created() {},
    methods: {
      //重置发送组件
      resetCountDown() {
        this.clearTimer()
        this.countDownButton = '获取验证码'
      },
      clearTimer() {
        clearInterval(this.countdownTimer)
        this.countdownTimer = null
      },
      sendCode() {
        if (!this.countdownTimer) {
          // 倒计时时间 120s
          let seconds = 120
          this.countDownButton = seconds + this.countdownText;
          this.countdownTimer = setInterval(() => {
            if (seconds > 1) {
              --seconds
              this.countDownButton = seconds + this.countdownText;
            } else {
              this.resetCountDown()
            }
          }, 1000);
        }
      },
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
    margin-top: 200rpx;
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

    .switch-img {}

    .button {
      margin-top: 50rpx;

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
    bottom: 25%;
    margin: 0 auto;

    .wx-login-bt {
      height: 90rpx;
      line-height: 90rpx;
    }

    .normal-login-bt {
      margin-top: 40rpx;
    }

    .wx-login-bt-disabled {
      background-color: #7AB3F9 !important;
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
    margin-right: 10rpx;
    border: 1px solid #333;
  }

  .disable-code-bt {
    color: #ffffff !important;
    background-color: #bbb !important;
    border: 0
  }
</style>