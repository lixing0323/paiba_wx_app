<template>
  <view class="bg-img-padding business-content-top-20">
    <ht-module-card v-for="(d, index) in list" :key="index" :title="`${d.bankName}(${d.depositConfig.length}笔)`"
      :isShowCollapse="true">
      <view v-for="(a, aIndex) in d.depositConfig" :key="index">
        <tui-form-item :label="`存款${aIndex + 1}`" />
        <tui-form-item v-for="(t, tIndex) in titleData(a)" :key="t" :label="t.label" :rightContent="a[t.prop] || '无'" />
      </view>
    </ht-module-card>
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';
  import {
    changeEnumToValue,
    changeToWan,
    joinUnitToData
  } from '@/common/filter.js'

  import {
    getDeposits
  } from '@/apis/staff/customer.js'
  import {
    TITLE_DEPOSIT,
    TITLE_FINANCIAL
  } from '@/packageA/pages/common/titles.js'

  // 办卡卡片组件
  export default {
    components: {},
    mixins: [ListMixin],
    data() {
      return {
        TITLE_DEPOSIT,
        TITLE_FINANCIAL,
        customerId: undefined
      }
    },
    onLoad(params) {
      this.customerId = params.id;
      this.getList()
    },
    methods: {
      titleData(a) {
        return a.depositCate === '存款' ? TITLE_DEPOSIT : TITLE_FINANCIAL
      },
      getList(page) {
        getDeposits({
            customerId: this.customerId
          })
          .then(res => {
            this.initData(res)
            this.list = res
          })
          .catch(() => this.errorList());
      },
      initData(val) {
        const joinUnitKeys = [{
            name: 'amount',
            unit: '万元',
            filter: changeToWan
          },
          {
            name: 'expectedYield',
            unit: '%'
          },
          {
            name: 'rate',
            unit: '%'
          }
        ]
        val.forEach((item) => {
          item.depositConfig.forEach(item1 => {
            item1.depositCate = changeEnumToValue(item1, 'depositCate')
            item1.depositType = changeEnumToValue(item1, 'depositType')
          })
          item.depositConfig.forEach(item1 => {
            joinUnitKeys.forEach(key => {
              item1[key.name] = joinUnitToData(item1[key.name], key.unit, key.filter || null)
            })
          })
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>
