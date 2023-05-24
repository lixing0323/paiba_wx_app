<template>
  <view>
    <customer @exit="onExit()" @onLogin="onLogin()" />
  </view>
</template>

<script>
  // 我的
  import {
    mapGetters
  } from 'vuex';
  import customer from './customer.vue'

  export default {
    components: {
      customer
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters(['token', 'userInfo'])
    },
    onLoad() {},
    onShow(params) {},
    methods: {
      onLogin() {
        if (!this.userInfo) {
          uni.reLaunch({
            url: `/packageA/pages/login/index`
          });
        }
      },
      onExit() {
        const that = this;
        uni.showModal({
          content: '你是否要退出登录？',
          confirmText: '确定',
          cancelText: '取消',
          success: function(res) {
            if (res.confirm) {
              uni.showToast({
                title: '退出成功！'
              });
              that.$store.dispatch('user/logout');
              uni.reLaunch({
                url: `/pages/tabBar/homepage/index`
              });
            }
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/uni-nvue.css';
  @import '@/common/business.scss';
</style>