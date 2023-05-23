<template>
  <view style="background-color: #ffffff;padding-bottom: 20rpx;">
    <view class="service-card-container" @click="clickItem">
      <view class="left">
        <img :src="item.carouselImages[0]" class="icon" mode="aspectFill">
      </view>
      <view class="right">
        <view class="top right-item" :style="{'align-items': !isDetail ? 'center' : 'flex-start'}">
          <view class="flex-1" :class="{'name': !isDetail}" style="font-weight: bold">{{ item.name }}</view>
          <view class="status"
            :class="{'min-width': isDetail,'finished': status() === 'PAY_SUCCESS', 'terminated': status() === 'CANCELED', 'unfinished': status() === 'CREATED'}">
            {{ order.status && order.status.value ? order.status.value : ''}}
          </view>
        </view>
        <view class="middle right-item">
          <view style="display: flex;">
            <view class="service-type">{{ item.oneCate.value }}</view>
            <view class="service-type" style="margin-left: 10rpx;">{{ item.isStandard ? '标准件' : '非标准件' }}</view>
          </view>
        </view>
        <view class="middle right-item">
          <view class="common-flex common-space-between">
            <view :class="{'money': isConfirmOrder, 'money-black': !isConfirmOrder}">
              <text v-if="item.isStandard">¥</text>
              {{ item.isStandard ? item.price: item.offStandardPrice }}
            </view>
            <view class="records">x1</view>
          </view>
        </view>
      </view>
    </view>
    <template v-if="!isDetail">
      <view v-if="order.status && order.status.name === 'CREATED'" class="need-pay business-content-top-20">
        需付款：
        <text class="money">
          <text v-if="order.amount"> ¥ {{ order.amount }}</text>
          <text v-else>暂无价格</text>
        </text>
      </view>
    </template>
    <view class="common-flex button-box business-content-top-20" style="justify-content: flex-end;"
      v-if="isShowOperation && isCustomer()">
      <template v-if="order && order.status && order.status.name === 'CREATED'">
        <view class="cancel common-button" @click="operationClick('取消', cancelOrder)">取消订单</view>
        <view class="pay common-button" @click="payOrder()">去支付</view>
      </template>
      <view class="cancel common-button" v-if="order && order.status && order.status.name === 'CANCELED'"
        @click="operationClick('删除', deleteOrder)">删除订单</view>
    </view>

    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog type="error" cancelText="取消" confirmText="确定" title="提醒" @confirm="dialogConfirm">
        <view style="text-align: center;font-size: 32rpx;">
          {{ `请确认是否${operationName}该订单` }}
        </view>
      </uni-popup-dialog>
    </uni-popup>
  </view>
  <!--  <view class="box">-->
  <!--    <view @click="clickItem">-->
  <!--      <view class="common-space-between">-->
  <!--        <view class="common-flex">-->
  <!--          <img :src="item.carouselImages[0]" class="product-image" mode="aspectFill">-->
  <!--          <view style="margin-left: 40rpx;width: 60%;">-->
  <!--            <view class="title">{{ item.name }}</view>-->
  <!--            <view style="margin: 8rpx 0 12rpx 0;margin-left: -2rpx;">-->
  <!--              <view class="service-type" style="display: inline-block;">{{ item.oneCate.value }}</view>-->
  <!--              <view class="service-type" style="display: inline-block;margin-left: 20rpx;">-->
  <!--                {{ item.isStandard ? '标准件' : '非标准件' }}-->
  <!--              </view>-->
  <!--            </view>-->
  <!--            <view :class="{'money': isConfirmOrder, 'money-black': !isConfirmOrder}">¥ {{ item.isStandard ? item.price: item.offStandardPrice }}</view>-->
  <!--          </view>-->
  <!--        </view>-->
  <!--        <view-->
  <!--          style="display: flex;flex-wrap: wrap;align-content: space-between;justify-content: flex-end;width: 100rpx;">-->
  <!--          <view style="color: #FF7A39;font-size: 24rpx;width: 100rpx;text-align: right;">-->
  <!--            {{ order ? order.status.value : '' }}-->
  <!--          </view>-->
  <!--          <view style="width: 100rpx;text-align: right;">x 1</view>-->
  <!--        </view>-->
  <!--      </view>-->
  <!--      <view class="common-flex business-content-top-20" style="justify-content: space-between;font-size: 28rpx;"-->
  <!--        v-if="!isConfirmOrder">-->
  <!--        <view class="time">-->
  <!--          创建时间： {{ order.createdAt }}-->
  <!--        </view>-->

  <!--      </view>-->
  <!--    </view>-->
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import {
    moneyFilter
  } from '@/common/filter.js'
  import {
    isCustomer
  } from '@/common/roles.js';

  // 办卡卡片组件
  export default {
    components: {},
    props: {
      isConfirmOrder: {
        type: Boolean,
        default: true
      },
      isDetail: {
        type: Boolean,
        default: false
      },
      item: {
        type: Object,
        default: undefined
      },
      order: {
        type: Object,
        default: undefined
      },
      isShowOperation: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        operationName: undefined
      }
    },
    methods: {
      isCustomer,
      clickItem() {
        this.$emit('click-item', this.order)
      },
      status() {
        return this.order && this.order.status ? this.order.status.name : ''
      },
      cancelOrder() {
        this.$emit('cancel-order', this.order)
      },
      deleteOrder() {
        this.$emit('delete-order', this.order)
      },
      operationClick(type, func) {
        this.operationName = type
        this.$refs.alertDialog.open()
      },
      dialogConfirm() {
        if (this.operationName === '删除') {
          this.deleteOrder()
        } else if (this.operationName === '取消') {
          this.cancelOrder()
        }
      },
      payOrder() {
        this.$emit('pay-order', this.order)
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  // .box {
  //   padding: 20rpx 30rpx;
  //   background-color: #ffffff;
  // }

  // .product-image {
  //   width: 120rpx;
  //   height: 120rpx;
  // }

  .common-space-between {
    display: flex;
    justify-content: space-between;
  }

  .common-flex {
    display: flex;
    align-items: center;
  }

  .flex-1 {
    flex: 1
  }

  .min-width {
    min-width: 120rpx;
    text-align: right;
  }

  .need-pay {
    margin-left: 30rpx;
    width: calc(100% - 60rpx);
    text-align: right;
  }

  // .title {
  //   font-size: 30rpx;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  //   font-weight: bold;
  // }

  .time {
    color: #999999;
  }

  .common-padding {
    padding: 0 30rpx;
  }

  .money {
    font-weight: bold;
    color: #FF7A39;
  }

  // .money-black {
  //   font-weight: normal;
  //   color: black;
  // }

  .button-box {
    padding-right: 30rpx;
    width: calc(100% - 30rpx);
  }

  .common-button {
    border-radius: 15rpx;
    width: 120rpx;
    padding: 6rpx 12rpx;
    text-align: center;
    font-size: 26rpx;
  }

  .cancel {
    border: 1px solid #999999;
    color: #666666;
  }

  .pay {
    border: 1px solid $system-color;
    background-color: $system-color;
    color: #ffffff;
    margin-left: 20rpx;
  }

  .disable-bt {
    cursor: pointer;
  }
</style>
