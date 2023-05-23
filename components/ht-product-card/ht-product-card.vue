<template>
  <view class="product-card-container">
    <view @click="$emit('clickEvent', product)">
      <template>
        <view class="title-view">
          <text class="title">{{ product.name || '存款产品' }}</text>
          <view class="type">
            <template v-if="productType === 'LOAN'">
              {{ product.loanCate.value }}
            </template>
            <template v-if="productType === 'FINANCIAL'">
              {{ product.riskLevel.value }}
            </template>
            <template v-if="productType === 'DEPOSIT'">存款</template>
          </view>
        </view>
        <view class="product-view">
          <view class="product" v-if="product">
            <view class="left">
              <view class="money">
                <template v-if="productType === 'LOAN'">
                  {{ getProductQuotaContent(product.quotaMin, product.quotaMax) || '' }}
                </template>
                <template v-else>
                  {{ getProductQuotaContent(product.amountMin) || '' }}
                </template>
              </view>
              <view class="label">{{ amountName(productType) }}</view>
            </view>
            <view class="right">
              <view>
                <view class="value">{{ getReferenceRateContent(product.interestRateMin, product.interestRateMax) }}
                </view>
                <view class="label">{{ rateName(productType) }}</view>
              </view>
              <view class="icon" v-if="isList">
                <uni-icons type="right" color="#D2D2D2"></uni-icons>
              </view>
            </view>
          </view>
          <view style="display: flex;align-items: center;justify-content: space-between;">
            <view v-if="isStaff() || isAdmin() || productType !== 'LOAN'">
              <view style="height: 50rpx;display: flex;align-items: center;margin-top: 20rpx;">
                <template>
                  <image style="width: 40rpx;height: 40rpx;margin-right: 10rpx;"
                    :src="product.fiComposite.fiLiteLogoUrl" />
                  <text>{{ product.fiComposite.fiName }}</text>
                </template>
              </view>
            </view>
            <view v-if="guaranteeTypes && !showAllTags" class="guaranteeTag">
              <view v-for="i in guaranteeTypes" :key="i.name" class="item">
                {{ i.value }}
              </view>
<!--              <view class="more" v-if="guaranteeTypes.length === 2" @click="clickMoreBt()">-->
<!--                更多 >-->
<!--              </view>-->
            </view>
          </view>

          <view v-if="showAllTags && product && product.guaranteeTypes" class="guaranteeTag right">
            <view v-for="i in product.guaranteeTypes" :key="i.name" class="item">
              {{ i.value }}
            </view>
            <view class="more" @click="clickMoreBt()">
              收起 >
            </view>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
  import {
    getProductQuotaContent,
    getReferenceRateContent,
    getArrayToString,
    getProductTermContent,
    amountName,
    rateName
  } from '@/common/filter.js'
  import {
    isStaff,
    isAdmin
  } from '@/common/roles.js'
  import {
    deepClone
  } from '@/common/utils.js';

  export default {
    props: {
      product: {
        type: Object,
        default: undefined
      },
      isList: {
        type: Boolean,
        default: false
      },
      showApplyButton: {
        type: Boolean,
        default: false
      },
      productType: {
        type: String,
        default: 'LOAN'
      }
    },
    data() {
      return {
        showAllTags: false
      };
    },
    computed: {
      guaranteeTypes() {
        let types = []
        if (this.product && this.product.guaranteeTypes) {
          const length = this.product.guaranteeTypes.length
          types = this.product.guaranteeTypes.slice(0, length)
          if (types && types.length > 2 && this.isStaff()) {
            types = this.product.guaranteeTypes.slice(0, 2)
          }
        }
        return types
      }
    },
    created() {},
    methods: {
      isStaff,
      isAdmin,
      getProductQuotaContent,
      getReferenceRateContent,
      getArrayToString,
      getProductTermContent,
      amountName,
      rateName,
      applyProduct() {
        this.$refs.productApply.$refs.alertDialog.open()
      },
      clickMoreBt() {
        if (!this.isList) {
          this.showAllTags = !this.showAllTags;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .right {
    justify-content: flex-end;
  }
</style>
