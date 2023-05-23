<template>
  <view>
    <credit-report borrowerType="PERSONAL" title="个人征信分析" />
  </view>
</template>

<script>
  import creditReport from './index.vue'
  export default {
    components: {
      creditReport
    }
  }
</script>
