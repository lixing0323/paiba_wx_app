<template>
  <view class="bg-img-padding">
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
      @emptyclick="emptyClick">
      <ht-module-card v-for="(d, index) in list" :key="d" :title="`对外担保${index + 1}`" :isShowCollapse="true">
        <tui-form-item v-for="(t, tIndex) in TITLE_GUARANTEE" :key="t" :label="t.label" :rightContent="a[t.prop] || '无'" />
      </ht-module-card>
    </mescroll-body>
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';
  import {
    joinUnitToData,
    changeToWan,
    changeEnumToValue
  } from '@/common/filter.js'

  import {
    getGuarantees
  } from '@/apis/report.js'
  import {
    TITLE_GUARANTEE
  } from '@/packageA/pages/common/titles.js'

  // 办卡卡片组件
  export default {
    components: {},
    mixins: [ListMixin],
    data() {
      return {
        TITLE_GUARANTEE,
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
        getGuarantees(this.listQuery)
          .then(res => {
            this.initData(res.items)
            this.afterGetList(res, page)
          })
          .catch(() => this.errorList());
      },
      initData(val) {
        const enumToValueKeys = ['guaranteeType', 'loanStatus']
        const joinUnitKeys = [{
          name: 'amount',
          unit: '元'
        }]

        val.forEach((item) => {
          enumToValueKeys.forEach(key => {
            item[key] = changeEnumToValue(item, key)
          })
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
