<template>
  <view>
    <ht-pure-color-tabs :need-margin-top="false" @clickTab="clickTab" :tabs="tabs" :isSecondLevelPage="true"></ht-pure-color-tabs>
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
      @emptyclick="emptyClick" top="50px">
      <ht-req-list-card ref="reqList" :isHandled="isHandled" />
      <uni-load-more color="#007AFF" :status="status" />
    </mescroll-body>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import ListMixin from '@/mixins/listMixin.js';
  import {
    getTabMarginTop
  } from '@/common/filter.js'
  import {
    getCustomerReqs
  } from '@/apis/staff/requirement.js'

  export default {
    mixins: [ListMixin],
    data() {
      return {
        isHandled: 'PROCESSED',
        tabs: [{
            name: '已处理',
            value: 'PROCESSED'
          },
          {
            name: '待处理',
            value: 'UN_PROCESSED'
          },
        ],
        marginTop: 0
      }
    },
    onShow() {
      this.resetList()
    },
    methods: {
      getTabMarginTop,
      clickTab(val) {
        this.isHandled = val.value
        this.mescroll.resetUpScroll()
      },
      getList(page) {
        this.beforeGetList(page);
        this.listQuery.status = this.isHandled
        getCustomerReqs(this.listQuery)
          .then(res => {
            this.afterGetList(res, page);
            this.$refs.reqList.list = this.list
          })
          .catch(() => this.errorList());
      }
    }
  }
</script>

<style scoped lang="scss">
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
