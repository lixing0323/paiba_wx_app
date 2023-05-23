<template>
  <view class="product-card-container apply-req-card" @click="viewDetail(d)">
    <view class="title-view">
      <view class="first-floor-left">
        <image :src="require('@/static/icon/document.png')" class="icon"></image>
        <view class="title">
          <text class="name">{{ d.fullName || '-'}}</text>
          <text class="mobile">{{ d.starMaskMobile || '-' }}</text>
        </view>
      </view>
    </view>
    <view class="label-tag">
      <view class="label item">关联公司</view>
      <view class="value item">{{ `${d.companyCount}家` }}</view>
    </view>
    <view class="product-view">
      <view class="product">
        <view class="left" :class="{'danger-color': d.loanAboutOverdueCount !== 0}" style="width: 33%; text-align: center">
          <view class="value">{{ d.loanAboutOverdueCount || 0 }}</view>
          <view>近日到期</view>
        </view>
        <view class="middle" :class="{'danger-color': d.loanOverdueCount !== 0}" style="width: 33%; text-align: center">
          <view class="value">{{ d.loanOverdueCount || 0 }}</view>
          <view>已过期</view>
        </view>
        <view class="right" :class="{'danger-color': d.loanRepaymentCount !== 0}" style="width: 33%; text-align: center">
          <view>
            <view class="value">{{ d.loanRepaymentCount || 0 }}</view>
            <view>近日还款</view>
          </view>
          <view class="icon">
            <uni-icons type="right" color="#D2D2D2"></uni-icons>
          </view>
        </view>
      </view>
    </view>
    <view class="time info">
      <view class="item">身份证号：<text class="content">{{ d.starMaskIdCard || '-' }}</text></view>
      <view class="item">婚姻状况：<text class="content">{{ d.maritalStatus.value || '-' }}</text></view>
      <view class="item">工作单位：<text class="content">{{ d.workUnit || '-' }}</text></view>
    </view>
  </view>
</template>

<script>
  import {
    getProductQuotaContent,
    getReferenceRateContent
  } from '@/common/filter.js'

  // 办卡卡片组件
  export default {
    components: {},
    props: {
      d: {
        type: Object,
        default: undefined
      },
      isHandled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getProductQuotaContent,
      getReferenceRateContent,
      viewDetail(d) {
        this.$emit('viewDetail', d)
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .info {
    font-size: 24rpx;

    .item {
      color: #666666;
      display: block;
      height: 40rpx;
      line-height: 40rpx;
    }

    .content {
      color: #333333;
    }
  }

  .product-view{
    .danger-color {
      color: #F56C6C !important;
      font-weight: bold;
    }

    .money {
      font-weight: bold;
      color: #ff7a39;
      margin-bottom: 5rpx;
      font-size: 30rpx;
    }


    .value {
      text-align: center;
      font-size: 30rpx;
      margin-bottom: 5rpx;
    }

    .left {
      width: 33%;
      text-align: center;
      border-right: 1px solid #F6F6F6;
    }

    .middle {
      width: 33%;
      border-right: 1px solid #F6F6F6;
      text-align: center;
    }

    .right {
      width: 33%;
      display: flex;
      text-align: center;
      justify-content: flex-end;

      .icon {
        height: 60rpx;
        width: 60rpx;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }
</style>
