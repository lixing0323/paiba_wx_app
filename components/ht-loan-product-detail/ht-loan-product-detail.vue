<template>
  <view :class="{'need-padding-bottom': needPaddingBottom && isCustomer() && showSubmitButton}">
    <ht-product-card :product="product" />
    <view class="business-content-top-20 tui-form-container">
      <tui-form-item padding="26rpx 0" :left="0">
        <template v-slot:label>
          <view class="title">
            <span class="block">{{ block }}</span>
            <span class="text">贷款期限：</span>
            <span class="content">{{ getProductTermContent(product.termMin, product.termMax) }}</span>
          </view>
        </template>
      </tui-form-item>
      <tui-form-item padding="26rpx 0" :left="0">
        <template v-slot:label>
          <view class="title">
            <span class="block">{{ block }}</span>
            <span class="text">产品编码：</span>
            <span class="content">{{ product.code }}</span>
          </view>
        </template>
      </tui-form-item>
      <tui-form-item direction="column" padding="26rpx 0" :left="0" content-margin-top="8px">
        <template v-slot:label>
          <view class="title">
            <span class="block">{{ block }}</span>
            <span class="text">产品介绍：</span>
          </view>
        </template>
        <template>
          <view class="content content-column">{{ product.desc || '无' }}</view>
        </template>
      </tui-form-item>
      <tui-form-item direction="column" padding="26rpx 0" :left="0" content-margin-top="8px">
        <template v-slot:label>
          <view class="title">
            <span class="block">{{ block }}</span>
            <span class="text">申请条件：</span>
          </view>
        </template>
        <template>
          <view class="content content-column">{{ product.applyCondition || '无' }}</view>
        </template>
      </tui-form-item>
      <view v-for="(i, index) in product.contacts" :key="index">
        <tui-form-item padding="26rpx 0" :left="0">
          <template v-slot:label>
            <view class="title">
              <span class="block">{{ block }}</span>
              <span class="text">{{ `联系人${index + 1}：` }}</span>
              <span class="content">{{ i.contactName || '-' }}</span>
            </view>
          </template>
        </tui-form-item>
        <tui-form-item padding="26rpx 0" :left="0">
          <template v-slot:label>
            <view class="title">
              <span class="block">{{ block }}</span>
              <span class="text">{{ `联系电话：` }}</span>
              <span class="content">{{ i.contactPhone || '-' }}</span>
            </view>
          </template>
        </tui-form-item>
      </view>
      <tui-form-item padding="26rpx 0" :left="0" :bottom-border="false">
        <template v-slot:label>
          <view class="title">
            <span class="block">{{ block }}</span>
            <span class="text">联系网点：</span>
            <span class="content">{{ product.contactSite || '无' }}</span>
          </view>
        </template>
      </tui-form-item>
    </view>

    <view class="submit-bt-container-fixed" v-if="isCustomer() && showSubmitButton">
      <button type="primary" @click="applyProduct()" class="one-button">立即申请</button>
    </view>
    <ht-product-apply-popup ref="productApply" :product="product" />
  </view>
</template>

<script>
  import {
    changeToWan,
    getProductTermContent
  } from '@/common/filter.js'
  import {
    isCustomer,
    isStaff
  } from '@/common/roles.js'

  export default {
    props: {
      showSubmitButton: {
        type: Boolean,
        default: false
      },
      // 只有申请需要
      needPaddingBottom: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        id: undefined,
        block: '●',
        product: {},
        rightTextStyle: {
          fontSize: '28rpx',
          // fontWeight: 'bold'
        }
      }
    },
    created() {},
    methods: {
      isCustomer,
      isStaff,
      changeToWan,
      getProductTermContent,
      applyProduct() {
        if (this.isCustomer() && this.showSubmitButton) {
          this.$refs.productApply.initForm()
          this.$refs.productApply.$refs.alertDialog.open()
        } else {
          uni.navigateTo({
            url: `/pages/login/index`
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .need-padding-bottom{
    padding-bottom: 200rpx;
  }

  .title {
    font-weight: bold;
    color: black;

    .block {
      color: #FF7A39;
      font-size: 16px;
    }

    .text {
      margin-left: 10rpx;
    }
    .content{
      color: #333;
      font-weight: normal;
    }
  }

  .submit-bt-container{
    position: fixed;
    bottom: 80rpx;
    left: 40rpx;
    right: 40rpx;
    width: calc(100% - 80rpx);
    z-index: 999;
  }

</style>
