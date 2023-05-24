<template>
  <view :style="{'marginTop': marginTop, 'marginBottom': marginBottom}">
    <uni-card :padding="padding" :margin="margin" space="0" :is-shadow="true" :border="true">
      <slot></slot>
    </uni-card>
  </view>
</template>
<script>
  // 卡片
  export default {
    components: {},
    props: {
      padding: {
        type: String,
        default: '10px'
      },
      margin: {
        type: String,
        default: '0'
      },
      marginTop: {
        type: String,
        default: '0'
      },
      marginBottom: {
        type: String,
        default: '0'
      }
    },
    data() {
      return {};
    },
    onLoad() {},
    methods: {}
  };
</script>

<style lang="scss" scoped>
</style>