<template>
  <view style="padding-top: 20rpx;">
    <view v-if="needPayment() && timer" class="wait-conainer">
      <view class="title">等待付款</view>
      <view class="time"> 剩 {{ timer }}自动关闭 </view>
    </view>


    <ht-order-card :item="item" :order="order" :is-detail="true" />
    <view :style="{'height': `${height}px`,'backgroundColor': '#ffffff','padding': '20rpx 40rpx'}"
      class="business-content-top-20">
      <template v-if="!order">
        <text style="font-size: 28rpx;font-weight: bold;">订单留言：</text>
        <view class="business-content-top-20">
          <tui-textarea min-height="400rpx" v-model="customerRemark" placeholder="请输入订单留言，最多200字。" :maxlength="200"
            :size="28" :borderBottom="false" :borderTop="false" />
        </view>
      </template>
      <template v-else>
        <view>
          <view class="name-mobile">{{ order.customer.fullName }} {{ order.customer.mobile }}</view>
          <view class="order-info business-content-top-20">
            <view class="common-flex business-content-top-20">
              <view>订单编号</view>
              <view style="display: flex;" class="order-no">
                <view>{{ order.orderNo }}</view>
                <view class="copy-button" @click="copyNo">复制</view>
              </view>
            </view>
            <view class="common-flex business-content-top-20">
              <view>创建时间</view>
              <view class="order-no">{{ order.createdAt }}</view>
            </view>
            <view class="common-flex business-content-top-20" v-if="getStatusName() === 'PAY_SUCCESS'">
              <view>支付时间</view>
              <view class="order-no">{{ order.settledAt }}</view>
            </view>
          </view>
          <view class="order-info business-content-top-20">
            <view class="common-flex business-content-top-20">
              <view>商品总金额</view>
              <view class="order-no">{{ order.amount ? `¥ ${order.amount}` : '暂无价格' }}</view>
            </view>
            <view class="common-flex business-content-top-20">
              <view>实付金额</view>
              <view class="money">{{ order.amount ? `¥ ${order.amount}` : '暂无价格' }}</view>
            </view>
          </view>
          <view class="manager business-content-top-20">
            <image class="manger-img"
              :src="managerInfo && managerInfo.avatarUrl ? managerInfo.avatarUrl : require('@/static/icon/customer.png')"
              mode="widthFix" />
            <view>联系专属客户经理：</view>
            <view>{{ managerInfo.name }}</view>
            <view class="mobile" @click="toCallPhone(managerInfo.mobile)">{{ managerInfo.mobile }}</view>
          </view>
        </view>
      </template>
    </view>
    <view class="un-standard-order-hint" :style="{'bottom': `${safeAreaBottom + 120}px`}">
      <view v-if="!item.isStandard && !order.amount" class="hint">
        <uni-icons type="info-filled" color="#F56C6C" size="30" class="icon" />
        <text class="text">非标准件在下单后请联系客服（13166772757）或客户经理进行更改价格</text>
      </view>
    </view>
    <view class="submit-bt-container-fixed" :style=" {'padding': `50rpx 40rpx ${safeAreaBottom + 10}px 40rpx`}"
      style="width: calc(100% - 40px);" v-if="getStatusName() !== 'PAY_SUCCESS'">
      <view class="common-flex" v-if="!order">
        <view>
          <text class="money">¥ {{ order ? (order.amount  || '暂无价格')  : item.isStandard ? item.price : '暂无价格' }}</text>
          <text class="count">共1件</text>
        </view>
        <view class="button" @click="gotoSubmit">
          提交订单
        </view>
      </view>
      <view v-if="needPayment()">
        <button type="primary" @click="payOrder()" :disabled="loading">去付款</button>
      </view>
      <view v-if="getStatusName() === 'CANCELED'">
        <button style="width: 98%;" type="info" @click="delOrder()" :disabled="loading">删除订单</button>
      </view>
    </view>

    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog type="error" cancelText="取消" confirmText="确定" title="提醒" @confirm="dialogConfirm">
        <view style="text-align: center;font-size: 32rpx;">
          {{ `请确认是否删除该订单` }}
        </view>
      </uni-popup-dialog>
    </uni-popup>

    <uni-popup ref="message" type="message">
      <uni-popup-message :type="msgType" :message="messageText" :duration="1500" />
    </uni-popup>
  </view>
</template>

<script>
  import {
    getServiceProductItem
  } from '@/apis/service';
  import {
    postServiceOrders,
    postServiceOrder,
    getServiceOrderItem,
    deleteServiceOrder,
    postOrderPrepay
  } from '@/apis/order';
  import {
    getUserInfo
  } from '@/apis/user.js';
  import PayMixin from '@/mixins/payMixin.js'
  import {
    getTimeRemaining
  } from '@/common/utils.js'

  export default {
    mixins: [PayMixin],
    data() {
      return {
        id: undefined,
        orderId: undefined,
        order: undefined,
        item: undefined,
        height: undefined,
        safeAreaBottom: undefined,
        customerRemark: undefined,
        managerInfo: undefined,
        msgType: 'success',
        messageText: '',
        timer: '',

      }
    },
    computed: {

    },
    onLoad(params) {
      this.id = params.id || null
      this.orderId = params.orderId || null
      this.id ? this.getServiceProductItemFunc() : ''
      this.orderId ? this.getServiceOrderItemFunc() : ''
      this.getInfo()
      this.getSystem()
      this.getTime()
    },
    onUnload() {
      clearInterval(this.intervalTimeId)
    },
    methods: {
      getStatusName() {
        if (this.order && this.order.status) {
          return this.order.status.name
        }
      },
      needPayment() {
        return this.getStatusName() === 'CREATED'
      },
      getServiceProductItemFunc() {
        getServiceProductItem(this.id).then((resp) => {
          this.item = resp
        })
      },
      getServiceOrderItemFunc() {
        getServiceOrderItem(this.orderId).then((resp) => {
          this.item = resp.lineItems[0]
          this.order = resp
        })
      },
      async getSystem() {
        const _this = this
        await uni.getSystemInfo({
          success: function(res) {
            _this.height = res.windowHeight - 180
            _this.safeAreaBottom = res.safeAreaInsets.bottom
            uni.hideLoading()
          }
        })
      },
      getInfo() {
        getUserInfo().then((resp) => {
          this.managerInfo = resp.staff
        })
      },
      toCallPhone(phone) {
        uni.makePhoneCall({
          phoneNumber: phone
        });
      },
      copyNo() {
        uni.setClipboardData({
          data: this.order.orderNo
        })
      },
      // 提交订单
      gotoSubmit() {
        const item = this.item
        const data = {
          customerRemark: this.customerRemark,
          lineItems: [{
            serviceProductId: item.id,
            oneCate: item.oneCate ? item.oneCate.name : undefined,
            twoCate: item.towCate ? item.towCate.name : undefined,
            carouselImages: item.carouselImages,
            code: item.code,
            name: item.name,
            serviceContent: item.serviceContent,
            price: item.price,
            offStandardPrice: item.offStandardPrice,
            isStandard: item.isStandard
          }]
        }

        uni.showLoading({
          mask: true
        })
        postServiceOrders(data).then((resp) => {
          uni.hideLoading()
          this.goNext(resp.id, resp.orderNo)
        }).catch(() => (uni.hideLoading()))
      },
      // 去付款
      payOrder() {
        this.doPay(this.orderId, this.order.orderNo)
      },
      // 下一步
      goNext(id, orderNo) {
        // 标准件直接支付
        if (this.item && this.item.isStandard) {
          this.doPay(id, orderNo)
        } else {
          uni.redirectTo({
            url: `/pages/loadingPage/index?backDelta=1`
          });
        }
      },
      doPay(id, orderNo) {
        this.payment(orderNo).then(resp => {
          // 从订单详情进入
          if (this.orderId) {
            uni.redirectTo({
              url: `/pages/loadingPage/index?backDelta=1`
            });
          } else {
            // 从服务详情进入
            this.msgType = 'success';
            this.messageText = `已成功支付`;
            this.$refs.message.open();
            uni.redirectTo({
              url: `/packageC/pages/order/detail?orderId=${id}`
            })
          }
        }).catch((e) => {
          if (e === 'err') {
            // 非标准件重新刷新价格
            if (this.orderId && this.order && !this.order.isStandard) {
              this.getServiceOrderItemFunc()
            }
          } else {
            this.messageText = `支付已取消`;
            this.msgType = 'error';
            this.$refs.message.open();
            // 从服务详情进入
            if (!this.orderId) {
              uni.redirectTo({
                url: `/packageC/pages/order/detail?orderId=${id}`
              })
            }
          }
        })
      },
      delOrder() {
        this.$refs.alertDialog.open()
      },
      dialogConfirm() {
        deleteServiceOrder(this.order.id).then(() => {
          this.msgType = 'success';
          this.$refs.message.open();
          this.messageText = `已成功删除订单`;
          wx.navigateBack({
            delta: 1,
          })
        })
      },
      getTime() {
        if (this.orderId) {
          this.intervalTimeId = setInterval(() => {
            if (this.order && this.order.createdAt) {
              const {
                hour,
                minute,
                second
              } = getTimeRemaining(this.order.createdAt)

              // 非支付界面
              if (!this.needPayment()) {
                clearInterval(this.intervalTimeId)
              } else {
                if ((second === 0 && minute === 0 && hour === 0)) {
                  clearInterval(this.intervalTimeId)
                  postServiceOrder(this.orderId, {
                    action: 'cancel'
                  }).then(() => {
                    this.msgType = 'success';
                    this.$refs.message.open();
                    this.messageText = `订单超时，已取消`;
                    uni.redirectTo({
                      url: `/packageC/pages/order/detail?orderId=${this.orderId}`
                    })
                  })
                }
              }
              this.timer = `${hour}小时${minute}分钟${second}秒`
            }
          }, 1000);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .bottom {
    height: 100rpx;
    width: 92%;
    padding: 20rpx 4%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background-color: #ffffff;
  }

  .common-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .button {
    width: 180rpx;
    height: 60rpx;
    border-radius: 30rpx;
    background-color: $system-color;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: bold;
    color: #ffffff;
  }

  .money {
    color: #FF7A39;
    font-weight: bold;
    font-size: 40rpx;
  }

  .count {
    font-size: 28rpx;
    color: #666666;
    margin-left: 10rpx;
  }

  .name-mobile {
    color: $system-color;
    font-weight: bold;
    font-size: 28rpx;
    padding: 10rpx 0 20rpx 0;
    border-bottom: 1px solid #EEEEEE;
  }

  .order-info {
    font-size: 28rpx;
    padding: 0 0 20rpx 0;
    border-bottom: 1px solid #EEEEEE;
  }

  .order-no {
    color: #999999;
  }

  .copy-button {
    font-size: 22rpx;
    border: 1px solid #999999;
    padding: 0 10rpx;
    border-radius: 20rpx;
    margin-left: 10rpx;
    display: flex;
    align-items: center;
  }

  .manager {
    display: flex;
    align-items: flex-end;
    color: $system-color;
    font-weight: bold;
    font-size: 28rpx;

    .mobile {
      border-bottom: 1px solid $system-color;
    }
  }

  .manger-img {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    margin-right: 10rpx;
  }

  .un-standard-order-hint {
    position: fixed;
    width: calc(100% - 44px);
    padding: 0 22px;

    .hint {
      background-color: #FEF0F0;
      border: 1px solid #F56C6C;
      padding: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10rpx;

      .icon {
        margin-right: 20rpx;
      }

      .text {
        color: #F56C6C;
        font-size: $normal-font-size;
      }
    }
  }

  .wait-conainer {
    background-color: #ffffff;
    padding: 20rpx 40rpx;
    margin-bottom: 20rpx;

    .title {
      font-size: 34rpx;
    }

    .time {
      color: #FF7A39;
      font-size: 28rpx;
    }
  }
</style>
