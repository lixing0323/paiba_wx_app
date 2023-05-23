<template>
  <view class="business-content-padding-top-20">
    <view class="business-content-bottom-20" v-if="customerForm">
      <tui-form-item label="用户编号" :rightContent="customerForm.userName || '-'" rightContentColor="#9A8457"/>
      <tui-form-item label="客户经理" :rightContent="customerForm.staff.fullName || '-'" rightContentColor="#9A8457"/>
    </view>
    <ht-base-info-edit ref="baseInfo" :isStaffCreate="isStaffCreate" />
  </view>
</template>

<script>
  import {
    getCascaderChinaZones
  } from '@/apis/china-zone.js'
  import {
    getCustomerWithId
  } from '@/apis/staff/customer.js'
  import {
    getZonesShow,
    changeZonesDataKey
  } from '@/common/filter.js'
  export default {
    data() {
      return {
        loading: false,
        rightTextStyle: {
          color: '#9A8457',
          fontSize: '28rpx',
          fontWeight: 'bold'
        },
        customerForm: undefined,
        isStaffCreate: true
      }
    },
    onLoad(params) {
      this.customerId = params.id;
      this.isStaffCreate = !params.id
      // this.getChinaZonesFun()
    },
    onShow() {
      this.getInfo()
    },
    methods: {
      getInfo(zones) {
        if (this.customerId) {
          uni.showLoading();
          getCustomerWithId(this.customerId)
            .then(resp => {
              this.customerForm = Object.assign({}, resp)
              this.zonesShow = getZonesShow(this.customerForm.registeredProvince, this.customerForm.registeredCity,
                this.customerForm.registeredDistrict)
              this.$refs.baseInfo.initForm(this.customerForm, this.zonesShow, zones, this.customerId)
              uni.hideLoading();
            })
            .catch(() => uni.hideLoading());
        }
      },
      getChinaZonesFun() {
        getCascaderChinaZones().then((resp) => {
          this.zones = changeZonesDataKey(resp)
          this.getInfo(this.zones)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>
