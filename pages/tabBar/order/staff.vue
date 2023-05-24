<template>
  <view class="order-container">
    <view class="search-bar-container">
      <view class="search-bt" @click="gotoSearch()">工单列表</view>
      <uni-search-bar class="search-input" v-model="listQuery.search" ref="searchBar" placeholder="搜索内容" border="none"
        @input="search" @clear="clear" @focus="gotoSearch()" cancelButton="none" rightSearchButton="none"
        bg-color="#dedede">
      </uni-search-bar>
    </view>

    <view>
      <mescroll-uni ref="mescrollRef" :height="mescrollHeight" @init="mescrollInit" @down="downCallback" :up="upOption"
        @up="getList" @emptyclick="emptyClick">
        <view>
          <view v-for="(l, index) in 10" :key="index" class="business-content-top-20">
            <ht-order-card ref="order" :item="l" @click-item="clickItem" />
          </view>
        </view>
      </mescroll-uni>
    </view>
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';
  import MescrollUni from 'mescroll-uni/mescroll-uni.vue'

  import {
    getServiceOrdersList
  } from '@/apis/order.js'

  export default {
    components: {
      MescrollUni
    },
    mixins: [ListMixin],
    data() {
      return {
        searchHeight: 36
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
        this.endList()
        // this.beforeGetList(page);
        // getServiceOrdersList(this.listQuery)
        //   .then(res => {
        //     this.afterGetList(res, page);
        //   })
        //   .catch(() => this.errorList());
      },
      clickItem(row) {
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