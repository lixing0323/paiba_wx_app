<template>
  <view v-if="hasLogin()">
    <view class="container" v-if="isFormalVersion(version)">
      <ht-pure-color-tabs @clickTab="changeNavigatorTab" :tabs="navigatorTabs" @capsuleLocation="getCapsuleLocation">
        <view class="search" @click="onSearch()">
          <tui-icon class="search-icon" name="search" :size="20" color="#333" />
        </view>
      </ht-pure-color-tabs>

      <loan-list v-if="currentTab === 0" :filterTop="filterTop" :filterHeight="filterHeight"
        :mescrollTop="mescrollTop" />
      <financing-list v-else-if="currentTab === 1" :filterTop="filterTop" :filterHeight="filterHeight"
        :mescrollTop="mescrollTop">
      </financing-list>
      <deposit-list v-else :filterTop="filterTop" :mescrollTop="mescrollTop" :filterHeight="filterHeight">
      </deposit-list>
    </view>
    <view v-else>
      <ht-title title="产品" :has-back="false" />
      <image class="template-image" :src="templateImgSrc" mode="widthFix" :style="{'top': getContentPaddingTop()}"></image>
    </view>
  </view>
</template>

<script>
  import LoanList from './components/loan.vue'
  import FinancingList from './components/financing.vue'
  import DepositList from './components/deposit.vue'
  import {
    mapGetters
  } from 'vuex';
  import {
    isFormalVersion
  } from '@/common/roles.js';
  import {
    getVersionControl
  } from '@/apis/user.js';
  import {
    getContentPaddingTop
  } from '@/common/filter.js'

  export default {
    components: {
      LoanList,
      FinancingList,
      DepositList
    },
    data() {
      return {
        component: 'LoanList',
        version: undefined,
        templateImgSrc: 'https://financing-platform-1253330314.cos.ap-shanghai.myqcloud.com/cms/test-homepage.png',
        currentTab: 0,
        filterTop: 0,
        filterHeight: 50,
        navigatorTabs: [{
          name: '贷款'
        }, {
          name: '理财'
        }, {
          name: '存款'
        }]
      };
    },
    computed: {
      ...mapGetters(['token', 'userInfo']),
      mescrollTop() {
        if (this.filterTop) {
          return `${this.filterTop + this.filterHeight}px`
        }
      }
    },
    onLoad: function(options) {
      if (!this.hasLogin()) {
        uni.redirectTo({
          url: `/packageA/pages/login/index`
        });
      } else {
        this.getVersion()
      }
    },
    created() {},
    methods: {
      isFormalVersion,
      getContentPaddingTop,
      getVersion() {
        getVersionControl().then(resp => {
          this.version = resp
        });
      },
      hasLogin() {
        return this.token && this.userInfo
      },
      getCapsuleLocation(e) {
        this.filterTop = e.top + e.height
      },
      changeNavigatorTab(e) {
        this.currentTab = this.navigatorTabs.findIndex(item => item.name === e.name)
      },
      onSearch() {
        uni.navigateTo({
          url: `/packageC/pages/search/product`
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .search {
    width: 56rpx;
    height: 56rpx;
    background-color: #eee;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 10rpx;

    .search-icon {
      line-height: 56rpx;
      height: 56rpx;
    }
  }
  .template-image {
    width: 100%;
    position: relative;
    margin-top: -10px;
  }
</style>
