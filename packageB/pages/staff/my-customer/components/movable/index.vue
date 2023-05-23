<template>
  <view class="bg-img-padding">
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
      @emptyclick="emptyClick">
      <ht-module-card v-for="(d, index) in list" :key="d" :title="`动产${index + 1}`" :isShowCollapse="true">
        <tui-form-item v-for="(t, tIndex) in TITLE_MOVABLE" :key="t" :label="t.label" :rightContent="d[t.prop] || '无'" />
      </ht-module-card>
      <uni-load-more color="#007AFF" :status="status" />
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
    getMovables
  } from '@/apis/staff/customer.js'
  import {
    TITLE_MOVABLE
  } from '@/packageA/pages/common/titles.js'

  // 办卡卡片组件
  export default {
    components: {},
    mixins: [ListMixin],
    data() {
      return {
        TITLE_MOVABLE,
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
        getMovables(this.listQuery)
          .then(res => {
            this.initData(res.items)
            this.afterGetList(res, page)
          })
          .catch(() => this.errorList());
      },
      initData(val) {
        const joinUnitKeys = [{
          name: 'value',
          unit: '万元',
          filter: changeToWan
        }]

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
