<template>
  <view>
    <ht-pure-color-tabs :need-margin-top="false" @clickTab="clickTab" :tabs="isStaff() ? staffTabs : customerTabs" :isSecondLevelPage="true">
    </ht-pure-color-tabs>
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
      @emptyclick="emptyClick" top="50px">
      <view v-for="(d, index) in list" :key="index" class="business-content-bottom-20">
        <ht-product-apply-card :d="d" :isList="true" @viewDetail="viewDetail" :showApplyButton="false" />
      </view>
      <uni-load-more color="#007AFF" :status="status" />
    </mescroll-body>
  </view>
</template>

<script>
  import {
    isCustomer,
    isStaff
  } from '@/common/roles.js'
  import {
    getProductApplies
  } from '@/apis/product.js'
  import ListMixin from '@/mixins/listMixin.js';
  import {
    getTabMarginTop
  } from '@/common/filter.js'

  export default {
    mixins: [ListMixin],
    data() {
      return {
        isHandled: true,
        productTypeName: '产品类型',
        customerName: undefined,
        customerTabs: [{
            name: '已处理',
            value: 'true'
          },
          {
            name: '待处理',
            value: 'false'
          },
        ],
        staffTabs: [
          {
            name: '待处理',
            value: 'false'
          },
          {
            name: '已处理',
            value: 'true'
          }
        ],
        reqTypeOptions: [{
            value: '全部'
          },
          {
            value: '贷款',
            name: 'LOAN'
          },
          {
            value: '存款',
            name: 'LOAN'
          },
          {
            value: '理财',
            name: 'FINANCIAL'
          }
        ]
      }
    },
    onShow() {
      this.resetList()
      this.isHandled = !this.isStaff()
    },
    methods: {
      isStaff,
      getTabMarginTop,
      clickTab(val) {
        this.isHandled = val.value
        this.initList()
        this.init()
      },
      getList(page) {
        this.beforeGetList(page);
        this.listQuery.handled = this.isHandled
        this.listQuery.role = this.isStaff() ? 'ACCOUNT_MANAGER' : undefined
        getProductApplies(this.listQuery)
          .then(res => {
            this.afterGetList(res, page);
            this.$refs.applyList.list = this.list
          })
          .catch(() => this.errorList());
      },
      init() {
        this.productTypeName = `产品类型`
        this.customerName = null
        // this.listQuery.productTypeName = undefined
        // this.listQuery.requirementType = undefined
        // this.$refs.applyList.list = []
      },
      cancel() {
        this.$refs.searchBar.cancel()
      },
      pickEvent(e) {
        const index = e.detail.value
        this.productTypeName = `${this.reqTypeOptions[index].value}产品`
        this.productType = this.reqTypeOptions[index].name
        this.search()
      },
      clear() {
        this.$refs.applyList.searchParams = {}
        this.mescroll.resetUpScroll()
      },
      search() {
        this.listQuery.productType = this.productType
        // this.listQuery.customerName = this.customerName
        this.mescroll.resetUpScroll()
      },
      viewDetail(d) {
        console.log(d)
        uni.navigateTo({
          url: `/packageA/pages/common/apply-record/detail?id=${d.id}`
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/common/business.scss';

  .search-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search-bar {
      width: calc(100% - 80px);
    }

    .view-value {
      font-size: 28rpx;
    }
  }

  .tab-box {
    // width: 94%;
    margin: 0 auto;
    height: 80rpx;
    font-size: $normal-font-size;
  }

  .tab-item {
    display: inline-block;
    width: 50%;
    text-align: center;
    line-height: 60rpx;
    color: #333333;
    background-color: #ffffff;
    border-radius: 8rpx;
    letter-spacing: 5rpx;
  }

  .active {
    color: $system-color;
    background-color: #EADEC1;
    font-weight: bold;
    border-radius: 8rpx;
    letter-spacing: 5rpx;
  }
</style>
