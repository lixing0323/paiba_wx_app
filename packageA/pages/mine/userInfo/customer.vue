<template>
  <view>
    <ht-base-info-edit ref="baseInfo" :is-own-modify="true" :isFirstReg="isFirstReg" />
    <!--    <ht-module-card title="个人信息" :open="false">-->
    <!--      <uni-list>-->
    <!--        <uni-list-item title="姓名：" :rightText="ownInfo.fullName || '-'"></uni-list-item>-->
    <!--        <uni-list-item title="性别：" :rightText="ownInfo.gender.value|| '-' "></uni-list-item>-->
    <!--        <uni-list-item title="户口所在地：" :rightText="zones || '-'"></uni-list-item>-->
    <!--        <uni-list-item title="身份证号：" :rightText="ownInfo.idCard|| '-'"></uni-list-item>-->
    <!--        <uni-list-item title="年龄：" :rightText="ownInfo.age|| '-'"></uni-list-item>-->
    <!--        <uni-list-item title="手机号：" :rightText="ownInfo.mobile|| '-'"></uni-list-item>-->
    <!--        <uni-list-item title="婚姻状况：" :rightText="ownInfo.maritalStatus.value|| '-'"></uni-list-item>-->
    <!--        <uni-list-item title="工作单位：" :rightText="ownInfo.workUnit|| '-'"></uni-list-item>-->
    <!--      </uni-list>-->
    <!--    </ht-module-card>-->
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import {
    getUserInfo
  } from '@/apis/user.js';
  import {
    getZonesShow
  } from '@/common/filter.js'
  export default {
    data() {
      return {
        ownInfo: undefined,
        zones: undefined,
        isFirstReg: false
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    methods: {
      getInfo() {
        getUserInfo().then((resp) => {
          this.ownInfo = resp
          if (resp.registeredProvince) {
            this.zones = getZonesShow(resp.registeredProvince, resp.registeredCity, resp.registeredDistrict)
          }
          this.$refs.baseInfo.initForm(this.ownInfo, null, this.zones, this.userInfo.id)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
