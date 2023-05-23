<template>
  <view class="bg-img-padding">
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
      @emptyclick="emptyClick">
      <ht-module-card v-for="(d, index) in list" :key="d" :title="`信用卡${index + 1}`" :isShowCollapse="true">
        <tui-form-item v-for="(t, tIndex) in TITLE_CREDIT_CARD" :key="t" :label="t.label" :rightContent="d[t.prop] || '无'" />
        <view v-for="(o, oIndex) in d.overdueRecords" :key="o">
          <tui-form-item :label="`逾期记录${oIndex + 1}`" />
          <tui-form-item label="逾期月份" :rightContent="o.overdueDate" />
          <tui-form-item label="逾期金额" :rightContent="`${o.amount}元`" />
        </view>
      </ht-module-card>
    </mescroll-body>
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';
  import {
    joinUnitToData,
    changeToWan
  } from '@/common/filter.js'

  import {
    getCreditCard
  } from '@/apis/staff/customer.js'
  import {
    TITLE_CREDIT_CARD
  } from '@/packageA/pages/common/titles.js'

  // 办卡卡片组件
  export default {
    components: {},
    mixins: [ListMixin],
    data() {
      return {
        TITLE_CREDIT_CARD,
        customerId: undefined
      }
    },
    onLoad(params) {
      this.customerId = params.id;
    },
    methods: {
      changeToWan,
      getList(page) {
        this.beforeGetList(page)
        this.listQuery.customerId = this.customerId
        getCreditCard(this.listQuery)
          .then(res => {
            this.initData(res.items)
            this.afterGetList(res, page)
          })
          .catch(() => this.errorList());
      },
      initData(val) {
        const joinUnitKeys = [{
            name: 'creditLine',
            unit: '元'
          },
          {
            name: 'usedCredit',
            unit: '元'
          },
          {
            name: 'averageUsedCredit',
            unit: '元'
          }
        ]

        val.forEach((item) => {
          joinUnitKeys.forEach(key => {
            item[key.name] = joinUnitToData(item[key.name], key.unit, key.filter)
          })
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>
