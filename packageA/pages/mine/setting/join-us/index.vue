<template>
  <view class="join-us-container">
    <view>
      <tui-code-input border-color="#999" size="40" :length="6" width="80" height="80" isFocus
        @complete="complete"></tui-code-input>
    </view>

    <view class="note">请输入公司密钥，后台通过审核后加入我们</view>

    <view class="submit-bt-view">
      <button type="primary" @click="submit()" :disabled="loading">申请加入</button>
    </view>
  </view>
</template>
<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
        loading: false
      };
    },
    computed: {},
    created() {},
    methods: {
      complete(e) {
        console.log(e.detail.value)
      },
      submit() {
        uni.navigateBack()
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '@/common/business.scss';

  .join-us-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 30%;
    margin: 0 auto;
  }

  .note {
    color: #999;
    font-size: 30rpx;
    text-align: center;
    margin-top: 40rpx;
  }
</style>