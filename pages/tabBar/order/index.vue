<template>
  <view v-if="hasLogin() || true">
    <staff-order v-if="false" />
    <user-order />
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import UserOrder from './user'
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
      // if (!this.hasLogin()) {
      //   uni.reLaunch({
      //     url: `/packageA/pages/login/index`
      //   });
      // }
    },
    methods: {
      hasLogin() {
        return this.userInfo
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>