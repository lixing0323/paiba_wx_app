<template>
  <view>
    <view v-for="(d, index) in list" :key="index" class="business-content-bottom-20">
      <ht-req-card :d="d" :isList="true" @viewDetail="viewDetail" />
    </view>
    <uni-load-more color="#007AFF" :status="status" />

    <ht-fab v-if="isCustomer()" @click="createReq" />
  </view>
</template>

<script>
  import {
    getProductQuotaContent,
    getReferenceRateContent
  } from '@/common/filter.js';
  import {
    isCustomer
  } from '@/common/roles.js';

  // 办卡卡片组件
  export default {
    props: {
      query: {
        type: Object,
        default: undefined
      }
    },
    data() {
      return {
        searchParams: {},
        list: []
      };
    },
    created() {},
    methods: {
      getProductQuotaContent,
      getReferenceRateContent,
      isCustomer,
      createReq() {
        uni.navigateTo({
          url: `/packageB/pages/customer/requirement/create`
        });
      },
      viewDetail(d) {
        const query = this.query ? `&type=${this.query.name}` : '';
        uni.navigateTo({
          url: `/packageA/pages/common/requirement/detail?id=${d.id}${query}`
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .title {
    font-weight: bold;
    letter-spacing: 3rpx;

    .name {
      color: $system-color;
    }

    .mobile {
      color: black;
    }
  }

  .content {
    letter-spacing: 3rpx;

    text {
      font-weight: bold;
      color: black;
    }
  }
</style>
