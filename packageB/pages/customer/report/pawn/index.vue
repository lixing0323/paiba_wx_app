<template>
  <view class="bg-img-padding">
    <view>
      <ht-module-card v-if="immovablesList.length === 0" title="不动产信息">
        <tui-form-item direction="row" label="暂无数据" />
      </ht-module-card>
      <ht-module-card v-else v-for="(d, index) in immovablesList" :key="d" :title="`不动产${index + 1}`"
        :isShowCollapse="true">
        <tui-form-item v-for="(t, tIndex) in imTitles" :key="t" direction="row" :label="t.label"
          :rightContent="d[t.prop] || '无'" :bottom-border="tIndex < imTitles.length - 1" />
      </ht-module-card>

      <!--        空数据时显示-->
      <ht-module-card v-if="movablesList.length === 0" title="动产信息">
        <tui-form-item direction="row" label="暂无数据" :bottom-border="false"  />
      </ht-module-card>
      <ht-module-card v-for="(d, index) in movablesList" :key="d" :title="`动产${index + 1}`" :isShowCollapse="true">
        <tui-form-item v-for="(t, tIndex) in mTitles" :key="t" direction="row" :label="t.label"
          :rightContent="d[t.prop] || '无'" :bottom-border="tIndex < mTitles.length - 1" />
      </ht-module-card>
    </view>
  </view>
</template>

<script>
  import ListMixin from '@/mixins/listMixin.js';
  import {
    changeToWan,
    joinUnitToData,
    changeEnumToValue,
    changeBooleanToValue,
    getTabMarginTop
  } from '@/common/filter.js'

  import {
    getMovables,
    getImmovables
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
        movablesList: [],
        immovablesList: [],
        imTitles: [{
            label: '名称',
            prop: 'name'
          },
          {
            label: '抵押物权属人',
            prop: 'owner'
          },
          {
            label: '抵押物用途',
            prop: 'purpose'
          },
          {
            label: '共有情况',
            prop: 'ownershipType'
          },
          {
            label: '不动产地址',
            prop: 'registeredAddress'
          },
          {
            label: '不动产房产证号',
            prop: 'certificateNo'
          },
          {
            label: '所在楼层',
            prop: 'storey'
          },
          {
            label: '总层数',
            prop: 'totalFloor'
          },
          {
            label: '建成年代',
            prop: 'buildAt'
          },
          {
            label: '是否为学区房',
            prop: 'isSchoolDistrictHousing'
          },
          {
            label: '朝向',
            prop: 'toward'
          },
          {
            label: '是否有电梯',
            prop: 'isContainElevator'
          },

          {
            label: '权利性质',
            prop: 'entitlementProperties'
          },
          {
            label: '装修情况',
            prop: 'decorationState'
          },
          {
            label: '购买日期',
            prop: 'purchaseTime'
          },
          {
            label: '买入金额',
            prop: 'purchaseAmount'
          },
          {
            label: '面积:',
            prop: 'area'
          },
          {
            label: '评估单价',
            prop: 'evaluationUnitPrice'
          },
          {
            label: '评估总价',
            prop: 'evaluationTotalPrice'
          },
          {
            label: '抵质押率',
            prop: 'resistPressureRate'
          }
        ],
        mTitles: [{
            label: '名称',
            prop: 'name'
          },
          {
            label: '所有人',
            prop: 'owner'
          },
          {
            label: '价值',
            prop: 'value'
          }
        ]
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
        getImmovables(this.listQuery).then(resp => {
          this.immovablesList = resp
          this.initImData(resp)
          getMovables(this.listQuery)
            .then(res => {
              this.movablesList = res
              this.initMData(res)
              this.isLoading = false
            })
            .catch(() => this.errorList());
        })
      },
      initImData(val) {
        const enumKeys = ['purpose', 'ownershipType', 'toward', 'entitlementProperties']
        const booleanKeys = ['isSchoolDistrictHousing', 'isContainElevator']
        const joinUnitKeys = [{
            name: 'area',
            unit: '㎡'
          },
          {
            name: 'purchaseAmount',
            unit: '万元',
            filter: changeToWan
          },
          {
            name: 'evaluationUnitPrice',
            unit: '元'
          },
          {
            name: 'evaluationTotalPrice',
            unit: '万元',
            filter: changeToWan
          },
          {
            name: 'resistPressureRate',
            unit: '%'
          }
        ]

        val.forEach((item) => {
          enumKeys.forEach(key => {
            item[key] = changeEnumToValue(item, key)
          })
          booleanKeys.forEach(key => {
            item[key] = changeBooleanToValue(item, key)
          })
          joinUnitKeys.forEach(key => {
            item[key.name] = joinUnitToData(item[key.name], key.unit, key.filter)
          })
        })
      },
      initMData(val) {
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
