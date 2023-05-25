<template>
  <view v-if="hasLogin()">
    <staff-order />
    <user-order v-if="false" />
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import UserOrder from './staff'
  import StaffOrder from './staff'

  export default {
    components: {
      UserOrder,
      StaffOrder
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    onLoad: function(options) {
      if (!this.hasLogin()) {
        uni.reLaunch({
          url: `/packageA/pages/login/index`
        });
      }
    },
    methods: {
      hasLogin() {
        // return this.token && this.userInfo
        return true
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>