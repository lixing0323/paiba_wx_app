<template>
  <view>
    <customer-homepage />
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import customerHomepage from './customer.vue';
  import staffHomepage from './staff.vue';
  import {
    isCustomer,
    isStaff,
    isUnLoginUser,
    isAdmin
  } from '@/common/roles.js';
  import {
    getVersionControl,
    login
  } from '@/apis/user.js';
  import {
    getAdvert
  } from '@/apis/desc.js';
  import {
    setAdvertStore,
    getAdvertStore
  } from '@/store/localStorage';

  export default {
    components: {
      customerHomepage,
      staffHomepage
    },
    data() {
      return {};
    },
    onShareAppMessage() {
      return {
        title: '测试分享',
        path: '/pages/tabBar/homepage/index',
        imageUrl: ''
      };
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    created() {},
    onShow() {},
    methods: {}
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';
</style>