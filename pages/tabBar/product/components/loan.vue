<template>
  <view>
    <filter-component :top="filterTop" :height="filterHeight" :tabs.sync="tabs" :dropdown="GUARANTEE_TYPES_ENUM_VARS"
      @sort="doSort" @query="doQuery" />

    <mescroll-uni :top="mescrollTop" ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption"
      @up="getList" @emptyclick="emptyClick">
      <view v-for="(d, index) in list" :key="index" style="margin-top: 20rpx;">
        <ht-product-card :product="d" @clickEvent="viewDetail" :isList="true" :showApplyButton="true" />
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
  import FilterComponent from './filter.vue'
  import {
    GUARANTEE_TYPES_ENUM_VARS
  } from '@/common/enum-vars.js';
  import ListMixin from '@/mixins/listMixin.js';
  import {
    getLoanProducts
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
      },
    },
    data() {
      return {
        GUARANTEE_TYPES_ENUM_VARS,
        tabs: [{
          name: '全部',
          descending: undefined,
          key: undefined
        }, {
          name: '产品额度',
          descending: undefined,
          key: 'quota'
        }, {
          name: '参考利率',
          descending: undefined,
          key: 'rate'
        }]
      };
    },
    computed: {},
    created() {},
    methods: {
      getList(page) {
        this.beforeGetList(page);
        getLoanProducts(this.listQuery)
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
        this.listQuery.guaranteeType = value
        this.search()
      },
      viewDetail(d) {
        uni.navigateTo({
          url: `/packageA/pages/common/loan-product/detail?id=${d.id}`
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>
