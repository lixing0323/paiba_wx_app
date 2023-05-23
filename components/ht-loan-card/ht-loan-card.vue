<template>
  <view class="product-card-container apply-req-card" @click="viewDetail(d)">
    <view class="title-view">
      <view class="first-floor-left">
        <image :src="require('@/static/icon/document.png')" class="icon"></image>
        <view class="title">
          <text class="name">{{ d.bankName }}</text>
        </view>
      </view>
      <view class="status" :class="{'un-processed': isRedTag(), 'processed-success': d.status.name === 'NOT_OVERDUE'}">
        {{d.status.value }}
      </view>
    </view>
    <view class="product-view">
      <view class="product">
        <view class="left">
          <view class="money">{{ moneyFilter(d.loanAmount) }}</view>
          <view class="label">发放金额</view>
        </view>
        <view class="right">
          <view>
            <view class="money">{{ moneyFilter(d.creditBalance) }}</view>
            <view class="label">授信余额</view>
          </view>
          <view class="icon">
            <uni-icons type="right" color="#D2D2D2"></uni-icons>
          </view>
        </view>
      </view>
    </view>
    <view class="time">
      <view>到期日期：{{ d.isLongTerm ? '长期': d.dueDate }}</view>
      <view style="margin-left: 30rpx;" :class="{'danger-color': isPaymentDay(d)}">
        <text class="label">还款日：</text>
        <text :class="{'value': true}">每月{{ d.repaymentDay }}日</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import {
    moneyFilter
  } from '@/common/filter.js'

  // 办卡卡片组件
  export default {
    components: {},
    props: {
      d: {
        type: Object,
        default: undefined
      },
      customerId: {
        type: [Number, String],
        default: undefined
      },
      isOwnLoan: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    methods: {
      moneyFilter,
      isDue(d) {
        return d.status.name === 'DUE'
      },
      isPaymentDay(d) {
        if (this.d && this.d.status && this.d.status.name !== 'OVERDUE') {
          return this.d.isAboutToRepay
        }
      },
      isRedTag() {
        if (this.d && this.d.status) {
          return this.d.status.name === 'ABOUT_OVERDUE' || this.d.status.name === 'OVERDUE'
        }
      },
      viewDetail(d) {
        uni.navigateTo({
          url: `/packageA/pages/common/loan/detail-card?id=${d.id}`
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .danger-color {
    font-weight: bold;
    color: #F56C6C !important;
  }

  .time {
    display: flex;
    justify-content: space-between;
  }
</style>
