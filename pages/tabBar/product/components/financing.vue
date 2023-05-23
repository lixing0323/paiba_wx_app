<template>
  <view>
    <filter-component :top="filterTop" :height="filterHeight" :tabs.sync="tabs" :dropdown="LEVEL_RISK_ENUM_VARS"
      @sort="doSort" @query="doQuery" />

    <mescroll-uni :top="mescrollTop" ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption"
      @up="getList" @emptyclick="emptyClick">
      <view v-for="(d, index) in list" :key="index" style="margin-top: 20rpx;">
        <ht-product-card :product="d" :isList="true" @clickEvent="viewDetail" :showApplyButton="true" :productType="financialType" />
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
  import FilterComponent from './filter.vue'
  import {
    LEVEL_RISK_ENUM_VARS
  } from '@/common/enum-vars.js';
  import ListMixin from '@/mixins/listMixin.js';
  import {
    getFinancialProducts
  } from '@/apis/product.js';

  export default {
    components: {
      FilterComponent
    },
    mixins: [ListMixin],
    props: {
      filterTop: {
        type: Number,
        default: 0
      },
      filterHeight: {
        type: Number,
        default: 0
      },
      mescrollTop: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        LEVEL_RISK_ENUM_VARS,
        financialType: 'FINANCIAL',
        tabs: [{
          name: '全部',
          descending: undefined,
          key: undefined
        }, {
          name: '起购金额',
          descending: undefined,
          key: 'amountMin'
        }, {
          name: '参考利率',
          descending: undefined,
          key: 'interestRateMin'
        }]
      };
    },
    created() {},
    methods: {
      getList(page) {
        this.beforeGetList(page);
        this.listQuery.financialType = 'FINANCIAL'
        getFinancialProducts(this.listQuery)
          .then(res => {
            this.afterGetList(res, page);
          })
          .catch(() => this.errorList());
      },
      doSort(value) {
        this.listQuery.sort = value
        this.search()
      },
      doQuery(value) {
        this.listQuery.riskLevel = value
        this.search()
      },
      viewDetail(d) {
        uni.navigateTo({
          url: `/packageA/pages/common/financial-product/detail?id=${d.id}`
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>
