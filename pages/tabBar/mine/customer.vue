<template>
  <view>
    <ht-title title="我的" :has-back="false" :background-color="scrollTop > 10 ? '#ffffff':'rgba(255,255,255,0)'">
    </ht-title>
    <ht-navigation-bar-img :extra-height="50">
      <view style="height: 100%;" slot="content">
        <view style="padding: 50rpx 20rpx 60rpx 20rpx;" :style="{marginTop: `${buttonHeight}px`}">
          <template v-if="isCustomer()">
            <view class="manger-info-container">
              <view class="customer-info">
                <image class="manger-img" :src="require('@/static/icon/customer.png')" mode="widthFix" />
                <view class="manger-info" v-if="userInfo">
                  <view class="name">{{ userInfo.fullName || '-'}}</view>
                  <view class="mobile">{{ userInfo.starMaskMobile || '-' }}</view>
                </view>
              </view>
              <view class="bind-phone-bt" v-if="isCustomer()">
                <button style="height: 50rpx;line-height: 50rpx;font-size: 24rpx;" type="default"
                  open-type="getPhoneNumber" @getphonenumber="wxLogin">修改手机号</button>
              </view>
            </view>
          </template>
          <!--      统计-->
          <view class="static-container" v-if="isFormalVersion(version) && statisticLoan">
            <view class="static-item num-container" @click="gotoProduct()">
              <view class="num">{{ isCustomer() ? moneyFilter(statisticLoan.totalLoanAmount) : '0'}}</view>
              <view class="text">总贷款金额</view>
            </view>
            <view class="static-item num-container" @click="gotoProduct()">
              <view class="num">{{ isCustomer() ? statisticLoan.totalLoanCount : '0'}}</view>
              <view class="text">贷款数</view>
            </view>
            <!--    服务上线1： 隐藏订购服务-->
            <view class="static-item num-container" @click="viewMoreService" style="border-right: none;">
              <view class="num">{{ isCustomer() ? statisticLoan.customerSupportCount : '0'}}</view>
              <view class="text">订购服务</view>
            </view>
          </view>
        </view>
        <view>
          <view class="mine-user-info-container">
            <view @click="onLogin" style="display: flex;flex: 3;align-items: center">
              <view class="user-pic">
                <image
                  :src="(userInfo && customerInfo &&customerInfo.staff && customerInfo.staff.avatarUrl) || require('@/static/img/user-profile.png')" />
              </view>
              <view :class="{'margin-bottom-10': userInfo, 'user-info': true}">
                <text v-if="!userInfo">请登录</text>
                <template v-else>
                  <view v-if="isCustomer()" class="info">
                    <view class="label">专属客户经理：</view>
                    <view class="name" style="font-size: 26rpx;">
                      {{ customerInfo.staff.fullName || '暂无' }}
                      <view v-if="customerInfo.staff.mobile" class="mobile"
                        @click="toCallPhone(customerInfo.staff.mobile)" style="border-bottom: 1px solid #9A8457;">
                        ({{customerInfo.staff.mobile}})</view>
                    </view>
                  </view>
                </template>
              </view>
            </view>
          </view>

          <!--              服务上线1： 隐藏订单-->
          <view v-if="hasLogin() && orderList.length > 0" class="service-middle-container" style="margin-top: 20rpx;">
            <uni-grid :column="4" :showBorder="false" class="service-list">
              <uni-grid-item v-for="(i, index) in orderList" :index="index" :key="i.title" class="service-item"
                @tap="onChangeOrderGrid(index, i)">
                <img :src="i.image" class="order-image" />
                <text class="service-title">{{ i.title }}</text>
                <view v-if="i.num > 0" class="count">{{i.num}}</view>
              </uni-grid-item>
            </uni-grid>
          </view>

          <view v-if="hasLogin()" class="service-middle-container" style="margin-top: 20rpx;">
            <uni-grid :column="4" :showBorder="false" class="service-list">
              <uni-grid-item v-for="(i, index) in featureList" :index="index" :key="i.title" class="service-item"
                @tap="onChangeFeatureGrid(index, i)">
                <img :src="i.image" class="service-image" />
                <text class="service-title">{{ i.title }}</text>
              </uni-grid-item>
            </uni-grid>
          </view>

          <!-- 服务上线1： 隐藏已购服务 -->
          <view v-if="hasLogin() && orderList.length > 0" class="service-middle-container"
            style="margin-top: 20rpx; padding: 0 3%">
            <view class="my-service-title">
              <view class="left">
                <image class="title-image" src="@/static/module/my-service.png" mode="heightFix" />
                <text
                  class="title">{{ `已购服务（${isCustomer() && statisticLoan ? statisticLoan.customerSupportCount : '0'}）` }}</text>
              </view>
              <view class="right" @click="viewMoreService">查看更多 ></view>
            </view>

            <view class="service-page-view">
              <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption"
                @up="getCustomerSupports" @emptyclick="emptyClick" :height="400">
                <ht-payed-service-card v-for="(s, index) in list" :key="index" :item="s" @click-item="clickItem(s)" />
              </mescroll-body>
            </view>
          </view>
        </view>
      </view>
    </ht-navigation-bar-img>
  </view>
</template>
<script>
  // 我的、
  import {
    mapGetters
  } from 'vuex';
  import {
    isCustomer,
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

  import ListMixin from '@/mixins/listMixin.js';
  import {
    getServiceCustomerSupportsList
  } from '@/apis/service.js'

  export default {
    components: {
      uploadImg
    },
    mixins: [ListMixin],
    props: {
      buttonHeight: {
        type: Number,
        default: 0
      },
      scrollTop: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        emptyImg: require('@/static/icon/avatar.png'),
        wechatLogo: require('@/static/img/user-qr-code.png'),
        lists: [],
        customerInfo: undefined,
        version: undefined,
        safeAreaHeight: 0,
        featureList: [],
        orderList: [],
        statisticLoan: undefined,
        num: 5
      };
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    methods: {
      isCustomer,
      isFormalVersion,
      moneyFilter,
      hasLogin() {
        return this.userInfo && this.token
      },
      initGrid(version) {
        uni.showLoading()
        this.orderList = []
        this.featureList = []
        this.version = version

        if (this.hasLogin()) {
          if (this.isFormalVersion(version)) {
            this.orderList.push({
              image: require('@/static/module/mine/be-paid-order.png'),
              title: '待付款',
              num: 0
            })
            this.orderList.push({
              image: require('@/static/module/mine/paid-order.png'),
              title: '已付款',
              num: 0
            })
            this.orderList.push({
              image: require('@/static/module/mine/cancel-order.png'),
              title: '已取消',
              num: 0
            })
            this.orderList.push({
              image: require('@/static/module/mine/all-order.png'),
              title: '全部订单',
              num: 0
            })
          }

          this.featureList.push({
            image: require('@/static/module/mine/info.png'),
            title: '个人信息'
          })
          this.featureList.push({
            image: require('@/static/module/mine/feedback.png'),
            title: '意见反馈'
          })
          if (this.isFormalVersion(version)) {
            this.featureList.push({
              image: require('@/static/module/mine/apply.png'),
              title: '我的申请'
            })
            this.featureList.push({
              image: require('@/static/module/mine/qRCode.png'),
              title: '个人二维码'
            })
          }
          this.featureList.push({
            image: require('@/static/module/mine/exit.png'),
            title: '退出登录'
          })
        }
        uni.hideLoading()
      },
      onChangeOrderGrid(index, i) {
        let name = this.orderList[index].title;
        if (name) {
          const url = `/packageC/pages/order/index?name=${name}`
          uni.navigateTo({
            url: url
          });
        }
      },
      onChangeFeatureGrid(index, i) {
        let url;
        switch (this.featureList[index].title) {
          case '我的申请':
            url = '/packageA/pages/common/apply-record/index'
            break;
          case '个人信息':
            url = '/packageA/pages/mine/userInfo/index'
            break;
          case '意见反馈':
            url = '/packageA/pages/mine/feedback/index';
            break;
          default:
            break;
        }
        if (this.hasLogin()) {
          if (url) {
            uni.navigateTo({
              url: url
            });
          } else {
            const title = this.featureList[index].title
            if (title === '退出登录') {
              this.onExit()
            } else if (title === '个人二维码') {
              this.getWxQRCodeFun()
            }
          }
        } else {
          uni.navigateTo({
            url: `/packageA/pages/login/index`
          });
        }
      },
      onLogin() {
        this.$emit('onLogin')
      },
      onExit() {
        this.$emit('onExit')
      },
      wxLogin(e) {
        if (e.detail.code) {
          resetMobile(e.detail.code)
            .then(info => {
              // 如果无数据，如果有token，则是注册用户
              this.$store.dispatch('user/saveUserInfo', info);
            })
        }
      },
      getWxQRCodeFun() {
        this.$emit('getWxQRCodeFun')
      },
      loanStatistic() {
        getLoanStatistic().then((res) => {
          this.statisticLoan = res
          if (this.orderList[0]) {
            this.orderList[0].num = res.serviceOrderCount
          }
        })
      },
      toCallPhone(phone) {
        uni.makePhoneCall({
          phoneNumber: phone
        });
      },
      getCustomerSupports(page) {
        this.beforeGetList(page);
        this.listQuery.status = 'UNFINISHED'
        getServiceCustomerSupportsList(this.listQuery)
          .then(res => {
            this.afterGetList(res, page);
          })
          .catch(() => this.errorList());
      },
      clickItem(s) {
        uni.navigateTo({
          url: `/packageA/pages/service/write-off?id=${s.id}`
        })
      },
      viewMoreService() {
        uni.navigateTo({
          url: `/packageA/pages/service/index`
        })
      },
      gotoProduct() {
        uni.navigateTo({
          url: `/packageA/pages/common/loan/index`
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

  .manger-info-container {
    // margin-top: 20rpx;
    width: calc(100% - 80rpx);
    //height: 60px;
    padding: 0 40rpx;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    color: $system-color;
    font-size: 32rpx;
    height: 25px;
    justify-content: space-between;

    .customer-info {
      display: flex;
      align-items: center;
    }

    .manger-img {
      width: 28rpx;
      height: 28rpx;
      margin-right: 15rpx;
    }

    .manger-info {
      display: flex;
      align-items: center;
      font-weight: bold;

      .mobile {
        margin-left: 15rpx;
        color: #333333;
      }
    }
  }

  .mine-container {
    width: 100%;
    background-color: white;
    border: 1px solid $system-color;
    border-radius: 10rpx;
    margin-bottom: 20rpx;

    //display: flex;
    .login-info-style {
      //align-items: flex-end !important;
      //justify-content: space-between;
    }

    .justify-content-between {
      justify-content: space-between;
    }

    .margin-bottom-10 {
      margin-bottom: 10rpx;
    }

    .bind-phone-bt {
      width: 90px;
      //height: 30px;
      font-size: 18rpx;
      //margin-left: 3%;
      //margin-bottom: 10rpx;

      botton {
        height: 30px;
        font-size: 18rpx;
      }
    }
  }

  .image {
    padding: 10rpx 20rpx;
    width: 30rpx;
    height: 32rpx;
    vertical-align: middle;
  }

  .uni-navigate-text {
    font-weight: bold;
    font-size: $normal-font-size;
  }

  .wx-login-bt {
    position: absolute;
    width: 100%;
    bottom: 40rpx;
    left: 0;
  }

  .wx-login-text {
    line-height: 35rpx;
    font-size: 35rpx
  }

  .wechat-logo {
    width: 40rpx;
    height: 40rpx;
    vertical-align: middle;
    margin-right: 5px;
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

  .my-service-title {
    display: flex;
    padding: 30rpx 0;

    .left {
      flex: 1;
      display: flex;
      align-items: center;

      .title-image {
        height: 30rpx;
        width: auto;
        margin-right: 20rpx;
      }

      .title {
        font-size: 30rpx;
        font-weight: bold;
      }
    }

    .right {
      font-size: 28rpx;
      color: #999999;
    }
  }

  .service-page-view {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: -20rpx;
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
