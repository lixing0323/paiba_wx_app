<template>
  <view class="invite-container">
    <view class="search-bar-container">
      <view class="tab">
        <uni-segmented-control :current="currentTab" :values="tabs" style-type="text" @clickItem="changeTab" />
      </view>
      <view class="search-icon" @click="gotoSearch()">
        <uni-icons class="image" type="search" size="22" color="#333"></uni-icons>
      </view>
    </view>

    <view>
      <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
        @emptyclick="emptyClick">
        <view>
          <view v-for="(l, index) in list" :key="index" class="margin-top-20">
            <ht-invite-card :item="l" :type="ORDER_TYPE_INVITE_ME" @click-item="clickItem" />
          </view>
        </view>
      </mescroll-body>
    </view>
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';
  import MescrollBody from 'mescroll-uni/mescroll-body.vue'
  import {
    ORDER_TYPE_INVITE_ME
  } from '@/common/enum-vars.js'
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
        ORDER_TYPE_INVITE_ME,
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
          url: `/packageB/pages/invite/detail?id=1&type=${ORDER_TYPE_INVITE_ME}`
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

    .search-icon {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      background-color: #dedede;
      display: flex;
      justify-content: center;
      justify-items: center;
    }

    .image {
      margin-top: 6rpx;
    }

    .tab {
      width: calc(100% - 300rpx);
    }
  }
</style>