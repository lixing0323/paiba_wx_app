<template>
  <view>
    <view v-if="showStatistics && statisticLoan" class="statistics-container"
      :style="{height: `${statisticsHeight}px`}">
      <view class="left">
        <view class="number">{{ statisticLoan.totalLoanCount }}</view>
        <view class="value"> 贷款笔数 </view>
      </view>

      <view class="right">
        <view class="number">
          {{ moneyFilter(statisticLoan.totalLoanAmount) }}
        </view>
        <view class="value"> 贷款总金额 </view>
      </view>
    </view>

    <view class="tab-container" :style="{top: `${statisticsHeight}px`}">
      <ht-pure-color-tabs :need-margin-top="false" :need-margin-right="false" :tabs="tabs" @clickTab="changeTab"
        @capsuleLocation="getTabHeight">
        <picker class="filter" :range="statusOptions" range-key="name" @change="changeFilter">
          <view class="filter-name">{{ filterName }}
            <image :src="filterImg" class="filter-icon"></image>
          </view>
        </picker>
      </ht-pure-color-tabs>
    </view>

    <view :style="{paddingTop: `${tabHeight+statisticsHeight}px`}">
      <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
        @emptyclick="emptyClick" top="20rpx">
        <ht-card v-for="(d, index) in list" :key="index" marginTop="20rpx">
          <ht-loan-card :isOwnLoan="isOwnLoan" :customerId="customerId" :d="d" :isList="true"
            :showApplyButton="false" />
        </ht-card>
      </mescroll-body>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import ListMixin from '@/mixins/listMixin.js';
  import {
    getLoans
  } from '@/apis/my-loan.js'
  import {
    getLoanStatistic
  } from '@/apis/my-loan.js';
  import {
    moneyFilter
  } from '@/common/filter'

  export default {
    mixins: [ListMixin],
    props: {
      showStatistics: {
        type: Boolean,
        default: true
      },
      customerId: {
        type: [Number, String],
        default: undefined
      }
    },
    data() {
      return {
        listQuery: {
          overdue: undefined
        },
        filterImg: require(`@/static/icon/filter_unSelected.png`),
        currentTab: 0,
        selectedFilterIndex: 0,
        tabHeight: 0,
        filterName: '全部',
        tabs: [{
          name: '个人贷款'
        }, {
          name: '公司贷款'
        }],
        statusOptions: [{
            name: '全部',
            value: undefined
          },
          {
            name: '近日到期',
            value: 'ABOUT_OVERDUE'
          },
          {
            name: '已过期',
            value: 'OVERDUE'
          },
          {
            name: '未到期',
            value: 'NOT_OVERDUE'
          }
        ],
        statisticLoan: undefined
      }
    },
    computed: {
      ...mapGetters(['token', 'userInfo']),
      statisticsHeight() {
        return this.showStatistics ? 110 : 0
      }
    },
    created() {
      this.loanStatistic()
    },
    methods: {
      moneyFilter,
      changeTab(e) {
        this.currentTab = this.tabs.findIndex(item => item.name === e.name)
        this.initList()
      },
      getTabHeight(e) {
        this.tabHeight = e.height
      },
      changeFilter(e) {
        const index = e.detail.value
        this.selectedFilterIndex = index
        this.filterName = this.statusOptions[index].name
        this.search()
      },
      getList(page) {
        this.beforeGetList(page);
        this.listQuery.customerId = this.customerId || this.userInfo.id
        this.listQuery.status = this.statusOptions[this.selectedFilterIndex].value
        this.listQuery.borrowerType = this.currentTab === 0 ? 'PERSONAL' : 'COMPANY'
        getLoans(this.listQuery)
          .then(res => {
            this.afterGetList(res, page);
          })
          .catch(() => this.errorList());
      },
      loanStatistic() {
        if (this.showStatistics) {
          getLoanStatistic().then((res) => {
            this.statisticLoan = res
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .statistics-container {
    position: fixed;
    z-index: 999;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #fff;

    .left {
      width: 30%;
      border-right: 1rpx solid #efefef;
      text-align: left;
      padding-left: 10%;
    }

    .right {
      padding-left: 10%;
    }

    .number {
      font-size: 40rpx;
      font-weight: bold;
    }

    .value {
      color: #999;
    }

    .unit {
      font-size: 28rpx;
      margin-left: 10rpx;
    }

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
