<template>
  <view class="bg-img-padding">
    <view>
      <ht-module-card v-for="(d, index) in list" :key="index" :title="`借款人经营背景${index + 1}`" :isShowCollapse="true">
        <view v-for="(t, tIndex) in titles" :key="t">
          <tui-form-item v-if="directionType(t, d[t.prop]) === 'column'" direction="column" :label="t.label" :bottom-border="tIndex < titles.length - 1">
            {{ d[t.prop] || '无' }}
          </tui-form-item>
          <tui-form-item v-else direction="row" :label="t.label" :rightContent="d[t.prop] || '无'" :bottom-border="tIndex < titles.length - 1" />
        </view>
      </ht-module-card>
    </view>
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';
  import {
    getArrayToString,
    joinUnitToData,
    directionType,
    getZonesShow,
    getTabMarginTop
  } from '@/common/filter.js'
  import {
    getMyCompanies
  } from '@/apis/report.js'
  import {
    mapGetters
  } from 'vuex';

  // 办卡卡片组件
  export default {
    components: {},
    mixins: [ListMixin],
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    data() {
      return {
        titles: [{
            label: '公司名称：',
            prop: 'name',
            direction: 'column'
          },
          {
            label: '注册日期：',
            prop: 'registeredDate'
          },
          {
            label: '经营范围：',
            prop: 'businessScope',
            direction: 'column'
          },
          {
            label: '注册地址：',
            prop: 'registeredAddressFull',
            direction: 'column'
          },
          {
            label: '实际经营地址：',
            prop: 'addressFull',
            direction: 'column'
          },
          {
            label: '经营地址是否为租赁：',
            prop: 'isRent'
          },
          {
            label: '面积：',
            prop: 'rentArea'
          },
          {
            label: '年租金：',
            prop: 'rent'
          },
          {
            label: '库房地址：',
            prop: 'warehouseAddress',
            direction: 'column'
          },
          {
            label: '面积：',
            prop: 'warehouseArea'
          },
          {
            label: '上游客户：',
            prop: 'upCustomers',
            direction: 'column'
          },
          {
            label: '下游客户：',
            prop: 'downCustomers',
            direction: 'column'
          }
        ]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      directionType,
      getTabMarginTop,
      getList(page) {
        this.beforeGetList(page);
        this.listQuery = {}
        this.listQuery.customerId = this.userInfo.id || '2'
        getMyCompanies(this.listQuery)
          .then(res => {
            this.initData(res)
            this.list = res
          })
          .catch(() => this.errorList());
      },
      initData(val) {
        const booleanKeys = ['isRent']
        const arrayToStringKeys = ['upCustomers', 'downCustomers']
        const joinUnitKeys = [{
            name: 'rentArea',
            unit: '㎡'
          },
          {
            name: 'rent',
            unit: '元'
          },
          {
            name: 'warehouseArea',
            unit: '㎡'
          }
        ]
        val.forEach((item) => {
          if (item.registeredProvince) {
            item.registeredAddressFull =
              getZonesShow(item.registeredProvince, item.registeredCity, item.registeredDistrict, item
                .registeredAddress)
          }
          if (item.province) {
            item.addressFull =
              getZonesShow(item.province, item.city, item.district, item.address)
          }
          booleanKeys.forEach(key => {
            item[key] = (item[key] === true) ? '是' : '否'
          })
          arrayToStringKeys.forEach(key => {
            item[key] = getArrayToString(item[key])
          })
          joinUnitKeys.forEach(key => {
            item[key.name] = joinUnitToData(item[key.name], key.unit)
          })
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>
