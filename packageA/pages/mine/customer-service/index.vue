<template>
  <view class="customer-service-container">
    <image class="image" :src="imageSrc" fit="cover" />
  </view>
</template>
<script>
  // 平台客服

  export default {
    components: {},
    props: {},
    data() {
      return {
        imageSrc: require('@/static/icon/customer_service.png')
      };
    },
    computed: {},
    created() {},
    methods: {}
  };
</script>

<style lang="scss" scoped>
  .customer-service-container {
    padding: 0 20rpx;

    .image {
      width: 100%;
    }
  }
</style>