<template>
  <view class="bg-img-padding">
    <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" :up="upOption" @up="getList"
      @emptyclick="emptyClick">
        <ht-module-card v-for="(d, index) in list" :key="index" :title="`不动产${index + 1}`" :isShowCollapse="true">
          <view v-for="(t, tIndex) in TITLE_IMMOVABLE_ONE" :key="t" >
            <tui-form-item v-if="directionType(t, d[t.prop]) === 'row' || !d[t.prop]" :label="t.label" :rightContent="d[t.prop] || '无'" />
            <tui-form-item v-else direction="column" :label="t.label">
              <view class="content content-column">{{ d[t.prop] || '无' }}</view>
            </tui-form-item>
          </view>
          <view v-for="(o, oIndex) in d.ownershipInfo" :key="o">
            <tui-form-item :label="`共有人${oIndex + 1}`" />
            <tui-form-item :label="`共有人姓名`" :rightContent="o.name || '无'" />
            <tui-form-item :label="`共有人占比`" :rightContent="`${o.proportion}%` || '无'" />
          </view>
          <view v-for="(t, tIndex) in TITLE_IMMOVABLE_TWO" :key="t" >
            <tui-form-item v-if="directionType(t, d[t.prop]) === 'row' || !d[t.prop]" :label="t.label" :rightContent="d[t.prop] || '无'" />
            <tui-form-item v-else direction="column" :label="t.label">
              <view class="content content-column">{{ d[t.prop] || '无' }}</view>
            </tui-form-item>
          </view>
        </ht-module-card>
    </mescroll-body>
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';
  import {
    getZonesShow,
    changeEnumToValue,
    changeBooleanToValue,
    joinUnitToData,
    changeToWan,
    directionType
  } from '@/common/filter.js'

  import {
    getImmovables
  } from '@/apis/staff/customer.js'
  import {
    TITLE_IMMOVABLE_ONE,
    TITLE_IMMOVABLE_TWO
  } from '@/packageA/pages/common/titles.js'

  // 办卡卡片组件
  export default {
    components: {},
    mixins: [ListMixin],
    data() {
      return {
        TITLE_IMMOVABLE_ONE,
        TITLE_IMMOVABLE_TWO,
        customerId: undefined
      }
    },
    onLoad(params) {
      this.customerId = params.id;
    },
    methods: {
      changeToWan,
      directionType,
      getList(page) {
        this.beforeGetList(page)
        this.listQuery.customerId = this.customerId
        getImmovables(this.listQuery)
          .then(res => {
            this.initData(res.items)
            this.afterGetList(res, page)
          })
          .catch(() => this.errorList());
      },
      initData(val) {
        const booleanKeys = ['isContainElevator', 'isSchoolDistrictHousing']
        const enumToValueKeys = ['ownershipType', 'purpose', 'entitlementProperties', 'toward']
        const joinUnitKeys = [{
            name: 'purchaseAmount',
            unit: '万元',
            filter: changeToWan
          },
          {
            name: 'resistPressureRate',
            unit: '%'
          },
          {
            name: 'area',
            unit: '㎡'
          },
          {
            name: 'evaluationUnitPrice',
            unit: '元'
          },
          {
            name: 'evaluationTotalPrice',
            unit: '万元',
            filter: changeToWan
          }
        ]
        val.forEach((item) => {
          if (item.registeredProvince) {
            item.registeredAddressFull =
              getZonesShow(item.registeredProvince, item.registeredCity, item.registeredDistrict, item
                .detailedAddress)
          }
          enumToValueKeys.forEach(key => {
            item[key] = changeEnumToValue(item, key)
          })
          booleanKeys.forEach(key => {
            item[key] = changeBooleanToValue(item, key)
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
