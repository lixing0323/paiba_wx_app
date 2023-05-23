<template>
  <view>
    <view class="search-bar-container">
      <uni-search-bar v-model="listQuery.customerName" ref="searchBar" placeholder="搜索客户名称" border="none"
        @input="search" @clear="clear" cancelButton="none" rightSearchButton="none" bg-color="#F5F5F5">
      </uni-search-bar>
    </view>

    <view class="tab-container" :style="{top: searchHeight+'px'}">
      <ht-pure-color-tabs :need-margin-top="false" :need-margin-right="false" :tabs="tabs" @clickTab="changeTab"
        @capsuleLocation="getTabHeight">
        <picker class="filter" :range="reqTypeOptions" range-key="name" @change="changeFilter">
          <view class="filter-name">{{ filterName }}
            <image :src="filterImg" class="filter-icon"></image>
          </view>
        </picker>
      </ht-pure-color-tabs>
    </view>

    <mescroll-body :top="`${searchHeight+tabHeight+20}px`" ref="mescrollRef" @init="mescrollInit" @down="downCallback"
      :up="upOption" @up="getList" @emptyclick="emptyClick">
      <ht-req-list-card ref="reqList" :query="query" />
    </mescroll-body>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import {
    getCustomerReqs
  } from '@/apis/staff/requirement.js'
  import ListMixin from '@/mixins/listMixin.js';

  export default {
    mixins: [ListMixin],
    data() {
      return {
        filterImg: require(`@/static/icon/filter_unSelected.png`),
        currentTab: 0,
        tabHeight: 0,
        searchHeight: 56,
        filterName: '全部',
        reqTypeOptions: [{
            name: '全部'
          },
          {
            name: '贷款',
            value: 'LOAN'
          },
          {
            name: '理财',
            value: 'FINANCIAL'
          },
          {
            name: '其他',
            value: 'OTHER'
          },
        ],
        tabs: [{
          name: '待处理',
          query: 'status',
          value: 'UN_PROCESSED'
        }, {
          name: '已处理',
          query: 'status',
          value: 'PROCESSED'
        }, {
          name: '已转发',
          query: 'isForward',
          value: true
        }],
        query: undefined,
        listQuery: {
          customerName: '',
          requirementType: undefined,
          status: undefined,
          isForward: undefined
        }
      }
    },
    computed: {},
    onLoad() {
      this.query = this.tabs[0]
      this.init()
      this.resetList()
    },
    onShow() {},
    methods: {
      changeTab(e) {
        this.currentTab = this.tabs.findIndex(item => item.name === e.name)
        this.query = this.tabs[this.currentTab]
        this.initList()
      },
      getTabHeight(e) {
        this.tabHeight = e.height
      },
      changeFilter(e) {
        const index = e.detail.value
        this.filterName = `${this.reqTypeOptions[index].name}需求`
        this.listQuery.requirementType = this.reqTypeOptions[index].value
        this.search()
      },
      getList(page) {
        this.beforeGetList(page);
        this.listQuery[this.query.query] = this.query ? this.query.value : undefined
        this.listQuery.role = 'ACCOUNT_MANAGER'
        getCustomerReqs(this.listQuery)
          .then(res => {
            this.afterGetList(res, page);
            this.$refs.reqList.list = this.list
          })
          .catch(() => this.errorList());
      },
      init() {
        this.$refs.reqList.list = []
      },
      cancel() {
        this.$refs.searchBar.cancel()
      },
      clear() {
        this.$refs.reqList.searchParams = {}
        this.mescroll.resetUpScroll()
      },
      search() {
        this.filterSearch()
        this.mescroll.resetUpScroll()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@/common/business.scss';

  .search-bar-container {
    position: fixed;
    padding: 10px 30rpx;
    top: 0;
    z-index: 999;
    width: calc(100% - 60rpx);
    background-color: #ffffff;
  }

  .tab-container {
    position: fixed;
    z-index: 999;

    .filter {
      float: right;
      color: $system-color;
      margin-right: 20rpx;
    }

    .filter-icon {
      width: 28rpx;
      height: 28rpx;
      vertical-align: middle;
      margin-left: 10rpx;
      margin-bottom: 6rpx;
    }
  }
</style>
