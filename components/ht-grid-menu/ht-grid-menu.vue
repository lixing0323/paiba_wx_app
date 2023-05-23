<template>
  <view class="grid">
    <view class="grid-container">
      <view class="grid-item-container" v-for="(item, index) in gridList" :key="index"  @click="onClick(index)">
        <img :src="item.image" class="grid-image" mode="widthFix" />
        <text class="grid-title">{{ item.title }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    gridList: {
      type: Array,
      default: () => []
    },
    itemIndex: {
      type: Number,
      default: undefined
    }
  },
  methods: {
    onClick(index) {
      this.$emit('change', index)
    }
  }
}
</script>

<style scoped lang="scss">
.grid-container{
  display: flex;

  .grid-item-container{
    flex: 1;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30rpx 0;

    .grid-image{
      width: 40rpx;
      height: 40rpx;
      margin-bottom: 15rpx;
    }
    .grid-title{
      text-align: center;
      font-size: 25rpx;
    }
  }
}
</style>
