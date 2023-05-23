<template>
  <view style="padding-bottom: 80px">
    <view v-for="(d, index) in list" :key="index" class="business-content-top-20">
      <ht-module-card :title="`${cardTitle}${index + 1}`" :isShowCollapse="true">
        <template v-slot:right>
          <view class="edit-bt" @click.stop.prevent="onEdit(d)">
            <image class="icon" :src="editImgSrc" />
            <text class="text">编辑</text>
          </view>
        </template>
        <ht-module-card :subTitle="`经营背景`" :isShowCollapse="true">
          <view v-for="(t, tIndex) in titles" :key="t" >
            <tui-form-item v-if="directionType(t, d[t.prop]) === 'row' || !d[t.prop]" :label="t.label" :rightContent="d[t.prop] || '无'" />
            <tui-form-item v-else direction="column">
              <template v-slot:label>
                <view class="title"><span class="text">{{ t.label }}</span></view>
              </template>
              <template>
                <view class="content content-column">{{ d[t.prop] || '无' }}</view>
              </template>
            </tui-form-item>
          </view>
        </ht-module-card>
        <ht-module-card :subTitle="`法人与股东`" :isShowCollapse="true">
          <tui-form-item :label="`法人姓名`" :rightContent="d.legalRepresentative || '无'" />
          <tui-form-item :label="`法人身份证`" :rightContent="d.lrIdCard || '无'" />
          <view v-for="(s, sIndex) in d.shareholders" :key="s">
            <tui-form-item :label="`股东${sIndex + 1}姓名`" :rightContent="s.name || '无'" />
            <tui-form-item :label="`股东${sIndex + 1}身份证`" :rightContent="s.idCard || '无'" />
          </view>
        </ht-module-card>
        <ht-module-card :subTitle="`资产信息`" :isShowCollapse="true">
          <tui-form-item :label="`总资产`" :rightContent="d.totalAssets || '无'" />
          <tui-form-item :label="`应收帐款`" :rightContent="d.receivables || '无'" />
          <tui-form-item :label="`固定资产`" :rightContent="d.fixedAssets || '无'" />
          <tui-form-item :label="`库存`" :rightContent="d.inventoryAssets || '无'" />
          <tui-form-item :label="`其他`" :rightContent="d.otherAssets || '无'" />
        </ht-module-card>
        <ht-module-card :subTitle="`负债信息`" :isShowCollapse="true">
          <tui-form-item :label="`总负债`" :rightContent="d.totalLiabilities || '无'" />
          <tui-form-item :label="`应付账款`" :rightContent="d.accountsPayable || '无'" />
          <tui-form-item :label="`银行借款`" :rightContent="d.bankLoan || '无'" />
          <tui-form-item :label="`应交税费`" :rightContent="d.taxAmount || '无'" />
          <tui-form-item :label="`其他应付款`" :rightContent="d.otherPayable || '无'" />
        </ht-module-card>
        <ht-module-card :subTitle="`年度财务信息`" :isShowCollapse="true" v-if="d.annualFinances.length > 0">
          <view v-for="(a, aIndex) in d.annualFinances" :key="a">
            <tui-form-item :label="`${a.year}年`" :rightContent="d.totalLiabilities || '无'" />
            <tui-form-item label="销售额" :rightContent="d.sales || '无'" />
            <tui-form-item label="净利润" :rightContent="d.netProfits || '无'" />
            <tui-form-item label="利润率" :rightContent="d.profitRate || '无'" />
            <tui-form-item label="缴税额" :rightContent="d.tax || '无'" />

            <uni-list-item ellipsis="1" :title="`${a.year}年：`" :titleStyle="{ fonSize: '30rpx', color: 'black', fontWeight: 'bold' }" />
            <uni-list-item ellipsis="1" :title="`销售额：`" :rightText="a.sales || '无'" />
            <uni-list-item ellipsis="1" :title="`净利润：`" :rightText="a.netProfits || '无'" />
            <uni-list-item ellipsis="1" :title="`利润率：`" :rightText="a.profitRate || '无'" />
            <uni-list-item ellipsis="1" :title="`缴税额：`" :rightText="a.tax || '无'" />
          </view>
        </ht-module-card>
      </ht-module-card>
    </view>
  </view>
</template>

<script>
import { getArrayToString, joinUnitToData, changeEnumToValue, changeBooleanToValue, directionType } from '@/common/filter.js';
import { getMyCompanies } from '@/apis/report.js';

// 办卡卡片组件
export default {
  components: {},
  props: {
    titles: {
      type: Array,
      default: undefined
    },
    cardTitle: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      list: [],
      editImgSrc: require('@/static/icon/feedback.png')
    };
  },
  created() {
    // this.initData()
  },
  methods: {
    directionType,
    initList(list) {
      this.initData(list);
      this.list = list;
    },
    initData(val) {
      const booleanKeys = ['isRent', 'isMainBusiness'];
      const enumToValueKeys = ['organizationType'];
      const arrayToStringKeys = ['upCustomers', 'downCustomers'];
      const moneyKeys = ['totalAssets','receivables', 'fixedAssets','inventoryAssets','otherAssets','totalLiabilities','accountsPayable','bankLoan','taxAmount','otherPayable']
      const joinUnitKeys = [
        {
          name: 'rentArea',
          unit: '㎡'
        },
        {
          name: 'warehouseRent',
          unit: '元'
        },
        {
          name: 'rent',
          unit: '元'
        },
        {
          name: 'warehouseArea',
          unit: '㎡'
        },
        {
          name: 'sales',
          unit: '元'
        },
        {
          name: 'netProfits',
          unit: '元'
        },
        {
          name: 'profitRate',
          unit: '%'
        },
        {
          name: 'tax',
          unit: '元'
        }
      ];
      val.forEach(item => {
        if (item.registeredProvince) {
          item.registeredAddressFull = `${item.registeredProvince.name}/${item.registeredCity.name}/${item.registeredDistrict.name}/${item.registeredAddress}`;
        }
        if (item.province) {
          item.addressFull = `${item.province.name}/${item.city.name}/${item.district.name}/${item.address}`;
        }
        enumToValueKeys.forEach(key => {
          item[key] = changeEnumToValue(item, key);
        });
        booleanKeys.forEach(key => {
          item[key] = changeBooleanToValue(item, key);
        });
        arrayToStringKeys.forEach(key => {
          item[key] = getArrayToString(item[key]);
        });
        moneyKeys.forEach(key => {
          item[key] = joinUnitToData(item[key], '元');
        })
        joinUnitKeys.forEach(key => {
          item[key.name] = joinUnitToData(item[key.name], key.unit);
          item.annualFinances.forEach(item1 => {
            item1[key.name] = joinUnitToData(item1[key.name], key.unit);
          });
        });
      });
      console.log(this.list[0])
    },
    onEdit(item) {
      uni.navigateTo({
        url: `/packageB/pages/staff/my-customer/components/business/edit?id=${item.id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/common/business.scss';
.edit-bt {
  .text {
    font-size: 30rpx;
    height: 30rpx;
    vertical-align: middle;
    margin-right: 30rpx;
    font-weight: bold;
    color: $system-color;
  }
  .icon {
    font-size: 30rpx;
    height: 30rpx;
    width: 30rpx;
    font-weight: bold;
    vertical-align: middle;
    color: $system-color;
    margin-right: 20rpx;
  }
}
</style>
