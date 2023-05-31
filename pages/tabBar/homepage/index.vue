<template>
  <view>
    <user-homepage />
    <staff-homepage v-if="false" />
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import UserHomepage from './user.vue';
  import StaffHomepage from './user.vue';

  export default {
    components: {
      UserHomepage,
      StaffHomepage
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    onLoad() {
      this.getPermission()
    },
    created() {

    },
    onShow() {},
    methods: {
      getPermission() {
        wx.getLocation({
          type: 'wgs84',
          success(res) {
            console.log('纬度' + res.latitude)
            console.log('经度' + res.longitude)
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>