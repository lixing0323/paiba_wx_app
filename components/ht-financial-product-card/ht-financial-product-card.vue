<template>
  <view class="product-card-container">
    <view @click="$emit('clickEvent', product)">
      <template>
        <view class="title-view">
          <text class="title">{{ product.financialType.name === 'FINANCIAL' ? product.name : '存款产品' }}</text>
          <view class="type">{{ product.financialType.value }}</view>
        </view>
        <view class="product-view">
          <view class="product" v-if="product">
            <view class="left">
              <view class="money">{{ moneyFilter(product.amountMin) || '' }}</view>
              <view class="label">{{ amountName() }}</view>
            </view>
            <view class="right">
              <view class="item">
                <text class="label">{{ rateName() }}：</text>
                <text
                  class="value">{{ getReferenceRateContent(product.interestRateMin, product.interestRateMax) }}</text>
              </view>
              <view class="item">
                <text class="label">{{ termName() }}：</text>
                <text class="value">{{ getProductTermContent(product.termMin, product.termMax) }}</text>
              </view>
              <view class="hidden" v-if="product.financialType && product.financialType.name === 'FINANCIAL'">
                <text class="label">风险等级：</text>
                <text
                  class="value">{{ changeEnumToValue(product, 'riskLevel') }}</text>
              </view>
            </view>
          </view>
          <view class="bank">
            <view style="height: 50rpx;display: flex;align-items: center;">
              <template>
                <image style="width: 50rpx;height: 50rpx;margin-right: 10rpx;"
                  :src="product.fiComposite.fiLiteLogoUrl" />
                  <text>{{ product.fiComposite.fiName }}</text>
              </template>
            </view>
           <view class="apply" v-if="showApplyButton">
              <text>立即查看</text>
            </view>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
  import {
    getProductTermContent,
    getProductQuotaContent,
    getReferenceRateContent,
    changeEnumToValue,
    changeToWan,
    moneyFilter
  } from '@/common/filter.js'
  import {
    isStaff
  } from '@/common/roles.js'

  export default {
    props: {
      product: {
        type: Object,
        default: undefined
      },
      showApplyButton: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {};
    },
    methods: {
      isStaff,
      getProductQuotaContent,
      getReferenceRateContent,
      getProductTermContent,
      changeEnumToValue,
      changeToWan,
      moneyFilter,
      amountName() {
        return this.product.financialType && this.product.financialType.name === 'FINANCIAL' ? '起购金额' : '起存金额'
      },
      rateName() {
        return this.product.financialType && this.product.financialType.name === 'FINANCIAL' ? '业绩比较基准率' : '年利率'
      },
      termName() {
        return this.product.financialType && this.product.financialType.name === 'FINANCIAL' ? '投资期限' : '存款期限'
      }
      // applyProduct() {
      //   this.$refs.productApply.$refs.alertDialog.open()
      // }
    }
  };
</script>

<style lang="scss" scoped>
@import '@/common/business.scss';
</style>
