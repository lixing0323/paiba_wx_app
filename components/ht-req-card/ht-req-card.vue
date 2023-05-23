<template>
  <view class="product-card-container" @click="viewDetail(d)">
    <view class="title-view">
      <view class="first-floor-left">
        <image src="@/static/icon/customer-small.png" class="icon" mode="widthFix" />
        <view class="title" v-if="d.starMaskCustomer">
          <text class="name">{{ d.starMaskCustomer.fullName }}</text>
          <text class="mobile">{{ d.starMaskCustomer.mobile }}</text>
        </view>
        <view class="title" v-else>
          <text class="name">{{ d.customer.fullName }}</text>
          <text class="mobile">{{ d.customer.mobile }}</text>
        </view>
      </view>
      <view class="status"
        :class="{'un-processed': d.status.name === 'UN_PROCESSED', 'processed': d.status.name === 'PROCESSED'}">
        {{ d.status.value }}
      </view>
    </view>
    <view class="second-floor-left">
      <view class="label-tag">
        <view class="label item">需求类型</view>
        <view class="value item">{{ d.requirementType.value }}</view>
      </view>
      <view v-if="getRequirementTypeName() === 'OTHER' && isList" class="icon" @click="viewDetail(d)">
        <uni-icons type="right" color="#D2D2D2"></uni-icons>
      </view>
    </view>
    <view class="product-view" v-if="getRequirementTypeName() !== 'OTHER'">
      <view class="product">
        <view class="left">
          <view class="money">
            {{ getProductQuotaContent(d.quotaMin, d.quotaMax)}}
          </view>
          <view class="label">{{ reqQuotaName[getRequirementTypeName()] }}</view>
        </view>
        <view class="right">
          <view>
            <view class="value bold">{{ getReferenceRateContent(d.interestRateMin, d.interestRateMax) }}</view>
            <view class="label">{{ rateName[getRequirementTypeName()] }}</view>
          </view>
          <view v-if="isList" class="icon" @click="viewDetail(d)">
            <uni-icons type="right" color="#D2D2D2"></uni-icons>
          </view>
        </view>
      </view>
    </view>
    <view class="time">
      <view class="item" v-if="d.status && d.status.name === 'UN_PROCESSED'"><text
          class="label">提交时间：</text>{{ d.createdAt }}</view>
      <view class="item" v-if="d.status && d.status.name === 'PROCESSED'"><text
          class="label">处理时间：</text>{{ d.handleAt }}</view>
      <view class="item" v-if="d.forwardAt"><text class="label">转发时间：</text>{{ d.forwardAt }}</view>
    </view>
  </view>
</template>

<script>
  import {
    getProductQuotaContent,
    getReferenceRateContent
  } from '@/common/filter.js'
  import {
    rateName,
    reqQuotaName
  } from '@/packageA/pages/common/product.js'

  // 办卡卡片组件
  export default {
    components: {},
    props: {
      d: {
        type: Object,
        default: undefined
      },
      isList: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        rateName,
        reqQuotaName
      }
    },
    created() {},
    methods: {
      getProductQuotaContent,
      getReferenceRateContent,
      getRequirementTypeName() {
        return this.d && this.d.requirementType && this.d.requirementType.name
      },
      viewDetail(d) {
        if (this.isList) {
          this.$emit('viewDetail', d)
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .title {
    //font-weight: bold;
    //font-size: 26rpx !important;

    .name {
      color: $system-color;
      margin-right: 10rpx;
    }

    .mobile {
      color: #333333;
    }
  }

  .first-floor-left {
    display: flex;
    align-items: center;

    .icon {
      width: 40rpx;
      height: 40rpx;
      margin-right: 10rpx;
    }
  }

  .second-floor-left {
    display: flex;
    align-items: center;

    .label-tag {
      flex: 1;
    }

    .icon {
      height: 60rpx;
      width: 60rpx;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }

  .time {
    margin-top: 20rpx;
    padding-top: 15rpx;
    border-top: 1px solid #F6F6F6;
    font-size: 24rpx;
    color: #333333;

    .item {
      height: 40rpx;
      line-height: 40rpx;
    }

    .label {
      color: #666666;
    }
  }

  .status {
    height: 30rpx;
    line-height: 30rpx;
    min-width: 100rpx;
    text-align: center;
    padding: 6rpx 10rpx;
    border-radius: 5rpx;
    font-size: 22rpx;
  }

  .un-processed {
    color: #F56C6C;
    background-color: #FEF0F0;
  }

  .processed {
    color: #999999;
    background-color: #EEEEEE;
  }

  .bold {
    font-weight: bold;
  }
</style>
