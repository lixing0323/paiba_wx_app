<template>
  <view>
    <view class="business-content-padding-top-20">
      <ht-product-card :product="product" :productType="product.financialType.name" />
      <view class="business-content-top-20 tui-form-container">
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
        <tui-form-item padding="26rpx 0" :left="0">
          <template v-slot:label>
            <view class="title">
              <span class="block">{{ block }}</span>
              <span class="text">办理银行：</span>
              <span class="content">{{ product.fiComposite.fiName || '-' }}</span>
            </view>
          </template>
        </tui-form-item>
        <view v-for="(i, index) in product.contacts" :key="index">
          <tui-form-item padding="26rpx 0" :left="0">
            <template v-slot:label>
              <view class="title">
                <span class="block">{{ block }}</span>
                <span class="text">{{ `联系人${index + 1}：` }}：</span>
                <span class="content">{{ i.contactName || '-' }}</span>
              </view>
            </template>
          </tui-form-item>
          <tui-form-item padding="26rpx 0" :left="0" :bottom-border="!(product.contacts && product.contacts.length - 1 === index)">
            <template v-slot:label>
              <view class="title">
                <span class="block">{{ block }}</span>
                <span class="text">{{ `联系电话：` }}：</span>
                <span class="content">{{ i.contactPhone || '-' }}</span>
              </view>
            </template>
          </tui-form-item>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getFinancialProductWithId } from '@/apis/product.js';
import { changeToWan, getContentPaddingTop } from '@/common/filter.js';
import { isCustomer } from '@/common/roles.js';
export default {
  data() {
    return {
      id: undefined,
      block: '●',
      product: {},
      rightTextStyle: {
        fontSize: '30rpx',
        fontWeight: 'bold'
      },
      form: {
        contactName: undefined,
        contactPhone: undefined
      },
      financialType: 'FINANCIAL'
    };
  },
  onLoad(params) {
    this.id = params.id;
    this.getItem();
  },
  created() {},
  methods: {
    getContentPaddingTop,
    isCustomer,
    changeToWan,
    getItem() {
      if (this.id) {
        uni.showLoading();
        getFinancialProductWithId(this.id)
          .then(res => {
            uni.hideLoading();
            this.product = res;
          })
          .catch(() => uni.hideLoading());
      }
    },
    applyProduct() {
      this.$refs.productApply.initForm();
      this.$refs.productApply.$refs.alertDialog.open();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/common/business.scss';

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
</style>
