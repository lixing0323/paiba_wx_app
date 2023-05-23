<template>
  <view class="title-container">
    <image class="image" :src="img" mode="widthFix"></image>
    <text class="title">{{ title }}</text>
    <slot name="right"></slot>
  </view>
</template>

<script>
export default {
  name: "ht-card-title",
  props: {
    img: {
      default: require('@/static/icon/document.png')
    },
    title: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style scoped lang="scss">
.title-container {
  display: flex;
  align-items: center;
  padding-top: 40rpx;

  .image {
    width: 50rpx;
    height: 50rpx;
    margin-right: 10px;
  }

  .title {
    flex: 1;
    font-size: 32rpx;
    font-weight: bold;
    margin-left: 16 rpx;
    vertical-align: middle;
    color: $system-color;
    letter-spacing: 3 rpx;
  }
}
</style>
