<template>
  <view>
    <view class="business-content-padding-top-20">
      <ht-loan-product-detail ref="detail" :showSubmitButton="true" need-padding-bottom />
    </view>
  </view>
</template>

<script>
  import {
    getLoanProductWithId
  } from '@/apis/product.js'
  import {
    getContentPaddingTop
  } from '@/common/filter.js'
  export default {
    components: {},
    data() {
      return {
        id: undefined
      }
    },
    onLoad(params) {
      this.id = params.id;
      this.getItem()
    },
    methods: {
      getContentPaddingTop,
      getItem() {
        if (this.id) {
          uni.showLoading();
          getLoanProductWithId(this.id)
            .then(res => {
              uni.hideLoading();
              this.$refs.detail.product = res
            })
            .catch(() => uni.hideLoading());
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '@/common/business.scss';
</style>
