<template>
  <view class="product-card-container apply-req-card" @click="viewDetail(d)">
    <view class="title-view">
      <view class="first-floor-left">
        <image :src="require('@/static/icon/document.png')" class="icon"></image>
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
        :class="{'un-processed': !d.handleResult || d.handleResult.value === '不予办理', 'processed-success': d.handleResult.value === '办理成功'}">
        {{ d.handleResult ? d.handleResult.value : '待处理' }}
      </view>
    </view>
    <view class="label-tag">
      <view class="label item">产品类型</view>
      <view class="value item">贷款产品</view>
    </view>
    <view class="product-view">
      <view class="product">
        <view class="left">
          <view class="money">
            {{ getProductQuotaContent(d.loanProduct.quotaMin, d.loanProduct.quotaMax)}}
          </view>
          <view class="label">贷款额度</view>
        </view>
        <view class="right">
          <view>
            <view class="value bold">
              {{ getReferenceRateContent(d.loanProduct.interestRateMin, d.loanProduct.interestRateMax) }}
            </view>
            <view class="label">期望利率</view>
          </view>
          <view v-if="isList" class="icon">
            <uni-icons type="right" color="#D2D2D2"></uni-icons>
          </view>
        </view>
      </view>
    </view>
    <view class="time">
      <view>提交时间：{{ d.createdAt }}</view>
      <view v-if="d.handleResult">处理时间：{{ d.handleAt }}</view>
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
        this.$emit('viewDetail', d)
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>
