<template>
  <view class="order-container">
    <view class="search-bar-container">
      <view class="search-bt">工单列表</view>
      <uni-search-bar class="search-input" v-model="listQuery.search" ref="searchBar" placeholder="搜索内容" border="none"
        @input="search" @clear="clear" @focus="gotoSearch()" cancelButton="none" rightSearchButton="none"
        bg-color="#dedede">
      </uni-search-bar>
    </view>

    <view>
      <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
        @emptyclick="emptyClick">
        <view>
          <view v-for="(l, index) in 10" :key="index" class="business-content-top-20">
            <ht-order-card ref="order" :item="l" @click-item="clickItem" @click-qr-code="onClickQrCode" />
          </view>
        </view>
      </mescroll-body>
    </view>

    <ht-order-qr-code :show.sync="dialogVisible" />
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';
  import MescrollBody from 'mescroll-uni/mescroll-body'
  import {
    getTestList
  } from '@/apis/test.js'

  export default {
    components: {
      MescrollBody
    },
    mixins: [ListMixin],
    data() {
      return {
        searchHeight: 36,
        dialogVisible: false
      }
    },
    computed: {
      mescrollHeight() {
        const {
          screenHeight
        } = uni.getSystemInfoSync()
        return `${screenHeight - this.searchHeight}px`
      }
    },
    onLoad(params) {},
    onShow() {},
    methods: {
      gotoSearch() {
        uni.navigateTo({
          url: `/packageB/pages/staff/order/search`
        });
      },
      getList(page) {
        this.beforeGetList(page);
        getTestList(this.listQuery)
          .then(res => {
            this.afterGetList(res, page);
          })
          .catch(() => this.errorList());
      },
      onClickQrCode(row) {
        this.dialogVisible = true
      },
      onClickItem(row) {
        uni.navigateTo({
          url: `/packageB/pages/staff/order/detail?id=1`
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .order-container {
    padding: 0 20rpx;
  }

  .search-bar-container {
    text-align: center;
    display: flex;
    justify-content: space-between;

    .search-input {
      width: 260rpx !important;
    }

    .search-bt {
      margin: 20rpx 0 0 10rpx;
      font-size: 30rpx;
    }
  }
</style>