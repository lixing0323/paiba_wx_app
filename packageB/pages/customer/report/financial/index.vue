<template>
  <view class="bg-img-padding">
    <view>
      <ht-module-card title="借款人财务分析" :isShowCollapse="true">
        <view v-for="(t, tIndex) in titles" :key="t">
          <tui-form-item v-if="directionType(t, t.prop) === 'column'" direction="column" :label="t.label" :bottom-border="tIndex < titles.length - 1">
            <view>{{ info[t.prop] || '无' }}</view>
            <view v-if="t.label === '总资产'" class="container">
              <view class="row" v-for="i in totalAssetsTitles" :key="i">
                <text class="label">{{ i.label }}</text>
                <text class="value">{{ info[i.prop] }}</text>
              </view>
            </view>
            <view v-if="t.label === '总负债'" class="container">
              <view class="row" v-for="i in totalLiabilitiesTitles" :key="i">
                <text class="label">{{ i.label }}</text>
                <text class="value">{{ info[i.prop] }}</text>
              </view>
            </view>
          </tui-form-item>
          <tui-form-item v-else :label="t.label" :rightContent="info[t.prop] || '无'" :bottom-border="tIndex < titles.length - 1" />
        </view>
      </ht-module-card>
    </view>
  </view>
</template>

<script>
  import {
    changeToWan,
    moneyFilter,
    directionType,
    getTabMarginTop
  } from '@/common/filter.js'
  import {
    getFinancial
  } from '@/apis/report.js'
  import {
    mapGetters
  } from 'vuex';

  // 办卡卡片组件
  export default {
    components: {},
    data() {
      return {
        titles: [{
            label: '借款人上年收入',
            prop: 'sales'
          },
          {
            label: '净利润',
            prop: 'netProfits'
          },
          {
            label: '总资产',
            prop: 'totalAssets',
            extra: 'detail',
            direction: 'column'
          },
          {
            label: '总负债',
            prop: 'totalLiabilities',
            extra: 'detail',
            direction: 'column'
          },
          {
            label: '上年缴纳税款',
            prop: 'tax'
          }
        ],
        totalLiabilitiesTitles: [{
            label: '应付账款：',
            prop: 'accountsPayable'
          },
          {
            label: '银行借款：',
            prop: 'bankLoan'
          },
          {
            label: '应交税费：',
            prop: 'taxAmount'
          },
          {
            label: '其他应付款：',
            prop: 'otherPayable'
          }
        ],
        totalAssetsTitles: [{
            label: '应收账款：',
            prop: 'receivables'
          },
          {
            label: '固定资产：',
            prop: 'fixedAssets'
          },
          {
            label: '库存：',
            prop: 'inventoryAssets'
          },
          {
            label: '其他：',
            prop: 'otherAssets'
          }
        ],
        info: undefined
      }
    },
    created() {
      this.getList()
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    methods: {
      getTabMarginTop,
      directionType,
      moneyFilter,
      getList(page) {
        getFinancial(this.userInfo.id || '2')
          .then(res => {
            this.info = Object.assign({}, res)
            Object.keys(this.info).forEach((key) => {
              if (this.info[key]) {
                this.info[key] = moneyFilter(res[key])
              } else {
                this.info[key] = '无'
              }
            })
          })
          .catch(() => {});
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .container {
    margin-top: 20rpx;
    background-color: #F9F9F9;
    padding: 20rpx 0rpx;
    letter-spacing: 3rpx;
    // text-align: center;

    .row {
      padding: 10rpx 0rpx;
      width: 500rpx;
      margin: 0 auto;
      font-size: 28rpx;
    }

    .label {
      color: $system-color;
      display: inline-block;
      width: 200rpx;
      text-align: right;
      line-height: 18px;
    }

    .value {
      line-height: 18px;
    }
  }
</style>
