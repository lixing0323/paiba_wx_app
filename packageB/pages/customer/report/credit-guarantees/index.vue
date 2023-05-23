<template>
  <view class="bg-img-padding">
    <view>
      <ht-module-card title="信用卡逾期情况" :isShowCollapse="true">
        <template v-if="creditStatic">
          <tui-form-item label="逾期次数" :rightContent="`${creditStatic.overdueCount}次`" />
          <tui-form-item label="逾期金额" :rightContent="`${creditStatic.overdueAmount}次`" :bottom-border="false" />
        </template>
      </ht-module-card>
      <ht-module-card title="信用卡使用情况" :isShowCollapse="true">
        <tui-form-item v-for="(t, tIndex) in cTitles" :key="t" :label="t.label"
          :rightContent="`${creditStatic[t.prop]}${t.unit}`" :bottom-border="tIndex < cTitles.length - 1" />
      </ht-module-card>
      <ht-module-card v-for="(d, index) in list" :key="index" :title="`担保信息${index + 1}`" :isShowCollapse="true">
        <tui-form-item v-for="(t, tIndex) in gTitles" :key="t" :label="t.label" :rightContent="d[t.prop] || '无'"  :bottom-border="tIndex < gTitles.length - 1"/>
      </ht-module-card>
    </view>
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';
  import {
    getTabMarginTop
  } from '@/common/filter.js'

  import {
    getGuarantees,
    getCreditStatic
  } from '@/apis/report.js'
  import {
    mapGetters
  } from 'vuex';

  // 办卡卡片组件
  export default {
    components: {},
    mixins: [ListMixin],
    data() {
      return {
        cTitles: [{
            label: '信用卡账户：',
            prop: 'creditCount',
            unit: '户'
          },
          {
            label: '授信总额度：',
            prop: 'creditLine',
            unit: '元'
          },
          {
            label: '单家机构最高授信额度：',
            prop: 'maxCreditLine',
            unit: '元'
          },
          {
            label: '已用总额度：',
            prop: 'usedCredit',
            unit: '元'
          },
          {
            label: '近六个月平均使用额度：',
            prop: 'averageUsedCredit',
            unit: '元'
          }
        ],
        gTitles: [{
            label: '保证人：',
            prop: 'guarantor'
          },
          {
            label: '被保证人：',
            prop: 'warrantee'
          },
          {
            label: '保证人与被保证人关系：',
            prop: 'relation'
          }
        ],
        creditStatic: undefined
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
      getList(page) {
        this.beforeGetList(page);
        this.listQuery = {}
        this.listQuery.customerId = this.userInfo.id || '2'
        getGuarantees(this.listQuery)
          .then(res => {
            this.list = res.items
            this.getReport()
          })
          .catch(() => this.errorList());
      },
      getReport() {
        getCreditStatic(2).then(res => {
          this.creditStatic = res
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>
