<template>
  <view>
    <view class="tui-form-container">
      <view class="staff-info-detail">
        <tui-form-item label="姓名" :rightContent="staffInfo.fullName || '-'" padding="26rpx 0" :left="0" />
        <tui-form-item label="用户名" :rightContent="staffInfo.userName || '-'" padding="26rpx 0" :left="0" />
        <tui-form-item label="手机号" :rightContent="staffInfo.mobile || '-'" padding="26rpx 0" :left="0" />
        <tui-form-item label="员工等级" :rightContent="staffInfo.level.value || '-'" padding="26rpx 0" :left="0" />
        <tui-form-item label="角色" direction="column" padding="26rpx 0" :left="0" :bottom-border="false">
          {{ staffInfo.roles|| '-' }}
        </tui-form-item>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getArrayToString
  } from '@/common/filter.js'
  import {
    getUserInfo
  } from '@/apis/user.js';
  import {
    mapGetters
  } from 'vuex';
  export default {
    data() {
      return {
        staffInfo: undefined
      }
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    methods: {
      getArrayToString,
      getInfo() {
        getUserInfo().then((resp) => {
          this.staffInfo = resp
          this.staffInfo.roles = getArrayToString(this.staffInfo.roles, 'value')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .staff-info-container {
    background-color: #FFFFFF;
    padding: 0 40rpx;
  }
</style>
