<template>
  <view class="invite-container">
    <view class="search-bar-container">
      <view class="tab">
        <uni-segmented-control :current="currentTab" :values="tabs" style-type="text" @clickItem="changeTab" />
      </view>
      <uni-search-bar class="search-input" v-model="listQuery.search" ref="searchBar" placeholder=" " border="none"
        @input="search" @clear="clear" @focus="gotoSearch()" cancelButton="none" rightSearchButton="none"
        bg-color="#dedede">
      </uni-search-bar>
    </view>

    <view>
      <mescroll-uni ref="mescrollRef" :height="mescrollHeight" @init="mescrollInit" @down="downCallback" :up="upOption"
        @up="getList" @emptyclick="emptyClick">
        <view>
          <view v-for="(l, index) in list" :key="index" class="business-content-top-20">
            <ht-invite-card :item="l" @click-item="clickItem" />
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
    getTestList
  } from '@/apis/test.js'

  export default {
    components: {
      MescrollUni
    },
    mixins: [ListMixin],
    data() {
      return {
        searchHeight: 36,
        currentTab: 0,
        tabs: ['全部', '已完结', '进行中']
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
      clickItem(row) {
        uni.navigateTo({
          url: `/packageB/pages/invite/detail?id=1`
        })
      },
      changeTab(e) {
        this.currentTab = e.currentIndex
        this.search()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .invite-container {
    padding: 0 20rpx;
  }

  .search-bar-container {
    text-align: center;
    display: flex;
    justify-content: space-between;

    .search-input {
      width: 100rpx !important;
    }

    .tab {
      width: calc(100% - 300rpx);
    }
  }
</style>