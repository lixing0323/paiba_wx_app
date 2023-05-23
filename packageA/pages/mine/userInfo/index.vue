<template>
  <view>
    <view style="margin-top: 10px">
      <customer-info ref="info" v-if="isCustomer()" />
      <staff-info ref="info" v-if="isStaff()" />
    </view>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import { isCustomer, isStaff } from '@/common/roles.js'
  import customerInfo from './customer.vue'
  import staffInfo from './staff.vue'
  export default {
    components: {
      customerInfo,
      staffInfo
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    onReady() {
      this.$nextTick(() => {
         this.$refs.info.getInfo()
      })
    },
    onShow() {
    },
    onLoad(params) {
      this.$refs.info.isFirstReg = params.isFirstReg
    },
    methods: {
      isCustomer,
      isStaff
    }
  }
</script>
