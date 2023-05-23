<template>
  <view class="bg-img-padding">
    <view>
      <ht-module-card :title="`${loanType()}贷款逾期情况`" :isShowCollapse="true">
        <template v-if="loanStatic">
          <tui-form-item label="逾期次数" :rightContent="`${loanStatic.loanOverdueCount}次`" />
          <tui-form-item label="逾期金额" :rightContent="`${moneyFilter(loanStatic.loanOverdueAmount)}`" :bottom-border="false" />
        </template>
      </ht-module-card>
      <ht-module-card v-for="(d, index) in list" :key="index" :title="`${loanType()}贷款${index + 1}`"
        :isShowCollapse="true">
        <tui-form-item v-for="(t, tIndex) in titles" :key="t" :label="t.label" :rightContent="d[t.prop]" />
        <tui-form-item label="实际用途" :direction="d.usedFor ? 'column' : 'row'" :rightContent="d.usedFor || '无'" :bottom-border="false" />
      </ht-module-card>
    </view>
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';
  import {
    changeEnumToValue,
    joinUnitToData,
    changeBooleanToValue,
    moneyFilter,
    getTabMarginTop
  } from '@/common/filter.js'
  import {
    getCreditReport,
    getLoanStatic
  } from '@/apis/report.js'
  import {
    mapGetters
  } from 'vuex';

  // 办卡卡片组件
  export default {
    components: {},
    mixins: [ListMixin],
    props: {
      borrowerType: {
        type: String,
        default: undefined
      },
      title: {
        type: String,
        default: undefined
      }
    },
    data() {
      return {
        titles: [{
            label: '授信银行名称',
            prop: 'bankName'
          },
          {
            label: '贷款人',
            prop: 'loaner'
          },
          {
            label: '授信余额',
            prop: 'loanAmount'
          },
          {
            label: '发放日期',
            prop: 'loanDate'
          },
          {
            label: '到期日期',
            prop: 'dueDate'
          },
          {
            label: '担保方式',
            prop: 'guaranteeType'
          },
          {
            label: '是否为本笔抵押物',
            prop: 'isPawn'
          },
          {
            label: '授信种类',
            prop: 'creditType'
          }
        ],
        loanStatic: undefined
      }
    },
    created() {
      this.getList()
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    methods: {
      moneyFilter,
      getTabMarginTop,
      loanType() {
        return this.borrowerType === 'PERSONAL' ? '个人' : '公司'
      },
      getList() {
        this.listQuery = {}
        this.listQuery.borrowerType = this.borrowerType;
        this.listQuery.customerId = this.userInfo.id || '2'
        getCreditReport(this.listQuery)
          .then(res => {
            this.initData(res.items)
            this.list = res.items
            this.getReport()
          })
          .catch(() => this.errorList());
      },
      getReport() {
        getLoanStatic(2, {
          borrowerType: this.borrowerType
        }).then(res => {
          this.loanStatic = res
        })
      },
      initData(val) {
        const booleanKeys = ['isPawn']
        const changeMoney = ['loanAmount']
        const enumKeys = ['guaranteeType', 'creditType']
        val.forEach((item) => {
          item.loaner = this.borrowerType === 'COMPANY' ? item.companyName : item.customer.fullName
          booleanKeys.forEach(key => {
            item[key] = changeBooleanToValue(item, key)
          })
          enumKeys.forEach(key => {
            item[key] = changeEnumToValue(item, key)
          })
          changeMoney.forEach(key => {
            item[key] = moneyFilter(item[key])
          })
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>
